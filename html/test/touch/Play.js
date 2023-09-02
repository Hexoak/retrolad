class Play extends Phaser.Scene {
    constructor() {
      super({
        key: `play`
      });
    }
  
    create() {
      console.log('game-create-function-ok')

      this.player = this.physics.add.sprite(100, 100, `player`);
      this.target = this.physics.add.sprite(200, 100, `wall`);
      this.target.setTint(`0xdd3333`);
      this.target.setScale(2);
      this.player.setScale(2);


      this.input.addPointer(2); // Enable multi-touch support
      this.input.on('pointerdown', this.onPointerDown, this);

      //text
      this.inputText = this.add.text(window.innerWidth/2, window.innerHeight/4, '', { fontSize: '24px', fill: '#fff' });
      this.inputText.setOrigin(0.5);
      this.inputText.setText('Touch The Screen');
      this.distanceText = this.add.text(10,10, '', { fontSize: '32px', fill: '#fff' });
    
    }//create()
  
    update() {
        
      //Stop on target (crazy math not understood to me)
        const tolerance = 20;
        const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.target);

        if (this.player.body.speed > 0)
        {
            this.distanceText.setText(`Distance: ${distance}`);
            if (distance < tolerance)
            {
                this.player.body.reset(this.target.x, this.target.y);
            }
        }
    } //update()

    onPointerDown(pointer) {
      console.log('touch', pointer.x, pointer.y);
      if (this.target) {
          this.targetX = pointer.x;
          this.targetY = pointer.y;
          this.target.setPosition(this.targetX, this.targetY);
          this.inputText.setPosition(this.targetX+30, this.targetY-25);
          this.inputText.setText('(' + pointer.x + ', ' + pointer.y + ')');
          this.moveTo();
        }
      } //onPointerDown()
    
    moveTo(){
      //console.log('move');
      this.physics.moveToObject(this.player, this.target, 500);
    }//moveTo()

}//end

