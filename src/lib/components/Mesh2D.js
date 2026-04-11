import { Component } from "../ecs/Component";

export class Mesh2D extends Component {
    /**
     * @param {number} width 
     * @param {number} height 
     */
    constructor(width, height){
        super();
        this.width = width;
        this.height = height;
    }
}