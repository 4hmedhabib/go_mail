const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
	socket.on('message', ({ name, message }) => {
		io.emit('message', { name, message });
	});
});

server.listen(4000, function() {
	console.log('listening on port 4000');
});
