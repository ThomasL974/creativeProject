import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class Ship {
    constructor(scene){
        this.load(scene);
    }

    load(scene) {
        this.ships = [];

        this.tick = 0;
        this.speed = Math.random() * 4;
        this.distance = 1000;

        const loader = new GLTFLoader();
        loader.load("/public/assets/carShip/scene.gltf", (gltf) => {
            console.log(gltf)
            gltf.scene.scale.set(0.05, 0.05, 0.05);
            for (let i = 0; i < 4; i++) {
                this.newShip = gltf.scene.clone();
                const randomX = Math.random() * 500;
                this.newShip.position.set(randomX, 150, -200);
                this.newShip.rotateY(Math.PI / 40);
                this.ships.push(this.newShip);
                scene.add(this.newShip);
            }
        })
    }

    update() {
        this.ships.forEach(ship => {
            ship.position.z += 2;
            if(ship.position.z > 1000){
                ship.position.z = -200;
            } 
        })
    }
}