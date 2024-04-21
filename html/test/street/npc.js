//npc.js
console.log('npc.js')

function createNPCs(scene, textureLoader){
//npc1
  const textures = [];
  const numFrames = 4;
  for (let i = 0; i < numFrames; i++) {
    const texture = textureLoader.load(`./npc/npc1_${i}.gif`);
    textures.push(texture);
    }
  const npc1Material = new THREE.MeshLambertMaterial({ 
    map: textures[0], 
    //wireframe: true,
    side: THREE.DoubleSide,
    transparent: true,
    });
  const width = 1; 
  const height = 2; 
  const npc1Geometry = new THREE.PlaneGeometry(width, height);
  const npc1 = new THREE.Mesh(npc1Geometry, npc1Material);
  npc1.position.set(10,1.125,-.5)
  scene.add(npc1);

  //npc2
  const textures2 = [];
  for (let i = 0; i < numFrames; i++) {
    const texture2 = textureLoader.load(`./npc/npc2_${i}.gif`);
    textures2.push(texture2);
    }
  const npc2Material = new THREE.MeshLambertMaterial({ 
    map: textures2[0], 
    //wireframe: true,
    side: THREE.DoubleSide,
    transparent: true,
    });
  const npc2Geometry = new THREE.PlaneGeometry(width, height);
  const npc2 = new THREE.Mesh(npc2Geometry, npc2Material);
  npc2.position.set(-16,1.125,-1.75)
  scene.add(npc2);

    //npc3
    const textures3 = [];
    for (let i = 0; i < numFrames; i++) {
      const texture3 = textureLoader.load(`./npc/npc3_${i}.gif`);
      textures3.push(texture3);
      }
    const npc3Material = new THREE.MeshLambertMaterial({ 
      map: textures3[0], 
      //wireframe: true,
      side: THREE.DoubleSide,
      transparent: true,
      });
    const npc3Geometry = new THREE.PlaneGeometry(width, height);
    const npc3 = new THREE.Mesh(npc3Geometry, npc3Material);
    npc3.position.set(14,1.125,-2.5)
    scene.add(npc3);

    		
	//npc4
        const textures6 = [];
        for (let i = 0; i < numFrames; i++) {
          const texture6 = textureLoader.load(`./npc/npc4_${i}.gif`);
          textures6.push(texture6);
          }
        const npc4Material = new THREE.MeshLambertMaterial({ 
        map: textures6[0],
        //color: 0x0FFF00,	  
         // wireframe: true,
          side: THREE.DoubleSide,
          transparent: true,
          });
        const npc4Geometry = new THREE.PlaneGeometry(width, height);
        const npc4 = new THREE.Mesh(npc4Geometry, npc4Material);
        npc4.position.set(16,1.125,-4.1)
        scene.add(npc4);

//TREE anim
        const textures4 = [];
        for (let i = 0; i < 5; i++) {
          const texture4 = textureLoader.load(`./treeAnim/tree_${i}.gif`);
          textures4.push(texture4);
          }
        const treeMaterial = new THREE.MeshLambertMaterial({ 
          map: textures4[0], 
          //color: 0x0FFF00,
          //wireframe: true,
          side: THREE.DoubleSide,
          transparent: true,
          });
        const treeGeometry = new THREE.PlaneGeometry(9,9);
        const tree = new THREE.Mesh(treeGeometry, treeMaterial);
        tree.position.set(10,3.5,-5)
        scene.add(tree);

//BARRELFIRE anim
          const textures5 = [];
          for (let i = 0; i < 4; i++) {
            const texture5 = textureLoader.load(`./bfire/bfire_${i}.gif`);
            textures5.push(texture5);
            }
          const bfireMaterial = new THREE.MeshLambertMaterial({ 
            map: textures5[0], 
            //color: 0x0FFF00,
            //wireframe: true,
            side: THREE.DoubleSide,
            transparent: true,
            });
          const bfireGeometry = new THREE.PlaneGeometry(1,2);
          const bfire = new THREE.Mesh(bfireGeometry, bfireMaterial);
          bfire.position.set(14.5,1,-4)
          scene.add(bfire);

 // Function to update NPC's position
 function updateNPCs() {
  // Example: Move NPC along the x-axis
  npc1.position.x -= 0.020; // Adjust the value to control the speed and direction
  npc2.position.x += 0.020;
  npc3.position.x -= 0.020;

  const animationTime = Date.now() * 0.00725; // Speed - Update as needed
  const frameIndex = Math.floor(animationTime % numFrames);
  npc1Material.map = textures[frameIndex];
  npc2Material.map = textures2[frameIndex];
  npc3Material.map = textures3[frameIndex];
  npc4Material.map = textures6[frameIndex];
  const frameIndex2 = Math.floor(animationTime % 5);
  treeMaterial.map = textures4[frameIndex2];
  bfireMaterial.map = textures5[frameIndex];

  if (npc1.position.x < -25){
    npc1.position.set (20,1.125,-3);
  }
  if (npc2.position.x > 18){
    npc2.position.set (-12,1.125,-1);
  }
  if (npc3.position.x < -25){
    npc3.position.set (28,1.125,-.5);
  }

}

return { updateNPCs }; // Return the function to be accessible from outside
}


export {createNPCs}