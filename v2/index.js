import {Canvas} from "./canvas";
import {Vector3} from "./vector3";
import {Axis} from "./axis";
import {ORTHOGRAPHIC_PROJECTION, rotateX, rotateY, rotateZ} from "./matrix";
import {Cube} from "./cube";

const canvas = new Canvas();
const translation = new Vector3(canvas.width / 2, canvas.height / 2, 0);

const xAxis = new Axis([new Vector3(-0.5, 0, 0), new Vector3(0.5, 0, 0)]);
const yAxis = new Axis([new Vector3(0, -0.5, 0), new Vector3(0, 0.5, 0)]);
const zAxis = new Axis([new Vector3(0, 0, -0.5), new Vector3(0, 0, 0.5)]);

const cube = new Cube([
    new Vector3(-0.5, -0.5, -0.5),
    new Vector3(0.5, -0.5, -0.5),
    new Vector3(0.5, 0.5, -0.5),
    new Vector3(-0.5, 0.5, -0.5),
    new Vector3(-0.5, -0.5, 0.5),
    new Vector3(0.5, -0.5, 0.5),
    new Vector3(0.5, 0.5, 0.5),
    new Vector3(-0.5, 0.5, 0.5),
]);

let angle = 0;

(function draw() {
    canvas.clear();
    drawAxes();
    drawCube();
    angle += 0.01;
    requestAnimationFrame(draw);
})();

function drawAxes() {
    xAxis
        .transform(v => rotateZ(angle).mulVector(v))
        .transform(v => ORTHOGRAPHIC_PROJECTION.mulVector(v))
        .transform(v => v.mulScalar(300))
        .transform(v => translation.addVector(v))
        .draw(canvas);

    yAxis
        .transform(v => rotateZ(angle).mulVector(v))
        .transform(v => ORTHOGRAPHIC_PROJECTION.mulVector(v))
        .transform(v => v.mulScalar(300))
        .transform(v => translation.addVector(v))
        .draw(canvas);

    zAxis
        .transform(v => rotateX(angle).mulVector(v))
        .transform(v => rotateY(angle).mulVector(v))
        .transform(v => ORTHOGRAPHIC_PROJECTION.mulVector(v))
        .transform(v => v.mulScalar(300))
        .transform(v => translation.addVector(v))
        .draw(canvas);
}

function drawCube() {
    cube
        .transform(v => rotateZ(angle).mulVector(v))
        .transform(v => rotateX(angle).mulVector(v))
        .transform(v => rotateY(angle).mulVector(v))
        .transform(v => ORTHOGRAPHIC_PROJECTION.mulVector(v))
        .transform(v => v.mulScalar(100))
        .transform(v => translation.addVector(v))
        .draw(canvas);
}