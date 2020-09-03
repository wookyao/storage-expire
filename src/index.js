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

    this._prefix = "StorageExpire";
  }

  setPrefix(prefix) {
    this._prefix = prefix;
  }

  setItem(key, value, expire) {
    let keyName = `${this._prefix}.${key}`;

    if (isEmpty(value)) value = "";

    if (!isString(value)) {
      value = JSON.stringify(value);
    }

    try {
      this._method.setItem(keyName, value);
      if (expire) {
        let expireData = {
          time: Date.now(),
          expire,
        };
        this._method.setItem(`${keyName}.EXPIRE`, JSON.stringify(expireData));
      }
    } catch (error) {}
  }

  getItem(key, doParse = true, defaultValue = null) {
    let keyName = `${this._prefix}.${key}`;

    let getValue = () => {
      let value = this._method.getItem(keyName);

      if (value) {
        return doParse ? JSON.parse(value) : value;
      }

      return isEmpty(defaultValue) ? "" : defaultValue;
    };

    let expireData = this._method.getItem(`${keyName}.EXPIRE`) || "";
    if (expireData) {
      expireData = JSON.parse(expireData);

      // 计算是否过期
      if (expireData.time && expireData.expire) {
        let disTime = Date.now() - expireData.time;
        if (disTime > 0 && disTime < expireData.expire) {
          return getValue();
        } else {
          this._method.removeItem(keyName);
          this._method.removeItem(`${keyName}.EXPIRE`);
          return "";
        }
      }

      return;
    }

    return getValue();
  }

  removeItem(key) {
    let keyName = `${this._prefix}.${key}`;

    try {
      this._method.removeItem(keyName);
      this._method.removeItem(`${keyName}.EXPIRE`);
    } catch (e) {}
  }

  clear(clearAll = false) {
    let method = this._method;

    console.log(method.length);

    try {
      if (clearAll) {
        return method.clear();
      }

      for (let i = 0; i < method.length; i++) {
        let name = method.key(i);
        if (name && name.split(".")[0] == this._prefix) {
          setTimeout(() => method.removeItem(name), 0);
        }
      }
    } catch (e) {}
  }
}

export default {
  localStorage: new StorageExpire("localStorage"),
  sessionStorage: new StorageExpire("sessionStorage"),
};
