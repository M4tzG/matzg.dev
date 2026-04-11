import { System } from "../ecs/System"; 
import { Query } from "../ecs/Query";
import { Camera, Transform } from "../components/index";

export class CameraSystem extends System {
    constructor() {
        super();
    }

    /**
     * @param {World} world
     * @param {number} delta
     */
    update(world, delta) {
        const entities = Query.entitiesWith(world, Camera, Transform);

        for (const entity of entities) {
            const cameraComp = world.getComponent(entity, Camera);
            const transform = world.getComponent(entity, Transform);

            
            if (cameraComp.isActive) {
                cameraComp.camera.position.z = transform.position.z;
                console.log("Camera position:", cameraComp.camera.position);
                cameraComp.camera.lookAt(cameraComp.lookAt.x, cameraComp.lookAt.y, cameraComp.lookAt.z);

                world.mainCamera = cameraComp.camera; 
            }
        }
    }
}