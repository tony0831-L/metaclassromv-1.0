<template>
    <div id="classWrapper">
        <div id="blocker">
            <div id="instructions">
                <div class="loading-bar">
                    <label id="progress-text" for="progress-bar">Loading...</label>
                    <progress id="progress-bar" value="0" max="100"></progress>
                </div>
                <p>
                    click me to start
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, onMounted } from '@vue/runtime-core'
import test from '../utils/supermarket.js'
export default {
    setup() {
        let obj
        let src = reactive({
            url: undefined
        })
        onMounted(() => {
            obj = reactive(new test())
        })
        return {
            obj, src,
        }
    }
}
</script>
<style>
.loading-bar {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#progress-text {
    color: white;
    font-size: 2rem;
}

#progress-bar {
    width: 30%;
    margin-top: 0.5%;
    height: 2%;
}

#classWrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>