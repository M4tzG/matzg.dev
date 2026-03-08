import { System } from "../ecs/System";
import { Query } from "../ecs/Query";
import { PostProcessing } from "../components/PostProcessing";


import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

const PincushionShader = {
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
            // Desloca o UV para que o centro seja (0, 0) em vez de (0.5, 0.5)
            vec2 uv = vUv - 0.5;
            
            // Calcula a distância do centro
            float distanceSq = dot(uv, uv); 
            
            // Aplica a distorção (quanto mais longe do centro, maior o efeito)
            // Se strength for negativo, puxa para as bordas (Pincushion)
            float distortion = 1.0 + strength * distanceSq; 
            
            // Reposiciona o UV de volta para o espaço (0 a 1)
            vec2 distortedUv = uv * distortion + 0.5;

            // Renderiza preto se a distorção puxar pixels de fora dos limites da textura
            if (distortedUv.x < 0.0 || distortedUv.x > 1.0 || distortedUv.y < 0.0 || distortedUv.y > 1.0) {
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            } else {
                gl_FragColor = texture2D(tDiffuse, distortedUv);
            }
        }
    `
};



export class PostProcessingSystem extends System {
    constructor(renderer, scene, camera) {
        super();
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        
        this.composer = new EffectComposer(this.renderer);
        
        this.composer.addPass(new RenderPass(this.scene, this.camera));
        
        this.pincushionPass = new ShaderPass(PincushionShader);
        this.composer.addPass(this.pincushionPass);

        const outputPass = new OutputPass();
        this.composer.addPass(outputPass);
    }



    update(world, deltaTime) {

        const entities = Query.entitiesWith(world, PostProcessing);

        if (entities.length === 0) {
            this.renderer.render(this.scene, this.camera);
            return;
        }

        if (entities.length > 1) {
            console.warn("mais de um pos-processamento na cena...");
        }

        const entity = entities[0]; 
        const config = world.getComponent(entity, PostProcessing);

        this.pincushionPass.enabled = config.pincushion.active;
        
        if (config.pincushion.active) {
            this.pincushionPass.uniforms["strength"].value = config.pincushion.strength;
            this.composer.render();
        } else {
            this.renderer.render(this.scene, this.camera);
        }
    }
}