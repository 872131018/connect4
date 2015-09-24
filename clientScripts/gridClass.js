function gridClass(constructorObject)
{
	this.grid = [];
	this.renderGrid = renderGrid;
	this.highlightColumn = highlightColumn;
	this.getColumn = getColumn;
	this.getCellByName = getCellByName;
	this.updateGrid = updateGrid;

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
function renderGrid()
{
	for(var currentCell in this.grid)
	{
		currentCell = this.grid[currentCell];
		if(currentCell.highlight == 'yes')
		{
			canvasContext.fillStyle='#FFFFCC';
			canvasContext.fillRect(currentCell.x, currentCell.y, currentCell.width, currentCell.height);
			canvasContext.stroke();
		}
		canvasContext.fillStyle='#000000';
		canvasContext.rect(currentCell.x, currentCell.y, currentCell.width, currentCell.height);
		canvasContext.stroke();

		if(currentCell['occupied'] != 'no')
		{
			if(currentCell['occupied'] == 'red')
			{
				canvasContext.fillStyle = RED;
			}
			else if(currentCell['occupied'] == 'blue')
			{
				canvasContext.fillStyle = BLUE;
			}
			canvasContext.beginPath();
			canvasContext.arc(currentCell.x+50, currentCell.y+50, 30, 0, 2*Math.PI);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.stroke();
		}
	}
}
function updateGrid(passedGrid)
{
	this.grid = [];
	var tempGrid = passedGrid['grid'];
	for(var currentCell in tempGrid)
	{
		currentCell = tempGrid[currentCell];
		this.grid.push(new cellClass(currentCell));
	}
}
function getCellByName(passedName)
{
	for(var currentCellTwo in this.grid)
	{
		currentCellTwo = this.grid[currentCellTwo];
		if(currentCellTwo['cellName'] == passedName)
		{
			return currentCellTwo;
		}
	}
}
function getColumn(passedX)
{
	var returnColumn = [];
	for(var currentCell in this.grid)
	{
		currentCell = this.grid[currentCell];
		if(passedX >= currentCell.x && passedX <= (currentCell.x + currentCell.width))
		{
			returnColumn.push(currentCell);
		}
	}
	return returnColumn;
}
function highlightColumn(passedX)
{
	for(var currentCell in this.grid)
	{
		currentCell = this.grid[currentCell];
		if(passedX >= currentCell.x && passedX <= (currentCell.x + currentCell.width))
		{
			currentCell.highlight = 'yes';
		}
		else
		{
			currentCell.highlight = 'no';
		}
	}
}
function renderGrid()
{
	for(var currentCell in this.grid)
	{
		currentCell = this.grid[currentCell];
		if(currentCell.highlight == 'yes')
		{
			canvasContext.fillStyle='#FFFFCC';
			canvasContext.fillRect(currentCell.x, currentCell.y, currentCell.width, currentCell.height);
			canvasContext.stroke();
		}
		canvasContext.fillStyle='#000000';
		canvasContext.rect(currentCell.x, currentCell.y, currentCell.width, currentCell.height);
		canvasContext.stroke();

		if(currentCell.occupied != 'no')
		{
			if(currentCell.occupied == 'red')
			{
				canvasContext.fillStyle = RED;
			}
			else if(currentCell.occupied == 'blue')
			{
				canvasContext.fillStyle = BLUE;
			}
			canvasContext.beginPath();
			canvasContext.arc(currentCell.x+50, currentCell.y+50, 30, 0, 2*Math.PI);
			canvasContext.closePath();
			canvasContext.fill();
			canvasContext.stroke();
		}
	}
}