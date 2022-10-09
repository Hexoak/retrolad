class Boot extends Phaser.Scene {

    constructor() {
      super({
        key: `boot`
      });
    }
  
        preload(){
      this.load.image('retroladlogo', '/assets/retroladlogo.png')  
      this.load.image('wall', '/assets/player-sprites/bones.png');
      this.load.image('avatar', '/assets/player.png')

      this.load.spritesheet('player', 'assets/player-sprites/player-spritesheet.png',{frameWidth:32,frameHeight:32});
      this.load.spritesheet('title', 'assets/titles/boneCollector-titleSpritesheet.png', {frameWidth:480, frameHeight:432});
      this.load.image('base_tiles', 'assets/tilemap/simple4d.png')
      this.load.tilemapTiledJSON('tilemap', 'assets/tilemap/simple4d.json')


      this.load.audio('snd_pulse', [ '/assets/sounds/halls pulse.mp3' ]);
      this.load.audio('snd_verb', [ '/assets/sounds/verb.wav' ]);
      this.load.audio('snd_walk', [ '/assets/sounds/halls select.mp3' ]);

    }

    create() {
      console.log('boot.js init');
      var logo; 
      this.snd_pulse = this.sound.add('snd_pulse', {volume: .99}, {loop:false});
      this.logo = this.physics.add.image(240,432,'retroladlogo');
      this.logo.setScale(2);

    }
     
    update() {
 
     this.timery()

    }

timery(){
 
var timedEvent;

  if (this.logo.y > 200){
    this.logo.y = this.logo.y - 1.5;
    this.snd_pulse.play();
    }
    else if (this.logo.y = 200){
      this.timedEvent = this.time.delayedCall(3000, this.onEvent, null, this);  
    }

  }

onEvent(){
  console.log('bootloader complete')
  this.scene.start('title');

  }

}



