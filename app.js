const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post');

const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

const app = express();

//connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);

//ROUTES
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPage);
app.get('/posts/edit/:id', pageController.getEditPage);

const port = 3000;

app.listen(port, () => {
    console.log(`Server initialized in port ${port}...`);
});
