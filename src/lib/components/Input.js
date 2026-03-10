import { Component } from "../ecs/Component";

export class Input extends Component {
    constructor() {
        super();
        this.mouse = {
            x: 0,
            y: 0,
            isDown: false,


            initialX: undefined,
            initialY: undefined
        }
    }
}