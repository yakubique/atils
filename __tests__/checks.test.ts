import { describe, expect } from '@jest/globals';
import { isBlank, isNotBlank } from '../src';

describe('checks.ts', () => {

  describe('isBlank', () => {
    const testTable: { in: any, ex: boolean }[] = [
      { in: null, ex: true },
      { in: undefined, ex: true },
      { in: [], ex: true },
      { in: '', ex: true },
      { in: 1, ex: false },
      { in: false, ex: false },
      { in: 'not empty string', ex: false },
      { in: [1], ex: false },
      { in: {}, ex: false }
    ];

    testTable.forEach(item => {
      it(`/ check "${item.in}"`, () => {
        expect(isBlank(item.in)).toBe(item.ex);
      });
    });

  });

  describe('isNotBlank', () => {
    const testTable: { in: any, ex: boolean }[] = [
      { in: null, ex: false },
      { in: undefined, ex: false },
      { in: [], ex: false },
      { in: '', ex: false },
      { in: 1, ex: true },
      { in: false, ex: true },
      { in: 'not empty string', ex: true },
      { in: [1], ex: true },
      { in: {}, ex: true }
    ];

    testTable.forEach(item => {
      it(`/ check "${item.in}"`, () => {
        expect(isNotBlank(item.in)).toBe(item.ex);
      });
    });

  });
});

