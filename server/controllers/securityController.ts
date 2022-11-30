import { RequestHandler } from 'express';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';

type SecurityController = {
  decrypt: RequestHandler;
};

const securityController: SecurityController = {
  decrypt: (req, res, next) => {
    // const bytes = AES.decrypt(data, secret);
    // const originalText = bytes.toString(CryptoJS.enc.Utf8);

    return next();
  },
};

export default securityController;
