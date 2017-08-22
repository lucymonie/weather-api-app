const request = require('request');
const env = require('env2')('./config.env');

module.exports.get = (callback) => {
  var url = `http://api.wunderground.com/api/${process.env.WEATHER_KEY}/forecast/lang:EN/q/UK/London.json`;
  console.log('Url built for wunderground is: ', url);
  request(url, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      console.log("Had a problem getting the weather from wunderground");
      callback({onError:`There was a problem with the API request, status code was ${response.statusCode}`});
    } else {
      let data = JSON.parse(body);
      if(!data.forecast.simpleforecast.forecastday[0].conditions) {
        callback({onError: `Weather API did not reply with weather, though status code was ${response.statusCode}`});
      } else {
        console.log('The weather that\'s come back is: ', data);
        let weatherObj = buildPhrase(data);
        console.log('Weather object, processed, is: ', weatherObj);
        callback(weatherObj);
      }
    }
  })
}

let buildPhrase = (data) => {
  console.log('Weather process was called');
  var yourLocationRaw = data.forecast.simpleforecast.forecastday[0].date.tz_long;
  var yourLocation = yourLocationRaw.replace(/\w+\//, '');
  console.log('According to Wundergournd, your location is: ', yourLocation);
  var conditions = data.forecast.simpleforecast.forecastday[0].conditions;
  conditions = conditions.toLowerCase();
  console.log('Conditions in your location are: ', conditions);
  var topTemp = data.forecast.simpleforecast.forecastday[0].high.celsius;
  let weatherString = `The weather in ${yourLocation} today is ${conditions} with a high of ${topTemp}`;
  let context = {}
  context.weather = weatherString;
  return context;
}
