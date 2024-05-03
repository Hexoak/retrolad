//main.js     
console.log('main.js')
//IMPORTS
import { createWires } from "./wires.js";
import { createNPCs } from "./npc.js";
import {THREEx} from './assets/threex.volumetricspotlightmaterial.js';

// Set up Three.js scene
       var scene = new THREE.Scene();
       var camera = new THREE.PerspectiveCamera(75, 540/320, 0.1, 1000);
       var renderer = new THREE.WebGLRenderer({
     alpha: false,
     antialias: false,
     depth: true,
     stencil: true,
     premultipliedAlpha: true,
     preserveDrawingBuffer: false,
     powerPreference: 'default',
     failIfMajorPerformanceCaveat: false,
     precision: 'lowp',
     logarithmicDepthBuffer: false,
     autoClear: true
 });
   //renderer.setSize(window.innerWidth, window.innerHeight);
       renderer.setSize(540,320);
   document.body.appendChild(renderer.domElement);;

     //TextureLoader
     const textureLoader = new THREE.TextureLoader();

     // Set a near white clear color (default is black)
     const bgTexture = textureLoader.load('./assets/skybox.png')
     scene.background = bgTexture;
   //renderer.setClearColor( 0xfff6e6 );

//..Build Scene..//
 //create ground  
   const groundtexture = textureLoader.load('./assets/asphalt (2).gif');
           const groundPlane = new THREE.PlaneGeometry(100, 20, 3, 3);
           const groundMaterial = new THREE.MeshLambertMaterial({ 
         wireframe: false, 
         map: groundtexture, 
         side: THREE.DoubleSide  
       });
           groundtexture.wrapS = THREE.RepeatWrapping; // Repeat the texture in the horizontal direction
           groundtexture.wrapT = THREE.RepeatWrapping; // Repeat the texture in the vertical direction
           groundtexture.repeat.set(6, 3); // Repeat the texture both horizontally and vertically
           const ground = new THREE.Mesh(groundPlane, groundMaterial);
           ground.rotation.x = - Math.PI / 2;
           ground.position.set (0,0,0);// Adjust position to place the ground below the cube
           ground.castShadow = true
           //ground.receiveShadow = true; // Ground receives shadows
           scene.add(ground);

//create curb  
 const curbtexture = textureLoader.load('./assets/curb.gif');
           const curbBox = new THREE.BoxGeometry(100, 4, .25, 25);
           const curbMaterial = new THREE.MeshLambertMaterial({ 
             //color: 0x00FF00,
             //wireframe: false, 
             map: curbtexture, 
             side: THREE.DoubleSide  
               });
           curbtexture.wrapS = THREE.RepeatWrapping; 
           curbtexture.wrapT = THREE.RepeatWrapping;
           curbtexture.repeat.set(20, 3); 
           const curb = new THREE.Mesh(curbBox, curbMaterial);
           curb.rotation.x = - Math.PI / 2;
           curb.position.set(0,0,-2)
           //curb.castShadow = true
           //curb.receiveShadow = true; 
           scene.add(curb);

//CREATE FENCE
    //create fence  
    const fencetexture = textureLoader.load('./assets/fence.gif');
    const fencePlane = new THREE.PlaneGeometry(100, 4, 1, 1);
    const fenceMaterial = new THREE.MeshLambertMaterial({ 
    wireframe: false, 
    map: fencetexture, 
    side: THREE.DoubleSide,
    transparent: true,  
    });
    fencetexture.wrapS = THREE.RepeatWrapping; // Repeat the texture in the horizontal direction
    fencetexture.wrapT = THREE.RepeatWrapping; // Repeat the texture in the vertical direction
    fencetexture.repeat.set(16, 1); // Repeat the texture both horizontally and vertically
    const fence = new THREE.Mesh(fencePlane, fenceMaterial);
    fence.rotation.x = - Math.PI;
    //fence.rotation.y = - Math.PI / 2;
    fence.rotation.z = - Math.PI ;
    fence.position.set (0,2,-8);// Adjust position to place the fence below the cube
    fence.castShadow = true
    //fence.receiveShadow = true; // fence receives shadows
    scene.add(fence);

//CREATE LIGHTPOLES
   const lightpoleTexture = textureLoader.load('./assets/wood.gif');
   function createLightPoles(scene, lightpolePositions, poleHeight, radius, color) {
     const material = new THREE.MeshLambertMaterial({ map: lightpoleTexture });
     const geometry = new THREE.CylinderGeometry(radius, radius, poleHeight, 32);
     lightpolePositions.forEach(position => {
         const cylinder = new THREE.Mesh(geometry, material);
         cylinder.position.copy(position);
         cylinder.castShadow = true
         scene.add(cylinder);
     });
   }
   const lightpolePositions = [
     new THREE.Vector3(0, 3, 0),
     new THREE.Vector3(10, 3, 0),
     new THREE.Vector3(-10, 3, 0),
     new THREE.Vector3(20, 3, 0),
     new THREE.Vector3(-20, 3, 0)
   ];
   const poleHeight = 7;
   const radius = 0.25;
   const color = 0xff0000; // Red color
   createLightPoles(scene, lightpolePositions, poleHeight, radius, color);



//BUILDING WITH TEXTURED SIDES
// Define cube geometry and materials with different images
       //Here's how the mapping works:
           //cubeMaterials[0]: Front face of the cube
           //cubeMaterials[1]: Back face of the cube
           //cubeMaterials[2]: Top face of the cube
           //cubeMaterials[3]: Bottom face of the cube
           //cubeMaterials[4]: Left face of the cube
           //cubeMaterials[5]: Right face of the cube
       
     var cubeGeometry = new THREE.BoxGeometry(12,6,5,5);
       var cubeMaterials = [
           new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./assets/bricks.gif') }),
           new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./assets/bricks.gif') }),
           new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./assets/bricks.gif') }),
           new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./assets/wood.gif') }),
           new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./assets/bricks(2).gif'), transparent:true}),
           new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('./assets/bricks.gif') })
       ];
       var cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
       cube.position.set (-5,3.125,-6);
       scene.add(cube);


 const storeTexture = textureLoader.load('./assets/store.gif');
           const storePlane = new THREE.PlaneGeometry(12, 6, 3, 3);
           const storeMaterial = new THREE.MeshLambertMaterial({ 
         //wireframe: true, 
         //color: 0xFFF000,
        map: storeTexture, 
         side: THREE.DoubleSide  
       });
		const store = new THREE.Mesh(storePlane, storeMaterial);
           store.rotation.x = - Math.PI;
           store.rotation.z= - Math.PI;
           store.position.set (-5,3,-6.25);// Adjust position to place the ground below the cube
 
           scene.add(store);

//CREATE BARRELS
       function createBarrels(scene, textureLoader) {
        const barrelPositions = [
            new THREE.Vector3(-13, 1, -6),
            new THREE.Vector3(5, 1, -6),
            new THREE.Vector3(3, 1, -5)
        ];
    
        const barrelTexture = textureLoader.load('./assets/barrels.gif');
        const barrelPlane = new THREE.PlaneGeometry(2, 2, 1, 1);
        const barrelMaterial = new THREE.MeshPhongMaterial({
            map: barrelTexture,
            side: THREE.DoubleSide,
            transparent: true
        });
    
        barrelPositions.forEach(position => { // Use position as the loop variable
            const barrel = new THREE.Mesh(barrelPlane, barrelMaterial);
            barrel.rotation.y = Math.PI; // Orient the barrel to face forward
            barrel.position.set(position.x, position.y, position.z); // Corrected variable name to position
            barrel.castShadow = true;
            scene.add(barrel);
        });
      }

      //CAR 
    const carTexture = textureLoader.load('./assets/car.gif')
    const carMaterial = new THREE.MeshLambertMaterial({ 
      map: carTexture, 
      //wireframe: true,
      side: THREE.DoubleSide,
      transparent: true,
      });
    const carGeometry = new THREE.PlaneGeometry(6, 3);
    const car = new THREE.Mesh(carGeometry, carMaterial);
    car.position.set(-18,1.125,-6)
    scene.add(car);

//CREATE LIGHTING

const ambientLight = new THREE.AmbientLight("#DDD", 0.25);
scene.add(ambientLight);

      function createLightingEffectsWithObjects(type, positions, intensity, color) {
        const lights = [];

        switch (type) {
        case 'volumetric':
          positions.forEach(position => {
              const geometry = new THREE.CylinderGeometry(0.1, 14, 30, 32 * 2, 20, true);
              geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -geometry.parameters.height / 2, 0));
              geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

              const material = new THREEx.VolumetricSpotLightMaterial({wireframe: true});
              const mesh = new THREE.Mesh(geometry, material);
              mesh.position.copy(position);

              // LookAt expects a Vector3, not individual coordinates
              mesh.lookAt(new THREE.Vector3(position.x, position.y - 1, position.z));

              material.uniforms.lightColor.value.set(color);
              material.uniforms.spotPosition.value = position; // Use position instead of mesh.position
              scene.add(mesh);

              lights.push(mesh);
          });
          break;
                  default:
                      console.error('Invalid lighting effect type:', type);
                      break;
              }
              return lights;
            }

      // Example usage:
      const positions = [
        new THREE.Vector3(0, 6, -2),
        new THREE.Vector3(10, 6, -2),
        new THREE.Vector3(-10, 6, -2),
        new THREE.Vector3(20, 6, -2),
        new THREE.Vector3(-20, 6, -2)
        //new THREE.Vector3(-4, 2, -7)
      ];

 const volumetricLights = createLightingEffectsWithObjects('volumetric', positions, 0.25, '#ffffff');


 function createSpotlights(scene, positions) {
  const spotlights = [];
  positions.forEach(position => {
      const spotLight = new THREE.SpotLight(0xffffff, 1, 75, Math.PI / 4, 0.1, 2);
      
      // Set the spotlight's position relative to the original position from the array
      spotLight.position.set(position.x + 3, position.y+1.5, position.z + 3);
      
      // Set the target of the spotlight to the position, adjusted as per your example
      spotLight.target.position.set(position.x, position.y, position.z);
      
      spotLight.castShadow = true;
      
      // Add the spotlight and its target to the scene
      scene.add(spotLight);
      scene.add(spotLight.target);

      spotlights.push(spotLight);
  });
  return spotlights;
}
const spotlights = createSpotlights(scene, positions);

//player
const textures = [];
   const numFrames = 4;
   for (let i = 0; i < numFrames; i++) {
     const texture = textureLoader.load(`./player/player_${i}.gif`);
     textures.push(texture);
     }
   const playerMaterial = new THREE.MeshLambertMaterial({ 
     map: textures[0], 
     side: THREE.DoubleSide,
     transparent: true,
     });
   const width = 1; 
   const height = 2; 
   const playerGeometry = new THREE.PlaneGeometry(width, height);
   const player = new THREE.Mesh(playerGeometry, playerMaterial);
   player.position.set(-20,1.125,-1.25)
   scene.add(player);

//CREATE WIRES
   createWires(scene);
//CREATE NPCS
const npcData = createNPCs(scene, textureLoader);
//FLAIR
  createBarrels(scene, textureLoader);

//CAMERA
     //camera.position.set (-5.1, 1.9, 4.98);
     //camera.lookAt(player.position);

             // Set camera position and add swaying effect
             var cameraOffset = new THREE.Vector3(.25, .75, 6); // Offset of the camera from the playerObject
             var swayAmount = .25; // Amount of sway
             var swaySpeed = .5; // Speed of sway
     
     //const controls = new THREE.OrbitControls(camera, renderer.domElement);

     function camControl() {
      // Calculate the current time factor based on sway speed
      var time = performance.now() * 0.001;
  
      // Sway calculations
      var swayX = Math.sin(time * swaySpeed) * swayAmount;    // Sway along the X-axis
      var swayY = Math.cos(time * swaySpeed * 0.75) * swayAmount * 0.25;  // Sway along the Y-axis
      var swayZ = Math.sin(time * swaySpeed * 0.5) * swayAmount * 0.25;  // Sway along the Z-axis
  
      // Compute the sway offset vector
      var swayOffset = new THREE.Vector3(swayX, swayY, swayZ);
  
      // Update camera position based on player position, camera offset, and sway
      camera.position.copy(player.position).add(cameraOffset).add(swayOffset);
  
      // Ensure the camera always looks at the player object
      camera.lookAt(player.position);
  }
  


//ANIMATION LOOP
     function animate() {
       requestAnimationFrame(animate);
      
      //debug
      //console.log(camera.position.x, camera.position.y, camera.position.z);
       //console.log("Player Position:", player.position);
      // console.log("Camera Offset:", cameraOffset);
      camControl();

     // Update texture offset or UV coordinates based on time or other factors
       const animationTime = Date.now() * 0.00725; // Speed - Update as needed
       const frameIndex = Math.floor(animationTime % numFrames);
       playerMaterial.map = textures[frameIndex];
       
       player.position.x += .015
      
       if (player.position.x > 28){
         player.position.set(-10,1,-2);
       }

    // Update NPC positions
      npcData.updateNPCs();

       //controls.update();

       renderer.render(scene, camera);
     }

     animate();