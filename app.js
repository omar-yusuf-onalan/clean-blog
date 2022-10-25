const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');

const path = require('path');

const Post = require('./models/Post');

const app = express();

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    const posts = await Post.find({});
    res.render('index', {
        posts,
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/add_post', (req, res) => {
    res.render('add_post');
});

app.get('/post', (req, res) => {
    res.render('post');
});

app.post('/posts', async (req, res) => {
    await Post.create(req.body);
    res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server initialized in port ${port}...`);
});
