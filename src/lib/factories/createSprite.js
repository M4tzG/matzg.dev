import * as THREE from "three";

import { Transform } from "../components/Transform";
import { Mesh2D } from "../components/Mesh2D";
import { ThreeView } from "../components/ThreeView";
import { Interaction } from "../components/Interaction";
import { Input } from "../components/Input";
import { Transition } from "../components/Transition";


export function createSprite(world, scene, assets, configs) {
    const {
        imageName,
        baseHeight = 1,
        transform = {},
        interaction = {},
        transition = {
                velocity: 2, 
                acceleration: 1.03, 
                direction: { x: (Math.random() - 0.5), y: -1 }
            },
    } = configs;
    
    const texture = assets.getTexture(imageName);

    if (!texture) {
        console.error(`createSprite: "${imageName}" not found`);
        return null;
    }

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

    world.addComponent(entity, new Transition(transition));
    world.addComponent(entity, new Input()); 
    world.addComponent(entity, new Transform(transform)); 
    world.addComponent(entity, new Interaction(interaction));
    world.addComponent(entity, new Mesh2D(finalWidth, finalHeight)); 
    world.addComponent(entity, new ThreeView(sprite)); 

    return entity;
}