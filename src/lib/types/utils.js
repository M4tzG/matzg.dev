/**
 * @typedef {Object} AssetsManager
 * @property {function(string): Promise<THREE.Texture>} loadTexture
 * @property {function(string): Promise<THREE.Object3D>} load3Dmodel
 * @property {function(string): THREE.Texture} getTexture
 * @property {function(string): THREE.Object3D} getModel
 */