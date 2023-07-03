import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as CANNON from '../../node_modules/cannon-es/dist/cannon-es.js'
import { PointerLockControlsCannon } from './libs/PointerLockControlsCannon.js'
import { Vec3 } from 'cannon-es';


export default class Three {
    constructor() {
        try {
            this.init()
        } catch (error) {
            console.log(error)
        }
    }

    init() {
        this.initThree()
        this.loadModels()
        this.setLight()
        this.initCannon()
        this.initPointerLock()
        this.addWall()
        this.animate()
    }

    initThree() {
        this.app = document.getElementById('classWrapper')
        this.dialoge = document.getElementById('dialoge');
        this.instructions = document.getElementById('instructions');
        this.blocker = document.getElementById('blocker');
        this.crossHair = document.getElementById('cross');
        this.canvas = document.getElementsByTagName('canvas');
        this.exitBut = document.getElementById('button');
        this.progressContainer = document.getElementById('container');
        this.progress = document.getElementById('progress');
        this.label = document.getElementById('label');
        this.lastCallTime = performance.now();

        this.mixers = []
        this.tempMatrix = new THREE.Matrix4()
        this.lastCallTime = performance.now()

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(0, 0, 0)
        this.camera.add(this.listener);

        // Scene
        this.scene = new THREE.Scene()

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true })//渲染器
        this.renderer.shadowMap.enabled = true // 設定需渲染陰影效果
        this.renderer.shadowMap.type = 2
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.app.appendChild(this.renderer.domElement)

        // Generic material
        this.material = new THREE.MeshLambertMaterial({ transparent: true, opacity: 0 })

        window.addEventListener('resize', this.onWindowResize(this))

        //For watching Cannon Body
        function watchshelf(sce) {
            const shelfMat = new THREE.MeshBasicMaterial({
                color: 0xae0000,
                wireframe: true
            })
            const shelfGeo = new THREE.BoxGeometry(2.1, 0.1, 5)
            const shelf = new THREE.Mesh(shelfGeo, shelfMat)
            shelf.position.set(-1.625, 1.25, -0.7)
            sce.add(shelf)
            const freezerGeo = new THREE.BoxGeometry(1.25, 0.1, 5.7)
            const freezer = new THREE.Mesh(freezerGeo, shelfMat)
            freezer.position.set(3.9, 1.1, -1.45)
            sce.add(freezer)
        }
        function watchwall(sce) {
            const wallMat = new THREE.MeshBasicMaterial({
                color: 0xd3a4ff,
                wireframe: true
            })
            const frontwallGeo = new THREE.BoxGeometry(11, 6.7, .0001)
            const frontwall = new THREE.Mesh(frontwallGeo, wallMat)
            frontwall.position.set(1.2, 1.9, -7.25)
            sce.add(frontwall)
            const backwallGeo = new THREE.BoxGeometry(11, 6.7, .0001)
            const backwall = new THREE.Mesh(backwallGeo, wallMat)
            backwall.position.set(1.2, 1.9, 10.5)
            sce.add(backwall)
            const rightwallGeo = new THREE.BoxGeometry(.0001, 6.7, 18)
            const rightwall = new THREE.Mesh(rightwallGeo, wallMat)
            rightwall.position.set(6.75, 1.9, 1.75)
            sce.add(rightwall)
            const leftwallGeo = new THREE.BoxGeometry(.0001, 6.7, 18)
            const leftwall = new THREE.Mesh(leftwallGeo, wallMat)
            leftwall.position.set(-4.25, 1.9, 1.75)
            sce.add(leftwall)
        }
        function watchtable(sce) {
            const tableMat = new THREE.MeshBasicMaterial({
                color: 0x02df82,
                wireframe: true
            })
            const counterGeo = new THREE.BoxGeometry(0.5, 1, 4.25)
            const counter = new THREE.Mesh(counterGeo, tableMat)
            counter.position.set(2.25, 1.9, 6)
            sce.add(counter)
        }
        function watchobj(sce) {
            const objMat = new THREE.MeshBasicMaterial({
                color: 0x3498db,
                wireframe: true
            })
            const cartGeo = new THREE.BoxGeometry(1.5, 1, 2)
            const cart = new THREE.Mesh(cartGeo, objMat)
            cart.position.set(0.25, 1.9, 4)
            sce.add(cart)
        }
        // watchshelf(this.scene);
        // watchwall(this.scene);
        // watchtable(this.scene);
        // watchobj(this.scene);
    }

    setLight() {
        this.light = new THREE.AmbientLight(0xffffff, .8); // 環境光
        this.scene.add(this.light);

        this.light = new THREE.DirectionalLight(0xffffff, .1);//平行光
        this.light.position.set(0, 30, -100);
        this.light.castShadow = true;
        this.scene.add(this.light);

        this.light = new THREE.SpotLight(0xffffff, 1);//平行光
        this.light.position.set(32.0685, 77.17, -59.164);
        this.light.castShadow = true;
        this.light.decay = 2;
        this.scene.add(this.light);
    }

    onWindowResize(three) {
        three.camera.aspect = window.innerWidth / window.innerHeight
        three.camera.updateProjectionMatrix()
        three.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    loadModels() {
        this.npc = [];
        let url = './src/model/'
        this.modelLoader(url + 'place/', { x: 1, y: 1, z: 1 }, { x: 0, y: -1.5, z: 0 }, { x: 0, y: 0, z: 0 }, "building", "place");
    }


    modelLoader(path, size, position, rotation, type, name) {

        //For progress Bar
        const loadingManger = new THREE.LoadingManager()
        const progressBar = document.getElementById('progress-bar')
        // loadingManger.onStart = function(url, item, total){
        //     console.log('Start loading : '+url)
        // }
        loadingManger.onProgress = function (url, loaded, total) {
            progressBar.value = (loaded / total) * 100
            console.log('Start loading : ' + url)
        }
        const loadingBar = document.querySelector('.loading-bar')
        loadingManger.onLoad = function () {
            loadingBar.style.display = 'none'
        }
        // loadingManger.onError = function(url){
        //     console.error('Got a problem loading : '+url)
        // }

        this.loading = true;
        this.loader = new GLTFLoader(loadingManger).setPath(path);
        this.loader.load('supermarket.glb', (gltf) => {
            gltf.scene.scale.set(size.x, size.y, size.z);//設定大小
            gltf.scene.position.set(position.x, position.y, position.z);//設定位置
            if (rotation) {
                gltf.scene.rotation.y += rotation.y;
            }
            gltf.scene.name = name;
            let mixer = {
                "name": name,
                "animes": []
            };
            switch (type) {
                case "npc":
                    mixer.mixer = new THREE.AnimationMixer(gltf.scene.children[0]);
                    gltf.animations.forEach(e => {
                        if (e.name == 'Idle') {
                            mixer.animes.push(mixer.mixer.clipAction(e).setDuration(e.duration).play())
                        }
                    })
                    this.mixers.push(mixer);
                    this.scene.add(gltf.scene);//添加到場景
                    this.loading = false;
                    break;
                case "pick":
                    mixer.mixer = new THREE.AnimationMixer(gltf.scene.children[0]);
                    mixer.animes.push(mixer.mixer.clipAction(gltf.animations[0]).setDuration(gltf.animations[0].duration).play())
                    this.mixers.push(mixer);
                    gltf.scene.name = "char";
                    this.scene.add(gltf.scene);//添加到場景
                    break;
                default:
                    this.scene.add(gltf.scene);//添加到場景
                    this.loading = false;
                    break;
            }
        })
    }//加載並添加模型到場景


    initCannon() {
        this.timeStep = 1 / 60;
        this.world = new CANNON.World()

        // Tweak contact properties.
        // Contact stiffness - use to make softer/harder contacts
        this.world.defaultContactMaterial.contactEquationStiffness = 1e9

        // Stabilization time in number of timesteps
        this.world.defaultContactMaterial.contactEquationRelaxation = 4

        const solver = new CANNON.GSSolver()
        solver.iterations = 7
        solver.tolerance = 0.1
        this.world.solver = new CANNON.SplitSolver(solver)

        this.world.gravity.set(0, -50, 0)

        // Create a slippery material (friction coefficient = 0.0)
        this.physicsMaterial = new CANNON.Material('physics')
        const physics_physics = new CANNON.ContactMaterial(this.physicsMaterial, this.physicsMaterial, {
            friction: 100,
            restitution: 0,
        })

        // We must add the contact materials to the world
        this.world.addContactMaterial(physics_physics)

        // Create the user collision sphere
        this.sphereShape = new CANNON.Sphere(1.2)
        this.sphereBody = new CANNON.Body({ mass: 5, material: this.physicsMaterial })
        this.sphereBody.addShape(this.sphereShape)
        this.sphereBody.position.set(-1, 2, 7)
        this.sphereBody.linearDamping = 0.9
        this.world.addBody(this.sphereBody)

        // Create the ground plane
        const groundShape = new CANNON.Plane()
        const groundBody = new CANNON.Body({ mass: 0, material: this.physicsMaterial })
        groundBody.addShape(groundShape)
        groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
        groundBody.position.set(0,0.3,0)
        console.log(groundBody.position)
        this.world.addBody(groundBody)
    }

    initPointerLock() {
        this.controls = new PointerLockControlsCannon(this.camera, this.sphereBody)
        this.scene.add(this.controls.getObject())
        this.position = this.controls.getObject().position
        document.getElementById('instructions').addEventListener('click', () => {
            this.controls.lock()
        })
        this.controls.addEventListener('lock', () => {
            this.controls.enabled = true
            document.getElementById('instructions').style.display = 'none'
            document.getElementById('blocker').style.display = 'none'
        })

        this.controls.addEventListener('unlock', () => {
            this.controls.enabled = false
            document.getElementById('instructions').style.display = null
            document.getElementById('blocker').style.display = null
        })
    }

    addWall() {
        let three = this
        function addsh() {
            const halfExtents = new Vec3(1.05, 0.05, 2.5)
            const xy = new Vec3(-1.625, 1.25, -0.7)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addfr() {
            const halfExtents = new Vec3(0.625, 0.05, 2.85)
            const xy = new Vec3(3.9, 1.1, -1.45)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addfw() {
            const halfExtents = new Vec3(5.5, 3.35, .00005)
            const xy = new Vec3(1.2, 1.9, -7.25)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addbw() {
            const halfExtents = new Vec3(5.5, 3.35, .00005)
            const xy = new Vec3(1.2, 1.9, 10.5)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addrw() {
            const halfExtents = new Vec3(.00005, 3.35, 8.25)
            const xy = new Vec3(6.75, 1.9, 2)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addlw() {
            const halfExtents = new Vec3(.00005, 3.35, 8.25)
            const xy = new Vec3(-4.25, 1.9, 1.75)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addct() {
            const halfExtents = new Vec3(0.25, .5, 2.175)
            const xy = new Vec3(2.25, 1.9, 6)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addca() {
            const halfExtents = new Vec3(0.75, .5, 1)
            const xy = new Vec3(0.25, 1.9, 4)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        addsh();
        addfr();
        addfw();
        addbw();
        addrw();
        addlw();
        addct();
        addca();
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }

    animate() {
        const dt = 0.01280000000074466;
        this.renderer.setAnimationLoop(this.animate.bind((this)))
        this.world.step(this.timeStep, dt)
        this.controls.update(dt);
        this.mixers.forEach(e => {
            e.mixer.update(dt)
        })
        this.render()
    }

    getObj() {
        return this
    }
}