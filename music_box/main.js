import * as THREE from 'three';
import { MusicBoxScene } from './scene.js';
import { PianoAudio } from './audio.js';
import { Joystick } from './controls.js';

const canvas = document.getElementById('stage');
const splash = document.getElementById('splash');
const hud = document.getElementById('hud');
const startBtn = document.getElementById('startBtn');
const skipBtn = document.getElementById('skipBtn');
const resetBtn = document.getElementById('resetBtn');
const pauseBtn = document.getElementById('pauseBtn');

const listener = new THREE.AudioListener();
const piano = new PianoAudio(listener);

const scene = new MusicBoxScene(canvas, piano, listener);

const joyOrbit = new Joystick(document.getElementById('joyOrbit'));
const joyOffset = new Joystick(document.getElementById('joyOffset'));

let started = false;
let lastTime = performance.now();

async function init() {
  const notesText = await fetch('assets/tune.txt').then(r => r.text());
  await scene.load('assets/music_box.glb', 'assets/scene_data.json', notesText);
  requestAnimationFrame(loop);
}

function loop(now) {
  const dt = Math.min(0.05, (now - lastTime) / 1000);
  lastTime = now;
  if (started) {
    scene.applyCameraInput(joyOrbit.value, joyOffset.value, dt);
  }
  scene.update(dt);
  scene.render();
  requestAnimationFrame(loop);
}

function beginExperience(skipIntro) {
  if (started) return;
  started = true;
  splash.classList.add('hidden');
  piano.resume();
  // Start the crank (and audio) at the same instant the camera starts moving,
  // so the music plays during the intro.
  scene.setPaused(false);
  scene.startIntro(() => {
    hud.classList.remove('hidden');
  });
  if (skipIntro) scene.skipIntro();
}

startBtn.addEventListener('click', () => beginExperience(false));
skipBtn?.addEventListener('click', () => beginExperience(true));

resetBtn.addEventListener('click', () => {
  scene.resetCamera();
});

pauseBtn.addEventListener('click', () => {
  const next = !scene.isPaused();
  scene.setPaused(next);
  pauseBtn.textContent = next ? 'Resume' : 'Pause';
});

init();
