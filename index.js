const express = require('express');
const app = express();
const port = 300;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ todos: [] }).write(); // đoạn này để set default trong file json ta có một mạng posts rỗng

module.exports = db;

app.set('view engine', 'pug')
app.set('views', './views')

// get database


// ---------- get

// show users
app.get('/', function(req, res){
  const array = db.get('todos').value();
  res.render('index', {
    users: array
  })
})

// Add
app.get('/Add', function(req, res){
  res.render('Add');
})

app.get('/Add/xuly', function (req, res) {
  function checkObj(obj) {
    if(Object.keys(obj).length === 0) {
        return 0;
      } else {
        return 1;
      }
  }
  checkObj(req.query);

  if(checkObj(req.query) == 1) {
    if(req.query.user !== '') {
      const paramAdd = req.query;
      db.get('todos')
      .push(paramAdd)
      .write();
    }
  }
    res.redirect('/');
})

// views
app.get('/views/:id', function (req, res) {
  const idUser = parseInt(req.params.id);
  const valueUser = db.get('todos').find({id: idUser}). value();
  res.render('viewUser', {
    user: valueUser
  });
}); 

// delete user
app.get('/todos/delete/:id', function (req, res) {
  const idUser = parseInt(req.params.id);
  console.log(idUser);
  db.get('todos').remove({id: idUser}).write();
  res.redirect('/');
})

// ------------ post

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
