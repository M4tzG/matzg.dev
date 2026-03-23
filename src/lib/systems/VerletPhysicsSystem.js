import { System } from "../ecs/System";
import { Query } from "../ecs/Query";
import { VerletNode } from "../components/VerletNode";
import { Constraint } from "../components/Constraint";
import { Gravity } from "../components/Gravity";

import * as THREE from "three";

export class VerletPhysicsSystem extends System {

// [=============================================================]  
    // algoritmo do Verlet, simula cordas correntes e trecidos
    // formula:
    //      newPosition = position + (position - previousPosition) + acceleration * dt²
    // ou seja:
    // 1. calcula movimento (Verlet)
    // 2. aplica gravidade
    // 3. aplica damping
    // 4. corrige distância entre nós
// [=============================================================]  

    constructor(iterations = 27) {
        super();
        this.iterations = iterations;
    }
    update(world, deltaTime) {

        const nodes = Query.entitiesWith(world, VerletNode);
        const constraints = Query.entitiesWith(world, Constraint);

        for (const e of nodes) {
            const node = world.getComponent(e, VerletNode);
            const gravity = world.getComponent(e, Gravity);

            if (node.isPinned) continue;

            const velocity = new THREE.Vector3().subVectors(node.position, node.oldPosition);
            
            velocity.multiplyScalar(0.99); 
            
            node.oldPosition.copy(node.position); 
            
            // Aplica gravidade baseada no tempo
            const acceleration = gravity.force.clone().multiplyScalar(deltaTime * deltaTime);
            node.position.add(velocity).add(acceleration);
        }

        for (let i = 0; i < this.iterations; i++) {
            for (const c of constraints) {
                const constraint = world.getComponent(c, Constraint);
                const nodeA = world.getComponent(constraint.entityA, VerletNode);
                const nodeB = world.getComponent(constraint.entityB, VerletNode);

                if (!nodeA || !nodeB) continue;

                const delta = new THREE.Vector3().subVectors(nodeB.position, nodeA.position);
                const currentDist = delta.length();
                
                if (currentDist === 0) continue; 
                

                const difference = currentDist - constraint.distance;
                const correction = difference / currentDist / 2;

                const offset = delta.multiplyScalar(correction);
  
                if (!nodeA.isPinned) {
                    nodeA.position.add(offset);
                }
                if (!nodeB.isPinned) {
                    nodeB.position.sub(offset);
                }
            }
        }
    }
}