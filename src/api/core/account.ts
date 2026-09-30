import type { IAPIResponse } from '@/utils/interfaces.util';
import type { EditUserDTO } from '@/dtos/user.dto';
import type { ChangePasswordDTO } from '@/dtos/auth.dto';
import type AxiosService from '../base/axios';
import { ApiPath } from '../paths';

class AccountAPI {
    constructor(private axiosService: AxiosService) {}

    getAccount(): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path: ApiPath.account,
            isAuth: true,
            payload: {},
        });
    }

    getProfile(): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path: ApiPath.profile,
            isAuth: true,
            payload: {},
        });
    }

    updateProfile(payload: EditUserDTO): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'PUT',
            path: ApiPath.profile,
            isAuth: true,
            payload,
        });
    }

    getSecurity(): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path: ApiPath.security,
            isAuth: true,
            payload: {},
        });
    }

    changePassword(payload: ChangePasswordDTO): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.updatePassword,
            isAuth: true,
            payload,
        });
    }

    getTwoFactor(): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path: ApiPath.twoFactor,
            isAuth: true,
            payload: {},
        });
    }

    enableTwoFactor(payload: { otp?: string; secret?: string } = {}): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.twoFactor,
            isAuth: true,
            payload,
        });
    }

    disableTwoFactor(payload: { otp?: string } = {}): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'DELETE',
            path: ApiPath.twoFactor,
            isAuth: true,
            payload,
        });
    }

    getSessions(): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path: ApiPath.sessions,
            isAuth: true,
            payload: {},
        });
    }

    revokeSession(sessionId: string): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'DELETE',
            path: `${ApiPath.sessions}/${sessionId}`,
            isAuth: true,
            payload: {},
        });
    }

    getBilling(): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path: ApiPath.billing,
            isAuth: true,
            payload: {},
        });
    }

    getSubscriptions(): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path: ApiPath.subscriptions,
            isAuth: true,
            payload: {},
        });
    }

    getPaymentMethods(): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path: ApiPath.paymentMethods,
            isAuth: true,
            payload: {},
        });
    }

    addPaymentMethod(payload: Record<string, unknown>): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.paymentMethods,
            isAuth: true,
            payload,
        });
    }

    removePaymentMethod(paymentMethodId: string): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'DELETE',
            path: `${ApiPath.paymentMethods}/${paymentMethodId}`,
            isAuth: true,
            payload: {},
        });
    }

    getInvoices(): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path: ApiPath.invoices,
            isAuth: true,
            payload: {},
        });
    }

    setupProfile(payload: EditUserDTO): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.onboardBasicInfo,
            isAuth: true,
            payload,
        });
    }

    completeAccount(payload: Record<string, unknown> = {}): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.onboardComplete,
            isAuth: true,
            payload,
        });
    }

    deleteAccount(payload: { password?: string; confirmation?: string } = {}): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'DELETE',
            path: ApiPath.deleteAccount,
            isAuth: true,
            payload,
        });
    }
}

export default AccountAPI;
