const request = require('request');
const env = require('env2')('./config.env');

module.exports.get = (callback) => {
  var url = `http://api.wunderground.com/api/${process.env.WEATHER_KEY}/forecast/lang:EN/q/UK/London.json`;
  request(url, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      callback({onError:`There was a problem with the API request, status code was ${response.statusCode}`});
    } else {
      let data = JSON.parse(body);
      if(!data.forecast.simpleforecast.forecastday[0].conditions) {
        callback({onError: `Weather API did not reply with weather, though status code was ${response.statusCode}`});
      } else {
        let weatherObj = this.extractWeather(data);
        let weatherWithUpdatedIcons = this.updateIconLinks(weatherObj);
        callback(weatherWithUpdatedIcons);
      }
    }
  })
}

module.exports.extractWeather = (data) => {
  let weatherData = {}
  weatherData.day0 = data.forecast.txt_forecast.forecastday[0];
  weatherData.day1 = data.forecast.txt_forecast.forecastday[2];
  weatherData.day2 = data.forecast.txt_forecast.forecastday[4];
  weatherData.day3 = data.forecast.txt_forecast.forecastday[6];
  return weatherData;
}

// I didn't like the default icons so this function replaces the icon set with a nicer one
module.exports.updateIconLinks = (weatherData) => {
  let newWeatherData = Object.assign({}, weatherData);
  let keys = Object.keys(newWeatherData);
  keys.forEach(function (key) {
    newWeatherData[key].icon_url = newWeatherData[key].icon_url.replace('/k', '/j');
  });
  return newWeatherData;
}
