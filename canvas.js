var canvas = document.getElementById('can');
var c = canvas.getContext('2d');

canvas.width = 480 ;
canvas.height = 432;

//layer 1
var canvas_stack = new CanvasStack('can');
var layer1 = canvas_stack.createLayer();
var layer1_ctx = document.getElementById(layer1).getContext('2d');
//layer2 (runs on top of layer 1)
var layer2 = canvas_stack.createLayer();
var layer2_ctx = document.getElementById(layer2).getContext('2d');
//layer3
var layer3 = canvas_stack.createLayer();
var layer3_ctx = document.getElementById(layer2).getContext('2d');



function Spawner1 (x, y, dx, dy, radius){
    this.x = Math.random()*innerWidth;
    this.y = y;
    this.dx = dx*2;
    this.dy = dy*2;
    this.radius = radius
    this.w = w*.25;
    this.h = h*.25;

    this.draw = function(){
        layer1_ctx.fillStyle = '#5E6745';
        layer1_ctx.fillRect(this.x,this.y,this.h,this.w);
    }
 
        this.update =function(){
            if (this.x  > innerWidth || this.x +1 < 0){
                this.x= 1;
            }
            if (this.y > innerHeight){
                this.y = 150;
            }
        
          //this.x += this.dx; 
            this.y += this.dy; 

            this.draw();
        }
}

function Spawner2 (x, y, dx, dy, radius){
    this.x = Math.random()*innerWidth;
    this.y = y/.5;
    this.dx = dx*1.25;
    this.dy = dy*1.25;
    this.radius = radius
    this.w = w*2;
    this.h = h*2;

    this.draw2 = function(){
        layer2_ctx.fillStyle = '#E3EEC0';
        layer2_ctx.fillRect(this.x,this.y,this.h,this.w);

    }
        this.update =function(){
            if (this.x  > innerWidth || this.x +1 < 0){
                this.x= 1;
            }
        
            if (this.y > innerHeight){
                this.y = 1;
            }
        
            //this.x += this.dx; 
            this.y += this.dy; 

            this.draw2();
        }
}

function Spawner3 (x, y, dx, dy, radius){
    this.x = Math.random()*innerWidth;
    this.y = y/5;
    this.dx = dx*1.55;
    this.dy = dy*1.55;
    this.radius = radius
    this.w = w*1.5;
    this.h = h*1.5;

    this.draw3 = function(){
        layer2_ctx.fillStyle = '#AEBA89';
        layer2_ctx.fillRect(this.x,this.y,this.h,this.w);

    }
        this.update =function(){
            if (this.x  > innerWidth || this.x +1 < 0){
                this.x= 1;
            }
        
            if (this.y > innerHeight){
                this.y = 1;
            }
        
            //this.x += this.dx; 
            this.y += this.dy; 

            this.draw3();
        }
}

var spawnArray = [];

for (var i = 0; i < 500; i++){
   
    
    var radius = Math.random() * 100;
    var x = Math.random() * (innerWidth - radius *4) + radius;
    var y = Math.random() * (innerHeight - radius *4) + radius;
    var dx = (Math.random() * 50);
    var dy = (Math.random() *2);
    var h = Math.random() * 6;
    var w = h

    spawnArray.push(new Spawner1(x,y,dx,dy,radius));
    spawnArray.push(new Spawner2(x,y,dx,dy,radius));
    spawnArray.push(new Spawner3(x,y,dx,dy,radius));

}


console.log (spawnArray);

function anim (){
    requestAnimationFrame(anim);
    c.clearRect(0, 0, innerWidth, innerHeight);
    layer1_ctx.clearRect(0, 0, innerWidth, innerHeight);
    layer2_ctx.clearRect(0, 0, innerWidth, innerHeight);
    layer3_ctx.clearRect(0, 0, innerWidth, innerHeight);
        


    for (var i = 0; i < spawnArray.length; i++) {
        spawnArray[i].update();

    }
    }

anim();
