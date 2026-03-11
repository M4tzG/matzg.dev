import { System } from "../ecs/System";
import { Query } from "../ecs/Query";
import { VerletNode } from "../components/VerletNode";
import { Constraint } from "../components/Constraint";
import * as THREE from "three";

export class VerletPhysicsSystem extends System {
    update(world, deltaTime) {
        let dt = deltaTime || 0.016; 
        if (dt > 0.1) {
            dt = 0.016; 
        }
        const gravity = new THREE.Vector3(0, -9.8, 0);

        const nodes = Query.entitiesWith(world, VerletNode);
        const constraints = Query.entitiesWith(world, Constraint);

        for (const e of nodes) {
            const node = world.getComponent(e, VerletNode);
            if (node.isPinned) continue;

            const velocity = new THREE.Vector3().subVectors(node.currentPosition, node.oldPosition);
            
            node.oldPosition.copy(node.currentPosition); 
            
            const acceleration = gravity.clone().multiplyScalar(dt * dt);
            node.currentPosition.add(velocity).add(acceleration);
        }


        const iterations = 1; 
        for (let i = 0; i < iterations; i++) {
            for (const c of constraints) {
                const constraint = world.getComponent(c, Constraint);
                const nodeA = world.getComponent(constraint.entityA, VerletNode);
                const nodeB = world.getComponent(constraint.entityB, VerletNode);

                if (!nodeA || !nodeB) continue;

                // Calcula a distância atual entre os dois elos
                const delta = new THREE.Vector3().subVectors(nodeB.currentPosition, nodeA.currentPosition);
                const currentDist = delta.length();
                
                if (currentDist === 0) continue; // Proteção contra divisão por zero (NaN)
                
                // O quanto eles se esticaram além do permitido?
                const diff = (currentDist - constraint.targetDistance) / currentDist;
                
                // Empurra um pouco de cada lado para voltarem pro tamanho certo
                const offset = delta.multiplyScalar(diff * 0.5);

                if (!nodeA.isPinned) nodeA.currentPosition.add(offset);
                if (!nodeB.isPinned) nodeB.currentPosition.sub(offset);
            }
        }
    }
}