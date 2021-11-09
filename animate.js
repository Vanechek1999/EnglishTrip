let tl = gsap.timeline();

let allLines = document.querySelector('.line');

tl.to('.line1', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3"})
tl.to('.line2', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line3', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line4', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line5', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line6', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line7', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line8', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line9', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line10', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})
tl.to('.line11', {'stroke-dashoffset': 0, duration: 2.5, ease:"power3", delay: -1.7})


// var cursor = document.querySelector('.cursor');
// var cursorinner = document.querySelector('.cursor2');

// document.addEventListener('mousemove', function(e){
//   var x = e.clientX;
//   var y = e.clientY;
//   cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
  
// });

// document.addEventListener('mousemove', function(e){
//   var x = e.clientX;
//   var y = e.clientY;
//   cursorinner.style.left = x + 'px';
//   cursorinner.style.top = y + 'px';
// });

// Animation text

let canvas, ctx, w, h, laser, text, particles, input;
const colorsSpark = ['#3C82F4','#FF437E']

function Laser(options) {
    options = options || {};
    this.lifespan = options.lifespan || Math.round(Math.random() * 5 + 3);
    this.maxlife = this.lifespan;
    this.color = options.color || colorsSpark[Math.floor(Math.random()* colorsSpark.length)];
    this.x = options.x || Math.random() * w;
    this.y = options.y || Math.random() * h;
    this.width = options.width || 2;

    this.update = function(index, array) {
        this.lifespan > 0 && this.lifespan--;
        this.lifespan <= 0 && this.remove(index, array);
    }

    this.render = function(ctx) {
        if (this.lifespan <= 0) return;
        ctx.beginPath();
        ctx.globalAlpha = this.lifespan / this.maxlife;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(w, this.y);
        ctx.stroke();
        ctx.closePath();
    }

    this.remove = function(index, array) {
        array.splice(index, 1);
    }
}

function Spark(options) {
    options = options || {};
    this.x = options.x || w * 0.5;
    this.y = options.y || h * 0.5;
    this.v = options.v || { direct: Math.random() * Math.PI * 2, weight: Math.random() * 10 + 2, friction: 0.94 };
    this.a = options.a || { change: Math.random() * 0.2 - 0.1, min: this.v.direct - Math.PI * 0.4, max: this.v.direct + Math.PI * 0.4 };
    this.g = options.g || { direct: Math.PI * 0.5 + (Math.random() * 0.4 - 0.2), weight: Math.random() * 0.5 + 0.5 };
    this.width = options.width || Math.random() * 3;
    this.lifespan = options.lifespan || Math.round(Math.random() * 20 + 40);
    this.maxlife = this.lifespan;

    this.color = options.color || colorsSpark[Math.floor(Math.random()* colorsSpark.length)];
    this.prev = { x: this.x, y: this.y };

    this.update = function(index, array) {
        this.prev = { x: this.x, y: this.y };
        this.x += Math.cos(this.v.direct) * this.v.weight;
        this.x += Math.cos(this.g.direct) * this.g.weight;
        this.y += Math.sin(this.v.direct) * this.v.weight;
        this.y += Math.sin(this.g.direct) * this.g.weight;
        this.v.weight *= this.v.friction;
        this.v.direct += this.a.change;
        (this.v.direct > this.a.max || this.v.direct < this.a.min) && (this.a.change *= -1);
        this.lifespan > 0 && this.lifespan--;
        this.lifespan <= 0 && this.remove(index, array);
    }

    this.render = function(ctx) {
        if (this.lifespan <= 0) return;
        ctx.beginPath();
        ctx.globalAlpha = this.lifespan / this.maxlife;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.prev.x, this.prev.y);
        ctx.stroke();
        ctx.closePath();
    }

    this.remove = function(index, array) {
        array.splice(index, 1);
    }
}

function Particles(options) {
    options = options || {};
    this.max = options.max || Math.round(Math.random() * 20 + 10);
    this.sparks = [...new Array(this.max)].map(() => new Spark(options));

    this.update = function() {
        this.sparks.forEach((s, i) => s.update(i, this.sparks));
    }

    this.render = function(ctx) {
        this.sparks.forEach(s => s.render(ctx));
    }
}

function Text(options) {

    options = options || {};

    if(window.innerWidth >= 1920){
        options.size = 100
    }else if(window.innerWidth >= 1536 && window.innerWidth < 1920){
        options.size = 80;
    }else if(window.innerWidth >= 1414 && window.innerWidth < 1536){
        options.size = 70
    }else if(window.innerWidth >= 1376 && window.innerWidth < 1414){
        options.size = 60
    }else if(window.innerWidth >= 1280 && window.innerWidth < 1376){
        options.size = 50
        allLines.style.width = '579px';
        allLines.style.height = '862.71px';
    }else if(window.innerWidth >= 1024 && window.innerWidth < 1280){
        options.size = 40
        allLines.style.width = '479px';
        allLines.style.height = '713.71px';
    }else if(window.innerWidth >= 768 && window.innerWidth < 1024){
        options.size = 30
        allLines.style.width = '379px';
        allLines.style.height = '564.71px';
    }else if( window.innerWidth < 768){
        allLines.style.width = '320px';
        allLines.style.height = '476.8px';
        options.size = 20
    }
    const pool = document.createElement('canvas');
    const buffer = pool.getContext('2d');
    var gradient = buffer.createLinearGradient(20,0, window.innerWidth/2,0);
    gradient.addColorStop(0.5, '#3C82F4');
    gradient.addColorStop(1, '#FF437E');
    // Другой вариант расцветки
    // gradient.addColorStop(0, '#e25822');
    // gradient.addColorStop(.3, '#22e258');
    // gradient.addColorStop(.6, '#22ace2');
    // gradient.addColorStop(1, '#e222ac');
    pool.width = w;
    buffer.fillStyle = '#000000';
    buffer.fillRect(0, 0, pool.width, pool.height);
    
    this.size = options.size || 40;
    this.copy = (options.copy || `Hello!`) + ' ';
    this.color = options.color || gradient;
    this.delay = options.delay || .1; // Скорость воспроизведения анимации
    this.basedelay = this.delay;
    buffer.font = `${this.size}px Comic Sans MS`;
    this.bound = buffer.measureText(this.copy);
    this.bound.height = this.size * 1.5;
    this.x = options.x || w * 0.5 - this.bound.width * 0.5; //Положение по X
    this.y = options.y || h * 0.3 - this.size * 0.3;//Положение по Y
  
    buffer.strokeStyle = this.color;
    buffer.strokeText(this.copy, 0, this.bound.height * 0.8);
    this.data = buffer.getImageData(0, 0, this.bound.width, this.bound.height);
    this.index = 0;

    this.update = function() {
        // console.log(this.bound.width);
        if (this.index >= this.bound.width) {
            // setTimeout(()=>{
            //     document.querySelector('canvas').classList.add('hide')
            // }, 1000)//На будущее, будет исчезать и появляться основной контент
            // this.index = 0; //данный параметр отвечает за повтор анимации
            return;
        }
        const data = this.data.data;
        for (let i = this.index * 4; i < data.length; i += (4 * this.data.width)) {
            const bitmap = data[i] + data[i + 1] + data[i + 2] + data[i + 3];
            if (bitmap > 255 && Math.random() > 0.86) {
                const x = this.x + this.index;
                const y = this.y + (i / this.bound.width / 4);
                laser.push(new Laser({
                    x: x,
                    y: y
                }));
                Math.random() > 0.7 && particles.push(new Particles({
                    x: x,
                    y: y
                }));
            }
        }
        this.delay-- < 0 && (this.index++ && (this.delay += this.basedelay));
    }

    this.render = function(ctx) {
        ctx.putImageData(this.data, this.x, this.y, 0, 0, this.index, this.bound.height);
    }
}

function loop() {
    
    update();
    render();
    requestAnimationFrame(loop);

}

function update() {
    text.update();
    laser.forEach((l, i) => l.update(i, laser));
    particles.forEach(p => p.update());
}

function render() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'screen';
    text.render(ctx);
    laser.forEach(l => l.render(ctx));
    particles.forEach(p => p.render(ctx));
}

(function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    laser = [];
    particles = [];
    text = new Text({
        copy: 'Welcome to learn English'
    });
    loop();
})()




