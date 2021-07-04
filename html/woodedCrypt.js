/*=============================================================
  Filename: CanvasStack-2v01.js
  Rev: 2
  By: A.R.Collins
  Description: Utilities to create multiple transparent
  canvas layers suitable for animation.
  License: Released into the public domain
  latest version at
  <http://www/arc.id.au/CanvasLayers.html>

  Date   |Description                                      |By
  -------------------------------------------------------------
  30Oct09 Rev 1.00 First release                            ARC
  08Sep12 bugfix: test for emulator failed in IE9           ARC
  02Mar13 Re-write to use screen canvas as background       ARC
  28Jul13 remove getOverlayCanvas (use getElementById)
          Tidy for JSLint                                   ARC
  20Jul14 Setup a resize handler for layers, required when
          canvas size changes on window resize (width in %).
          Dropped excanvas support                          ARC
  18Sep19 Re-factor to simplify                             ARC
  21Sep19 Convert to Classes etc                            ARC
  30Sep19 Added addResizeCallback method                    
          Released as Rev 2v00                              ARC
  01Jan20 Add Layer.dragObjects to match Cango Layer        ARC 
  =============================================================*/

  var CanvasStack;

  (function()
  {
    "use strict";
  
    class Layer
    {
      constructor(canvasID, canvasElement)
      {
        this.id = canvasID;
        this.cElem = canvasElement;
        this.dragObjects = [];
      }
    }
  
    CanvasStack = class{
      constructor(cvsID, stackLimit){
        const savThis = this;
  
        function setResizeHandler(resizeLayers, timeout){
          let timer_id = undefined;
          window.addEventListener("resize", ()=>{
            if(timer_id != undefined) 
            {
              clearTimeout(timer_id);
              timer_id = undefined;
            }
            timer_id = setTimeout(()=>{
                timer_id = undefined;
                resizeLayers();
                savThis.bkgCanvas.resizeFns.forEach((currFn)=>currFn());
              }, timeout);
          });
        }
              
        function resizeLayers(){
          const t = savThis.bkgCanvas.offsetTop + savThis.bkgCanvas.clientTop,
                l = savThis.bkgCanvas.offsetLeft + savThis.bkgCanvas.clientLeft,
                w = savThis.bkgCanvas.offsetWidth,
                h = savThis.bkgCanvas.offsetHeight;
  
          // check if canvas size changed when window resized, allow some rounding error in layout calcs
          if ((Math.abs(w - savThis.rawWidth)/w < 0.01) && (Math.abs(h - savThis.rawHeight)/h < 0.01))
          {
            // canvas size didn't change so return
            return;
          }
          // canvas has been resized so resize all the overlay canvases
          for (let j=1; j<savThis.bkgCanvas.layers.length; j++)  // bkg is layer[0]
          {
            let ovl = savThis.bkgCanvas.layers[j].cElem;
            if (ovl)  // may have been deleted so empty slot
            {
              ovl.style.top = t+'px';
              ovl.style.left = l+'px';
              ovl.style.width = w+'px';
              ovl.style.height = h+'px';
              ovl.width = w;    // reset canvas attribute to pixel width
              ovl.height = h;  
            }
          }
        }
  
        // check if this is a context for an overlay
        if (cvsID.indexOf("_ovl_") !== -1)
        {
          console.error("CanvasStack: canvas must be a background canvas not an overlay");
          return {};
        }
        
        this.cId = cvsID;
        this.stackLimit = stackLimit || 10;
        this.bkgCanvas = document.getElementById(cvsID);
        this.rawWidth = this.bkgCanvas.offsetWidth;   
        this.rawHeight = this.bkgCanvas.offsetHeight;
        this.bkgCanvas.resizeFns = [];
  
        if (!this.bkgCanvas.hasOwnProperty('layers'))
        {
          // create an array to hold all the overlay canvases for this canvas
          this.bkgCanvas.layers = [];
          // make a Layer object for the bkgCanvas
          let bkgL = new Layer(this.cId, this.bkgCanvas);   // bkgCanvas is always layer[0]
          this.bkgCanvas.layers[0] = bkgL;
          // make sure the overlay canvases always match the bkgCanvas size
          setResizeHandler(resizeLayers, 250);
        }
        if (!this.bkgCanvas.hasOwnProperty('unique'))
        {
          this.bkgCanvas.unique = 0;
        }
      }
  
      createLayer(){
        const w = this.rawWidth,
              h = this.rawHeight,
              nLyrs = this.bkgCanvas.layers.length;  // bkg is layer 0 so at least 1
  
        // check background canvas is still there
        if (!(this.bkgCanvas && this.bkgCanvas.layers))
        {
          console.log("CanvasStack: missing background canvas");
          return;
        } 
        if (this.bkgCanvas.layers.length >= this.stackLimit)
        {
          console.error("CanvasStack: too many layers");
          return;
        }
        this.bkgCanvas.unique += 1;     // a private static variable
        const uniqueTag = this.bkgCanvas.unique.toString();
        const ovlId = this.cId+"_ovl_"+uniqueTag;
        const ovlHTML = "<canvas id='"+ovlId+"' style='position:absolute' width='"+w+"' height='"+h+"'></canvas>";
        const topCvs = this.bkgCanvas.layers[nLyrs-1].cElem; 
        topCvs.insertAdjacentHTML('afterend', ovlHTML);
        const newCvs = document.getElementById(ovlId);
        newCvs.style.backgroundColor = "transparent";
        newCvs.style.left = (this.bkgCanvas.offsetLeft+this.bkgCanvas.clientLeft)+'px';
        newCvs.style.top = (this.bkgCanvas.offsetTop+this.bkgCanvas.clientTop)+'px';
        // make it the same size as the background canvas
        newCvs.style.width = this.bkgCanvas.offsetWidth+'px';
        newCvs.style.height = this.bkgCanvas.offsetHeight+'px';
        let newL = new Layer(ovlId, newCvs);
        // save the ID in an array to facilitate removal
        this.bkgCanvas.layers.push(newL);
        
        return ovlId;    // return the new canvas id 
      }
  
      deleteLayer(ovlyId){
        // check background canvas is still there
        if (!(this.bkgCanvas && this.bkgCanvas.layers))
        {
          console.log("CanvasStack: missing background canvas");
          return;
        } 
        for (let i=1; i<this.bkgCanvas.layers.length; i++)
        {
          if (this.bkgCanvas.layers[i].id === ovlyId)
          {
            let ovlNode = this.bkgCanvas.layers[i].cElem;
            if (ovlNode)
            {
              ovlNode.parentNode.removeChild(ovlNode);
            }
            // now delete layers array element
            this.bkgCanvas.layers.splice(i,1);   // delete the Layer object
          }
        }
      }
  
      deleteAllLayers(){
        // check background canvas is still there
        if (!(this.bkgCanvas && this.bkgCanvas.layers))
        {
          console.log("CanvasStack: missing background canvas");
          return;
        } 
        for (let i=this.bkgCanvas.layers.length-1; i>0; i--)   // don't delete layers[0] its the bakg canavs
        {
          let ovlNode = this.bkgCanvas.layers[i].cElem;
          if (ovlNode)
          {
            let orphan = ovlNode.parentNode.removeChild(ovlNode);
            orphan = null;
          }
          // now delete layers array element
          this.bkgCanvas.layers.splice(i,1);
        }
        // clear any resize callbacks, the layers are gone
        this.bkgCanvas.resizeFns.length = 0;   // remove any added handlers, leave the basic
      }
  
      addResizeCallback(callbackFn){
        this.bkgCanvas.resizeFns.push(callbackFn);
      }
    };
  
  }());

////////////////////////////////////////////////////////////
//WOODED CRYPT//
////////////////////////////////////////////////////////////

//init
var canvas = document.getElementById('woodedCrypt');
var c = canvas.getContext('2d');
canvas.width  = 600 ;
canvas.height = 300;
c.scale(2,2);

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
    layer1_ctx.drawImage(img_lay1, 0,0,600,300);
    layer2_ctx.drawImage(img_lay2, x1,y1,600,300);
    layer3_ctx.drawImage(img_lay3, x2,y2,600,300);
    layer4_ctx.drawImage(img_lay4, 0,0,600,300);
    layer5_ctx.drawImage(img_lay5, 0,0,600,300);
    layer6_ctx.drawImage(img_lay6, x3,y3,600,300);
    layer7_ctx.drawImage(img_lay7, 0,0,600,300);
    
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