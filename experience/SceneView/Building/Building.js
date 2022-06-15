import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial, PointLight, RepeatWrapping, SphereGeometry, TextureLoader } from 'three';
import { lights } from '../../data/colors.data';

export class Building {

    constructor({ scene, height, zPosition, color = 0x6E6E6E, neon, }) {
        this.init({ scene, height, zPosition, color, neon, })
    }

    init({ scene, height, zPosition, color, neon, }) {
        this.randomPositionX = Math.random() * 1000 - 500;

        this.randomHeight = Math.random() * 80 + 10;

        this.zPosition = zPosition ? zPosition : -1

        this.boxGeometry = new BoxGeometry(20, this.randomHeight, 20)
        this.boxMaterial = new MeshStandardMaterial({
            color: color,
            roughness: 1,
            metalness: 0.5,
        })

        this.mesh = new Mesh(this.boxGeometry, this.boxMaterial);

        this.mesh.position.set(this.randomPositionX, this.randomHeight / 2, this.zPosition);

        scene.add(this.mesh);
        neon && this.addNeon();
    }

    addNeon() {
        const color = lights[Math.floor(Math.random() * lights.length)];
        const neonGeometry = new BoxGeometry(20, 1, 1);
        const neonMaterial = new MeshBasicMaterial({ color: color });
        const neon = new Mesh(neonGeometry, neonMaterial);

        let quadNeon = [];


        for (let i = 0; i < 4; i++) {
            const newNeon = neon.clone();

            switch (i) {
                case 0:
                    newNeon.position.set(0, this.randomHeight / 2, 10);
                    break;
                case 1:
                    newNeon.position.set(0, this.randomHeight / 2, -10);
                    break;
                case 2:
                    newNeon.rotateY(Math.PI / 2);
                    newNeon.position.set(10, this.randomHeight / 2, 0);
                    break;
                case 3:
                    newNeon.rotateY(Math.PI / 2);
                    newNeon.position.set(-10, this.randomHeight / 2, 0);
                    break;
            }
            quadNeon.push(newNeon);
        }

        quadNeon.forEach(value => {
            this.mesh.add(value)
        })
    }
}