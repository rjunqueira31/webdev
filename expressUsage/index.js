// This download does not include the node_modules folder
// REMEMBER TO RUN "npm install" first, to tell NPM to download the needed
// packages
const express = require('express');
const app = express();

// notes: req = request, res = response
// req.params = /r/:subreddit
// req.query = /search?q=dogs
// this runs by order, so we should put the '*' at the end to not override other
// routes and catch all other routes The "/" is the home route

// /r/:subreddit basically means "anything that comes after /r/ is a variable
// named subreddit" /r/:subreddit/comments/:postId means "anything that comes
// after /r/ is a variable named subreddit and anything that comes after
// /comments/ is a variable named postId" /r/:subreddit/:postId means "anything
// that comes after /r/ is a variable named subreddit and anything that comes
// after that is a variable named postId"

// app.listen(8080, () => {console.log('LISTENING ON PORT 8080')}) starts the
// server on port 8080

// To test, run "node index.js" and go to "localhost:8080" in your browser
// Using nodemon: "nodemon index.js" - this auto-restarts the server on changes

app.get('/', (req, res) => {res.send('Welcome to the home page!')})

app.get('/r/:subreddit', (req, res) => {
  const {subreddit} = req.params;
  res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`)
})

app.get('/r/:subreddit/comments/:postId', (req, res) => {
  const {subreddit, postId} = req.params;
  res.send(`<h1>Viewing Comments for Post ID: ${postId} on the ${
      subreddit} subreddit</h1>`)
})

app.get('/r/:subreddit/:postId', (req, res) => {
  const {subreddit, postId} = req.params;
  res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1>`)
})

app.post(
    '/cats',
    (req, res) => {res.send(
        'POST REQUEST TO /cats!!!! THIS IS DIFFERENT THAN A GET REQUEST!')})

app.get('/cats', (req, res) => {res.send('MEOW!!')})

app.get('/dogs', (req, res) => {res.send('WOOF!')})
app.get('/search', (req, res) => {
  const {q} = req.query;
  if (!q) {
    res.send('NOTHING FOUND IF NOTHING SEARCHED!')
  } else {
    res.send(`<h1>Search results for: ${q}</h1>`)
  }
})

app.get(/(.*)/, (req, res) => {res.send(`I don't know that path!`)})


app.listen(8080, () => {console.log('LISTENING ON PORT 8080')})
