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
        chainLinkFull: "chainLinkFull_variation",
        chainLinkBack: "chainLinkBack_link",
        chainLinkFront: "chainLinkFront_link",
        chainConfig: {
            
            startPos: new THREE.Vector3(3, 10, -5),
            endPos: new THREE.Vector3(25, -12, 0),
            numLinks : 24,
            scale: 2
        },
        interaction: {
            isParallaxed: false,
            isHoverable: false,
            isDraggable: false,
            parallaxFactor: -1,
        }
    });

    createChain(world, scene, assets, {
        chainLinkFull: "chainLinkFull",
        chainLinkBack: "chainLinkBack_link_variation",
        chainLinkFront: "chainLinkFront_link_variation",
        chainConfig: {
            
            startPos: new THREE.Vector3(9, 9, -5),
            endPos: new THREE.Vector3(28, -9, 0),
            numLinks : 14,
            scale: 3
        },
        interaction: {
            isParallaxed: false,
            isHoverable: false,
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