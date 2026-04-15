/**
 * @typedef {Object} InteractionConfig
 * @property {boolean} [isMobile]
 * @property {boolean} [isHoverable]
 * @property {boolean} [canDragged]
 * @property {boolean} [canClicked]
 * @property {boolean} [isParallaxed]
 * @property {number} [parallaxFactor]
 */
/**
 * @typedef {Object} TransformConfig
 * @property {number} [px]
 * @property {number} [py]
 * @property {number} [pz]
 * @property {number} [rx]
 * @property {number} [ry]
 * @property {number} [rz]
 * @property {number} [scale]
 */
/**
 * @typedef {Object} PostProcessingConfig
 * @property {Object} [pincushion]
 * @property {boolean} [pincushion.active]
 * @property {number} [pincushion.strength] 
 * @property {Object} [crt]
 * @property {boolean} [crt.active]
 * @property {number} [crt.scanlineIntensity]
 * @property {number} [crt.scanlineCount]
 * @property {number} [crt.vignetteDarkness]
 * @property {number} [crt.aberrationAmount]
 * @property {Object} [bloom]
 * @property {boolean} [bloom.active]
 * @property {number} [bloom.strength]
 * @property {number} [bloom.radius]
 * @property {number} [bloom.threshold]
 * @property {Object} [film]
 * @property {boolean} [film.active]
 * @property {number} [film.noiseIntensity]
 * @property {number} [film.scanlinesIntensity]
 */
/**
 * @typedef {Object} SpriteAnimationConfig
 * @property {number} rows
 * @property {number} columns
 * @property {number} totalFrames
 * @property {number} fps
 */