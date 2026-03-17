import { createSprite } from "../factories/createSprite";
import { createPostProcessing } from "../factories/createPostProcessing";
import { createAnimatedSprite } from "../factories/createAnimatedSprite";
import { createChain } from "../factories/createChain";

import * as THREE from "three";


const v3 = (x, y, z) => new THREE.Vector3(x, y, z);


export function setupHomeScene(world, scene, assets) {

    createPostProcessing(world, {
        pincushion: { 
            active: true, 
            strength: -0.7
        }
    });

    
    // createSprite(world, scene, assets, {
    //     imageName: "leftDots",
    //     x: 0,
    //     y: 0,
    //     z: 0,
    //     baseHeight: 9,
    //     interaction: {
    //         isParallaxed: true,
    //         isHoverable: false,
    //         parallaxFactor: -1,
    //         isDraggable: false
    //     }
    // });
    createSprite(world, scene, assets, {
        imageName: "backgroundX",
        transform: {
            px: 0,
            py: 0,
            pz: 0,
        },

        baseHeight: 10,
        interaction: {
            isParallaxed: false,
            isHoverable: false,
            parallaxFactor: -1,
            isDraggable: false
        }
    });

    // createSprite(world, scene, assets, {
    //     imageName: "Raposo",
    //     x: 0,
    //     y: 0,
    //     z: 0,
    //     baseHeight: 11,
    //     interaction: {
    //         isParallaxed: true,
    //         isHoverable: false,
    //         isDraggable: false,
    //         parallaxFactor: 1,
    //     }
    // });



    // createChain(world, scene, assets, {
    //     chainConfig: {
    //         startPos: v3(3, 10, -5),
    //         endPos: v3(25, -12, 0),
    //         numLinks : 22,
    //         scale: 2.9
    //     },
    //     interaction: {
    //         isParallaxed: false,
    //         isHoverable: false,
    //         isDraggable: false,
    //         parallaxFactor: -1,
    //     }
    // });

    // createChain(world, scene, assets, {
    //     chainConfig: {  
    //         startPos: v3(8, 10, -5),
    //         endPos: v3(28, -9, 0),
    //         numLinks : 14,
    //         scale: 4
    //     },
    //     interaction: {
    //         isParallaxed: false,
    //         isHoverable: false,
    //         isDraggable: false,
    //         parallaxFactor: -1,
    //     }
    // });
}



export function setupProjectsScene(world, scene, assets) {
    createPostProcessing(world, {
        pincushion: { 
            active: true, 
            strength: -0.9 
        }
    });


    createSprite(world, scene, assets, {
        imageName: "witImage",
        x: 0,
        y: 0,
        z: 0,
        baseHeight: 11,
        interaction: {
            isParallaxed: true,
            isHoverable: false,
            isDraggable: false,
            parallaxFactor: 1,
        }
    });
    

    // createAnimatedSprite(world, scene, assets, {
    //     imageName: "witSpriteSheet",
    //     x: 0,
    //     y: 0,
    //     z: 0,
    //     baseHeight: 11,
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