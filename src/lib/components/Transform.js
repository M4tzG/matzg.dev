import { Component } from "../ecs/Component";

export class Transform extends Component {
    constructor (px = 0, py = 0, pz = 0, scale = 1, rx = 0, ry = 0, rz = 0){
        super();
        this.position = {
            x: px,
            y: py,
            z: pz
        }
        this.rotation = {
            x: rx,
            y: ry,
            z: rz
        }
        this.scale = scale
    }
}