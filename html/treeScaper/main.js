document.addEventListener("DOMContentLoaded", function () {
    // Define the configuration object for Phaser
    var config = {
        type: Phaser.AUTO,
        width: 300,
        height: 250,
        backgroundColor: "0xE3EEC0",
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    // Create a new Phaser.Game instance
    var game = new Phaser.Game(config);

    // Preload function to load assets
    function preload() {
        // Load the spritesheet
        this.load.spritesheet('trees', './assets/16trees.png', {
            frameWidth: 8, // Adjust based on your spritesheet frame width
            frameHeight: 16 // Adjust based on your spritesheet frame height
        });
        this.load.spritesheet('darktrees', './assets/16treesDark.png', {
            frameWidth: 8, // Adjust based on your spritesheet frame width
            frameHeight: 16 // Adjust based on your spritesheet frame height
        });
    }

    // Create function to create game objects
    function create() {
        //calcVars();
        // Extract the frames as individual variables

        for (let j=0; j< 32; j++)
            for (var i = 0; i < 16; i++) { // Assuming 16 frames in the spritesheet
                for (var i = 0; i < 16; i++) {
                    // Generate random coordinates
                    var randomX = Phaser.Math.Between(0, game.config.width);
                    var randomY = Phaser.Math.Between(64,108);
                    var scale = Phaser.Math.Between(1,1.5);
        
                    // Create an image from the spritesheet at random coordinates
                    var sprite = this.add.sprite(randomX, randomY, 'darktrees', Phaser.Math.Between(0, 15));
                    //sprite.setScale(scale);
                    // 'mySpritesheet' is the key used in preload, and Phaser.Math.Between(0, 3) is the frame index
                } 
                for (var i = 0; i < 16; i++) {
                    // Generate random coordinates
                    var randomX = Phaser.Math.Between(0, game.config.width);
                    var randomY = Phaser.Math.Between(86,132);
                    var scale = Phaser.Math.Between(1,1.5);
        
                    // Create an image from the spritesheet at random coordinates
                    var sprite = this.add.sprite(randomX, randomY, 'trees', Phaser.Math.Between(0, 15));
                    //sprite.setScale(scale);
                    // 'mySpritesheet' is the key used in preload, and Phaser.Math.Between(0, 3) is the frame index
            }

        }
    }

    


function update(){
    //calcVars();
}

//ref
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Example usage: generate a random number between 1 and 10
var randomNumber = getRandomNumber(1, 11);
//console.log(randomNumber);



});



function reload(){
    location.reload();
}
