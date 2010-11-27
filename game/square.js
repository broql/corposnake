var Square = function(x, y, axe, direction) {
  
	this.x = 0;
	this.y = 0;
  this.axe = 'x';
  this.direction = '-';
	this.toString = function() { return "Square" };
}

Square.prototype.draw = function(color) {

	Scene.CONTEXT.fillStyle = color || '#fff';		
	Scene.CONTEXT.fillRect(this.x, this.y, Scene.SQUARE_SIZE, Scene.SQUARE_SIZE);
}

Square.prototype.generate = function() {
	
	this.x = Math.floor(Scene.ELEMENT_ATTRS['width']/Scene.SQUARE_SIZE*Math.random())*Scene.SQUARE_SIZE;
	this.y = Math.floor(Scene.ELEMENT_ATTRS['height']/Scene.SQUARE_SIZE*Math.random())*Scene.SQUARE_SIZE;
	
	if(this.checkCoord() === true) {
		this.generate();
	}
	else {
		return this;
	}
}

Square.prototype.checkCoord = function() {
	return (Scene.ELEMENT_COORDS[this.x+'x'+this.y] !== undefined);
}
