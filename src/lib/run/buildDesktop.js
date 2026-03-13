import { createSprite } from "../factories/createSprite";
import { createPostProcessing } from "../factories/createPostProcessing";
import { createAnimatedSprite } from "../factories/createAnimatedSprite";
import { createChain } from "../factories/createChain";

import * as THREE from "three";

export function setupHomeScene(world, scene, assets) {

    createPostProcessing(world, {
        pincushion: { 
            active: true, 
            strength: -0.5
        }
    });
    createSprite(world, scene, assets, "dots", 0, 0, 0, 9, {
        interaction: {
            isParallaxed: true,
            isHoverable: false,
            parallaxFactor: -1,
            isDraggable: false
        }
    });
    createSprite(world, scene, assets, "Raposo", 0, 0, 0, 9, {
        interaction: {
            isParallaxed: true,
            isHoverable: false,
            isDraggable: false,
            parallaxFactor: 1,
        }
    });

    createChain(world, scene, assets, {
        chainConfig: {
            // startPos: new THREE.Vector3(3, 10, -2),
            // endPos: new THREE.Vector3(25, -12, -1),
            startPos: new THREE.Vector3(3, 10, -2),
            endPos: new THREE.Vector3(25, -12, -1),
            numLinks : 15,
            scale: 3
        },
        interaction: {
            isParallaxed: false,
            isHoverable: true,
            isDraggable: false,
            parallaxFactor: -1,
        }
    });
}



export function setupProjectsScene(world, scene, assets) {
    createPostProcessing(world, {
        pincushion: { 
            active: true, 
            strength: -0.9 
        }
    });
    

    createAnimatedSprite(world, scene, assets, "wit", 0, 0, 0, 8, {
        animation: {
            columns: 5,
            rows: 1,
            totalFrames: 5,
            fps: 10
        },
        interaction: {
            isParallaxed: true,
        }
    });
}