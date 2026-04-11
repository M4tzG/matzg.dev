/**
 * @typedef {Object} Entity
 * @property {number} id
 */
/**
 * @typedef {Object} World
 * @property {Set<Entity>} entities
 * @property {Map<function, Map<Entity, Object>>} components
 * @property {Array<System>} systems
 * @property {function(): Entity} createEntity
 * @property {function(Entity): void} destroyEntity
 * @property {function(Entity, Object): void} addComponent
 * @property {function(Entity, Object): void} removeComponent
 * @property {function(Entity, Object): Object} getComponent
 * @property {function(Entity, Object): Object} hasComponent
 * @property {function(System): void} addSystem
 * @property {function(): void} dispose
 */
/**
 * @typedef {Object} Query
 * @property {function(World, ...function): Entity[]} entitiesWith
 * @property {function(World): void} invalidateCache
 */
/**
 * @typedef {Object} System
 * @property {function(World, number): void} update
 */
/**
 * @typedef {Object} Component
 * @property {function(...any): void} constructor
 */
