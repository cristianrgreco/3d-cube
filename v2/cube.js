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
        this.connectLine(canvas, this.vertices[0], this.vertices[1]);
        this.connectLine(canvas, this.vertices[1], this.vertices[2]);
        this.connectLine(canvas, this.vertices[2], this.vertices[3]);
        this.connectLine(canvas, this.vertices[3], this.vertices[0]);

        this.connectLine(canvas, this.vertices[4], this.vertices[5]);
        this.connectLine(canvas, this.vertices[5], this.vertices[6]);
        this.connectLine(canvas, this.vertices[6], this.vertices[7]);
        this.connectLine(canvas, this.vertices[7], this.vertices[4]);

        this.connectLine(canvas, this.vertices[4], this.vertices[0]);
        this.connectLine(canvas, this.vertices[5], this.vertices[1]);
        this.connectLine(canvas, this.vertices[6], this.vertices[2]);
        this.connectLine(canvas, this.vertices[7], this.vertices[3]);
    }

    connectLine(canvas, a, b) {
        canvas.strokeLine(a.x, a.y, b.x, b.y, '#000');
    }
}