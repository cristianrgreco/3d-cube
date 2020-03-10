export class Canvas {
    constructor() {
        this.canvas = document.querySelector('#app');
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.fillStyle = '#000';
        this.context.fillRect(0, 0, this.width, this.height);
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

    strokeLine(x1, y1, x2, y2, strokeStyle, type = 'solid') {
        this.context.save();
        if (type === 'dashed') {
            this.context.setLineDash([1, 2]);
        }
        this.context.strokeStyle = strokeStyle;
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.closePath();
        this.context.stroke();
        this.context.restore();
    }
}