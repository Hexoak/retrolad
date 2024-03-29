class Boot extends Phaser.Scene {

    constructor() {
      super({
        key: `boot`
      });
    }
  
    preload(){
        this.load.image('wall', './assets/wall.png');
        this.load.image('player', './assets/player.png')

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