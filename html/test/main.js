"use strict";

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  backgroundColor: '#a7ad91',
  physics: {
    default: 'arcade',
 
  },
  // NOTE: Added Boot scene to the list of scenes in the first position
  // so it will load first
  scene: [Boot, Play]
};

let game = new Phaser.Game(config);