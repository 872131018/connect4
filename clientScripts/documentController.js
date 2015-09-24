function documentController()
{
	/*document controller listens for input */
	$(document).on('gameWon', 
		function(e, message)
		{
			$('#alertContainer').append($('<div id="alertMessage" class="alert alert-success">').html('Game Over! '+message+' Won!!!'));
		}
	);
	$(document).on('gameReady', 
		function(e, message)
		{
			//draw the empty board
			$(document).trigger('clearCanvas');
			grid.renderGrid();

			currentTurn = message;
			if(player['color'] == 'red')
			{
				$('#alertContainer').append($('<div id="alertMessage" class="alert alert-danger">').html('Game Starting! Its Reds Turn!'));
			}
			else
			{
				$('#alertContainer').append($('<div id="alertMessage" class="alert alert-info">').html('Game Starting! Its Blues Turn!'));	
			}

			//this is the main loop
			setInterval(
			function()
			{
				//$(document).trigger('mousemove');
				console.log('count');
			}, 300);
		}
	);
	$(document).on('updateGrid', 
		function(e, message)
		{	
			grid.updateGrid(message);
		}
	);
	$(document).on('updateTurn', 
		function(e, message)
		{
			currentTurn = message;
		}
	);
	$(document).on('mousedown', 
		function(e)
		{
			if(player['color'] == currentTurn)
			{
				var x = e.clientX - canvasRect.left;
				var y = e.clientY - canvasRect.top;

				//determine what got clicked on
				if(x >= 0 && x <= 700 && y >= 0 && y <= 600)
				{
					//var column = Math.floor(x/100);
					var column = grid.getColumn(x).reverse();
					for(var currentCell in column)
					{
						currentCell = column[currentCell];
						if(currentCell['occupied'] == 'no')
						{
							currentCell.addPiece(player['color']);
							break;
						}
					}
					socket.emit('updateGrid', grid);
					//$(document).trigger('updatePosition', [{'object': 'player', 'action': 'canvasClick', 'x': x, 'y': y}]);
				}
			}
			else
			{
				$('#alertMessage').html('Be Patient! Its the other players turn!');
			}
		}
	);
	$(document).on('mousemove',
		function(e)
		{
			var x = e.clientX - canvasRect.left;
			var y = e.clientY - canvasRect.top;

			//determine if the mouse is over the grid
			if(x >= 0 && x <= 700 && y >= 0 && y <= 600)
			{
				grid.highlightColumn(x);
				//$(document).trigger('updatePosition', [{'object': 'player', 'action': 'canvasClick', 'x': x, 'y': y}]);
			}
			$(document).trigger('clearCanvas');
			grid.renderGrid();
		}
	);
	$(document).on('createPlayer', 
		function(e, message)
		{
			//alert the player who they connected as
			$('#messages').append($('<li>').text(message['postMessage']));
			//build the player from the server message
			player = new playerClass(message['player']);
		}
	);
	$(document).on('clearCanvas', 
		function(e)
		{
			canvasContext.clearRect(0, 0, 700, 600);
		}
	);
	/*
	$(document).on('keydown', 
		function(e)
		{
			var pressedKey = e.keyCode || e.which;
			switch(pressedKey)
			{
				//s
				case 83:
					$(document).trigger('updatePosition', [{'object': 'player', 'action': 'moveUp'}]);
					break;
				//w
				case 87:
					$(document).trigger('updatePosition', [{'object': 'player', 'action': 'moveDown'}]);
					break;
				//a
				case 65:
					$(document).trigger('updatePosition', [{'object': 'player', 'action': 'moveLeft'}]);
					break;
				//d
				case 68:
					$(document).trigger('updatePosition', [{'object': 'player', 'action': 'moveRight'}]);
					break;
				default:
					console.log(pressedKey);
					break;
			}
		}
	);
	*/
}