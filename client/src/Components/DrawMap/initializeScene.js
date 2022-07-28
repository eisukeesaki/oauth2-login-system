import * as THREE from 'three';

export default function initializeScene(div) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        500000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    div.appendChild(renderer.domElement);
    camera.position.z = 1.5;
    scene.background = new THREE.Color(0xffffff);
    return { scene, renderer, camera };
}
