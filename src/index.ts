import checks from './modules/checks';
import input from './modules/input';
import files from './modules/files';
import outputs from './modules/outputs';

export const isBlank = checks.isBlank;
export const isNotBlank = checks.isNotBlank;

export const getBooleanInput = input.getBooleanInput;
export const getNumberInput = input.getNumberInput;
export const getOptional = input.getOptional;
export const inputJson = input.inputJson;

export const temporaryDirectory = files.temporaryDirectory;
export const temporaryFile = files.temporaryFile;

export const buildOutput = outputs.buildOutput;
export const outputJson = outputs.outputJson;
