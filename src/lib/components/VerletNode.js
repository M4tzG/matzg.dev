import { Component } from "../ecs/Component";

export class VerletNode extends Component {
    constructor(currentPosition, isPinned) {
        super();
        this.isPinned = isPinned;
        this.currentPosition = currentPosition.clone();
        this.oldPosition = currentPosition.clone();
        
        // Vai nos ajudar a girar o 3D depois!
        this.nextNode = null; 
    }
}