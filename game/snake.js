function Snake(current) {
	
	var self = this;
  self.size = 3;
  self.squares = [];
	self.session_id = null;
	self.current = current || new Square().generate();
	self.toString = function() { return "Snake" };  
}

Snake.prototype.draw = function() {

	this.current.draw('#7CFC00');
	
	if(this.squares.length > this.size) {
		var rm = this.squares.shift();
		delete Scene.ELEMENT_COORDS[[rm.x+'x'+rm.y]];
		Scene.CONTEXT.clearRect(rm.x,rm.y,Scene.SQUARE_SIZE,Scene.SQUARE_SIZE);
	}
}

Snake.prototype.move = function() {

	this.current = (this.squares[this.squares.length-1] !== undefined) ? clone(this.squares[this.squares.length-1]) : new Square().generate() ;

	(this.current.axe === 'x') ?
		(this.current.x = this.current.x + ~~(this.current.direction + Scene.SQUARE_SIZE)):
		(this.current.y = this.current.y + ~~(this.current.direction + Scene.SQUARE_SIZE));
		
	this.swallow();
	this.hitWall();
	this.eatTail();
	this.squares.push(this.current);
	Scene.ELEMENT_COORDS[this.current.x+'x'+this.current.y] = clone(this.current);
}

Snake.prototype.setDirection = function(direction) {
	
	this.current.direction = direction[0];
	this.current.axe = direction[1];	
}

Snake.prototype.hitWall = function() {

  if(this.current.x < 0 ||
		 this.current.y < 0 ||
		 this.current.x > Scene.ELEMENT_ATTRS['width'] ||
     this.current.y > Scene.ELEMENT_ATTRS['height']) {
			
		var sign = (this.current.direction === '-') ? '+' : '-';
	
		(this.current.axe === 'x') ?
			(this.current.x = this.current.x + ~~(sign + ~~Scene.ELEMENT_ATTRS['width']) + ~~(sign + Scene.SQUARE_SIZE)) :
			(this.current.y = this.current.y + ~~(sign + ~~Scene.ELEMENT_ATTRS['height']) + ~~(sign + Scene.SQUARE_SIZE));
	}
}

Snake.prototype.swallow = function() {

	if(this.current.x === Scene.SNAKE_FOOD.x &&
		 this.current.y === Scene.SNAKE_FOOD.y) {
		
		Scene.CONTEXT.clearRect(Scene.SNAKE_FOOD.x,Scene.SNAKE_FOOD.y,Scene.SQUARE_SIZE,Scene.SQUARE_SIZE);
		delete Scene.SNAKE_FOOD;
		this.addSquare();
		Scene.addFood();
		
		Score.update();
	}
}

Snake.prototype.eatTail = function() {
	if(this.current.checkCoord() === true) {
		Scene.gameOver();
	}
}

Snake.prototype.addSquare = function() {
	
	obj = clone(this.squares[this.squares.length-1]);
	obj.x+=Scene.SQUARE_SIZE;
	
	this.squares.push(obj);
	
	this.size++;
}

