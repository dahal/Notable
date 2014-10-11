// Require dependencies
var koa         = require('koa'),
    route       = require('koa-route'),
    views       = require('co-views'),
    parseBody   = require('co-body'),
    logs        = require('koa-logger'),
    app         = koa()

// Render some logs on terminal
app.use(logs())

// Define the routes
app.use(route.get('/', all));
app.use(route.get('/note/new', add));
app.use(route.get('/note/:id', show));
app.use(route.get('/note/delete/:id', remove));
app.use(route.get('/note/edit/:id', edit));
app.use(route.post('/note/create', create));
app.use(route.post('/note/update', update))

// Spicify views folder and swig for template
var render = views(__dirname + '/views', {map: {html: 'swig'}})

// Initialixe notes
var notes = new Array

// Index
function *all(){
  this.body = yield render('index', {notes: notes})
}

// New
function *add(){
  this.body = yield render('new')
}

//Show
function *show(id){
  var note = notes[id-1]
  this.body = yield render('show', {note: note})
}

// Create
function *create(){
  var note = yield parseBody(this);
  note.create_at = new Date;
  note.update_at = new Date;
  var id = notes.push(note);
  note.id = id;
  this.redirect('/')
}

// Edit
function *edit(id){
  var note = notes[id-1];
  this.body = yield render('edit', {note: note});
}

// Update
function *update(){
  var note = yield parseBody(this);
  var id = note.id - 1;
  notes[id].title = note.title
  notes[id].description = note.description
  notes[id].update_at = new Date;
  this.redirect('/')
}

// Delete
function *remove(id){
  var note = notes[id-1]
  var id = note.id
  notes.splice(id, 1)
  this.redirect('/')
}

// Start the server
app.listen(8080);
console.log('Notable loading on: http://localhost:8080')
