$(document).ready(
	function()
	{
		initSocket();

		//element is available on html page
		canvasElement = $('#myCanvas').get(0);
		canvasContext = canvasElement.getContext('2d');
		canvasRect = canvasElement.getBoundingClientRect();

		//controller inits all the listeners
		documentController();

		//create the game graid
		grid = new gridClass(true);

		//this is the player instance
		player = {};

		//keep track of the current turn
		currentTurn = '';


		//define player color constants
		RED = '#E60000';
		BLUE = '#0033CC';
	}
);

function initSocket()
{
	//must set up socket connection
	socket = io();
	$('form').submit(
		function()
		{
			socket.emit('chat message', $('#m').val());
			$('#m').val('');
			return false;
		}
	);
	socket.on('gameWon',
		function(message)
		{
			$(document).trigger('gameWon', message);
		}
	);
	socket.on('gameReady', 
		function(message)
		{
			$(document).trigger('gameReady', message);
		}
	);
	socket.on('createPlayer', 
		function(message)
		{
			$(document).trigger('createPlayer', message);
		}
	);
	socket.on('chat message', 
		function(message)
		{
			$('#messages').append($('<li>').text(message));
		}
	);
	socket.on('updateGrid', 
		function(message)
		{
			$(document).trigger('updateGrid', message);
		}
	);
	socket.on('updateTurn', 
		function(message)
		{
			$(document).trigger('updateTurn', message);
		}
	);
	/*
	socket.on('updatePlayer', 
		function(passedPlayer)
		{
			$(document).trigger('updatePosition', [{'object': 'player', 'x': passedPlayer['positionX'], 'y': passedPlayer['positionY']}]);
		}
	);
	*/
}