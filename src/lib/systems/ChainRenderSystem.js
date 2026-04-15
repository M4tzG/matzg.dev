import { VerletNode, ThreeView } from "../components/index";

import { System } from "../ecs/System";
import { Query } from "../ecs/Query";


export class ChainRenderSystem extends System {
    
// [=============================================================]   
    // posicao do VerletPhysicsSystem -> posiçao do mesh
    // +
    // ajusta rotaçao
// [=============================================================]  

    constructor() {
        super();
        this._cachedData = null;
    }

    // --------------------------------
    /**
     * @param {World} world
     * @param {number} deltaTime 
     */
    // --------------------------------
    update(world, deltaTime) {
        if (!this._cachedData) {
            const entities = Query.entitiesWith(world, VerletNode, ThreeView);
            this._cachedData = [];
            for (const e of entities) {
                const node = world.getComponent(e, VerletNode);
                const view = world.getComponent(e, ThreeView);
                this._cachedData.push({ node, view });
            }
        }

        for (const { node, view } of this._cachedData) {
            const img = view.obj;

            if (img) {

                img.position.copy(node.position);

                if (node.nextNode) {
                    img.lookAt(node.nextNode.position);
                }
                img.rotateY(Math.PI / 2);
                
                // if (view.isOdd) {
                //     img.rotateZ(Math.PI);
                //     img.rotateY(Math.PI / 2);
                // } else {
                    
                // }
                
            }
        }
    }
}