import type { IAPIResponse } from '@/utils/interfaces.util';
import type {
    ActivateDTO,
    ChangePasswordDTO,
    ForgotPasswordDTO,
    LoginDTO,
    LogoutDTO,
    RegisterUserDTO,
    ResendOtpDTO,
    ResetPasswordDTO,
    VerifyOtpDTO,
} from '../../dtos/auth.dto';
import type AxiosService from '../base/axios';
import { ApiPath } from '../paths';

class AuthAPI {
    constructor(private axiosService: AxiosService) {}

    /**
     * @name registerUser
     * @description Register a new user account.
     */
    registerUser(payload: RegisterUserDTO): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.register,
            isAuth: false,
            payload,
        });
    }

    /**
     * @name activateUser
     * @description Activate a user account after registration using an OTP code.
     */
    activateUser(payload: ActivateDTO): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.activate,
            isAuth: false,
            payload,
        });
    }

    /**
     * @name loginUser
     * @description Log a user into the system.
     */
    loginUser(payload: LoginDTO): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.login,
            isAuth: false,
            payload,
        });
    }

    /**
     * @name verifyOTP
     * @description Validate an OTP for account actions.
     */
    verifyOTP(payload: VerifyOtpDTO): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.verifyOtp,
            isAuth: false,
            payload,
        });
    }

    /**
     * @name resendOTP
     * @description Request that a new OTP be sent to the user.
     */
    resendOTP(payload: ResendOtpDTO): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.resendOtp,
            isAuth: false,
            payload,
        });
    }

    /**
     * @name getToken
     * @description Fetch a refreshed token from the server.
     */
    getToken(payload: unknown): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.token,
            isAuth: false,
            payload,
        });
    }

    /**
     * @name changePassword
     * @description Change the user password.
     */
    changePassword(payload: ChangePasswordDTO): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.updatePassword,
            isAuth: true,
            payload,
        });
    }

    /**
     * @name logoutUser
     * @description Log the user out of the system.
     */
    logoutUser(payload: LogoutDTO): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.logout,
            isAuth: true,
            payload,
        });
    }

    /**
     * @name logout
     * @description Log the current user out (no payload).
     */
    logout(): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.logout,
            isAuth: true,
            payload: {},
        });
    }

    /**
     * @name forgotPassword
     * @description Send an OTP for password recovery.
     */
    forgotPassword(payload: ForgotPasswordDTO): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.forgotPassword,
            isAuth: false,
            payload,
        });
    }

    /**
     * @name resetPassword
     * @description Reset the user's password using a valid OTP.
     */
    resetPassword(payload: ResetPasswordDTO): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.resetPassword,
            isAuth: false,
            payload,
        });
    }

    /**
     * @name verifyEmail
     * @description Verify a user's email address.
     */
    verifyEmail(payload: { email: string; token?: string; otp?: number }): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.verifyEmail,
            isAuth: false,
            payload,
        });
    }

    /**
     * @name continueHandoff
     * @description Complete auth handoff and continue into the product.
     */
    continueHandoff(payload: { redirect?: string } = {}): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.continue,
            isAuth: true,
            payload,
        });
    }

    /**
     * @name getOAuthUrl
     * @description Backend path to start an OAuth flow (google | github).
     */
    getOAuthUrl(provider: 'google' | 'github'): string {
        return provider === 'google' ? ApiPath.oauthGoogle : ApiPath.oauthGithub;
    }

    /**
     * @name oauthCallback
     * @description Exchange OAuth callback params for a session.
     */
    oauthCallback(payload: {
        code?: string;
        state?: string;
        provider?: 'google' | 'github';
    }): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.oauthCallback,
            isAuth: false,
            payload,
        });
    }
}

export default AuthAPI;
