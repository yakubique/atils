import * as core from '@actions/core';
import fs from 'node:fs';
import { describe, expect } from '@jest/globals';
import { getBooleanInput, getNumberInput, getOptional, inputJson } from '../src';
import { Y_ARRAY } from '../src/modules/input';

let getInputMock: jest.SpiedFunction<typeof core.getInput>;
let readFileSyncMock: jest.SpiedFunction<typeof fs.readFileSync>;


const blaBla = 'bla-bla';
describe('input.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    getInputMock = jest.spyOn(core, 'getInput').mockImplementation();
    readFileSyncMock = jest.spyOn(fs, 'readFileSync').mockImplementation();
  });

  describe('getBooleanInput', () => {
    [null, undefined, [], '', false, 'not empty string', {}].forEach((item: any) => {
      it(`/ false "${item}"`, () => {
        getInputMock.mockImplementation(_ => `${item}`);
        expect(getBooleanInput(item)).toBeFalsy();
      });
    });

    Y_ARRAY.forEach(item => {
      it(`/ true "${item}"`, () => {
        getInputMock.mockImplementation(_ => `${item}`);
        expect(getBooleanInput(item)).toBeTruthy();
      });
    });
  });


  describe('getNumberInput', () => {
    const testTable: { in: any, ex: number }[] = [
      { in: null, ex: NaN },
      { in: 'false', ex: NaN },
      { in: '1234', ex: 1234 },
      { in: '7321131', ex: 7321131 },
      { in: '7.999', ex: 7 }
    ];

    testTable.forEach(item => {
      it(`/ "${item.in}" == "${item.ex}"`, () => {
        getInputMock.mockImplementation(_ => `${item.in}`);

        expect(getNumberInput(item.in)).toBe(item.ex);
      });
    });
  });

  describe('getOptional', () => {
    const testTable: { in: any, ex: boolean }[] = [
      { in: null, ex: false },
      { in: undefined, ex: false },
      { in: [], ex: false },
      { in: '', ex: false }
    ];

    testTable.forEach(item => {
      it(`/ default "${item.in}"`, () => {
        getInputMock.mockImplementation(_ => item.in);
        expect(getOptional(item.in, blaBla)).toBe(blaBla);
      });
    });

    it('/ real value', () => {
      getInputMock.mockImplementation(_ => 'original');
      expect(getOptional('bruh', blaBla)).toBe('original');
    });
  });

  describe('inputJson', () => {
    it('/ from file', () => {
      readFileSyncMock.mockImplementation(_ => `"${blaBla}"`);
      expect(inputJson('randomstring.json', true)).toBe(blaBla);
    });

    it('/ NOT from file #2', () => {
      expect(inputJson(`"${blaBla}"`, false)).toBe(blaBla);
    });

    it('/ NOT from file #2', () => {
      expect(inputJson(`"${blaBla}"`)).toBe(blaBla);
    });
  });

});
