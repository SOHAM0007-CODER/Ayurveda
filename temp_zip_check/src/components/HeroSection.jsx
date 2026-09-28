import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  useGLTF, 
  Environment, 
  PresentationControls, 
  ContactShadows, 
  Float, 
  ScrollControls, 
  useScroll,
  Html,
  useProgress,
  AdaptiveDpr,
  AdaptiveEvents,
  BakeShadows
} from '@react-three/drei';
import { ShieldCheck, Award, Users, Leaf } from 'lucide-react';
import LeafButton from './LeafButton';
import * as THREE from 'three';

// Loading Fallback
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center min-w-[250px] p-8 rounded-3xl bg-botanical/80 backdrop-blur-md border border-gold/20 shadow-2xl">
        <div className="relative flex items-center justify-center mb-4">
          <div className="absolute w-12 h-12 border-t-2 border-l-2 border-gold rounded-full animate-spin"></div>
          <div className="absolute w-16 h-16 border-r-2 border-b-2 border-terracotta rounded-full animate-[spin_2s_reverse_infinite]"></div>
          <Leaf className="w-6 h-6 text-sand animate-pulse" />
        </div>
        <span className="font-serif text-sand/90 text-sm tracking-wide font-medium shadow-sm">
          Loading Ayurvedic Visualizer...
        </span>
      </div>
    </Html>
  );
}

// Interactive Model with Antigravity Exploded View
function ExplodedModel(props) {
  const { nodes } = useGLTF('/morter-draco.glb');
  const group = useRef();
  const scroll = useScroll();
  
  // Create an array of children to manipulate them blindly since we don't know the exact node names
  const sceneRoot = nodes.Scene || Object.values(nodes)[0];
  const childrenNodes = [];
  
  // Gather mesh children safely
  sceneRoot.traverse((child) => {
    if (child.isMesh && child.parent === sceneRoot) {
      childrenNodes.push(child);
    }
  });
  
  // If no direct children found, grab the first few meshes in the whole tree
  if (childrenNodes.length === 0) {
    sceneRoot.traverse((child) => {
      if (child.isMesh) childrenNodes.push(child);
    });
  }

  useFrame((state, delta) => {
    if (!group.current) return;
    
    // Auto-rotation
    group.current.rotation.y += delta * 0.5;

    // Get scroll offset (0 to 1)
    const offset = scroll.offset;

    // Blind node manipulation: Assuming [0] is Mortar, [1] is Pestle, [2+] are Herbs
    if (childrenNodes.length > 0) {
      childrenNodes.forEach((node, index) => {
        // Safe check for userData to store original positions
        if (!node.userData.originalPos) {
          node.userData.originalPos = node.position.clone();
        }

        const origPos = node.userData.originalPos;
        
        if (index === 0) {
          // Keep base mortar relatively steady, slightly down
          node.position.y = THREE.MathUtils.lerp(node.position.y, origPos.y - (offset * 0.5), 0.1);
        } else if (index === 1) {
          // Levitating Pestle
          node.position.y = THREE.MathUtils.lerp(node.position.y, origPos.y + (offset * 2.5), 0.1);
        } else {
          // Floating herbs exploding outward randomly
          const randomFactorX = (index % 2 === 0 ? 1 : -1) * (index * 0.5);
          const randomFactorZ = (index % 3 === 0 ? 1 : -1) * (index * 0.3);
          
          node.position.x = THREE.MathUtils.lerp(node.position.x, origPos.x + (offset * randomFactorX), 0.1);
          node.position.y = THREE.MathUtils.lerp(node.position.y, origPos.y + (offset * 1.5), 0.1);
          node.position.z = THREE.MathUtils.lerp(node.position.z, origPos.z + (offset * randomFactorZ), 0.1);
        }
      });
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={sceneRoot} />
    </group>
  );
}

export default function HeroSection({ setActiveTab }) {
  return (
    <>
      <section className="relative min-h-[90vh] bg-botanical overflow-hidden border-b border-gold/20">
        
        {/* CSS Grid Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[90vh]">
          
          {/* LEFT COLUMN: Content */}
          <div className="relative z-10 flex flex-col justify-center px-6 py-20 lg:px-16 lg:py-0">
            <div className="max-w-xl mx-auto lg:mx-0">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold/40 text-gold text-xs uppercase tracking-[0.25em] rounded-full mb-8 shadow-sm">
                <Award className="w-3.5 h-3.5" /> NABH Accredited Hospital
              </div>
              
              <h1 className="font-serif text-5xl md:text-6xl xl:text-7xl leading-[1.1] mb-6 text-sand font-semibold">
                Authentic Ayurveda.<br />
                <span className="italic font-light text-parchment">Rooted in Tradition.</span>
              </h1>
              
              <p className="text-xl md:text-2xl font-light mb-10 text-sand/80 leading-relaxed max-w-lg">
                Restoring your body's innate intelligence through classical Panchakarma, Nadi Pariksha, and personalized holistic care.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <LeafButton onClick={() => setActiveTab('booking')} variant="primary" className="shadow-lg shadow-terracotta/20">
                  Start Your Journey
                </LeafButton>
                <LeafButton onClick={() => setActiveTab('simulator')} variant="outline" className="border-sand text-sand hover:bg-sand/10">
                  Explore Therapies
                </LeafButton>
              </div>
            </div>
          </div>
          
          {/* RIGHT COLUMN: Massive 3D Canvas */}
          <div className="relative w-full h-[60vh] lg:h-full lg:min-h-[90vh] cursor-grab active:cursor-grabbing border-l border-gold/10 bg-gradient-to-br from-[#1C352D]/50 to-[#0f211c]">
            {/* Scroll instruction overlay */}
            <div className="absolute top-8 right-8 z-10 text-center pointer-events-none hidden lg:block opacity-70">
              <span className="inline-block px-4 py-2 bg-charcoal/40 backdrop-blur-md border border-gold/20 text-sand text-[10px] uppercase tracking-[0.2em] rounded-full shadow-lg flex items-center gap-2">
                <div className="w-2 h-4 rounded-full border border-sand/50 flex justify-center p-0.5">
                  <div className="w-1 h-1 bg-sand/80 rounded-full animate-bounce"></div>
                </div>
                Scroll to Explore Khalva Yantra
              </span>
            </div>

            <Canvas 
              camera={{ position: [0, 1.5, 6], fov: 45 }} 
              dpr={[1, 2]}
              shadows
              className="w-full h-full"
              // Ensure canvas doesn't block scroll events for the whole page if needed, 
              // but ScrollControls needs canvas pointer events
            >
              <color attach="background" args={['#172c25']} />
              
              <ambientLight intensity={0.4} color="#FAF6EE" />
              <directionalLight 
                position={[5, 10, 5]} 
                intensity={1.5} 
                color="#D4AF37" 
                castShadow 
                shadow-mapSize={2048}
              />
              
              <Environment preset="warehouse" environmentIntensity={0.8} />
              
              <Suspense fallback={<Loader />}>
                <ScrollControls pages={2} damping={0.25} distance={1}>
                  <PresentationControls 
                    global 
                    rotation={[0, 0, 0]} 
                    polar={[-0.2, 0.2]} 
                    azimuth={[-0.5, 0.5]} 
                    config={{ mass: 2, tension: 400 }}
                  >
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                      <ExplodedModel scale={2.8} position={[0, -0.5, 0]} />
                    </Float>
                  </PresentationControls>
                </ScrollControls>
                
                <ContactShadows 
                  position={[0, -1.2, 0]} 
                  opacity={0.7} 
                  scale={10} 
                  blur={2.5} 
                  far={4} 
                  color="#000000"
                />
                
                {/* Performance Optimizations */}
                <BakeShadows />
                <AdaptiveDpr pixelated />
                <AdaptiveEvents />
              </Suspense>
            </Canvas>
          </div>
          
        </div>
      </section>

      {/* Trust Strip */}
      <div className="bg-parchment border-y border-gold/20 py-8 relative z-20 shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 text-sm text-botanical">
          <span className="flex items-center gap-2 font-medium"><ShieldCheck className="w-5 h-5 text-terracotta" /> NABH Accredited</span>
          <span className="flex items-center gap-2 font-medium"><Award className="w-5 h-5 text-terracotta" /> Dr. Rajesh V. Shastri (BAMS, MD)</span>
          <span className="flex items-center gap-2 font-medium"><Users className="w-5 h-5 text-terracotta" /> 15,000+ Healing Journeys</span>
          <span className="flex items-center gap-2 font-medium"><Leaf className="w-5 h-5 text-terracotta" /> 100% Classical Formulations</span>
        </div>
      </div>
    </>
  );
}

useGLTF.preload('/morter-draco.glb');
