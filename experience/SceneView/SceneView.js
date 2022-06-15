import { Fog, Mesh, MeshBasicMaterial, PlaneGeometry, RepeatWrapping, TextureLoader } from 'three';
import { Building } from './Building/Building';
import SceneBase from './Scene/SceneBase';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
import {
    GLTFLoader
} from "three/examples/jsm/loaders/GLTFLoader.js";
import { Ship } from './Ship/Ship';

export default class SceneView extends SceneBase {

    buildingObj;

    init() {
        this.isReady = false;

        super.init();

        // HELPERS
        this.setControls();
        this.setHelpers();
        this.setup();
    }

    setup() {
        const terrainGeometry = new PlaneGeometry(1000, 1000, 500 - 1, 500 - 1);
        terrainGeometry.rotateX(- Math.PI / 2);

        const vertices = terrainGeometry.attributes.position.array;
        const data = this.generateHeight(500, 500);
        for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {

            vertices[j + 1] = data[i] / 10;

        }
        const texture = new TextureLoader().load('/public/assets/images/textures/road.jpg');
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set(250, 250)
        const terrain = new Mesh(terrainGeometry, new MeshBasicMaterial({ color: texture }));
        terrain.position.set(0, 0, 0)
        this.scene.add(terrain);

        this.initBuilding();
        this.initNeonBuilding();
        
        this.ship = new Ship(this.scene);

        console.log(this.composer);

        this.scene.fog = new Fog(0x000000, 200, 800) //0.005

        this.isReady = true;
    }

    initBuilding() {
        // Adding of the building
        const BUILDING_NUMBER = 500;
        for (let i = 0; i < BUILDING_NUMBER; i++) {
            this.buildingObj = {
                scene: this.scene,
                zPosition: Math.random() * 1000 - 500,
                neon: false,
            }
            this.building = [{ ...new Building(this.buildingObj) }];
        }
    }

    initNeonBuilding() {
        // Adding of the building
        const BUILDING_NUMBER = 500;
        for (let i = 0; i < BUILDING_NUMBER; i++) {
            this.buildingObj = {
                scene: this.scene,
                zPosition: Math.random() * 1000 - 500,
                neon: true
            }
            this.building = [{ ...new Building(this.buildingObj) }];
        }
    }

    generateHeight(width, height) {

        const size = width * height, data = new Uint8Array(size),
            perlin = new ImprovedNoise(), z = Math.random() * 0.5;

        let quality = 1;

        for (let j = 0; j < 2; j++) {

            for (let i = 0; i < size; i++) {

                const x = i % width, y = ~ ~(i / width);
                data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * 1);

            }

            quality *= 2;

        }

        return data;

    }

    update() {
        if(this.ship){
            this.ship.update()
        }
    }
}
