document.getElementById("icon-and-text-projects").addEventListener("click", function() {
    window.location.href = "../home.html";
});

document.getElementById("icon-and-text-music").addEventListener("click", function() {
    window.location.href = "../music_files/music.html";
});

document.getElementById("add-particle").addEventListener("click", function() {
    particles.push(new Particle(random(width), random(height)));
});

document.getElementById("remove-particle").addEventListener("click", function() {
    if (particles.length > 0) {
        particles.pop();
    }
});

let particles = [];

function setup() {
    const canvas = createCanvas(800, 600);  // Set the desired width and height of the canvas
    canvas.parent('sim-viewer');  // Attach the canvas to the 'sim-viewer' div
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle(random(width), random(height)));
    }
}

function draw() {
    background(0);
    for (let particle of particles) {
        particle.interact(particles);
        particle.update();
        particle.show();
    }
}

class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0.1, 0.1);
        this.acc = createVector(0, 0);
        this.r = 8;
        this.isAttracting = random() < 0.5;
        this.color = this.isAttracting ? color(78, 152, 212) : color(209, 71, 52); // Blue for attracting, red for repelling
        this.maxVel = 2;
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxVel);
        this.pos.add(this.vel);
        this.acc.mult(0.95);
        this.acc.mult(0);
        this.edges();
    }

    applyForce(force) {
        this.acc.add(force);
    }

    interact(particles) {
        for (let other of particles) {
            if (other !== this) {
                let force = p5.Vector.sub(other.pos, this.pos);
                let distance = force.mag();
                let separationDistance = 25; // Minimum distance to maintain between particles
                if (distance < separationDistance) {
                    let separationForce = force.copy().mult(-1).setMag(5); // Repelling force when too close
                    this.applyForce(separationForce);
                } else if (distance < 100) {
                    let strength = (this.isAttracting ? 1 : -3) * (1 / distance); // Attraction/Repulsion based on distance
                    force.setMag(strength);
                    this.applyForce(force);
                }

            }
        }
    }

    edges() {
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }

    show() {
        fill(this.color);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
}
