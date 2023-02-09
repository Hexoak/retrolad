class Play extends Phaser.Scene {
    constructor() {
      super({
        key: `play`
      });
    }
  
    create() {
      console.log('game init')

      this.cursors = this.input.keyboard.createCursorKeys();

             //flashlight
        console.log('flashlight')
        const x = 320;
        const y = 240;

        const reveal = this.add.image(x, y, 'bg' )
        //this.add.image(x, y, 'bg' ).alpha =.5;
        //reveal.setScale(4);

        //----add shit here in between the masks
        this.dog2 = this.physics.add.sprite(350, 200, 'dog');
        this.dog = this.physics.add.sprite(50, 200, 'dog');
        this.add.image(140,140, 'tree1');
        this.add.image(200,140, 'tree3');
        this.deer = this.physics.add.sprite(164,350, 'deer');
        this.deer2 = this.physics.add.sprite(228,350, 'deer');
        this.deer3 = this.physics.add.sprite(392,350, 'deer');
        this.deer4 = this.physics.add.sprite(456,350, 'deer');

        //----
        this.cover = this.add.image(x, y, 'mask')
        this.cover.alpha = 0.65;
        this.cover.setScale(4);

        //player (above mask)
        this.player = this.physics.add.sprite(300, 200, `player`);
          this.player.setOrigin(0.5, 0.5);
      
        //----

        const width = this.cover.width
        const height = this.cover.height

        const rt = this.make.renderTexture({
          width,
          height,
          add: false
        })

        const maskImage = this.make.image({
          x,
          y,
          key: rt.texture.key,
          add: false
        })

        this.cover.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage)
        this.cover.mask.invertAlpha = true;
        this.cover.setTint('#3a3a3a',5000)
      
        reveal.mask = new Phaser.Display.Masks.BitmapMask(this, maskImage)


        this.renderTexture = rt 

    //player anim
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 40, end: 47 }),
      frameRate: 10,
      repeat: 0,});
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { start: 56, end: 63 }),
      frameRate: 10,});
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 48, end: 55 }),
      frameRate: 10,
      repeat: 0,});
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { start: 32, end: 39 }),
      frameRate: 10,
      repeat: 0,});
    this.anims.create({
      key: 'up-right',
      frames: this.anims.generateFrameNumbers('player', { start: 72, end: 79 }),
      frameRate: 10,
      repeat: 0,});
    this.anims.create({
      key: 'up-left',
      frames: this.anims.generateFrameNumbers('player', { start: 64, end: 71 }),
      frameRate: 10,
      repeat: 0,});
    this.anims.create({
      key: 'idle-right',
      frames: this.anims.generateFrameNumbers('player', { start: 24, end: 31 }),
      frameRate: 10,
      repeat: -1,});
    this.anims.create({
      key: 'idle-left',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 15 }),
      frameRate: 10,
      repeat: -1,});
    this.anims.create({
      key: 'idle-down',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,});
    this.anims.create({
      key: 'idle-up',
      frames: this.anims.generateFrameNumbers('player', { start: 16, end: 23 }),
      frameRate: 10,
      repeat: -1,});

  //dog anims
    this.anims.create({
      key: 'dog-idle',
      frames: this.anims.generateFrameNumbers('dog', { start: 8, end: 15 }),
      frameRate: 10,
      repeat: 1,});
    this.anims.create({
      key: 'dog-right',
      frames: this.anims.generateFrameNumbers('dog', { start: 24, end: 31 }),
      frameRate: 10,
      repeat: 0,});
    this.anims.create({
      key: 'dog-left',
      frames: this.anims.generateFrameNumbers('dog', { start: 16, end: 23 }),
      frameRate: 10,
      repeat: 0,});
    this.anims.create({
      key: 'dog-sits',
      frames: this.anims.generateFrameNumbers('dog', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: 0,});
    this.anims.create({
      key: 'sits-idle',
      frames: this.anims.generateFrameNumbers('dog', { start: 32, end: 39 }),
      frameRate: 10,
      repeat: -1,});

    //deer anims
    this.anims.create({
      key: 'deer-idle',
      frames: this.anims.generateFrameNumbers('deer', { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1,});
    this.anims.create({
      key: 'deer-walk',
      frames: this.anims.generateFrameNumbers('deer', { start: 4, end: 7 }),
      frameRate: 6,
      repeat: -1,});
    this.anims.create({
      key: 'deer-runs',
      frames: this.anims.generateFrameNumbers('deer', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,});
    this.anims.create({
      key: 'deer-eats',
      frames: this.anims.generateFrameNumbers('deer', { start: 12, end: 19 }),
      frameRate: 6,
      repeat: -1,});

    //**camera - Init and follow player */
    const camera = this.cameras.main;
    this.cameras.main.zoom = 1.5;
    // camera.roundPixels = true;
    //camera.startFollow(this.player);
    //camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //variables:
      this.dog2.anims.play('dog-sits').once('animationcomplete', () => {
      this.dog2.anims.play('sits-idle');
     });

     this.deer.anims.play('deer-idle');
      this.deer2.anims.play('deer-walk');
      this.deer3.anims.play('deer-runs');
      this.deer4.anims.play('deer-eats');

  }   //...create()
  
    update() {
      this.handleInput();
      this.flashlight();
      this.dogFollows();

  }   //...update()
  
    handleInput() {
      var playerDir;
      
      // player movement and animations -- as a function running every frame in update()
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-75);
            
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(75);

        }
        else {
            // If neither left or right are pressed, stop moving on x
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-75);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(75);
        }
        else {
            // If neither up or down are pressed, stop moving on y
            this.player.setVelocityY(0);
        }
    //Player Anims (by velocity):
      if (this.player.body.velocity.x == -75 && this.player.body.velocity.y == 0) {
        this.player.anims.play('left', true);
        this.playerDir = 'left';
        }
      if (this.player.body.velocity.x == 75 && this.player.body.velocity.y == 0) {
        this.player.anims.play('right', true);
        this.playerDir = 'right';
        }
      if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == -75) {
        this.player.anims.play('up', true);
        this.playerDir = 'up';
        }
      if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 75) {
        this.player.anims.play('down', true);
        this.playerDir = 'down';
        }
      if (this.player.body.velocity.x == 75 && this.player.body.velocity.y == -75) {
        this.player.anims.play('up-right', true);
        this.playerDir = 'up-right';
        }
      if (this.player.body.velocity.x == -75 && this.player.body.velocity.y == -75) {
        this.player.anims.play('up-left', true);
        this.playerDir = 'up-left';
        }
      if (this.player.body.velocity.x == -75 && this.player.body.velocity.y == 75) {
        this.player.anims.play('left', true);
        this.playerDir = 'down-left';
        }       
      if (this.player.body.velocity.x == 75 && this.player.body.velocity.y == 75) {
        this.player.anims.play('right', true);
        this.playerDir = 'down-right';
        }
    //idles
      if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0 && this.playerDir == 'right') {
        this.player.anims.play('idle-right');
        this.playerDir = 'idle-right';
        }
      if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0 && this.playerDir == 'left') {
        this.player.anims.play('idle-left');
        this.playerDir = 'idle-left';
        }
      if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0 && this.playerDir == 'up') {
        this.player.anims.play('idle-up');
        this.playerDir = 'idle-up';
        }
      if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0 && this.playerDir == 'down') {
        this.player.anims.play('idle-down');
        this.playerDir = 'idle-down';
        }          
      
  }   //...handleinput()

  flashlight(){
          //flashlight items
          //var r = Math.random()*1.25 +100
            //setInterval for flashlight 'flicker'?
          var r = 64
          const x = this.player.x - this.cover.x + this.cover.width * 0.5
          const y = this.player.y - this.cover.y + this.cover.height * 0.5
          this.renderTexture.clear()
          this.renderTexture.draw(this.light, x, y)

          
        this.light = this.add.circle(0, 0, r, 0x000000, 1)
        this.light.visible = false

        //console.log(r)

          
  }

      dogFollows() {
        //addditions - Sproatic dog movements. "cases"?
        // dog vars, follow code, vel calc and anim functions
        let dogCollide = false;
        
        this.physics.moveToObject(this.dog, this.player, 70);
        this.physics.add.collider(this.dog, this.player, this.dogcheck());
        this.player.body.immovable = true;
        
        if (this.dog.body.position.x < this.player.body.position.x-25 && this.dogCollide == false){
        this.dog.anims.play('dog-right', true);
        }
        if (this.dog.body.position.x > this.player.body.position.x-25 && this.dogCollide == false){
          this.dog.anims.play('dog-left', true);
          }
        if (this.dogCollide == true){
            this.dog.anims.play('dog-idle', true);

            var dogtimer;
            var dogState = 'idle';

            this.dogtimer++; 
            
            if (this.dogtimer == 50){
              this.dogState = 'sitting';
            }
            else{ 
              this.dogtimer = 0
              this.dogState = 'idle';
            }
           //console.log(this.dogtimer);
           //console.log(this.dogsState);
          }
    }   //...dogFollows() 

    dogCase(){  
      switch(dogState){
        case 'idle':
          this.dog.anims.play('dog-idle');
          break;
        case 'sitting':
          this.dog.anims.play('sits-idle');

        // this.dog.anims.play('dog-sits').once('animationcomplete', () => {
          //   this.dog.anims.play('sits-idle');
          //  });
          break;}
      
    }   //...dogCase()

    dogcheck(){
      if (this.dog.body.touching.left || this.dog.body.touching.right){
        this.dogCollide = true;
      }
      else {
        this.dogCollide = false;
      }
    }   //...dogcheck()

    dogCasetest(){

    }//...dogCasetest
  
}     //...gameAll()

