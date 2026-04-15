/**
 * @typedef {Object} RendererOptions
 * @property {boolean} [antialias] 
 * @property {'high-performance' | 'low-power' | 'default'} [powerPreference]
 * @property {boolean} [shadows] 
 * @property {number} [clearColor] 
 * @property {number} [clearAlpha]
 * @property {number} [pixelRatio] 
 */
/**
 * @typedef {Object} EngineCoreOptions
 * @property {number} [maxDeltaTime]
 */
/**
 * @typedef {Object} EngineOptions
 * @property {Object} [device] 
 * @property {boolean} [device.isMobile] 
 * @property {RendererOptions} [renderer]
 * @property {EngineCoreOptions} [engine]
 */