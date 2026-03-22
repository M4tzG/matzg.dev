import { Component } from "../ecs/Component";

export class Transform extends Component {
    constructor(configs = {}) {
        super();

        if (typeof configs !== 'object') {
            console.warn('Transform precisa ser um objeto...');
            configs = {};
        }

        this.position = {
            x: Number.isFinite(configs.px) ? configs.px : 0,
            y: Number.isFinite(configs.py) ? configs.py : 0,
            z: Number.isFinite(configs.pz) ? configs.pz : 0
        };

        this.rotation = {
            x: Number.isFinite(configs.rx) ? configs.rx : 0,
            y: Number.isFinite(configs.ry) ? configs.ry : 0,
            z: Number.isFinite(configs.rz) ? configs.rz : 0
        };

        this.scale = Number.isFinite(configs.scale) ? configs.scale : 1;
    }
}