import { createSprite } from "../factories/createSprite";
import { createPostProcessing } from "../factories/createPostProcessing";
import { createAnimatedSprite } from "../factories/createAnimatedSprite";
import { createChain } from "../factories/createChain";
import { createKeychain } from "../factories/createKeychain";


import * as THREE from "three";

const v3 = (x, y, z) => new THREE.Vector3(x, y, z);

const HOME_SPRITES = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    }
]; 

const HOME_CHAINS = [
    {
        chainConfig: {
            startPos: v3(0, 0, -10),
            endPos: v3(-32, -13, 0),
            numLinks : 6,
            scale: 12,
            gravity: 0.5
        },
        interaction: {
            isHoverable: false,
        }
    },
    {
        chainConfig: {
            startPos: v3(2, 15, -5),
            endPos: v3(25, -12, 0),
            numLinks : 21,
            scale: 3.4,
            gravity: 2
        },
        interaction: {
            isHoverable: true,
        }
    },
    {
        chainConfig: {  
            startPos: v3(8, 15, -5),
            endPos: v3(28, -9, 0),
            numLinks : 13,
            scale: 5,
            gravity: 2
        },
        interaction: {
            isHoverable: true,
        }
    }
]

export function setupHomeDesktop(world, scene, assets) {

    createPostProcessing(world, {
        pincushion: { 
            active: true, 
            strength: -0.4
        },
        crt: {
            active: true,
            scanlineIntensity: 0.08,
            scanlineCount: 800.0,
            vignetteDarkness: 1.0,
            aberrationAmount: 0.003,
        }
    });

    // createKeychain(world, scene, assets, {
    //     anchorPos  : new THREE.Vector3(0, 0, 0),
    //     linkDistance: 1,
    //     gravity    : 2,
    //     scale      : 1,
    // });

    HOME_SPRITES.forEach(config => createSprite(world, scene, assets, config));
    HOME_CHAINS.forEach(config => createChain(world, scene, assets, config));

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
    
}