const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Handle Mouse
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Create Particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // Draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();
    }
    // Check particle position, mouse position, move particle, draw particle
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Initialize particle array
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        let color = '#38bdf8';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Connect particles with lines
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = `rgba(56, 189, 248, ${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Resizing handling
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height / 80) * (canvas.width / 80));
    init();
});

init();
animate();
const modalData = {
    'os-modal': `
        <h3>Operating Systems & Administration</h3>
        <ul>
            <li><strong>Linux Expert:</strong> Proficient in Ubuntu and Linux Mint environments[cite: 22].</li>
            <li><strong>Administration:</strong> Completed "Linux Unhatched" (Cisco/NDG)[cite: 25, 34].</li>
            <li><strong>Multi-boot:</strong> Experienced in managing complex Windows/Linux/macOS workflows for academic use[cite: 32].</li>
        </ul>`,
    'hw-modal': `
        <h3>Hardware & Systems Experience</h3>
        <ul>
            <li><strong>PC Assembly:</strong> Specialist in configuring high-performance Intel i7 systems[cite: 31].</li>
            <li><strong>PCB Design:</strong> Hands-on experience in PCB fabrication, from circuit etching to soldering[cite: 28, 29].</li>
            <li><strong>Solar Energy:</strong> Former Intern at Shyam Energy; assisted in site surveys and equipment maintenance[cite: 8, 10].</li>
        </ul>`,
    'dev-modal': `
        <h3>Software & Development</h3>
        <ul>
            <li><strong>Programming:</strong> Strong foundation in Embedded C and Basic VLSI Design[cite: 23].</li>
            <li><strong>Tools:</strong> Proficient in version control using Git and GitHub[cite: 23].</li>
            <li><strong>Future Focus:</strong> Currently transitioning into AI and software development through a BTech IT program[cite: 6, 12].</li>
        </ul>`
};

function openModal(type) {
    const overlay = document.getElementById('modal-overlay');
    const body = document.getElementById('modal-body');
    body.innerHTML = modalData[type];
    overlay.classList.add('active');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
}