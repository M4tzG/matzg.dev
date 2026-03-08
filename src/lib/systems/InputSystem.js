import { System } from "../ecs/System"; 
import { Query } from "../ecs/Query";   
import { MouseInteraction } from "../components/MouseInteraction";  
import { Transform } from "../components/Transform";
import { Input } from "../components/Input";


function lerp(v0, v1, t){
        return v0 + t * (v1 - v0);
}


export class InputSystem extends System {
    constructor() {
        super();
        
        this.mouse = {
            x: 0,
            y: 0,
            isDown: false
        };

        this.initListeners();
    }
    initListeners() {
        window.addEventListener('mousemove', (e) => {

            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('mousedown', () => this.mouse.isDown = true);
        window.addEventListener('mouseup', () => this.mouse.isDown = false);
    }

    update(world, deltaTime) {
        const entities = Query.entitiesWith(world, MouseInteraction, Transform, Input);

        for (const e of entities) {
            const interaction = world.getComponent(e, MouseInteraction);
            const transform = world.getComponent(e, Transform);
            const input = world.getComponent(e, Input);

            if (interaction.isParallaxed) {
                // em determinado ponto, será a posiao inicial do objeto + uma distancia

                if (input.mouse.initialX === undefined) {
                    input.mouse.initialX = transform.position.x;
                    input.mouse.initialY = transform.position.y;
                }

                const targetX = input.mouse.initialX + (this.mouse.x * interaction.parallaxFactor);
                const targetY = input.mouse.initialY + (this.mouse.y * interaction.parallaxFactor);

                const lerpSpeed = 5 * deltaTime; // 5 pq sim...


                transform.position.x += (targetX - transform.position.x) * lerpSpeed;   
                transform.position.y += (targetY - transform.position.y) * lerpSpeed;
            }
        }
    }
}