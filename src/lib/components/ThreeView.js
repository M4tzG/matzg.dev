import { Component } from "../ecs/Component";

export class ThreeView extends Component {
    /**
     * @param {THREE.Object3D} obj 
     */
    constructor(obj) {
        super();
        this.obj = obj;
    }
}