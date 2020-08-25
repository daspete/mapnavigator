import Vue from 'vue'
import { 
    Scene, 
    Engine, 
    TargetCamera, 
    Vector3, 
    HemisphericLight, 
    MeshBuilder, 
    StandardMaterial, 
    CubeTexture, 
    Texture, 
    Mesh
} from 'babylonjs'

import Hammer from 'hammerjs'

class Game {
    constructor(){
        this.vue = null
        this.engine = null
        this.scene = null
        this.camera = null
        this.light = null
        this.skybox = null

        
    }

    Initialize(vue){
        this.vue = vue
        this.canvas = this.vue.$refs.canvas
        this.engine = new Engine(this.canvas, true)
        this.scene = new Scene(this.engine)
        
        this.camera = new TargetCamera('Camera', new Vector3(0, 30, 50), this.scene)
        this.cameraHeight = 50

        this.plane = MeshBuilder.CreateBox('ground', { width: 20, height: 1, depth: 10 }, this.scene)
        this.plane.position = Vector3.Zero()

        this.cameraTarget = new Mesh('cameraTarget', this.scene)
        this.cameraTarget.position = Vector3.Zero()

        this.camera.setTarget(this.cameraTarget.position)

        this.camera.parent = this.cameraTarget

        


        this.light = new HemisphericLight('Light', new Vector3(0, 1, 0), this.scene)
        this.light.intensity = 0.25
        this.skybox = MeshBuilder.CreateBox('skybox', { size: 10000 }, this.scene)

        const skyboxMaterial = new StandardMaterial('skybox', this.scene)
        skyboxMaterial.backFaceCulling = false
        skyboxMaterial.reflectionTexture = new CubeTexture.CreateFromImages([
            '/assets/skyboxes/space/space_left.jpg',
            '/assets/skyboxes/space/space_up.jpg',
            '/assets/skyboxes/space/space_front.jpg',
            '/assets/skyboxes/space/space_right.jpg',
            '/assets/skyboxes/space/space_down.jpg',
            '/assets/skyboxes/space/space_back.jpg',
        ], this.scene)
        skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE
        skyboxMaterial.disableLighting = true
        this.skybox.material = skyboxMaterial

        this.Update = this.Update.bind(this)
        this.engine.runRenderLoop(this.Update)

        this.pointerDown = false
        this.pan = {
            active: false,
            x: 0,
            y: 0,
            diffX: 0,
            diffY: 0,
            startX: 0,
            startY: 0
        }

        this.hammer = new Hammer(this.canvas)

        this.hammer.on('panstart', (e) => {
            this.pan.startX = e.center.x
            this.pan.startY = e.center.y

            this.pan.x = this.pan.startX
            this.pan.y = this.pan.startY

            this.pan.active = true
        })

        this.hammer.on('panmove', (e) => {
            this.pan.x = e.center.x
            this.pan.y = e.center.y

            this.pan.diffX = this.pan.x - this.pan.startX
            this.pan.diffY = this.pan.y - this.pan.startY

            this.pan.startX = this.pan.x
            this.pan.startY = this.pan.y
        })

        this.hammer.on('panend', (e) => {
            this.pan.active = false
            this.pan.diffX = 0
            this.pan.diffY = 0
        })

        // this.scene.onPointerObservable.add((e) => {
        //     const pointerType = e.event.type
            
        //     switch(pointerType){
        //         case 'pointerdown':
        //             this.pointer.count++
        //             this.vue.gameData.buttons = pointerType + '' + this.pointer.count        
                    
        //             this.pointer.down = true
        //             this.pointer.downX = e.event.pageX
        //             this.pointer.downY = e.event.pageY
        //         break

        //         case 'pointerup':
        //             this.pointer.down = false
        //             this.pointer.count = 0
                    
        //         break

        //         case 'pointermove':
        //             this.pointer.x = e.event.pageX
        //             this.pointer.y = e.event.pageY
        //         break
        //     }
        // })
    }

    Update(){
        const dt = this.engine.getDeltaTime()

        let targetPosition = this.cameraTarget.position.clone()

        if(this.pan.active){
            targetPosition.x += this.pan.diffX * 2
            targetPosition.z -= this.pan.diffY * 2

            this.pan.diffX = 0
            this.pan.diffY = 0
        }

        this.cameraTarget.position = Vector3.Lerp(this.cameraTarget.position, targetPosition, 0.05)
        this.camera.position.x = this.cameraTarget.position.x
        this.camera.position.z = this.cameraTarget.position.z + 50
        this.camera.position.y = this.cameraHeight
        this.camera.setTarget(this.cameraTarget.position)


        this.scene.render()
    }

    Stop(){
        if(this.engine) this.engine.stopRenderLoop(this.Update)
    }
}

Vue.prototype.$game = new Game()