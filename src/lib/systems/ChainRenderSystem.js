import { System } from "../ecs/System";
import { Query } from "../ecs/Query";
import { VerletNode } from "../components/VerletNode";
import { ThreeView } from "../components/ThreeView";

export class ChainRenderSystem extends System {
    update(world, deltaTime) {
        // Pega só os elos da corrente, ignora os seus sprites 2D
        const entities = Query.entitiesWith(world, VerletNode, ThreeView);

        for (const e of entities) {
            const node = world.getComponent(e, VerletNode);
            const view = world.getComponent(e, ThreeView);
            const mesh = view.obj; // O modelo 3D do Blender

            if (mesh) {

                mesh.position.copy(node.currentPosition);

                if (node.nextNode) {
                    mesh.lookAt(node.nextNode.currentPosition);
                }
                
                if (view.isOdd) {
                    mesh.rotateZ(Math.PI / 2);
                    mesh.rotateY(Math.PI / 2);
                } else {
                    mesh.rotateY(Math.PI / 2);
                }
                
            }
        }
    }
}