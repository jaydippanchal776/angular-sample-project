
import { environment } from '../environments/environment';

export class config {

    // LABLES
    static LBL_WELCOME = 'Welcome';

    // LOCAL STORAGE
    static LOCAL_STORAGE_USERNAME = 'sp_username';
    static LOCAL_STORAGE_USER_TOKEN = 'sp_token';
    

    // API END POINTS
    static API_ENDPOINT = environment.API_ENDPOINT;
    
    // DEFAULTS
    static IS_PRODUCTION = environment.production;
    static REQUEST_POST = 'post';

    // TABLES

    // FUNCTIONS
    public static getAPIURL(url) {
        return this.API_ENDPOINT + url;
    }

    public static getLocalStorageValue(key, defaultVal: any = '', isObject = false) {
        if (localStorage) {
            const localVal = localStorage.getItem(key);
            if (localVal != null && localVal !== 'undefined') {
                if (isObject) {
                    return JSON.parse(localVal);
                } else {
                    return localVal;
                }
            } else {
                return defaultVal;
            }
        }
        return '';
    }


    public static setLocalStorageValue(key, val, isObject = false) {
        if (localStorage) {
            if (isObject) {
                val = JSON.stringify(val);
            }
            localStorage.setItem(key, val);
        }
    }

    public static removeLocalStorageValue(key) {
        if (localStorage) {
            localStorage.removeItem(key);
        }
    }
}