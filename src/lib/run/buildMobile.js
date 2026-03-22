import { createSprite } from "../factories/createSprite";
import { createPostProcessing } from "../factories/createPostProcessing";
import { createAnimatedSprite } from "../factories/createAnimatedSprite";
import { ChainBuilder } from "../factories/ChainBuilder";

import * as THREE from "three";


const v3 = (x, y, z) => new THREE.Vector3(x, y, z);


export function setupHomeMobile(world, scene, assets) {

    createPostProcessing(world, {
        pincushion: { 
            active: true, 
            strength: -0.4
        }
    });

    
    createSprite(world, scene, assets, {
        imageName: "leftDots",
        transform: {
            px: -5,
            py: 3,
            pz: -5,
            
        },
        baseHeight: 15,
        interaction: {
            isMobile: true,
            isParallaxed: true,
            isHoverable: false,
            parallaxFactor: -0.2,
            isDraggable: false
        }
    });
    createSprite(world, scene, assets, {
        imageName: "rightDots",
        transform: {
            px: -4,
            py: 0,
            pz: -5,
            
        },
        baseHeight: 26,
        interaction: {
            isMobile: true,
            isParallaxed: true,
            isHoverable: false,
            parallaxFactor: -0.2,
            isDraggable: false
        }
    });

    // createSprite(world, scene, assets, {
    //     imageName: "backgroundFlower",
    //     transform: {
    //         px: -7,
    //         py: 6,
    //         pz: 0,
    //     },

    //     baseHeight: 5,
    //     interaction: {
    //         isParallaxed: true,
    //         isHoverable: false,
    //         parallaxFactor: -0.2,
    //         isDraggable: false
    //     }
    // });

    createSprite(world, scene, assets, {
        imageName: "backgroundX",
        transform: {
            px: -1,
            py: 2,
            pz: 0,
        },

        baseHeight: 12,
        interaction: {
            isMobile: true,
            isParallaxed: true,
            isHoverable: false,
            parallaxFactor: -0.2,
            isDraggable: false
        }
    });

    createSprite(world, scene, assets, {
        imageName: "leftRect",
        transform: {
            px: -1,
            py: 1,
            pz: 0,
        },

        baseHeight: 5,
        interaction: {
            isMobile: true,
            isParallaxed: true,
            isHoverable: false,
            parallaxFactor: 0.4,
            isDraggable: false
        }
    });

    createSprite(world, scene, assets, {
        imageName: "middleRect",
        transform: {
            px: 1.7,
            py: -1,
            pz: 0,
        },

        baseHeight: 5,
        interaction: {
            isMobile: true,
            isParallaxed: true,
            isHoverable: false,
            parallaxFactor: 0.4,
            isDraggable: false
        }
    });

    // createSprite(world, scene, assets, {
    //     imageName: "rightRect",
    //     transform: {
    //         px: 5.4,
    //         py: 0,
    //         pz: 0,
    //     },

    //     baseHeight: 9,
    //     interaction: {
    //         isParallaxed: true,
    //         isHoverable: false,
    //         parallaxFactor: 0.4,
    //         isDraggable: false
    //     }
    // });



    createSprite(world, scene, assets, {
        imageName: "purpleBlueFlower",
        transform: {
            px: -2,
            py: -2,
            pz: 0,
            rz: 70
        },
        baseHeight: 2.5,
        interaction: {
            isMobile: true,
            isParallaxed: true,
            isHoverable: false,
            isDraggable: false,
            parallaxFactor: -0.5,
        }
    });


    createSprite(world, scene, assets, {
        imageName: "pinkFlower",
        transform: {
            px: 1,
            py: 3,
            pz: 0,
        },
        baseHeight: 1,
        interaction: {
            isMobile: true,
            isParallaxed: true,
            isHoverable: false,
            isDraggable: false,
            parallaxFactor: -0.5,
        }
    });


    createSprite(world, scene, assets, {
        imageName: "purpleBlueFlower",
        transform: {
            px: 2,
            py: 1,
            pz: 0,
            rz: -70
        },
        baseHeight: 2,
        interaction: {
            isMobile: true,
            isParallaxed: true,
            isHoverable: false,
            isDraggable: false,
            parallaxFactor: -0.5,
        }
    });

    createSprite(world, scene, assets, {
        isMobile: true,
        imageName: "Raposo",
        transform: {
            px: 0,
            py: 1.5,
            pz: 0,
        },
        baseHeight: 6,
        interaction: {
            isMobile: true,
            isParallaxed: true,
            isHoverable: false,
            isDraggable: false,
            parallaxFactor: 1,
        }
    });





    // createChain(world, scene, assets, {
    //     chainConfig: {
    //         startPos: v3(0, 0, -10),
    //         endPos: v3(-32, -13, 0),
    //         numLinks : 6,
    //         scale: 12,
    //         gravity: 0.5
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
    //         startPos: v3(0, 15, -5),
    //         endPos: v3(10, -12, 0),
    //         numLinks : 30,
    //         scale: 2,
    //         gravity: 0.3
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
    //         startPos: v3(1, 15, -5),
    //         endPos: v3(10, -9, 0),
    //         numLinks : 25,
    //         scale: 2,
    //         gravity: 1
    //     },
    //     interaction: {
    //         isParallaxed: false,
    //         isHoverable: false,
    //         isDraggable: false,
    //         parallaxFactor: -1,
    //     }
    // });
}



export function setupProjectsMobile(world, scene, assets) {
    // createPostProcessing(world, {
    //     pincushion: { 
    //         active: true, 
    //         strength: -0.9 
    //     }
    // });


    createSprite(world, scene, assets, {
        imageName: "witImage",
        transform: {
            px: 0,
            py: 0,
            pz: 0,
        },
        baseHeight: 6,
        interaction: {
            isMobile: true,
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