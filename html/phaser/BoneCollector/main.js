"use strict";

let config = {
  type: Phaser.AUTO,
  width: 480,
  height: 432,
  backgroundColor: '#aeba89', 
  physics: {
    default: 'arcade',
  },
  // NOTE: Added Boot scene to the list of scenes in the first position
  // so it will load first
  scene: [Boot, Title, Play]
};

let game = new Phaser.Game(config);