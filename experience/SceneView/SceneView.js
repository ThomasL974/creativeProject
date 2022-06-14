import { CanvasTexture, ClampToEdgeWrapping, FogExp2, Mesh, MeshBasicMaterial, PlaneGeometry, RepeatWrapping, TextureLoader, Vector3, WebGLRenderer } from 'three';
import { Building } from './Building/Building';
import SceneBase from './Scene/SceneBase';
import { Ship } from './Ship/Ship';
import {ImprovedNoise} from 'three/examples/jsm/math/ImprovedNoise.js';

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

        const terrainGeometry = new PlaneGeometry(500, 500, 500 - 1, 500 - 1);
        terrainGeometry.rotateX(- Math.PI / 2);

        const vertices = terrainGeometry.attributes.position.array;
        const data = this.generateHeight(500, 500);
        for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {

            vertices[j + 1] = data[i] / 10;

        }
        const texture = new TextureLoader().load( '/assets/images/road.jpg' );
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set(10, 10)
        const terrain = new Mesh(terrainGeometry, new MeshBasicMaterial({map: texture}));
        terrain.position.set(0, 1, 0)
        this.scene.add(terrain);

        this.addElement();

        this.scene.fog = new FogExp2(0x111111, 0.015)
        this.isReady = true;
    }

    addElement() {
        this.initBuilding();
        this.initBuildingBehind();
        // Adding of the ships
        const SHIP_NUMBER = 3;
        for (let i = 0; i < SHIP_NUMBER; i++) {
            this.ships = [{ ...new Ship(this.scene) }];
        }
    }

    initBuilding() {
        this.buildingObj = {
            scene: this.scene,
            color: 0x4D4D4D
        }
        // Adding of the building
        const BUILDING_NUMBER = 20;
        for (let i = 0; i < BUILDING_NUMBER; i++) {
            this.building = [{ ...new Building(this.buildingObj) }];
        }
    }

    initBuildingBehind() {
        this.buildingObj = {
            scene: this.scene,
            height: 40,
            zPosition: -80
        }
        // Adding of the building
        const BUILDING_NUMBER = 5;
        for (let i = 0; i < BUILDING_NUMBER; i++) {
            this.building = [{ ...new Building(this.buildingObj) }];
        }
    }

    update() {
    }

    generateHeight(width, height){

        const size = width * height, data = new Uint8Array(size),
            perlin = new ImprovedNoise(), z = Math.random() * 0.5;

        let quality = 1;

        for (let j = 0; j < 2; j++) {

            for (let i = 0; i < size; i++) {

                const x = i % width, y = ~ ~(i / width);
                data[i] += Math.abs(perlin.noise(x / quality, y / quality, z) * quality * 2);

            }

            quality += 1;

        }

        return data;

    }
}
