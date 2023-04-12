export type UserData = {
  decryption: string;
  dbs: { nickname: string; uri: string }[];
};

export type DbData = {
  nickname: string;
  uri: string;
};

export type AllQueries = {
  all: [{ [key: string]: string | number }];
  median: number;
  mean: number;
  slowestQueries: [{ [key: string]: string | number }];
};
