import { Component } from "../ecs/Component";
import * as THREE from "three";

export class Camera extends Component {
    /**
     * @param {THREE.PerspectiveCamera | THREE.OrthographicCamera} threeCameraInstance 
     * @param {THREE.Vector3} lookAt 
     * @param {boolean} [isActive] 
     */
    constructor(threeCameraInstance, lookAt, isActive = true) {
        super();
        this.camera = threeCameraInstance;
        this.isActive = isActive;
        this.lookAt = lookAt;
    }
}
