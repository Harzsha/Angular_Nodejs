import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncryptionDecryptionService {

  constructor() { }

  private passphrase = 'mySecretPassphrase';

  encrypt(data: any): string {
    const encryptedText = CryptoJS.AES.encrypt(JSON.stringify(data), this.passphrase).toString();
    return encryptedText;
  }

  decrypt(encryptedText: string): any {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, this.passphrase);
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
}
