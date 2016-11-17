"use strict"
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongooseDB');
var db = mongoose.connection;
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  title:  String,
  assignee: String,
  body:   String,
  length: String,
  state: Number,
  //comments: [{ body: String, date: Date }],
  create_date: { type: Date, default: Date.now }
});

var userSchema = new Schema({
	id: Number,
	firstname: String,
	lastname: String
});

var User = db.model('User', userSchema);
var user = new User({ id: 1, firstname: 'Иван', lastname: 'Петров' });
user.save(function (err) {
  if (err) // ...
	console.log('Ошибка сохранения пользователя');
});

User.find({id: 1, firstname: 'Иван', lastname: 'Петров'}, function(err, results) {
			if(err) {
				console.log( err );
			}
			else if(results.length){
				console.log( "Найденный:", results );
			}
			else {
				console.log( "Нет документов с данным условием поиска." );
			}
});