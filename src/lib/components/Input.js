import { Component } from "../ecs/Component";

export class Input extends Component {
    constructor() {
        super();
        this.mouse = {
            initialX: undefined,
            initialY: undefined
        }
    }
}