type TargetContext = '_self' | '_parent' | '_blank' | '_top';

export const openWindow = (
  url: string,
  opts?: { target?: TargetContext; [key: string]: any }
) => {
  const { target = '_blank', ...others } = opts || {};
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue;
        return [...preValue, `${key}=${value}`];
      }, [])
      .join(',')
  );
};

export const regexUrl = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i'
);

/**
 * 判断是否为空
 * @param obj 任意类型数据
 * @returns True（空）｜False（不为空）
 */
export const isEmpty = (obj: any) => {
  if (typeof obj === 'undefined' || obj === null || obj === '') return true;
  switch (Object.prototype.toString.call(obj)) {
    case '[object String]':
    case '[object Array]':
      return !obj.length;
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !obj.size;
    }
    case '[object Object]': {
      return !Object.keys(obj).length;
    }
    default:
      return false;
  }
};

/**
 * 判断数据类型-重写typeof方法
 * @param obj 需要判断的数据
 * @returns 类型
 */
export const typeOf = (obj: any): any => {
  const { toString } = Object.prototype;
  const map: any = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  return map[toString.call(obj)];
};

/**
 * 深拷贝
 * @param target 深拷贝数据
 * @returns 拷贝后结果
 */
export const deepClone = (target: any): any => {
  const map = new WeakMap(); // WeakMap作为记录对象Hash表（用于防止循环引用）
  function isObject(t: any) {
    return (typeof t === 'object' && t) || typeof t === 'function';
  }
  function clone(data: any) {
    if (!isObject(data)) {
      return data;
    }
    // 日期或者正则对象则直接构造一个新的对象返回
    if ([Date, RegExp].includes(data.constructor)) {
      return new data.constructor(data);
    }
    // 处理函数对象
    if (typeof data === 'function') {
      // eslint-disable-next-line no-new-func
      return new Function(`return ${data.toString()}`)();
    }
    // 如果该对象已存在，则直接返回该对象
    const exist = map.get(data);
    if (exist) {
      return exist;
    }
    // 处理Map对象
    if (data instanceof Map) {
      const result = new Map();
      map.set(data, result);
      data.forEach((val, key) => {
        // 注意：map中的值为object的话也得深拷贝
        if (isObject(val)) {
          result.set(key, clone(val));
        } else {
          result.set(key, val);
        }
      });
      return result;
    }
    // 处理Set对象
    if (data instanceof Set) {
      const result = new Set();
      map.set(data, result);
      data.forEach((val) => {
        // 注意：set中的值为object的话也得深拷贝
        if (isObject(val)) {
          result.add(clone(val));
        } else {
          result.add(val);
        }
      });
      return result;
    }
    const keys = Reflect.ownKeys(data); // 收集键名（考虑了以Symbol作为key以及不可枚举的属性）
    const allDesc = Object.getOwnPropertyDescriptors(data); // 获得对象的所有属性以及对应的属性描述
    const result = Object.create(Object.getPrototypeOf(data), allDesc);
    map.set(data, result); // 新对象加入到map中，进行记录
    keys.forEach((key) => {
      const val = data[key];
      if (isObject(val)) {
        result[key] = clone(val); // 属性值为 对象类型 或 函数对象 的话也需要进行深拷贝
      } else {
        result[key] = val;
      }
    });
    return result;
  }
  return clone(target);
};

/**
 * 过滤对象空值
 * @param obj 对象
 * @returns 非空数据对象
 */
export const delEmptyObj = (obj: any) => {
  const newObj = deepClone(obj);
  Object.keys(newObj).forEach((item) => {
    if (isEmpty(newObj[item])) {
      delete newObj[item];
    }
  });
  return newObj;
};

export default null;
