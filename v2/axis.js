export class Axis {
    constructor(label, begin, end) {
        this.label = label;
        this.begin = begin;
        this.end = end;
    }

    transform(transformation) {
        return new Axis(
            this.label,
            transformation(this.begin),
            transformation(this.end)
        );
    }

    draw(canvas) {
        this.drawLabels(canvas);
        this.connectVertices(canvas);
    }

    drawLabels(canvas) {
        canvas.fillText(this.label, this.begin.x, this.begin.y, '20px serif', '#000');
        canvas.fillText(this.label, this.end.x, this.end.y, '20px serif', '#000');
    }

    connectVertices(canvas) {
        canvas.strokeLine(
            this.begin.x, this.begin.y,
            this.end.x, this.end.y,
            '#000',
            'dashed'
        );
    }
}