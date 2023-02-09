class Boot extends Phaser.Scene {

    constructor() {
      super({
        key: `boot`
      });
    }
  
    preload(){
        this.load.image('wall', './assets/wall.png');
        this.load.spritesheet('player', './assets/all8d-w-idle.png',{frameWidth:40,frameHeight:64});
        this.load.spritesheet('dog', './assets/dogall.png',{frameWidth:32,frameHeight:32});
        this.load.spritesheet('deer', './assets/deerAll.png',{frameWidth:64,frameHeight:64});
        this.load.image('mask', './assets/mask.png');
        this.load.image('bg', './assets/bg.png');
        this.load.image('tree1', './assets/tree1.gif');
        this.load.image('tree3', './assets/tree3.gif');
        this.load.image('deerstatic', './assets/deer.gif');


        this.load.on(`complete`, () => {
            // Switch to the Play scene
            console.log('boot.js - assets loaded; Scene switch to play.js');
            this.scene.start(`play`);
          });
    }

    create() {
        console.log('boot.js init');
      let loadingTextStyle = {
        fontFamily: "sans-serif",
        fontSize: "40px",
        fill: "#ffffff",
        align: "center"
      };
      let loadingString = `Loading...`;
      this.loadingText = this.add.text(100, 100, loadingString, loadingTextStyle);

     
  
      // NOTE: Switch to the scene with the key of "play"
      // EXAMPLE: https://phaser.io/examples/v3/view/scenes/change-scene-from-create
      this.scene.start(`play`);
    }
  
    update() {
  
    }
  }