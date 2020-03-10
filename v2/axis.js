export class Axis {
    constructor(vertices) {
        this.vertices = vertices;
    }

    transform(transformation) {
        return new Axis(this.vertices.map(v => transformation(v)));
    }

    // translate(vector) {
    //     return new Axis(this.vertices.map(v => v.addVector(vector)));
    // }
    //
    // scale(scalar) {
    //     return new Axis(this.vertices.map(v => v.mulScalar(scalar)));
    // }
    //
    // rotate(matrix) {
    //     return new Axis(this.vertices.map(v => matrix.mulVector(v)));
    // }
    //
    // project(matrix) {
    //     return new Axis(this.vertices.map(v => matrix.mulVector(v)));
    // }
    //
    // projectFn(fn) {
    //     return new Axis(this.vertices.map(v => fn(v)));
    // }

    draw(canvas) {
        for (let i = 0; i < this.vertices.length - 1; i++) {
            const vertex = this.vertices[i];
            const nextVertex = this.vertices[i + 1];

            canvas.strokeLine(
                vertex.x, vertex.y,
                nextVertex.x, nextVertex.y,
                '#fff',
                'dashed'
            );
        }
    }
}