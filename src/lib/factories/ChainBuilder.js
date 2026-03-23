import * as THREE from "three";
import { Input } from "../components/Input";
import { Interaction } from "../components/Interaction";
import { ThreeView } from "../components/ThreeView";
import { VerletNode } from "../components/VerletNode";
import { Constraint } from "../components/Constraint";
import { Gravity } from "../components/Gravity";

export class ChainBuilder {
    constructor(world, scene, assets) {
        this.world = world;
        this.scene = scene;
        this.assets = assets;
    }


    #createVisualSet(fullName, backName, frontName, baseHeight) {
        const matOptions = { transparent: true, side: THREE.DoubleSide, depthWrite: false, alphaTest: 0.5 };

        const texFull = this.assets.getTexture(fullName);
        const texBack = this.assets.getTexture(backName);
        const texFront = this.assets.getTexture(frontName);

        [texFull, texBack, texFront].forEach(tex => {
            tex.minFilter = THREE.NearestFilter;
            tex.magFilter = THREE.NearestFilter;
            tex.premultiplyAlpha = true;
        });

        const geoFull = new THREE.PlaneGeometry(baseHeight * (texFull.image.width / texFull.image.height), baseHeight);
        const geoEven = new THREE.PlaneGeometry(baseHeight * (texFront.image.width / texFront.image.height), baseHeight);

        return {
            odd: { 
                geometry: geoFull, 
                material: new THREE.MeshBasicMaterial({ map: texFull, ...matOptions }) 
            },
            even: { 
                geometry: geoEven, 
                matBack: new THREE.MeshBasicMaterial({ map: texBack, ...matOptions }), 
                matFront: new THREE.MeshBasicMaterial({ map: texFront, ...matOptions }) 
            }
        };
    }

    #createLinkMesh(isOdd, oddOptions, evenOptions, scale) {
        let linkVisual;

        if (isOdd) {
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

        linkVisual.scale.set(scale, scale, scale);
        this.scene.add(linkVisual);

        return linkVisual;
    }

    #createLinkEntity(isOdd, spawnPos, isPinned, chainConfig, interaction, linkVisual) {
        const entity = this.world.createEntity();

        const node = new VerletNode(spawnPos.x, spawnPos.y, spawnPos.z, isPinned);
        this.world.addComponent(entity, node);
        this.world.addComponent(entity, new Gravity(chainConfig.gravity));

        const view = new ThreeView(linkVisual);
        view.isOdd = isOdd; 
        this.world.addComponent(entity, view);
        
        this.world.addComponent(entity, new Input());
        this.world.addComponent(entity, new Interaction(interaction));

        return { entity, node };
    }


    build(configs) {
        const {
            baseHeight = 1,
            chainConfig = {},
            interaction = {}
        } = configs;


        const setNormal = this.#createVisualSet("chainLinkOddFull", "chainLinkOddBack", "chainLinkOddFront", baseHeight);
        const setLinkVariation = this.#createVisualSet("chainLinkEvenFull", "chainLinkEvenBack", "chainLinkEvenFront", baseHeight);
        
        const oddOptions = [setNormal.odd];
        const evenOptions = [setLinkVariation.even];


        const totalDistance = chainConfig.startPos.distanceTo(chainConfig.endPos);
        const linkDistance = totalDistance / chainConfig.numLinks;

        let previousEntity = null;
        let previousNode = null;
        


        for (let i = 0; i < chainConfig.numLinks; i++) {
            const isOdd = (i % 2 !== 0);
            const spawnPercent = i / chainConfig.numLinks;
            const spawnPos = new THREE.Vector3().lerpVectors(chainConfig.startPos, chainConfig.endPos, spawnPercent);
            const isPinned = (i === 0 || i === chainConfig.numLinks - 1);

            const linkVisual = this.#createLinkMesh(isOdd, oddOptions, evenOptions, chainConfig.scale);

            const current = this.#createLinkEntity(isOdd, spawnPos, isPinned, chainConfig, interaction, linkVisual);

            if (previousEntity !== null) {
                const constraintEntity = this.world.createEntity();
                this.world.addComponent(constraintEntity, new Constraint(previousEntity, current.entity, linkDistance));
                previousNode.nextNode = current.node;
            }

            previousEntity = current.entity;
            previousNode = current.node;
        }
    }
}