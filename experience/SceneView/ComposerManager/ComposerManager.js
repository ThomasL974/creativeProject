import { Color, IcosahedronGeometry, Layers, Mesh, MeshBasicMaterial, Raycaster, ShaderMaterial, Vector2 } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

export default class ComposerManager {
    constructor(sceneBase) {
        this.sceneBase = sceneBase;
        this.materials = {};
        this.pointer = new Vector2();
        this.raycaster = new Raycaster();
        this.init();
    }

    init() {
        this.ENTIRE_SCENE = 0;
        this.BLOOM_SCENE = 1;

        this.bloomLayer = new Layers();
        this.bloomLayer.set(this.BLOOM_SCENE);

        this.darkMaterial = new MeshBasicMaterial({ color: 'black' });

        this.params = {
            exposure: 1,
            bloomStrength: 2,
            bloomThreshold: 0,
            bloomRadius: 0,
        };

        this.bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);

        this.bloomPass.threshold = this.params.bloomThreshold;
        this.bloomPass.strength = this.params.bloomStrength;
        this.bloomPass.radius = this.params.bloomRadius;

        this.bloomComposer = new EffectComposer(this.sceneBase.renderer);

        this.renderScene = new RenderPass(this.sceneBase.scene, this.sceneBase.camera);

        this.bloomComposer.renderToScreen = false;
        this.bloomComposer.addPass(this.renderScene);
        this.bloomComposer.addPass(this.bloomPass);

        this.finalPass = new ShaderPass(
            new ShaderMaterial({
                uniforms: {
                    baseTexture: { value: null },
                    bloomTexture: { value: this.bloomComposer.renderTarget2.texture }
                },
                vertexShader: document.getElementById('vertexshader').textContent,
                fragmentShader: document.getElementById('fragmentshader').textContent,
                defines: {}
            }), 'baseTexture'
        );
        this.finalPass.needsSwap = true;

        this.finalComposer = new EffectComposer(this.sceneBase.renderer);
        this.finalComposer.addPass(this.renderScene);
        this.finalComposer.addPass(this.finalPass);

        this.INTERSECTED;

        this.raycaster = new Raycaster();

        document.addEventListener('mousemove', this.onPointerMove.bind(this));

    }

    onPointerMove(event) {

        this.pointer.x = (event.clientX / this.sceneBase.width) * 2 - 1;
        this.pointer.y = - (event.clientY / this.sceneBase.height) * 2 + 1;

        // console.log("HEELO")
        // buildings.map(value => console.log(value));
        // find intersections

        this.raycaster.setFromCamera(this.pointer, this.sceneBase.camera);

        const intersects = this.raycaster.intersectObjects(this.object3d, false);

        if (intersects.length > 0) {

            if (this.INTERSECTED != intersects[0].object) {

                // if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);

                // this.INTERSECTED = intersects[0].object;
                // this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
                // this.INTERSECTED.material.emissive.setHex(0xFF0000);

                this.INTERSECTED = intersects[0].object;
                this.INTERSECTED.layers.toggle(this.BLOOM_SCENE);

            }
        } else {
            if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);

            this.INTERSECTED = null;

        }

    }
    // onPointerDown(event) {
    //     console.log('intersects')
    //     this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //     this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    //     this.raycaster.setFromCamera(this.mouse, this.sceneBase.camera);
    //     const intersects = this.raycaster.intersectObjects(scene.children, false);

    //     if (intersects.length > 0) {

    //         const object = intersects[0].object;
    //         object.layers.toggle(this.BLOOM_SCENE);
    //         render();

    //     }
    // }

    setUp(buildings = []) {
        buildings.map(building => console.log(building));
        this.sceneBase.scene.traverse(this.disposeMaterial.bind(this));
        // this.sceneBase.scene.children.length = 0;

        this.geometry = new IcosahedronGeometry(1, 15);
    }

    disposeMaterial(obj) {

        if (obj.material) {

            obj.material.dispose();

        }

    }

    renderBloom(mask) {

        if (mask === true) {

            this.sceneBase.scene.traverse(this.darkenNonBloomed.bind(this));
            this.bloomComposer.render();
            this.sceneBase.scene.traverse(this.restoreMaterial.bind(this));

        } else {

            this.sceneBase.camera.layers.set(this.BLOOM_SCENE);
            this.bloomComposer.render();
            this.sceneBase.camera.layers.set(this.ENTIRE_SCENE);

        }

    }

    darkenNonBloomed(obj) {

        if (obj.isMesh && this.bloomLayer.test(obj.layers) === false) {

            this.materials[obj.uuid] = obj.material;
            obj.material = this.darkMaterial;

        }

    }

    restoreMaterial(obj) {

        if (this.materials[obj.uuid]) {

            obj.material = this.materials[obj.uuid];
            delete this.materials[obj.uuid];

        }

    }

    update(buildings = []) {
        // console.log("HEELO")
        // buildings.map(value => console.log(value));
        this.object3d = buildings.map(building => building.mesh)
        // find intersections

        // this.raycaster.setFromCamera(this.pointer, this.sceneBase.camera);

        // const intersects = this.raycaster.intersectObjects(object3d, false);

        // if (intersects.length > 0) {

            // if (this.INTERSECTED != intersects[0].object) {

                // if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);

                // this.INTERSECTED = intersects[0].object;
                // this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
                // this.INTERSECTED.material.emissive.setHex(0xFF0000);

                // this.INTERSECTED = intersects[0].object;
                // this.INTERSECTED.layers.toggle(this.BLOOM_SCENE);

        //     }
        // } else {
        //     if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);

        //     this.INTERSECTED = null;

        // }
    }

    render() {
        // render scene with bloom
        this.renderBloom(true);

        // render the entire scene, then render bloom scene on top
        this.finalComposer.render();

    }
}