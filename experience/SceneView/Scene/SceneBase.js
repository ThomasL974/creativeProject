import {
    AmbientLight,
    BoxGeometry,
    Color,
    GridHelper,
    HemisphereLight,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    PointLight,
    ReinhardToneMapping,
    Scene,
    Vector2,
    Vector3,
    WebGLRenderer
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

export default class SceneBase {
    composer;
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


        const params = {
            exposure: 1,
            bloomStrength: 1,
            bloomThreshold: 0,
            bloomRadius: 0.5
        };

        this.renderScene = new RenderPass(this.scene, this.camera);

        this.bloomPass = new UnrealBloomPass(new Vector2(this.width, this.height), 1.5, 0.4, 0);
        this.bloomPass.threshold = params.bloomThreshold;
        this.bloomPass.strength = params.bloomStrength;
        this.bloomPass.radius = params.bloomRadius;

        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(this.renderScene);
        // this.composer.addPass(this.bloomPass);

        this.composer.setSize(this.width, this.height);
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
        this.ambientLight = new AmbientLight(0x404040);
        this.scene.add(this.ambientLight);
        this.light = new HemisphereLight( 0xffffbb, 0x080820, 2 );
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
    }

    update() {
        //
    }

    render() {
        requestAnimationFrame(this.render.bind(this));
        // if (this.controls) this.controls.update();
        this.renderer.render(this.scene, this.camera);
        this.composer.render();
        this.update();
    }
}
