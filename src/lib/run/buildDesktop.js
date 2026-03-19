import { createSprite } from "../factories/createSprite";
import { createPostProcessing } from "../factories/createPostProcessing";
import { createAnimatedSprite } from "../factories/createAnimatedSprite";
import { createChain } from "../factories/createChain";

import * as THREE from "three";


const v3 = (x, y, z) => new THREE.Vector3(x, y, z);


export function setupHomeDesktop(world, scene, assets) {

    createPostProcessing(world, {
        pincushion: { 
            active: true, 
            strength: -0.4
        }
    });

    
    createSprite(world, scene, assets, {
        imageName: "leftDots",
        transform: {
            px: -10,
            py: 3,
            pz: -5,
            
        },
        baseHeight: 15,
        interaction: {
            isParallaxed: true,
            isHoverable: false,
            parallaxFactor: -0.2,
            isDraggable: false
        }
    });
    createSprite(world, scene, assets, {
        imageName: "rightDots",
        transform: {
            px: -2,
            py: 0,
            pz: -5,
            
        },
        baseHeight: 26,
        interaction: {
            isParallaxed: true,
            isHoverable: false,
            parallaxFactor: -0.2,
            isDraggable: false
        }
    });

    createSprite(world, scene, assets, {
        imageName: "backgroundFlower",
        transform: {
            px: -7,
            py: 6,
            pz: 0,
        },

        baseHeight: 5,
        interaction: {
            isParallaxed: true,
            isHoverable: false,
            parallaxFactor: -0.2,
            isDraggable: false
        }
    });

    createSprite(world, scene, assets, {
        imageName: "backgroundX",
        transform: {
            px: -6,
            py: 2,
            pz: 0,
        },

        baseHeight: 18,
        interaction: {
            isParallaxed: true,
            isHoverable: false,
            parallaxFactor: -0.2,
            isDraggable: false
        }
    });

    createSprite(world, scene, assets, {
        imageName: "leftRect",
        transform: {
            px: -5.5,
            py: -0,
            pz: 0,
        },

        baseHeight: 9,
        interaction: {
            isParallaxed: true,
            isHoverable: false,
            parallaxFactor: 0.4,
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

        baseHeight: 9,
        interaction: {
            isParallaxed: true,
            isHoverable: false,
            parallaxFactor: 0.4,
            isDraggable: false
        }
    });

    createSprite(world, scene, assets, {
        imageName: "rightRect",
        transform: {
            px: 5.4,
            py: 0,
            pz: 0,
        },

        baseHeight: 9,
        interaction: {
            isParallaxed: true,
            isHoverable: false,
            parallaxFactor: 0.4,
            isDraggable: false
        }
    });



    createSprite(world, scene, assets, {
        imageName: "purpleBlueFlower",
        transform: {
            px: -10,
            py: -2,
            pz: 0,
            rz: 70
        },
        baseHeight: 4,
        interaction: {
            isParallaxed: true,
            isHoverable: false,
            isDraggable: false,
            parallaxFactor: -0.5,
        }
    });


    createSprite(world, scene, assets, {
        imageName: "pinkFlower",
        transform: {
            px: -1.5,
            py: 6,
            pz: 0,
        },
        baseHeight: 3,
        interaction: {
            isParallaxed: true,
            isHoverable: false,
            isDraggable: false,
            parallaxFactor: -0.5,
        }
    });


    createSprite(world, scene, assets, {
        imageName: "purpleBlueFlower",
        transform: {
            px: 9,
            py: 0,
            pz: 0,
            rz: -70
        },
        baseHeight: 4,
        interaction: {
            isParallaxed: true,
            isHoverable: false,
            isDraggable: false,
            parallaxFactor: -0.5,
        }
    });

    createSprite(world, scene, assets, {
        imageName: "Raposo",
        transform: {
            px: -1,
            py: 0.5,
            pz: 0,
        },
        baseHeight: 11,
        interaction: {
            isParallaxed: true,
            isHoverable: false,
            isDraggable: false,
            parallaxFactor: 1,
        }
    });





    createChain(world, scene, assets, {
        chainConfig: {
            startPos: v3(0, 0, -10),
            endPos: v3(-32, -13, 0),
            numLinks : 6,
            scale: 12,
            gravity: 0.5
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
            startPos: v3(3, 15, -5),
            endPos: v3(25, -12, 0),
            numLinks : 21,
            scale: 3.3,
            gravity: 1
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
            startPos: v3(8, 15, -5),
            endPos: v3(28, -9, 0),
            numLinks : 13,
            scale: 5,
            gravity: 1
        },
        interaction: {
            isParallaxed: false,
            isHoverable: true,
            isDraggable: false,
            parallaxFactor: -1,
        }
    });
}



export function setupProjectsDesktop(world, scene, assets) {
    createPostProcessing(world, {
        pincushion: { 
            active: true, 
            strength: -0.9 
        }
    });


    createSprite(world, scene, assets, {
        imageName: "witImage",
        transform: {
            px: -1,
            py: 0,
            pz: 0,
        },
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