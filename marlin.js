const canvas = document.createElement("canvas");
document.body.appendChild(canvas)

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

let cw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
let ch = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);

canvas.width = cw;
canvas.height = ch;
const c = canvas.getContext("2d");

function Marlin() {
  this.x = cw / 2;
  this.y = ch / 2;
  this.radius = 50;
  this.moveAngle = 0;
  this.speed = 1;
  this.angle = 0;

  this.draw = () => {
    const eyes = {
      right: {
        x:
          this.x +
          Math.sin(((this.moveAngle - 20) * Math.PI) / 180) *
            (this.radius - 18),
        y:
          this.y +
          Math.cos(((this.moveAngle - 20) * Math.PI) / 180) *
            (this.radius - 18),
      },
      left: {
        x:
          this.x +
          Math.sin(((this.moveAngle + 20) * Math.PI) / 180) *
            (this.radius - 18),
        y:
          this.y +
          Math.cos(((this.moveAngle + 20) * Math.PI) / 180) *
            (this.radius - 18),
      },
    };

    // body
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = "#141313";
    c.fill();

    // center
    c.beginPath();
    c.arc(this.x, this.y, 7, 0, Math.PI * 2, false);
    c.fillStyle = "gray";
    c.fill();

    // center ring
    c.beginPath();
    c.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
    c.strokeStyle = "black";
    c.stroke();

    // eye
    c.beginPath();
    c.arc(eyes.left.x, eyes.left.y, 5, 0, Math.PI * 2, false);
    c.fillStyle = "lightgray";
    c.fill();

    c.beginPath();
    c.arc(eyes.right.x, eyes.right.y, 5, 0, Math.PI * 2, false);
    c.fillStyle = "lightgray";
    c.fill();

    // rudolph
    // c.beginPath();
    // c.arc(
    //   this.x + Math.sin((this.moveAngle * Math.PI) / 180) * (this.radius - 20),
    //   this.y + Math.cos((this.moveAngle * Math.PI) / 180) * (this.radius - 20),
    //   3,
    //   0,
    //   Math.PI * 2,
    //   false
    // );
    // c.fillStyle = "red";
    // c.fill();

    c.beginPath();
    c.arc(eyes.right.x, eyes.right.y, 3, 0, Math.PI * 2, false);
    c.fillStyle = "black";
    c.fill();

    c.beginPath();
    c.arc(eyes.left.x, eyes.left.y, 3, 0, Math.PI * 2, false);
    c.fillStyle = "black";
    c.fill();
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  this.update = () => {
    

    if (
      this.x < 0 + this.radius ||
      this.x > cw - this.radius ||
      this.y > ch - this.radius ||
      this.y < this.radius
    ) {
      // pause
      this.speed = 0;
      // rotate
      for (let i = 0; i < getRandomArbitrary(0,360); i++) {
        this.moveAngle += 0.08;
      }
      this.speed = 1;
    }
    this.angle = (this.moveAngle * Math.PI) / 180;
    this.x += this.speed * Math.sin(this.angle); // 1 is speed
    this.y += this.speed * Math.cos(this.angle);

    this.draw();
  };
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, cw, ch);
  marlin.update();
}

let marlin;
let leftPaddle;
let rightPaddle;

function init() {
  const radius = 50;

  marlin = new Marlin();

  animate();
}

init();
