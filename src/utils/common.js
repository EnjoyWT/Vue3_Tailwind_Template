/**
 * 通用工具函数库
 * 包含防抖、节流、深拷贝等常用功能
 * 
 * @example
 * // 防抖使用
 * import { debounce, throttle, deepClone } from '@/utils/common'
 * 
 * // 防抖搜索
 * const searchInput = debounce((value) => {
 *   console.log('搜索:', value)
 * }, 300)
 * 
 * // 节流滚动
 * const handleScroll = throttle(() => {
 *   console.log('滚动事件')
 * }, 100)
 * 
 * // 深拷贝对象
 * const original = { a: 1, b: { c: 2 } }
 * const copied = deepClone(original)
 * 
 * // 生成唯一ID
 * const id = generateId()
 * console.log(id) // uuid-like string
 * 
 * // 格式化文件大小
 * console.log(formatFileSize(1024)) // "1.00 KB"
 * 
 * // 休眠函数
 * await sleep(1000) // 等待1秒
 */

/**
 * 防抖函数
 * @param {Function} func 要执行的函数
 * @param {number} wait 等待时间（毫秒）
 * @param {boolean} immediate 是否立即执行
 * @returns {Function} 防抖后的函数
 */
export function debounce(func, wait = 300, immediate = false) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func.apply(this, args);
  };
}

/**
 * 节流函数
 * @param {Function} func 要执行的函数
 * @param {number} limit 限制时间（毫秒）
 * @returns {Function} 节流后的函数
 */
export function throttle(func, limit = 300) {
  let inThrottle;
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * 深拷贝函数
 * @param {any} obj 要拷贝的对象
 * @returns {any} 拷贝后的对象
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  
  return obj;
}

/**
 * 生成唯一ID (简单随机字符串，非UUID标准)
 * @param {number} length ID长度
 * @returns {string} 随机ID字符串
 */
export function generateId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 休眠函数
 * @param {number} ms 休眠时间（毫秒）
 * @returns {Promise} Promise对象
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 格式化文件大小
 * @param {number} bytes 字节数
 * @param {number} decimals 小数位数
 * @returns {string} 格式化后的文件大小
 */
export function formatFileSize(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * 数字格式化（添加千分位分隔符）
 * @param {number} num 数字
 * @param {string} separator 分隔符
 * @returns {string} 格式化后的数字
 */
export function formatNumber(num, separator = ',') {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * 获取数据类型
 * @param {any} obj 要检测的数据
 * @returns {string} 数据类型
 */
export function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

/**
 * 检查是否为空值
 * @param {any} value 要检查的值
 * @returns {boolean} 是否为空
 */
export function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * 数组去重
 * @param {Array} arr 要去重的数组
 * @param {string} key 对象数组去重的键名
 * @returns {Array} 去重后的数组
 */
export function uniqueArray(arr, key = null) {
  if (!Array.isArray(arr)) return [];
  
  if (key) {
    // 对象数组去重
    const seen = new Set();
    return arr.filter(item => {
      const value = item[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  }
  
  // 基本类型数组去重
  return [...new Set(arr)];
}

/**
 * 扁平化数组
 * @param {Array} arr 要扁平化的数组
 * @param {number} depth 扁平化深度
 * @returns {Array} 扁平化后的数组
 */
export function flattenArray(arr, depth = Infinity) {
  if (!Array.isArray(arr)) return [];
  
  return depth > 0 
    ? arr.reduce((acc, val) => 
        acc.concat(Array.isArray(val) ? flattenArray(val, depth - 1) : val), [])
    : arr.slice();
}

/**
 * 对象转查询字符串
 * @param {Object} obj 对象
 * @returns {string} 查询字符串
 */
export function objectToQueryString(obj) {
  if (!obj || typeof obj !== 'object') return '';
  
  return Object.keys(obj)
    .filter(key => obj[key] !== null && obj[key] !== undefined && obj[key] !== '')
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');
}

/**
 * 查询字符串转对象
 * @param {string} queryString 查询字符串
 * @returns {Object} 对象
 */
export function queryStringToObject(queryString) {
  if (!queryString) return {};
  
  const query = queryString.startsWith('?') ? queryString.slice(1) : queryString;
  
  return query.split('&').reduce((acc, param) => {
    const [key, value] = param.split('=');
    if (key) {
      acc[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
    return acc;
  }, {});
}

/**
 * 金额格式化
 * @param {number} amount 金额
 * @param {number} decimals 小数位数
 * @param {string} symbol 货币符号
 * @returns {string} 格式化后的金额
 */
export function formatCurrency(amount, decimals = 2, symbol = '¥') {
  const num = parseFloat(amount);
  if (isNaN(num)) return symbol + '0.00';
  
  return symbol + num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 随机数生成
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @param {boolean} integer 是否为整数
 * @returns {number} 随机数
 */
export function randomNumber(min = 0, max = 1, integer = false) {
  const random = Math.random() * (max - min) + min;
  return integer ? Math.floor(random) : random;
}

/**
 * 从数组中随机选择元素
 * @param {Array} arr 数组
 * @param {number} count 选择数量
 * @returns {any|Array} 随机元素或元素数组
 */
export function randomChoice(arr, count = 1) {
  if (!Array.isArray(arr) || arr.length === 0) return count === 1 ? null : [];
  
  if (count === 1) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, arr.length));
}

/**
 * 重试函数
 * @param {Function} fn 要重试的函数
 * @param {number} maxRetries 最大重试次数
 * @param {number} delay 重试延迟（毫秒）
 * @returns {Promise} Promise对象
 */
export async function retry(fn, maxRetries = 3, delay = 1000) {
  let lastError;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i === maxRetries) break;
      
      console.warn(`重试 ${i + 1}/${maxRetries} 失败:`, error.message);
      await sleep(delay * Math.pow(2, i)); // 指数退避
    }
  }
  
  throw lastError;
}

// 默认导出所有函数
export default {
  debounce,
  throttle,
  deepClone,
  generateId,
  sleep,
  formatFileSize,
  formatNumber,
  getType,
  isEmpty,
  uniqueArray,
  flattenArray,
  objectToQueryString,
  queryStringToObject,
  formatCurrency,
  randomNumber,
  randomChoice,
  retry
};