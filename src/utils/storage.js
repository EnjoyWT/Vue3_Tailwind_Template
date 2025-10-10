/**
 * 本地存储工具类
 * 统一管理 localStorage 和 sessionStorage
 * 
 * @example
 * // 基础用法
 * import { setLocal, getLocal, localStorage, sessionStorage } from '@/utils/storage'
 * 
 * // 存储用户信息
 * setLocal('user', { name: '张三', age: 25 })
 * const user = getLocal('user')
 * 
 * // 带过期时间（1小时后过期）
 * setLocal('token', 'abc123', 60 * 60 * 1000)
 * 
 * // 使用类实例方法
 * localStorage.set('settings', { theme: 'dark' })
 * sessionStorage.set('temp', 'temporary value')
 * 
 * // 批量操作
 * localStorage.setMultiple({
 *   'key1': 'value1',
 *   'key2': { data: 'object' }
 * })
 * 
 * const data = localStorage.getMultiple(['key1', 'key2'])
 * 
 * // 检查存储项
 * if (localStorage.has('user')) {
 *   console.log('用户信息存在')
 * }
 * 
 * // 获取存储大小
 * console.log('存储大小:', localStorage.size(), 'bytes')
 */

class Storage {
  constructor(storage) {
    this.storage = storage;
  }

  /**
   * 设置存储项
   * @param {string} key 键名
   * @param {any} value 值（会自动序列化）
   * @param {number} expire 过期时间（毫秒），可选
   */
  set(key, value, expire = null) {
    try {
      const data = {
        value,
        expire: expire ? Date.now() + expire : null,
        timestamp: Date.now()
      };
      this.storage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.warn('Storage set error:', error);
      return false;
    }
  }

  /**
   * 获取存储项
   * @param {string} key 键名
   * @param {any} defaultValue 默认值
   * @returns {any} 存储的值或默认值
   */
  get(key, defaultValue = null) {
    try {
      const item = this.storage.getItem(key);
      if (!item) return defaultValue;

      const data = JSON.parse(item);
      
      // 检查是否过期
      if (data.expire && Date.now() > data.expire) {
        this.remove(key);
        return defaultValue;
      }

      return data.value;
    } catch (error) {
      console.warn('Storage get error:', error);
      return defaultValue;
    }
  }

  /**
   * 移除存储项
   * @param {string} key 键名
   */
  remove(key) {
    try {
      this.storage.removeItem(key);
      return true;
    } catch (error) {
      console.warn('Storage remove error:', error);
      return false;
    }
  }

  /**
   * 清空所有存储项
   */
  clear() {
    try {
      this.storage.clear();
      return true;
    } catch (error) {
      console.warn('Storage clear error:', error);
      return false;
    }
  }

  /**
   * 获取所有键名
   * @returns {string[]} 键名数组
   */
  keys() {
    try {
      return Object.keys(this.storage);
    } catch (error) {
      console.warn('Storage keys error:', error);
      return [];
    }
  }

  /**
   * 检查键是否存在
   * @param {string} key 键名
   * @returns {boolean} 是否存在
   */
  has(key) {
    return this.storage.getItem(key) !== null;
  }

  /**
   * 获取存储大小（近似值）
   * @returns {number} 字节数
   */
  size() {
    try {
      let total = 0;
      for (let key in this.storage) {
        if (this.storage.hasOwnProperty(key)) {
          total += this.storage[key].length + key.length;
        }
      }
      return total;
    } catch (error) {
      console.warn('Storage size error:', error);
      return 0;
    }
  }

  /**
   * 批量设置
   * @param {Object} data 键值对对象
   * @param {number} expire 过期时间（毫秒），可选
   */
  setMultiple(data, expire = null) {
    const results = {};
    for (const [key, value] of Object.entries(data)) {
      results[key] = this.set(key, value, expire);
    }
    return results;
  }

  /**
   * 批量获取
   * @param {string[]} keys 键名数组
   * @param {any} defaultValue 默认值
   * @returns {Object} 键值对对象
   */
  getMultiple(keys, defaultValue = null) {
    const results = {};
    keys.forEach(key => {
      results[key] = this.get(key, defaultValue);
    });
    return results;
  }

  /**
   * 批量移除
   * @param {string[]} keys 键名数组
   */
  removeMultiple(keys) {
    const results = {};
    keys.forEach(key => {
      results[key] = this.remove(key);
    });
    return results;
  }
}

// 创建实例
export const localStorage = new Storage(window.localStorage);
export const sessionStorage = new Storage(window.sessionStorage);

// 默认导出 localStorage
export default localStorage;

// 常用方法的快捷方式
export const setLocal = (key, value, expire) => localStorage.set(key, value, expire);
export const getLocal = (key, defaultValue) => localStorage.get(key, defaultValue);
export const removeLocal = (key) => localStorage.remove(key);
export const clearLocal = () => localStorage.clear();

export const setSession = (key, value, expire) => sessionStorage.set(key, value, expire);
export const getSession = (key, defaultValue) => sessionStorage.get(key, defaultValue);
export const removeSession = (key) => sessionStorage.remove(key);
export const clearSession = () => sessionStorage.clear();