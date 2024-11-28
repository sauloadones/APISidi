import bcrypt from 'bcrypt'

export async function encrypt(password: string): Promise<string>{
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
}

export async function compare(hashedPassword:string, password:string): Promise<boolean>{
    const passwordMatch = await bcrypt.compare(password, hashedPassword)
    return passwordMatch
}

