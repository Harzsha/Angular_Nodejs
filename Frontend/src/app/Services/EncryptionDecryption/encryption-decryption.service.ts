import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncryptionDecryptionService {

  constructor() { }

  private secretKey = 'your-secret-key';

  encrypt(data: any) {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
    return encrypted;
  }

  decrypt(encryptedData:any): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
}
