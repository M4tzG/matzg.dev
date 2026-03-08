import * as THREE from "three";

import { Transform } from "../components/Transform";
import { Mesh2D } from "../components/Mesh2D";
import { ThreeView } from "../components/ThreeView";
import { MouseInteraction } from "../components/MouseInteraction";
import { Input } from "../components/Input";
import { SpriteAnimation } from "../components/SpriteAnimation"; // O componente novo!

export function createAnimatedSprite(world, scene, assets, imageName, x, y, z, animConfig, baseHeight = 1) {


    const originalTexture = assets.get(imageName);
    const texture = originalTexture.clone();
    texture.needsUpdate = true;
    texture.premultiplyAlpha = true;

    // janla
    texture.repeat.set(1 / animConfig.columns, 1 / animConfig.rows);

    
    const frameWidth = texture.image.width / animConfig.columns;
    const frameHeight = texture.image.height / animConfig.rows;
    const aspectRatio = frameWidth / frameHeight;

    const finalHeight = baseHeight;
    const finalWidth = baseHeight * aspectRatio;



    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(material);
    scene.add(sprite);
    
    // console.log(sprite)

    const entity = world.createEntity();

    world.addComponent(entity, new Input()); 
    world.addComponent(entity, new Transform(x, y, z)); 
    world.addComponent(entity, new MouseInteraction({isParallaxed: true, parallaxFactor: -1}));
    world.addComponent(entity, new Mesh2D(finalWidth, finalHeight)); 
    world.addComponent(entity, new ThreeView(sprite)); 
    
    world.addComponent(entity, new SpriteAnimation(animConfig)); 

    return entity;
}