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

    
    createSprite(world, scene, assets, {
        imageName: "leftDots",
        transform: {
            px: -7,
            py: 3,
            pz: 0,
            
        },
        baseHeight: 15,
        interaction: {
            isParallaxed: false,
            isHoverable: false,
            parallaxFactor: -1,
            isDraggable: false
        }
    });

    createChain(world, scene, assets, {
        chainConfig: {
            startPos: v3(0, 0, -10),
            endPos: v3(-25, -13, 0),
            numLinks : 7,
            scale: 9,
        },
        interaction: {
            isParallaxed: false,
            isHoverable: false,
            isDraggable: false,
            parallaxFactor: -1,
        }
    });

    createSprite(world, scene, assets, {
        imageName: "backgroundFlower",
        transform: {
            px: -10,
            py: 6,
            pz: 0,
        },

        baseHeight: 5,
        interaction: {
            isParallaxed: false,
            isHoverable: false,
            parallaxFactor: -1,
            isDraggable: false
        }
    });

    createSprite(world, scene, assets, {
        imageName: "backgroundX",
        transform: {
            px: -7.5,
            py: 2,
            pz: 0,
        },

        baseHeight: 20,
        interaction: {
            isParallaxed: false,
            isHoverable: false,
            parallaxFactor: -1,
            isDraggable: false
        }
    });

    createSprite(world, scene, assets, {
        imageName: "leftRect",
        transform: {
            px: -6.5,
            py: -0,
            pz: 0,
        },

        baseHeight: 11,
        interaction: {
            isParallaxed: false,
            isHoverable: false,
            parallaxFactor: -1,
            isDraggable: false
        }
    });

    createSprite(world, scene, assets, {
        imageName: "middleRect",
        transform: {
            px: 0.2,
            py: 1.3,
            pz: 0,
        },

        baseHeight: 11,
        interaction: {
            isParallaxed: false,
            isHoverable: false,
            parallaxFactor: -1,
            isDraggable: false
        }
    });

    createSprite(world, scene, assets, {
        imageName: "rightRect",
        transform: {
            px: 5.4,
            py: -1,
            pz: 0,
        },

        baseHeight: 11,
        interaction: {
            isParallaxed: false,
            isHoverable: false,
            parallaxFactor: -1,
            isDraggable: false
        }
    });

    createSprite(world, scene, assets, {
        imageName: "Raposo",
        transform: {
            px: -3,
            py: 1.5,
            pz: 0,
        },
        baseHeight: 11,
        interaction: {
            isParallaxed: false,
            isHoverable: false,
            isDraggable: false,
            parallaxFactor: 1,
        }
    });



    createChain(world, scene, assets, {
        chainConfig: {
            startPos: v3(3, 15, -5),
            endPos: v3(25, -12, 0),
            numLinks : 22,
            scale: 3.3
        },
        interaction: {
            isParallaxed: false,
            isHoverable: false,
            isDraggable: false,
            parallaxFactor: -1,
        }
    });

    createChain(world, scene, assets, {
        chainConfig: {  
            startPos: v3(8, 15, -5),
            endPos: v3(28, -9, 0),
            numLinks : 14,
            scale: 5
        },
        interaction: {
            isParallaxed: false,
            isHoverable: false,
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