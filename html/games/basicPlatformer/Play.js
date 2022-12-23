class Play extends Phaser.Scene {
    constructor() {
      super({
        key: `play`,
        physics:{
          default: 'arcade',
          arcade:{
            //gravity: {y:-100}
          }
        }
      });
    }
  
    create() { 
        console.log('Game Load - ok');

//Tilemap:
const map = this.make.tilemap({ key: 'tilemap' });    
const tileset = map.addTilesetImage('floor', 'base_tiles');  
const background = map.createLayer('floor', tileset);
const tier1 = map.createLayer('tier1', tileset);
this.player = this.physics.add.sprite(128, 192, 'player');
const fore = map.createLayer('fore', tileset);


      this.player.body.gravity.y = 500;
      //t his.player.body.bounce.y = 0.2;
      //this.player.body.collideWorldBounds = true;



      this.player.setSize(16,32, true);
      this.player.setScale(1.5)

      background.setCollisionByProperty({ collides: true });
      tier1.setCollisionByProperty({ collides: true });
      this.physics.add.collider(this.player, background);
      this.physics.add.collider(this.player, tier1);


//* collisions debugging (WORKS!!!) */
          // const debugGraphics = this.add.graphics().setAlpha(0.25);
          // background.renderDebug(debugGraphics, {
          // tileColor: null, // Color of non-colliding tiles
          // collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
          // faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
          // });
          
          // tier1.renderDebug(debugGraphics, {
          // tileColor: null, // Color of non-colliding tiles
          // collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
          // faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
          // });

      //ground?


//player anim
          this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 16, end: 23 }),
            frameRate: 12,
            repeat: 0,});
          this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 7 }),
            frameRate: 4,});
          this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 15 }),
            frameRate: 12,
            repeat: 0,});
          this.anims.create({
          key: 'down',
          frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
          frameRate: 4,
          repeat: 0,});
          this.anims.create({
            key: 'shoot',
            frames: this.anims.generateFrameNumbers('player', { start: 24, end: 31 }),
            frameRate: 4,
            repeat: 0,});
          this.anims.create({
          key: 'idle',
          frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
          frameRate: 4,
          repeat: 0,});
          this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player', { start: 15, end: 15   }),
            frameRate: 12,
            repeat: 1 ,});


      this.cursors = this.input.keyboard.createCursorKeys();
      this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
       this.WASDkeys = this.input.keyboard.addKeys({
        W: 'W',
        A: 'A',
        S: 'S',
        D: 'D',
        J: 'J'
    });

//**camera - Init and follow player */
const camera = this.cameras.main;
this.cameras.main.zoom = 1;
camera.roundPixels = true;
camera.startFollow(this.player);
camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    }
  
    update() {
  
      this.jumper();
      this.handleInput();
      //console.log(this.player.y)

      //Camera Tricks/end
      var cam = this.cameras.main;
      if (this.player.x <350){
        cam.zoomTo(2,5000)}

      if ((this.player.x > 350) && (this.player.x < 800)){
          cam.zoomTo(1.5,3000)}

      if ((this.player.x > 800) && (this.player.x < 1500)){
            cam.zoomTo(2,3000)}
            
      if ((this.player.x > 1500) && (this.player.x < 2200)){
              cam.zoomTo(1,3000)}
  

      if ((this.player.x > 2200) && (this.player.x < 3000)){
        cam.zoomTo(2,3000)
        cam.fadeOut(1000, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
          this.scene.start('play')
        })
      }
        
      
      if ((this.player.y > 360) && (this.player.y < 500)){
        cam.fadeOut(500, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
          this.scene.start('play')
        })
      }
    }
    
    // More methods would be here
    collectItem(player, item) {
        // NOTE: We'll keep it simpavatarle by just removing the collectable from the scene
        // using its .destroy() method!
        item.destroy();
    }
  
  handleInput() {

// player movement -- as a function running every frame in update()
if ((this.cursors.left.isDown) ||(this.WASDkeys.A.isDown)){
  this.cursors.down.isDown=false;
  this.cursors.up.isDown=false;
    this.player.setVelocityX(-100);
  this.player.anims.play('left', true);
  
}
else if ((this.cursors.right.isDown) || (this.WASDkeys.D.isDown)){
  this.cursors.down.isDown=false;
  this.cursors.up.isDown=false;
    this.player.setVelocityX(100);
  this.player.anims.play('right', true);

}
else {
    // If neither left or right are pressed, stop moving on x
    this.player.setVelocityX(0);
    this.player.anims.play('idle', true);
}

    

// this.jumptimer++;   
// console.log(this.jumptimer); 

if (Phaser.Input.Keyboard.JustDown(this.spaceBar) && (this.jumpOK === true)){
  this.player.setVelocityY(-200);
  this.player.anims.play('jump', false);
}


}//handleinput }

jumper() {
//jump check - makes sure player is on ground
  if (this.player.body.onFloor()){
    this.jumpOK = true;
  }
  else {
    this.jumpOK = false;

    
  }
}//jumper() }

}
