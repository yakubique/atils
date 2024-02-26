function isBlank(value: any): boolean {
  return value === null || value === undefined || (value.length !== undefined && value.length === 0);
}

function isNotBlank(value: any): boolean {
  return value !== null && value !== undefined && (value.length === undefined || value.length > 0);
}

export default {
  isBlank,
  isNotBlank
};
