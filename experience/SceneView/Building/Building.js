import { BoxGeometry, CylinderGeometry, Mesh, MeshBasicMaterial } from 'three';

export class Building {

    constructor({scene, height, zPosition, color = 0x6E6E6E}) {
        this.init({scene, height, zPosition, color})
    }

    init({scene, height, zPosition, color}) {
        this.randomPositionX = Math.random() * 500 - 250;

        this.randomHeight = height ? height : Math.random() * 20 + 10;

        this.zPosition = zPosition ? zPosition : -50

        this.boxGeometry = new BoxGeometry(20, this.randomHeight, 10)

        this.boxMaterial = new MeshBasicMaterial({
            color: color,
        })

        this.cylindre = new Mesh(this.boxGeometry, this.boxMaterial);

        this.cylindre.position.set(this.randomPositionX, this.randomHeight / 2, this.zPosition);

        scene.add(this.cylindre)
    }
}