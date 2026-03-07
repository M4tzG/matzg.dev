import { createSprite } from "../factories/createSprite";
import { createPostProcessing } from "../factories/createPostProcessing";

export function setupHomeScene(world, scene, assets) {

    createPostProcessing(world, {
        pincushion: { active: true, strength: -0.2 }
    });
    createSprite(world, scene, assets, "Raposo", 0, 0, -5, 7);
}



export function setupProjectsScene(world, scene, assets) {

    createPostProcessing(world, {
        pincushion: { active: true, strength: -0.9 }
    });
    createSprite(world, scene, assets, "dots", 0, 0, -5, 9);

}