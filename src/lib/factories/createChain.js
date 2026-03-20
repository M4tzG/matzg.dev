import * as THREE from "three";
import { Input } from "../components/Input";
import { Interaction } from "../components/Interaction";
import { ThreeView } from "../components/ThreeView";
import { VerletNode } from "../components/VerletNode";
import { Constraint } from "../components/Constraint";
import { Gravity } from "../components/Gravity";


export function createChain(world, scene, assets, configs) {
    // [=============================================================]
    // obs: a corrente funciona:
    //      - 1 elo inteiro;
    //      - 1 elo partido no meio, 2 imagens;
    //      do elo cortado: 
    //          um deles fica atras do elo inteiro, e outro na frente. 
    //          ambos ana mesma posicao, assim ele se "movimentA" sem ficar completamente 
    //          em cima ou em baixo do proximo ou anterior.
    // [=============================================================]      

    const {
        baseHeight = 1, // bom deixar em 1 
        chainConfig = {},
        interaction = {}
    } = configs;


    // ==================================================================================
    function createVisualSet(fullName, backName, frontName) {
        // retorna a geometria da parada, PlaneGeometry, de cada elo, nao eh possivel fazer com sprite
        // pois o sprite sempre olha para a camera. 

        const matOptions = { transparent: true, side: THREE.DoubleSide, depthWrite: false, alphaTest: 0.5 };

        const texFull = assets.getTexture(fullName);
        const texBack = assets.getTexture(backName);
        const texFront = assets.getTexture(frontName);

        // p nao ficar uma linha esquisita no meio da textura de quem ta em 2
        [texFull, texBack, texFront].forEach(tex => {
            tex.minFilter = THREE.NearestFilter;
            tex.magFilter = THREE.NearestFilter;
            tex.premultiplyAlpha = true;
        });

        // new THREE.PlaneGeometry(width, height) 
        // obs: width calculado pelo aspectRatio
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
    // ==================================================================================


    const setNormal = createVisualSet("chainLinkOddFull", "chainLinkOddBack", "chainLinkOddFront");
    const setLinkVariation = createVisualSet("chainLinkEvenFull", "chainLinkEvenBack", "chainLinkEvenFront");
    // const setVariation = createVisualSet("chainLinkFull_variation", "chainLinkBack_variation", "chainLinkFront_variation");
    // const setLink = createVisualSet("chainLinkFull_link", "chainLinkBack_link", "chainLinkFront_link");
    

    // sorteio para caso tenha variacoes, q nao vai ta tendo por hora
    const oddOptions = [setNormal.odd];
    const evenOptions = [setLinkVariation.even];


    let previousEntity = null;
    let previousNode = null;
    
    const totalDistance = chainConfig.startPos.distanceTo(chainConfig.endPos);
    const linkDistance = totalDistance / chainConfig.numLinks;

    // =========================================
    // adiciona separado cada elo da corrente
    for (let i = 0; i < chainConfig.numLinks; i++) {
        let linkVisual;

        if (i % 2 !== 0) {
            const choice = oddOptions[Math.floor(Math.random() * oddOptions.length)];
            linkVisual = new THREE.Mesh(choice.geometry, choice.material);
            linkVisual.renderOrder = 2; 


        } else {
            const choice = evenOptions[Math.floor(Math.random() * evenOptions.length)];
            linkVisual = new THREE.Group(); 


            const meshBack = new THREE.Mesh(choice.geometry, choice.matBack);
            meshBack.renderOrder = 1;
            
            const meshFront = new THREE.Mesh(choice.geometry, choice.matFront);
            meshFront.renderOrder = 3;


            linkVisual.add(meshBack);
            linkVisual.add(meshFront);
        }

        linkVisual.scale.set(chainConfig.scale, chainConfig.scale, chainConfig.scale);
        scene.add(linkVisual);


        
//      ==-=-=-=-=-== ECS ==-=-=-=-=-==
        const entity = world.createEntity();

        const spawnPercent = i / chainConfig.numLinks;
        const spawnPos = new THREE.Vector3().lerpVectors(chainConfig.startPos, chainConfig.endPos, spawnPercent);
        const isPinned = (i === 0 || i === chainConfig.numLinks - 1);

        const node = new VerletNode(spawnPos.x, spawnPos.y, spawnPos.z, isPinned);
        world.addComponent(entity, node);

        world.addComponent(entity, new Gravity(chainConfig.gravity));


        const view = new ThreeView(linkVisual);
        view.isOdd = (i % 2 !== 0); 
        world.addComponent(entity, view);

        
        world.addComponent(entity, new Input());
        world.addComponent(entity, new Interaction(interaction));

        if (previousEntity !== null) {
            const constraintEntity = world.createEntity();
            world.addComponent(constraintEntity, new Constraint(previousEntity, entity, linkDistance));
            previousNode.nextNode = node;
        }

        previousEntity = entity;
        previousNode = node;
    }
}