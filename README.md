# Weather app for Easle
An app that displays current local weather plus forecasts for three days

I built this with Node.js, Hapi.js, Handlebars and Materialize. I opted for Handlebars as it provides lightweight templating, so it seemed a good fit for this task.

The project is deployed to heroku:
https://easle-weather.herokuapp.com/

**To run locally**
- Clone the repository
- Create a file `config.env` in the root directory
- Request api key from repository owner
- Add `export WEATHER_KEY=[weather key]` to `config.env`
- Run `npm install`
- Run `npm start`
- Open browser at `localhost:8080`

**Tests**
There are a couple of tests written in Tape.
- To run tests, use the command `npm test`
