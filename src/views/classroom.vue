<template>
  <div id="classWrapper">
    <div id="blocker">
      <div id="instructions">
        <p>
          click me to start
        </p>
      </div>
    </div>
  </div>
</template>
  <script>
    import { reactive,onMounted } from '@vue/runtime-core'
    import test from '../utils/test.js'
    export default{
      setup(){
        let obj
        let src = reactive({
          url:undefined
        })
        onMounted(()=>{
          obj = reactive(new test())
        })
        return{
          obj,src,
        }
      }
    }
  </script>
  <style>
    #classWrapper{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: 100%;
      position: absolute;
    }
  </style>