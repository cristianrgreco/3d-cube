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

    fillCircle(x, y, r, fillStyle) {
        this.context.save();
        this.context.fillStyle = fillStyle;
        this.context.beginPath();
        this.context.arc(x, y, r, 0, Math.PI * 2);
        this.context.closePath();
        this.context.fill();
        this.context.restore();
    }

    strokeLine(x1, y1, x2, y2, strokeStyle) {
        this.context.save();
        this.context.strokeStyle = strokeStyle;
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
        canvas.fillCircle(this.pos.x, this.pos.y, this.r, '#000');
    }
}

const canvas = new Canvas();

const translation = new Vector3(450, 250, 0);

const pointRadius = 2;
const points = [
    new Point(new Vector3(-0.5, -0.5, -0.5), pointRadius),
    new Point(new Vector3(0.5, -0.5, -0.5), pointRadius),
    new Point(new Vector3(0.5, 0.5, -0.5), pointRadius),
    new Point(new Vector3(-0.5, 0.5, -0.5), pointRadius),

    new Point(new Vector3(-0.5, -0.5, 0.5), pointRadius),
    new Point(new Vector3(0.5, -0.5, 0.5), pointRadius),
    new Point(new Vector3(0.5, 0.5, 0.5), pointRadius),
    new Point(new Vector3(-0.5, 0.5, 0.5), pointRadius),
];

function connectPoints(points) {
    function drawLine(a, b) {
        canvas.strokeLine(a.pos.x, a.pos.y, b.pos.x, b.pos.y, '#000');
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

let angle = 0;

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

    const projectedPoints = points.map(point => {
        const transformed = point
            .multiplyMatrix(rotationX)
            .multiplyMatrix(rotationY)
            .multiplyMatrix(rotationZ);

        const distance = 1.5;
        const projection = weakPerspectiveProjection(distance, transformed.pos.z);

        return transformed
            .multiplyMatrix(projection)
            .scale(100)
            .translate(translation);
    });

    projectedPoints.forEach(point => point.draw(canvas));
    connectPoints(projectedPoints);

    angle += 0.03;

    requestAnimationFrame(draw);
})();

function weakPerspectiveProjection(distance, z) {
    const scale = 1 / (distance - z);

    return [
        [scale, 0, 0],
        [0, scale, 0],
        [0, 0, 1]
    ];
}

function orthographicProjection() {
    return [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];
}
