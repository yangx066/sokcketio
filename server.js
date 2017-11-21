var express = require('express')
var app = express()
var server = app.listen(process.env.PORT || 3000)
app.use(express.static('public'))
console.log('server running')

var socket =require('socket.io')
var io = socket(server)

io.on('connection',newConnection)

function newConnection(socket){
	socket.broadcast.emit('newUser', socket.id + 'has joined the room')
	console.log('new connection: '+ socket.id)
	socket.emit('confirmConnection','hey' +socket.id)
	socket.on('newMsg', function(data){
		socket.broadcast.emit('newMsg', data)
	})
}