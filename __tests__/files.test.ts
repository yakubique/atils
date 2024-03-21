import fs from 'node:fs';
import { describe, expect } from '@jest/globals';
import { temporaryFile } from '../src';

let mkdirSyncMock: jest.SpiedFunction<typeof fs.mkdirSync>;
let realpathSyncMock: jest.SpiedFunction<typeof fs.realpathSync>;

const blaBla = 'bla-bla';

describe('files.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mkdirSyncMock = jest.spyOn(fs, 'mkdirSync').mockImplementation();
    realpathSyncMock = jest.spyOn(fs, 'realpathSync').mockImplementation();
  });

  it('temporaryFile', () => {
    realpathSyncMock.mockImplementation(_ => blaBla);
    mkdirSyncMock.mockImplementation(_ => blaBla);

    expect(temporaryFile({
      name: 'uniquefilename',
      extension: 'json'
    })).toEqual(expect.stringMatching(/^bla-bla\/.+?\/uniquefilename$/i));
    expect(realpathSyncMock).toBeCalled();
    expect(mkdirSyncMock).toBeCalled();

    expect(temporaryFile()).toEqual(expect.stringMatching(/^bla-bla\/.+?$/i));
  });

  it('temporaryDirectory', () => {
    realpathSyncMock.mockImplementation(_ => blaBla);
    mkdirSyncMock.mockImplementation(_ => blaBla);

    expect(temporaryFile(
      { extension: 'json' })
    ).toEqual(expect.stringMatching(/^bla-bla\/.+?\.json$/i));
    expect(realpathSyncMock).toBeCalled();
    expect(mkdirSyncMock).not.toBeCalled();

    expect(
      temporaryFile({ extension: undefined })
    ).toEqual(expect.stringMatching(/^bla-bla\/.+$/i));
  });
});
