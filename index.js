"use strict"
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongooseDB');
var db = mongoose.connection;
var Schema = mongoose.Schema;

var taskSchema = new Schema({
	id: Number,
	title:  String,
	assignee: Number,
	length: Number,
	state: Number, // 0 - Proposed, 1 - Active, 2 - Resolved, 3 - Closed
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
user = new User({ id: 2, firstname: 'Сергей', lastname: 'Иванов' });
user.save(function (err) {
  if (err) // ...
	console.log('Ошибка сохранения пользователя');
});

var Task = db.model('Task', taskSchema);
var task = new Task({id: 1, title: "Самая трудная задача", assignee: 1, length: 35, state: 0});
task.save(function (err) {
  if (err) // ...
	console.log('Ошибка создания задачи');
});

task = new Task({id: 2, title: "Задача полегче", assignee: 1, length: 20, state: 0});
task.save(function (err) {
  if (err) // ...
	console.log('Ошибка создания задачи');
});

User.find({lastname: 'Петров'}, function(err, results) {
			if(err) {
				console.log( err );
			}
			else if(results.length){
				console.log( "Найденные пользователи:", results );
			}
			else {
				console.log( "Нет пользователей с данным условием поиска." );
			}
});

Task.find({assignee: 1}, function(err, results) {
			if(err) {
				console.log( err );
			}
			else if(results.length){
				console.log( "Найденные задачи:", results );
			}
			else {
				console.log( "Нет задач с данным условием поиска." );
			}
});
setTimeout(function() {
	User.remove().exec();
	Task.remove().exec();
}, 5000);
