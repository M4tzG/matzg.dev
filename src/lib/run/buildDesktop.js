import { createSprite } from "../factories/createSprite";
import { createPostProcessing } from "../factories/createPostProcessing";
import { createAnimatedSprite } from "../factories/createAnimatedSprite";

export function setupHomeScene(world, scene, assets) {

    createPostProcessing(world, {
        pincushion: { active: true, strength: -0.9 }
    });
    createSprite(world, scene, assets, "dots", 0, 0, 0, 9);
}



export function setupProjectsScene(world, scene, assets) {

    createPostProcessing(world, {
        pincushion: { active: true, strength: -0.9 }
    });
    

    createAnimatedSprite(world, scene, assets, "wit", 0, 0, 0, {
    columns: 5,
    rows: 1,
    totalFrames: 5,
    fps: 10
}, 10);
}