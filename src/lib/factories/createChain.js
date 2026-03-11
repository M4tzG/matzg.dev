import * as THREE from "three";
import { Input } from "../components/Input";
import { MouseInteraction } from "../components/MouseInteraction";
import { ThreeView } from "../components/ThreeView";
import { VerletNode } from "../components/VerletNode";
import { Constraint } from "../components/Constraint";

export function createChain (world, scene, assets, configs) {

    const {
        chainConfig = {},
        interaction = {}
    } = configs;

    
    const baseModel = assets.getModel('elo'); 
    
    let baseMesh = baseModel;
    baseModel.traverse((child) => {
        if (child.isMesh) baseMesh = child;
    });

    let previousEntity = null;
    let previousNode = null;

    // Distância matemática ideal entre um elo e outro (ajuste isso para eles se cruzarem certinho)
    const linkDistance = chainConfig.startPos.distanceTo(chainConfig.endPos) / chainConfig.numLinks; 

    // console.log(linkDistance)

    for (let i = 0; i < chainConfig.numLinks; i++) {


        const mesh = baseMesh.clone();
        mesh.scale.set(chainConfig.scale, chainConfig.scale, chainConfig.scale);

        scene.add(mesh);

        const entity = world.createEntity();

        const spawnPos = new THREE.Vector3().lerpVectors(chainConfig.startPos, chainConfig.endPos, i / chainConfig.numLinks);


        const isPinned = (i === 0 || i === chainConfig.numLinks - 1); // primeira e ultima
        const node = new VerletNode(spawnPos, isPinned);
        
        world.addComponent(entity, node);
        
        // impar para rotacionar
        const view = new ThreeView(mesh);
        view.isOdd = (i % 2 !== 0); 
        world.addComponent(entity, view);

        world.addComponent(entity, new Input());
        world.addComponent(entity, new MouseInteraction(interaction));

    
        if (previousEntity !== null) {
            const constraintEntity = world.createEntity();
            world.addComponent(constraintEntity, new Constraint(previousEntity, entity, linkDistance));
            previousNode.nextNode = node;
        }

        previousEntity = entity;
        previousNode = node;
    }
}