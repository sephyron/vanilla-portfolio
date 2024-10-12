class ParticleCanvas extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); 
        const canvas = document.createElement('canvas');
        canvas.id = 'particleCanvas'; 
        this.shadowRoot.appendChild(canvas);
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 0; 
        this.resizeHandler = this.onResize.bind(this); 
    }
    connectedCallback() {
        this.onResize(); 
        window.addEventListener('resize', this.resizeHandler);
        this.initParticles();
        this.animate();
    }
    disconnectedCallback() {
        window.removeEventListener('resize', this.resizeHandler);
    }
    onResize() {
        const canvas = this.shadowRoot.getElementById('particleCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.particleCount = this.calculateParticleCount();
        this.initParticles();
    }
    calculateParticleCount() {
        const canvas = this.shadowRoot.getElementById('particleCanvas');
        return Math.floor((canvas.width * canvas.height) / 6000);
    }
    initParticles() {
        this.particles = []; 
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.ctx, this.shadowRoot.getElementById('particleCanvas')));
        }
    }
  
    animate() {
        this.ctx.clearRect(0, 0, this.shadowRoot.getElementById('particleCanvas').width, this.shadowRoot.getElementById('particleCanvas').height);
        this.particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(this.animate.bind(this)); 
    }
}
class Particle {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.reset();
        this.y = Math.random() * this.canvas.height;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() / 5 + 0.1;
        this.opacity = 1;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
    }

    update() {
        this.y -= this.speed;
        if (this.y < 0) {
            this.reset();
        }

        if (!this.fadingOut && Date.now() > this.fadeStart) {
            this.fadingOut = true;
        }
        
        if (this.fadingOut) {
            this.opacity -= 0.008;
            if (this.opacity <= 0) {
                this.reset();
            }
        }
    }

    draw() {
        ctx.fillStyle = `rgba(${255 - (Math.random() * 255/2)}, 255, 255, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, 0.4, Math.random() * 2 + 1);
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

function calculateParticleCount() {
    return Math.floor((canvas.width * canvas.height) / 6000);
}

function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particleCount = calculateParticleCount();
    initParticles();
}

window.addEventListener('resize', onResize);

initParticles();
animate();


customElements.define('particle-canvas', ParticleCanvas);