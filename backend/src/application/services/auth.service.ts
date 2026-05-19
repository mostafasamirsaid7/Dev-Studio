import bcrypt from "bcryptjs";
import { IUnitOfWork } from "../../domain/repositories/unit-of-work.interface.js";

export class AuthService {
  constructor(private uow: IUnitOfWork) {}

  async findUserByEmail(email: string) {
    const [user] = await this.uow.authUsers.findByField('email', email.toLowerCase());
    return user ?? null;
  }

  async findUserById(id: string) {
    return await this.uow.authUsers.findById(id);
  }

  async verifyPassword(passwordPlain: string, passwordHash: string) {
    return await bcrypt.compare(passwordPlain, passwordHash);
  }

  async registerUser(
    email: string,
    passwordPlain: string,
    displayName?: string,
  ) {
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const passwordHash = await bcrypt.hash(passwordPlain, 12);

    const user = await this.uow.authUsers.create({
      email: email.toLowerCase(),
      passwordHash,
      displayName: displayName || email.split("@")[0],
      isVerified: false,
      verificationToken,
      verificationTokenExpires,
    });

    return user;
  }

  async createNewVerificationToken(userId: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const updated = await this.uow.authUsers.update(userId, {
      verificationToken: code,
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    return updated;
  }

  async verifyUserEmail(userId: string) {
    const updated = await this.uow.authUsers.update(userId, {
      isVerified: true,
      verificationToken: null,
      verificationTokenExpires: null,
    });
    return updated;
  }
}

