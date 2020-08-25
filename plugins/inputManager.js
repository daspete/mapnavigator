import Vue from 'vue'

class InputManager {
    constructor(){
        this.input = {
            keys: {
                up: false,
                left: false,
                right: false,
                down: false,
                ctrl: false,
                shift: false,
                alt: false,
                1: false,
                2: false,
                3: false,
                4: false
            },
            mouse: {
                x: 0,
                y: 0,
                left: false,
                middle: false,
                right: false
            }
        }

        this.oldInput = {
            keys: {
                up: false,
                left: false,
                right: false,
                down: false,
                ctrl: false,
                shift: false,
                alt: false,
                1: false,
                2: false,
                3: false,
                4: false
            },
            mouse: {
                x: 0,
                y: 0,
                left: false,
                middle: false,
                right: false
            }
        }

        this.inputMap = {}
        
        this.game = null
    }

    Start(game){
        console.log('start input')
        this.game = game

        this.OnKeyDown = this.OnKeyDown.bind(this)
        this.OnKeyUp = this.OnKeyUp.bind(this)

        this.OnMouseMove = this.OnMouseMove.bind(this)
        this.OnMouseDown = this.OnMouseDown.bind(this)
        this.OnMouseUp = this.OnMouseUp.bind(this)
        this.OnContextMenu = this.OnContextMenu.bind(this)
        
        document.addEventListener('keydown', this.OnKeyDown)
        document.addEventListener('keyup', this.OnKeyUp)

        document.addEventListener('mousemove', this.OnMouseMove)
        document.addEventListener('mousedown', this.OnMouseDown)
        document.addEventListener('mouseup', this.OnMouseUp)
        document.addEventListener('contextmenu', this.OnContextMenu)
    }

    Stop(){
        console.log('stop input')
        document.removeEventListener('keydown', this.OnKeyDown)
        document.removeEventListener('keyup', this.OnKeyUp)

        document.removeEventListener('mousemove', this.OnMouseMove)
        document.removeEventListener('mousedown', this.OnMouseDown)
        document.removeEventListener('mouseup', this.OnMouseUp)
        document.removeEventListener('contextmenu', this.OnContextMenu)
    }

    SetInputMap(inputMap){
        this.inputMap = inputMap
    }

    OnKeyDown(e){
        // e.preventDefault()
        this.oldInput.keys = JSON.parse(JSON.stringify(this.input.keys))
        

        if(e.key == 'W' || e.key == 'w' || e.key == 'ArrowUp') this.input.keys.up = true
        if(e.key == 'S' || e.key == 's' || e.key == 'ArrowDown') this.input.keys.down = true
        if(e.key == 'A' || e.key == 'a' || e.key == 'ArrowLeft') this.input.keys.left = true
        if(e.key == 'D' || e.key == 'd' || e.key == 'ArrowRight') this.input.keys.right = true

        if(e.key == '1' || e.code == 'Digit1') this.input.keys['1'] = true
        if(e.key == '2' || e.code == 'Digit2') this.input.keys['2'] = true
        if(e.key == '3' || e.code == 'Digit3') this.input.keys['3'] = true
        if(e.key == '4' || e.code == 'Digit4') this.input.keys['4'] = true

        if(e.key == 'Shift') this.input.keys.shift = true
        if(e.key == 'Control') this.input.keys.ctrl = true
        if(e.key == 'Alt' || e.key == 'AltGraph') this.input.keys.alt = true

        this.HandleInput()
    }

    OnKeyUp(e){
        // e.preventDefault()
        this.oldInput.keys = JSON.parse(JSON.stringify(this.input.keys))

        if(e.key == 'W' || e.key == 'w' || e.key == 'ArrowUp') this.input.keys.up = false
        if(e.key == 'S' || e.key == 's' || e.key == 'ArrowDown') this.input.keys.down = false
        if(e.key == 'A' || e.key == 'a' || e.key == 'ArrowLeft') this.input.keys.left = false
        if(e.key == 'D' || e.key == 'd' || e.key == 'ArrowRight') this.input.keys.right = false

        if(e.key == '1' || e.code == 'Digit1') this.input.keys['1'] = false
        if(e.key == '2' || e.code == 'Digit2') this.input.keys['2'] = false
        if(e.key == '3' || e.code == 'Digit3') this.input.keys['3'] = false
        if(e.key == '4' || e.code == 'Digit4') this.input.keys['4'] = false

        if(e.key == 'Shift') this.input.keys.shift = false
        if(e.key == 'Control') this.input.keys.ctrl = false
        if(e.key == 'Alt' || e.key == 'AltGraph') this.input.keys.alt = false

        this.HandleInput()
    }

    OnContextMenu(e){
        e.stopPropagation()
        e.preventDefault()
    }

    OnMouseMove(e){
        // e.preventDefault()

        this.input.mouse.x = e.layerX
        this.input.mouse.y = e.layerY
    }

    OnMouseDown(e){
        // e.preventDefault()
        this.oldInput.mouse = JSON.parse(JSON.stringify(this.input.mouse))

        if(e.button == 0) this.input.mouse.left = true
        if(e.button == 1) this.input.mouse.middle = true
        if(e.button == 2) this.input.mouse.right = true

        this.HandleInput()
    }

    OnMouseUp(e){
        // e.preventDefault()
        this.oldInput.mouse = JSON.parse(JSON.stringify(this.input.mouse))

        if(e.button == 0) this.input.mouse.left = false
        if(e.button == 1) this.input.mouse.middle = false
        if(e.button == 2) this.input.mouse.right = false

        this.HandleInput()
    }

    HandleInput(){
        let inputs = Object.keys(this.inputMap)

        for(let i = 0; i < inputs.length; i++){
            let input = this.inputMap[inputs[i]]

            let isActive = true

            if(input.mouse){
                for(let j = 0; j < input.mouse.length; j++){
                    if(!this.input.mouse[input.mouse[j]]){
                        isActive = false
                        break
                    }
                }
            }

            if(input.keys && isActive){
                for(let j = 0; j < input.keys.length; j++){
                    if(!this.input.keys[input.keys[j]]){
                        isActive = false
                        break
                    }
                }
            }

            if(isActive){
                input.handler()
            }
        }
    }
}

Vue.prototype.$inputManager = new InputManager()