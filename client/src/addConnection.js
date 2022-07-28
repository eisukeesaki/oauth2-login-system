import * as THREE from 'three';
import { MeshLine, MeshLineMaterial } from 'meshline';

const lineWidth = 5;

export default async function addConnection(
    scene,
    { color, parentNode, childNode }
) {
    const points = new Float32Array([
        parentNode.x,
        parentNode.y,
        0,
        childNode.x,
        childNode.y,
        0
    ]);
    const line = new MeshLine();
    line.setGeometry(points);
    const material = new MeshLineMaterial({
        useMap: false,
        color,
        opacity: 1,
        resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
        sizeAttenuation: false,
        lineWidth
    });
    const mesh = new THREE.Mesh(line.geometry, material);
    scene.add(mesh);
}
