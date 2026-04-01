import { createSprite } from "../factories/createSprite";
import { createPostProcessing } from "../factories/createPostProcessing";
import { createAnimatedSprite } from "../factories/createAnimatedSprite";
import { createChain } from "../factories/createChain";

export function runScene(world, scene, assets, data)  {
    
    if (data.postProcessing) {
        createPostProcessing(world, data.postProcessing);
    }

    data.sprites?.forEach(config => createSprite(world, scene, assets, config));
    data.animatedSprites?.forEach(config => createAnimatedSprite(world, scene, assets, config));
    data.chains?.forEach(config => createChain(world, scene, assets, config));
}