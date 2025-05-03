import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface ThreeSceneProps {
  className?: string;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x4A9DFF, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x9b87f5, 2);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create geometry - Larger and more detailed
    const geometry = new THREE.IcosahedronGeometry(2.5, 2);
    const material = new THREE.MeshStandardMaterial({
       color: 0x74b9ff,
      metalness: 0.8,
      roughness: 0.1,
      emissive: 0x0066cc,
      emissiveIntensity: 0.3,
      wireframe: true,
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse interaction
    const handleMouseDown = (event: MouseEvent) => {
      setIsDragging(true);
      setPreviousMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
      };

      mesh.rotation.y += deltaMove.x * 0.01;
      mesh.rotation.x += deltaMove.y * 0.01;

      setPreviousMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    mountRef.current.addEventListener('mousedown', handleMouseDown);
    mountRef.current.addEventListener('mouseup', handleMouseUp);
    mountRef.current.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      if (!isDragging) {
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.005;
        mesh.rotation.z += 0.002;
      }

      renderer.render(scene, camera);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current) {
        mountRef.current.removeEventListener('mousedown', handleMouseDown);
        mountRef.current.removeEventListener('mouseup', handleMouseUp);
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
        mountRef.current.removeChild(renderer.domElement);
      }
      
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
    };
  }, [isDragging, previousMousePosition]);

  return <div ref={mountRef} className={className} />;
};

export default ThreeScene;
