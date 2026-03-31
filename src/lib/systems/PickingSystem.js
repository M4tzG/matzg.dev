import { System } from "../ecs/System";
import { Query } from "../ecs/Query";
import { Interaction } from "../components/Interaction";  
import { Input } from "../components/Input";
import { ThreeView } from "../components/ThreeView";
import { VerletNode } from "../components/PhysicsNode";

import * as THREE from "three";

export class PickingSystem extends System {

// [=============================================================]  
    // interaçao do mouse com determinado componente
// [=============================================================]  

    constructor(scene, camera) {
        super();
        this.scene = scene;
        this.camera = camera;
        this.raycaster = new THREE.Raycaster(); // verifica hover (ajustar dps)
        this.mouseVector = new THREE.Vector2();
        
    }

    update(world, deltaTime) {

        const entities = Query.entitiesWith(world, Interaction, Input, ThreeView);

        const interactableObjects = [];
        const objectToEntityMap = new Map();
        let mouseInput = null;

        for (const e of entities) {
            const threeView = world.getComponent(e, ThreeView);
            const interaction = world.getComponent(e, Interaction);
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
            let entityHit = null; 
            
            for (let i = 0; i < intersects.length; i++) {
                const objectHit = intersects[i].object;
                const tempEntity = objectToEntityMap.get(objectHit);
                
                if (tempEntity !== undefined) {
                    const interaction = world.getComponent(tempEntity, Interaction);
                    
                    if (interaction.isHoverable) {
                        entityHit = tempEntity;
                        break; 
                    }
                }
            }
            // faz a graça
            // if (entityHit !== undefined) {
            //     const interaction = world.getComponent(entityHit, Interaction);
            //     if (interaction) {
            //         interaction.isHovered = true;
            //     }
            //     const verlet = world.getComponent(entityHit, VerletNode);
            //     const input = world.getComponent(entityHit, Input);

            //     if (verlet && !verlet.isPinned && interaction.isHoverable) {
            //         // delta da mmovimentaçao do mouse
            //         const moveX = input.mouse.deltaX || 0;
            //         const moveY = input.mouse.deltaY || 0;

            //         // console.log(moveY, moveX)

            //         if (Math.abs(moveX) > 0 || Math.abs(moveY) > 0) {
                        
            //             const pushMultiplier = 0.001; 
            //             verlet.position.x += moveX * pushMultiplier;
            //             verlet.position.y -= moveY * pushMultiplier; 
            //         }
            //     }
            // }
        }
        
        
    }
}