export class World {
    constructor(){
        this.nextEntityId = 0;
        this.entities = new Set();
        this.components = new Map;  // keys : value 
                                    // component class : maps os entity ids to component instances

        this.systems = [];
    }

    createEntity() {
        const id = this.nextEntityId++;
        this.entities.add(id);
        return id;
    }

    destroyEntity(entity) {
        this.entities.delete(entity);
        for (const componentMap of this.components.values()) {
            componentMap.delete(entity);
        }
    }

    addComponent(entity, component) {
        const type = component.constructor;
        if (!this.components.has(type)){
            this.components.set(type, new Map());
        }
        this.components.get(type).set(entity, component);
    }


    removeComponent(entity, componentType) {
        const componentMap = this.components.get(componentType);
        if (componentMap) {
            componentMap.delete(entity);
        }
    }

    getComponent(entity, componentType) {
        const componentMap = this.components.get(componentType);
        return componentMap ? componentMap.get(entity) : undefined;
    }

    hasComponent(entity, componentType) {
        const componentMap = this.components.get(componentType);
        return componentMap ? componentMap.has(entity) : false
    }

    addSystem(system){
        this.systems.push(system);
    }

    update(deltaTime){
        for (const system of this.systems) {
            system.update(this, deltaTime);
        }
    }
}