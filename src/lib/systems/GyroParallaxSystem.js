import * as THREE from 'three';
import { GyroParallax } from '../components/GyroParallax';
import { ThreeView } from '../components/ThreeView';
import { Transform } from '../components/Transform';
import { Query } from '../ecs/Query';

function requestGyroPermission() {

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    console.log("Permissão concedida!");
                } else {
                    console.log("Permissão negada pelo usuário.");
                }
            })
            .catch(console.error);
    } else {
        console.log("Permissão não é necessária (Android/Web).");
    }
}


export class GyroParallaxSystem {
    constructor() {
        
        this.globalTargetX = 0;
        this.globalTargetY = 0;

        this.initSensor();
    }

    initSensor() {
        window.addEventListener('deviceorientation', (event) => {
            if (!event.gamma || !event.beta) return;
            let x = Math.max(-30, Math.min(30, event.gamma)) / 30;
        
            let betaOffset = event.beta - 45; 
            let y = Math.max(-30, Math.min(30, betaOffset)) / 30;

            this.globalTargetX = x;
            this.globalTargetY = y;
        });
    }

    update(world, deltaTime) {

        const entities = Query.entitiesWith(world, GyroParallax, ThreeView, Transform);

        for (const entity of entities) {

            const parallax = world.getComponent(entity, GyroParallax);
            const mesh = world.getComponent(entity, ThreeView);
            const transform = world.getComponent(entity, Transform);

    
            parallax.targetX = this.globalTargetX * parallax.intensity;
            parallax.targetY = -this.globalTargetY * parallax.intensity;

            const lerpSpeed = 5 * deltaTime;
            
            transform.position.x += (targetX - transform.position.x) * lerpSpeed;   
            transform.position.y += (targetY - transform.position.y) * lerpSpeed;
            
        }
    }
}