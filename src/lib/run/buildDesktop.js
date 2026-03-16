import { createSprite } from "../factories/createSprite";
import { createPostProcessing } from "../factories/createPostProcessing";
import { createAnimatedSprite } from "../factories/createAnimatedSprite";
import { createChain } from "../factories/createChain";

import * as THREE from "three";

export function setupHomeScene(world, scene, assets) {

    createPostProcessing(world, {
        pincushion: { 
            active: true, 
            strength: -0.7
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
    createSprite(world, scene, assets, "Raposo", 0, 0, 0, 11, {
        interaction: {
            isParallaxed: true,
            isHoverable: false,
            isDraggable: false,
            parallaxFactor: 1,
        }
    });

    createChain(world, scene, assets, {
        chainConfig: {
            
            startPos: new THREE.Vector3(3, 10, -5),
            endPos: new THREE.Vector3(25, -12, 0),
            numLinks : 22,
            scale: 2.9
        },
        interaction: {
            isParallaxed: false,
            isHoverable: true,
            isDraggable: false,
            parallaxFactor: -1,
        }
    });

    createChain(world, scene, assets, {
        chainConfig: {
            
            startPos: new THREE.Vector3(8, 10, -5),
            endPos: new THREE.Vector3(28, -9, 0),
            numLinks : 14,
            scale: 4
        },
        interaction: {
            isParallaxed: false,
            isHoverable: true,
            isDraggable: true,
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


    createSprite(world, scene, assets, "witImage", 0, 0, 0, 11, {
        interaction: {
            isParallaxed: true,
            isHoverable: false,
            isDraggable: false,
            parallaxFactor: 1,
        }
    });
    

    // createAnimatedSprite(world, scene, assets, "witSpriteSheet", 0, 0, 0, 8, {
    //     animation: {
    //         columns: 2,
    //         rows: 4,
    //         totalFrames: 8,
    //         fps: 4
    //     },
    //     interaction: {
    //         isParallaxed: false,
    //     }
    // });
}