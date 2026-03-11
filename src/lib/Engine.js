import * as THREE from "three"

import { World } from "./ecs/World";
import { RenderSystem } from "./systems/RenderSystem";
import { PostProcessingSystem } from "./systems/PostProcessingSystem";
import { setupHomeScene, setupProjectsScene } from "./run/buildDesktop";
import { loadAssets } from "./run/loadAssets";
import { InputSystem } from "./systems/InputSystem";
import { AnimationSystem } from "./systems/AnimationSystem";
import { EffectSystem } from "./systems/EffectSystem";
import { PickingSystem } from "./systems/PickingSystem";
import { ChainRenderSystem } from "./systems/ChainRenderSystem";
import { VerletPhysicsSystem } from "./systems/VerletPhysicsSystem";

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

        this.lastTime = 0;
        this.isRunning = false;
    }

    async init() {

        if (!this.webGL) {
            this.showNoWebGLFallback();
            return;
        }
        this.assets = await loadAssets();



        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;






        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 10;  
        this.camera.lookAt(0, 0, 0);

        this.renderer.setClearColor(new THREE.Color(0x000000), 1);

        window.addEventListener("resize", () => {
            this.onWindowResize();
        })




        this.isRunning = true;
        this.lastTime = performance.now();
        this.mainLoop();

        
    }


    mainLoop = () => {
        if (!this.isRunning) return;

        const now = performance.now();
        let deltaTime = (now - this.lastTime) / 1000;

        deltaTime = Math.min(deltaTime, 0.5);

        this.lastTime = now;

        if (this.currentWorld) {
            this.currentWorld.update(deltaTime);
        }
        // console.log("askjkjad")
        requestAnimationFrame(this.mainLoop);
    }


loadScene(sceneName) {
        if (this.currentScene) {
            this.currentScene.clear();
        }
        if (this.currentWorld) {
            // inputSystem -> windowListener acumula!!
            this.currentWorld = null; 
        }

        this.currentScene = new THREE.Scene();
        this.currentWorld = new World();


        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        this.currentScene.add(light);
        this.currentScene.add(new THREE.AmbientLight(0xffffff, 0.5));
        
        this.currentWorld.addSystem(new InputSystem());
        this.currentWorld.addSystem(new EffectSystem());
        this.currentWorld.addSystem(new PickingSystem(this.currentScene, this.camera));
        this.currentWorld.addSystem(new AnimationSystem(this.renderer, this.currentScene, this.camera));
        this.currentWorld.addSystem(new VerletPhysicsSystem());
        this.currentWorld.addSystem(new ChainRenderSystem());
        this.currentWorld.addSystem(new RenderSystem(this.renderer, this.currentScene, this.camera));
        this.currentWorld.addSystem(new PostProcessingSystem(this.renderer, this.currentScene, this.camera));

        
        if (sceneName === '/') {
            setupHomeScene(this.currentWorld, this.currentScene, this.assets);
        } 
        else if (sceneName === '/projects') {
            setupProjectsScene(this.currentWorld, this.currentScene, this.assets);
        }
    }





    onWindowResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

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
}