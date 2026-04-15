import { Camera, Transform } from "../components/index";

import { System } from "../ecs/System"; 
import { Query } from "../ecs/Query";


export class CameraSystem extends System {
    constructor() {
        super();
        this._cachedData = null;
    }

    // --------------------------------
    /**
     * @param {World} world
     * @param {number} delta
     */
    // --------------------------------
    update(world, delta) {
        if (!this._cachedData) {
            const entities = Query.entitiesWith(world, Camera, Transform);
            this._cachedData = [];
            for (const entity of entities) {
                const cameraComp = world.getComponent(entity, Camera);
                const transform = world.getComponent(entity, Transform);
                this._cachedData.push({ cameraComp, transform });
            }
        }

        for (const { cameraComp, transform } of this._cachedData) {
            
            if (cameraComp.isActive) {
                cameraComp.camera.position.z = transform.position.z;
                cameraComp.camera.lookAt(cameraComp.lookAt.x, cameraComp.lookAt.y, cameraComp.lookAt.z);

                world.mainCamera = cameraComp.camera; 
            }
        }
    }
}