import { System } from "../ecs/System";
import { Query } from "../ecs/Query";
import { MouseInteraction } from "../components/MouseInteraction";  
import { Input } from "../components/Input";
import { ThreeView } from "../components/ThreeView";
// import { VerletNode } from "../components/IKNode";
import { Transform } from "../components/Transform";

import * as THREE from "three";

export class PickingSystem extends System {

// [=============================================================]  
    // interaçao do mouse com determinado componente
// [=============================================================]  

    constructor(scene, camera) {
        super();
        this.scene = scene;
        this.camera = camera;
        this.raycaster = new THREE.Raycaster(); // verifica hover (ajustar dps, ta fraco)
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

            // pega qm esta na frente e faz a graça

            // if (entityHit !== undefined) {
            //     const interaction = world.getComponent(entityHit, MouseInteraction);
            //     interaction.isHovered = true;
            //     const verlet = world.getComponent(entityHit, VerletNode);
            //     const input = world.getComponent(entityHit, Input);

            //     if (verlet && !verlet.isPinned && interaction.isHoverable) {
            //         // delta da mmovimentaçao do mouse
            //         const moveX = input.mouse.deltaX || 0;
            //         const moveY = input.mouse.deltaY || 0;

            //         // console.log(moveY, moveX)

            //         if (Math.abs(moveX) > 0 || Math.abs(moveY) > 0) {
                        
            //             const pushMultiplier = 0.003; 
            //             verlet.currentPosition.x += moveX * pushMultiplier;
            //             verlet.currentPosition.y -= moveY * pushMultiplier; 
            //         }
            //     }
            // }
        }
        
        
    }
}