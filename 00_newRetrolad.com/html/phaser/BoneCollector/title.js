class Title extends Phaser.Scene {

    constructor() {
      super({
        key: `title`
      });
    }

preload(){
    var anyKey;
}

create(){
    console.log("title init");
    this.snd_verb = this.sound.add('snd_verb', {volume: 0.15}, {loop:true});



    this.title = this.physics.add.sprite(240, 216, `title`);
    //this.physics.add.image('wall', 10,10);
   
    this.anims.create({
        key: 'titleAnim',
        frames: this.anims.generateFrameNumbers('title', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: 1});

//camera stuff
this.cameras.main.setBackgroundColor('#aeba89')


}

onEventScene(){
    console.log('scene triggered')
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
		this.scene.start('phaser-logo')
    this.scene.start('play');
    })
}

update(){

    //keyboard input (any)
    this.anyKey = this.input.keyboard.once('keydown', function () {
        this.anyKey.destroy;
        this.cameras.main.fadeOut(1000, 0, 0, 0)
        this.snd_verb.play();
        this.onEventScene();
    }, this);
    
    //title anim
    this.title.anims.play('titleAnim', true);
}



}

