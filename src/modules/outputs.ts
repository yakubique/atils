import * as core from '@actions/core';
import { writeFileSync } from 'node:fs';
import files from './files';

function buildOutput<T>(outputs: T) {
    return function setOutputs(response: any, log?: boolean) {
        let message = '';
        for (const key in outputs) {
            const field: string = (outputs as any)[key];

            if (log) {
                message += `\n  ${field}: ${JSON.stringify(response[field])}`;
            }

            core.setOutput(field, response[field]);
        }

        if (log) {
            core.info('Outputs:' + message);
        }
    };
}

function outputJson<T>(result: T, toFile: boolean = false, space?: string | number | undefined): string | T {
    let resPath;

    if (toFile) {
        resPath = files.temporaryFile({ extension: 'json' });
        writeFileSync(resPath, JSON.stringify(result, undefined, space), { encoding: 'utf8' });

        return resPath;
    } else {
        return result;
    }
}

export default { buildOutput, outputJson };
