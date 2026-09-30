import type { IAPIResponse, IListQuery } from '@/utils/interfaces.util';
import type AxiosService from '../base/axios';
import { ApiPath } from '../paths';

interface ISendUsersUpdate {
    title: string;
    content: string;
    users: Array<string>;
}

interface IInviteTalent {
    title: string;
    content: string;
    email: string;
    firstName: string;
    lastName: string;
    callbackUrl: string;
}

class UserAPI {
    constructor(private axiosService: AxiosService) {}

    getUsers(payload: IListQuery, all: boolean = false): Promise<IAPIResponse> {
        const { limit, page, order } = payload;
        const q = `limit=${limit ? limit.toString() : 25}&page=${page ? page.toString() : 1}&order=${order ? order : 'desc'}`;

        let path = `${ApiPath.users}?${q}`;
        if (all) {
            path = `${ApiPath.users}/all?cache=false&${q}`;
        }

        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path,
            isAuth: true,
            payload: {},
        });
    }

    getUser(userId?: string): Promise<IAPIResponse> {
        const path = userId ? `${ApiPath.loggedInUser}/${userId}` : ApiPath.loggedInUser;

        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path,
            isAuth: true,
            payload: {},
        });
    }

    getTalents(payload: IListQuery): Promise<IAPIResponse> {
        const { limit, page, order } = payload;
        const q = `limit=${limit ? limit.toString() : 25}&page=${page ? page.toString() : 1}&order=${order ? order : 'desc'}`;

        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path: `${ApiPath.talents}?${q}`,
            isAuth: true,
            payload: {},
        });
    }

    getTalent(userId: string): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path: `${ApiPath.talents}/${userId}`,
            isAuth: true,
            payload: {},
        });
    }

    sendUsersUpdate(payload: ISendUsersUpdate): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: `${ApiPath.users}/send-update`,
            isAuth: true,
            payload,
        });
    }

    inviteTalent(payload: IInviteTalent): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: `${ApiPath.users}/invite-talent`,
            isAuth: true,
            payload,
        });
    }

    setUserType(payload: { userType: string }): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.onboardUserType,
            isAuth: true,
            payload,
        });
    }

    setBasicInfo(payload: {
        firstName: string;
        lastName: string;
        phoneCode?: string;
        phoneNumber?: string;
        location: {
            address?: string;
            city?: string;
            state?: string;
            country: string;
            postalCode?: string;
        };
        timeZone: string;
    }): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.onboardBasicInfo,
            isAuth: true,
            payload,
        });
    }

    setUserInfo(payload: { specialty: string; role: string; discovery: string }): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.onboardUserInfo,
            isAuth: true,
            payload,
        });
    }

    setTalentInfo(payload: {
        specialty: string;
        gender: string;
        dateOfBirth: string;
        occupationType: string;
        interests: Array<string>;
    }): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.onboardTalentInfo,
            isAuth: true,
            payload,
        });
    }

    setBusinessInfo(payload: {
        businessName: string;
        businessType: string;
        industry: string;
        tags?: Array<string>;
    }): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.onboardBusinessInfo,
            isAuth: true,
            payload,
        });
    }

    completeOnboarding(): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.onboardComplete,
            isAuth: true,
            payload: {},
        });
    }

    getOnboardingStatus(): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path: ApiPath.onboardStatus,
            isAuth: true,
            payload: {},
        });
    }
}

export default UserAPI;
