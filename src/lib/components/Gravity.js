import { Component } from "../ecs/Component";
import * as THREE from "three"

export class Gravity extends Component {
    /** 
     * @param {number} force 
     */
    constructor(force = 9.8) {
        super();
        this.force = new THREE.Vector3(0, -force, 0);
    }
}