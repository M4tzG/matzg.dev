import { System } from "../ecs/System";
import { Query } from "../ecs/Query";   
import { Transition } from "../components/Transition"; 
import { Transform } from "../components/Transform";

export class TransitionSystem extends System { 
    constructor() {
        super();
    }
    update(world, deltaTime) {
        const entities = Query.entitiesWith(world, Transition, Transform);

        for (const e of entities) {
            const transition = world.getComponent(e, Transition);
            const transform = world.getComponent(e, Transform);

            if (transition.isActive) {
                transition.velocity *= transition.acceleration;
                transform.position.x -= transition.direction.x * transition.velocity * deltaTime;
                transform.position.y -= transition.direction.y * transition.velocity * deltaTime;
            }
        }
    }
}