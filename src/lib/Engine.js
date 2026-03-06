import * as THREE from "three"

export default class Engine {
    constructor (canvas, isMobile = false, webGL = false) {
        this.canvas = canvas;
        this.webGL = webGL;
        this.isMobile = isMobile;

        // core
        this.camera = null;
        this.renderer = null;

        // paginas 
        this.currentScene = null;
        this.currentWorld = null;


        this.lastTime = 0;
        this.isRunning = false;

    }

    init() {
        if (!this.webGL) {
            this.showNoWebGLFallback();
            return;
        }

        const renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;


        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


        window.addEventListener("resize", () => {
            onWindowResize();
        })

        this.isRunning = true;
        this.lastTime = performance.now();
        this.mainLoop();
    }


    mainLoop = () => {
        if (!this.isRunning) return;

        const now = performance.now();
        const deltaTime = (now - this.lastTime) / 1000;
        this.lastTime = now;

        if (this.currentWorld) {
            this.currentWorld.update(deltaTime);
        }
        // console.log("askjkjad")
        requestAnimationFrame(this.mainLoop);
    }




    onWindowResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
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