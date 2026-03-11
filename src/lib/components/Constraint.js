import { Component } from "../ecs/Component";

export class Constraint extends Component {
    constructor(entityA, entityB, targetDistance) {
        super();
        this.entityA = entityA;
        this.entityB = entityB;
        this.targetDistance = targetDistance;
    }
}