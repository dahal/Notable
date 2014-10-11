// Require dependencies
var koa   = require('koa'),
    route = require('koa-route'),
    app   = koa(),
    views = require('co-views'),
    parseBody = require('co-body')

// Define the routes
app.use(route.get('/', notes));
app.use(route.get('/note/new', add));
// app.use(route.get('/note/:id', show));
// app.use(route.get('/note/delete/:id', remote));
// app.use(route.get('/note/edit/:id', edit));
app.use(route.post('/note/create', create));
// app.use(route.post('/todo/update', update))

// Spicify views folder and swig for template
var render = views(__dirname + '/views', {map: {html: 'swig'}})

// Initialixe notes
var notes = new Array

// Index
function *notes(){
  this.body = yield render('index', {notes: notes})
}

// New
function *add(){
  this.body = yield render('new')
}

// Create
function *create(){
  var note = yield parseBody(this);
  note.create_at = new Date;
  note.update_at = new Date;
  notes.push(note);
  this.redirect('/')
}
// Start the server
app.listen(8080);
console.log('Notable loading on: http://localhost:8080')