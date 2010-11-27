var Score = {
	
	value: 0,
	
	update: function() {
		
		this.value++;

		Scene.ELEMENT_SCORE.innerHTML = 'Score: '+this.value;
		
		if(this.value % 5 === 0) {
			Scene.changeSpeed(Scene.DELAY-10);
		}
	}
}