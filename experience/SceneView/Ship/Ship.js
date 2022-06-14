import { CapsuleGeometry, Mesh, MeshBasicMaterial } from 'three';

export class Ship {
    constructor(scene) {
        this.init(scene)
    }

    init(scene){
        this.randomPositionX = Math.random() * 100 - 50;
        this.shipGeometry = new CapsuleGeometry( 1, 10, 4, 8 );
        this.shipMaterial = new MeshBasicMaterial();
        this.ship = new Mesh(this.shipGeometry, this.shipMaterial);
        this.ship.position.set(this.randomPositionX , 50, -150);

        scene.add(this.ship);
    }
}