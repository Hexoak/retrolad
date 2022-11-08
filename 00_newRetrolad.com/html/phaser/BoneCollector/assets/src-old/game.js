class mainScene {
 
  preload() {
    this.load.spritesheet('player', 'assets/tiles/player-sprites/player-spritesheet.png',{frameWidth:32,frameHeight:32});
  	this.load.image('base_tiles', 'assets/tilemap/simple4d.png')
  	this.load.tilemapTiledJSON('tilemap', 'assets/tilemap/simple4d.json')
  }
  create() {
    cursors = this.input.keyboard.createCursorKeys();
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

//**tilemap
    const map = this.make.tilemap({ key: 'tilemap' });
    const tileset = map.addTilesetImage('simple4d', 'base_tiles');
    const background = map.createLayer('background', tileset);
    const frontLayer = map.createLayer('frontLayer', tileset,0,0);
    //let obj_layer = map.createStaticLayer('obj_layer', tileset);
  //renders player sprite in proper layer stack
      this.player = this.physics.add.sprite(160, 170, 'player');
    let backLayer = map.createLayer('backLayer', tileset,0,0);
    


//*collisions..*/
    //xxplayer.setCircle(15);
    this.player.setCollideWorldBounds(false);
    
    //obj_layer.setCollisionByProperty({ collides: true });
    frontLayer.setCollisionByProperty({ collides: true });
    
    //something wrong with player vs collisions..
    //this.physics.add.collider(player, obj_layer);
    this.physics.add.collider(this.player, this.frontLayer);

//* collisions debugging */
const debugGraphics = this.add.graphics().setAlpha(0.75);
// obj_layer.renderDebug(debugGraphics, {
//   tileColor: null, // Color of non-colliding tiles
//   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
//   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
// });
frontLayer.renderDebug(debugGraphics, {
  tileColor: null, // Color of non-colliding tiles
  collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
  faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
});

//**camera - Init and follow player */
    const camera = this.cameras.main;
    this.cameras.main.zoom = 2;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  }
  update() { 
  //**player Movement */
    var vel=1.25;
    if (cursors.left.isDown){
      cursors.down.isDown=false;
      cursors.up.isDown=false;
      this.player.x = this.player.x-vel;
      this.player.anims.play('left', true);}
    if (cursors.right.isDown){
      cursors.down.isDown=false;
      cursors.up.isDown=false;
      this.player.x = this.player.x+vel;
      this.player.anims.play('right', true);}
    if (cursors.up.isDown){
      cursors.right.isDown=false;
      cursors.left.isDown=false;
      this.player.y = this.player.y-vel;
      this.player.anims.play('up', true);}
    if (cursors.down.isDown){
      cursors.right.isDown=false;
      cursors.left.isDown=false;
      this.player.y = this.player.y+vel;
      this.player.anims.play('down', true);}

//console.log(player.x,player.y);
  }
}
var cursors;
var player;
new Phaser.Game({
  width: 1280,
  height: 720,
  backgroundColor: '#aeba89',
  scene: mainScene,
  physics: { default: 'arcade', arcade: {debug: true, }},
  parent: 'game',
});