import { System } from "../ecs/System";
import { Query } from "../ecs/Query";
import { PostProcessing } from "../components/PostProcessing";


import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';


const SHADERS = {
    pincushion: {
        uniforms: {
            "tDiffuse": { value: null },
            "strength": { value: 1 } // Valores negativos = Pincushion, Valores positivos = Barril
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform float strength;
            varying vec2 vUv;

            void main() {
                vec2 uv = vUv - 0.5;
                float distanceSq = dot(uv, uv); 
                float distortion = 1.0 + strength * distanceSq; 
                vec2 distortedUv = uv * distortion + 0.5;
                if (distortedUv.x < 0.0 || distortedUv.x > 1.0 || distortedUv.y < 0.0 || distortedUv.y > 1.0) {
                    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
                } else {
                    gl_FragColor = texture2D(tDiffuse, distortedUv);
                }
            }
        `
    }
}



export class PostProcessingSystem extends System {
    constructor(renderer, scene, camera) {
        super();
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;

        this.cachedEntity = null;
        
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));
        
        this.pincushionPass = new ShaderPass(SHADERS.pincushion);
        this.composer.addPass(this.pincushionPass);

        const outputPass = new OutputPass();
        this.composer.addPass(outputPass);
    }



    update(world, deltaTime) {

        if (!this.cachedEntity) {
            const entities = Query.entitiesWith(world, PostProcessing);
            
            if (entities.length === 0) {
                this.renderer.render(this.scene, this.camera);
                return;
            }
            if (entities.length > 1) {
                console.warn("mais de um pos-processamento na cena...");
            }
            this.cachedEntity = entities[0]; 
        }
        
        const config = world.getComponent(this.cachedEntity, PostProcessing);

        if (!config) {
            this.cachedEntity = null;
            this.renderer.render(this.scene, this.camera);
            return;
        }

        // para n deixar as figuras com uma borda estranha branca
        this.pincushionPass.enabled = config.pincushion.active; 

        // aplica todos os tipos de pos-processamento, se nao tiver nenhum ativo, usa o render normal, sem composer
        this.pincushionPass.uniforms["strength"].value = config.pincushion.strength;

        this.composer.render();
    }
}