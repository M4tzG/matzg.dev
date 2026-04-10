import { Component } from "../ecs/Component";
import * as THREE from "three";

export class Camera extends Component {
    constructor(threeCameraInstance, lookAt, isActive = true) {
        super();
        this.camera = threeCameraInstance;
        this.isActive = isActive;
        this.lookAt = new THREE.Vector3(lookAt.x, lookAt.y, lookAt.z);
    }
}
