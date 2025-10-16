// Gravity Simulation
// shared under Creative Commons license
// https://creativecommons.org/licenses/by-nc-sa/3.0/
// Code by Jason Galbraith
// 11/16/16
// Rewritten in p5.js by Sophia Wang
// 10.16.2025

/*
**************************************************************
Change the numbers below to see how it changes the simulation!
**************************************************************
 */
// The total number of objects in the simulation.
let totalObjects = 100;
// Width and height of the Canvas.
let width = 800;
let height = 600;
// Velocity of the objects.
let velocity = 3.0;

/*
**************************************************************
Below here is the actual simulation. You probably shouldn't mess
with this section. Or at least, you should expect weird results.
**************************************************************
 */
let xcoord = new Array(totalObjects);
let ycoord = new Array(totalObjects);
let xvel = new Array(totalObjects);
let yvel = new Array(totalObjects);
let xacc = new Array(totalObjects);
let yacc = new Array(totalObjects);
let mass = new Array(totalObjects);
let G = 1, dist, diffx, diffy, force, xforce, yforce, inside, index;

// Setup; happens once at the beginning
function setup() {
  createCanvas(width, height);
  for (let a = 0; a < totalObjects; a++) {
     xcoord[a] = random(width);
     ycoord[a] = random(height);
     xvel[a] = random(-velocity,velocity);
     yvel[a] = random(-velocity,velocity);
     mass[a] = random(1,20);
  }
}

// Generic draw event; repeats forever
function draw() {
  background(0);
  fill(255);
  calculateForce();
  updatePosition();
  collision();
  zoomCheck();
  drawObjects();
}
  
// Update acceleration and velocity
function calculateForce() {
  for (let a = 0; a < totalObjects; a++) {
    xacc[a] = 0;
    yacc[a] = 0;
    for (let b = 0; b < totalObjects; b++) {        
      if (a != b && mass[a] != 0) { 
        diffx = xcoord[b] - xcoord[a];
        diffy = ycoord[b] - ycoord[a];
        dist = sqrt(sq(diffx)+sq(diffy));
        force = (G * mass[a] * mass[b]) / sq(dist);
        xforce = force * diffx / dist;
        xacc[a] = xacc[a] + (xforce / mass[a]);
        yforce = force * diffy / dist;
        yacc[a] = yacc[a] + (yforce / mass[a]);
      }
    }
    xvel[a] = xvel[a] + xacc[a];
    yvel[a] = yvel[a] + yacc[a];
  } 
}

// Update position
function updatePosition() {
  for (let a = 0; a < totalObjects; a++) {
     xcoord[a] = xcoord[a] + xvel[a];
     ycoord[a] = ycoord[a] + yvel[a];
  }
}

// Inelastic collisions: equation m1v1+m2v2=(m1+m2)v3
function collision() {
  for (let a = 0; a < totalObjects; a++) {
    for (let b = 0; b < totalObjects; b++) {	
    	if (a != b && mass[a] != 0 && mass[b] != 0) {
        	diffx = xcoord[b] - xcoord[a];
        	diffy = ycoord[b] - ycoord[a];
        	dist = sqrt(sq(diffx) + sq(diffy));
        	if (dist <= sqrt(mass[a]) + sqrt(mass[b])) {
               xvel[a] = ((mass[a] * xvel[a]) + (mass[b] * xvel[b])) / (mass[a] + mass[b]);
               yvel[a] = ((mass[a] * yvel[a]) + (mass[b] * xvel[b])) / (mass[a] + mass[b]);
               mass[a] = mass[a] + mass[b];
     		   xcoord[a] = ((mass[a] * xcoord[a]) + (mass[b] * xcoord[b])) / (mass[a] + mass[b]);
               ycoord[a] = ((mass[a] * ycoord[a]) + (mass[b] * ycoord[b])) / (mass[a] + mass[b]);
               mass[b] = 0;
            }
    	}
    }
  }
}

// Check for re-centering
function zoomCheck() {
  inside = -1;
  index = 0;
  //find largest mass
  for (let a = 0; a < totalObjects; a++) {
      if (mass[a] >= mass[index]) {
          index = a; 
      }
  }
  // Check if it has left the window
  if (index >= 0) {
    if (xcoord[index] >= 0 && xcoord[index] <= width && ycoord[index] >= 0 && ycoord[index] <= height) {
    	inside = 1; 
    }
  }
  if (inside == -1) {
   	  // Recenter
      diffx = (width / 2) - xcoord[index];
      diffy = (height / 2) - ycoord[index];
      for (let a = 0; a < totalObjects; a++) {
       	 xcoord[a] = xcoord[a] + diffx;
         ycoord[a] = ycoord[a] + diffy;
      }
  }
}

// Draw all the objects
function drawObjects() {
  for (let a = 0; a < totalObjects; a++) {
    if (mass[a] != 0) {
    	ellipse(xcoord[a], ycoord[a], 2 * sqrt(mass[a]), 2 * sqrt(mass[a]));
    }
  }
}
