import * as THREE from "three";

import { Input } from "../components/Input";
import { MouseInteraction } from "../components/MouseInteraction";
import { ThreeView } from "../components/ThreeView";
import { VerletNode } from "../components/VerletNode";
import { Constraint } from "../components/Constraint";

export function createChain(world, scene, assets, startPos, endPos, numLinks, configs) {

    const baseMesh = assets.getModel('elo');


    // 1. Cria a geometria e o material (reutilizados para todos os elos por performance)
    // const geometry = baseMesh; 
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Ou o MeshToonMaterial!

    let previousEntity = null;

    for (let i = 0; i < numLinks; i++) {

        
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);

        scene.add(new THREE.AmbientLight(0xffffff, 0.5));



        const mesh = baseMesh.clone(true);
        mesh.traverse((child) => {
            if (child.isMesh) {
                 child.material.color.set(0xff0000);
                console.log("é um mesh", child);
            }
        });
        scene.add(mesh);

        const entity = world.createEntity();
        
        // Interpola a posição inicial (apenas para nascerem em linha reta)
        const x = startPos.x + ((endPos.x - startPos.x) * (i / (numLinks - 1)));
        const y = startPos.y + ((endPos.y - startPos.y) * (i / (numLinks - 1)));
        
        // Os Componentes do Elo!
        world.addComponent(entity, new Input()); 
        world.addComponent(entity, new MouseInteraction(configs.interaction)); 
        world.addComponent(entity, new ThreeView(mesh, i % 2 !== 0));
        
        // Aqui entra a física no lugar do Transform estático
        const isPinned = (i === 0 || i === numLinks - 1); // Prende as pontas
        world.addComponent(entity, new VerletNode(new THREE.Vector3(x, y, 0), isPinned)); 

        // Cria a restrição (Constraint) ligando este elo ao anterior
        if (previousEntity !== null) {
            const constraintEntity = world.createEntity();
            world.addComponent(constraintEntity, new Constraint(entity, previousEntity, 2.0)); // 2.0 é a distância ideal
        }

        previousEntity = entity;
    }
}