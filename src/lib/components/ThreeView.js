import { Component } from "../ecs/Component";

export class ThreeView extends Component {
    constructor(obj, isOdd = false) {
        super();
        this.obj = obj;
        this.isOdd = isOdd;
    }
}