import bcrypt from "bcrypt"

export class Crypt {

    constructor(
        private saltRounds: number
    ) {}

    async encrypt(plain: string): Promise<string> {
        return await bcrypt.hash(plain, this.rounds)
    }

    async compare(plain: string, hashed: string): Promise<boolean> {
        return await bcrypt.compare(plain, hashed)
    }
}