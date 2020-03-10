import {Vector3} from "./vector3";

export class Matrix {
    constructor(rows) {
        this.rows = rows;
    }

    mulVector(vector) {
        const x =
            this.rows[0][0] * vector.x +
            this.rows[0][1] * vector.y +
            this.rows[0][2] * vector.z;
        const y =
            this.rows[1][0] * vector.x +
            this.rows[1][1] * vector.y +
            this.rows[1][2] * vector.z;
        const z =
            this.rows[2][0] * vector.x +
            this.rows[2][1] * vector.y +
            this.rows[2][2] * vector.z;

        return new Vector3(x, y, z);
    }
}

export const rotateX = angle => new Matrix([
    [1, 0, 0],
    [0, Math.cos(angle), -Math.sin(angle)],
    [0, Math.sin(angle), Math.cos(angle)],
]);

export const rotateY = angle => new Matrix([
    [Math.cos(angle), 0, -Math.sin(angle)],
    [0, 1, 0],
    [Math.sin(angle), 0, Math.cos(angle)],
]);

export const rotateZ = angle => new Matrix([
    [Math.cos(angle), -Math.sin(angle), 0],
    [Math.sin(angle), Math.cos(angle), 0],
    [0, 0, 1]
]);

export const ORTHOGRAPHIC_PROJECTION = new Matrix([
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
]);

export const weakProjection = (distance, z) => {
    const scale = 1 / (distance - z);

    return new Matrix([
        [scale, 0, 0],
        [0, scale, 0],
        [0, 0, 1],
    ]);
};
