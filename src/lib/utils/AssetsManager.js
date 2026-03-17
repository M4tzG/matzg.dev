import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default class AssetsManager {
    constructor (){
        this.textures = {};
        this.models = {};

        this.textureLoader = new THREE.TextureLoader();
        this.gltfLoader = new GLTFLoader();
    }

    load3Dmodel(name, path) {
        return new Promise((resolve, reject) => {
            this.gltfLoader.load(
                path,
                (gltf) => {
                    const model = gltf.scene;
                    this.models[name] = model;
                    resolve(model);
                },
                undefined,
                (err) => reject(err)
            );
        });
    }

    loadTexture(name, url) {
        return new Promise((resolve, reject) => {

            this.textureLoader.load(
                url,
                (texture) => {

                    texture.colorSpace = THREE.SRGBColorSpace;

                    this.textures[name] = texture;

                    resolve(texture);
                },
                undefined,
                (err) => reject(err)
            );

        });
    }

    getTexture(name) {
        return this.textures[name];
    }

    getModel(name) {
        return this.models[name];
    }
}