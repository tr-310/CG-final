/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");
/* harmony import */ var three_examples_jsm_loaders_MTLLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/loaders/MTLLoader.js */ "./node_modules/three/examples/jsm/loaders/MTLLoader.js");
/* harmony import */ var three_examples_jsm_loaders_OBJLoader_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/loaders/OBJLoader.js */ "./node_modules/three/examples/jsm/loaders/OBJLoader.js");





class ThreeJSContainer {
    scene;
    light;
    camera;
    orbitControls;
    renderer;
    clock;
    meteorGroups;
    shineSter;
    ster;
    sterMaterial;
    constructor() {
    }
    // 画面部分の作成(表示する枠ごとに)*
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_4__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_4__.Color(0x010B13));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
        //カメラの設定
        const camera = new three__WEBPACK_IMPORTED_MODULE_4__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3());
        this.orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        this.camera = camera;
        this.renderer = renderer;
        this.clock = new three__WEBPACK_IMPORTED_MODULE_4__.Clock();
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render = (time) => {
            this.orbitControls.update();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_4__.Scene();
        //オーロラ作成（２種類）   
        const uniforms1 = {
            time: { value: 0 },
            uColor1: { value: new three__WEBPACK_IMPORTED_MODULE_4__.Color(0x78EFFA) },
            uColor2: { value: new three__WEBPACK_IMPORTED_MODULE_4__.Color(0x00ffd9) } // 青緑
        };
        const auroraMaterial = new three__WEBPACK_IMPORTED_MODULE_4__.ShaderMaterial({
            uniforms: uniforms1,
            vertexShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
        vUv = uv;
        vec3 pos = position;
    // y方向に揺れ　複数振幅組み合わせ
        float waveY = sin(pos.x * 5.0 + time * 2.0) * 0.1 
                    + sin(pos.x * 10.0 + time * 3.5) * 0.15 
                    + sin(pos.x * 3.0 + time * 1.0 + pos.y * 2.0) * 0.03;
        pos.y += waveY;

    // z方向の揺れも
        float waveZ = sin(pos.x * 3.0 + pos.y * 4.0 + time * 3.0) * 0.1;
        pos.z += waveZ;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
      `,
            fragmentShader: `
        uniform float time;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;
    // 頂点カラー設定　グラデーションで
        void main() {
          float strength = smoothstep(0.0, 1.0, vUv.y);
          vec3 color = mix(uColor1, uColor2, vUv.y + 0.1 * sin(time * 1.5 + vUv.x * 10.0));
          gl_FragColor = vec4(color * strength, strength);
      }
        `,
            transparent: true,
            blending: three__WEBPACK_IMPORTED_MODULE_4__.AdditiveBlending
        });
        let auroraNum = 100;
        const auroraGeometry = [];
        for (let i = 0; i < auroraNum; i++) {
            auroraGeometry[i] = new three__WEBPACK_IMPORTED_MODULE_4__.PlaneGeometry(Math.random() * 15, Math.random() * 5, 100, 100);
            const aurora = new three__WEBPACK_IMPORTED_MODULE_4__.Mesh(auroraGeometry[i], auroraMaterial);
            aurora.position.x = -10 + Math.random() * 2;
            aurora.position.y = 1.5 + Math.random();
            aurora.position.z = -10 + Math.random() * 15;
            aurora.rotation.y = Math.PI / 3;
            this.scene.add(aurora);
        }
        const uniforms2 = {
            time: { value: 0 },
            uColor1: { value: new three__WEBPACK_IMPORTED_MODULE_4__.Color(0xFFFFFF) },
            uColor2: { value: new three__WEBPACK_IMPORTED_MODULE_4__.Color(0xFF26EA) } // ピンク
        };
        const material2 = new three__WEBPACK_IMPORTED_MODULE_4__.ShaderMaterial({
            uniforms: uniforms2,
            vertexShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
        vUv = uv;
        vec3 pos = position;
    // y方向に揺れ　複数振幅組み合わせ
        float waveY = sin(pos.x * 5.0 + time * 2.0) * 0.1 
                    + sin(pos.x * 10.0 + time * 3.5) * 0.15 
                    + sin(pos.x * 3.0 + time * 1.0 + pos.y * 2.0) * 0.03;
        pos.y += waveY;
        // z方向の揺れも
        float waveZ = sin(pos.x * 3.0 + pos.y * 4.0 + time * 3.0) * 0.1;
        pos.z += waveZ;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
      `,
            fragmentShader: `
        uniform float time;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;
    // 頂点カラー設定　グラデーションで
        void main() {
        float strength = smoothstep(0.0, 1.0, vUv.y);
        vec3 color = mix(uColor1, uColor2, vUv.y + 0.1 * sin(time * 1.5 + vUv.x * 10.0));
        gl_FragColor = vec4(color * strength, strength);
    }
      `,
            transparent: true,
            blending: three__WEBPACK_IMPORTED_MODULE_4__.AdditiveBlending
        });
        //オーロラの位置設定
        const auroraGeometry2 = [];
        for (let i = 0; i < auroraNum; i++) {
            auroraGeometry2[i] = new three__WEBPACK_IMPORTED_MODULE_4__.PlaneGeometry(Math.random() * 15, Math.random() * 5, 100, 100);
            const aurora2 = new three__WEBPACK_IMPORTED_MODULE_4__.Mesh(auroraGeometry2[i], material2);
            aurora2.position.x = Math.random() * 10;
            aurora2.position.y = 3 + Math.random() * 2;
            aurora2.position.z = 10 + Math.random() * 10;
            aurora2.rotation.y = Math.PI;
            this.scene.add(aurora2);
        }
        //流星群の作成
        this.meteorGroups = [];
        let generateSprite = (color1, color2, color3, color4) => {
            //新しいキャンバスの作成
            let canvas = document.createElement('canvas');
            canvas.width = 16;
            canvas.height = 16;
            //円形のグラデーションの作成
            let context = canvas.getContext('2d');
            let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
            gradient.addColorStop(0, color1);
            gradient.addColorStop(0.2, color2);
            gradient.addColorStop(0.6, color3);
            gradient.addColorStop(1, color4);
            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);
            //テクスチャの生成
            let texture = new three__WEBPACK_IMPORTED_MODULE_4__.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        };
        //流星（中心部分）
        let createMeteor = (position, color1, color2, color3, color4) => {
            let MeteorGeometry = new three__WEBPACK_IMPORTED_MODULE_4__.BufferGeometry();
            const positions = new Float32Array([position.x, position.y, position.z]);
            MeteorGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_4__.BufferAttribute(positions, 3));
            let MeteorMaterial = new three__WEBPACK_IMPORTED_MODULE_4__.PointsMaterial({
                color: 0xffffff,
                size: 1,
                transparent: true,
                blending: three__WEBPACK_IMPORTED_MODULE_4__.AdditiveBlending,
                depthWrite: false,
                map: generateSprite(color1, color2, color3, color4)
            });
            return new three__WEBPACK_IMPORTED_MODULE_4__.Points(MeteorGeometry, MeteorMaterial);
        };
        //15個の流星　中心の色設定
        const meteor = [];
        meteor[0] = createMeteor(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 5, 0), 'rgba(34, 235, 218, 1)', 'rgba(86, 211, 193, 1)', 'rgba(0, 191, 255, 1)', 'rgba(0, 0, 0, 1)');
        meteor[1] = createMeteor(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(2, 5, 0), 'rgba(34, 235, 104, 1)', 'rgba(86, 211, 105, 1)', 'rgba(0, 255, 81, 1)', 'rgba(0, 0, 0, 1)');
        meteor[2] = createMeteor(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(4, 5, 0), 'rgba(34, 148, 235, 1)', 'rgba(86, 123, 211, 1)', 'rgba(0, 255, 255, 1)', 'rgba(0, 0, 0, 1)');
        meteor[3] = createMeteor(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(6, 5, 0), 'rgba(215, 34, 235, 1)', 'rgba(211, 86, 211, 1)', 'rgba(166, 0, 255, 1)', 'rgba(0, 0, 0, 1)');
        meteor[4] = createMeteor(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(8, 5, 0), 'rgba(235, 34, 175, 1)', 'rgba(211, 86, 178, 1)', 'rgba(255, 0, 179, 1)', 'rgba(0, 0, 0, 1)');
        meteor[5] = createMeteor(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(10, 5, 0), 'rgba(224, 255, 86, 1)', 'rgba(255, 252, 78, 1)', 'rgba(242, 255, 53, 1)', 'rgba(0, 0, 0, 1)');
        meteor[6] = createMeteor(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(12, 5, 0), 'rgba(255, 147, 7, 1)', 'rgba(249, 1, 1, 1)', 'rgba(255, 186, 75, 1)', 'rgba(0, 0, 0, 1)');
        meteor[7] = createMeteor(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(14, 5, 0), 'rgba(0, 0, 181, 1)', 'rgba(132, 247, 255, 1)', 'rgba(58, 24, 250, 1)', 'rgba(0, 0, 0, 1)');
        meteor[8] = createMeteor(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(16, 5, 0), 'rgba(255, 60, 131, 1)', 'rgba(211, 86, 211, 1)', 'rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 1)');
        meteor[9] = createMeteor(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(18, 5, 0), 'rgba(67, 255, 242, 1)', 'rgba(55, 231, 237, 1)', 'rgba(145, 227, 250, 0.87)', 'rgba(0, 0, 0, 1)');
        meteor[10] = createMeteor(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(10, 5, 0), 'rgba(255, 103, 57, 1)', 'rgba(255, 252, 78, 1)', 'rgba(242, 255, 53, 1)', 'rgba(0, 0, 0, 1)');
        meteor[11] = createMeteor(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(12, 5, 0), 'rgba(7, 23, 255, 1)', 'rgba(1, 67, 249, 0.77)', 'rgba(0, 255, 213, 1)', 'rgba(0, 0, 0, 1)');
        meteor[12] = createMeteor(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(14, 5, 0), 'rgba(255, 0, 247, 1)', 'rgba(132, 247, 255, 1)', 'rgba(0, 157, 255, 1)', 'rgba(0, 0, 0, 1)');
        meteor[13] = createMeteor(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(16, 5, 0), 'rgba(255, 60, 131, 1)', 'rgba(211, 86, 211, 1)', 'rgba(225, 32, 32, 1)', 'rgba(0, 0, 0, 1)');
        meteor[14] = createMeteor(new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(18, 5, 0), 'rgba(22, 255, 162, 1)', 'rgba(0, 205, 147, 1)', 'rgba(23, 230, 175, 1)', 'rgba(0, 0, 0, 1)');
        for (let i = 0; i < meteor.length; i++) {
            //グループ化 
            const meteorGroup = new three__WEBPACK_IMPORTED_MODULE_4__.Group();
            meteorGroup.add(meteor[i]);
            //流星　尾の部分の色設定（中心の色と合わせて）
            const tailColor = [
                'rgba(86, 211, 193, 1)',
                'rgba(86, 211, 105, 1)',
                'rgba(0, 255, 255, 1)',
                'rgba(211, 86, 211, 1)',
                'rgba(211, 86, 178, 1)',
                'rgba(242, 255, 53, 1)',
                'rgba(255, 186, 75, 1)',
                'rgba(58, 24, 250, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(145, 227, 250, 1)',
                'rgba(242, 255, 53, 1)',
                'rgba(0, 255, 213, 1)',
                'rgba(0, 157, 255, 1)',
                'rgba(225, 32, 32, 1)',
                'rgba(23, 230, 175, 1)',
            ];
            //尾　グラデーション
            const uniforms3 = {
                time: { value: 0 },
                uColor1: { value: new three__WEBPACK_IMPORTED_MODULE_4__.Color(0xFFFFFF) },
                uColor2: { value: new three__WEBPACK_IMPORTED_MODULE_4__.Color(tailColor[i]) } //流星ごとに設定
            };
            //配列にして流星ごとに作成
            let tailGeometry = [];
            tailGeometry[i] = new three__WEBPACK_IMPORTED_MODULE_4__.CylinderGeometry(0.1, 0.1, 20);
            let tailMaterial = [];
            tailMaterial[i] = new three__WEBPACK_IMPORTED_MODULE_4__.ShaderMaterial({
                uniforms: uniforms3,
                vertexShader: `
          varying vec2 vUv;
          void main() {
          vUv = uv;
          vec3 pos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
        `,
                fragmentShader: `
          uniform float time;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec2 vUv;
          void main() {
          float strength = smoothstep(0.0, 1.0, vUv.y);
          vec3 color = mix(uColor1, uColor2, vUv.y + 0.1 * sin(time * 1.5 + vUv.x * 10.0));
          gl_FragColor = vec4(color * strength, strength);
      }
        `,
                transparent: true,
                blending: three__WEBPACK_IMPORTED_MODULE_4__.AdditiveBlending
            });
            //初期設定　中心部分に合わせて
            let tail = new three__WEBPACK_IMPORTED_MODULE_4__.Mesh(tailGeometry[i], tailMaterial[i]);
            tail.rotation.x = Math.PI;
            tail.position.x = i * 2;
            tail.position.y = 15;
            meteorGroup.add(tail);
            //グループ化した流星の位置設定　ランダム
            meteorGroup.position.set(Math.random() * 40, 30 + Math.random() * 100, -100 + Math.random() * 40);
            meteorGroup.rotation.x = -Math.PI / 8;
            this.meteorGroups.push(meteorGroup);
            this.scene.add(meteorGroup);
        }
        //星の作成
        let createParticles = () => {
            //ジオメトリの作成
            const sterGeometry = new three__WEBPACK_IMPORTED_MODULE_4__.BufferGeometry();
            //マテリアルの作成   
            this.sterMaterial = new three__WEBPACK_IMPORTED_MODULE_4__.PointsMaterial({
                size: 0.2,
                blending: three__WEBPACK_IMPORTED_MODULE_4__.AdditiveBlending,
                color: 0xFAFAD2,
                depthWrite: false,
                transparent: true,
                opacity: 0.8
            });
            //particleの作成
            const particleNum = 200; // パーティクルの数
            const positions = new Float32Array(particleNum * 3);
            let particleIndex = 0;
            for (let i = 0; i < particleNum; ++i) {
                positions[particleIndex++] = 50 * Math.random() - 25; // x座標
                positions[particleIndex++] = 20 * Math.random() + 5; // y座標
                positions[particleIndex++] = 50 * Math.random() - 25; // z座標
            }
            sterGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_4__.BufferAttribute(positions, 3));
            //THREE.Pointsの作成
            this.shineSter = new three__WEBPACK_IMPORTED_MODULE_4__.Points(sterGeometry, this.sterMaterial);
            //ジオメトリの作成
            const sterGeometry2 = new three__WEBPACK_IMPORTED_MODULE_4__.BufferGeometry();
            //マテリアルの作成
            const sterMaterial2 = new three__WEBPACK_IMPORTED_MODULE_4__.PointsMaterial({
                size: 0.1,
                blending: three__WEBPACK_IMPORTED_MODULE_4__.AdditiveBlending,
                color: 0xFAFAD2,
                depthWrite: false,
                transparent: true,
                opacity: 0.9
            });
            //particleの作成
            const particleNum2 = 1000; // パーティクルの数
            const positions2 = new Float32Array(particleNum2 * 3);
            let particleIndex2 = 0;
            for (let i = 0; i < particleNum2; ++i) {
                positions2[particleIndex2++] = 50 * Math.random() - 25; // x座標
                positions2[particleIndex2++] = 20 * Math.random() + 5; // y座標
                positions2[particleIndex2++] = 50 * Math.random() - 25; // z座標
            }
            sterGeometry2.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_4__.BufferAttribute(positions2, 3));
            //THREE.Pointsの作成
            this.ster = new three__WEBPACK_IMPORTED_MODULE_4__.Points(sterGeometry2, sterMaterial2);
            //シーンへの追加
            this.scene.add(this.shineSter);
            this.scene.add(this.ster);
        };
        createParticles();
        //TWEEN.jsアニメーション用設定
        let sterTweeninfo = { sterOpacity: 0.5 };
        let updateOpacity = () => {
            this.sterMaterial.opacity = sterTweeninfo.sterOpacity;
        };
        //点滅風アニメーション
        const sterShine = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(sterTweeninfo).to({ sterOpacity: 1 }, 3000).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Elastic.Out).onUpdate(updateOpacity);
        const sterVanish = new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Tween(sterTweeninfo).to({ sterOpacity: 0 }, 2000).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.Easing.Elastic.Out).onUpdate(updateOpacity);
        sterShine.chain(sterVanish);
        sterVanish.chain(sterShine);
        sterShine.start();
        //天使読み込み 
        let loadOBJ = (objFilePath, mtlFilePath) => {
            let object = new three__WEBPACK_IMPORTED_MODULE_4__.Object3D;
            const mtlLoader = new three_examples_jsm_loaders_MTLLoader_js__WEBPACK_IMPORTED_MODULE_2__.MTLLoader();
            mtlLoader.load(mtlFilePath, (material) => {
                material.preload();
                const objLoader = new three_examples_jsm_loaders_OBJLoader_js__WEBPACK_IMPORTED_MODULE_3__.OBJLoader();
                objLoader.setMaterials(material);
                objLoader.load(objFilePath, (obj) => {
                    object.add(obj);
                });
            });
            return object;
        };
        const angel = loadOBJ("angel.obj", "angel.mtl");
        angel.position.set(0, 0.1, 4);
        this.scene.add(angel);
        //天使用照明　三方向から
        const angelLight = new three__WEBPACK_IMPORTED_MODULE_4__.DirectionalLight(0xffffff, 1);
        angelLight.position.set(5, 3, 10);
        angelLight.lookAt(angel.position);
        this.scene.add(angelLight);
        const angelLight2 = new three__WEBPACK_IMPORTED_MODULE_4__.DirectionalLight(0xffffff, 1);
        angelLight2.position.set(-5, 3, 10);
        angelLight2.lookAt(angel.position);
        this.scene.add(angelLight2);
        const angelLight3 = new three__WEBPACK_IMPORTED_MODULE_4__.DirectionalLight(0xffffff, 1);
        angelLight3.position.set(0, -1, -3);
        angelLight3.lookAt(angel.position);
        this.scene.add(angelLight3);
        //エルミート曲線
        let hermite = (p0, v0, p1, v1, t) => {
            const result = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((2 * t + 1) * (1 - t) * (1 - t) * p0.x + t * (1 - t) * (1 - t) * v0.x + t * t * (3 - 2 * t) * p1.x - t * t * (1 - t) * v1.x, (2 * t + 1) * (1 - t) * (1 - t) * p0.y + t * (1 - t) * (1 - t) * v0.y + t * t * (3 - 2 * t) * p1.y - t * t * (1 - t) * v1.y, (2 * t + 1) * (1 - t) * (1 - t) * p0.z + t * (1 - t) * (1 - t) * v0.z + t * t * (3 - 2 * t) * p1.z - t * t * (1 - t) * v1.z);
            return result;
        };
        let t = 0;
        //天使用制御点
        let angelPoints = [
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 0.5, 5),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 0.5, 3),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 0.5, 1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(3, 0.5, 1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(5, 0.5, 1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(6, 0.5, 0),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(5, 0.5, -1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(3, 0.5, -1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 0.5, -1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 0.5, -3),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 0.5, -5),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0.5, -6),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-1, 0.5, -5),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-1, 0.5, -3),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-1, 0.5, -1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-3, 0.5, -1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-5, 0.5, -1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-6, 0.5, 0),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-5, 0.5, 1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-3, 0.5, 1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-1, 0.5, 1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-1, 0.5, 3),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-1, 0.5, 5),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0.5, 6),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 0.5, 5)
        ];
        //天使用速度
        let angelV = [
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[1].x - angelPoints[0].x), 0, (angelPoints[1].z - angelPoints[0].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[2].x - angelPoints[0].x), 0, (angelPoints[2].z - angelPoints[0].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[3].x - angelPoints[1].x), 0, (angelPoints[3].z - angelPoints[1].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[4].x - angelPoints[2].x), 0, (angelPoints[4].z - angelPoints[2].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[5].x - angelPoints[3].x), 0, (angelPoints[5].z - angelPoints[3].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[6].x - angelPoints[4].x), 0, (angelPoints[6].z - angelPoints[4].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[7].x - angelPoints[5].x), 0, (angelPoints[7].z - angelPoints[5].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[8].x - angelPoints[6].x), 0, (angelPoints[8].z - angelPoints[6].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[9].x - angelPoints[7].x), 0, (angelPoints[9].z - angelPoints[7].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[10].x - angelPoints[8].x), 0, (angelPoints[10].z - angelPoints[8].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[11].x - angelPoints[9].x), 0, (angelPoints[11].z - angelPoints[9].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[12].x - angelPoints[10].x), 0, (angelPoints[12].z - angelPoints[10].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[13].x - angelPoints[11].x), 0, (angelPoints[13].z - angelPoints[11].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[14].x - angelPoints[12].x), 0, (angelPoints[14].z - angelPoints[12].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[15].x - angelPoints[13].x), 0, (angelPoints[15].z - angelPoints[13].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[16].x - angelPoints[14].x), 0, (angelPoints[16].z - angelPoints[14].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[17].x - angelPoints[15].x), 0, (angelPoints[17].z - angelPoints[15].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[18].x - angelPoints[16].x), 0, (angelPoints[18].z - angelPoints[16].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[19].x - angelPoints[17].x), 0, (angelPoints[19].z - angelPoints[17].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[20].x - angelPoints[18].x), 0, (angelPoints[20].z - angelPoints[18].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[21].x - angelPoints[19].x), 0, (angelPoints[21].z - angelPoints[19].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[22].x - angelPoints[20].x), 0, (angelPoints[22].z - angelPoints[20].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[23].x - angelPoints[21].x), 0, (angelPoints[23].z - angelPoints[21].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[24].x - angelPoints[22].x), 0, (angelPoints[24].z - angelPoints[22].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((angelPoints[24].x - angelPoints[23].x), 0, (angelPoints[24].z - angelPoints[23].z))
        ];
        //カメラ用制御点
        let cameraPoints = [
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 0, 6),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 0, 4),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 0, 2),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(2, 0, 1.5),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(4, 0, 1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(6, 0, 0.5),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(5.5, 0, 0),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(4, 0, -1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(2, 0, -1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1.5, 0, -2),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 0, -4),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0.5, 0, -6),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, -5.5),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-1, 0, -4),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-1, 0, -2),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-2, 0, -1.5),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-4, 0, -1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-6, 0, -0.5),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-5.5, 0, 0),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-4, 0, 1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-2, 0, 1),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-1.5, 0, 2),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-1, 0, 4),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(-0.5, 0, 6),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 0, 6)
        ];
        //カメラ用速度
        let cameraV = [
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[1].x - cameraPoints[0].x), 0, (cameraPoints[1].z - cameraPoints[0].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[1].x - cameraPoints[0].x), 0, (cameraPoints[1].z - cameraPoints[0].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[2].x - cameraPoints[0].x), 0, (cameraPoints[2].z - cameraPoints[0].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[3].x - cameraPoints[1].x), 0, (cameraPoints[3].z - cameraPoints[1].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[4].x - cameraPoints[2].x), 0, (cameraPoints[4].z - cameraPoints[2].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[5].x - cameraPoints[3].x), 0, (cameraPoints[5].z - cameraPoints[3].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[6].x - cameraPoints[4].x), 0, (cameraPoints[6].z - cameraPoints[4].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[7].x - cameraPoints[5].x), 0, (cameraPoints[7].z - cameraPoints[5].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[8].x - cameraPoints[6].x), 0, (cameraPoints[8].z - cameraPoints[6].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[9].x - cameraPoints[7].x), 0, (cameraPoints[9].z - cameraPoints[7].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[10].x - cameraPoints[8].x), 0, (cameraPoints[10].z - cameraPoints[8].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[11].x - cameraPoints[9].x), 0, (cameraPoints[11].z - cameraPoints[9].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[12].x - cameraPoints[10].x), 0, (cameraPoints[12].z - cameraPoints[10].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[13].x - cameraPoints[11].x), 0, (cameraPoints[13].z - cameraPoints[11].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[14].x - cameraPoints[12].x), 0, (cameraPoints[14].z - cameraPoints[12].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[15].x - cameraPoints[13].x), 0, (cameraPoints[15].z - cameraPoints[13].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[16].x - cameraPoints[14].x), 0, (cameraPoints[16].z - cameraPoints[14].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[17].x - cameraPoints[15].x), 0, (cameraPoints[17].z - cameraPoints[15].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[18].x - cameraPoints[16].x), 0, (cameraPoints[18].z - cameraPoints[16].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[19].x - cameraPoints[17].x), 0, (cameraPoints[19].z - cameraPoints[17].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[20].x - cameraPoints[18].x), 0, (cameraPoints[20].z - cameraPoints[18].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[21].x - cameraPoints[19].x), 0, (cameraPoints[21].z - cameraPoints[19].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[22].x - cameraPoints[20].x), 0, (cameraPoints[22].z - cameraPoints[20].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[23].x - cameraPoints[21].x), 0, (cameraPoints[23].z - cameraPoints[21].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[24].x - cameraPoints[22].x), 0, (cameraPoints[24].z - cameraPoints[22].z)),
            new three__WEBPACK_IMPORTED_MODULE_4__.Vector3((cameraPoints[24].x - cameraPoints[23].x), 0, (cameraPoints[24].z - cameraPoints[23].z))
        ];
        let seg = 0;
        let isAutoCamera = true;
        //ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_4__.DirectionalLight(0xffffff);
        const lvec = new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        // 毎フレームのupdateを呼んで，更新
        // reqestAnimationFrame により次フレームを呼ぶ
        let update = (time) => {
            const deltaTime = this.clock.getDelta();
            //オーロラ用アニメーション
            uniforms1.time.value = this.clock.getElapsedTime();
            uniforms2.time.value = this.clock.getElapsedTime();
            this.renderer.render(this.scene, this.camera);
            //流星群用アニメーション
            for (let i = 0; i < 10; i++) {
                this.meteorGroups[i].position.y -= 30 * Math.random() * deltaTime;
                this.meteorGroups[i].position.z += 10 * deltaTime;
                if (this.meteorGroups[i].position.y <= -50 || this.meteorGroups[i].position.z >= 50) {
                    this.meteorGroups[i].position.set(10 + Math.random() * 20, 50 + Math.random() * 100, -100 + Math.random() * 40);
                }
            }
            //エルミート曲線用アニメーション（天使　カメラ）
            t += this.clock.getDelta() * 8;
            if (t > 1.0) {
                t -= 1.0;
                seg++;
                if ((seg + 1) > angelPoints.length - 1) {
                    seg = 0; // ループに戻る
                }
            }
            const angelPos = hermite(angelPoints[seg], angelV[seg], angelPoints[seg + 1], angelV[seg + 1], t);
            angel.position.copy(angelPos);
            angel.lookAt(hermite(angelPoints[seg], angelV[seg], angelPoints[seg + 1], angelV[seg + 1], t + 0.01));
            angel.position.y = 0.2 * Math.sin(this.clock.getElapsedTime() * Math.PI * 0.5);
            //マウス操作用調整
            if (isAutoCamera) {
                const cameraPos = hermite(cameraPoints[seg], cameraV[seg], cameraPoints[seg + 1], cameraV[seg + 1], t);
                this.camera.position.copy(cameraPos);
                this.camera.lookAt(angel.position);
            }
            else {
                this.orbitControls.update();
            }
            window.addEventListener("mousedown", () => {
                isAutoCamera = false;
            });
            window.addEventListener("mouseup", () => {
                isAutoCamera = true;
            });
            //カメラが天使を追いかけるように
            this.orbitControls.target.set(angel.position.x, angel.position.y, angel.position.z);
            //星の点滅アニメーション
            _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_1__.update();
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_4__.Vector3(0, 0, 5));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_tweenjs_tween_js_dist_tween_esm_js-node_modules_three_examples_jsm_contr-caa618"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQStCO0FBQzJDO0FBQy9CO0FBQ3lCO0FBQ0E7QUFFcEUsTUFBTSxnQkFBZ0I7SUFDVixLQUFLLENBQWM7SUFDbkIsS0FBSyxDQUFjO0lBQ25CLE1BQU0sQ0FBMEI7SUFDaEMsYUFBYSxDQUFnQjtJQUM3QixRQUFRLENBQXNCO0lBQzlCLEtBQUssQ0FBYztJQUNuQixZQUFZLENBQWdCO0lBQzVCLFNBQVMsQ0FBYztJQUN2QixJQUFJLENBQWM7SUFDbEIsWUFBWSxDQUF1QjtJQUczQztJQUNBLENBQUM7SUFFSCxxQkFBcUI7SUFDaEIsaUJBQWlCLEdBQUcsQ0FBQyxLQUFhLEVBQUUsTUFBYyxFQUFFLFNBQXdCLEVBQUUsRUFBRTtRQUNqRixNQUFNLFFBQVEsR0FBRyxJQUFJLGdEQUFtQixFQUFFLENBQUM7UUFDM0MsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLHdDQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNsRCxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxlQUFlO1FBRW5ELFFBQVE7UUFDUCxNQUFNLE1BQU0sR0FBRyxJQUFJLG9EQUF1QixDQUFDLEVBQUUsRUFBRSxLQUFLLEdBQUcsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxRSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksMENBQWEsRUFBRSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLG9GQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksd0NBQVcsRUFBRSxDQUFDO1FBRy9CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQiwwQkFBMEI7UUFDMUIsbUNBQW1DO1FBQ2pDLE1BQU0sTUFBTSxHQUF5QixDQUFDLElBQUksRUFBRSxFQUFFO1lBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFNUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFDQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU5QixRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQzVDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDMUMsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQzdCLENBQUM7SUFFRCxnQkFBZ0I7SUFDWixXQUFXLEdBQUcsR0FBRyxFQUFFO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSx3Q0FBVyxFQUFFLENBQUM7UUFHakMsZ0JBQWdCO1FBQ2QsTUFBTSxTQUFTLEdBQUc7WUFDbEIsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtZQUNsQixPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSx3Q0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzdDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLHdDQUFXLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBRSxLQUFLO1NBQ3JELENBQUM7UUFFQSxNQUFNLGNBQWMsR0FBRyxJQUFJLGlEQUFvQixDQUFDO1lBQ2hELFFBQVEsRUFBRSxTQUFTO1lBQ25CLFlBQVksRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQmI7WUFDRCxjQUFjLEVBQUU7Ozs7Ozs7Ozs7O1NBV2I7WUFDSCxXQUFXLEVBQUUsSUFBSTtZQUNqQixRQUFRLEVBQUUsbURBQXNCO1NBQ2pDLENBQUMsQ0FBQztRQUVGLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNuQixNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDMUIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBQztZQUNoQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxnREFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTdGLE1BQU0sTUFBTSxHQUFHLElBQUksdUNBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDL0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDN0MsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDcEI7UUFDSCxNQUFNLFNBQVMsR0FBRztZQUNoQixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO1lBQ2xCLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLHdDQUFXLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0MsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksd0NBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFFLE1BQU07U0FDdEQsQ0FBQztRQUVGLE1BQU0sU0FBUyxHQUFHLElBQUksaURBQW9CLENBQUM7WUFDekMsUUFBUSxFQUFFLFNBQVM7WUFDbkIsWUFBWSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JiO1lBQ0QsY0FBYyxFQUFFOzs7Ozs7Ozs7OztPQVdmO1lBQ0QsV0FBVyxFQUFFLElBQUk7WUFDakIsUUFBUSxFQUFFLG1EQUFzQjtTQUNuQyxDQUFDLENBQUM7UUFFRCxXQUFXO1FBRVQsTUFBTSxlQUFlLEdBQUUsRUFBRSxDQUFDO1FBQzFCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUM7WUFDL0IsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksZ0RBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM3RixNQUFNLE9BQU8sR0FBRyxJQUFJLHVDQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzlELE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDeEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDM0MsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDN0MsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN2QjtRQUVILFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLGNBQWMsR0FBRyxDQUFDLE1BQWEsRUFBRSxNQUFhLEVBQUUsTUFBYSxFQUFFLE1BQWEsRUFBRSxFQUFFO1lBRXRGLGFBQWE7WUFDWCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBRXpCLGVBQWU7WUFDYixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2SSxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNqQyxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNuQyxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNuQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUVqQyxPQUFPLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUM3QixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUQsVUFBVTtZQUNSLElBQUksT0FBTyxHQUFHLElBQUksMENBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN6QixPQUFPLE9BQU8sQ0FBQztRQUN2QixDQUFDO1FBQ0QsVUFBVTtRQUNSLElBQUksWUFBWSxHQUFHLENBQUMsUUFBc0IsRUFBQyxNQUFhLEVBQUUsTUFBYSxFQUFFLE1BQWEsRUFBRSxNQUFhLEVBQUUsRUFBRTtZQUN6RyxJQUFJLGNBQWMsR0FBRyxJQUFJLGlEQUFvQixFQUFFLENBQUM7WUFDaEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekUsY0FBYyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxrREFBcUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVqRixJQUFJLGNBQWMsR0FBRyxJQUFJLGlEQUFvQixDQUFDO2dCQUN4QyxLQUFLLEVBQUUsUUFBUTtnQkFDZixJQUFJLEVBQUUsQ0FBQztnQkFDUCxXQUFXLEVBQUUsSUFBSTtnQkFDakIsUUFBUSxFQUFFLG1EQUFzQjtnQkFDaEMsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLEdBQUcsRUFBRSxjQUFjLENBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxDQUFDO2FBQzFDLENBQUMsQ0FBQztZQUNWLE9BQU8sSUFBSSx5Q0FBWSxDQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM5RCxDQUFDO1FBRUQsZUFBZTtRQUNiLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLElBQUksMENBQWEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUM3Qyx1QkFBdUIsRUFDdkIsdUJBQXVCLEVBQ3ZCLHNCQUFzQixFQUN0QixrQkFBa0IsQ0FBQyxDQUFDO1FBRXhCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsSUFBSSwwQ0FBYSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQzdDLHVCQUF1QixFQUN2Qix1QkFBdUIsRUFDdkIscUJBQXFCLEVBQ3JCLGtCQUFrQixDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxJQUFJLDBDQUFhLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFDN0MsdUJBQXVCLEVBQ3ZCLHVCQUF1QixFQUN2QixzQkFBc0IsRUFDdEIsa0JBQWtCLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLElBQUksMENBQWEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUM3Qyx1QkFBdUIsRUFDdkIsdUJBQXVCLEVBQ3ZCLHNCQUFzQixFQUN0QixrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsSUFBSSwwQ0FBYSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQzdDLHVCQUF1QixFQUN2Qix1QkFBdUIsRUFDdkIsc0JBQXNCLEVBQ3RCLGtCQUFrQixDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxJQUFJLDBDQUFhLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFDOUMsdUJBQXVCLEVBQ3ZCLHVCQUF1QixFQUN2Qix1QkFBdUIsRUFDdkIsa0JBQWtCLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLElBQUksMENBQWEsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUM5QyxzQkFBc0IsRUFDdEIsb0JBQW9CLEVBQ3BCLHVCQUF1QixFQUN2QixrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsSUFBSSwwQ0FBYSxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQzlDLG9CQUFvQixFQUNwQix3QkFBd0IsRUFDeEIsc0JBQXNCLEVBQ3RCLGtCQUFrQixDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxJQUFJLDBDQUFhLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFDOUMsdUJBQXVCLEVBQ3ZCLHVCQUF1QixFQUN2Qix3QkFBd0IsRUFDeEIsa0JBQWtCLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLElBQUksMENBQWEsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUM5Qyx1QkFBdUIsRUFDdkIsdUJBQXVCLEVBQ3ZCLDJCQUEyQixFQUMzQixrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsSUFBSSwwQ0FBYSxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQy9DLHVCQUF1QixFQUN2Qix1QkFBdUIsRUFDdkIsdUJBQXVCLEVBQ3ZCLGtCQUFrQixDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxJQUFJLDBDQUFhLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFDL0MscUJBQXFCLEVBQ3JCLHdCQUF3QixFQUN4QixzQkFBc0IsRUFDdEIsa0JBQWtCLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLElBQUksMENBQWEsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUMvQyxzQkFBc0IsRUFDdEIsd0JBQXdCLEVBQ3hCLHNCQUFzQixFQUN0QixrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsSUFBSSwwQ0FBYSxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQy9DLHVCQUF1QixFQUN2Qix1QkFBdUIsRUFDdkIsc0JBQXNCLEVBQ3RCLGtCQUFrQixDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxJQUFJLDBDQUFhLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFDL0MsdUJBQXVCLEVBQ3ZCLHNCQUFzQixFQUN0Qix1QkFBdUIsRUFDdkIsa0JBQWtCLENBQUMsQ0FBQztRQUU1QixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztZQUNuQyxRQUFRO1lBQ04sTUFBTSxXQUFXLEdBQUcsSUFBSSx3Q0FBVyxFQUFFLENBQUM7WUFDcEMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUvQix3QkFBd0I7WUFDdEIsTUFBTSxTQUFTLEdBQUc7Z0JBQ1osdUJBQXVCO2dCQUN2Qix1QkFBdUI7Z0JBQ3ZCLHNCQUFzQjtnQkFDdEIsdUJBQXVCO2dCQUN2Qix1QkFBdUI7Z0JBQ3ZCLHVCQUF1QjtnQkFDdkIsdUJBQXVCO2dCQUN2QixzQkFBc0I7Z0JBQ3RCLHdCQUF3QjtnQkFDeEIsd0JBQXdCO2dCQUN4Qix1QkFBdUI7Z0JBQ3ZCLHNCQUFzQjtnQkFDdEIsc0JBQXNCO2dCQUN0QixzQkFBc0I7Z0JBQ3RCLHVCQUF1QjthQUM5QixDQUFDO1lBRUYsV0FBVztZQUNULE1BQU0sU0FBUyxHQUFHO2dCQUNoQixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO2dCQUNsQixPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSx3Q0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFDO2dCQUM1QyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSx3Q0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsU0FBUzthQUM3RCxDQUFDO1lBQ0YsY0FBYztZQUNaLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUNwQixZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxtREFBc0IsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNELElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUNwQixZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxpREFBb0IsQ0FBQztnQkFDM0MsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLFlBQVksRUFBRTs7Ozs7OztTQU9iO2dCQUNELGNBQWMsRUFBRTs7Ozs7Ozs7OztTQVVmO2dCQUNELFdBQVcsRUFBRSxJQUFJO2dCQUNqQixRQUFRLEVBQUUsbURBQXNCO2FBQ25DLENBQUMsQ0FBQztZQUNMLGdCQUFnQjtZQUNkLElBQUksSUFBSSxHQUFHLElBQUksdUNBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNyQixXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLHFCQUFxQjtZQUNmLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2xHLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDL0I7UUFHSCxNQUFNO1FBQ0osSUFBSSxlQUFlLEdBQUcsR0FBRyxFQUFFO1lBQzdCLFVBQVU7WUFDUixNQUFNLFlBQVksR0FBRyxJQUFJLGlEQUFvQixFQUFFLENBQUM7WUFDbEQsYUFBYTtZQUNULElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxpREFBb0IsQ0FBQztnQkFDekMsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsUUFBUSxFQUFFLG1EQUFzQjtnQkFDaEMsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixPQUFPLEVBQUUsR0FBRzthQUNmLENBQUM7WUFDTixhQUFhO1lBQ1gsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUMsV0FBVztZQUNwQyxNQUFNLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEQsSUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDO1lBRXhCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLEVBQUUsRUFBRSxDQUFDLEVBQUM7Z0JBQ25DLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsRUFBRSxDQUFDLENBQUMsTUFBTTtnQkFDeEQsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO2dCQUN2RCxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU07YUFFekQ7WUFDQyxZQUFZLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBQyxJQUFJLGtEQUFxQixDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pGLGlCQUFpQjtZQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSx5Q0FBWSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkUsVUFBVTtZQUNSLE1BQU0sYUFBYSxHQUFHLElBQUksaURBQW9CLEVBQUUsQ0FBQztZQUNuRCxVQUFVO1lBQ1IsTUFBTSxhQUFhLEdBQUcsSUFBSSxpREFBb0IsQ0FBQztnQkFDM0MsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsUUFBUSxFQUFFLG1EQUFzQjtnQkFDaEMsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixPQUFPLEVBQUUsR0FBRzthQUNmLENBQUM7WUFDSixhQUFhO1lBQ1gsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsV0FBVztZQUN0QyxNQUFNLFVBQVUsR0FBRyxJQUFJLFlBQVksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBTSxjQUFjLEdBQUcsQ0FBQyxDQUFDO1lBRTNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLEVBQUUsRUFBRSxDQUFDLEVBQUM7Z0JBQ2xDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsRUFBRSxDQUFDLENBQUMsTUFBTTtnQkFDMUQsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO2dCQUN6RCxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU07YUFDN0Q7WUFDRyxhQUFhLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBQyxJQUFJLGtEQUFxQixDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25GLGlCQUFpQjtZQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSx5Q0FBWSxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUMvRCxTQUFTO1lBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBQ0MsZUFBZSxFQUFFLENBQUM7UUFFcEIsb0JBQW9CO1FBQ2xCLElBQUksYUFBYSxHQUFHLEVBQUMsV0FBVyxFQUFHLEdBQUcsRUFBQyxDQUFDO1FBRXhDLElBQUksYUFBYSxHQUFHLEdBQUcsRUFBRTtZQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDO1FBRTFELENBQUM7UUFDRCxZQUFZO1FBQ1YsTUFBTSxTQUFTLEdBQUcsSUFBSSxvREFBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLFdBQVcsRUFBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMscURBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZJLE1BQU0sVUFBVSxHQUFHLElBQUksb0RBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxXQUFXLEVBQUcsQ0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLHFEQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVySSxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVCLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUIsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBR3RCLFNBQVM7UUFDUCxJQUFJLE9BQU8sR0FBRyxDQUFDLFdBQW1CLEVBQUUsV0FBbUIsRUFBRyxFQUFFO1lBQzVELElBQUksTUFBTSxHQUFHLElBQUksMkNBQWMsQ0FBQztZQUNoQyxNQUFNLFNBQVMsR0FBRyxJQUFJLDhFQUFTLEVBQUUsQ0FBQztZQUNoQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUN2QyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU0sU0FBUyxHQUFHLElBQUksOEVBQVMsRUFBRSxDQUFDO2dCQUM5QixTQUFTLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNqQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUM7WUFDSixDQUFDLENBQUM7WUFDRSxPQUFPLE1BQU0sQ0FBQztRQUNwQixDQUFDO1FBRUMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUM1QyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTVCLGFBQWE7UUFDWCxNQUFNLFVBQVUsR0FBRyxJQUFJLG1EQUFzQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6RCxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sV0FBVyxHQUFHLElBQUksbURBQXNCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFELFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QixNQUFNLFdBQVcsR0FBRyxJQUFJLG1EQUFzQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxRCxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVoQyxTQUFTO1FBQ1AsSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFpQixFQUFFLEVBQWlCLEVBQ3ZDLEVBQWlCLEVBQUUsRUFBaUIsRUFBRSxDQUFTLEVBQW9CLEVBQUU7WUFDakYsTUFBTSxNQUFNLEdBQUcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUM5RyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFDL0UsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FB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QUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEcsSUFBSSwwQ0FBYSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FB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QUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hHLElBQUksMENBQWEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFD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Q0FBQztJQUMvRSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQyxDQUFDOzs7Ozs7O1VDMXBCRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNLHFCQUFxQjtXQUMzQjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTs7Ozs7VUVoREE7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NncHJlbmRlcmluZy8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2dwcmVuZGVyaW5nL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL2NvbnRyb2xzL09yYml0Q29udHJvbHNcIjtcbmltcG9ydCAqIGFzIFRXRUVOIGZyb20gXCJAdHdlZW5qcy90d2Vlbi5qc1wiO1xuaW1wb3J0IHsgTVRMTG9hZGVyIH0gZnJvbSAndGhyZWUvZXhhbXBsZXMvanNtL2xvYWRlcnMvTVRMTG9hZGVyLmpzJztcbmltcG9ydCB7IE9CSkxvYWRlciB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9sb2FkZXJzL09CSkxvYWRlci5qcyc7XG5cbmNsYXNzIFRocmVlSlNDb250YWluZXIge1xuICAgIHByaXZhdGUgc2NlbmU6IFRIUkVFLlNjZW5lO1xuICAgIHByaXZhdGUgbGlnaHQ6IFRIUkVFLkxpZ2h0O1xuICAgIHByaXZhdGUgY2FtZXJhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcbiAgICBwcml2YXRlIG9yYml0Q29udHJvbHMgOk9yYml0Q29udHJvbHM7XG4gICAgcHJpdmF0ZSByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlcjtcbiAgICBwcml2YXRlIGNsb2NrOiBUSFJFRS5DbG9jaztcbiAgICBwcml2YXRlIG1ldGVvckdyb3VwczogVEhSRUUuR3JvdXBbXTtcbiAgICBwcml2YXRlIHNoaW5lU3RlcjpUSFJFRS5Qb2ludHM7XG4gICAgcHJpdmF0ZSBzdGVyOlRIUkVFLlBvaW50cztcbiAgICBwcml2YXRlIHN0ZXJNYXRlcmlhbDogVEhSRUUuUG9pbnRzTWF0ZXJpYWw7XG4gIFxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gIC8vIOeUu+mdoumDqOWIhuOBruS9nOaIkCjooajnpLrjgZnjgovmnqDjgZTjgajjgaspKlxucHVibGljIGNyZWF0ZVJlbmRlcmVyRE9NID0gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjYW1lcmFQb3M6IFRIUkVFLlZlY3RvcjMpID0+IHtcbiAgICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcbiAgICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgICByZW5kZXJlci5zZXRDbGVhckNvbG9yKG5ldyBUSFJFRS5Db2xvcigweDAxMEIxMykpO1xuICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlOyAvL+OCt+ODo+ODieOCpuODnuODg+ODl+OCkuacieWKueOBq+OBmeOCi1xuXG4gICAgIC8v44Kr44Oh44Op44Gu6Kit5a6aXG4gICAgICBjb25zdCBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHdpZHRoIC8gaGVpZ2h0LCAwLjEsIDEwMDApO1xuICAgICAgY2FtZXJhLnBvc2l0aW9uLmNvcHkoY2FtZXJhUG9zKTtcbiAgICAgIGNhbWVyYS5sb29rQXQobmV3IFRIUkVFLlZlY3RvcjMoKSk7XG4gICAgICB0aGlzLm9yYml0Q29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XG5cbiAgICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICAgIHRoaXMuY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcblxuXG4gICAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7XG4gICAgLy8g5q+O44OV44Os44O844Og44GudXBkYXRl44KS5ZG844KT44Gn77yMcmVuZGVyXG4gICAgLy8gcmVxZXN0QW5pbWF0aW9uRnJhbWUg44Gr44KI44KK5qyh44OV44Os44O844Og44KS5ZG844G2XG4gICAgICBjb25zdCByZW5kZXI6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgIHRoaXMub3JiaXRDb250cm9scy51cGRhdGUoKTtcblxuICAgICAgcmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIGNhbWVyYSk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcbiAgICB9XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblxuICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5jc3NGbG9hdCA9IFwibGVmdFwiO1xuICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5tYXJnaW4gPSBcIjEwcHhcIjtcbiAgICAgIHJldHVybiByZW5kZXJlci5kb21FbGVtZW50O1xuICAgIH1cblxuICAgIC8vIOOCt+ODvOODs+OBruS9nOaIkCjlhajkvZPjgacx5ZueKVxucHJpdmF0ZSBjcmVhdGVTY2VuZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblxuXG4gICAgLy/jgqrjg7zjg63jg6nkvZzmiJDvvIjvvJLnqK7poZ7vvIkgICBcbiAgICAgIGNvbnN0IHVuaWZvcm1zMSA9IHtcbiAgICAgIHRpbWU6IHsgdmFsdWU6IDAgfSxcbiAgICAgIHVDb2xvcjE6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigweDc4RUZGQSkgfSwgLy8g5rC06ImyXG4gICAgICB1Q29sb3IyOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMHgwMGZmZDkpIH0gIC8vIOmdkue3kVxuICAgIH07XG5cbiAgICAgIGNvbnN0IGF1cm9yYU1hdGVyaWFsID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKHtcbiAgICAgIHVuaWZvcm1zOiB1bmlmb3JtczEsXG4gICAgICB2ZXJ0ZXhTaGFkZXI6IGBcbiAgICAgICAgdW5pZm9ybSBmbG9hdCB0aW1lO1xuICAgICAgICB2YXJ5aW5nIHZlYzIgdlV2O1xuICAgICAgICB2b2lkIG1haW4oKSB7XG4gICAgICAgIHZVdiA9IHV2O1xuICAgICAgICB2ZWMzIHBvcyA9IHBvc2l0aW9uO1xuICAgIC8vIHnmlrnlkJHjgavmj7rjgozjgIDopIfmlbDmjK/luYXntYTjgb/lkIjjgo/jgZtcbiAgICAgICAgZmxvYXQgd2F2ZVkgPSBzaW4ocG9zLnggKiA1LjAgKyB0aW1lICogMi4wKSAqIDAuMSBcbiAgICAgICAgICAgICAgICAgICAgKyBzaW4ocG9zLnggKiAxMC4wICsgdGltZSAqIDMuNSkgKiAwLjE1IFxuICAgICAgICAgICAgICAgICAgICArIHNpbihwb3MueCAqIDMuMCArIHRpbWUgKiAxLjAgKyBwb3MueSAqIDIuMCkgKiAwLjAzO1xuICAgICAgICBwb3MueSArPSB3YXZlWTtcblxuICAgIC8vIHrmlrnlkJHjga7mj7rjgozjgoJcbiAgICAgICAgZmxvYXQgd2F2ZVogPSBzaW4ocG9zLnggKiAzLjAgKyBwb3MueSAqIDQuMCArIHRpbWUgKiAzLjApICogMC4xO1xuICAgICAgICBwb3MueiArPSB3YXZlWjtcbiAgICAgICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3MsIDEuMCk7XG4gICAgfVxuICAgICAgYCxcbiAgICAgIGZyYWdtZW50U2hhZGVyOiBgXG4gICAgICAgIHVuaWZvcm0gZmxvYXQgdGltZTtcbiAgICAgICAgdW5pZm9ybSB2ZWMzIHVDb2xvcjE7XG4gICAgICAgIHVuaWZvcm0gdmVjMyB1Q29sb3IyO1xuICAgICAgICB2YXJ5aW5nIHZlYzIgdlV2O1xuICAgIC8vIOmggueCueOCq+ODqeODvOioreWumuOAgOOCsOODqeODh+ODvOOCt+ODp+ODs+OBp1xuICAgICAgICB2b2lkIG1haW4oKSB7XG4gICAgICAgICAgZmxvYXQgc3RyZW5ndGggPSBzbW9vdGhzdGVwKDAuMCwgMS4wLCB2VXYueSk7XG4gICAgICAgICAgdmVjMyBjb2xvciA9IG1peCh1Q29sb3IxLCB1Q29sb3IyLCB2VXYueSArIDAuMSAqIHNpbih0aW1lICogMS41ICsgdlV2LnggKiAxMC4wKSk7XG4gICAgICAgICAgZ2xfRnJhZ0NvbG9yID0gdmVjNChjb2xvciAqIHN0cmVuZ3RoLCBzdHJlbmd0aCk7XG4gICAgICB9XG4gICAgICAgIGAsXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nXG4gICAgfSk7XG5cbiAgICAgbGV0IGF1cm9yYU51bSA9IDEwMDtcbiAgICAgIGNvbnN0IGF1cm9yYUdlb21ldHJ5ID0gW107XG4gICAgICBmb3IobGV0IGkgPSAwOyBpPGF1cm9yYU51bTsgaSsrKXtcbiAgICAgIGF1cm9yYUdlb21ldHJ5W2ldID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoTWF0aC5yYW5kb20oKSAqIDE1LCBNYXRoLnJhbmRvbSgpKjUsIDEwMCwgMTAwKTtcbiAgICAgIFxuICAgIGNvbnN0IGF1cm9yYSA9IG5ldyBUSFJFRS5NZXNoKGF1cm9yYUdlb21ldHJ5W2ldLCBhdXJvcmFNYXRlcmlhbCk7XG4gICAgICBhdXJvcmEucG9zaXRpb24ueCA9IC0xMCArIE1hdGgucmFuZG9tKCkgKiAyO1xuICAgICAgYXVyb3JhLnBvc2l0aW9uLnkgPSAxLjUgKyBNYXRoLnJhbmRvbSgpO1xuICAgICAgYXVyb3JhLnBvc2l0aW9uLnogPSAtMTAgKyBNYXRoLnJhbmRvbSgpICogMTU7XG4gICAgICBhdXJvcmEucm90YXRpb24ueSA9IE1hdGguUEkvMztcbiAgICB0aGlzLnNjZW5lLmFkZChhdXJvcmEpO1xuICAgICAgfVxuICAgIGNvbnN0IHVuaWZvcm1zMiA9IHtcbiAgICAgIHRpbWU6IHsgdmFsdWU6IDAgfSxcbiAgICAgIHVDb2xvcjE6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcigweEZGRkZGRikgfSwgLy8g55m9XG4gICAgICB1Q29sb3IyOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMHhGRjI2RUEpIH0gIC8vIOODlOODs+OCr1xuICAgIH07XG5cbiAgICBjb25zdCBtYXRlcmlhbDIgPSBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoe1xuICAgICAgdW5pZm9ybXM6IHVuaWZvcm1zMixcbiAgICAgIHZlcnRleFNoYWRlcjogYFxuICAgICAgICB1bmlmb3JtIGZsb2F0IHRpbWU7XG4gICAgICAgIHZhcnlpbmcgdmVjMiB2VXY7XG4gICAgICAgIHZvaWQgbWFpbigpIHtcbiAgICAgICAgdlV2ID0gdXY7XG4gICAgICAgIHZlYzMgcG9zID0gcG9zaXRpb247XG4gICAgLy8geeaWueWQkeOBq+aPuuOCjOOAgOikh+aVsOaMr+W5hee1hOOBv+WQiOOCj+OBm1xuICAgICAgICBmbG9hdCB3YXZlWSA9IHNpbihwb3MueCAqIDUuMCArIHRpbWUgKiAyLjApICogMC4xIFxuICAgICAgICAgICAgICAgICAgICArIHNpbihwb3MueCAqIDEwLjAgKyB0aW1lICogMy41KSAqIDAuMTUgXG4gICAgICAgICAgICAgICAgICAgICsgc2luKHBvcy54ICogMy4wICsgdGltZSAqIDEuMCArIHBvcy55ICogMi4wKSAqIDAuMDM7XG4gICAgICAgIHBvcy55ICs9IHdhdmVZO1xuICAgICAgICAvLyB65pa55ZCR44Gu5o+644KM44KCXG4gICAgICAgIGZsb2F0IHdhdmVaID0gc2luKHBvcy54ICogMy4wICsgcG9zLnkgKiA0LjAgKyB0aW1lICogMy4wKSAqIDAuMTtcbiAgICAgICAgcG9zLnogKz0gd2F2ZVo7XG4gICAgICAgIGdsX1Bvc2l0aW9uID0gcHJvamVjdGlvbk1hdHJpeCAqIG1vZGVsVmlld01hdHJpeCAqIHZlYzQocG9zLCAxLjApO1xuICAgIH1cbiAgICAgIGAsXG4gICAgICBmcmFnbWVudFNoYWRlcjogYFxuICAgICAgICB1bmlmb3JtIGZsb2F0IHRpbWU7XG4gICAgICAgIHVuaWZvcm0gdmVjMyB1Q29sb3IxO1xuICAgICAgICB1bmlmb3JtIHZlYzMgdUNvbG9yMjtcbiAgICAgICAgdmFyeWluZyB2ZWMyIHZVdjtcbiAgICAvLyDpoILngrnjgqvjg6njg7zoqK3lrprjgIDjgrDjg6njg4fjg7zjgrfjg6fjg7PjgadcbiAgICAgICAgdm9pZCBtYWluKCkge1xuICAgICAgICBmbG9hdCBzdHJlbmd0aCA9IHNtb290aHN0ZXAoMC4wLCAxLjAsIHZVdi55KTtcbiAgICAgICAgdmVjMyBjb2xvciA9IG1peCh1Q29sb3IxLCB1Q29sb3IyLCB2VXYueSArIDAuMSAqIHNpbih0aW1lICogMS41ICsgdlV2LnggKiAxMC4wKSk7XG4gICAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoY29sb3IgKiBzdHJlbmd0aCwgc3RyZW5ndGgpO1xuICAgIH1cbiAgICAgIGAsXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nXG4gIH0pO1xuXG4gICAgLy/jgqrjg7zjg63jg6njga7kvY3nva7oqK3lrppcbiAgICBcbiAgICAgIGNvbnN0IGF1cm9yYUdlb21ldHJ5MiA9W107XG4gICAgICBmb3IobGV0IGkgPSAwOyBpPGF1cm9yYU51bTsgaSsrKXtcbiAgICAgICBhdXJvcmFHZW9tZXRyeTJbaV0gPSBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeShNYXRoLnJhbmRvbSgpICogMTUsIE1hdGgucmFuZG9tKCkqNSwgMTAwLCAxMDApO1xuICAgICAgY29uc3QgYXVyb3JhMiA9IG5ldyBUSFJFRS5NZXNoKGF1cm9yYUdlb21ldHJ5MltpXSwgbWF0ZXJpYWwyKTtcbiAgICAgIGF1cm9yYTIucG9zaXRpb24ueCA9IE1hdGgucmFuZG9tKCkgKiAxMDtcbiAgICAgIGF1cm9yYTIucG9zaXRpb24ueSA9IDMgKyBNYXRoLnJhbmRvbSgpICogMjtcbiAgICAgIGF1cm9yYTIucG9zaXRpb24ueiA9IDEwICsgTWF0aC5yYW5kb20oKSAqIDEwOyBcbiAgICAgIGF1cm9yYTIucm90YXRpb24ueSA9IE1hdGguUEk7XG4gICAgICB0aGlzLnNjZW5lLmFkZChhdXJvcmEyKTtcbiAgICAgIH1cblxuICAgIC8v5rWB5pif576k44Gu5L2c5oiQXG4gICAgICB0aGlzLm1ldGVvckdyb3VwcyA9IFtdO1xuICAgICAgbGV0IGdlbmVyYXRlU3ByaXRlID0gKGNvbG9yMTpzdHJpbmcsIGNvbG9yMjpzdHJpbmcsIGNvbG9yMzpzdHJpbmcsIGNvbG9yNDpzdHJpbmcpID0+e1xuXG4gICAgLy/mlrDjgZfjgYTjgq3jg6Pjg7Pjg5Djgrnjga7kvZzmiJBcbiAgICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICBjYW52YXMud2lkdGggPSAxNjtcbiAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gMTY7XG4gICAgXG4gICAgLy/lhoblvaLjga7jgrDjg6njg4fjg7zjgrfjg6fjg7Pjga7kvZzmiJBcbiAgICAgIGxldCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBsZXQgZ3JhZGllbnQgPSBjb250ZXh0LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyLCAwLCBjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMiwgY2FudmFzLndpZHRoIC8gMik7XG4gICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIGNvbG9yMSk7XG4gICAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMiwgY29sb3IyKTtcbiAgICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC42LCBjb2xvcjMpO1xuICAgICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBjb2xvcjQpO1xuICAgICAgICBcbiAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAvL+ODhuOCr+OCueODgeODo+OBrueUn+aIkFxuICAgICAgbGV0IHRleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZShjYW52YXMpO1xuICAgICAgICAgIHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRleHR1cmU7XG4gICAgfVxuICAgIC8v5rWB5pif77yI5Lit5b+D6YOo5YiG77yJXG4gICAgICBsZXQgY3JlYXRlTWV0ZW9yID0gKHBvc2l0aW9uOlRIUkVFLlZlY3RvcjMsY29sb3IxOnN0cmluZywgY29sb3IyOnN0cmluZywgY29sb3IzOnN0cmluZywgY29sb3I0OnN0cmluZykgPT57XG4gICAgICBsZXQgTWV0ZW9yR2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkoW3Bvc2l0aW9uLngsIHBvc2l0aW9uLnksIHBvc2l0aW9uLnpdKTtcbiAgICAgIE1ldGVvckdlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBvc2l0aW9ucywgMykpO1xuXG4gICAgICBsZXQgTWV0ZW9yTWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgICAgICAgICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgICAgICAgICAgc2l6ZTogMSxcbiAgICAgICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgICAgICAgIG1hcDogZ2VuZXJhdGVTcHJpdGUoY29sb3IxLGNvbG9yMixjb2xvcjMsY29sb3I0KVxuICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gbmV3IFRIUkVFLlBvaW50cyhNZXRlb3JHZW9tZXRyeSwgTWV0ZW9yTWF0ZXJpYWwpO1xuICAgIH1cblxuICAgIC8vMTXlgIvjga7mtYHmmJ/jgIDkuK3lv4Pjga7oibLoqK3lrppcbiAgICAgIGNvbnN0IG1ldGVvciA9IFtdO1xuICAgICAgICBtZXRlb3JbMF0gPSBjcmVhdGVNZXRlb3IobmV3IFRIUkVFLlZlY3RvcjMoMCw1LDApLFxuICAgICAgICAgICAgJ3JnYmEoMzQsIDIzNSwgMjE4LCAxKScsXG4gICAgICAgICAgICAncmdiYSg4NiwgMjExLCAxOTMsIDEpJyxcbiAgICAgICAgICAgICdyZ2JhKDAsIDE5MSwgMjU1LCAxKScsXG4gICAgICAgICAgICAncmdiYSgwLCAwLCAwLCAxKScpO1xuXG4gICAgICAgIG1ldGVvclsxXSA9IGNyZWF0ZU1ldGVvcihuZXcgVEhSRUUuVmVjdG9yMygyLDUsMCksXG4gICAgICAgICAgICAncmdiYSgzNCwgMjM1LCAxMDQsIDEpJyxcbiAgICAgICAgICAgICdyZ2JhKDg2LCAyMTEsIDEwNSwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMCwgMjU1LCA4MSwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMCwgMCwgMCwgMSknKTtcbiAgICAgICAgbWV0ZW9yWzJdID0gY3JlYXRlTWV0ZW9yKG5ldyBUSFJFRS5WZWN0b3IzKDQsNSwwKSxcbiAgICAgICAgICAgICdyZ2JhKDM0LCAxNDgsIDIzNSwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoODYsIDEyMywgMjExLCAxKScsXG4gICAgICAgICAgICAncmdiYSgwLCAyNTUsIDI1NSwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMCwgMCwgMCwgMSknKTtcbiAgICAgICAgbWV0ZW9yWzNdID0gY3JlYXRlTWV0ZW9yKG5ldyBUSFJFRS5WZWN0b3IzKDYsNSwwKSxcbiAgICAgICAgICAgICdyZ2JhKDIxNSwgMzQsIDIzNSwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMjExLCA4NiwgMjExLCAxKScsXG4gICAgICAgICAgICAncmdiYSgxNjYsIDAsIDI1NSwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMCwgMCwgMCwgMSknKTtcbiAgICAgICAgbWV0ZW9yWzRdID0gY3JlYXRlTWV0ZW9yKG5ldyBUSFJFRS5WZWN0b3IzKDgsNSwwKSxcbiAgICAgICAgICAgICdyZ2JhKDIzNSwgMzQsIDE3NSwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMjExLCA4NiwgMTc4LCAxKScsXG4gICAgICAgICAgICAncmdiYSgyNTUsIDAsIDE3OSwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMCwgMCwgMCwgMSknKTtcbiAgICAgICAgbWV0ZW9yWzVdID0gY3JlYXRlTWV0ZW9yKG5ldyBUSFJFRS5WZWN0b3IzKDEwLDUsMCksXG4gICAgICAgICAgICAncmdiYSgyMjQsIDI1NSwgODYsIDEpJyxcbiAgICAgICAgICAgICdyZ2JhKDI1NSwgMjUyLCA3OCwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMjQyLCAyNTUsIDUzLCAxKScsXG4gICAgICAgICAgICAncmdiYSgwLCAwLCAwLCAxKScpO1xuICAgICAgICBtZXRlb3JbNl0gPSBjcmVhdGVNZXRlb3IobmV3IFRIUkVFLlZlY3RvcjMoMTIsNSwwKSxcbiAgICAgICAgICAgICdyZ2JhKDI1NSwgMTQ3LCA3LCAxKScsXG4gICAgICAgICAgICAncmdiYSgyNDksIDEsIDEsIDEpJyxcbiAgICAgICAgICAgICdyZ2JhKDI1NSwgMTg2LCA3NSwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMCwgMCwgMCwgMSknKTtcbiAgICAgICAgbWV0ZW9yWzddID0gY3JlYXRlTWV0ZW9yKG5ldyBUSFJFRS5WZWN0b3IzKDE0LDUsMCksXG4gICAgICAgICAgICAncmdiYSgwLCAwLCAxODEsIDEpJyxcbiAgICAgICAgICAgICdyZ2JhKDEzMiwgMjQ3LCAyNTUsIDEpJyxcbiAgICAgICAgICAgICdyZ2JhKDU4LCAyNCwgMjUwLCAxKScsXG4gICAgICAgICAgICAncmdiYSgwLCAwLCAwLCAxKScpO1xuICAgICAgICBtZXRlb3JbOF0gPSBjcmVhdGVNZXRlb3IobmV3IFRIUkVFLlZlY3RvcjMoMTYsNSwwKSxcbiAgICAgICAgICAgICdyZ2JhKDI1NSwgNjAsIDEzMSwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMjExLCA4NiwgMjExLCAxKScsXG4gICAgICAgICAgICAncmdiYSgyNTUsIDI1NSwgMjU1LCAxKScsXG4gICAgICAgICAgICAncmdiYSgwLCAwLCAwLCAxKScpO1xuICAgICAgICBtZXRlb3JbOV0gPSBjcmVhdGVNZXRlb3IobmV3IFRIUkVFLlZlY3RvcjMoMTgsNSwwKSxcbiAgICAgICAgICAgICdyZ2JhKDY3LCAyNTUsIDI0MiwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoNTUsIDIzMSwgMjM3LCAxKScsXG4gICAgICAgICAgICAncmdiYSgxNDUsIDIyNywgMjUwLCAwLjg3KScsXG4gICAgICAgICAgICAncmdiYSgwLCAwLCAwLCAxKScpO1xuICAgICAgICBtZXRlb3JbMTBdID0gY3JlYXRlTWV0ZW9yKG5ldyBUSFJFRS5WZWN0b3IzKDEwLDUsMCksXG4gICAgICAgICAgICAncmdiYSgyNTUsIDEwMywgNTcsIDEpJyxcbiAgICAgICAgICAgICdyZ2JhKDI1NSwgMjUyLCA3OCwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMjQyLCAyNTUsIDUzLCAxKScsXG4gICAgICAgICAgICAncmdiYSgwLCAwLCAwLCAxKScpO1xuICAgICAgICBtZXRlb3JbMTFdID0gY3JlYXRlTWV0ZW9yKG5ldyBUSFJFRS5WZWN0b3IzKDEyLDUsMCksXG4gICAgICAgICAgICAncmdiYSg3LCAyMywgMjU1LCAxKScsXG4gICAgICAgICAgICAncmdiYSgxLCA2NywgMjQ5LCAwLjc3KScsXG4gICAgICAgICAgICAncmdiYSgwLCAyNTUsIDIxMywgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMCwgMCwgMCwgMSknKTtcbiAgICAgICAgbWV0ZW9yWzEyXSA9IGNyZWF0ZU1ldGVvcihuZXcgVEhSRUUuVmVjdG9yMygxNCw1LDApLFxuICAgICAgICAgICAgJ3JnYmEoMjU1LCAwLCAyNDcsIDEpJyxcbiAgICAgICAgICAgICdyZ2JhKDEzMiwgMjQ3LCAyNTUsIDEpJyxcbiAgICAgICAgICAgICdyZ2JhKDAsIDE1NywgMjU1LCAxKScsXG4gICAgICAgICAgICAncmdiYSgwLCAwLCAwLCAxKScpO1xuICAgICAgICBtZXRlb3JbMTNdID0gY3JlYXRlTWV0ZW9yKG5ldyBUSFJFRS5WZWN0b3IzKDE2LDUsMCksXG4gICAgICAgICAgICAncmdiYSgyNTUsIDYwLCAxMzEsIDEpJyxcbiAgICAgICAgICAgICdyZ2JhKDIxMSwgODYsIDIxMSwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMjI1LCAzMiwgMzIsIDEpJyxcbiAgICAgICAgICAgICdyZ2JhKDAsIDAsIDAsIDEpJyk7XG4gICAgICAgIG1ldGVvclsxNF0gPSBjcmVhdGVNZXRlb3IobmV3IFRIUkVFLlZlY3RvcjMoMTgsNSwwKSxcbiAgICAgICAgICAgICdyZ2JhKDIyLCAyNTUsIDE2MiwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMCwgMjA1LCAxNDcsIDEpJyxcbiAgICAgICAgICAgICdyZ2JhKDIzLCAyMzAsIDE3NSwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMCwgMCwgMCwgMSknKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGk8bWV0ZW9yLmxlbmd0aDtpKyspe1xuICAgIC8v44Kw44Or44O844OX5YyWIFxuICAgICAgY29uc3QgbWV0ZW9yR3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICAgICAgbWV0ZW9yR3JvdXAuYWRkKG1ldGVvcltpXSk7XG4gICAgXG4gICAgLy/mtYHmmJ/jgIDlsL7jga7pg6jliIbjga7oibLoqK3lrprvvIjkuK3lv4Pjga7oibLjgajlkIjjgo/jgZvjgabvvIlcbiAgICAgIGNvbnN0IHRhaWxDb2xvciA9IFtcbiAgICAgICAgICAgICdyZ2JhKDg2LCAyMTEsIDE5MywgMSknLFxuICAgICAgICAgICAgJ3JnYmEoODYsIDIxMSwgMTA1LCAxKScsXG4gICAgICAgICAgICAncmdiYSgwLCAyNTUsIDI1NSwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMjExLCA4NiwgMjExLCAxKScsXG4gICAgICAgICAgICAncmdiYSgyMTEsIDg2LCAxNzgsIDEpJyxcbiAgICAgICAgICAgICdyZ2JhKDI0MiwgMjU1LCA1MywgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMjU1LCAxODYsIDc1LCAxKScsXG4gICAgICAgICAgICAncmdiYSg1OCwgMjQsIDI1MCwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMTQ1LCAyMjcsIDI1MCwgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMjQyLCAyNTUsIDUzLCAxKScsXG4gICAgICAgICAgICAncmdiYSgwLCAyNTUsIDIxMywgMSknLFxuICAgICAgICAgICAgJ3JnYmEoMCwgMTU3LCAyNTUsIDEpJyxcbiAgICAgICAgICAgICdyZ2JhKDIyNSwgMzIsIDMyLCAxKScsXG4gICAgICAgICAgICAncmdiYSgyMywgMjMwLCAxNzUsIDEpJyxcbiAgICBdO1xuXG4gICAgLy/lsL7jgIDjgrDjg6njg4fjg7zjgrfjg6fjg7NcbiAgICAgIGNvbnN0IHVuaWZvcm1zMyA9IHtcbiAgICAgICAgdGltZTogeyB2YWx1ZTogMCB9LFxuICAgICAgICB1Q29sb3IxOiB7IHZhbHVlOiBuZXcgVEhSRUUuQ29sb3IoMHhGRkZGRkYpfSwgLy/nmb0gXG4gICAgICAgIHVDb2xvcjI6IHsgdmFsdWU6IG5ldyBUSFJFRS5Db2xvcih0YWlsQ29sb3JbaV0pfSAvL+a1geaYn+OBlOOBqOOBq+ioreWumlxuICAgIH07XG4gICAgLy/phY3liJfjgavjgZfjgabmtYHmmJ/jgZTjgajjgavkvZzmiJBcbiAgICAgIGxldCB0YWlsR2VvbWV0cnkgPSBbXTtcbiAgICAgICAgdGFpbEdlb21ldHJ5W2ldID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC4xLDAuMSwyMCk7XG4gICAgICBsZXQgdGFpbE1hdGVyaWFsID0gW107XG4gICAgICAgIHRhaWxNYXRlcmlhbFtpXSA9IG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCh7XG4gICAgICAgIHVuaWZvcm1zOiB1bmlmb3JtczMsXG4gICAgICAgIHZlcnRleFNoYWRlcjogYFxuICAgICAgICAgIHZhcnlpbmcgdmVjMiB2VXY7XG4gICAgICAgICAgdm9pZCBtYWluKCkge1xuICAgICAgICAgIHZVdiA9IHV2O1xuICAgICAgICAgIHZlYzMgcG9zID0gcG9zaXRpb247XG4gICAgICAgICAgZ2xfUG9zaXRpb24gPSBwcm9qZWN0aW9uTWF0cml4ICogbW9kZWxWaWV3TWF0cml4ICogdmVjNChwb3MsIDEuMCk7XG4gICAgICB9XG4gICAgICAgIGAsXG4gICAgICAgIGZyYWdtZW50U2hhZGVyOiBgXG4gICAgICAgICAgdW5pZm9ybSBmbG9hdCB0aW1lO1xuICAgICAgICAgIHVuaWZvcm0gdmVjMyB1Q29sb3IxO1xuICAgICAgICAgIHVuaWZvcm0gdmVjMyB1Q29sb3IyO1xuICAgICAgICAgIHZhcnlpbmcgdmVjMiB2VXY7XG4gICAgICAgICAgdm9pZCBtYWluKCkge1xuICAgICAgICAgIGZsb2F0IHN0cmVuZ3RoID0gc21vb3Roc3RlcCgwLjAsIDEuMCwgdlV2LnkpO1xuICAgICAgICAgIHZlYzMgY29sb3IgPSBtaXgodUNvbG9yMSwgdUNvbG9yMiwgdlV2LnkgKyAwLjEgKiBzaW4odGltZSAqIDEuNSArIHZVdi54ICogMTAuMCkpO1xuICAgICAgICAgIGdsX0ZyYWdDb2xvciA9IHZlYzQoY29sb3IgKiBzdHJlbmd0aCwgc3RyZW5ndGgpO1xuICAgICAgfVxuICAgICAgICBgLFxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmdcbiAgICB9KTtcbiAgLy/liJ3mnJ/oqK3lrprjgIDkuK3lv4Ppg6jliIbjgavlkIjjgo/jgZvjgaZcbiAgICBsZXQgdGFpbCA9IG5ldyBUSFJFRS5NZXNoKHRhaWxHZW9tZXRyeVtpXSx0YWlsTWF0ZXJpYWxbaV0pOyBcbiAgICAgICAgdGFpbC5yb3RhdGlvbi54ID0gTWF0aC5QSTsgIFxuICAgICAgICB0YWlsLnBvc2l0aW9uLnggPSBpKjI7XG4gICAgICAgIHRhaWwucG9zaXRpb24ueSA9IDE1O1xuICAgICAgICBtZXRlb3JHcm91cC5hZGQodGFpbCk7XG4gIC8v44Kw44Or44O844OX5YyW44GX44Gf5rWB5pif44Gu5L2N572u6Kit5a6a44CA44Op44Oz44OA44OgXG4gICAgICAgIG1ldGVvckdyb3VwLnBvc2l0aW9uLnNldChNYXRoLnJhbmRvbSgpICogNDAsIDMwICsgTWF0aC5yYW5kb20oKSAqIDEwMCwgLTEwMCArIE1hdGgucmFuZG9tKCkgKiA0MCk7XG4gICAgICAgIG1ldGVvckdyb3VwLnJvdGF0aW9uLnggPSAtTWF0aC5QSS84O1xuICAgICAgICB0aGlzLm1ldGVvckdyb3Vwcy5wdXNoKG1ldGVvckdyb3VwKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQobWV0ZW9yR3JvdXApO1xuICAgIH0gIFxuXG5cbiAgLy/mmJ/jga7kvZzmiJBcbiAgICBsZXQgY3JlYXRlUGFydGljbGVzID0gKCkgPT4ge1xuICAvL+OCuOOCquODoeODiOODquOBruS9nOaIkFxuICAgIGNvbnN0IHN0ZXJHZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAvL+ODnuODhuODquOCouODq+OBruS9nOaIkCAgIFxuICAgICAgdGhpcy5zdGVyTWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoeyBcbiAgICAgICAgICBzaXplOiAwLjIsIFxuICAgICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgICAgIGNvbG9yOiAweEZBRkFEMixcbiAgICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgICBvcGFjaXR5OiAwLjhcbiAgICAgIH0pIFxuICAvL3BhcnRpY2xl44Gu5L2c5oiQXG4gICAgY29uc3QgcGFydGljbGVOdW0gPSAyMDA7IC8vIOODkeODvOODhuOCo+OCr+ODq+OBruaVsFxuICAgIGNvbnN0IHBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkocGFydGljbGVOdW0gKiAzKTtcbiAgICBsZXQgICBwYXJ0aWNsZUluZGV4ID0gMDtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcnRpY2xlTnVtOyArK2kpe1xuICAgICAgcG9zaXRpb25zW3BhcnRpY2xlSW5kZXgrK10gPSA1MCpNYXRoLnJhbmRvbSgpLTI1OyAvLyB45bqn5qiZXG4gICAgICBwb3NpdGlvbnNbcGFydGljbGVJbmRleCsrXSA9IDIwKk1hdGgucmFuZG9tKCkrNTsgLy8geeW6p+aomVxuICAgICAgcG9zaXRpb25zW3BhcnRpY2xlSW5kZXgrK10gPSA1MCpNYXRoLnJhbmRvbSgpLTI1OyAvLyB65bqn5qiZXG4gICAgXG4gICAgfVxuICAgICAgc3Rlckdlb21ldHJ5LnNldEF0dHJpYnV0ZSgncG9zaXRpb24nLG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25zLDMpKTtcbiAgLy9USFJFRS5Qb2ludHPjga7kvZzmiJBcbiAgICAgIHRoaXMuc2hpbmVTdGVyID0gbmV3IFRIUkVFLlBvaW50cyhzdGVyR2VvbWV0cnksIHRoaXMuc3Rlck1hdGVyaWFsKTtcbiAgLy/jgrjjgqrjg6Hjg4jjg6rjga7kvZzmiJBcbiAgICBjb25zdCBzdGVyR2VvbWV0cnkyID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gIC8v44Oe44OG44Oq44Ki44Or44Gu5L2c5oiQXG4gICAgY29uc3Qgc3Rlck1hdGVyaWFsMiA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7IFxuICAgICAgICBzaXplOiAwLjEsIFxuICAgICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcbiAgICAgICAgY29sb3I6IDB4RkFGQUQyLFxuICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIG9wYWNpdHk6IDAuOVxuICAgIH0pIFxuICAvL3BhcnRpY2xl44Gu5L2c5oiQXG4gICAgY29uc3QgcGFydGljbGVOdW0yID0gMTAwMDsgLy8g44OR44O844OG44Kj44Kv44Or44Gu5pWwXG4gICAgY29uc3QgcG9zaXRpb25zMiA9IG5ldyBGbG9hdDMyQXJyYXkocGFydGljbGVOdW0yICogMyk7XG4gICAgbGV0ICAgcGFydGljbGVJbmRleDIgPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydGljbGVOdW0yOyArK2kpe1xuICAgICAgcG9zaXRpb25zMltwYXJ0aWNsZUluZGV4MisrXSA9IDUwKk1hdGgucmFuZG9tKCktMjU7IC8vIHjluqfmqJlcbiAgICAgIHBvc2l0aW9uczJbcGFydGljbGVJbmRleDIrK10gPSAyMCpNYXRoLnJhbmRvbSgpKzU7IC8vIHnluqfmqJlcbiAgICAgIHBvc2l0aW9uczJbcGFydGljbGVJbmRleDIrK10gPSA1MCpNYXRoLnJhbmRvbSgpLTI1OyAvLyB65bqn5qiZXG4gIH1cbiAgICAgIHN0ZXJHZW9tZXRyeTIuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShwb3NpdGlvbnMyLDMpKTtcbiAgLy9USFJFRS5Qb2ludHPjga7kvZzmiJBcbiAgICAgIHRoaXMuc3RlciA9IG5ldyBUSFJFRS5Qb2ludHMoc3Rlckdlb21ldHJ5Miwgc3Rlck1hdGVyaWFsMik7XG4gIC8v44K344O844Oz44G444Gu6L+95YqgXG4gICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLnNoaW5lU3Rlcik7XG4gICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLnN0ZXIpO1xuICB9XG4gICAgY3JlYXRlUGFydGljbGVzKCk7XG5cbiAgLy9UV0VFTi5qc+OCouODi+ODoeODvOOCt+ODp+ODs+eUqOioreWumlxuICAgIGxldCBzdGVyVHdlZW5pbmZvID0ge3N0ZXJPcGFjaXR5IDogMC41fTtcbiAgICBcbiAgICBsZXQgdXBkYXRlT3BhY2l0eSA9ICgpID0+e1xuICAgICAgdGhpcy5zdGVyTWF0ZXJpYWwub3BhY2l0eSA9IHN0ZXJUd2VlbmluZm8uc3Rlck9wYWNpdHk7XG4gICAgXG4gIH1cbiAgLy/ngrnmu4XpoqjjgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICBjb25zdCBzdGVyU2hpbmUgPSBuZXcgVFdFRU4uVHdlZW4oc3RlclR3ZWVuaW5mbykudG8oe3N0ZXJPcGFjaXR5IDogMSB9LCAzMDAwKS5lYXNpbmcoVFdFRU4uRWFzaW5nLkVsYXN0aWMuT3V0KS5vblVwZGF0ZSh1cGRhdGVPcGFjaXR5KTtcbiAgICBjb25zdCBzdGVyVmFuaXNoID0gbmV3IFRXRUVOLlR3ZWVuKHN0ZXJUd2VlbmluZm8pLnRvKHtzdGVyT3BhY2l0eSA6IDAgfSwyMDAwKS5lYXNpbmcoVFdFRU4uRWFzaW5nLkVsYXN0aWMuT3V0KS5vblVwZGF0ZSh1cGRhdGVPcGFjaXR5KTtcblxuICAgICAgc3RlclNoaW5lLmNoYWluKHN0ZXJWYW5pc2gpO1xuICAgICAgc3RlclZhbmlzaC5jaGFpbihzdGVyU2hpbmUpO1xuICAgICAgc3RlclNoaW5lLnN0YXJ0KCk7XG5cblxuICAvL+WkqeS9v+iqreOBv+i+vOOBvyBcbiAgICBsZXQgbG9hZE9CSiA9IChvYmpGaWxlUGF0aDogc3RyaW5nLCBtdGxGaWxlUGF0aDogc3RyaW5nLCkgPT4ge1xuICAgIGxldCBvYmplY3QgPSBuZXcgVEhSRUUuT2JqZWN0M0Q7XG4gICAgY29uc3QgbXRsTG9hZGVyID0gbmV3IE1UTExvYWRlcigpO1xuICAgICAgbXRsTG9hZGVyLmxvYWQobXRsRmlsZVBhdGgsIChtYXRlcmlhbCkgPT4ge1xuICAgICAgICBtYXRlcmlhbC5wcmVsb2FkKCk7XG4gICAgY29uc3Qgb2JqTG9hZGVyID0gbmV3IE9CSkxvYWRlcigpO1xuICAgICAgICBvYmpMb2FkZXIuc2V0TWF0ZXJpYWxzKG1hdGVyaWFsKTtcbiAgICAgICAgb2JqTG9hZGVyLmxvYWQob2JqRmlsZVBhdGgsIChvYmopID0+IHtcbiAgICAgICAgb2JqZWN0LmFkZChvYmopO1xuICAgICAgfSlcbiAgICB9KVxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICB9XG5cbiAgICBjb25zdCBhbmdlbCA9IGxvYWRPQkooXCJhbmdlbC5vYmpcIiwgXCJhbmdlbC5tdGxcIik7XG4gICAgICAgIGFuZ2VsLnBvc2l0aW9uLnNldCgwLCAwLjEsIDQpO1xuICAgICAgICB0aGlzLnNjZW5lLmFkZChhbmdlbCk7XG5cbiAgLy/lpKnkvb/nlKjnhafmmI7jgIDkuInmlrnlkJHjgYvjgolcbiAgICBjb25zdCBhbmdlbExpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYsIDEpO1xuICAgICAgYW5nZWxMaWdodC5wb3NpdGlvbi5zZXQoNSwgMywgMTApOyBcbiAgICAgIGFuZ2VsTGlnaHQubG9va0F0KGFuZ2VsLnBvc2l0aW9uKTtcbiAgICAgIHRoaXMuc2NlbmUuYWRkKGFuZ2VsTGlnaHQpO1xuICAgIGNvbnN0IGFuZ2VsTGlnaHQyID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmZmZmYsIDEpO1xuICAgICAgYW5nZWxMaWdodDIucG9zaXRpb24uc2V0KC01LCAzLCAxMCk7IFxuICAgICAgYW5nZWxMaWdodDIubG9va0F0KGFuZ2VsLnBvc2l0aW9uKTtcbiAgICAgIHRoaXMuc2NlbmUuYWRkKGFuZ2VsTGlnaHQyKTtcbiAgICBjb25zdCBhbmdlbExpZ2h0MyA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmZmZmLCAxKTtcbiAgICAgIGFuZ2VsTGlnaHQzLnBvc2l0aW9uLnNldCgwICwgLTEsIC0zKTtcbiAgICAgIGFuZ2VsTGlnaHQzLmxvb2tBdChhbmdlbC5wb3NpdGlvbik7XG4gICAgICB0aGlzLnNjZW5lLmFkZChhbmdlbExpZ2h0Myk7XG5cbiAgLy/jgqjjg6vjg5/jg7zjg4jmm7Lnt5pcbiAgICBsZXQgaGVybWl0ZSA9IChwMDogVEhSRUUuVmVjdG9yMywgdjA6IFRIUkVFLlZlY3RvcjMsIFxuICAgICAgICAgICAgICAgIHAxOiBUSFJFRS5WZWN0b3IzLCB2MTogVEhSRUUuVmVjdG9yMywgdDogbnVtYmVyKSA6IChUSFJFRS5WZWN0b3IzKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKDIqdCsxKSooMS10KSooMS10KSpwMC54ICsgdCooMS10KSooMS10KSp2MC54ICsgdCp0KigzLTIqdCkqcDEueC10KnQqKDEtdCkqdjEueCxcbiAgICAgICgyKnQrMSkqKDEtdCkqKDEtdCkqcDAueSArIHQqKDEtdCkqKDEtdCkqdjAueSArIHQqdCooMy0yKnQpKnAxLnktdCp0KigxLXQpKnYxLnksXG4gICAgICAoMip0KzEpKigxLXQpKigxLXQpKnAwLnogKyB0KigxLXQpKigxLXQpKnYwLnogKyB0KnQqKDMtMip0KSpwMS56LXQqdCooMS10KSp2MS56KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDsgICBcbiAgfVxuICAgIGxldCB0ID0gMDtcblxuICAvL+WkqeS9v+eUqOWItuW+oeeCuVxuICAgIGxldCBhbmdlbFBvaW50cyA6IFRIUkVFLlZlY3RvcjNbXSA9IFtcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDEsMC41LDUpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMSwwLjUsMyksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygxLDAuNSwxKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDMsMC41LDEpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoNSwwLjUsMSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMyg2LDAuNSwwKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDUsMC41LC0xKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDMsMC41LC0xKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDEsMC41LC0xKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDEsMC41LC0zKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDEsMC41LC01KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsMC41LC02KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKC0xLDAuNSwtNSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygtMSwwLjUsLTMpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTEsMC41LC0xKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKC0zLDAuNSwtMSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygtNSwwLjUsLTEpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTYsMC41LDApLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTUsMC41LDEpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTMsMC41LDEpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTEsMC41LDEpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTEsMC41LDMpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTEsMC41LDUpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMCwwLjUsNiksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygxLDAuNSw1KVxuICAgICAgICBdXG4gICAgLy/lpKnkvb/nlKjpgJ/luqZcbiAgICBsZXQgYW5nZWxWIDpUSFJFRS5WZWN0b3IzW10gPSBbXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoYW5nZWxQb2ludHNbMV0ueCAtIGFuZ2VsUG9pbnRzWzBdLngpLDAsKGFuZ2VsUG9pbnRzWzFdLnogLSBhbmdlbFBvaW50c1swXS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoYW5nZWxQb2ludHNbMl0ueCAtIGFuZ2VsUG9pbnRzWzBdLngpLDAsKGFuZ2VsUG9pbnRzWzJdLnogLSBhbmdlbFBvaW50c1swXS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoYW5nZWxQb2ludHNbM10ueCAtIGFuZ2VsUG9pbnRzWzFdLngpLDAsKGFuZ2VsUG9pbnRzWzNdLnogLSBhbmdlbFBvaW50c1sxXS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoYW5nZWxQb2ludHNbNF0ueCAtIGFuZ2VsUG9pbnRzWzJdLngpLDAsKGFuZ2VsUG9pbnRzWzRdLnogLSBhbmdlbFBvaW50c1syXS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoYW5nZWxQb2ludHNbNV0ueCAtIGFuZ2VsUG9pbnRzWzNdLngpLDAsKGFuZ2VsUG9pbnRzWzVdLnogLSBhbmdlbFBvaW50c1szXS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoYW5nZWxQb2ludHNbNl0ueCAtIGFuZ2VsUG9pbnRzWzRdLngpLDAsKGFuZ2VsUG9pbnRzWzZdLnogLSBhbmdlbFBvaW50c1s0XS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoYW5nZWxQb2ludHNbN10ueCAtIGFuZ2VsUG9pbnRzWzVdLngpLDAsKGFuZ2VsUG9pbnRzWzddLnogLSBhbmdlbFBvaW50c1s1XS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoYW5nZWxQb2ludHNbOF0ueCAtIGFuZ2VsUG9pbnRzWzZdLngpLDAsKGFuZ2VsUG9pbnRzWzhdLnogLSBhbmdlbFBvaW50c1s2XS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoYW5nZWxQb2ludHNbOV0ueCAtIGFuZ2VsUG9pbnRzWzddLngpLDAsKGFuZ2VsUG9pbnRzWzldLnogLSBhbmdlbFBvaW50c1s3XS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoYW5nZWxQb2ludHNbMTBdLnggLSBhbmdlbFBvaW50c1s4XS54KSwwLChhbmdlbFBvaW50c1sxMF0ueiAtIGFuZ2VsUG9pbnRzWzhdLnopKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKChhbmdlbFBvaW50c1sxMV0ueCAtIGFuZ2VsUG9pbnRzWzldLngpLDAsKGFuZ2VsUG9pbnRzWzExXS56IC0gYW5nZWxQb2ludHNbOV0ueikpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoKGFuZ2VsUG9pbnRzWzEyXS54IC0gYW5nZWxQb2ludHNbMTBdLngpLDAsKGFuZ2VsUG9pbnRzWzEyXS56IC0gYW5nZWxQb2ludHNbMTBdLnopKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKChhbmdlbFBvaW50c1sxM10ueCAtIGFuZ2VsUG9pbnRzWzExXS54KSwwLChhbmdlbFBvaW50c1sxM10ueiAtIGFuZ2VsUG9pbnRzWzExXS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoYW5nZWxQb2ludHNbMTRdLnggLSBhbmdlbFBvaW50c1sxMl0ueCksMCwoYW5nZWxQb2ludHNbMTRdLnogLSBhbmdlbFBvaW50c1sxMl0ueikpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoKGFuZ2VsUG9pbnRzWzE1XS54IC0gYW5nZWxQb2ludHNbMTNdLngpLDAsKGFuZ2VsUG9pbnRzWzE1XS56IC0gYW5nZWxQb2ludHNbMTNdLnopKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKChhbmdlbFBvaW50c1sxNl0ueCAtIGFuZ2VsUG9pbnRzWzE0XS54KSwwLChhbmdlbFBvaW50c1sxNl0ueiAtIGFuZ2VsUG9pbnRzWzE0XS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoYW5nZWxQb2ludHNbMTddLnggLSBhbmdlbFBvaW50c1sxNV0ueCksMCwoYW5nZWxQb2ludHNbMTddLnogLSBhbmdlbFBvaW50c1sxNV0ueikpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoKGFuZ2VsUG9pbnRzWzE4XS54IC0gYW5nZWxQb2ludHNbMTZdLngpLDAsKGFuZ2VsUG9pbnRzWzE4XS56IC0gYW5nZWxQb2ludHNbMTZdLnopKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKChhbmdlbFBvaW50c1sxOV0ueCAtIGFuZ2VsUG9pbnRzWzE3XS54KSwwLChhbmdlbFBvaW50c1sxOV0ueiAtIGFuZ2VsUG9pbnRzWzE3XS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoYW5nZWxQb2ludHNbMjBdLnggLSBhbmdlbFBvaW50c1sxOF0ueCksMCwoYW5nZWxQb2ludHNbMjBdLnogLSBhbmdlbFBvaW50c1sxOF0ueikpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoKGFuZ2VsUG9pbnRzWzIxXS54IC0gYW5nZWxQb2ludHNbMTldLngpLDAsKGFuZ2VsUG9pbnRzWzIxXS56IC0gYW5nZWxQb2ludHNbMTldLnopKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKChhbmdlbFBvaW50c1syMl0ueCAtIGFuZ2VsUG9pbnRzWzIwXS54KSwwLChhbmdlbFBvaW50c1syMl0ueiAtIGFuZ2VsUG9pbnRzWzIwXS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoYW5nZWxQb2ludHNbMjNdLnggLSBhbmdlbFBvaW50c1syMV0ueCksMCwoYW5nZWxQb2ludHNbMjNdLnogLSBhbmdlbFBvaW50c1syMV0ueikpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoKGFuZ2VsUG9pbnRzWzI0XS54IC0gYW5nZWxQb2ludHNbMjJdLngpLDAsKGFuZ2VsUG9pbnRzWzI0XS56IC0gYW5nZWxQb2ludHNbMjJdLnopKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKChhbmdlbFBvaW50c1syNF0ueCAtIGFuZ2VsUG9pbnRzWzIzXS54KSwwLChhbmdlbFBvaW50c1syNF0ueiAtIGFuZ2VsUG9pbnRzWzIzXS56KSlcbiAgICBdO1xuXG4gIC8v44Kr44Oh44Op55So5Yi25b6h54K5XG4gICAgbGV0IGNhbWVyYVBvaW50cyA6IFRIUkVFLlZlY3RvcjNbXSA9IFtcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDEsMCw2KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDEsMCw0KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDEsMCwyKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDIsMCwxLjUpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoNCwwLDEpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoNiwwLDAuNSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMyg1LjUsMCwwKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDQsMCwtMSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygyLDAsLTEpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMS41LDAsLTIpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoMSwwLC00KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAuNSwwLC02KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDAsMCwtNS41KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKC0xLDAsLTQpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTEsIDAsLTIpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTIsMCwtMS41KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKC00LDAsLTEpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTYsMCwtMC41KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKC01LjUsMCwwKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKC00LDAsMSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygtMiwwLDEpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTEuNSwwLDIpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoLTEsMCw0KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKC0wLjUsMCw2KSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKDEsMCw2KVxuICAgIF1cbiAgLy/jgqvjg6Hjg6nnlKjpgJ/luqZcbiAgICBsZXQgY2FtZXJhViA6VEhSRUUuVmVjdG9yM1tdID0gW1xuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoKGNhbWVyYVBvaW50c1sxXS54IC0gY2FtZXJhUG9pbnRzWzBdLngpLDAsKGNhbWVyYVBvaW50c1sxXS56IC0gY2FtZXJhUG9pbnRzWzBdLnopKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKChjYW1lcmFQb2ludHNbMV0ueCAtIGNhbWVyYVBvaW50c1swXS54KSwwLChjYW1lcmFQb2ludHNbMV0ueiAtIGNhbWVyYVBvaW50c1swXS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoY2FtZXJhUG9pbnRzWzJdLnggLSBjYW1lcmFQb2ludHNbMF0ueCksMCwoY2FtZXJhUG9pbnRzWzJdLnogLSBjYW1lcmFQb2ludHNbMF0ueikpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoKGNhbWVyYVBvaW50c1szXS54IC0gY2FtZXJhUG9pbnRzWzFdLngpLDAsKGNhbWVyYVBvaW50c1szXS56IC0gY2FtZXJhUG9pbnRzWzFdLnopKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKChjYW1lcmFQb2ludHNbNF0ueCAtIGNhbWVyYVBvaW50c1syXS54KSwwLChjYW1lcmFQb2ludHNbNF0ueiAtIGNhbWVyYVBvaW50c1syXS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoY2FtZXJhUG9pbnRzWzVdLnggLSBjYW1lcmFQb2ludHNbM10ueCksMCwoY2FtZXJhUG9pbnRzWzVdLnogLSBjYW1lcmFQb2ludHNbM10ueikpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoKGNhbWVyYVBvaW50c1s2XS54IC0gY2FtZXJhUG9pbnRzWzRdLngpLDAsKGNhbWVyYVBvaW50c1s2XS56IC0gY2FtZXJhUG9pbnRzWzRdLnopKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKChjYW1lcmFQb2ludHNbN10ueCAtIGNhbWVyYVBvaW50c1s1XS54KSwwLChjYW1lcmFQb2ludHNbN10ueiAtIGNhbWVyYVBvaW50c1s1XS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoY2FtZXJhUG9pbnRzWzhdLnggLSBjYW1lcmFQb2ludHNbNl0ueCksMCwoY2FtZXJhUG9pbnRzWzhdLnogLSBjYW1lcmFQb2ludHNbNl0ueikpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoKGNhbWVyYVBvaW50c1s5XS54IC0gY2FtZXJhUG9pbnRzWzddLngpLDAsKGNhbWVyYVBvaW50c1s5XS56IC0gY2FtZXJhUG9pbnRzWzddLnopKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKChjYW1lcmFQb2ludHNbMTBdLnggLSBjYW1lcmFQb2ludHNbOF0ueCksMCwoY2FtZXJhUG9pbnRzWzEwXS56IC0gY2FtZXJhUG9pbnRzWzhdLnopKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKChjYW1lcmFQb2ludHNbMTFdLnggLSBjYW1lcmFQb2ludHNbOV0ueCksMCwoY2FtZXJhUG9pbnRzWzExXS56IC0gY2FtZXJhUG9pbnRzWzldLnopKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKChjYW1lcmFQb2ludHNbMTJdLnggLSBjYW1lcmFQb2ludHNbMTBdLngpLDAsKGNhbWVyYVBvaW50c1sxMl0ueiAtIGNhbWVyYVBvaW50c1sxMF0ueikpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoKGNhbWVyYVBvaW50c1sxM10ueCAtIGNhbWVyYVBvaW50c1sxMV0ueCksMCwoY2FtZXJhUG9pbnRzWzEzXS56IC0gY2FtZXJhUG9pbnRzWzExXS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoY2FtZXJhUG9pbnRzWzE0XS54IC0gY2FtZXJhUG9pbnRzWzEyXS54KSwwLChjYW1lcmFQb2ludHNbMTRdLnogLSBjYW1lcmFQb2ludHNbMTJdLnopKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKChjYW1lcmFQb2ludHNbMTVdLnggLSBjYW1lcmFQb2ludHNbMTNdLngpLDAsKGNhbWVyYVBvaW50c1sxNV0ueiAtIGNhbWVyYVBvaW50c1sxM10ueikpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoKGNhbWVyYVBvaW50c1sxNl0ueCAtIGNhbWVyYVBvaW50c1sxNF0ueCksMCwoY2FtZXJhUG9pbnRzWzE2XS56IC0gY2FtZXJhUG9pbnRzWzE0XS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoY2FtZXJhUG9pbnRzWzE3XS54IC0gY2FtZXJhUG9pbnRzWzE1XS54KSwwLChjYW1lcmFQb2ludHNbMTddLnogLSBjYW1lcmFQb2ludHNbMTVdLnopKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKChjYW1lcmFQb2ludHNbMThdLnggLSBjYW1lcmFQb2ludHNbMTZdLngpLDAsKGNhbWVyYVBvaW50c1sxOF0ueiAtIGNhbWVyYVBvaW50c1sxNl0ueikpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoKGNhbWVyYVBvaW50c1sxOV0ueCAtIGNhbWVyYVBvaW50c1sxN10ueCksMCwoY2FtZXJhUG9pbnRzWzE5XS56IC0gY2FtZXJhUG9pbnRzWzE3XS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoY2FtZXJhUG9pbnRzWzIwXS54IC0gY2FtZXJhUG9pbnRzWzE4XS54KSwwLChjYW1lcmFQb2ludHNbMjBdLnogLSBjYW1lcmFQb2ludHNbMThdLnopKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKChjYW1lcmFQb2ludHNbMjFdLnggLSBjYW1lcmFQb2ludHNbMTldLngpLDAsKGNhbWVyYVBvaW50c1syMV0ueiAtIGNhbWVyYVBvaW50c1sxOV0ueikpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoKGNhbWVyYVBvaW50c1syMl0ueCAtIGNhbWVyYVBvaW50c1syMF0ueCksMCwoY2FtZXJhUG9pbnRzWzIyXS56IC0gY2FtZXJhUG9pbnRzWzIwXS56KSksXG4gICAgICAgICAgICBuZXcgVEhSRUUuVmVjdG9yMygoY2FtZXJhUG9pbnRzWzIzXS54IC0gY2FtZXJhUG9pbnRzWzIxXS54KSwwLChjYW1lcmFQb2ludHNbMjNdLnogLSBjYW1lcmFQb2ludHNbMjFdLnopKSxcbiAgICAgICAgICAgIG5ldyBUSFJFRS5WZWN0b3IzKChjYW1lcmFQb2ludHNbMjRdLnggLSBjYW1lcmFQb2ludHNbMjJdLngpLDAsKGNhbWVyYVBvaW50c1syNF0ueiAtIGNhbWVyYVBvaW50c1syMl0ueikpLFxuICAgICAgICAgICAgbmV3IFRIUkVFLlZlY3RvcjMoKGNhbWVyYVBvaW50c1syNF0ueCAtIGNhbWVyYVBvaW50c1syM10ueCksMCwoY2FtZXJhUG9pbnRzWzI0XS56IC0gY2FtZXJhUG9pbnRzWzIzXS56KSlcbiAgICBdO1xuXG4gICAgbGV0IHNlZyA9IDA7XG4gICAgbGV0IGlzQXV0b0NhbWVyYSA9IHRydWU7IFxuICAgICAgXG4gIC8v44Op44Kk44OI44Gu6Kit5a6aXG4gICAgICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZik7XG4gICAgICAgIGNvbnN0IGx2ZWMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKS5ub3JtYWxpemUoKTtcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQobHZlYy54LCBsdmVjLnksIGx2ZWMueik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHQpO1xuICAgIFxuICAvLyDmr47jg5Xjg6zjg7zjg6Djga51cGRhdGXjgpLlkbzjgpPjgafvvIzmm7TmlrBcbiAgLy8gcmVxZXN0QW5pbWF0aW9uRnJhbWUg44Gr44KI44KK5qyh44OV44Os44O844Og44KS5ZG844G2XG4gICAgbGV0IHVwZGF0ZTogRnJhbWVSZXF1ZXN0Q2FsbGJhY2sgPSAodGltZSkgPT4ge1xuXG4gICAgY29uc3QgZGVsdGFUaW1lID0gdGhpcy5jbG9jay5nZXREZWx0YSgpO1xuICAvL+OCquODvOODreODqeeUqOOCouODi+ODoeODvOOCt+ODp+ODs1xuICAgICAgdW5pZm9ybXMxLnRpbWUudmFsdWUgPSB0aGlzLmNsb2NrLmdldEVsYXBzZWRUaW1lKCk7XG4gICAgICB1bmlmb3JtczIudGltZS52YWx1ZSA9IHRoaXMuY2xvY2suZ2V0RWxhcHNlZFRpbWUoKTtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgLy/mtYHmmJ/nvqTnlKjjgqLjg4vjg6Hjg7zjgrfjg6fjg7NcbiAgICBmb3IobGV0IGkgPSAwOyBpPDEwOyBpKyspe1xuICAgICAgdGhpcy5tZXRlb3JHcm91cHNbaV0ucG9zaXRpb24ueSAtPSAzMCAqIE1hdGgucmFuZG9tKCkgKiBkZWx0YVRpbWU7XG4gICAgICB0aGlzLm1ldGVvckdyb3Vwc1tpXS5wb3NpdGlvbi56ICs9IDEwICogZGVsdGFUaW1lO1xuICAgIGlmKHRoaXMubWV0ZW9yR3JvdXBzW2ldLnBvc2l0aW9uLnkgPD0gLTUwIHx8IHRoaXMubWV0ZW9yR3JvdXBzW2ldLnBvc2l0aW9uLnogPj0gNTApe1xuICAgICAgICB0aGlzLm1ldGVvckdyb3Vwc1tpXS5wb3NpdGlvbi5zZXQoMTAgKyBNYXRoLnJhbmRvbSgpICogMjAsIDUwICsgTWF0aC5yYW5kb20oKSAqIDEwMCwgLTEwMCArIE1hdGgucmFuZG9tKCkgKiA0MCk7XG4gICAgfVxuICAgIH1cbiAgLy/jgqjjg6vjg5/jg7zjg4jmm7Lnt5rnlKjjgqLjg4vjg6Hjg7zjgrfjg6fjg7PvvIjlpKnkvb/jgIDjgqvjg6Hjg6nvvIlcbiAgICAgICAgICB0ICs9IHRoaXMuY2xvY2suZ2V0RGVsdGEoKSAqIDg7XG4gICAgaWYodCA+IDEuMCkge1xuICAgICAgICAgIHQgLT0gMS4wO1xuICAgICAgICAgIHNlZysrO1xuICAgIGlmICgoc2VnICsgMSkgPiBhbmdlbFBvaW50cy5sZW5ndGgtMSkge1xuICAgICAgICAgIHNlZyA9IDA7IC8vIOODq+ODvOODl+OBq+aIu+OCi1xuICAgICAgfVxuICAgIH1cbiAgICAgICAgICAgIFxuICAgIGNvbnN0IGFuZ2VsUG9zID0gaGVybWl0ZShhbmdlbFBvaW50c1tzZWddLCBhbmdlbFZbc2VnXSwgYW5nZWxQb2ludHNbc2VnKzFdLCBhbmdlbFZbc2VnKzFdLCB0KTtcbiAgICAgICAgICAgIGFuZ2VsLnBvc2l0aW9uLmNvcHkoYW5nZWxQb3MpO1xuICAgICAgICAgICAgYW5nZWwubG9va0F0KGhlcm1pdGUoYW5nZWxQb2ludHNbc2VnXSxhbmdlbFZbc2VnXSxhbmdlbFBvaW50c1tzZWcrMV0sYW5nZWxWW3NlZysxXSx0KzAuMDEpKTtcbiAgICAgICAgICAgIGFuZ2VsLnBvc2l0aW9uLnkgPSAwLjIqTWF0aC5zaW4odGhpcy5jbG9jay5nZXRFbGFwc2VkVGltZSgpICogTWF0aC5QSSAqIDAuNSk7XG5cbiAgLy/jg57jgqbjgrnmk43kvZznlKjoqr/mlbRcbiAgICBpZihpc0F1dG9DYW1lcmEpe1xuICAgIGNvbnN0IGNhbWVyYVBvcyA9IGhlcm1pdGUoY2FtZXJhUG9pbnRzW3NlZ10sIGNhbWVyYVZbc2VnXSwgY2FtZXJhUG9pbnRzW3NlZysxXSwgY2FtZXJhVltzZWcrMV0sIHQpO1xuICAgICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLmNvcHkoY2FtZXJhUG9zKTtcbiAgICAgICAgICB0aGlzLmNhbWVyYS5sb29rQXQoYW5nZWwucG9zaXRpb24pO1xuICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMub3JiaXRDb250cm9scy51cGRhdGUoKTtcbiAgICB9XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoKSA9PiB7XG4gICAgICBpc0F1dG9DYW1lcmEgPSBmYWxzZTtcbiAgfSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgKCkgPT4ge1xuICAgICAgaXNBdXRvQ2FtZXJhID0gdHJ1ZTtcbiAgfSk7XG5cbiAgLy/jgqvjg6Hjg6njgYzlpKnkvb/jgpLov73jgYTjgYvjgZHjgovjgojjgYbjgatcbiAgICAgIHRoaXMub3JiaXRDb250cm9scy50YXJnZXQuc2V0KGFuZ2VsLnBvc2l0aW9uLngsYW5nZWwucG9zaXRpb24ueSxhbmdlbC5wb3NpdGlvbi56KTtcbiAgXG4gIC8v5pif44Gu54K55ruF44Ki44OL44Oh44O844K344On44OzXG4gICAgICBUV0VFTi51cGRhdGUoKTtcblxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0KTtcbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IFRocmVlSlNDb250YWluZXIoKTtcbiAgICBsZXQgdmlld3BvcnQgPSBjb250YWluZXIuY3JlYXRlUmVuZGVyZXJET00oNjQwLCA0ODAsIG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDUpKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpO1xufVxuXG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190d2VlbmpzX3R3ZWVuX2pzX2Rpc3RfdHdlZW5fZXNtX2pzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHItY2FhNjE4XCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2FwcC50c1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9