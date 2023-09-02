"use strict";


var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight, physics: {
    default: 'arcade',
  },
  // NOTE: Added Boot scene to the list of scenes in the first position
  // so it will load first
  scene: [Boot, Play]
};

let game = new Phaser.Game(config);