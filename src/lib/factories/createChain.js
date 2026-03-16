import * as THREE from "three";
import { Input } from "../components/Input";
import { MouseInteraction } from "../components/MouseInteraction";
import { ThreeView } from "../components/ThreeView";
import { VerletNode } from "../components/VerletNode";
import { Constraint } from "../components/Constraint";

export function createChain(world, scene, assets, configs) {
    const {
        chainConfig = {},
        interaction = {}
        // Retiramos os nomes de imagens daqui!
    } = configs;

    // --- 1. PREPARAÇÃO DAS OPÇÕES VISUAIS ---
    const baseHeight = 1;
    const matOptions = { transparent: true, side: THREE.DoubleSide, depthWrite: false, alphaTest: 0.5 };

    // Função que cria as geometrias e materiais para cada "conjunto" de texturas
    function createVisualSet(fullName, backName, frontName) {
        const texFull = assets.getTexture(fullName);
        const texBack = assets.getTexture(backName);
        const texFront = assets.getTexture(frontName);

        // Aplica as configurações do Pixel Art e Alpha em todas
        [texFull, texBack, texFront].forEach(tex => {
            tex.minFilter = THREE.NearestFilter;
            tex.magFilter = THREE.NearestFilter;
            tex.premultiplyAlpha = true;
        });

        // Calcula a geometria exata baseada no tamanho da imagem (para não esticar)
        const geoFull = new THREE.PlaneGeometry(baseHeight * (texFull.image.width / texFull.image.height), baseHeight);
        const geoEven = new THREE.PlaneGeometry(baseHeight * (texFront.image.width / texFront.image.height), baseHeight);

        return {
            odd: { geometry: geoFull, material: new THREE.MeshBasicMaterial({ map: texFull, ...matOptions }) },
            even: { 
                geometry: geoEven, 
                matBack: new THREE.MeshBasicMaterial({ map: texBack, ...matOptions }), 
                matFront: new THREE.MeshBasicMaterial({ map: texFront, ...matOptions }) 
            }
        };
    }

    const setNormal = createVisualSet("chainLinkOddFull", "chainLinkOddBack", "chainLinkOddFront");
    // const setVariation = createVisualSet("chainLinkFull_variation", "chainLinkBack_variation", "chainLinkFront_variation");

    // const setLink = createVisualSet("chainLinkFull_link", "chainLinkBack_link", "chainLinkFront_link");
    const setLinkVariation = createVisualSet("chainLinkEvenFull", "chainLinkEvenBack", "chainLinkEvenFront");

    
    const oddOptions = [setNormal.odd];
    const evenOptions = [setLinkVariation.even];

    // --- 2. CRIAÇÃO DA CORRENTE ---
    let previousEntity = null;
    let previousNode = null;
    const linkDistance = chainConfig.startPos.distanceTo(chainConfig.endPos) / chainConfig.numLinks; 
    const gap = 0.001;

    for (let i = 0; i < chainConfig.numLinks; i++) {
        let linkVisual;

        if (i % 2 !== 0) {
            // ÍMPAR: Sorteia uma das opções Ímpares
            const choice = oddOptions[Math.floor(Math.random() * oddOptions.length)];
            linkVisual = new THREE.Mesh(choice.geometry, choice.material);
            linkVisual.renderOrder = 2; 
        } else {
            // PAR: Sorteia uma das opções Pares (Sanduíche)
            const choice = evenOptions[Math.floor(Math.random() * evenOptions.length)];
            linkVisual = new THREE.Group(); 

            const meshBack = new THREE.Mesh(choice.geometry, choice.matBack);
            meshBack.renderOrder = 1;
            meshBack.position.z = -gap; 
            
            const meshFront = new THREE.Mesh(choice.geometry, choice.matFront);
            meshFront.renderOrder = 3;
            meshFront.position.z = gap; 

            linkVisual.add(meshBack);
            linkVisual.add(meshFront);
        }

        linkVisual.scale.set(chainConfig.scale, chainConfig.scale, chainConfig.scale);
        scene.add(linkVisual);

        // --- 3. ECS E VERLET (Tudo igual) ---
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