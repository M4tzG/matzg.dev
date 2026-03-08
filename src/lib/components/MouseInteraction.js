import { Component } from "../ecs/Component";

export class MouseInteraction extends Component {
    constructor(configs = {
        isClicked: false, 
        isHovered: false,
        isParallaxed: false,
        parallaxFactor: 1
    }) {
        super();
        // onHold
        this.isHovered = configs.isHovered; 
        this.isDragged = false; // debug

        
        // -----------
        this.isClicked = configs.isClicked;
        
        this.isParallaxed = configs.isParallaxed;
        this.parallaxFactor = configs.parallaxFactor;


        
    }
}