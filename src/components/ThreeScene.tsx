
import { useRef, useEffect } from "react";
import * as THREE from "three";

interface ThreeSceneProps {
  className?: string;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ className }) => {
  const mountRef = useRef<HTMLDivElement>(null);

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
    camera.position.z = 5;

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

    // Create geometry
    const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x1EAEDB,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x0066cc,
      emissiveIntensity: 0.2,
    });
    
    const torusKnot = new THREE.Mesh(torusKnotGeometry, torusMaterial);
    scene.add(torusKnot);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;

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
        mountRef.current.removeChild(renderer.domElement);
      }
      
      scene.remove(torusKnot);
      torusKnotGeometry.dispose();
      torusMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className={className} />;
};

export default ThreeScene;
