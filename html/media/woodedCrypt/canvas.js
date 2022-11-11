//init
var canvas = document.getElementById('can');
var c = canvas.getContext('2d');
canvas.width  = 900 ;
canvas.height = 450;

//Load and set image files
var img_lay1 = new Image();
img_lay1.src = './src/layer1_BG.gif'
var img_lay2 = new Image();
img_lay2.src = './src/layer2_clouds.gif';
var img_lay3 = new Image();
img_lay3.src = './src/layer3_clouds2.gif';
var img_lay4 = new Image();
img_lay4.src = './src/layer4.gif';
var img_lay5 = new Image();
img_lay5.src = './src/layer5.gif';
var img_lay6 = new Image();
img_lay6.src = './src/layer6_fog.gif';
var img_lay7 = new Image();
img_lay7.src = './src/layer7_foreground.gif';

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

//variables
var x1 = .0125;
var x2 = .125;
var x3 = .125;
var dx1 = .025;
var dx2= .05;
var dx3= .25;
var y3 = .15;
var y1 = .15
var y2 = .15;
var dy1 = .01;
var dy2 = .01;
var dy3 = .01;

    //Draw layers
    this.draw = function(){
    layer1_ctx.drawImage(img_lay1, 0,0,300,150);
    layer2_ctx.drawImage(img_lay2, x1,y1,300,150);
    layer3_ctx.drawImage(img_lay3, x2,y2,300,150);
    layer4_ctx.drawImage(img_lay4, 0,0,300,150);
    layer5_ctx.drawImage(img_lay5, 0,0,300,150);
    layer6_ctx.drawImage(img_lay6, x3,y3,300,150);
    layer7_ctx.drawImage(img_lay7, 0,0,300,150);
    
    //add anim vars here    
    //console.log(x3);
    x1+=dx1/2;
    y1+=dy1/2;
    x2+=dx2/2;
    y2+=dy2/2;
    x3+=dx3/2;
    y3+=dy3/2;

    //mooncloud
    if (((x1 > 5)) || ((x1 < -5))){
        dx1=-dx1;
        }
    if (((y1 > 5) || (y1 < -1))){
        dy1=-dy1    
        }
    if (((x2 > 5)) || ((x2 < -5))){
        dx2=-dx2;
        }
    if (((y2 > 2) || (y2 < -2))){
        dy2=-dy2
        }
    //Fog Motion
    if (((x3 > 20)) || ((x3 < -1))){
        dx3=-dx3;
        }
    if (((y3 > 5) || (y3 < -1))){
        dy3=-dy3
        }
    if ((x3 > 12) && (x3 < 15)){
        layer7_ctx.fillRect(196,135,1,1);
        layer7_ctx.fillRect(198,135,1,1);
        }
    if ((x3 > 1) && (x3 < 4)){
        layer7_ctx.fillRect(283,140,1,1);
        layer7_ctx.fillRect(285,140,1,1);
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

    this.draw();
    //console.log('anim');
}
    anim();