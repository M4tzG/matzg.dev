import { Component } from "../ecs/Component";


export class Constraint extends Component {
    /**
     * @param {Entity} entityA 
     * @param {Entity} entityB 
     * @param {number} distance 
     */
    constructor(entityA, entityB, distance) {
        super();
        this.entityA = entityA;
        this.entityB = entityB;
        this.distance = distance;
    }
}