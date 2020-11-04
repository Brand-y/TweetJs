// on récupére notre dépendance externe - ici express.
const express = require('express'); // librairie faciliter la mise en ligne du server
const logger = require('morgan'); // loger certaines infos du post
const path = require('path');
const tweets = require('./tweets.json');
const { v4: uuidv4 } = require('uuid');

// on construit notre application qui nous servira à créer nos routes
const app = express();

// on donne un port sur lequel notre serveur écoute
const port = 3000;

app.use(logger('dev')); // pour morgan
app.use(express.json()); // pour render le body avec app.post
app.use(express.urlencoded({ extended: false })); // pour les informations rendu par le formulaire
/* app.post('/tweets', (req, res) => {
    const body = req.body;
    console.log(body);
    res.send(body);
}); */


app.set('view engine', 'hbs');
// on indique que nos vues se trouverons toujours dans le dossier views 
app.set('views', path.join(__dirname, 'views'));

// notre première route !
app.get('/', (req, res) => {
    res.render('index', { name: 'TweetJS', test: 'test' });
});


app.get('/tweets/new', (req, res) => {
    res.render('new', { });
});

app.get('/tweets/:id', (req, res) => {
    let id = req.params.id;
    let tweet = tweets.find((elem) => {
        return elem.id == id; 
    });
    tweet = [tweet];
    res.render('tweets', { tweets: tweet });
});

app.get('/tweets', (req, res) => {
    res.render('tweets', { tweets: tweets });
});

app.post('/tweets', (req, res) => {
    const tweet = req.body;
    tweet.id = uuidv4();
    tweets.push(tweet);
    res.redirect('/tweets'); // send for visualise json tweet
});

// on écoute sur notre port.
app.listen(port, () => {
  console.log(`TweetJS listening at http://localhost:${port}`)
});