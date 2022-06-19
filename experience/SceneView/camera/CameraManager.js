import { Vector3 } from "three";
import pointer from "../Pointer/Pointer";

export default class CameraManager{
    constructor(sceneView) {
        this.sceneView = sceneView;
        this.DISTANCE = 10;
    }
    update() {
        this.sceneView.camera.lookAt(new Vector3(
            pointer.ratio.x * this.DISTANCE,
            pointer.ratio.y * this.DISTANCE,
            0
        ));
    }
}