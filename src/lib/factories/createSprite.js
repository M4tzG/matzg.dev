import * as THREE from "three";

import { Transform } from "../components/Transform";
import { Mesh2D } from "../components/Mesh2D";
import { ThreeView } from "../components/ThreeView";

export function createSprite(world, scene, assets, imageName, x, y, z, baseHeight = 1) {

    const texture = assets.get(imageName);

    texture.premultiplyAlpha = true;

    const imageWidth = texture.image.width;
    const imageHeight = texture.image.height;
    const aspectRatio = imageWidth / imageHeight;


    const finalHeight = baseHeight;
    const finalWidth = baseHeight * aspectRatio;

    // console.log(finalWidth, finalHeight);

    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(material);
    scene.add(sprite);

    const entity = world.createEntity();

    world.addComponent(entity, new Transform(x, y, z)); 
    world.addComponent(entity, new Mesh2D(finalWidth, finalHeight)); 
    world.addComponent(entity, new ThreeView(sprite)); 

    return entity;
}