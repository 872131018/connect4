var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');
var url = require('url');
var path = require('path');
var EventEmitter = require("events").EventEmitter;

//begin local modules
playerClass = require('./serverClasses/playerClass');
gridClass = require('./serverClasses/gridClass');
cellClass = require('./serverClasses/cellClass');

//keep track of whos turn it is
currentTurn = 'red';

//keep a list of the players in the game
players = [];

//the grid holds the game grid
grid = new gridClass(true);

//create the event listener
eventListener = new EventEmitter();

/*
*CREATE THE MAIN SERVERS
*/
//define the static file server
app.use('/',
	function(request, response)
	{
		urlArray = request.originalUrl.split('/');
		if(urlArray['styles'] !== 'undefined' || urlArray['scripts'] !== 'undefined')
		{
			response.sendFile(__dirname + urlArray.join('/'));
		}
		else
		{
			response.sendFile(__dirname + '/index.html');
		}
	}
);
//tell the server to start listening
server.listen(8080,
	function()
	{
		console.log('listening on *:8080');
	}
);
/*
*VARIOUS LISTENERS
*/
eventListener.on("gameWon",
	function()
	{
    	io.emit('gameWon', currentTurn);
	}
);

//when a player opens the socket
io.on('connection',
	function(socket)
	{
		//less than two players, create players on connection
		if(players.length <= 2)
		{
			console.log('user connected '+socket.id);
			//create a new player to put in the player list
			players.push(new playerClass(
				{
					'id': socket.id,
					'color': currentTurn
				}));
			//signal to the player that they have connected
			socket.emit('createPlayer',
				{
					'postMessage': 'You connected as '+currentTurn,
					'player': players[players.length-1]
				});
			//give each sockets its own listeners
			socket.on('updateGrid',
				function(message)
				{
					grid.updateGrid(message['grid']);
					grid.checkForWinner(currentTurn);
					//this updates the current players turn
					if(currentTurn == 'red')
					{
						currentTurn = 'blue';
					}
					else
					{
						currentTurn = 'red';
					}
					io.emit('updateTurn', currentTurn);
					io.emit('updateGrid', grid);
				}
			);
	  		socket.on('chat message',
	  			function(message)
	  			{
	    			io.emit('chat message', message);
	  			}
	  		);
	  		socket.on('disconnect',
	  			function()
	  			{
	    			console.log('user disconnected');
	  			}
	  		);
	  		//once the connection and player are set up wait for next player
	  		currentTurn = 'blue';
	  		//signal that the game is ready with 2 players connected
			if(players.length == 2)
			{
				//randomly decide whos turn it is
				if((Math.floor((Math.random() * 100) + 1) % 2) == 0)
				{
					currentTurn = 'red';
				}
				for(currentPlayer in players)
				{
					currentPlayer = players[currentPlayer];
					io.sockets.connected[currentPlayer['id']].emit('gameReady', currentTurn);
				}
			}
	  		/*
	  		socket.on('playerUpdate',
	  			function(passedPlayer)
	  			{
	  				player.updatePosition({'x': passedPlayer['positionX'], 'y': passedPlayer['positionY']});
	    			io.emit('updatePlayer', player);
	  			}
	  		);
			*/
		}
	}
);
