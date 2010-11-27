var Food = {
	
	generate: function() {
		
		food = new Square().generate();
		food.toString = function() { return "Food" };
		return food;
	}
}