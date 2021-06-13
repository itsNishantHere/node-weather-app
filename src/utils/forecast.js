const request = require("request");

const forecast = function (latitude, longitude, callback) {
  const url = `http://api.weatherstack.com/current?access_key=12bcbe6ef7141e84dc634df7e7cd7aab&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        weather: body.current.weather_descriptions[0],
        feelsLikeTemperature: body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
