export class Axis {
    constructor(vertices) {
        this.vertices = vertices;
    }

    transform(transformation) {
        return new Axis(this.vertices.map(v => transformation(v)));
    }

    draw(canvas) {
        for (let i = 0; i < this.vertices.length - 1; i++) {
            const vertex = this.vertices[i];
            const nextVertex = this.vertices[i + 1];

            canvas.strokeLine(
                vertex.x, vertex.y,
                nextVertex.x, nextVertex.y,
                '#000',
                'dashed'
            );
        }
    }
}