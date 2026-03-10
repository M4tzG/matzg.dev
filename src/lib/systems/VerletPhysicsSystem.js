import { System } from "../ecs/System";
import { Query } from "../ecs/Query";
import { VerletNode } from "../components/VerletNode";
import { Constraint } from "../components/Constraint"; // Assumindo que você criou este
import * as THREE from "three";

export class VerletPhysicsSystem extends System {
    update(world, deltaTime) {
        // Proteção caso o deltaTime venha bugado do loop principal
        const dt = deltaTime || 0.016; 

        const nodes = Query.entitiesWith(world, VerletNode);
        const constraints = Query.entitiesWith(world, Constraint);
        
        const gravity = new THREE.Vector3(0, -9.8, 0);

        // 1. Inércia e Gravidade
        for (const e of nodes) {
            const node = world.getComponent(e, VerletNode);
            if (node.isPinned) continue;

            // Calcula a velocidade e atualiza a posição antiga
            const velocity = new THREE.Vector3().subVectors(node.currentPosition, node.oldPosition);
            node.oldPosition.copy(node.currentPosition);
            
            // Aplica o movimento
            const acceleration = gravity.clone().multiplyScalar(dt * dt);
            node.currentPosition.add(velocity).add(acceleration);
        }

        // 2. Resolução das Restrições (A "Corda")
        const iterations = 5; 
        for (let i = 0; i < iterations; i++) {
            for (const c of constraints) {
                const constraint = world.getComponent(c, Constraint);
                const nodeA = world.getComponent(constraint.entityA, VerletNode);
                const nodeB = world.getComponent(constraint.entityB, VerletNode);

                if (!nodeA || !nodeB) continue; // Prevenção se a entidade for deletada

                const delta = new THREE.Vector3().subVectors(nodeB.currentPosition, nodeA.currentPosition);
                const currentDist = delta.length();
                
                // PROTEÇÃO CONTRA O NaN: Divisão por zero!
                if (currentDist === 0) continue; 
                
                const diff = (currentDist - constraint.targetDistance) / currentDist;
                const offset = delta.multiplyScalar(diff * 0.5);

                if (!nodeA.isPinned) nodeA.currentPosition.add(offset);
                if (!nodeB.isPinned) nodeB.currentPosition.sub(offset);
            }
        }
    }
}