export interface EncryptionProvider {
  hashPassword(password: string): Promise<string>;
  verifyHash(password: string, hashedPassword: string): boolean;
}
