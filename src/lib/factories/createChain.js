import * as THREE from "three";
import { Input } from "../components/Input";
import { MouseInteraction } from "../components/MouseInteraction";
import { ThreeView } from "../components/ThreeView";
import { VerletNode } from "../components/VerletNode";
import { Constraint } from "../components/Constraint";

export function createChain(world, scene, assets, configs) {
    const {
        chainConfig = {},
        interaction = {},
        // Agora vamos pedir 3 nomes de imagens no config!
        chainLinkFull, 
        chainLinkBack,
        chainLinkFront
    } = configs;

    // 1. Pegando as 3 texturas
    const texFull = assets.getTexture(chainLinkFull);
    const texFront = assets.getTexture(chainLinkFront);
    const texBack = assets.getTexture(chainLinkBack);
    
    texFull.premultiplyAlpha = true;
    texFront.premultiplyAlpha = true;
    texBack.premultiplyAlpha = true;

    // 2. Calculando proporção (usando a inteira como base)
    const imageWidth = texFull.image.width;
    const imageHeight = texFull.image.height;
    const aspectRatio = imageWidth / imageHeight;
    const baseHeight = 1;
    const finalWidth = baseHeight * aspectRatio;

    // 3. Criando os 3 materiais (com alphaTest para o renderOrder funcionar bem com PNGs)
    const matOptions = { transparent: true, side: THREE.DoubleSide, depthWrite: false, alphaTest: 0.5 };
    const matFull = new THREE.MeshBasicMaterial({ map: texFull, ...matOptions });
    const matFront = new THREE.MeshBasicMaterial({ map: texFront, ...matOptions });
    const matBack = new THREE.MeshBasicMaterial({ map: texBack, ...matOptions });

    const geometry = new THREE.PlaneGeometry(finalWidth, baseHeight);

    let previousEntity = null;
    let previousNode = null;
    const linkDistance = chainConfig.startPos.distanceTo(chainConfig.endPos) / chainConfig.numLinks; 

    for (let i = 0; i < chainConfig.numLinks; i++) {
        let linkVisual; // Pode ser um Mesh ou um Group

        if (i % 2 !== 0) {
            // ÍMPAR: Elo Inteiro no meio do sanduíche
            linkVisual = new THREE.Mesh(geometry, matFull);
            linkVisual.renderOrder = 2; // Fica no "meio"
        } else {
            // PAR: O Sanduíche (Duas metades no mesmo lugar)
            linkVisual = new THREE.Group(); 
            
            const meshBack = new THREE.Mesh(geometry, matBack);
            meshBack.renderOrder = 1; // Fica atrás de tudo
            
            const meshFront = new THREE.Mesh(geometry, matFront);
            meshFront.renderOrder = 3; // Fica na frente de tudo

            linkVisual.add(meshBack);
            linkVisual.add(meshFront);
        }

        // Arrumando a escala como você pediu
        linkVisual.scale.set(chainConfig.scale, chainConfig.scale, chainConfig.scale);
        scene.add(linkVisual);

        // --- Resto da sua lógica do ECS / Verlet continua igual ---
        const entity = world.createEntity();
        const spawnPos = new THREE.Vector3().lerpVectors(chainConfig.startPos, chainConfig.endPos, i / chainConfig.numLinks);

        const isPinned = (i === 0 || i === chainConfig.numLinks - 1);
        const node = new VerletNode(spawnPos, isPinned);
        world.addComponent(entity, node);
        
        const view = new ThreeView(linkVisual);
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