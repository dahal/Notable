// Require dependencies
var koa   = require('koa'),
    route = require('koa-route'),
    app   = koa(),
    views = require('co-views') 

// Define the routes
app.use(route.get('/', notes));
// app.use(route.get('/note/new', add));
// app.use(route.get('/note/:id', show));
// app.use(route.get('/note/delete/:id', remote));
// app.use(route.get('/note/edit/:id', edit));
// app.use(route.post('/note/create', create));
// app.use(route.post('/todo/update', update))

// Spicify views folder and swig for template
var render = views(__dirname + '/views', {map: {html: 'swig'}})


// Index
function *notes(){
  this.body = yield render('index', {notes: notes})
}
// Start the server
app.listen(8080);
console.log('Notable loading on: http://localhost:8080')