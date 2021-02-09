import * as  THREE from 'three';
import * as fs from 'fs';
import Martini from '@mapbox/martini'; 
import {mapboxTerrainToGrid} from './utils.js';
import {arrayBufferToBase64} from './arrayBufferToBase64.js';
import {PNG} from 'pngjs/browser';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}

fetch('img/fuji.png')
    .then(res=> {
        res.arrayBuffer().then((buffer)=>{
            const imageData = buffer;

            let image = new PNG({ filterType: 4}).parse(imageData, (error, data)=>{
                const terrain = mapboxTerrainToGrid(image);
                const martini = new Martini(image.width + 1);
                const tile = martini.createTile(terrain);
                const mesh = tile.getMesh(500);
                console.log(mesh);
            })
        })
    });


    animate();
