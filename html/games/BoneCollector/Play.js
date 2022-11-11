class Play extends Phaser.Scene {
    constructor() {
      super({
        key: `play`
      });
    }
  
    create() {
        console.log('game init')

      //sounds
      
      this.snd_pulse = this.sound.add('snd_pulse', {volume: .99}, {loop:false});


//**tilemap
const map = this.make.tilemap({ key: 'tilemap' });
const tileset = map.addTilesetImage('simple4d', 'base_tiles');
const background = map.createLayer('background', tileset);
this.player = this.physics.add.sprite(150, 100, `player`);
const frontLayer = map.createLayer('frontLayer', tileset,0,0);
let backLayer = map.createLayer('backLayer', tileset,0,0);
//**collisions? */
frontLayer.setCollisionByProperty({ collides: true });
background.setCollisionByProperty({ collides: true });

//collides (WORKS!!!)
this.player.setCircle(16); 
this.physics.add.collider(this.player, frontLayer);
this.physics.add.collider(this.player, background);

//* collisions debugging (WORKS!!!) */
          // const debugGraphics = this.add.graphics().setAlpha(0.75);
          // frontLayer.renderDebug(debugGraphics, {
          // tileColor: null, // Color of non-colliding tiles
          // collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
          // faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
          // });
//player anim
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 5 }),
        frameRate: 6,
        repeat: 0,});
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 6, end: 7 }),
        frameRate: 4,});
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
        frameRate: 6,
        repeat: 0,});
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
      frameRate: 4,
      repeat: 0,});
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
      frameRate: 6,
      repeat: 0,});

//**camera - Init and follow player */
const camera = this.cameras.main;
this.cameras.main.zoom = 1.5;
camera.startFollow(this.player);
camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

//Game Logic

      //random x,y for collectables
      this.counter = 0;
      
      
      let x1= 230;
      let y1 = 180;
      let x2 = Math.random() * (map.widthInPixels - 96);
      let y2 = Math.random() * (map.heightInPixels -96);
      let x3 = Math.random() * (map.widthInPixels - 96)
      let y3 = Math.random() * (map.heightInPixels -96);
      let x4 = Math.random() * (map.widthInPixels - 96)
      let y4 = Math.random() * (map.heightInPixels -96);
      let x5 = Math.random() * (map.widthInPixels - 96)
      let y5 = Math.random() * (map.heightInPixels -96);
  
      this.collectable = this.physics.add.sprite(x1, y1, `wall`);
      this.collectable2 = this.physics.add.sprite(x2, y2, `wall`);
      this.collectable3 = this.physics.add.sprite(x3, y3, `wall`); 
      this.collectable4 = this.physics.add.sprite(x4, y4, `wall`); 
      this.collectable5 = this.physics.add.sprite(x5, y5, `wall`); 
  
      this.physics.add.collider(this.player, this.wall);
      this.physics.add.collider(this.player, this.wall2);
      this.physics.add.collider(this.player, this.wall3);
      this.physics.add.collider(this.player, this.wall4);
      this.physics.add.collider(this.player, this.wall5);
  
      this.physics.add.overlap(this.player, this.collectable, this.collectItem, null, this);
      this.physics.add.overlap(this.player, this.collectable2, this.collectItem, null, this);
      this.physics.add.overlap(this.player, this.collectable3, this.collectItem, null, this);
      this.physics.add.overlap(this.player, this.collectable4, this.collectItem, null, this);
      this.physics.add.overlap(this.player, this.collectable5, this.collectItem, null, this);
      //this.createAnimations();
  
      //this.player.play(`idle`);
  
      this.cursors = this.input.keyboard.createCursorKeys();
      
	  

    
    }
  
    update() {
      this.handleInput();
  

          

    }
    // More methods would be here
    collectItem(player, item) {
        this.snd_pulse.play();
        item.destroy();
        this.counter++;
        console.log(this.counter);
        this.itemCheck();
    }
  
  itemCheck (){
    if (this.counter == 5){
      this.cameras.main.zoom = 3;
      this.cameras.main.fadeOut(5000, 0, 0, 0)
      //this.snd_verb.stop();
      
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
        this.scene.start('phaser-logo')
        this.scene.start('title');
        });

  }
}

  
  handleInput() {
// player movement -- as a function running every frame in update()
        if (this.cursors.left.isDown) {
          this.cursors.down.isDown=false;
          this.cursors.up.isDown=false;
            this.player.setVelocityX(-75);
          this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
          this.cursors.down.isDown=false;
          this.cursors.up.isDown=false;
            this.player.setVelocityX(75);
          this.player.anims.play('right', true);
        }
        else {
            // If neither left or right are pressed, stop moving on x
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
          this.cursors.right.isDown=false;
          this.cursors.left.isDown=false;
            this.player.setVelocityY(-75);
          this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown) {
          this.cursors.right.isDown=false;
          this.cursors.left.isDown=false;
            this.player.setVelocityY(75);
          this.player.anims.play('down', true);
        }
        else {
            // If neither up or down are pressed, stop moving on y
            this.player.setVelocityY(0);
        }

  }
}

