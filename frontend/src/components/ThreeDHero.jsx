import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Sparkles, Environment, MeshTransmissionMaterial, ContactShadows, Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';

// --- Realistic Gold Coin (Sikka) ---
function GoldCoin({ position, rotation, scale = 1 }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.15, 64]} />
        <meshStandardMaterial 
          color="#ffb700" 
          metalness={1} 
          roughness={0.15}
          envMapIntensity={2}
        />
      </mesh>
      {/* Inner Rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[0.9, 0.05, 16, 64]} />
        <meshStandardMaterial color="#ffd700" metalness={1} roughness={0.2} />
      </mesh>
      {/* Crescent Emboss */}
      <mesh position={[0.1, 0, 0.08]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.4, 0.1, 16, 32, Math.PI * 1.3]} />
        <meshStandardMaterial color="#ffea00" metalness={1} roughness={0.1} />
      </mesh>
      <mesh position={[-0.15, 0.2, 0.08]}>
        <dodecahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial color="#ffea00" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
}

// --- The Charity Box (Glass Cube) ---
function CharityBox() {
  const boxRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    boxRef.current.rotation.y = Math.sin(t / 4) * 0.2; // Slow majestic rotation
    boxRef.current.position.y = Math.sin(t / 2) * 0.2; // Slow float
  });

  // Random positions for coins inside the box
  const coins = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 15; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 3, 
          -1.5 + Math.random() * 1.5, 
          (Math.random() - 0.5) * 3
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]
      });
    }
    return temp;
  }, []);

  return (
    <group ref={boxRef} position={[0, -1, 0]}>
      {/* The Glass Box */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 4, 4]} />
        <MeshTransmissionMaterial 
          backside
          thickness={0.5}
          roughness={0.05}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.04}
          color="#ffffff"
          distortion={0.1}
          distortionScale={0.1}
        />
      </mesh>

      {/* Gold Frame around the box */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[4.1, 0.1, 4.1]} />
        <meshStandardMaterial color="#b8860b" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0, -2, 0]}>
        <boxGeometry args={[4.1, 0.1, 4.1]} />
        <meshStandardMaterial color="#b8860b" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[2, 0, 2]}>
        <boxGeometry args={[0.1, 4, 0.1]} />
        <meshStandardMaterial color="#b8860b" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[-2, 0, 2]}>
        <boxGeometry args={[0.1, 4, 0.1]} />
        <meshStandardMaterial color="#b8860b" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[2, 0, -2]}>
        <boxGeometry args={[0.1, 4, 0.1]} />
        <meshStandardMaterial color="#b8860b" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[-2, 0, -2]}>
        <boxGeometry args={[0.1, 4, 0.1]} />
        <meshStandardMaterial color="#b8860b" metalness={1} roughness={0.2} />
      </mesh>

      {/* Coins inside */}
      {coins.map((coin, i) => (
        <GoldCoin key={i} position={coin.position} rotation={coin.rotation} scale={0.5} />
      ))}
      
      {/* A prominent floating coin outside/above */}
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <GoldCoin position={[0, 3, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]} scale={1.2} />
      </Float>
    </group>
  );
}

export default function ThreeDHero() {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
        <color attach="background" args={['#020202']} />
        
        {/* Realistic Lighting Environment */}
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 10]} intensity={2} color="#ffffff" castShadow />
        <pointLight position={[-10, 0, -10]} intensity={5} color="#ec4899" />
        <pointLight position={[10, -10, 10]} intensity={5} color="#8b5cf6" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={1.5} />
        
        {/* Golden floating Sadaqah sparks */}
        <Sparkles count={100} scale={12} size={6} speed={0.5} opacity={0.8} color="#fbbf24" />
        
        <CharityBox />
        
        <ContactShadows position={[0, -4, 0]} opacity={0.7} scale={20} blur={2} far={10} color="#ec4899" />

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 2 - 0.2}
        />
      </Canvas>
    </div>
  );
}
