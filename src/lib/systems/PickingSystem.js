import { System } from "../ecs/System";
import { Query } from "../ecs/Query";
import { MouseInteraction } from "../components/MouseInteraction";  
import { Input } from "../components/Input";
import { ThreeView } from "../components/ThreeView";
import { VerletNode } from "../components/VerletNode";
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

                // Pegamos o VerletNode do elo atingido!
                const verlet = world.getComponent(entityHit, VerletNode);
                const input = world.getComponent(entityHit, Input);

                if (verlet && !verlet.isPinned && interaction.isHoverable) {
                    // Pega a "velocidade" do mouse (o fallback || 0 evita o NaN)
                    const moveX = input.mouse.deltaX || 0;
                    const moveY = input.mouse.deltaY || 0;

                    // console.log(moveY, moveX)
                    // A sua sacada: Só entra aqui se o mouse estiver realmente em movimento
                    if (Math.abs(moveX) > 0 || Math.abs(moveY) > 0) {
                        
                        // O multiplicador calibra a força. Como o deltaX/Y costuma ser
                        // um número em pixels (ex: 10, 50), você precisa de um valor bem
                        // pequeno para não chutar a corrente para fora da tela.
                        const pushMultiplier = 0.003; 
                        
                        verlet.currentPosition.x += moveX * pushMultiplier;
                        
                        // Y invertido porque na tela descer é positivo, no Three.js descer é negativo
                        verlet.currentPosition.y -= moveY * pushMultiplier; 
                        
                        // Pode descomentar para ver a porrada acontecendo!
                        // console.log(`Empurrou com força: X=${moveX}, Y=${moveY}`);
                    }
                }
            }
        }
        
        
    }
}