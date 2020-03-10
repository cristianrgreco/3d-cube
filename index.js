class Canvas {
    constructor() {
        this.canvas = document.querySelector('#app');
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    drawCircle(x, y, r) {
        this.context.save();
        // this.context.translate(250, 250);
        this.context.fillStyle = '#000';
        this.context.beginPath();
        this.context.arc(x, y, r, 0, Math.PI * 2);
        this.context.closePath();
        this.context.fill();
        this.context.restore();
    }

    drawLine(x1, y1, x2, y2) {
        this.context.save();
        // this.context.translate(250, 250);
        this.context.strokeStyle = '#000';
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.closePath();
        this.context.stroke();
        this.context.restore();
    }
}

class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    addVector(vector) {
        return new Vector3(
            this.x + vector.x,
            this.y + vector.y,
            this.z + vector.z,
        );
    }

    multiplyScalar(scalar) {
        return new Vector3(
            this.x * scalar,
            this.y * scalar,
            this.z * scalar
        );
    }
}

class Point {
    constructor(pos, r) {
        this.pos = pos;
        this.r = r;
    }

    translate(vector) {
        return new Point(this.pos.addVector(vector), this.r);
    }

    multiplyMatrix(matrix) {
        const x =
            matrix[0][0] * this.pos.x +
            matrix[0][1] * this.pos.y +
            matrix[0][2] * this.pos.z;
        const y =
            matrix[1][0] * this.pos.x +
            matrix[1][1] * this.pos.y +
            matrix[1][2] * this.pos.z;
        const z =
            matrix[2][0] * this.pos.x +
            matrix[2][1] * this.pos.y +
            matrix[2][2] * this.pos.z;

        return new Point(new Vector3(x, y, z), this.r);
    }

    scale(scalar) {
        return new Point(this.pos.multiplyScalar(scalar), this.r);
    }

    draw(canvas) {
        canvas.drawCircle(this.pos.x, this.pos.y, this.r);
    }
}

const canvas = new Canvas();

const projection = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
];
const translation = new Vector3(250, 250, 0);
let angle = 0;

const pointRadius = 2;
const points = [
    new Point(new Vector3(0, 0, 0), pointRadius),
    new Point(new Vector3(1, 0, 0), pointRadius),
    new Point(new Vector3(1, 1, 0), pointRadius),
    new Point(new Vector3(0, 1, 0), pointRadius),

    new Point(new Vector3(0, 0, 1), pointRadius),
    new Point(new Vector3(1, 0, 1), pointRadius),
    new Point(new Vector3(1, 1, 1), pointRadius),
    new Point(new Vector3(0, 1, 1), pointRadius),
];

function connectPoints(points) {
    function drawLine(a, b) {
        canvas.drawLine(a.pos.x, a.pos.y, b.pos.x, b.pos.y,)
    }

    drawLine(points[0], points[1]);
    drawLine(points[1], points[2]);
    drawLine(points[2], points[3]);
    drawLine(points[3], points[0]);

    drawLine(points[4], points[5]);
    drawLine(points[5], points[6]);
    drawLine(points[6], points[7]);
    drawLine(points[7], points[4]);

    drawLine(points[4], points[0]);
    drawLine(points[5], points[1]);
    drawLine(points[6], points[2]);
    drawLine(points[7], points[3]);
}

(function draw() {
    canvas.clear();

    const rotationX = [
        [1, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0, Math.sin(angle), Math.cos(angle)],
    ];
    const rotationY = [
        [Math.cos(angle), 0, -Math.sin(angle)],
        [0, 1, 0],
        [Math.sin(angle), 0, Math.cos(angle)],
    ];
    const rotationZ = [
        [Math.cos(angle), -Math.sin(angle), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 1]
    ];

    const projectedPoints = points.map(point => point
        .multiplyMatrix(rotationX)
        .multiplyMatrix(rotationY)
        .multiplyMatrix(rotationZ)
        .scale(100)
        .translate(translation)
        .multiplyMatrix(projection)
    );
    projectedPoints.forEach(point => point.draw(canvas));
    connectPoints(projectedPoints);

    angle += 0.03;

    requestAnimationFrame(draw);
})();
