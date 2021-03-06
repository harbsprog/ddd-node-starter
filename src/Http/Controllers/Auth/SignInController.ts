import { Request } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { SignInDTO } from "../../../Infrastructure/DTO/Auth/SignInDTO";
import { IAuthService } from '../../../Domain/Core/IAuthService';
import * as validate from 'express-validation';
import * as signInValidator from '../../../Infrastructure/Validators/Auth/SignInValidator';

@controller('/auth/sign-in')
export class SignInController {

    constructor(@inject('IAuthService') private authService: IAuthService) {}

    /**
     * @param {Request} request
     * @returns {Promise<void>}
     */
    @httpPost('/', validate(signInValidator))
    public async signIn(request: Request) {

        return await this.authService.signIn(
            SignInDTO.fromRequest(request)
        );
    }
}