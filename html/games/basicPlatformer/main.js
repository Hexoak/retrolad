"use strict";

let config = {
  type: Phaser.AUTO,
  width: 640 ,
  height: 360,
  backgroundColor: '#796435',
  physics: {
    default: 'arcade',
      arcade:{
    //debug: true,
      }
  },
  // NOTE: Added Boot scene to the list of scenes in the first position
  // so it will load first
  scene: [Boot, Play]
};

let game = new Phaser.Game(config);