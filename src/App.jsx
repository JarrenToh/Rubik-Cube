import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { Plane, Vector3 } from "three";

import { colors } from "./constants";

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export function Cubie({ x, y, z, cubeSize, gap, colors }) {
  const offset = cubeSize + gap;
  const materials = useMemo(() => {
    const faceColors = [
      x === 1 ? colors.orange : colors.black, // right
      x === -1 ? colors.red : colors.black,   // left
      y === 1 ? colors.yellow : colors.black, // top
      y === -1 ? colors.white : colors.black, // bottom
      z === 1 ? colors.blue : colors.black,   // front
      z === -1 ? colors.green : colors.black, // back
    ];

    return faceColors.map((color, index) => (
      <meshBasicMaterial
        key={index}
        attach={`material-${index}`}
        color={color}
      />
    ));
  }, [x, y, z, colors]);

  console.log(materials[0]);
  return (
    <group position={[offset * x, offset * y, offset * z]}>
      <mesh onClick={(event) =>{
        event.stopPropagation();
        document.getElementById("info").innerText = `Cubie clicked at (${x}, ${y}, ${z})`;
      }}>
        <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
        {materials}
      </mesh>
    </group>
  );
}

export function RubiksCube({ cubeSize, gap, colors }) {
  const positions = useMemo(() => {
    const pos = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          pos.push({ x, y, z });
        }
      }
    }
    return pos;
  }, []);

  return (
    <group>
      {positions.map(({ x, y, z }, i) => (
        <Cubie
          key={i}
          x={x}
          y={y}
          z={z}
          cubeSize={cubeSize}
          gap={gap}
          colors={colors}
        />
      ))}
    </group>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 1000 }}>
      <ambientLight intensity={Math.PI / 2} />
      {/* <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      /> */}
      {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
      <directionalLight
        position={[0, 0, 10]}
        decay={0}
        intensity={1}
        color={0xffffff}
      />
      {/* <group>
        <Box position={[-5, 0, 0]} />
        <Box position={[-5, -4, 0]} />
      </group>

      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} /> */}
      <RubiksCube cubeSize={1} gap={0.05} colors={colors} />
      <OrbitControls />

      {/* Visualize the axes */}
      {/* X axis is red */}
      <arrowHelper args={[new Vector3(1, 0, 0), new Vector3(0, 0, 0), 5, 0xff0000]} />
      {/* Y axis is green */}
      <arrowHelper args={[new Vector3(0, 1, 0), new Vector3(0, 0, 0), 5, 0x00ff00]} />
      {/* Z axis is blue */}
      <arrowHelper args={[new Vector3(0, 0, 1), new Vector3(0, 0, 0), 5, 0x0000ff]} />
      <planeHelper args={[new Plane(new Vector3(0, 0, -5), 4), 5, 0x0000ff]} /> //XY
      <planeHelper args={[new Plane(new Vector3(0, -5, 0), 4), 5, 0x00ff00]} /> //XZ
      <planeHelper args={[new Plane(new Vector3(-5, 0, 0), 4), 5, 0xff0000]} /> //YZ
    </Canvas>
  );
}
