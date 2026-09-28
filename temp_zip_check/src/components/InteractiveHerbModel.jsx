import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Center, PresentationControls, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

// Loader component for Suspense fallback
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-sand/70 text-xs uppercase tracking-widest font-medium">
        Loading Model {Math.round(progress)}%
      </div>
    </Html>
  );
}

// Inner Model Component
function Model(props) {
  const { nodes, materials } = useGLTF('/morter-draco.glb');
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    
    // Smoothly interpolate rotation based on pointer (mouse)
    const targetX = (state.pointer.y * Math.PI) / 6; // Limit tilt
    const targetY = (state.pointer.x * Math.PI) / 4;
    
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.05);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.05);

    // Gentle floating vertical animation
    group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.15;
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* If the model is pre-compiled into a primitive: */}
      <primitive object={nodes.Scene || Object.values(nodes)[0]} />
    </group>
  );
}

export default function InteractiveHerbModel() {
  return (
    <div className="relative w-full h-80 rounded-[40px_10px_40px_10px] bg-gradient-to-br from-[#1C352D] to-[#0f211c] border-2 border-[#D4AF37]/30 overflow-hidden shadow-2xl group">
      
      {/* Text Overlay */}
      <div className="absolute top-4 left-0 right-0 z-10 text-center pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
        <span className="inline-block px-4 py-1.5 bg-botanical/50 backdrop-blur-md border border-gold/20 text-sand text-[10px] uppercase tracking-[0.2em] rounded-full shadow-lg">
          ✨ Move your mouse to explore the Khalva Yantra
        </span>
      </div>

      <Canvas camera={{ position: [0, 2, 8], fov: 45 }} shadows>
        <ambientLight intensity={0.6} color="#FAF6EE" />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1.5} 
          color="#D4AF37" 
          castShadow 
          shadow-mapSize={1024}
        />
        
        <Environment preset="sunset" />
        
        <Suspense fallback={<Loader />}>
          <PresentationControls 
            global={false} 
            cursor={true} 
            snap={true} 
            speed={1.5} 
            zoom={1} 
            rotation={[0, 0, 0]} 
            polar={[-Math.PI / 4, Math.PI / 4]} 
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Center>
              <Model scale={2.5} />
            </Center>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/morter-draco.glb');
