import { describe, it, expect } from 'vitest';
import { colors } from './constants'
import ReactThreeTestRenderer from '@react-three/test-renderer'

import { Cubie, RubiksCube } from './App';


describe('Cubie', () => {

    it('renders without crashing', async () => {
        const renderer = ReactThreeTestRenderer.create(<Cubie x={1} y={0} z={0} cubeSize={1} gap={0.05} colors={colors} />)
        expect(renderer).toBeDefined();
    });

    it('applies correct face colors for a corner cubie', async () => {
        const renderer = await ReactThreeTestRenderer.create(<Cubie x={1} y={1} z={1} cubeSize={1} gap={0.05} colors={colors} />)

        // extract from group > mesh > 
        const cubie = renderer.toTree()[0].children[0]

        // Should have orange (right), yellow (top), blue (front)
        const expectedColors = [
            colors.orange, // 1: right (orange)
            colors.black, // 2: left (black)
            colors.yellow, // 3: top (yellow)
            colors.black, // 4: bottom (black)
            colors.blue, // 5: front (blue)
            colors.black, // 6: back (black)
        ];

        // index 0 is the geometry, so we start from index 1
        cubie.children.slice(1, 7).forEach((face, i) => {
            expect(face.props.color).toBe(expectedColors[i]);
        });
    });

    it('applies black color to faces on middle cube', async () => {
        const renderer = await ReactThreeTestRenderer.create(<Cubie x={0} y={0} z={0} cubeSize={1} gap={0.05} colors={colors} />)

        // extract from group > mesh > 
        const cubie = renderer.toTree()[0].children[0]

        // index 0 is the geometry, so we start from index 1
        cubie.children.slice(1, 7).forEach((face, i) => {
            // check if all faces are black
            expect(face.props.color).toBe(colors.black);
        });
    });

});

describe('RubiksCube', () => {

    it('renders without crashing', async () => {
        const renderer = ReactThreeTestRenderer.create(<RubiksCube cubeSize={1} gap={0.05} colors={colors} />)
        expect(renderer).toBeDefined();
    });

    it('check if rubiks cube have 27 cubies', async () => {
        const renderer = await ReactThreeTestRenderer.create(<RubiksCube cubeSize={1} gap={0.05} colors={colors} />)

        expect(renderer.toTree()[0].children.length).toBe(27);

        });
});
