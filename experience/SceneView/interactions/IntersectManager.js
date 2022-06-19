import { Raycaster, Vector2 } from "three";

export default class IntersectManager {
    constructor(sceneView) {
        this.sceneView = sceneView;

        this.INTERSECTED;

        this.pointer = new Vector2();

        this.raycaster = new Raycaster();

        document.addEventListener('mousemove', this.onPointerMove.bind(this));
    }

    onPointerMove(event) {

        this.pointer.x = (event.clientX / this.sceneView.width) * 2 - 1;
        this.pointer.y = - (event.clientY / this.sceneView.height) * 2 + 1;

    }

    update(buildings) {
        console.log("HEELO")
        const object3d = buildings.map(building => building.mesh)
        // find intersections

        this.raycaster.setFromCamera(this.pointer, this.sceneView.camera);

        const intersects = this.raycaster.intersectObjects(object3d, false);

        if (intersects.length > 0) {

            if (this.INTERSECTED != intersects[0].object) {

                if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);

                this.INTERSECTED = intersects[0].object;
                this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
                this.INTERSECTED.material.emissive.setHex(0xFF0000);

            }
        } else {
            if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);

            this.INTERSECTED = null;

        }
    }
}