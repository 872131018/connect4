function gridClass(constructorObject)
{
	this.grid = [];
	this.getCellByName = 
		function(passedName)
		{
			for(var currentCellTwo in this.grid)
			{
				currentCellTwo = this.grid[currentCellTwo];
				if(currentCellTwo['cellName'] == passedName)
				{
					return currentCellTwo;
				}
			}
		};
	this.updateGrid = 
		function(passedGrid)
		{
			this.grid = [];
			for(var currentCell in passedGrid)
			{
				currentCell = passedGrid[currentCell];
				this.grid.push(new cellClass(currentCell));
			}
		};
	this.checkForWinner = 
		function(passedCurrentTurn)
		{
			//check all columns for 4 in a row
			var counter = 0;
			var currentStreakObject = {'streakColor': passedCurrentTurn, 'streakLength': 0};
			for(var currentCell in this.grid)
			{
				currentCell = this.grid[currentCell];
				if(counter <= 5)
				{
					switch(currentCell['occupied'] == currentStreakObject['streakColor'])
					{
						case true:
							currentStreakObject['streakLength']++;
							break;
						default:
							currentStreakObject['streakLength'] = 0;
							break;
					}

					//check for a real winner!
					if(currentStreakObject['streakLength'] >= 4)
					{
						eventListener.emit("gameWon");
					}
					if(counter == 5)
					{
						counter = 0;
					}

				}
				counter++;
			}
			//check all rows for 4 in a row
			counter = 0;
			currentStreakObject = {'streakColor': passedCurrentTurn, 'streakLength': 0};
			for(var i=0; i<6; i++)
			{
				for(var j=0; j<42; j=j+6)
				{
					var currentCell = this.grid[i+j];
					if(counter <= 6)
					{
						switch(currentCell['occupied'] == currentStreakObject['streakColor'])
						{
							case true:
								currentStreakObject['streakLength']++;
								break;
							default:
								currentStreakObject['streakLength'] = 0;
								break;
						}

						//check for a real winner!
						if(currentStreakObject['streakLength'] >= 4)
						{
							eventListener.emit("gameWon");
						}
						if(counter == 6)
						{
							counter = 0;
						}

					}
					counter++;
				}
			}
			//Check for diagonal connect 4
			var diagonalSet = 
			{
				'a': [3, 8, 13, 18],
				'b': [4, 9, 14, 19, 24],
				'c': [5, 10, 15, 20, 25, 30],
				'd': [11, 16, 21, 26, 31, 36],
				'e': [17, 22, 27, 32, 37],
				'f': [22, 27, 28, 33],
				'g': [2, 9, 16, 23],
				'h': [1, 8, 15, 22, 19],
				'i': [0, 7, 14, 21, 28, 35],
				'j': [6, 13, 20, 27, 34, 41],
				'k': [12, 19, 26, 33, 40],
				'l': [18, 25, 32, 39]

			};
			counter = 0;
			currentStreakObject = {'streakColor': passedCurrentTurn, 'streakLength': 0};
			for(var currentSet in diagonalSet)
			{
				currentSet = diagonalSet[currentSet];
				for(var currentCell in currentSet)
				{
					currentCell = currentSet[currentCell];
					currentCell = this.grid[currentCell];
					switch(currentCell['occupied'] == currentStreakObject['streakColor'])
					{
						case true:
							currentStreakObject['streakLength']++;
							break;
						default:
							currentStreakObject['streakLength'] = 0;
							break;
					}

					//check for a real winner!
					if(currentStreakObject['streakLength'] >= 4)
					{
						eventListener.emit("gameWon");
					}
				}
			}
		};

	this.test = 
		function()
		{
			console.log('hello');
		};

	//grid is in the form of [width][height]
	for(var i=0; i<7; i++)
	{
		for(var j=0; j<6; j++)
		{
			var cell = new cellClass(
				{
					'x': i * 100,
					'y': j * 100,
					'occupied': 'no',
					'cellName': 'cell'+i.toString()+j.toString()
				}
			);
			this.grid.push(cell);
		}
	}
	return this;
}
module.exports = gridClass;