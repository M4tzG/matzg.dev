import { System } from "../ecs/System";
import { Query } from "../ecs/Query";
import { MouseInteraction } from "../components/MouseInteraction";  
import { Input } from "../components/Input";
import { ThreeView } from "../components/ThreeView";
import { Transform } from "../components/Transform";

import * as THREE from "three";

export class PickingSystem extends System {
    constructor(scene, camera) {
        super();
        this.scene = scene;
        this.camera = camera;
        this.raycaster = new THREE.Raycaster();
        this.mouseVector = new THREE.Vector2();
        
    }

    update(world, deltaTime) {

        const entities = Query.entitiesWith(world, MouseInteraction, Input, ThreeView);

        const interactableObjects = [];
        const objectToEntityMap = new Map();
        let mouseInput = null;

        for (const e of entities) {
            const threeView = world.getComponent(e, ThreeView);
            const interaction = world.getComponent(e, MouseInteraction);
            const input = world.getComponent(e, Input);
            
            if (!mouseInput) mouseInput = input;

            interaction.isHovered = false;
            interaction.isClicked = false;

            if (threeView.obj) {
                interactableObjects.push(threeView.obj);
                objectToEntityMap.set(threeView.obj, e); 
            }
        }

        if (!mouseInput || interactableObjects.length === 0) return;


        this.mouseVector.set(mouseInput.mouse.x, mouseInput.mouse.y);
        this.raycaster.setFromCamera(this.mouseVector, this.camera);

        const intersects = this.raycaster.intersectObjects(interactableObjects, false);

        if (intersects.length > 0) {
            const firstObjectHit = intersects[0].object; 
            const entityHit = objectToEntityMap.get(firstObjectHit); 



            if (entityHit !== undefined) {
                const interaction = world.getComponent(entityHit, MouseInteraction);

                interaction.isHovered = true;
                // console.log("hover:", interaction.isHovered);


                if (mouseInput.mouse.isDown) {

                    interaction.isClicked = true;
                    // console.log("clicked", entityHit, " ", interaction.isClicked);
                }
            }
        }
        
        
    }
}