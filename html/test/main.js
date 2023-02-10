"use strict";

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  parent: 'gameContainer',
  backgroundColor: '#a7ad91',
  physics: {
    default: 'arcade',
 
  },
  // NOTE: Added Boot scene to the list of scenes in the first position
  // so it will load first
  scene: [Boot, Play]
};

let game = new Phaser.Game(config);

            //scaling options?
            game.scale.on('resize', function (gameSize, baseSize, displaySize, resolution) {
              if (game.scale.isFullscreen) {
                game.scale.setGameSize(displaySize.width, displaySize.height);
              }
            });
            
            game.scale.fullscreenTarget = document.getElementById('gameContainer');
            
            document.getElementById('fullscreenButton').addEventListener('click', function () {
              game.scale.startFullscreen();
            });