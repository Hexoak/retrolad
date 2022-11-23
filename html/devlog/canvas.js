
//Access the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
console.log('canvas init')
//Initiate complexity of pattern
var sqrSize =16;
//Generate new pattern on page load
generatenNewRandomPattern();

//Increase complexity of the pattern button
function increaseComplexity(){
    if (sqrSize>1) {
        //decreases square
        sqrSize=sqrSize/2;
        generatenNewRandomPattern();
    }
}

//Decrease complexity button
function decreaseComplexity(){
    if (sqrSize<canvas.width){
        //increases size
        sqrSize=sqrSize*2;
        generatenNewRandomPattern();
    }
}

//This is the function that generates a pattern
function generatenNewRandomPattern(){
    console.log("square size: "+sqrSize)//error checking

    var width = canvas.width;
    var height = canvas.height;

    for(var i=0; i<width/sqrSize; i++)
    {
    for(var j=0; j<height/sqrSize; j++)
    {
    if(Math.random()<0.5)
        {ctx.fillStyle='white';
         "white";}
    else
        {ctx.fillStyle ='black';}

//--------------------------------------------------------
    //By changing the math and setting new color values to ranges, the program utilizes colors as opposed to using 1-bit patterns.
    //Useful for creating textures. 
    //EX:

    //Set Math.random() output to variable:
        // var mathX = Math.random();

        //Conditions for using different colors:
            // if(mathX < 0.2)
            // {ctx.fillStyle='white';
            //  "white";}
            
            // if((mathX > 0.2) && (mathX < 0.4)
            // {ctx.fillStyle='red';
            //  "red";}
    //etc.
//--------------------------------------------------------
    
    
    ctx.fillRect(i*sqrSize, j*sqrSize, sqrSize, sqrSize);

    }    
    }
}