//wires.js

function createWires(scene){
console.log('wires.js');

//Define Curve Point
let pX = -20
let pY = 4
let pZ = 0

const pole0 = new THREE.Vector3(-20, pY, pZ); //pole0
const p1 = new THREE.Vector3 (pX+1, pY-.25, pZ);
const p2 = new THREE.Vector3 (pX+5, pY-.75, pZ);
const p3 = new THREE.Vector3 (pX+9, pY-.25, pZ);
const pole1 = new THREE.Vector3(-10, pY, pZ); //pole1
const p4 = new THREE.Vector3 (pX+11, pY-.25, pZ);
const p5 = new THREE.Vector3 (pX+15, pY-.75, pZ);
const p6 = new THREE.Vector3 (pX+19, pY-.25, pZ);
const pole2 = new THREE.Vector3(pX+20, pY, pZ); //pole2
const p7 = new THREE.Vector3 (pX+21, pY-.25, pZ);
const p8 = new THREE.Vector3 (pX+25, pY-.75, pZ);
const p9 = new THREE.Vector3 (pX+29, pY-.25, pZ);
const pole3 = new THREE.Vector3(pX+30, pY, pZ); //pole3
const p10 = new THREE.Vector3 (pX+31, pY-.25, pZ);
const p11 = new THREE.Vector3 (pX+35, pY-.75, pZ);
const p12 = new THREE.Vector3 (pX+39, pY-.25, pZ);
const pole4 = new THREE.Vector3(pX+40, pY, pZ); //pole4

// Create a CatmullRomCurve3
const curve = new THREE.CatmullRomCurve3([
    pole0, p1, p2,p3, pole1,p4,p5,p6,pole2,p7,p8,p9,pole3,p10,p11,p12,pole4,

]);

// Set curve to be a catmullrom Catmull-Rom spline to smooth through the points
curve.curveType = 'chordal';

const points = curve.getPoints(250); // Generate 50 points along the curve
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 500 });
const wire1 = new THREE.Line(geometry, material);
scene.add(wire1);

// Creating a second curve offset by 0.5 on the y-axis
const curve2 = new THREE.CatmullRomCurve3(curve.points.map(p => new THREE.Vector3(p.x, p.y + 0.0125, p.z)));
curve2.curveType = 'catmullrom';
const points2 = curve2.getPoints(250);
const geometry2 = new THREE.BufferGeometry().setFromPoints(points2);
const wire2 = new THREE.Line(geometry2, material);
scene.add(wire2);


// Creating a second curve offset by 0.5 on the y-axis
const curve3 = new THREE.CatmullRomCurve3(curve.points.map(p => new THREE.Vector3(p.x, p.y + 0.5, p.z)));
curve2.curveType = 'catmullrom';
const points3 = curve3.getPoints(250);
const geometry3 = new THREE.BufferGeometry().setFromPoints(points3);
const wire3 = new THREE.Line(geometry3, material);
scene.add(wire3);

// Creating a second curve offset by 0.5 on the y-axis
const curve4 = new THREE.CatmullRomCurve3(curve.points.map(p => new THREE.Vector3(p.x, p.y + 0.75, p.z)));
curve2.curveType = 'chordal';
const points4 = curve4.getPoints(250);
const geometry4 = new THREE.BufferGeometry().setFromPoints(points4);
const wire4 = new THREE.Line(geometry4, material);
scene.add(wire4);
}

export {createWires};