import { System } from "../ecs/System";
import { Query } from "../ecs/Query";

import { Transform } from "../components/Transform";
import { Mesh2D } from "../components/Mesh2D";
import { ThreeView } from "../components/ThreeView";

export class RenderSystem extends System {
    /**
     * @param {THREE.WebGLRenderer} renderer
     * @param {THREE.Scene} scene
     */
    constructor(renderer, scene){
        super();
        this.renderer = renderer;
        this.scene = scene;
        this.camera = null;
        this._cachedData = null;
    }

    /**
     * @param {World} world 
     * @param {number} deltaTime 
     */
    update(world, deltaTime){
        this.camera = world.mainCamera;
        if (!this._cachedData) {
            const entities = Query.entitiesWith(world, Transform, Mesh2D, ThreeView);
            this._cachedData = [];
            for (const e of entities) {
                const transform = world.getComponent(e, Transform);
                const mesh = world.getComponent(e, Mesh2D);
                const view = world.getComponent(e, ThreeView);
                this._cachedData.push({ transform, mesh, view });
            }
        }

        for (const { transform, mesh, view } of this._cachedData){
            const sprite = view.obj;

            sprite.position.set(
                transform.position.x, 
                transform.position.y, 
                transform.position.z
            );

            sprite.scale.set(
                mesh.width * transform.scale, 
                mesh.height * transform.scale, 
                1 
            );
            
            sprite.material.rotation = transform.rotation.z;

        }
        // esta no pos-processamento
        // this.renderer.render(this.scene, this.camera);
    }
}