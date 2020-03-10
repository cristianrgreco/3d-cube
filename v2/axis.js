export class Axis {
    constructor(label, vertices) {
        this.label = label;
        this.vertices = vertices;
    }

    transform(transformation) {
        return new Axis(this.label, this.vertices.map(v => transformation(v)));
    }

    draw(canvas) {
        this.drawLabels(canvas);
        this.connectVertices(canvas);
    }

    drawLabels(canvas) {
        this.vertices.forEach(v =>
            canvas.fillText(this.label, v.x, v.y, '20px sans-serif', '#000')
        );
    }

    connectVertices(canvas) {
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