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
        this.addobj()
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
        function watchtable(sce) {
            const tableMat = new THREE.MeshBasicMaterial({
                color: 0x02df82,
                wireframe: true
            })
            const studenttableGeo1 = new THREE.BoxGeometry(.0001, 3, 2)
            const studenttable1 = new THREE.Mesh(studenttableGeo1, tableMat)
            studenttable1.position.set(-1.35, 0, 0)
            sce.add(studenttable1)
            const studenttableGeo2 = new THREE.BoxGeometry(.0001, 3, 2)
            const studenttable2 = new THREE.Mesh(studenttableGeo2, tableMat)
            studenttable2.position.set(0, 0, 0)
            sce.add(studenttable2)
            const studenttableGeo3 = new THREE.BoxGeometry(.0001, 3, 2)
            const studenttable3 = new THREE.Mesh(studenttableGeo3, tableMat)
            studenttable3.position.set(1.45, 0, 0)
            sce.add(studenttable3)
            const studenttableGeo4 = new THREE.BoxGeometry(.0001, 3, 2)
            const studenttable4 = new THREE.Mesh(studenttableGeo4, tableMat)
            studenttable4.position.set(2.9, 0, 0)
            sce.add(studenttable4)
            const studenttableGeo5 = new THREE.BoxGeometry(.0001, 3, 2)
            const studenttable5 = new THREE.Mesh(studenttableGeo5, tableMat)
            studenttable5.position.set(4.4, 0, 0)
            sce.add(studenttable5)
            const studenttableGeo6 = new THREE.BoxGeometry(.0001, 3, 2)
            const studenttable6 = new THREE.Mesh(studenttableGeo6, tableMat)
            studenttable6.position.set(-1.35, 0, -3)
            sce.add(studenttable6)
            const studenttableGeo7 = new THREE.BoxGeometry(.0001, 3, 2)
            const studenttable7 = new THREE.Mesh(studenttableGeo7, tableMat)
            studenttable7.position.set(0, 0, -3)
            sce.add(studenttable7)
            const studenttableGeo8 = new THREE.BoxGeometry(.0001, 3, 2)
            const studenttable8 = new THREE.Mesh(studenttableGeo8, tableMat)
            studenttable8.position.set(1.45, 0, -3)
            sce.add(studenttable8)
            const studenttableGeo9 = new THREE.BoxGeometry(.0001, 3, 2)
            const studenttable9 = new THREE.Mesh(studenttableGeo9, tableMat)
            studenttable9.position.set(2.9, 0, -3)
            sce.add(studenttable9)
            const studenttableGeo10 = new THREE.BoxGeometry(.0001, 3, 2)
            const studenttable10 = new THREE.Mesh(studenttableGeo10, tableMat)
            studenttable10.position.set(4.4, 0, -3)
            sce.add(studenttable10)
            const studenttableGeo11 = new THREE.BoxGeometry(.0001, 3, 2)
            const studenttable11 = new THREE.Mesh(studenttableGeo11, tableMat)
            studenttable11.position.set(-1.35, 0, 3)
            sce.add(studenttable11)
            const studenttableGeo12 = new THREE.BoxGeometry(.0001, 3, 2)
            const studenttable12 = new THREE.Mesh(studenttableGeo12, tableMat)
            studenttable12.position.set(0, 0, 3)
            sce.add(studenttable12)
            const studenttableGeo13 = new THREE.BoxGeometry(.0001, 3, 2)
            const studenttable13 = new THREE.Mesh(studenttableGeo13, tableMat)
            studenttable13.position.set(1.45, 0, 3)
            sce.add(studenttable13)
            const studenttableGeo14 = new THREE.BoxGeometry(.0001, 3, 2)
            const studenttable14 = new THREE.Mesh(studenttableGeo14, tableMat)
            studenttable14.position.set(2.9, 0, 3)
            sce.add(studenttable14)
            const studenttableGeo15 = new THREE.BoxGeometry(.0001, 3, 2)
            const studenttable15 = new THREE.Mesh(studenttableGeo15, tableMat)
            studenttable15.position.set(4.4, 0, 3)
            sce.add(studenttable15)
            const teachertableGeo = new THREE.BoxGeometry(.0001, 3, 2)
            const teachertable = new THREE.Mesh(teachertableGeo, tableMat)
            teachertable.position.set(-2.2, 0, 3)
            sce.add(teachertable)
        }
        function watchwall(sce) {
            const wallMat = new THREE.MeshBasicMaterial({
                color: 0xd3a4ff,
                wireframe: true
            })
            const frontwallGeo = new THREE.BoxGeometry(.0001, 4, 7.5)
            const frontwall = new THREE.Mesh(frontwallGeo, wallMat)
            frontwall.position.set(-4, 1.5, 0)
            sce.add(frontwall)
            const backwallGeo = new THREE.BoxGeometry(.0001, 4, 7.5)
            const backwall = new THREE.Mesh(backwallGeo, wallMat)
            backwall.position.set(5.8, 1.5, 0)
            sce.add(backwall)
            const rightwallGeo = new THREE.BoxGeometry(9.5, 3.2, .0001)
            const rightwall = new THREE.Mesh(rightwallGeo, wallMat)
            rightwall.position.set(1, 1.5, -3.7)
            sce.add(rightwall)
            const leftwallGeo = new THREE.BoxGeometry(9.5, 3.2, .0001)
            const leftwall = new THREE.Mesh(leftwallGeo, wallMat)
            leftwall.position.set(1, 1.5, 3.7)
            sce.add(leftwall)
        }
        // watchtable(this.scene);
        // watchwall(this.scene);

        // var pointer ,raycaster
        this.pointer  = new THREE.Vector2()
        this.raycaster = new THREE.Raycaster()
        window.addEventListener( 'pointermove', this.onPointerMove(Event) );

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

    onPointerMove(event) {

        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components

        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    }

    loadModels() {
        this.npc = [];
        let url = './model/'
        this.modelLoader(url, { x: 1, y: 1, z: 1 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, "place", "classroom");
        this.modelLoader(url, { x: 3, y: 3, z: 3 }, { x: -3.5, y: 1.2, z: 3.5 }, { x: 0, y: 3, z: 0 }, "people", "teacher(walking)");
        this.modelLoader(url, { x: .1, y:.1, z:.1}, { x: 0, y: 1.2, z: 0 }, { x: 0, y: 0, z: 0 }, "object", "NTD100");
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
        this.loader.load(type+'/'+name+'.glb', (gltf) => {
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
                case "people":
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
        this.sphereShape = new CANNON.Sphere(0.5)
        this.sphereBody = new CANNON.Body({ mass: 5, material: this.physicsMaterial })
        this.sphereBody.addShape(this.sphereShape)
        this.sphereBody.position.set(1.96, 2, -1.97)
        this.sphereBody.linearDamping = 0.9
        this.world.addBody(this.sphereBody)

        // Create the ground plane
        const groundShape = new CANNON.Plane()
        const groundBody = new CANNON.Body({ mass: 0, material: this.physicsMaterial })
        groundBody.addShape(groundShape)
        groundBody.position.set(0, 1, 0)
        groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
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
        function addst1() {
            const halfExtents = new Vec3(.00005, 1.5, 1)
            const xy = new Vec3(-1.35, 0, 0)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)

        }
        function addst2() {
            const halfExtents = new Vec3(.00005, 1.5, 1)
            const xy = new Vec3(0, 0, 0)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addst3() {
            const halfExtents = new Vec3(.00005, 1.5, 1)
            const xy = new Vec3(1.45, 0, 0)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addst4() {
            const halfExtents = new Vec3(.00005, 1.5, 1)
            const xy = new Vec3(2.9, 0, 0)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addst5() {
            const halfExtents = new Vec3(.00005, 1.5, 1)
            const xy = new Vec3(4.4, 0, 0)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addst6() {
            const halfExtents = new Vec3(.00005, 1.5, 1)
            const xy = new Vec3(-1.35, 0, -3)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addst7() {
            const halfExtents = new Vec3(.00005, 1.5, 1)
            const xy = new Vec3(0, 0, -3)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addst8() {
            const halfExtents = new Vec3(.00005, 1.5, 1)
            const xy = new Vec3(1.45, 0, -3)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addst9() {
            const halfExtents = new Vec3(.00005, 1.5, 1)
            const xy = new Vec3(2.9, 0, -3)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addst10() {
            const halfExtents = new Vec3(.00005, 1.5, 1)
            const xy = new Vec3(4.4, 0, -3)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addst11() {
            const halfExtents = new Vec3(.00005, 1.5, 1)
            const xy = new Vec3(-1.35, 0, 3)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addst12() {
            const halfExtents = new Vec3(.00005, 1.5, 1)
            const xy = new Vec3(0, 0, 3)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addst13() {
            const halfExtents = new Vec3(.00005, 1.5, 1)
            const xy = new Vec3(1.45, 0, 3)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addst14() {
            const halfExtents = new Vec3(.00005, 1.5, 1)
            const xy = new Vec3(2.9, 0, 3)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addst15() {
            const halfExtents = new Vec3(.00005, 1.5, 1)
            const xy = new Vec3(4.4, 0, 3)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addtt() {
            const halfExtents = new Vec3(.00005, 1.5, 1)
            const xy = new Vec3(-2.2, 0, 3)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addfw() {
            const halfExtents = new Vec3(.00005, 2, 3.75)
            const xy = new Vec3(-4, 1.5, 0)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addbw() {
            const halfExtents = new Vec3(.00005, 2, 3.75)
            const xy = new Vec3(5.8, 1.5, 0)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addrw() {
            const halfExtents = new Vec3(4.75, 1.6, .00005)
            const xy = new Vec3(1, 1.5, -3.7)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        function addlw() {
            const halfExtents = new Vec3(4.75, 1.6, .00005)
            const xy = new Vec3(1, 1.5, 3.7)
            const boxShape = new CANNON.Box(halfExtents)
            const boxBody = new CANNON.Body({ mass: 0 })
            boxBody.addShape(boxShape)
            boxBody.position = xy
            three.world.addBody(boxBody)
        }
        addst1();
        addst2();
        addst3();
        addst4();
        addst5();
        addst6();
        addst7();
        addst8();
        addst9();
        addst10();
        addst11();
        addst12();
        addst13();
        addst14();
        addst15();
        addtt();
        addfw();
        addbw();
        addrw();
        addlw();
    }

    addobj() {
        let three = this
        function addNTD100() {
            const obj = three.scene.children.find((a) =>a.name === 'NTD100')
            if(obj){
                const halfExtents = new Vec3(obj.scale.x / 2, obj.scale.y / 2, obj.scale.z / 2)
                const xy = new Vec3(obj.position.x, obj.position.y, obj.position.z)
                const Shape = new CANNON.Box(halfExtents)
                const Body = new CANNON.Body({ mass: 0 })
                Body.addShape(Shape)
                Body.position = xy
                three.world.addBody(Body)
            }
        }
        addNTD100()
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