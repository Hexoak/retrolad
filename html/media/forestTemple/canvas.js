//init
var canvas = document.getElementById('can');
var c = canvas.getContext('2d');
canvas.width  = 900;
canvas.height = 450;


//Load and set image files
var img_lay1 = new Image();
img_lay1.src = './src/1_fore.png';
var img_lay2 = new Image();
img_lay2.src = './src/2_midfor.png';
var img_lay3 = new Image();
img_lay3.src = './src/3_fog.png';
var img_lay4 = new Image();
img_lay4.src = './src/4_midfore.png';
var img_lay5 = new Image();
img_lay5.src = './src/5_temple.png';
var img_lay6 = new Image();
img_lay6.src = './src/6_midback.png';
var img_lay7 = new Image();
img_lay7.src = './src/7_fog2.png';
var img_lay8 = new Image();
img_lay8.src = './src/8_back.png';
var img_lay9 = new Image();
img_lay9.src = './src/9_horz.png';
var img_lay10 = new Image();
img_lay10.src = './src/10_bg.png';

//layer 1
var canvas_stack = new CanvasStack('can');
var layer1 = canvas_stack.createLayer();
var layer1_ctx = document.getElementById(layer1).getContext('2d');
//layer2
var layer2 = canvas_stack.createLayer();
var layer2_ctx = document.getElementById(layer2).getContext('2d');
//layer3
var layer3 = canvas_stack.createLayer();
var layer3_ctx = document.getElementById(layer3).getContext('2d');
//layer4
var layer4 = canvas_stack.createLayer();
var layer4_ctx = document.getElementById(layer4).getContext('2d');
//layer5
var layer5 = canvas_stack.createLayer();
var layer5_ctx = document.getElementById(layer5).getContext('2d');
//layer6
var layer6 = canvas_stack.createLayer();
var layer6_ctx = document.getElementById(layer6).getContext('2d');
//layer7
var layer7 = canvas_stack.createLayer();
var layer7_ctx = document.getElementById(layer7).getContext('2d');
//layer8
var layer8 = canvas_stack.createLayer();
var layer8_ctx = document.getElementById(layer8).getContext('2d');
//layer9
var layer9 = canvas_stack.createLayer();
var layer9_ctx = document.getElementById(layer9).getContext('2d');
//layer10
var layer10 = canvas_stack.createLayer();
var layer10_ctx = document.getElementById(layer10).getContext('2d');

//variables
var x1 = 3;
var x2 = 2;
var x3 = 1;
var dx1 = .25;
var dx2= .05;
var dx3= .25;
var y3 = .15;
var y1 = 1;
var y2 = .15;
var dy1 = .01;
var dy2 = .01;
var dy3 = .01;

    //Draw layers
    this.draw = function(){
    layer1_ctx.drawImage(img_lay10, 0,0,900,450);
    layer2_ctx.drawImage(img_lay9, 0,y1,900,450);
    layer3_ctx.drawImage(img_lay8, x1,20,900,450);
    layer4_ctx.drawImage(img_lay7, x2,0,900,450);
    layer5_ctx.drawImage(img_lay6, x1,0,900,450);
    layer6_ctx.drawImage(img_lay5, 0,0,900,450);
    layer7_ctx.drawImage(img_lay4, x1,0,900,450);
    layer8_ctx.drawImage(img_lay3, x3,0,900,450);
    layer9_ctx.drawImage(img_lay2, 0,0,900,450);
    layer10_ctx.drawImage(img_lay1, 0,0,900,450);
    
    //add anim vars here    
    //console.log(x3);
    x1+=dx1/4;
    y1+=dy1/2;
    x2+=dx2*2;
    y2+=dy2/2;
    x3+=dx3/2;
    y3+=dy3/2;

    //mooncloud
    if (((x1 > .5)) || ((x1 < -.5))){
        dx1=-dx1*.1;
        }
    if (((y1 > 5) || (y1 < -1))){
        dy1=-dy1    
        }
    if (((x2 > 3)) || ((x2 < -3))){
        dx2=-dx2;
        }
    if (((y2 > 4) || (y2 < -4))){
        dy2=-dy2
        }
    //Fog Motion
    if (((x3 > 40)) || ((x3 < -1))){
        dx3=-dx3;
        }
    if (((y3 > 10) || (y3 < -10))){
        dy3=-dy3
        }

    }
    //animations
function anim (){
    requestAnimationFrame(anim);
    c.clearRect(0, 0, innerWidth, innerHeight);
    layer1_ctx.clearRect(0, 0, innerWidth, innerHeight);
    layer2_ctx.clearRect(0, 0, innerWidth, innerHeight);
    layer3_ctx.clearRect(0, 0, innerWidth, innerHeight);
    layer4_ctx.clearRect(0, 0, innerWidth, innerHeight);
    layer5_ctx.clearRect(0, 0, innerWidth, innerHeight);
    layer6_ctx.clearRect(0, 0, innerWidth, innerHeight);
    layer7_ctx.clearRect(0, 0, innerWidth, innerHeight);
    layer8_ctx.clearRect(0, 0, innerWidth, innerHeight);
    layer9_ctx.clearRect(0, 0, innerWidth, innerHeight);
    layer10_ctx.clearRect(0, 0, innerWidth, innerHeight);
    c.scale(3,0);
    this.draw();
    //console.log('anim');
}
    anim();