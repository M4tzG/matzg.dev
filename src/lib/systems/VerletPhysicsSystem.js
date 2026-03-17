import { System } from "../ecs/System";
import { Query } from "../ecs/Query";
import { VerletNode } from "../components/VerletNode";
import { Constraint } from "../components/Constraint";
import * as THREE from "three";

export class VerletPhysicsSystem extends System {

// [=============================================================]  
    // algoritmo do Verlet, simula cordas correntes e trecidos
    // formula:
    //      newPosition = currentPosition + (currentPosition - previousPosition) + acceleration * dt²
    // ou seja:
    // 1. calcula movimento (Verlet)
    // 2. aplica gravidade
    // 3. aplica damping
    // 4. corrige distância entre nós
// [=============================================================]  

    update(world, deltaTime) {
        
        const gravity = new THREE.Vector3(0, -9.8, 0);

        const nodes = Query.entitiesWith(world, VerletNode);
        const constraints = Query.entitiesWith(world, Constraint);


        for (const e of nodes) {
            const node = world.getComponent(e, VerletNode);
            if (node.isPinned) continue;

            const velocity = new THREE.Vector3().subVectors(node.currentPosition, node.oldPosition);
            
            velocity.multiplyScalar(0.99); 
            
            node.oldPosition.copy(node.currentPosition); 
            
            const acceleration = gravity.clone().multiplyScalar(deltaTime * deltaTime);
            node.currentPosition.add(velocity).add(acceleration);
        }

        const iterations = 15; 
        for (let i = 0; i < iterations; i++) {
            for (const c of constraints) {
                const constraint = world.getComponent(c, Constraint);
                const nodeA = world.getComponent(constraint.entityA, VerletNode);
                const nodeB = world.getComponent(constraint.entityB, VerletNode);

                if (!nodeA || !nodeB) continue;

                const delta = new THREE.Vector3().subVectors(nodeB.currentPosition, nodeA.currentPosition);
                const currentDist = delta.length();
                
                if (currentDist === 0) continue; 
                
                const diff = (currentDist - constraint.targetDistance) / currentDist;
                const offset = delta.multiplyScalar(diff * 0.5);

                if (!nodeA.isPinned) nodeA.currentPosition.add(offset);
                if (!nodeB.isPinned) nodeB.currentPosition.sub(offset);
            }
        }
    }
}