export const normalizeEnumToArray = (objectBeforeNormalize: Array<string>) => {
  return Object.values(objectBeforeNormalize).map((value: string) => ({
    label: value.split('_').join(' '),
    value,
  }));
};
