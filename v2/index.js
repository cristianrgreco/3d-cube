import {Canvas} from "./canvas";
import {Vector3} from "./vector3";
import {Axis} from "./axis";
import {Matrix, rotateX, rotateY, rotateZ} from "./matrix";
import {Cube} from "./cube";

const canvas = new Canvas();
const translation = new Vector3(canvas.width / 2, canvas.height / 2, 0);
const projection = new Matrix([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
]);

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
        .rotate(rotateZ(angle))
        .project(projection)
        .scale(300)
        .translate(translation)
        .draw(canvas);

    yAxis
        .rotate(rotateZ(angle))
        .project(projection)
        .scale(300)
        .translate(translation)
        .draw(canvas);

    zAxis
        .rotate(rotateX(angle))
        .rotate(rotateY(angle))
        .project(projection)
        .scale(300)
        .translate(translation)
        .draw(canvas);
}

function drawCube() {
    cube
        .rotate(rotateZ(angle))
        .rotate(rotateX(angle))
        .rotate(rotateY(angle))
        .project(projection)
        .scale(100)
        .translate(new Vector3(400, 400, 10000))
        .draw(canvas);
}
