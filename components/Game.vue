<template>
    <div>
        <canvas ref="canvas"></canvas>
        <div class="hud">{{ gameData }}</div>
    </div>
    
</template>

<script>
export default {
    data(){
        return {
            gameData: {
                buttons: 0
            }
        }
    },

    mounted(){
        this.$game.Initialize(this)
    }
}
</script>

<style>
canvas {
    position: absolute;
    width: 100vw;
    height: 100vh;
    touch-action: none;
}

.hud {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    background-color: white;
}
</style>