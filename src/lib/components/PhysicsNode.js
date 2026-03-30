import { Component } from "../ecs/Component";
import * as THREE from "three"

export class PhysicsNode extends Component {
    constructor(x, y, z, mass = 0, acceleration) {
        super();
        this.mass = mass;
        this.position = new THREE.Vector3(x, y, z);
        this.oldPosition = new THREE.Vector3(x, y, z);
        this.acceleration = acceleration;
    }
}