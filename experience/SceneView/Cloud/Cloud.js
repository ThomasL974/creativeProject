import { DoubleSide, Mesh, MeshLambertMaterial, PlaneBufferGeometry, TextureLoader } from "three"

export class Cloud {
    constructor(scene) {
        this.init(scene)
    }
    init(scene) {
        let loader = new TextureLoader();
        this.cloudParticules = [];
        loader.load('/assets/images/textures/cloud.png', (texture) => {
            const cloudGeo = new PlaneBufferGeometry(100, 100);
            const cloudMaterial  = new MeshLambertMaterial({
                map: texture,
                transparent: true,
                side: DoubleSide
            })

            for(let i = 0; i<500; i++){
                let cloud = new Mesh(cloudGeo, cloudMaterial)
                cloud.position.set(
                    Math.random() * 800 - 400,
                    i*0.2,
                    Math.random() * 800 - 400
                )

                cloud.rotation.x = Math.PI / 2

                cloud.material.opacity = 0.6;
                this.cloudParticules.push(cloud)
                scene.add(cloud);
            }
        })
    }

    update() {
        this.cloudParticules.forEach(cloud => {
            cloud.position.x += 0.1

            if(cloud.position.x > 500){
                cloud.position.x = -400
            }
        })
    }
}