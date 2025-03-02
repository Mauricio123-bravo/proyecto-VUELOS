import * as bcrypt from "bcrypt";
import { EncryptionProvider } from "../models/providers/encryptionProvider";

export default class BcryptProvider implements EncryptionProvider {

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  verifyHash(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

