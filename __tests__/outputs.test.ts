import * as core from '@actions/core';
import fs from 'node:fs';
import { describe, expect } from '@jest/globals';
import { buildOutput, outputJson } from '../src';

let writeFileSyncMock: jest.SpiedFunction<typeof fs.writeFileSync>;
let setOutputMock: jest.SpiedFunction<typeof core.setOutput>;
let infoMock: jest.SpiedFunction<typeof core.info>;

enum OutputsTest {
  result = 'result'
}

const blaBla = 'bla-bla';

describe('outputs.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    infoMock = jest.spyOn(core, 'info').mockImplementation();
    setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation();
    writeFileSyncMock = jest.spyOn(fs, 'writeFileSync').mockImplementation();
  });


  describe('buildOutput', () => {
    it('test basic', () => {
      const setOutput = buildOutput(OutputsTest);

      expect(setOutput).not.toBeNull();

      setOutputMock.mockImplementation(_ => blaBla);

      setOutput({ result: blaBla });
      expect(setOutputMock).toBeCalledWith('result', blaBla);

      setOutput({ result: blaBla + blaBla }, true);
      expect(infoMock).toBeCalled();
    });
  });

  describe('outputJson', () => {
    it('to file', () => {
      writeFileSyncMock.mockImplementation(_ => blaBla);

      expect(outputJson(blaBla, true)).not.toBe(blaBla);
      expect(writeFileSyncMock).toBeCalled();
    });

    it('NOT to file', () => {
      expect(outputJson(blaBla, false)).toBe(blaBla);
      expect(outputJson(blaBla)).toBe(blaBla);
    });
  });
});
