import { Request, Response, NextFunction } from 'express';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';

interface SetupController {
  create: (req: Request, res: Response, next: NextFunction) => void;
}

const setupController: SetupController = {
  create: (req, res, next) => {
    // NOTICE!!! Change to unique secret for best security
    const secretKey = 'g<Q2dpoJ[S1=9~$';

    // Encrypt
    const ciphertext = AES.encrypt(
      JSON.stringify(req.body),
      secretKey
    ).toString();

    // Decrypt
    const bytes = AES.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    console.log('Original:', req.body);
    console.log('Encrypted:', ciphertext);
    console.log('Decrypted:', JSON.parse(originalText));

    return next();
  },
};

export default setupController;
