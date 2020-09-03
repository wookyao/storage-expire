/**
 * 判断数据类型
 *
 */
const toString = (object) => Object.prototype.toString.call(object);

/**
 * 判断元素是不是Null类型
 * @param {any} obj
 */
export const isNull = (obj) => toString(obj) === "[object Null]";

/**
 * 判断元素是不是undefined类型
 * @param {any} obj
 */
export const isUndefined = (obj) => toString(obj) === "[object Undefined]";

/**
 * 判断元素是不是Object
 * @param {any} obj
 */
export const isObject = (obj) => toString(obj) === "[object Object]";

/**
 * 判断元素是不是Boolean类型
 * @param {any} obj
 */
export const isBoolean = (obj) => toString(obj) === "[object Boolean]";

/**
 * 判断元素是不是String类型
 * @param {any} obj
 */
export const isString = (obj) => toString(obj) === "[object String]";

/**
 * 判断元素是不是Number类型
 * @param {any} obj
 */
export const isNumber = (obj) => toString(obj) === "[object Number]";

/**
 * 判断元素是不是RegExp正则类型
 * @param {any} obj
 */
export const isRegExp = (obj) => toString(obj) === "[object RegExp]";

/**
 * 判断元素是不是Symbol
 * @param {any} obj
 */
export const isSymbol = (obj) => toString(obj) === "[object Symbol]";

/**
 * 判断是不是Array类型
 * @param {any} obj
 */
export const isArray = (obj) => {
  try {
    return Array.isArray(obj);
  } catch (error) {
    return toString(obj) === "[object Array]";
  }
};

/**
 * 判断是不是JSON数组
 * @param {any} obj
 */
export const isJson = (obj) => {
  return (
    typeof obj === "object" &&
    toString(obj) === "[object Object]" &&
    !obj.length
  );
};

/**
 * 判断是不是Function
 * @param {any} obj
 */
export const isFunction = (obj) => {
  return toString(obj) === "[object Function]";
};

/**
 * 获取数据类型
 * @param {any} obj
 * @return null|undefined|object|string|number|array...
 */
export const getType = (obj) => {
  let sType = toString(obj);
  return sType.substring(8, sType.length - 1).toLocaleLowerCase();
};

/**
 * 判断是不是指定类型
 * @param {any} obj 目标元素
 * @param {string} stype 类型名称
 */
export const isInstance = (obj, stype) => {
  return getType(obj) === String(stype).toLocaleLowerCase();
};

/**
 * 判断元素是不是为空
 * @param {any} value
 */
export const isEmpty = (value) => {
  if (value === void 0 || value === null) return true;
  if (isObject(value)) return !Object.keys(value).length;
  if (isArray(value)) return !value.length;
  if (isString(value)) return !value;
  return !value.toString().length;
};
