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

            // MUDANÇA: Tirei o !interaction.isMobile para permitir que rode no celular
            if (interaction.isParallaxed) { 
                
                // Mudei initialX para o transform, que faz mais sentido estruturalmente
                if (transform.initialX === undefined) {
                    transform.initialX = transform.position.x;
                    transform.initialY = transform.position.y;
                }

                // ADIÇÃO: A grande sacada. Se for mobile, usa o gyro. Se não, usa o mouse.
                const inputX = interaction.isMobile ? input.gyro.x : input.mouse.x;
                const inputY = interaction.isMobile ? input.gyro.y : input.mouse.y;

                const targetX = transform.initialX + (inputX * interaction.parallaxFactor);
                const targetY = transform.initialY + (inputY * interaction.parallaxFactor);

                const lerpSpeed = 5 * deltaTime; 

                transform.position.x += (targetX - transform.position.x) * lerpSpeed;   
                transform.position.y += (targetY - transform.position.y) * lerpSpeed;
            }
        }
    }
}



