import { System } from "../ecs/System"; 
import { Query } from "../ecs/Query";   
import { Interaction } from "../components/Interaction";  
import { Transform } from "../components/Transform";
import { Input } from "../components/Input";


export class EffectSystem extends System {

// [=============================================================]   
    // por hora apenas implementaçao de um parallax
// [=============================================================]   

    constructor() {
        super();
    }

    update(world, deltaTime) {
        const entities = Query.entitiesWith(world, Interaction, Transform, Input);

        for (const e of entities) {
            const interaction = world.getComponent(e, Interaction);
            const transform = world.getComponent(e, Transform);
            const input = world.getComponent(e, Input);

            if (interaction.isParallaxed && !interaction.isMobile) {
                // em determinado ponto, será a posiao inicial do objeto + uma distancia

                if (input.mouse.initialX === undefined) {
                    input.mouse.initialX = transform.position.x;
                    input.mouse.initialY = transform.position.y;
                }

                const targetX = input.mouse.initialX + (input.mouse.x * interaction.parallaxFactor);
                const targetY = input.mouse.initialY + (input.mouse.y * interaction.parallaxFactor);

                const lerpSpeed = 5 * deltaTime; // 5 pq sim...


                transform.position.x += (targetX - transform.position.x) * lerpSpeed;   
                transform.position.y += (targetY - transform.position.y) * lerpSpeed;
            }
        }
    }
}



