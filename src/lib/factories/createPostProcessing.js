import { PostProcessing } from "../components/index"

/**
 * @param {World} world
 * @param {PostProcessingConfig} config 
 * @returns {number}
 */
export function createPostProcessing(world, config = {}) {

    const entity = world.createEntity();
    world.addComponent(entity, new PostProcessing(config));

    return entity;
}