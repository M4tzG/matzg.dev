import * as THREE from "three";

const v3 = (x, y, z) => new THREE.Vector3(x, y, z);

export const mobileData = {
    postProcessing: {
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
    },
    sprites: [
        {
            imageName: "leftDots",
            transform: { px: -5, py: 3, pz: -5 },
            baseHeight: 15,
            interaction: { isMobile: true, isParallaxed: true, isHoverable: false, parallaxFactor: -0.2, isDraggable: false },
            transition: { velocity: 2, acceleration: 1.03, direction: { x: 0, y: -1 } },
        },
        {
            imageName: "rightDots",
            transform: { px: -4, py: 0, pz: -5 },
            baseHeight: 26,
            interaction: { isMobile: true, isParallaxed: true, isHoverable: false, parallaxFactor: -0.2, isDraggable: false },
            transition: { velocity: 2, acceleration: 1.03, direction: { x: 0, y: -1 } },
        },
        {
            imageName: "leftRect",
            transform: { px: -1.3, py: 0, pz: 0 },
            baseHeight: 6,
            interaction: { isMobile: true, isParallaxed: true, isHoverable: false, parallaxFactor: 0.4, isDraggable: false },
            transition: { velocity: 2, acceleration: 1.03, direction: { x: 0, y: -1 } },
        },
        {
            imageName: "backgroundX",
            transform: { px: -1, py: 2, pz: 0 },
            baseHeight: 12,
            interaction: { isMobile: true, isParallaxed: true, isHoverable: false, parallaxFactor: -0.2, isDraggable: false },
            transition: { velocity: 2, acceleration: 1.03, direction: { x: 0, y: -1 } },
        },
        {
            imageName: "middleRect",
            transform: { px: 2, py: -1.5, pz: 0 },
            baseHeight: 6,
            interaction: { isMobile: true, isParallaxed: true, isHoverable: false, parallaxFactor: 0.4, isDraggable: false },
            transition: { velocity: 2, acceleration: 1.03, direction: { x: 0, y: -1 } },
        },
        {
            imageName: "purpleBlueFlower",
            transform: { px: -2, py: -3, pz: 0, rz: 70 },
            baseHeight: 2.5,
            interaction: { isMobile: true, isParallaxed: true, isHoverable: false, isDraggable: false, parallaxFactor: -0.5 },
            transition: { velocity: 2, acceleration: 1.03, direction: { x: 0, y: -1 } },
        },
        {
            imageName: "pinkFlower",
            transform: { px: 1, py: 2, pz: 0 },
            baseHeight: 1,
            interaction: { isMobile: true, isParallaxed: true, isHoverable: false, isDraggable: false, parallaxFactor: -0.5 },
            transition: { velocity: 2, acceleration: 1.03, direction: { x: 0, y: -1 } },
        },
        {
            imageName: "purpleBlueFlower",
            transform: { px: 2, py: 0, pz: 0, rz: -70 },
            baseHeight: 2,
            interaction: { isMobile: true, isParallaxed: true, isHoverable: false, isDraggable: false, parallaxFactor: -0.5 },
            transition: { velocity: 2, acceleration: 1.03, direction: { x: 0, y: -1 } },
        },
        {
            isMobile: true,
            imageName: "Raposo",
            transform: { px: 0, py: -0.5, pz: 0 },
            baseHeight: 6,
            interaction: { isMobile: true, isParallaxed: true, isHoverable: false, isDraggable: false, parallaxFactor: 1 },
            transition: { velocity: 2, acceleration: 1.03, direction: { x: 0, y: -1 } },
        }
    ],
    animatedSprites: [],
    chains: [
        /* 
        {
            chainConfig: { startPos: v3(-2, 15, -5), endPos: v3(12, -12, 0), numLinks : 21, scale: 3.4, gravity: 0.5 },
            interaction: { isHoverable: true }
        }
        */
    ]
};