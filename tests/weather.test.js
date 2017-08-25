const test = require('tape');
const weather = require('../src/weather.js');

let mockWeatherData = { response:
  { version: '0.1',
     termsofService: 'http://www.wunderground.com/weather/api/d/terms.html',
     features: { forecast: 1 } },
  forecast:
   { txt_forecast:
     { date: '5:41 PM BST',
     forecastday: [
      { period: 0,
        icon: 'partlycloudy',
        icon_url: 'http://icons.wxug.com/i/c/k/partlycloudy.gif',
        title: 'Friday',
        fcttext: 'Partly cloudy. Lows overnight in the mid 50s.',
        fcttext_metric: 'Partly cloudy. Low 13C.',
        pop: '10' },
      { period: 1,
        icon: 'nt_partlycloudy',
        icon_url: 'http://icons.wxug.com/i/c/k/nt_partlycloudy.gif',
        title: 'Friday Night',
        fcttext: 'A few clouds. Low 56F. Winds light and variable.',
        fcttext_metric: 'Partly cloudy skies. Low 13C. Winds light and variable.',
        pop: '10' },
      { period: 2,
        icon: 'partlycloudy',
        icon_url: 'http://icons.wxug.com/i/c/k/partlycloudy.gif',
        title: 'Saturday',
        fcttext: 'Some sun in the morning with increasing clouds during the afternoon. Warm. High 76F. Winds WNW at 5 to 10 mph.',
        fcttext_metric: 'Partly to mostly cloudy. Warm. High 24C. Winds WNW at 10 to 15 km/h.',
        pop: '10' },
      { period: 3,
        icon: 'nt_partlycloudy',
        icon_url: 'http://icons.wxug.com/i/c/k/nt_partlycloudy.gif',
        title: 'Saturday Night',
        fcttext: 'Partly cloudy. Low 56F. Winds N at 5 to 10 mph.',
        fcttext_metric: 'A few clouds. Low 13C. Winds N at 10 to 15 km/h.',
        pop: '10' },
      { period: 4,
        icon: 'partlycloudy',
        icon_url: 'http://icons.wxug.com/i/c/k/partlycloudy.gif',
        title: 'Sunday',
        fcttext: 'Partly cloudy skies. Very warm. High 77F. Winds light and variable.',
        fcttext_metric: 'Sunshine and clouds mixed. Very warm. High near 25C. Winds light and variable.',
        pop: '10' },
      { period: 5,
        icon: 'nt_partlycloudy',
        icon_url: 'http://icons.wxug.com/i/c/k/nt_partlycloudy.gif',
        title: 'Sunday Night',
        fcttext: 'Partly cloudy skies. Low 57F. Winds light and variable.',
        fcttext_metric: 'Partly cloudy skies. Low 14C. Winds light and variable.',
        pop: '10' },
      { period: 6,
        icon: 'clear',
        icon_url: 'http://icons.wxug.com/i/c/k/clear.gif',
        title: 'Monday',
        fcttext: 'A mainly sunny sky. Very warm. High near 80F. Winds S at 5 to 10 mph.',
        fcttext_metric: 'Sunny. Very warm. High 27C. Winds S at 10 to 15 km/h.',
        pop: '10' },
      { period: 7,
        icon: 'nt_clear',
        icon_url: 'http://icons.wxug.com/i/c/k/nt_clear.gif',
        title: 'Monday Night',
        fcttext: 'A mostly clear sky. Low around 60F. Winds SW at 5 to 10 mph.',
        fcttext_metric: 'Clear. Low around 15C. Winds SW at 10 to 15 km/h.',
        pop: '10' } ]
   },
 simpleforecast: { forecastday: [Array] } } }

let mockWeatherObject = {
  day0:
   { period: 0,
     icon: 'partlycloudy',
     icon_url: 'http://icons.wxug.com/i/c/k/partlycloudy.gif',
     title: 'Friday',
     fcttext: 'Partly cloudy. Lows overnight in the mid 50s.',
     fcttext_metric: 'Partly cloudy. Low 13C.',
     pop: '10' },
  day1:
   { period: 2,
     icon: 'partlycloudy',
     icon_url: 'http://icons.wxug.com/i/c/k/partlycloudy.gif',
     title: 'Saturday',
     fcttext: 'Some sun in the morning with increasing clouds during the afternoon. Warm. High 76F. Winds WNW at 5 to 10 mph.',
     fcttext_metric: 'Partly to mostly cloudy. Warm. High 24C. Winds WNW at 10 to 15 km/h.',
     pop: '10' },
  day2:
   { period: 4,
     icon: 'partlycloudy',
     icon_url: 'http://icons.wxug.com/i/c/k/partlycloudy.gif',
     title: 'Sunday',
     fcttext: 'Partly cloudy skies. Very warm. High 77F. Winds light and variable.',
     fcttext_metric: 'Sunshine and clouds mixed. Very warm. High near 25C. Winds light and variable.',
     pop: '10' },
  day3:
   { period: 6,
     icon: 'clear',
     icon_url: 'http://icons.wxug.com/i/c/k/clear.gif',
     title: 'Monday',
     fcttext: 'A mainly sunny sky. Very warm. High near 80F. Winds S at 5 to 10 mph.',
     fcttext_metric: 'Sunny. Very warm. High 27C. Winds S at 10 to 15 km/h.',
     pop: '10' } }

let mockUpdatedWeatherObject = {
   day0:
    { period: 0,
      icon: 'partlycloudy',
      icon_url: 'http://icons.wxug.com/i/c/j/partlycloudy.gif',
      title: 'Friday',
      fcttext: 'Partly cloudy. Lows overnight in the mid 50s.',
      fcttext_metric: 'Partly cloudy. Low 13C.',
      pop: '10' },
   day1:
    { period: 2,
      icon: 'partlycloudy',
      icon_url: 'http://icons.wxug.com/i/c/j/partlycloudy.gif',
      title: 'Saturday',
      fcttext: 'Some sun in the morning with increasing clouds during the afternoon. Warm. High 76F. Winds WNW at 5 to 10 mph.',
      fcttext_metric: 'Partly to mostly cloudy. Warm. High 24C. Winds WNW at 10 to 15 km/h.',
      pop: '10' },
   day2:
    { period: 4,
      icon: 'partlycloudy',
      icon_url: 'http://icons.wxug.com/i/c/j/partlycloudy.gif',
      title: 'Sunday',
      fcttext: 'Partly cloudy skies. Very warm. High 77F. Winds light and variable.',
      fcttext_metric: 'Sunshine and clouds mixed. Very warm. High near 25C. Winds light and variable.',
      pop: '10' },
   day3:
    { period: 6,
      icon: 'clear',
      icon_url: 'http://icons.wxug.com/i/c/j/clear.gif',
      title: 'Monday',
      fcttext: 'A mainly sunny sky. Very warm. High near 80F. Winds S at 5 to 10 mph.',
      fcttext_metric: 'Sunny. Very warm. High 27C. Winds S at 10 to 15 km/h.',
      pop: '10' } }


test('It can extract a subset of the data from parsed response object', function (t) {
 let weatherObj = weather.extractWeather(mockWeatherData);
 t.deepEqual(weatherObj, mockWeatherObject);
 t.end();
});

test('It can update the image urls to include the letter j rather than the letter k', function (t) {
  let updatedWeatherObject = weather.updateIconLinks(mockWeatherObject);
  t.deepEqual(updatedWeatherObject, mockUpdatedWeatherObject);
  t.end();
});
