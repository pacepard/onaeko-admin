import type { IAPIResponse } from '@/utils/interfaces.util';
import type AxiosService from '../base/axios';
import { ApiPath } from '../paths';

class StorageAPI {
    constructor(private axiosService: AxiosService) {}

    uploadImage(payload: FormData): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.storageUpload,
            isAuth: true,
            payload,
        });
    }
}

export default StorageAPI;
