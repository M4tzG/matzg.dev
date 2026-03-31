import { Constraint } from "../components/Constraint";
import { VerletNode } from "../components/VerletNode";
import { Query } from "../ecs/Query";
import { System } from "../ecs/System";

import * as THREE from "three";

export class ConstraintSystem extends System {
// [=============================================================]  
    // corrige distância entre nós
// [=============================================================]  
    constructor(iterations = 8) {
        super();
        this.iterations = iterations;
        this._delta  = new THREE.Vector3();
        this._offset = new THREE.Vector3();
        this._cachedConstraints = null;
    }

    update(world, deltaTime) {
        if (!this._cachedConstraints) {
            const entities = Query.entitiesWith(world, Constraint);
            this._cachedConstraints = [];
            for (const c of entities) {
                const constraint = world.getComponent(c, Constraint);
                const nodeA = world.getComponent(constraint.entityA, VerletNode);
                const nodeB = world.getComponent(constraint.entityB, VerletNode);
                if (nodeA && nodeB) {
                    this._cachedConstraints.push({ nodeA, nodeB, distance: constraint.distance });
                }
            }
        }

        for (let i = 0; i < this.iterations; i++) {
            for (const { nodeA, nodeB, distance } of this._cachedConstraints) {
                this._delta.subVectors(nodeB.position, nodeA.position);
                const currentDist = this._delta.length();
                if (currentDist === 0) continue;
                const correction = (currentDist - distance) / currentDist / 2;
                this._offset.copy(this._delta).multiplyScalar(correction);
                if (!nodeA.isPinned) nodeA.position.add(this._offset);
                if (!nodeB.isPinned) nodeB.position.sub(this._offset);
            }
        }
    }
}