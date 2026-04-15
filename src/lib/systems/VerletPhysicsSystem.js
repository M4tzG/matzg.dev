import { VerletNode, Gravity } from "../components/index";

import { System } from "../ecs/System";
import { Query } from "../ecs/Query";

import * as THREE from "three";


export class VerletPhysicsSystem extends System {

// [=============================================================]  
    // atualiza posição dos nós
// [=============================================================]  
    constructor() {
        super();
        this._velocity = new THREE.Vector3();
        this._acceleration = new THREE.Vector3();
        this._cachedNodes = null;
    }

    /**
     * @param {World} world 
     * @param {number} deltaTime
     */
    update(world, deltaTime) {
        const dt = Math.min(deltaTime, 0.16);
        if (!this._cachedNodes) {
            const entities = Query.entitiesWith(world, VerletNode);
            this._cachedNodes = [];
            for (const e of entities) {
                const node    = world.getComponent(e, VerletNode);
                const gravity = world.getComponent(e, Gravity);
                if (!node.isPinned) this._cachedNodes.push({ node, gravity });
            }
        }

        for (const { node, gravity } of this._cachedNodes) {
            this._velocity.subVectors(node.position, node.oldPosition);
            this._velocity.multiplyScalar(0.99);
            node.oldPosition.copy(node.position);
            this._acceleration.copy(gravity.force).multiplyScalar(dt * dt);
            node.position.add(this._velocity).add(this._acceleration);
        }
    }
}