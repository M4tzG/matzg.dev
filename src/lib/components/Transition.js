import { Component } from "../ecs/Component";

export class Transition extends Component {
    constructor(configs) {
        super();
        this.velocity = configs.velocity || 1;
        this.acceleration = configs.acceleration || 1.1;
        this.direction = configs.direction || { x: 0, y: -1 };
        this.isActive = false;
    }
}