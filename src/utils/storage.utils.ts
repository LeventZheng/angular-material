export class StorageUtils {
    /***************************** localStorage ****************************/
    /* 新增/更新localStorage,存储数字与字符串 */
    static setLocalStorage(key, val: number|string) {
        return localStorage.setItem(key, val+'');
    }
    /* 获取localStorage */
    static getLocalStorage(key): string {
        return localStorage.getItem(key);
    }
    /* 新增/更新localStorage,序列化后的 */
    static setSerializeLocalStorage(key, val) {
      localStorage.setItem(key, JSON.stringify(val));
    }
    /* 获取localStorage,反序列化后的 */
    static getDeserializeLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }
    /* 删除localStorage */
    static removeLocalStorage(key) {
        return localStorage.removeItem(key);
    }
    /***************************** localStorage ****************************/
    static getUser() {
        return StorageUtils.getDeserializeLocalStorage('user');
    }
    static getPrincipal() {
        return StorageUtils.getDeserializeLocalStorage('principal');
    }
    static removePrincipal() {
        return StorageUtils.removeLocalStorage('principal');
    }
    static getModuleCodeSet() {
        return StorageUtils.getDeserializeLocalStorage('moduleCodeSet');
    }
    /***************************** sessionStorage ****************************/
    static setSessionStorage(key, val: number|string) {
        return sessionStorage.setItem(key, val + '');
    }
    static getSessionStorage(key): string {
        return sessionStorage.getItem(key);
    }
    static setSerializeSessionStorage(key, val) {
        return sessionStorage.setItem(key, JSON.stringify(val));
    }
    static getDeserializeSessionStorage(key) {
        return JSON.parse(sessionStorage.getItem(key));
    }
    static removeSessionStorage(key) {
        return sessionStorage.removeItem(key);
    }
    /***************************** sessionStorage ****************************/
}
