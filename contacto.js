window.addEventListener('load', function () {
  const canvas = document.getElementById('archCanvas');
  const ctx = canvas.getContext('2d');
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setCanvasSize();

  const config = {
    lineWidth: isMobile ? 1 : 1.5,
    opacity: 0.7,
    shapes: [],
    shapeCount: isMobile ? 6 : 8,
    speed: isMobile ? 0.1 : 0.2,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFBE0B', '#FB5607', '#8338EC', '#3A86FF', '#FF006E']
  };

  class Shape {
    constructor() {
      this.reset();
      this.size = isMobile ? (80 + Math.random() * 100) : (100 + Math.random() * 150);
      this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.z = Math.random() * 600;
      this.rot = Math.random() * Math.PI * 2;
      this.rotSpeed = (isMobile ? 0.001 : 0.002) + Math.random() * (isMobile ? 0.002 : 0.003);
    }
    update() {
      this.rot += this.rotSpeed;
      this.z -= config.speed;
      if (this.z < -200) {
        this.reset();
        this.z = 600 + Math.random() * 200;
      }
    }
    draw() {
      const s = this.size;
      const vertices = [
        { x: -s, y: -s, z: -s }, { x: s, y: -s, z: -s },
        { x: s, y: s, z: -s }, { x: -s, y: s, z: -s },
        { x: -s, y: -s, z: s }, { x: s, y: -s, z: s },
        { x: s, y: s, z: s }, { x: -s, y: s, z: s }
      ];
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];

      edges.forEach(edge => {
        const v1 = vertices[edge[0]];
        const v2 = vertices[edge[1]];
        const cos = Math.cos(this.rot);
        const sin = Math.sin(this.rot);
        const x1 = v1.x * cos - v1.z * sin;
        const z1 = v1.x * sin + v1.z * cos;
        const x2 = v2.x * cos - v2.z * sin;
        const z2 = v2.x * sin + v2.z * cos;
        const scale1 = 600 / (600 + z1 + this.z);
        const scale2 = 600 / (600 + z2 + this.z);
        const px1 = this.x + x1 * scale1;
        const py1 = this.y + v1.y * scale1;
        const px2 = this.x + x2 * scale2;
        const py2 = this.y + v2.y * scale2;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = config.lineWidth;
        ctx.globalAlpha = Math.min(scale1, scale2) * config.opacity * 0.8;
        ctx.beginPath();
        ctx.moveTo(px1, py1);
        ctx.lineTo(px2, py2);
        ctx.stroke();
      });
    }
  }

  for (let i = 0; i < config.shapeCount; i++) {
    config.shapes.push(new Shape());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    config.shapes.sort((a, b) => b.z - a.z);

    config.shapes.forEach(shape => {
      shape.update();
      shape.draw();
    });

    if (isMobile) {
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 30);
    } else {
      requestAnimationFrame(animate);
    }
  }

  animate();
});

