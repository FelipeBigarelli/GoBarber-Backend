// O que um provedor de hash precisa ter?
export default interface IHashProvider {
    generateHash(payload: string): Promise<string>; // Gerar uma hash
    compareHash(payload: string, hashed: string): Promise<boolean>; // Comparar hash com a gerada
}
