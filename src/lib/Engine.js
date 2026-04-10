import * as THREE from "three"

import {
    InputSystem,
    EffectSystem,
    AnimationSystem,
    PickingSystem,
    ChainRenderSystem,
    VerletPhysicsSystem,
    ConstraintSystem,
    RenderSystem,
    PostProcessingSystem,
    CameraSystem
} from "./systems/index";

import { World } from "./ecs/World";
import { runScene } from "./run/runScene";
import { loadAssets } from "./run/loadAssets";
import { showNoWebGLFallback } from "./ui/fallbacks";


/**
 * WebGLRenderer:
 * @typedef {Object} RendererOptions
 * @property {boolean} [antialias] 
 * @property {'high-performance' | 'low-power' | 'default'} [powerPreference]
 * @property {boolean} [shadows] 
 * @property {number} [clearColor] 
 * @property {number} [clearAlpha]
 * @property {number} [pixelRatio] 
 */

/**
 * Config Engine
 * @typedef {Object} EngineCoreOptions
 * @property {number} [maxDeltaTime]
 */

/**
 * Inicializacao Engine
 * @typedef {Object} EngineOptions
 * @property {Object} [device] 
 * @property {boolean} [device.isMobile] 
 * @property {RendererOptions} [renderer]
 * @property {EngineCoreOptions} [engine]
 */

export default class Engine {
    // ----------------
    /**
     * @param {HTMLCanvasElement} canvas 
     * @param {EngineOptions} [options={}] - Configuracoes opcionais
     */
    // ----------------
    constructor (canvas, options = {}) {
        this.canvas = canvas;
        this.webGL = this.checkWebGLSupport();

    // ----------------

        this.config = {
            device: {
                isMobile: options.device?.isMobile,
            },
            renderer: {
                antialias: options.renderer?.antialias ?? !(options.device?.isMobile ?? false),
                powerPreference: options.renderer?.powerPreference ?? 'high-performance',
                shadows: options.renderer?.shadows ?? true,
                clearColor: options.renderer?.clearColor ?? 0x000000,
                clearAlpha: options.renderer?.clearAlpha ?? 0,
                pixelRatio: options.renderer?.pixelRatio ?? Math.min(window.devicePixelRatio, 2),
            },
            engine: {
                maxDeltaTime: options.engine?.maxDeltaTime ?? 0.5,
            }
        }

    // ----------------

        this.mainCamera = null;
        this.renderer = null;
        this.assets = null;
        this.currentScene = null;
        this.currentWorld = null;
        this.inputSystem = null;

        this.lastTime = 0;
        this.isRunning = false;
        this.animationFrameId = null;


        this.resizeHandler = this.onWindowResize.bind(this);
        this.visibilityHandler = this.onWindowChange.bind(this);
    }

// [=============================================================]
/**
 * @param {string[][]} assets 
 * @returns {Promise<void>}
 */
    async init(assets) {

        if (!this.webGL) {
            showNoWebGLFallback();
            return;
        }

        // ----------------
        try {
            this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            ...this.config.renderer
            });
        } catch (error) {
            console.error("Falha WebGLRenderer: ", error)
            showNoWebGLFallback();
            return;
        }

        // ----------------
        try {
            this.assets = await loadAssets(assets);
        } catch (error) {
            console.error("Erro em carregar os assets: ", error);
        }

// ----------------

        this.renderer.setSize(window.innerWidth, window.innerHeight, false);
        this.renderer.setPixelRatio(this.config.renderer.pixelRatio);
        this.renderer.shadowMap.enabled = this.config.renderer.shadows;

        this.renderer.setClearColor(this.config.renderer.clearColor, this.config.renderer.clearAlpha);

// ----------------

        // this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);   
        // this.camera.position.z = 10;  
        // this.camera.lookAt(0, 0, 0);

// ----------------       

        window.addEventListener("resize", this.resizeHandler);
        document.addEventListener("visibilitychange", this.visibilityHandler);

// ----------------

        this.isRunning = true;
        this.lastTime = performance.now();
        this.mainLoop();
    }

// [=============================================================]
    initScene(data) {
        if (this.currentScene) {
            this.currentScene.clear();
        }
        if (this.currentWorld) { // inputSystem -> windowListener acumula
            this.currentWorld.dispose();
            this.currentWorld = null; 
        }

// ----------------
        this.currentScene = new THREE.Scene();
        this.currentWorld = new World();
        this.inputSystem = new InputSystem();

// ----------------
        this.currentWorld.addSystem(this.inputSystem);
        this.currentWorld.addSystem(new EffectSystem());
        this.currentWorld.addSystem(new CameraSystem());

// ----------------
        const needsPicking = data.sprites?.some(s => s.interaction?.isHoverable || s.interaction?.isDraggable) || 
                             data.chains?.some(c => c.interaction?.isHoverable);
        if (needsPicking) {
             this.currentWorld.addSystem(new PickingSystem(this.currentScene));
        }

// ----------------
        if (data.animatedSprites && data.animatedSprites.length > 0) {
            this.currentWorld.addSystem(new AnimationSystem(this.renderer, this.currentScene));
        }

// ----------------
        if (data.chains && data.chains.length > 0) {
            this.currentWorld.addSystem(new VerletPhysicsSystem());
            this.currentWorld.addSystem(new ConstraintSystem());
            this.currentWorld.addSystem(new ChainRenderSystem());
        }

// ----------------
        this.currentWorld.addSystem(new RenderSystem(this.renderer, this.currentScene));

// ----------------
        if (data.postProcessing) {
             this.currentWorld.addSystem(new PostProcessingSystem(this.renderer, this.currentScene, this.camera));
        }

// ----------------
        if (data) {
            runScene(this.currentWorld, this.currentScene, this.assets, data);
        }
    }

// [=============================================================]
    mainLoop = () => {
        if (!this.isRunning) return;

// ----------------
        const now = performance.now();
        let deltaTime = (now - this.lastTime) / 1000;
        deltaTime = Math.min(deltaTime, this.config.engine.maxDeltaTime);

        this.lastTime = now;

// ----------------
        if (this.currentWorld) {
            this.currentWorld.update(deltaTime);
        }

// ----------------
        this.animationFrameId = requestAnimationFrame(this.mainLoop);
    }

// [=============================================================]
    enableGyroscope() {
        if (this.inputSystem && this.inputSystem.startDeviceOrientation) {
            this.inputSystem.startDeviceOrientation();
        }
    }

// [=============================================================]
    onWindowResize(){

    if (this.currentWorld && this.currentWorld.mainCamera) {
        const cam = this.currentWorld.mainCamera;
        if (cam.isPerspectiveCamera) { 
            cam.aspect = window.innerWidth / window.innerHeight;
            cam.updateProjectionMatrix();
        }
    }
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
}

    onWindowChange(){
        console.log("visibility change");
        if (document.hidden) {
            this.isRunning = false;
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
        } else {
            this.lastTime = performance.now(); 
            if (!this.isRunning) {
                this.isRunning = true;
                this.mainLoop();
            }
        }
    }
// [=============================================================]
    sleep() {
        this.isRunning = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    wake() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastTime = performance.now();
            this.mainLoop();
        }
    }


// [=============================================================]
    dispose() {

        if (this.currentWorld) {
            this.currentWorld.dispose();
        }

        if (this.currentScene) {
            this.currentScene.clear();
        }

        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }

        if (this.renderer) {
            this.renderer.dispose();
        }

        this.isRunning = false;
        window.removeEventListener("resize", this.resizeHandler);
        document.removeEventListener("visibilitychange", this.visibilityHandler);
    }

// [=============================================================]
// check webGL support
    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && 
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }



}