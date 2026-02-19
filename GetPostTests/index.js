const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// test
/*
app.get('/tacos', (req, res) => {
  res.send('GET /tacos response');
});

app.post('/tacos', (req, res) => {
  const {meat, qty} = req.body;
  res.send(`POST /tacos response: qty:${qty} ${meat} tacos`);
}); */

app.listen(port, () => {
  console.log(`Listening on PORT: ${port}`);
});

/*
GET /comments - returns all comments
POST /comments - creates a new comment
GET /comments/:id - returns a specific comment by id
PATCH /comments/:id - updates a specific comment by id
DELETE /comments/:id - deletes a specific comment by id
*/
const comments = [
  {id: 0, username: 'user1', comment: 'This is the first comment'},
  {id: 1, username: 'user2', comment: 'This is the second comment'},
  {id: 2, username: 'user3', comment: 'This is the third comment'},
];

app.get('/', (req, res) => {
  res.render('comments/landingPage');
});


app.get('/comments', (req, res) => {
  res.render('comments/index', {comments});
});

app.get('/comments/new', (req, res) => {
  res.render('comments/newcomment');
});

app.post('/comments', (req, res) => {
  const {username, comment} = req.body;
  const id = comments.length;
  comments.push({id, username, comment});
  res.redirect('/comments');
});

/*
app.get('/comments/:id', (req, res) => {
  const {id} = req.params;
  res.send(`GET /comments/${id} response`);
});

app.patch('/comments/:id', (req, res) => {
  const {id} = req.params;
  const {text} = req.body;
  res.send(`PATCH /comments/${id} response: ${text}`);
});

app.delete('/comments/:id', (req, res) => {
  const {id} = req.params;
  res.send(`DELETE /comments/${id} response`);
}); */