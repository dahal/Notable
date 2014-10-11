### Notable
---
CRUD Note App built using:-

* [Node](http://nodejs.org/)
* [Koa](http://koajs.com/)
* [Swig](http://paularmstrong.github.io/swig/)

#####CRUD Routes:-
---
```
HTTP Verb         Path                Used For
----------------------------------------------------------------------------
GET               /                   display all notes
GET               /note/:id           display a specific note
GET               /note/new           return html form for creating new note
POST              /note/create        create a new note
GET               /note/edit/:id      return html form for editing note
POST              /note/update        update a specific note 
GET               /note/delete/       delete a specific note
```
#### Instructions

```
~> git clone git@github.com:dahal/Notable.git
~> cd Notable
~> npm install
~> node server.js
```