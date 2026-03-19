import { Component } from "../ecs/Component";

export class GyroParallax extends Component {
    constructor(configs = {}){
        super();
        this.targetX = 0;
        this.targetY = 0;
        this.intensity = configs.parallaxFactor ?? 1;
    }
}