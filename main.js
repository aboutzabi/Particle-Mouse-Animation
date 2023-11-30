const canvas = document.querySelector('#mouse');
const ctx = canvas.getContext('2d');
ctx.globalAlpha = 0.5;

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

let particlesArray = [];

// Move mouse
addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Resize
addEventListener('resize', () => setsize());

// Generate Colors
const generateColors = () => {
    let Set = '123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += Set[Math.floor(Math.random() * Set.length)];
    }
    return color;
};

// Set size
const setsize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
};

// Particle constructor
function Particle(X, Y, ParticleWidth, color, RotationSpeed) {
    this.X = X;
    this.Y = Y;
    this.ParticleWidth = ParticleWidth;
    this.color = color;
    this.RotationSpeed = RotationSpeed;
    this.theta = Math.random() * Math.PI * 2;
    this.t = Math.random() * 150;

    this.rotate = () => {
        const ls = {
            x: this.X,
            y: this.Y
        };

        this.theta += this.RotationSpeed;
        this.X = mouse.x + Math.cos(this.theta) * this.t;
        this.Y = mouse.y + Math.sin(this.theta) * this.t;

        ctx.beginPath();
        ctx.lineWidth = this.ParticleWidth;
        ctx.strokeStyle = this.color;
        ctx.moveTo(ls.x, ls.y);
        ctx.lineTo(this.X, this.Y);
        ctx.stroke();
    };
}

// Generate Particles
const generateParticles = (amount) => {
    for (let i = 0; i < amount; i++) {
        particlesArray[i] = new Particle(
            innerWidth / 2,
            innerHeight / 2,
            4,
            generateColors(),
            0.02
        );
    }
};
generateParticles(101);

function animate() {
    requestAnimationFrame(animate);

    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    particlesArray.forEach((particle) => particle.rotate());
}

setsize();
animate();
