<template>
  <div class="home">
    <div class="scenesContanier">
        <div class="scenes" id="classroom" @click="goClass">ClassRoom_01</div>
    </div>
  </div>
</template>

<script>
    import { useRouter } from 'vue-router';
    export default {
        setup(){
            const router = useRouter()
            function goClass(){
                router.push('/classroom')
                console.log("放超市")
            }
            
            return{
                goClass
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home{
        width: 100%;
        height: 100%;
        background-image: linear-gradient(-20deg, #6e45e2 0%, #88d3ce 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        color:#F7F8FA;
        font: 1.5rem sans-serif;
        .scenesContanier{
            border-radius: .3rem;
            width: 70rem;
            height: 50rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            .scenes{
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: .3rem;
                width: 12rem;
                height: 12rem;
                margin: 4rem;
                cursor: pointer;
                background-image: linear-gradient(to left, rgba(255,255,255,0%), rgba(255,255,255,10%));
                box-shadow: -.1em .2em .2em .2em rgb(51 51 51 / 20%);
                transition: all .25s;
                &:hover{
                    width: 12.5rem;
                    height: 12.5rem;
                    background-image: linear-gradient(to left, rgba(255,255,255,0%), rgba(255,255,255,30%));
                }
            }
        }
    }

</style>