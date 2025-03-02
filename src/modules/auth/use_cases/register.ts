import { User } from "../../users/models/user.model"
import { UserRepo } from "../../users/models/user.repository"
import { EncryptionProvider } from "../models/providers/encryptionProvider"

export default class RegisterUseCase {
	constructor(
		private readonly userRepository: UserRepo,
		private readonly encryption: EncryptionProvider,
	) {}

	async register(user: User): Promise<number> {
		user.password = await this.encryption.hashPassword(user.password)
		return this.userRepository.save(user)
	}
}

