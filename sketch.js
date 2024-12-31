const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ],
  animate: false,
  fps: 60
};

let particles = [];

const sketch = () => {
  return ({ context, width, height, playhead }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    
    particles.push(new Particle(width / 2, height / 2, 'orange'));

    particles.forEach(particle => {
      particle.update();
      particle.draw(context);
    });

    // particles = particles.filter(particle => particle.alpha > 0);
  };
};

canvasSketch(sketch, settings);

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.velX = Math.random() * 10 - 2;
    this.velY = Math.random() * 10 - 2;
    this.alpha = 1;
    this.size = Math.random() * 500;
    this.color = color;
  }

  update() {
    this.x += this.velX;
    this.y += this.velY;
    this.alpha -= 0.01;

    if (this.alpha < 0) {
      this.alpha = 0;
    }
  }

  draw(context) {
    context.save();

    context.globalAlpha = this.alpha;
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();

    context.restore();
  }
}

class Firework {
  constructor(x, y, color) {
    this.particles = [];
    const numParticles = 50 + Math.random() * 50;

    for (let i = 0; i < numParticles; i++) {
      this.particles.push(new Particle(x, y, color));
    }
  }

  update() {
    this.particles.forEach(particle => particle.update());
    this.particles = this.particles.filter(particle => particle.alpha > 0);
  }

  isAlive() {
    return this.particles.length > 0;
  }
}