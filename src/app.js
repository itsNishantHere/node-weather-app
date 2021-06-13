const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { response } = require("express");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.com (root route)
// app.com/help (/help route)
// app.com/about (/about route)

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Nishant",
//       age: 19,
//     },
//   ]);
// });

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Nishant Sharma",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Nishant Sharma",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is a help message",
    name: "Nishant Sharma",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(req.query.address, (error, { longitude, latitude, loction } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(
      latitude,
      longitude,
      (error, { temperature, weather, feelsLikeTemperature }) => {
        if (error) {
          return res.send({
            error,
          });
        }

        res.send({
          longitude,
          latitude,
          temperature,
          weather,
          feelsLikeTemperature,
        });
      }
    );
    console.log(response);
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Help Article Not Found",
    name: "Nishant Sharma",
    title: "404",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "Page Not Found",
    name: "Nishant Sharma",
    title: "404",
  });
});

// app.get("/about", (req, res) => {
//   res.send("<h2>About Page</h2>");
// });

// Starting server
app.listen(port, () => {
  console.log("Server started correctely");
});
