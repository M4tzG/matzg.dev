import * as THREE from "three"

import { Transition } from "./components/Transition";
import { World } from "./ecs/World";
import { RenderSystem } from "./systems/RenderSystem";
import { PostProcessingSystem } from "./systems/PostProcessingSystem";
import { runScene } from "./run/runScene";
import { loadAssets } from "./run/loadAssets";
import { InputSystem } from "./systems/InputSystem";
import { AnimationSystem } from "./systems/AnimationSystem";
import { EffectSystem } from "./systems/EffectSystem";
import { PickingSystem } from "./systems/PickingSystem";
import { ChainRenderSystem } from "./systems/ChainRenderSystem";
import { VerletPhysicsSystem } from "./systems/VerletPhysicsSystem";
import { ConstraintSystem } from "./systems/ConstraintsSystem";
import { TransitionSystem } from "./systems/TransitionSystem";


export default class Engine {
    constructor (canvas, isMobile = false, webGL = false) {
        
        this.webGL = webGL;
        this.isMobile = isMobile;

        this.canvas = canvas;

        this.camera = null;
        this.renderer = null;

        this.assets = null;
        this.currentScene = null;
        this.currentWorld = null;

        this.inputSystem = null;

        this.lastTime = 0;
        this.isRunning = false;
        this.animationFrameId = null;


        this.resizeHandler = () => this.onWindowResize();
    }

// [=============================================================]

    async init(assets) {

        if (!this.webGL) {
            this.showNoWebGLFallback();
            return;
        }

        this.assets = await loadAssets(assets);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: !this.isMobile,
            powerPreference: 'high-performance'

        });

// ----------------

        this.renderer.setSize(window.innerWidth, window.innerHeight, false);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;

        this.renderer.setClearColor(0x000000, 0);

// ----------------

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 10;  
        this.camera.lookAt(0, 0, 0);

// ----------------       

        window.addEventListener("resize", this.resizeHandler);
        

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                this.isRunning = false;
                // Cancela o loop pendente para não acumular quando voltar
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
        });

// ----------------

        
        this.isRunning = true;
        this.lastTime = performance.now();
        this.mainLoop();

        
    }

// [=============================================================]

    mainLoop = () => {
        if (!this.isRunning) return;

        const now = performance.now();
        let deltaTime = (now - this.lastTime) / 1000;
        // p n quebrar e acumular um delta gigantesdco de um avez so
        deltaTime = Math.min(deltaTime, 0.5);

        this.lastTime = now;

        if (this.currentWorld) {
            this.currentWorld.update(deltaTime);
        }
        // console.log("askjkjad")
        this.animationFrameId = requestAnimationFrame(this.mainLoop);
    }

// [=============================================================]

    initScene(data) {

        // const sceneSetups = {
        //     '/': this.isMobile ? setupHomeMobile : setupHomeDesktop,
        // };

        if (this.currentScene) {
            this.currentScene.clear();
        }
        if (this.currentWorld) {
            // inputSystem -> windowListener acumula
            this.currentWorld.dispose();
            this.currentWorld = null; 
        }

        this.currentScene = new THREE.Scene();
        this.currentWorld = new World();
        this.inputSystem = new InputSystem();


        this.currentWorld.addSystem(this.inputSystem);
        this.currentWorld.addSystem(new EffectSystem());
        this.currentWorld.addSystem(new PickingSystem(this.currentScene, this.camera));
        this.currentWorld.addSystem(new AnimationSystem(this.renderer, this.currentScene, this.camera));
        this.currentWorld.addSystem(new VerletPhysicsSystem());
        this.currentWorld.addSystem(new ConstraintSystem());
        this.currentWorld.addSystem(new TransitionSystem());
        this.currentWorld.addSystem(new ChainRenderSystem());
        this.currentWorld.addSystem(new RenderSystem(this.renderer, this.currentScene, this.camera));
        this.currentWorld.addSystem(new PostProcessingSystem(this.renderer, this.currentScene, this.camera));

        // const setupFunction = sceneSetups[sceneName];

        if (data) {
            runScene(this.currentWorld, this.currentScene, this.assets, data);
        }
    }

    triggerTransition(timer = 2000) {
        return new Promise((resolve) => {
            if (!this.currentWorld) {
                resolve();
                return;
            }

            const entities = this.currentWorld.entities; 
            let duration = timer; 

            entities.forEach(entity => {
                if (this.currentWorld.hasComponent(entity, Transition)) {
                    const transition = this.currentWorld.getComponent(entity, Transition);
                    transition.isActive = true;
                }
            });
            setTimeout(() => {
                resolve();
            }, duration);
        });
    }

    enableGyroscope() {
        if (this.inputSystem && this.inputSystem.startDeviceOrientation) {
            this.inputSystem.startDeviceOrientation();
        }
    }

// [=============================================================]

    onWindowResize(){

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight, false);


        // let lastIsMobile = window.innerWidth <= 768

        // if(this.isMobile !== lastIsMobile){
        //     location.reload();
        // }

        // lastIsMobile = this.isMobile;
        
    }

// [=============================================================]
    // falbavk caaso n tenha webGL...
    showNoWebGLFallback() {

        const warningDiv = document.createElement('div');
        warningDiv.style.cssText = `
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            background-color: #111; color: white; font-family: sans-serif; text-align: center;
            padding: 20px; box-sizing: border-box; z-index: 9999;
        `;
        warningDiv.innerHTML = `
            <h2>Ops! Seu navegador não suporta WebGL 😢</h2>
            <p>Para visualizar as animações interativas, por favor, ative a aceleração de hardware ou tente outro navegador.</p>
        `;
        
        document.body.appendChild(warningDiv);
    }

    sleep() {
        this.isRunning = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        if (this.currentScene) {
            this.currentScene.clear();
        }
    }

    wake() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastTime = performance.now();
            this.mainLoop();
        }
    }

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
    }
}