let data;


let initialised = {};

function preload() {
  data = loadTable('clarinda.csv', 'csv', 'header');
}

let boids = [];

function setup() {
  createCanvas(4000, 3000);

  button = createButton('mass');
  button.position(19, 20);
  button.style('font-size', '20px');
  button.style("color", "#808080"); 
  button.mousePressed(function() {
    generateWord('mass');
  } || touchStarted());


  button = createButton('spreading');
  button.position(19, 50);
  button.style('font-size', '20px');
  button.style("color", "#808080"); 
  button.mousePressed(function() {
    generateWord('spreading');
  });

  button = createButton('edge');
  button.position(19, 80);
  button.style('font-size', '20px');
  button.style("color", "#808080"); 
  button.mousePressed(function() {
    generateWord('edge');
  });

  button = createButton('movement');
  button.position(19, 110);
  button.style('font-size', '20px');
  button.style("color", "#808080");  
  button.mousePressed(function() {
    generateWord('movement');
  });

  button = createButton('vibration');
  button.position(19, 140);
  button.style('font-size', '20px');
  button.style("color", "#808080"); 
  button.mousePressed(function() {
    generateWord('vibration');
  });

  button = createButton('living');
  button.position(19, 170);
  button.style('font-size', '20px');
  button.style("color", "#808080"); 
  button.mousePressed(function() {
    generateWord('living');
  });

  button = createButton('gesture');
  button.position(19, 200);
  button.style('font-size', '20px');
  button.style("color", "#808080"); 
  button.mousePressed(function() {
    generateWord('gesture');
  });

  button = createButton('structures');
  button.position(19, 230);
  button.style('font-size', '20px');
  button.style("color", "#808080"); 
  button.mousePressed(function() {
    generateWord('structures');
  });

  button = createButton('placeholder');
  button.position(19, 260);
  button.style('font-size', '20px');
  button.style("color", "#808080"); 
  button.mousePressed(function() {
    generateWord('placeholder');
  });

  button = createButton('form/quality');
  button.position(19, 290);
  button.style('font-size', '20px');
  button.style("color", "#808080"); 
  button.mousePressed(function() {
    generateWord('form/quality');
  });
}

// General function to add a word of a certain category. The category is taken from 
// the heading of a column in the csv file
function generateWord(category) {
  if (data) {
    let numRows = data.getRowCount();
    // e.g. 'living', 'edge' etc.
    let column = data.getColumn(category);
    for (let i = 0; i < 10; i++) {
      let word = "";
      // make sure we don't spawn boids with empty text - a 'do... while loop' ensures the 
      // thing inside the do {} braces gets called once, and then the condition while word == "" gets checked
      // after that. if the check fails, we execute the do{} code again
      do {
        word = random(column);
      } while (word == "");
      boids.push(new Boid(random(width), random(height), word, category));
    }
    // store a reference to the fact that we've initialised some of this type
    initialised[category] = true;
  }
}

function touchStarted(category) {
  if (data) {
    let numRows = data.getRowCount();
    // e.g. 'living', 'edge' etc.
    let column = data.getColumn(category);
    for (let i = 0; i < 10; i++) {
      let word = "";
      // make sure we don't spawn boids with empty text - a 'do... while loop' ensures the 
      // thing inside the do {} braces gets called once, and then the condition while word == "" gets checked
      // after that. if the check fails, we execute the do{} code again
      do {
        word = random(column);
      } while (word == "");
      boids.push(new Boid(random(width), random(height), word, category));
    }
    // store a reference to the fact that we've initialised some of this type
    initialised[category] = true;
  }
}

function generatePhrase(category) {
  if (data) {
    let numRows = data.getRowCount();
    // e.g. 'living', 'edge' etc.
    let column = data.getColumn(category);
    for (let i = 0; i < 0.8; i++) {
      let word = "";
      // make sure we don't spawn boids with empty text - a 'do... while loop' ensures the 
      // thing inside the do {} braces gets called once, and then the condition while word == "" gets checked
      // after that. if the check fails, we execute the do{} code again
      do {
        word = random(column);
      } while (word == "");
      boids.push(new Boid(random(width), random(height), word, category));
    }
    // store a reference to the fact that we've initialised some of this type
    initialised[category] = true;
  }
}

function mousePressed() {
  print("Mouse pressed :)");
  // if our 'dictionary' contains a 'key' with this category name and the value stored at that key is true, then we can spawn some new words!
  if (initialised['mass']) {
    generatePhrase('mass_phrases');
  }
  if (initialised['spreading']) {
    generatePhrase('spreading_phrases');
  }
    if (initialised['edge']) {
    generatePhrase('edge_phrases');
  }
   if (initialised['movement']) {
    generatePhrase('movement_phrases');
  }
   if (initialised['vibration']) {
    generatePhrase('vibration_phrases');
  }
   if (initialised['living']) {
    generatePhrase('living_phrases');
  }
   if (initialised['gesture']) {
    generatePhrase('gesture_phrases');
  }
   if (initialised['structures']) {
    generatePhrase('structures_phrases');
  }
   if (initialised['placeholder']) {
    generatePhrase('placeholder_phrases');
  }
   if (initialised['form/quality']) {
    generatePhrase('form_phrases');
  }
}



function draw() {
  background('white');
  // Run all the boids
  for (let i = 0; i < boids.length; i++) {
    boids[i].run(boids);
  }
  //fill('#FAFBF1');
  //rect(0,0,150,height);
 // strokeWeight(0);
  
  
}


// Boid class
// Methods for Separation, Cohesion, Alignment added
class Boid {
  constructor(x, y, word, category) {
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    this.position = createVector(x, y);
    this.r = 5.0;
    this.maxspeed = 0.9; // Maximum speed
    this.maxforce = 0.05; // Maximum steering force
    this.word = word;
    this.category = category;
    this.colour = '#000000';

    // Niall using this in draw() to centre the text at the boid's position
    this.width = textWidth(word);

    // here is where we set different properties for different categories of boid!
    // i'm matching the 'category' name based on the column heading we've taken from the CSV file.
    switch (category) {
      case 'mass':
        this.maxspeed = 7.0;
        this.maxforce = 0.9;
        this.colour = '#FA8072';
        break;
      case 'spreading':
        this.maxspeed = 0.9;
        this.maxforce = 0.05;
        this.colour = '#CD853F';
        break;
      case 'edge':
        this.maxspeed = 2.0;
        this.maxforce = 0.8;
        this.colour = '#9ACD32';
        break;
      case 'vibration':
        this.maxspeed = 0.2;
        this.maxforce = 0.5;
        this.colour = '#7f827d';
        break;
      case 'movement':
        this.maxspeed = 3.0;
        this.maxforce = 0.5;
        this.colour = '#ff0000';
      case 'structures':
        this.maxspeed = 0.2;
        this.maxforce = 0.5;
        this.colour = '#4a6355';
        break;
      case 'living':
        this.maxspeed = 1.2;
        this.maxforce = 0.75;
        this.colour = '#155432';
        break;
      case 'gesture':
        this.maxspeed = 0.6;
        this.maxforce = 0.8;
        this.colour = '#69945f';
        break;
      case 'structures':
        this.maxspeed = 0.2;
        this.maxforce = 0.5;
        this.colour = 'grey';
        break;
      case 'placeholder':
        this.maxspeed = 0.02;
        this.maxforce = 0.15;
        this.colour = '#6f7a74';
        break;
      case 'form/quality':
        this.maxspeed = 0.2;
        this.maxforce = 0.5;
        this.colour = '#d4a8a1';
        break;
      case 'mass_phrases':
        this.maxspeed = 0.42;
        this.maxforce = 0.5;
        this.colour = '#808000';
        break;
      case 'spreading_phrases':
        this.maxspeed = 0.2;
        this.maxforce = 0.5;
        this.colour = '#EAC50A';
        break;
      case 'edge_phrases':
        this.maxspeed = 0.2;
        this.maxforce = 0.5;
        this.colour = '#9ac777';
        break;
      case 'movement_phrases':
        this.maxspeed = 0.2;
        this.maxforce = 0.5;
        this.colour = '#c77d77';
        break;
      case 'vibration_phrases':
        this.maxspeed = 0.2;
        this.maxforce = 0.5;
        this.colour = '#c2b082';
        break;
      case 'living_phrases':
        this.maxspeed = 0.52;
        this.maxforce = 0.5;
        this.colour = '#556952';
        break;
      case 'gesture_phrases':
        this.maxspeed = 0.2;
        this.maxforce = 0.5;
        this.colour = '#ba9272';
        break;
      case 'structures_phrases':
        this.maxspeed = 0.2;
        this.maxforce = 0.5;
        this.colour = '#ba9272';
        break;
      case 'placeholder_phrases':
        this.maxspeed = 0.2;
        this.maxforce = 0.5;
        this.colour = '#c77d77';
        break;
      case 'form_phrases':
        this.maxspeed = 0.2;
        this.maxforce = 0.5;
        this.colour = '#ba9272';
        break;
      default:
        print("we need to create some properties for this category: " + category);
        break;
    }

    this.draw = function() {
      this.velocity.limit(1);

      fill(this.colour);
      // if you wanna debug the boids actual position, uncomment this
      // ellipse(this.position.x, this.position.y, 5, 5);

      // i've offset the text by half its width, so the text is displayed centred at the boid
      text(this.word, this.position.x - this.width / 2, this.position.y);
      textSize(20);
    }
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.draw();
  }


  // Forces go into acceleration
  applyForce(force) {
    this.acceleration.add(force);
  }

  // We accumulate a new acceleration each time based on three rules
  flock(boids) {
    let sep = this.separate(boids); // Separation
    let ali = this.align(boids); // Alignment
    let coh = this.cohesion(boids); // Cohesion
    // Arbitrarily weight these forces
    sep.mult(2.5);
    ali.mult(1.0);
    coh.mult(1.0);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }


  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);
  }

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    return steer;
  }

  // Wraparound
  borders() {
    // preventing boids from just disappearing off screen by making their bounds way bigger
    let size_exaggeration = this.r * 10;
    if (this.position.x < -size_exaggeration) this.position.x = width + size_exaggeration;
    if (this.position.y < -size_exaggeration) this.position.y = height + size_exaggeration;
    if (this.position.x > width + size_exaggeration) this.position.x = -size_exaggeration;
    if (this.position.y > height + size_exaggeration) this.position.y = -size_exaggeration;
  }

  // Separation
  // Method checks for nearby boids and steers away
  separate(boids) {
    let desiredseparation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  // Alignment
  // For every nearby boid in the system, calculate the average velocity
  align(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  // Cohesion
  // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  cohesion(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  }
}