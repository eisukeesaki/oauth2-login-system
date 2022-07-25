import addConnection from './addConnection';
import addMindMapNode from './addMindMapNode';

import initializeScene from './initializeScene';
import colors from './colors';

import data from './data.json'

export default async function renderMindMap(div) {
    const { scene, renderer, camera } = initializeScene(div);
    const root = data.find((node) => node.parent === undefined);
    const level1 = data.filter((node) => node.parent === root.id);
    root.x = 0;
    root.y = 0;
    root.level = 0;
    await addMindMapNode(scene, root);
    const radius = 2;
    const slice = (2 * Math.PI) / level1.length;
    for (let i = 0; i < level1.length; i++) {
        const level1node = level1[i];
        level1node.level = 1;
        const angle = slice * i;
        const x = root.x + radius * Math.cos(angle);
        const y = root.y + radius * Math.sin(angle);
        level1node.x = x;
        level1node.y = y;
        await addMindMapNode(scene, level1node);
        addConnection(scene, {
            color: colors.magenta,
            parentNode: root,
            childNode: level1node
        });
    }
    renderer.render(scene, camera);
}