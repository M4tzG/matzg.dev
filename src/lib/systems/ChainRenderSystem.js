import { System } from "../ecs/System";
import { Query } from "../ecs/Query";
import { ThreeView } from "../components/ThreeView";
import { VerletNode } from "../components/VerletNode";
import { Constraint } from "../components/Constraint";

export class ChainRenderSystem extends System {
    update(world, deltaTime) {
        const entities = Query.entitiesWith(world, VerletNode, ThreeView);

        for (const e of entities) {
            const node = world.getComponent(e, VerletNode);
            const view = world.getComponent(e, ThreeView);
            const constraint = world.getComponent(e, Constraint); // Se tivermos o constraint no elo

            if (view.obj) {
                // 1. Vai para a posição matemática
                view.obj.position.copy(node.currentPosition);

                // 2. Olha para o próximo elo para a corrente se alinhar!
                // Assumindo que você tem como achar o próximo elo (ex: salvou o nextNodeId no componente)
                if (node.nextVerletNode) { 
                    view.obj.lookAt(node.nextVerletNode.currentPosition);
                }

                // 3. O Cruzamento Mágico
                if (view.isOdd) { // Aquela variável que passamos na factory
                    view.obj.rotateZ(Math.PI / 2); // Gira 90 graus
                }
            }
        }
    }
}