// Require dependencies
var koa         = require('koa'),
    route       = require('koa-route'),
    views       = require('co-views'),
    parseBody   = require('co-body'),
    logs        = require('koa-logger'),
    app         = koa(),
    Faker       = require('Faker')

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

// Fake Some Fake data for test
for(var i = 1; i <= 10; i++){
  var id        = i;
  var title     = Faker.Lorem.sentence();
  var desc      = Faker.Lorem.paragraph();
  var created   = Faker.Date.past();
  var updated  = new Date;
  var note = {
    'title': title,
    'description': desc,
    'created_at': created,
    'updated_at': updated,
    'id': id
  }
  notes.push(note)
}



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
  if (!note) this.throw(404, 'Houston, we have a problem, perhaps the id is incorrect!')
  this.body = yield render('show', {note: note})
}

// Create
function *create(){
  var note = yield parseBody(this);
  note.created_at = new Date;
  note.updated_at = new Date;
  var id = notes.push(note);
  note.id = id;
  this.redirect('/')
}

// Edit
function *edit(id){
  var note = notes[id-1];
  if (!note) this.throw(404, 'Houston, we have a problem, perhaps the id is incorrect!')
  this.body = yield render('edit', {note: note});
}

// Update
function *update(){
  var note = yield parseBody(this);
  var id = note.id - 1;
  notes[id].title = note.title
  notes[id].description = note.description
  notes[id].updated_at = new Date;
  this.redirect('/')
}

// Delete
function *remove(id){
  var note = notes[id-1]
  if (!note) this.throw(404, 'Houston, we have a problem, perhaps the id is incorrect!')
  var idx = note.id
  notes.splice(idx, 1)

  //Change the ID of existing notes
  for(var i = 0; i < notes.length; i++){
    notes[i].id = i+1
  }

  this.redirect('/')
}

// Start the server
app.listen(8080);
console.log('Notable loading on: http://localhost:8080')
