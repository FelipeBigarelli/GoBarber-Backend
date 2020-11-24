// definição de tipos do express: express.d.ts
// Hack do typescript
declare namespace Express {
    export interface Request {
        // Vai anexar o que colocar aqui dentro ao que já existe dentro do express
        user: {
            id: string;
        };
    }
}
