import * as THREE from "three";
import { Input } from "../components/Input";
import { Interaction } from "../components/Interaction";
import { ThreeView } from "../components/ThreeView";
import { VerletNode } from "../components/VerletNode";
import { Constraint } from "../components/Constraint";
import { Gravity } from "../components/Gravity";
import { Transform } from "../components/Transform";


const visualCacheOdd = new Map();
const visualCacheEven = new Map();

function getOddVisualSet(assets, baseHeight) {
    const cacheKey = `keychainLinkOdd_${baseHeight}`;
    
    if (visualCacheOdd.has(cacheKey)) {
        return visualCacheOdd.get(cacheKey);
    }

    const matOptions = { 
        transparent: true, 
        side: THREE.DoubleSide, 
        depthWrite: false, 
        alphaTest: 0.5 
    };

    const texFull = assets.getTexture("chainLinkOddFull");
    texFull.minFilter = THREE.NearestFilter;
    texFull.magFilter = THREE.NearestFilter;
    texFull.premultiplyAlpha = true;

    const geoFull = new THREE.PlaneGeometry(
        baseHeight * (texFull.image.width / texFull.image.height), 
        baseHeight
    );

    const visualSet = { 
        geometry: geoFull, 
        material: new THREE.MeshBasicMaterial({ map: texFull, ...matOptions }) 
    };

    visualCacheOdd.set(cacheKey, visualSet);
    return visualSet;
}

function getEvenVisualSet(assets, baseHeight) {
    const cacheKey = `keychainLinkEven_${baseHeight}`;
    
    if (visualCacheEven.has(cacheKey)) {
        return visualCacheEven.get(cacheKey);
    }

    const matOptions = { 
        transparent: true, 
        side: THREE.DoubleSide, 
        depthWrite: false, 
        alphaTest: 0.5 
    };

    const texBack = assets.getTexture("chainLinkEvenBack");
    const texFront = assets.getTexture("chainLinkEvenFront");

    [texBack, texFront].forEach(tex => {
        tex.minFilter = THREE.NearestFilter;
        tex.magFilter = THREE.NearestFilter;
        tex.premultiplyAlpha = true;
    });

    const geoEven = new THREE.PlaneGeometry(
        baseHeight * (texFront.image.width / texFront.image.height), 
        baseHeight
    );

    const visualSet = { 
        geometry: geoEven, 
        matBack: new THREE.MeshBasicMaterial({ map: texBack, ...matOptions }), 
        matFront: new THREE.MeshBasicMaterial({ map: texFront, ...matOptions }) 
    };

    visualCacheEven.set(cacheKey, visualSet);
    return visualSet;
}

function createLinkMesh(isOdd, oddVisual, evenVisual, scale) {
    let linkVisual;

    if (isOdd) {
        linkVisual = new THREE.Mesh(oddVisual.geometry, oddVisual.material);
        linkVisual.renderOrder = 2;
    } else {
        linkVisual = new THREE.Group();

        const meshBack = new THREE.Mesh(evenVisual.geometry, evenVisual.matBack);
        meshBack.renderOrder = 1;

        const meshFront = new THREE.Mesh(evenVisual.geometry, evenVisual.matFront);
        meshFront.renderOrder = 3;

        linkVisual.add(meshBack);
        linkVisual.add(meshFront);
    }

    linkVisual.scale.set(scale, scale, scale);
    return linkVisual;
}

export function createKeychain(world, scene, assets, configs) {
    const { 
        anchorPos, 
        linkDistance, 
        gravity, 
        scale,
        interaction = {},
    } = configs;

    const oddVisual  = getOddVisualSet(assets, scale);
    const evenVisual = getEvenVisualSet(assets, scale);

    // nó 0 — âncora (pinned)
    const anchorEntity = world.createEntity();
    world.addComponent(anchorEntity, new VerletNode(anchorPos.x, anchorPos.y, anchorPos.z, true));

    // nó 1 — elo do meio
    const linkVisual = createLinkMesh(true, oddVisual, evenVisual, scale);
    scene.add(linkVisual);

    const linkEntity = world.createEntity();
    world.addComponent(linkEntity, new VerletNode(anchorPos.x, anchorPos.y - linkDistance, anchorPos.z, false));
    world.addComponent(linkEntity, new Gravity(gravity));
    world.addComponent(linkEntity, new ThreeView(linkVisual));
    world.addComponent(linkEntity, new Input());
    world.addComponent(linkEntity, new Interaction(configs.interaction ?? {}));

    // nó 2 — charm
    const charmMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({ map: assets.getTexture("Raposo"), transparent: true })
    );
    scene.add(charmMesh);

    const charmEntity = world.createEntity();
    world.addComponent(charmEntity, new VerletNode(anchorPos.x, anchorPos.y - linkDistance * 2, anchorPos.z, false));
    world.addComponent(charmEntity, new Gravity(gravity));
    world.addComponent(charmEntity, new ThreeView(charmMesh)); // isCharm = true
    world.addComponent(charmEntity, new Input());
    world.addComponent(charmEntity, new Interaction(interaction));

    // constraints
    const c1 = world.createEntity();
    world.addComponent(c1, new Constraint(anchorEntity, linkEntity, linkDistance));

    const c2 = world.createEntity();
    world.addComponent(c2, new Constraint(linkEntity, charmEntity, linkDistance));

    // linked list pro ChainRenderSystem
    world.getComponent(anchorEntity, VerletNode).nextNode = world.getComponent(linkEntity,  VerletNode);
    world.getComponent(linkEntity,   VerletNode).nextNode = world.getComponent(charmEntity, VerletNode);
}