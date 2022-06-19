import {
    AmbientLight,
    BoxGeometry,
    Color,
    GridHelper,
    HemisphereLight,
    Layers,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    PointLight,
    ReinhardToneMapping,
    Scene,
    ShaderMaterial,
    Vector2,
    Vector3,
    WebGLRenderer
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import ComposerManager from '../ComposerManager/ComposerManager';

const BLOOM_ACTIVATED = true;
export default class SceneBase {
    constructor() {
        this.init();
    }

    get width() {
        return window.innerWidth;
    }

    get height() {
        return window.innerHeight;
    }

    init() {
        this.setRenderer();
        this.setScene();
        this.setLights();
        this.setCamera();

        // EVENTS
        this.bindEvents();
        this.bloomManager = BLOOM_ACTIVATED && new ComposerManager(this);
        this.render();
    }

    bindEvents() {
        window.addEventListener('resize', this.resize.bind(this), false);
    }

    setRenderer() {
        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.toneMapping = ReinhardToneMapping;
        this.renderer.toneMappingExposure = Math.pow(1, 4.0);
        document.body.appendChild(this.renderer.domElement);
    }

    setScene() {
        this.scene = new Scene();
        this.scene.background = new Color(0x000000);
    }

    setLights() {
        this.ambientLight = new AmbientLight( 0x404040 );
        this.scene.add(this.ambientLight);
        this.light = new HemisphereLight(0xffffbb, 0x080820, 2);
        this.scene.add(this.light);
    }

    setCamera() {
        this.camera = new PerspectiveCamera(
            50,
            this.width / this.height,
            1,
            10000
        );
        const cameraPosition = new Vector3(0, 20, -50);
        this.camera.position.set(370, 212, -341);
        this.camera.lookAt(cameraPosition)
    }

    setControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 0, 0);
        this.controls.enableDamping = true;
        this.controls.update();
    }

    setHelpers() {
        this.gridHelper = new GridHelper(100, 50);
        this.scene.add(this.gridHelper);
    }

    resize() {
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
        this.bloomManager.bloomComposer.setSize(this.width, this.height);
        this.bloomManager.finalComposer.setSize(this.width, this.height);
    }

    update() {
        //
    }

    render() {
        requestAnimationFrame(this.render.bind(this));
        // if (this.controls) this.controls.update();
        if(BLOOM_ACTIVATED){
            this.bloomManager.render();
        }else{
            this.renderer.render(this.scene, this.camera);
        }
        this.update();
    }
}
