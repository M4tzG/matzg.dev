import { System } from "../ecs/System";

export class PostProcessing extends System {
    constructor(config = {}) {
        super();
        this.pincushion = {
            active: config.pincushion?.active ?? false, 
            strength: config.pincushion?.strength ?? -0.5
        };

        this.bloom = {
            active: config.bloom?.active ?? false,
            strength: config.bloom?.strength ?? 1.5,
            radius: config.bloom?.radius ?? 0.4,
            threshold: config.bloom?.threshold ?? 0.85 
        };
        
        this.film = {
            active: config.film?.active ?? false,
            noiseIntensity: config.film?.noiseIntensity ??0.5,
            scanlinesIntensity: config.film?.scanlinesIntensity ??0.05
        };
    }
}