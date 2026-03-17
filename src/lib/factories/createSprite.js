import * as THREE from "three";

import { Transform } from "../components/Transform";
import { Mesh2D } from "../components/Mesh2D";
import { ThreeView } from "../components/ThreeView";
import { MouseInteraction } from "../components/MouseInteraction";
import { Input } from "../components/Input";


export function createSprite(world, scene, assets, configs) {
    const {
        imageName,
        x,
        y,
        z,
        baseHeight = 1,
        interaction = {}
    } = configs;

    
    const texture = assets.getTexture(imageName);
    texture.premultiplyAlpha = true;


    const imageWidth = texture.image.width;
    const imageHeight = texture.image.height;
    const aspectRatio = imageWidth / imageHeight;

    const finalHeight = baseHeight;
    const finalWidth = baseHeight * aspectRatio;
    // console.log(finalWidth, finalHeight);


    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, alphaTest: 0.5 });
    const sprite = new THREE.Sprite(material);

    scene.add(sprite);



//  ==-=-=-=-=-== ECS ==-=-=-=-=-==
    const entity = world.createEntity();

    world.addComponent(entity, new Input()); 
    world.addComponent(entity, new Transform(x, y, z)); 
    world.addComponent(entity, new MouseInteraction(interaction));
    world.addComponent(entity, new Mesh2D(finalWidth, finalHeight)); 
    world.addComponent(entity, new ThreeView(sprite)); 

    return entity;
}