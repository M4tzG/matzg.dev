import { System } from "../ecs/System";
import { Query } from "../ecs/Query";
import { VerletNode } from "../components/VerletNode";
import { ThreeView } from "../components/ThreeView";

export class ChainRenderSystem extends System {
    
// [=============================================================]   
    // posicao do VerletPhysicsSystem -> posiçao do mesh
    // +
    // ajusta rotaçao
// [=============================================================]  

    update(world, deltaTime) {
        const entities = Query.entitiesWith(world, VerletNode, ThreeView);

        for (const e of entities) {
            const node = world.getComponent(e, VerletNode);
            const view = world.getComponent(e, ThreeView);
            const img = view.obj;

            if (img) {

                img.position.copy(node.position);

                if (node.nextNode) {
                    img.lookAt(node.nextNode.position);
                }
                
                if (view.isOdd) {
                    img.rotateZ(Math.PI);
                    img.rotateY(Math.PI / 2);
                } else {
                    img.rotateY(Math.PI / 2);
                }
                
            }
        }
    }
}