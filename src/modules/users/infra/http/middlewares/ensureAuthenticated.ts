// Middleware que irá verificar se o usuário está realmente autenticado na aplicacao
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
// verify: retorna token decodificado caso este seja válido

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';

interface TokenPayLoad {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    // Validação do token jwt

    const authHeader = request.headers.authorization; // token do insomnia do header

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    // Se token existir: ta nesse formato: Bearer <token>
    // Dividir
    const [, token] = authHeader.split(' '); // split retorna array

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        // se decoded retornar um user valido
        const { sub } = decoded as TokenPayLoad; //  forçar decoded para tipo TokenPayLoad

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        //sem (err) nas novas versões do typescript
        throw new AppError('Invalid JWT token', 401);
    }
}
