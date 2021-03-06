/**
 * 获取随机字符串
 * @param len
 * @returns {string}
 */
export const getRandomStr = (len = 32) => {
    const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const maxPos = $chars.length;
    let str = '';
    for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
};

/**
 * 存储localStorage
 * @param name
 * @param content
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 * @param name
 * @returns {string}
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 * @param name
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}