function cellClass(constructorObject)
{
	this.x = constructorObject['x'];
	this.y = constructorObject['y'];
	this.width = 100;
	this.height = 100;
	this.occupied = constructorObject['occupied'];
	this.highlight = 'no';
	this.cellName = constructorObject['cellName'];
	this.addPiece = addPiece;
	return this;
}
function addPiece(passedColor)
{
	this.occupied = passedColor;
}