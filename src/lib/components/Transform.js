import { Component } from "../ecs/Component";

export class Transform extends Component {
    constructor(configs = {}) {
        super();
        this.position = {
            x: configs.px ?? 0,
            y: configs.py ?? 0,
            z: configs.pz ?? 0
        }
        this.rotation = {
            x: configs.rx ?? 0,
            y: configs.ry ?? 0,
            z: configs.rz ?? 0
        }
        this.scale = configs.scale ?? 1
    }
}