// Require dependencies
var koa   = require('koa'),
    route = require('koa-route'),
    app = koa()

// Define the routes
app.use(route.get('/', notes));
app.use(route.get('/note/new', add));
app.use(route.get('/note/:id', show));
app.use(route.get('/note/delete/:id', remote));
app.use(route.get('/note/edit/:id', edit));
app.use(route.post('/note/create', create));
app.use(route.post('/todo/update', update))