import "./style.css";
import * as t from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new t.Scene();
scene.background = new t.Color(0x07000f);

const size = {
    width: window.innerWidth / 2.5,
    height: window.innerHeight,
};

const camera = new t.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);

camera.position.setZ(50);

const canvas = document.getElementById("dragon-display");

if (canvas === null) {
    throw ReferenceError(
        "Could not find element by the id of dragon-display, aborting",
    );
}

const renderer = new t.WebGLRenderer({
    canvas: canvas,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(size.width, size.height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;

const lightBottom = new t.PointLight(0xcc99ff, 200, 1000);
// const lightBottomIndicator = new t.PointLightHelper(lightBottom);
const lightTop = new t.PointLight(0xddbbff, 300, 1000);
// const lightTopIndicator = new t.PointLightHelper(lightTop);
// const ambientLight = new t.AmbientLight(0xffffff);

lightBottom.position.set(0, -10, 30);
lightTop.position.set(0, 15, 20);

const loader = new GLTFLoader();

loader.load(
    "/dragon.glb",
    (gltf) => {
        console.log(gltf);
        const dragon = gltf.scene;
        dragon.scale.set(30, 30, 30);
        dragon.rotateY(1.54);
        dragon.rotateZ(0.3);
        scene.add(dragon);
    },
    undefined,
    function (error) {
        console.log(error);
    },
);

scene.add(camera);
scene.add(lightBottom);
// scene.add(lightBottomIndicator);
scene.add(lightTop);
// scene.add(lightTopIndicator);
// scene.add(ambientLight);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
