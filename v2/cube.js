import {Vector3} from "./vector3";

export class Cube {
    constructor(vertices) {
        if (vertices) {
            this.vertices = vertices;
        } else {
            this.vertices = [
                new Vector3(-0.5, -0.5, -0.5),
                new Vector3(0.5, -0.5, -0.5),
                new Vector3(0.5, 0.5, -0.5),
                new Vector3(-0.5, 0.5, -0.5),
                new Vector3(-0.5, -0.5, 0.5),
                new Vector3(0.5, -0.5, 0.5),
                new Vector3(0.5, 0.5, 0.5),
                new Vector3(-0.5, 0.5, 0.5),
            ];
        }
    }

    transform(transformation) {
        return new Cube(this.vertices.map(v => transformation(v)));
    }

    draw(canvas) {
        this.drawPoints(canvas);
        this.connectVertices(canvas);
    }

    drawPoints(canvas) {
        this.vertices.forEach(v => canvas.fillCircle(v.x, v.y, 2, '#000'));
    }

    connectVertices(canvas) {
        for (let i = 0; i < this.vertices.length; i++) {
            this.connectLine(canvas, this.vertices[i % 4], this.vertices[(i + 1) % 4]);
            this.connectLine(canvas, this.vertices[i % 4 + 4], this.vertices[(i + 1) % 4 + 4]);
            this.connectLine(canvas, this.vertices[i % 4 + 4], this.vertices[i % 4]);
        }
    }

    connectLine(canvas, a, b) {
        canvas.strokeLine(a.x, a.y, b.x, b.y, '#000');
    }
}