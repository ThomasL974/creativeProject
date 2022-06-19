import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export class Ship {
    constructor(scene) {
        this.load(scene);
    }

    load(scene) {
        this.ships = [];

        const loader = new GLTFLoader();
        loader.load("/public/assets/carShip/scene.gltf", (gltf) => {
            console.log(gltf)
            gltf.scene.scale.set(0.03, 0.03, 0.03);

            for (let i = 0; i < 10; i++) {

                const newShip = gltf.scene.clone();
                const randomX = Math.random() * 1000 - 500;
                const initialPosition = -1000;
                newShip.position.set(randomX, 100, initialPosition);
                newShip.rotateY(Math.PI / 20);

                this.ships.push({
                    mesh: newShip,
                    speed: Math.random() * (5 - 2 + 1) + 2,
                    distance: 1000,
                    initialPosition: initialPosition
                });

                scene.add(newShip);
            }
        })
    }

    update() {
        this.ships.forEach(ship => {
            ship.mesh.position.z += ship.speed;
            if (ship.mesh.position.z > ship.distance) {
                ship.mesh.position.z = ship.initialPosition;
                ship.mesh.position.x = Math.random() * 1000 - 500;
            }
        })
    }
}