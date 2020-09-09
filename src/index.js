import { isEmpty, isString } from "./types";

class StorageExpire {
  constructor(storageType) {
    if (!storageType) {
      throw new Error("storageType is required.");
    }
    if (!["localStorage", "sessionStorage"].includes(storageType)) {
      throw new Error(
        "storageType can only be localStorage or sessionStorage."
      );
    }
    this._method =
      storageType == "localStorage"
        ? global.localStorage
        : global.sessionStorage;

    StorageExpire._prefix = "StorageExpire";
  }

  setPrefix(prefix) {
    StorageExpire._prefix = prefix;
  }

  setItem(key, value, expire) {
    let keyName = `${StorageExpire._prefix}.${key}`;
    const method = this._method;

    if (isEmpty(value)) value = "";

    if (!isString(value)) {
      value = JSON.stringify(value);
    }

    try {
      method.setItem(keyName, value);
      if (expire) {
        let expireData = {
          time: Date.now(),
          expire,
        };
        method.setItem(`${keyName}.EXPIRE`, JSON.stringify(expireData));
      }
    } catch (error) {}
  }

  getItem(key, doParse, defaultValue) {
    let keyName = `${StorageExpire._prefix}.${key}`;
    const method = this._method;

    let getValue = () => {
      let value = method.getItem(keyName);

      if (value) {
        if (doParse) {
          try {
            return JSON.parse(value);
          } catch (error) {
            return value;
          }
        }
        return value;
      }

      return isEmpty(defaultValue) ? "" : defaultValue;
    };

    let expireData = method.getItem(`${keyName}.EXPIRE`) || "";
    if (expireData) {
      expireData = JSON.parse(expireData);

      // 计算是否过期
      if (expireData.time && expireData.expire) {
        let disTime = Date.now() - expireData.time;
        if (disTime > 0 && disTime < expireData.expire) {
          return getValue();
        } else {
          method.removeItem(keyName);
          method.removeItem(`${keyName}.EXPIRE`);
          return "";
        }
      }

      return;
    }

    return getValue();
  }

  removeItem(key) {
    let keyName = `${StorageExpire._prefix}.${key}`;
    const method = this._method;

    try {
      method.removeItem(keyName);
      method.removeItem(`${keyName}.EXPIRE`);
    } catch (e) {}
  }

  clear(clearAll = false) {
    const method = this._method;

    try {
      if (clearAll) {
        return method.clear();
      }

      for (let i = 0; i < method.length; i++) {
        let name = method.key(i);
        if (name && name.split(".")[0] == StorageExpire._prefix) {
          setTimeout(() => method.removeItem(name), 0);
        }
      }
    } catch (e) {}
  }
}

export default {
  local: new StorageExpire("localStorage"),
  session: new StorageExpire("sessionStorage"),
};
