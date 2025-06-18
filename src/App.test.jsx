import { describe, it, expect } from 'vitest';
import { colors } from './constants'
import ReactThreeTestRenderer from '@react-three/test-renderer'

import { Cubie } from './App';


const getColorHex = (color) => {
    return `#${color.getHex().toString(16).padStart(6, '0')}`;
};

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
            '#ffa500', // 1: right (orange)
            '#000000', // 2: left (black)
            '#ffff00', // 3: top (yellow)
            '#000000', // 4: bottom (black)
            '#0000ff', // 5: front (blue)
            '#000000', // 6: back (black)
        ];

        // index 0 is the geometry, so we start from index 1
        cubie.children.slice(1, 7).forEach((face, i) => {
            const color = getColorHex(face.props.color);
            expect(color).toBe(expectedColors[i]);
        });
    });

    it('applies black color to faces on middle cube', async () => {
        const renderer = await ReactThreeTestRenderer.create(<Cubie x={0} y={0} z={0} cubeSize={1} gap={0.05} colors={colors} />)

        // extract from group > mesh > 
        const cubie = renderer.toTree()[0].children[0]

        // index 0 is the geometry, so we start from index 1
        cubie.children.slice(1, 7).forEach((face, i) => {
            // check if all faces are black
            const color = getColorHex(face.props.color);
            expect(color).toBe('#000000'); // black
        });
    });

});
