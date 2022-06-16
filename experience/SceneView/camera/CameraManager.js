import { Vector3 } from "three";
import pointer from "../Pointer/Pointer";

export default class CameraManager{
    constructor(sceneView) {
        this.sceneView = sceneView;
    }
    update() {
        this.sceneView.camera.lookAt(new Vector3(
            pointer.ratio.x * 10,
            pointer.ratio.y * 10,
            0
        ));
    }
}