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
        let weatherObj = extractWeather(data);
        callback(weatherObj);
      }
    }
  })
}

let extractWeather = (data) => {
  let weatherData = {}
  weatherData.day0 = data.forecast.txt_forecast.forecastday[0];
  weatherData.day1 = data.forecast.txt_forecast.forecastday[2];
  weatherData.day2 = data.forecast.txt_forecast.forecastday[4];
  weatherData.day3 = data.forecast.txt_forecast.forecastday[6];
  return weatherData;
}
