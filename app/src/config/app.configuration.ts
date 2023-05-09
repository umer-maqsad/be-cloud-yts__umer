export enum ConfigKeys {
  ENV_NAME = 'ENV_NAME',
  MOVIE_TABLE_NAME = 'MOVIE_TABLE_NAME',
  ACCESS_KEY_ID = 'ACCESS_KEY_ID',
  SECRET_ACCESS_KEY = 'SECRET_ACCESS_KEY',
}

type EnvKeys = { [key: string]: string };

export default () => {
  const keys = Object.keys(ConfigKeys);

  const environmentVariablesMap = keys.reduce(
    (accumulator: EnvKeys, currentValue: string) => {
      accumulator[currentValue] = process.env?.[currentValue] ?? '';
      return accumulator;
    },
    {},
  );

  return environmentVariablesMap;
};
