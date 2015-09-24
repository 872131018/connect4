module.exports = playerClass;
function playerClass(passedPlayerObject)
{
	this.color = passedPlayerObject['color'];
	this.id = passedPlayerObject['id'];
}