import {
    AmbientLight,
    BoxGeometry,
    Color,
    GridHelper,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    Vector3,
    WebGLRenderer
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class SceneBase {
    constructor () {
        this.init();
    }

    get width () {
        return window.innerWidth;
    }

    get height () {
        return window.innerHeight;
    }

    init () {
        this.setRenderer();
        this.setScene();
        this.setLights();
        this.setCamera();
        this.render();
        // EVENTS
        this.bindEvents();
    }

    bindEvents () {
        window.addEventListener('resize', this.resize.bind(this), false);
    }

    setRenderer () {
        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        document.body.appendChild(this.renderer.domElement);
    }

    setScene () {
        this.scene = new Scene();
        this.scene.background = new Color(0x111111);
    }

    setLights () {
        this.ambientLight = new AmbientLight(0x808080);
        this.scene.add(this.ambientLight);
    }

    setCamera () {
        this.camera = new PerspectiveCamera(
            50,
            this.width / this.height,
            1,
            10000
        );
        const cameraPosition = new Vector3(0, 20, -50);
        this.camera.position.set(0, 5, 50);
        this.camera.lookAt(cameraPosition)
    }

    setControls () {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 0, 0);
        this.controls.enableDamping = true;
        this.controls.update();
    }

    setHelpers () {
        this.gridHelper = new GridHelper(100, 50);
        this.scene.add(this.gridHelper);
    }

    resize () {
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
    }

    update () {
        //
    }

    render () {
        requestAnimationFrame(this.render.bind(this));
        // if (this.controls) this.controls.update();
        this.update();
        this.renderer.render(this.scene, this.camera);
    }
}
