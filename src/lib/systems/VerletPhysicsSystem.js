import { System } from "../ecs/System";
import { Query } from "../ecs/Query";
import { VerletNode } from "../components/VerletNode";
import { Constraint } from "../components/Constraint";
import * as THREE from "three";

export class VerletPhysicsSystem extends System {
    update(world, deltaTime) {
        // 1. IGNORAMOS O deltaTime VARIÁVEL!
        // Travamos a física em um tempo constante para evitar explosões de energia.
        const FIXED_DT = 0.016; 
        
        const gravity = new THREE.Vector3(0, -9.8, 0);

        const nodes = Query.entitiesWith(world, VerletNode);
        const constraints = Query.entitiesWith(world, Constraint);

        for (const e of nodes) {
            const node = world.getComponent(e, VerletNode);
            if (node.isPinned) continue;

            // A velocidade implícita baseada na distância anterior
            const velocity = new THREE.Vector3().subVectors(node.currentPosition, node.oldPosition);
            
            // 2. DAMPING (ATRITO) - O segredo para a corrente estabilizar!
            // Multiplicamos por 0.99 para roubar 1% de energia a cada frame e evitar o moto perpétuo.
            velocity.multiplyScalar(0.99); 
            
            node.oldPosition.copy(node.currentPosition); 
            
            // Usamos o FIXED_DT em vez do dt variável
            const acceleration = gravity.clone().multiplyScalar(FIXED_DT * FIXED_DT);
            node.currentPosition.add(velocity).add(acceleration);
        }

        const iterations = 1; 
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