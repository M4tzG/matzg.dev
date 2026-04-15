import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default class AssetsManager {
    constructor (){
        this.textures = {};
        this.models = {};

        this.textureLoader = new THREE.TextureLoader();
        this.gltfLoader = new GLTFLoader();
    }

    /**
     * @param {string} name
     * @param {string} path
     * @returns {Promise<THREE.Object3D>}
     */
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

    /**
     * @param {string} name 
     * @param {string} url 
     * @returns {Promise<THREE.Texture>} 
     */
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

    /**
     * @param {string} name 
     * @returns {THREE.Texture|undefined} 
     */
    getTexture(name) {
        return this.textures[name];
    }

    /**
     * @param {string} name
     * @returns {THREE.Object3D|undefined} 
     */
    getModel(name) {
        return this.models[name];
    }
}