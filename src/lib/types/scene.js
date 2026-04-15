/**
 * @typedef {Object} CameraConfig
 * @property {"perspective" | "orthographic"} type
 * @property {number} [fov] - Apenas para câmeras perspectiva
 * @property {number} [aspect] - Apenas para câmeras perspectiva
 * @property {number} [near]
 * @property {number} [far]
 * @property {number} [left] - Apenas para câmeras ortográficas
 * @property {number} [right] - Apenas para câmeras ortográficas
 * @property {number} [top] - Apenas para câmeras ortográficas
 * @property {number} [bottom] - Apenas para câmeras ortográficas
 * @property {TransformConfig} [transform]
 * @property {THREE.Vector3} lookAt
 */
/**
 * @typedef {Object} TransformConfig
 * @property {number} px 
 * @property {number} py 
 * @property {number} pz 
 * @property {number} [rx] 
 * @property {number} [ry]
 * @property {number} [rz]
 * @property {number} [scale]
 */
/**
 * @typedef {Object} InteractionConfig
 * @property {boolean} [isParallaxed]
 * @property {boolean} [isHoverable]
 * @property {boolean} [isDraggable]
 * @property {number} [parallaxFactor]
 */
/**
 * @typedef {Object} TransitionConfig
 * @property {number} velocity
 * @property {number} acceleration
 * @property {{x: number, y: number}} direction
 * @property {number} delay
 */
/**
 * @typedef {Object} SpriteConfig
 * @property {string} imageName 
 * @property {TransformConfig} transform
 * @property {number} [baseHeight]
 * @property {InteractionConfig} [interaction]
 * @property {TransitionConfig} [transition]
 */
/**
 * @typedef {Object} ChainSystemConfig
 * @property {THREE.Vector3} startPos
 * @property {THREE.Vector3} endPos
 * @property {number} numLinks
 * @property {number} scale
 * @property {number} gravity
 */
/**
 * @typedef {Object} SceneData
 * @property {CameraConfig[]} camera
 * @property {Object} [postProcessing] 
 * @property {SpriteConfig[]} sprites 
 * @property {SpriteConfig[]} [animatedSprites]
 * @property {Array<{chainConfig: ChainSystemConfig, interaction: InteractionConfig}>} [chains]
 */