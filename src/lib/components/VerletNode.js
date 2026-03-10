import { Component } from "../ecs/Component";

export class VerletNode extends Component {
    constructor(currentPosition, isPinned){
        super();
        this.isPinned = isPinned;
        this.currentPosition = currentPosition;
        this.oldPosition = currentPosition.clone();

    }
}