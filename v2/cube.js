export class Cube {
    constructor(vertices) {
        this.vertices = vertices;
    }

    transform(transformation) {
        return new Cube(this.vertices.map(v => transformation(v)));
    }

    // translate(vector) {
    //     return new Cube(this.vertices.map(v => v.addVector(vector)));
    // }
    //
    // scale(scalar) {
    //     return new Cube(this.vertices.map(v => v.mulScalar(scalar)));
    // }
    //
    // rotate(matrix) {
    //     return new Cube(this.vertices.map(v => matrix.mulVector(v)));
    // }
    //
    // project(matrix) {
    //     return new Cube(this.vertices.map(v => matrix.mulVector(v)));
    // }
    //
    // projectFn(fn) {
    //     return new Cube(this.vertices.map(v => fn(v)));
    // }

    draw(canvas) {
        this.vertices.forEach(v => canvas.fillCircle(v.x, v.y, 2, '#fff'));

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
        canvas.strokeLine(a.x, a.y, b.x, b.y, '#fff');
    }
}