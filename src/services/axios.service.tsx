import type { CallApiDTO } from "@/dtos/axios.dto";
import Axios from 'axios'
import storage from "../utils/storage.util";
import type { IAPIResponse } from "../utils/interfaces.util";
import { RouteURL } from "@/routes/paths";
import { logger } from '@/utils/logger.utl';

class AxiosService {

    public baseUrl: string;
    constructor() {

        if (!import.meta.env.VITE_APP_API_URL) {
            logger.error('API base url not defined');
            throw new Error('API base url not defined')
        }

        Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        this.baseUrl = import.meta.env.VITE_APP_API_URL;
        logger.debug('AxiosService initialized', { baseUrl: this.baseUrl });

    }

    /**
     * @name call
     * @param params 
     * @returns 
     */
    public async call(params: CallApiDTO): Promise<IAPIResponse> {

        let result: any = {}
        const { isAuth = false, method, path, type, payload } = params;

        let urlpath = `${this.baseUrl}${path}`;

        logger.debug('API request', { method, path: urlpath, isAuth, type });

        await Axios({
            method: method,
            url: urlpath,
            data: payload,
            headers: isAuth ? storage.getConfigWithBearer().headers : storage.getConfig().headers
        }).then((resp) => {
            result = resp.data;
            logger.debug('API response', { method, path: urlpath, status: resp.status });
        }).catch((err) => {

            if (err.response) {
                logger.error('API error response', {
                    method,
                    path: urlpath,
                    status: err.response.status,
                    data: err.response.data,
                });

                if (err.response.status === 404) {
                    result.error = true;

                    if (err.response.data.errors) {
                        result.errors = err.response.data.errors
                    } else if (err.response.data.message) {
                        result.message = err.response.data.message
                    } else {
                        result.message = 'unable to get requested resource';
                    }

                    result.data = null;
                } else if (err.response.status === 502) {
                    result.error = true;

                    if (err.response.data.errors) {
                        result.errors = err.response.data.errors
                    } else if (err.response.data.message) {
                        result.message = err.response.data.message
                    } else {
                        result.message = 'unable to get requested resource';
                    }

                    result.data = null;
                } else {

                    if (err.response.data) {
                        result = err.response.data;
                    } else {
                        result.error = true;
                        result.errors = ['an error occured'];
                        result.message = 'An error occured';
                        result.data = null;
                    }

                }

            } else if (typeof (err) === 'object') {
                logger.error('API network/object error', { method, path: urlpath, err });
                result.error = true;
                result.errors = ['an error occurred. please try again']
                result.message = 'Error';
                result.data = err;
            } else if (typeof (err) === 'string') {
                logger.error('API string error', { method, path: urlpath, err });
                result.error = true;
                result.errors = [err.toString()]
                result.message = err.toString();
                result.data = err.toString()
            }

        })

        return result;

    }

    /**
     * @name logout
     */
    public async logout(): Promise<void> {

        storage.clearAuth()
        await this.call({
            method: 'POST',
            type: 'default',
            path: RouteURL.logout,
            isAuth: false,
            payload: {}
        });

    }

}

export default new AxiosService()