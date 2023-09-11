import bcrypt from 'bcrypt'

export class Crypt {

    constructor(
        private saltRounds: number
    ) {}

    encrypt(plain: string): Promise<string> {
        return await bcrypt.hash(plain, this.rounds)
    }
}