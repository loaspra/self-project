// components/MoonScene.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MoonScene = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create a starry background using a sphere with a starry texture
    const starTexture = new THREE.TextureLoader().load('/public/look_how_they_shine_for_you.jpg');
    const starSphereGeometry = new THREE.SphereGeometry(200, 32, 32);
    const starSphereMaterial = new THREE.MeshBasicMaterial({ map: starTexture, side: THREE.BackSide });
    const starSphere = new THREE.Mesh(starSphereGeometry, starSphereMaterial);
    scene.add(starSphere);

    // Load and position the moon model
    const moonLoader = new THREE.GLTFLoader();
    moonLoader.load('/public/moon.glb', (moon) => {
      moon.scene.scale.set(0.1, 0.1, 0.1); // Adjust the scale as needed
      scene.add(moon.scene);
    });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default MoonScene;
