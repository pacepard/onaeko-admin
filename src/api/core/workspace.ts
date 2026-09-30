import type { IAPIResponse } from '@/utils/interfaces.util';
import type AxiosService from '../base/axios';
import { ApiPath } from '../paths';

class WorkspaceAPI {
    constructor(private axiosService: AxiosService) {}

    createWorkspace(payload: {
        name: string;
        description?: string;
        icon?: { fileName?: string; s3Key?: string };
    }): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.workspace,
            isAuth: true,
            payload,
        });
    }
}

export default WorkspaceAPI;
