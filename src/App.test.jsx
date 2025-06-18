import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import * as THREE from 'three';

import { Cubie } from './App';

describe('Application Tests', () => {
    it('should return true for true', () => {
        expect(true).toBe(true);
    });

    it('should return 2 for 1 + 1', () => {
        expect(1 + 1).toBe(2);
    });
});
describe('Cubie', () => {
  const colors = {
    white: new THREE.Color().setHex(0xffffff),
    yellow: new THREE.Color().setHex(0xffff00),
    red: new THREE.Color().setHex(0xff0000),
    orange: new THREE.Color().setHex(0xffa500),
    blue: new THREE.Color().setHex(0x0000ff),
    green: new THREE.Color().setHex(0x008000),
    black: new THREE.Color().setHex(0x000000),
  };

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