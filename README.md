# Storage-expire

支持设置过期时间的一个 Storage 库

### 安装

```
npm i -S storage-expire
```

or

```
yarn add storage-expire
```

### 使用

```
import StorageExpire from 'storage-expire';

// 设置前缀
StorageExpire.local.setPrefix("wookyao")

const SElocal = StorageExpire.local;
// const SEsession = StorageExpire.session;

// 设置
SElocal.setItem("token", "weweweew");
SElocal.setItem("userInfo", {...}, 毫秒);

// 获取
SElocal.getItem("token");

// 获取userInfo 并且格式化，如果值不存在则取默认值
SElocal.getItem("userInfo", true, {...})

```
