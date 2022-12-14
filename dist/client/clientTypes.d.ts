export type UserData = {
    decryption: string;
    dbs: {
        nickname: string;
        uri: string;
    }[];
};
export type DbData = {
    nickname: string;
    uri: string;
};
