import * as THREE from "three"

export default class AssetsManager {
    constructor (){
        this.textures = {};
        this.textureLoader = new THREE.TextureLoader()
    }
    loadTexture(name, url) {
        // console.log(name);
        return new Promise((resolve, reject) => {
            this.textureLoader.load(
                url,
                (texture) => {

                    this.textures[name] = texture;
                    
                    texture.colorSpace = THREE.SRGBColorSpace; 
                    
                    resolve(texture);
                },
                undefined,
                (err) => reject(err)
            );
        });
    }

    get(name) {
        return this.textures[name];
    }
}