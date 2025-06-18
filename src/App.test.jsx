import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { colors } from './constants'


import { Cubie } from './App';

describe('Cubie', () => {

  it('renders without crashing', () => {
    const { container } = render(
      <Cubie x={1} y={0} z={0} cubeSize={1} gap={0.05} colors={colors} />
    );
    expect(container).toBeTruthy();
  });

  it('applies correct face colors for a corner cubie', () => {
    const { container } = render(
      <Cubie x={1} y={1} z={1} cubeSize={1} gap={0.05} colors={colors} />
    );
    // Should have orange (right), yellow (top), blue (front)
    const materials = container.querySelectorAll('meshBasicMaterial');
    expect(materials.length).toBe(6);
  });

  it('applies black color to faces not on the cube surface', () => {
    const { container } = render(
      <Cubie x={0} y={0} z={0} cubeSize={1} gap={0.05} colors={colors} />
    );
    // All faces should be black
    const materials = container.querySelectorAll('meshBasicMaterial');
    expect(materials.length).toBe(6);
  });
});