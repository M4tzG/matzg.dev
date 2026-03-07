import { Component } from "../ecs/Component";

export class Mesh2D extends Component {
    constructor(widht, height){
        super();
        this.width =  widht;
        this.height = height;
    }
}