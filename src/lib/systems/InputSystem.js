import { System } from "../ecs/System"; 
import { Query } from "../ecs/Query";   
import { Input } from "../components/Input";


export class InputSystem extends System {
    constructor(camera) {
        super();
        this.camera = camera;
        
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
        const entities = Query.entitiesWith(world, Input);

        for (const e of entities) {
            const input = world.getComponent(e, Input);

            input.mouse.x = this.mouse.x;
            input.mouse.y = this.mouse.y;
            // use the value stored on the local mouse state
            input.mouse.isDown = this.mouse.isDown;

        }
    }
}