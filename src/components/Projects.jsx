import { Image, Text, useCursor } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

export const projects = [
  {
    title: "AI Invoice Summarizer SAAS App",
    
    image: "projects/portfolio.jpeg",
    url: "https://github.com/subhan-uf/invoice-summarizer-nexorus",
  
  },
  {
    title: "Immersive E-Commerce Nike Store",
    
    image: "projects/ecommerce.png",
    url: "https://github.com/subhan-uf/ImmersiveEcommerce",
  
  },
  {
    title: "University Resource Scheudling Software",
    
    image: "projects/dronee.png",
    url: "https://github.com/subhan-uf/ResourceSchedulerFrontend",

  },
  {
    title: "Phishing Detection Browser Extension",
    
    image: "projects/wallett.png",
    url: "https://github.com/subhan-uf/phishing-detection",
 
  },
  {
    title: "Nexorus SAAS Website",
    
    image: "projects/hotel.png",
    url: "https://nexorus-tech.netlify.app",
  
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => project.url && window.open(project.url, "_blank", "noopener,noreferrer")}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        ref={background}
      >
        <planeGeometry args={[2.2, 2.5]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
        nClick={() => project.url && window.open(project.url, "_blank", "noopener,noreferrer")}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
