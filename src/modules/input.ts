import { InputOptions } from '@actions/core';
import * as core from '@actions/core';
import checks from './checks';
import { readFileSync } from 'node:fs';

export const Y_ARRAY = ['y', 'yes', 't', 'true', 'e', 'enable', 'enabled', 'on', 'ok', '1'];

function getBooleanInput(name: string, options?: InputOptions): boolean {
  const value = core.getInput(name, options);
  const valueClear = value.trim().toLowerCase();

  return checks.isNotBlank(value) && Y_ARRAY.some((x) => x === valueClear);
}

function getNumberInput(name: string, options?: InputOptions): number {
  return parseInt(`${core.getInput(name, options)}`, 10);
}

function getOptional<T>(name: string, defaultValue: T, options?: InputOptions): string | T {
  const value = core.getInput(name, options);
  if (checks.isBlank(value)) {
    return defaultValue;
  }

  return value;
}

function inputJson(inputStr: string, fromFile: boolean = false): any {
  let input: any;

  if (fromFile) {
    input = JSON.parse(readFileSync(inputStr, { encoding: 'utf8' }).toString()) as any[];
  } else {
    input = JSON.parse(inputStr) as any[];
  }

  return input;
}

export default { getBooleanInput, inputJson, getNumberInput, getOptional };
