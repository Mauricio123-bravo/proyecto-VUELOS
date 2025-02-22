import * as bcrypt from "bcrypt";
import { EncryptionProvider } from "@auth/models/encryptionProvider";

export default class BcryptAdapter implements EncryptionProvider {

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  verifyHash(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

