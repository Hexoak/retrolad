// Create our only scene called mainScene, in the game.js file
class mainScene {
 
  preload() {
    // It will load all the assets, like sprites and sounds

    this.load.image('player', 'assets/player.png'); 
    this.load.image('wall', 'assets/wall.png');
    this.load.image('collect', 'assets/collect.png');
    //colors #2b2b26, #706b66, #a89f94, #e0dbcd

  
  }//preload
  
  create() {
    // This method is called once, just after preload()
    // It will initialize our scene, like the positions of the sprites
    	  //Move the player
	      this.arrow = this.input.keyboard.createCursorKeys();
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.wall = this.physics.add.image(50,50,'wall');

        this.wall.setImmovable(true);

        this.physics.add.collider(this.player, this.wall);
        this.player.setCollideWorldBounds(true);
  
  }//create
  
  update() { 
    // It will handle all the game's logic, like movements
    
    // player movement
	  if (this.arrow.right.isDown) {
		this.player.x += 3;
	  } else if (this.arrow.left.isDown) {
		this.player.x -= 3;
	  } 
  
	  if (this.arrow.down.isDown) {
		this.player.y += 3;
	  } else if (this.arrow.up.isDown) {
		this.player.y -= 3;
	  } 
  
  }//update

  //newfunction(){
  //}

}//mainClass

new Phaser.Game({
  width: 480, // Width of the game in pixels
  height: 432, // Height of the game in pixels
  backgroundColor: '#2b2b26', // The background color (blue)
  scene: mainScene, // The name of the scene we created
  physics: { default: 'arcade' }, // The physics engine to use
  parent: 'game', // Create the game inside the <div id="game"> 
});