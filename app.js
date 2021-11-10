const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ....

// Add the route handlers here:

app.get('/', (req, res) => {
    res.render(__dirname + '/views/index.hbs');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log(beersFromApi[0].id);
      res.render(__dirname + '/views/beers.hbs', {beersFromApi});
    })
    .catch(error => console.log(error));
});
//food_pairing  brewers_tips
app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render(__dirname + '/views/random-beer.hbs', responseFromAPI[0]);
  })
  .catch(error => console.log(error));
});

app.get('/beers/:id', (req, res) => {

  
/* app.get("/user/:name", (req, res) => {
  let { name } = req.params;
  res.send(`My dynamic ${name} route`);
});
 */
    let {id} = req.params;
    punkAPI
      .getBeer(id)
      .then(myBeer => {
        console.log(myBeer[0].id);
        res.render(__dirname + '/views/beer-details.hbs', myBeer[0]);
      })
      .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
