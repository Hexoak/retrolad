console.log("RLtest");


import {THREEx} from './assets/top/threex.volumetricspotlightmaterial.js';

    // Execute JavaScript after the page has fully loaded
    window.onload = function() {
        // Set up a basic scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('threejs-container').appendChild(renderer.domElement);

       //textureloader
       const textureLoader = new THREE.TextureLoader();

    // Set a near white clear color (default is black)
    var gradient = textureLoader.load('./assets/top/gradient.gif')
        scene.background = gradient;


//BUILD SCENE
    //Create Ground Plane
    var planeTexture = textureLoader.load ("./assets/top/plane.gif");
      var plane = new THREE.Mesh(
        new THREE.PlaneGeometry( 12, 12, 5, 5),
        new THREE.MeshLambertMaterial( { 
            //color: 0x00ff00, 
            //wireframe: true, 
            map: planeTexture,
            //transparent: true,
            side: THREE.DoubleSide,
        } ));
      plane.rotateX(Math.PI/2);
      planeTexture.wrapS = THREE.RepeatWrapping; // Repeat the texture in the horizontal direction
      planeTexture.wrapT = THREE.RepeatWrapping; // Repeat the texture in the vertical direction
      planeTexture.repeat.set(6, 6); // Repeat the texture both horizontally and vertically

      plane.position.set (0,0,0);
      scene.add( plane );

//SWORD OBJECT
        var swordTexture = textureLoader.load ("./assets/top/sword2.gif");
        var sword = new THREE.Mesh(
        new THREE.PlaneGeometry( 1, 1, 1, 1 ),
        new THREE.MeshLambertMaterial( { 
            //color: 0x393839, 
            //wireframe: true, 
            map: swordTexture,
            transparent: true,
        } ));
        //sword.rotateX(Math.PI/2);
        sword.position.set(0,.5,0);
        scene.add( sword );

//TREE1
    // Create a CylinderGeometry
    // Parameters: radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded
    function createCylinder(x, y, z) {
        const cylinderTexture = textureLoader.load('./assets/top/wood.gif');
        const cylinderGeometry = new THREE.CylinderGeometry(0.25, 0.25, 6, 6, 1, false);
        const cylinderMaterial = new THREE.MeshLambertMaterial({
            map: cylinderTexture
        });
    
        // Configure texture wrapping and repeat
        cylinderTexture.wrapS = THREE.RepeatWrapping;
        cylinderTexture.wrapT = THREE.RepeatWrapping;
        cylinderTexture.repeat.set(1, 1); // Set texture to repeat only once (change if more repeats are needed)
        
        // Create the cylinder mesh
        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    
        // Set the position of the cylinder
        cylinder.position.set(x, y, z);
        cylinder.castShadow=true;
        // Add the cylinder to the scene
        scene.add(cylinder);
    }
    
    // Position data for cylinders
    const positions = [
        { x: -1.25, y: 1, z: 2 },
        { x: 1, y: 1, z: 2 },
        { x: -2.5, y: 1, z: -2.5 },
        { x: 2, y: 1, z: -2 }
    ];
    
    // Create and add cylinders at specified positions
    positions.forEach(pos => {
        createCylinder(pos.x, pos.y, pos.z);
    });

//LOTS OF TREES
// Parameters for the circles
const numPlanes = 20; // Number of planes in each circle
const baseRadiusFirstCircle = 4; // Base radius of the first circle
const baseRadiusSecondCircle = 5.5; // Base radius of the second circle
const radiusVariance = 1; // Maximum variance in the radius
const planeSizeFirstCircle = { width: 2, height: 4 }; // Size of planes in the first circle
const planeSizeSecondCircle = { width: 4, height: 8 }; // Size of planes in the second circle, larger than the first

// Calculate the angle between each plane
const angleIncrement = (2 * Math.PI) / numPlanes;

// Create a group to hold all the planes
const planeGroup = new THREE.Group();

// Load textures for both rings
const texturesFirstCircle = [
    textureLoader.load('./assets/top/tree1 copy.gif'),
    textureLoader.load('./assets/top/tree2.gif'),
    textureLoader.load('./assets/top/tree3.gif')
];
const texturesSecondCircle = [
    textureLoader.load('./assets/top/tree1.gif'),
    textureLoader.load('./assets/top/tree2.gif'),
    textureLoader.load('./assets/top/tree3.gif')
];

// Helper function to create a ring of planes
function createRing(numPlanes, baseRadius, textures, planeSize) {
    for (let i = 0; i < numPlanes; i++) {
        // Create plane geometry with the specified size
        const planeGeometry = new THREE.PlaneGeometry(planeSize.width, planeSize.height);

        // Select a random texture
        const randomTextureIndex = Math.floor(Math.random() * textures.length);
        const planeMaterial = new THREE.MeshLambertMaterial({
            map: textures[randomTextureIndex],
            transparent: true,
            side: THREE.DoubleSide // Make sure texture is visible from both sides
        });

        // Create plane mesh
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);

        // Calculate position and rotation for the plane
        const angle = i * angleIncrement;
        const variance = Math.random() * radiusVariance * 2 - radiusVariance; // Random variance in radius
        const radius = baseRadius + variance;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        const rotationY = Math.atan2(-x, -z); // Face the origin

        // Set position and rotation
        plane.position.set(x, 2, z);
        plane.rotation.set(0, rotationY, 0);

        // Add plane to the group
        planeGroup.add(plane);
    }
}

// Create both rings with different plane sizes
createRing(numPlanes, baseRadiusFirstCircle, texturesFirstCircle, planeSizeFirstCircle);
createRing(numPlanes, baseRadiusSecondCircle, texturesSecondCircle, planeSizeSecondCircle);

// Add the group of planes to the scene
scene.add(planeGroup);

//"SNOW" EFFECT
 // Create snow particles
 const snowflakeGeometry = new THREE.BoxGeometry(0.025, 0.025, 0.005);
 const snowflakeMaterial = new THREE.MeshPhongMaterial({ color: "#ffffff" });
 const snowflakes = [];

 for (let i = 0; i < 200; i++) {
     var min = .05
    var max = 1
     var rnd = Math.floor(Math.random() * (max - min + 1)) + min;
   const snowflake = new THREE.Mesh(snowflakeGeometry, snowflakeMaterial);
   snowflake.position.x = (Math.random() - 0.5) * 8;
   snowflake.position.y = (Math.random() - 0.5) * 8;
   snowflake.position.z = (Math.random() - 0.5) * 8;
   snowflake.scale.set(rnd, rnd, rnd)
   snowflakes.push(snowflake);
   scene.add(snowflake);
 }


 function snowflakesFall(){
   // Rotate snowflakes
   snowflakes.forEach((snowflake) => {
     snowflake.rotation.x += 0.005;
     snowflake.rotation.y += 0.05;
     snowflake.position.y += 0.01 * Math.random();

   //snowflakes fall
     if (snowflake.position.y > 5){
         snowflake.position.y = 0;
     }
   });
 }

//GRASS TEST
const grassTextures = [
    textureLoader.load('./assets/top/grass1.gif'),
    textureLoader.load('./assets/top/grass2.gif'),
    textureLoader.load('./assets/top/grass3.gif'),
    textureLoader.load('./assets/top/grass4.gif'),
    textureLoader.load('./assets/top/grass5.gif')
];

// Function to create a grass patch
function createGrassPatch(x, z) {
    const texture = grassTextures[Math.floor(Math.random() * grassTextures.length)];
    const geometry = new THREE.PlaneGeometry(.25, .35);
    const material = new THREE.MeshLambertMaterial({ map: texture, transparent: true });

    const grass = new THREE.Mesh(geometry, material);
    grass.position.set(x, 0, z);
    //grass.rotation.x = -Math.PI/2;  // Rotate the plane to lie flat

    scene.add(grass);
}

// Scatter grass patches
const numPatches = 170;  // Number of grass patches
const areaSize = 4.25;     // Define the area size (50x50 units here)

for (let i = 0; i < numPatches; i++) {
    const x = Math.random() * areaSize - areaSize / 2;  // Random x within [-25, 25]
    const z = Math.random() * areaSize - areaSize / 2;  // Random z within [-25, 25]

    createGrassPatch(x, z);
}

// Load textures for the rocks
const rockTextures = [
    textureLoader.load('./assets/top/rock1.gif'),
    textureLoader.load('./assets/top/rock2.gif'),
    textureLoader.load('./assets/top/rock3.gif')
];

// Function to create a rock
function createRock(texture, position) {
    const geometry = new THREE.PlaneGeometry(.5, .25); // Adjust size as needed
    const material = new THREE.MeshLambertMaterial({ 
        //color: '#00ff00',
        //wireframe: true,
        map: texture, 
        side: THREE.DoubleSide,
        transparent: true,
    });
    const rock = new THREE.Mesh(geometry, material);
    rock.position.set(position.x, position.y, position.z);
    //scene.add(rock);
}

// Specific vector positions for each rock
const rockpositions = [
    new THREE.Vector3(-1, .25, -2),
    new THREE.Vector3(0, .5, 1),
    new THREE.Vector3(2, .5, 0)
];

// Create and add rocks to the scene
rockTextures.forEach((texture, index) => {
    createRock(texture, rockpositions[index]);
});

//LIGHTING

const ambientLight = new THREE.AmbientLight("#DDD", 0.25);
scene.add(ambientLight);

    //Volumetric lightbeams
    function createVolumetricLight(x, y, z, lookAtX, lookAtY, lookAtZ, color = '#c4cfa1') {
        var geometry = new THREE.CylinderGeometry(0.05, 0.5, 15, 32 * 2, 20, true);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -geometry.parameters.height / 2, 0));
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

        var material = new THREEx.VolumetricSpotLightMaterial();
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.lookAt(new THREE.Vector3(lookAtX, lookAtY, lookAtZ));
        material.uniforms.lightColor.value.set(color);
        material.uniforms.spotPosition.value = mesh.position;
        scene.add(mesh);
    }

    // Create three volumetric lights with very thin beams
    //((x, y, z, lookAtX, lookAtY, lookAtZ)
    createVolumetricLight(2, 4, -1, -1.5, 0, 0);  // First light
    createVolumetricLight(3, 4, 2.5, .25, .25, .25); // Second light, different position and direction
    createVolumetricLight(4, 4, 1, 0, 0, 0); // Third light, different position and direction
//Spotlights add
        //((color, intensity, distance, angle, penumbra, decay);)
    const spotlight = new THREE.SpotLight(0xc4cfa1, .8, 1.5, .75, .51, 0);
    spotlight.position.set(1, 3, 1.5);
    spotlight.target.position.set(0, 0, 0);
    scene.add(spotlight);
    scene.add(spotlight.target)
    // Simulate the light beam using a spotlight helper (for visualizing the effect, not a true beam)
    const spotlightHelper = new THREE.SpotLightHelper(spotlight);
    //scene.add(spotlightHelper);

    // Optional: Add a slight fog to the scene to enhance the visibility of the light beam
    scene.fog = new THREE.FogExp2("#c4cfa1", 0.05);

//CAMERA
      //camera.position.set (0.02455025546271905, .75, 2.8845399382057404);
      //const controls = new THREE.OrbitControls(camera, renderer.domElement);

       // Set camera position and add swaying effect
       var cameraOffset = new THREE.Vector3(-.02, 2, 3); // Offset of the camera from the playerObject
       var swayAmount = 0.25; // Amount of sway
       var swaySpeed = 0.25; // Speed of sway

//ANIMATION LOOP
      function animate() {
        requestAnimationFrame(animate);
        snowflakesFall();

                   // Calculate sway
                   var time = performance.now() * 0.001; // Get time for oscillation
                   var swayX = Math.sin(time * swaySpeed) * swayAmount; // Calculate sway in x-axis
                   var swayY = Math.cos(time * swaySpeed * 0.5) * swayAmount * 0.25; // Calculate sway in y-axis
                   var swayZ = Math.sin(time * swaySpeed * 0.75) * swayAmount * 0.75; // Calculate sway in z-axis
       
                   // Apply sway to camera offset
                   var swayOffset = new THREE.Vector3(swayX, swayY, swayZ);
                   camera.position.copy(sword.position).add(cameraOffset).add(swayOffset);
       
                   // Make the camera look at the playerObject
                   camera.lookAt(0,.5,0);

        //DEBUG
            //console.log(camera.position.x, camera.position.y, camera.position.z);

        //controls.update();
        renderer.render(scene, camera);
      }

      animate();
    };
