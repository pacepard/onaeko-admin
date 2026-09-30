import CookieService from './cookie.service';
import { CookieKeyType } from '../utils/enums.util';
import { v4 as randomUUID } from 'uuid'
import { logger } from '@/utils/logger.utl';

class IdempotentService {

    constructor() { }

    /**
     * @name getRequestKey
     * @returns 
     */
    public getRequestKey(): string {

        let result: string = '';

        const key = CookieService.getData({ key: CookieKeyType.XHIT, parse: false });

        if (key) {
            result = key;
            logger.debug('Using existing idempotent key');
        }else{
            result = this.setRequestKey()
        }

        return result;

    }

    /**
     * @name setRequestKey
     * @returns 
     */
    public setRequestKey(): string {

        const idempKey = randomUUID();

        // save to cookie
        CookieService.setData({
            key: CookieKeyType.XHIT,
            payload: idempKey,
            path: '/',
            maxAge: 90
        });

        logger.debug('Created new idempotent key');

        return idempKey;

    }

}

export default new IdempotentService()