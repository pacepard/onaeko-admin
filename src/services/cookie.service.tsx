import Cookies from 'universal-cookie';
import type { CookieSetOptions } from 'universal-cookie';
import type { IGetCookie, IRemoveCookie, ISetCookie } from '@/utils/interfaces.util';
import { logger } from '@/utils/logger.utl';

class CookieService {

    private cookie: Cookies;

    constructor() {
        this.cookie = new Cookies()
    }

    /**
     * @name setData
     * @param data 
     */
    public setData(data: ISetCookie): void {

        let dataString: string = '';

        const { expireAt, key, payload, maxAge, path } = data;

        if (typeof (payload) === 'object') {
            dataString = JSON.stringify(payload)
        } else {
            dataString = payload.toString()
        }

        let options: CookieSetOptions = {}

        if (dataString && key) {

            options.path = path ? path : '/';

            if(expireAt){
                options.expires = expireAt
            }

            if(maxAge && maxAge > 0){
                options.maxAge = maxAge
            }

            this.cookie.set(key, dataString, options);

        }

    }

    /**
     * @name getData
     * @param data 
     * @returns 
     */
    public getData(data: IGetCookie): any {

        let result: any = null;

        const { key, parse = false } = data;

        const cookieData = this.cookie.get(key, { doNotParse: true });

        if(cookieData){

            if(parse){
                try {
                    result = JSON.parse(cookieData)
                } catch (err) {
                    logger.error('Failed to parse cookie data', { key, err });
                    result = null;
                }
            }else{
                result = cookieData.toString()
            }

        }

        return result;

    }

    /**
     * @name removeData
     * @param data 
     */
    public removeData(data: IRemoveCookie): void {

        const cookieData = this.getData({ key: data.key, parse: data.parse });

        if(cookieData){
            this.cookie.remove(data.key, { path: '/' })
        }

    }

    /**
     * @name getUserType
     * @returns 
     */
    public getUserType(): string {

        let result: string = this.getData({ key: 'userType', parse: false });
        return result;

    }

    public getToken(): string | null {

        let result: string = this.getData({ key: 'token', parse: false });
        return result;

    }

}

export default new CookieService()