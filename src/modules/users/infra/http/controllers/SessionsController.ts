/** Controller (seguindo padrões da arquitetura RESTFULL API) -> no max, 5 métodos:
 * index: listar todos; show: listar um; create; update: atualizar todas as infos da entidade; delete
 */
// Controllers: responsáveis por receber requisição, reṕassar pra outro arquivo lidar com isso, e retornar uma resposta

import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        delete user.password;

        return response.json({ user, token });
    }
}
