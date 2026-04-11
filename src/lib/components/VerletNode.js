import { Component } from "../ecs/Component";
import * as THREE from "three"

export class VerletNode extends Component {
    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {boolean} isPinned 
     */
    constructor(x, y, z, isPinned = false) {
        super();
        this.isPinned = isPinned;
        this.position = new THREE.Vector3(x, y, z);
        this.oldPosition = new THREE.Vector3(x, y, z);
        this.nextNode = null;
    }
}