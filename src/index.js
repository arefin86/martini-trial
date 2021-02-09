import * as  THREE from 'three';
import * as fs from 'fs';
import Martini from '@mapbox/martini'; 
import {mapboxTerrainToGrid} from './utils.js';
import {PNG} from 'pngjs/browser';

const fuji = PNG.sync.read(fs.readFileSync('img/fuji.png'));
const terrain = mapboxTerrainToGrid(fuji);

const martini = new Martini(fuji.width + 1);
const tile = martini.createTile(terrain);
const mesh = tile.getMesh(500);

console.log(mesh);