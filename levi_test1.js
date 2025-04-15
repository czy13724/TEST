/**************************************
*
💠       ╱╱*╱╱  💠
     ╱✮╳ ▲╱╱      ╱
  ╱╱  ▢▣ 💠    ╳╱ 
 ╱  💠 ▢✮▣  ／    ╱
💠    ▢██▣    LeviUtilsKit
     _▂▂█▂▂   by Levi 2025.04.15
----------------------------------------
// ✨ 全平台通用脚本工具箱 ✨
// ✅ 支持平台：Surge、Quantumult X、Loon、Shadowrocket、Stash、Node.js（青龙）
// 🧰 功能包括：平台识别、网络请求封装、数据读写、日志输出、通知系统、JWT解析、工具函数等

// 📦 使用方式：
// ✅ 方式一（推荐）：在脚本末尾直接粘贴本工具箱代码
// ✅ 方式二（远程）：
// async function loadLeviUtils() {
//     let code = ($.isNode() ? process.env['LeviUtils_code'] : $.getdata('LeviUtils_code')) || '';
//     if (code && Object.keys(code).length) {
//         console.log(`✅ ${$.name}: 缓存中存在 LeviUtils 代码，跳过下载`)
//         eval(code)
//         return creatLeviUtils();
//     }
//     console.log(`🚀 ${$.name}: 开始下载 LeviUtils 代码`)
//     return new Promise(async (resolve) => {
//         $.getScript('https://raw.githubusercontent.com/xxx/LeviUtilsKit.js').then(fn => {
//             $.setdata(fn, 'LeviUtils_code')
//             eval(fn)
//             const LeviUtils = creatLeviUtils();
//             console.log(`✅ LeviUtils 加载成功`)
//             resolve(LeviUtils)
//         })
//     })
// }


// 原始工具箱内容：
function creatLeviUtils() {
  return {
    // 平台判断
    isNode: () => typeof module !== "undefined" && !!module.exports,
    isQuanX: () => typeof $task !== "undefined",
    isSurge: () => typeof $httpClient !== "undefined" && typeof $loon === "undefined",
    isLoon: () => typeof $loon !== "undefined",
    isStash: () => typeof $environment !== "undefined" && $environment["stash-version"],

    // 日志
    log: (...msg) => console.log(...msg),

    // 通知
    msg: (title, subtitle = '', body = '', opts = {}) => {
      if (typeof $notify !== "undefined") $notify(title, subtitle, body, opts);
      else if (typeof $notification !== "undefined") $notification.post(title, subtitle, body, opts);
      else console.log(title + "\n" + subtitle + "\n" + body);
    },

    // 数据操作
    getdata: (key) => {
      if (typeof $prefs !== "undefined") return $prefs.valueForKey(key);
      if (typeof $persistentStore !== "undefined") return $persistentStore.read(key);
      if (typeof process !== "undefined") {
        const fs = require("fs"), path = require("path");
        const file = path.resolve("./box.dat");
        try {
          const data = JSON.parse(fs.readFileSync(file));
          return data[key];
        } catch { return null; }
      }
    },

    setdata: (val, key) => {
      if (typeof $prefs !== "undefined") return $prefs.setValueForKey(val, key);
      if (typeof $persistentStore !== "undefined") return $persistentStore.write(val, key);
      if (typeof process !== "undefined") {
        const fs = require("fs"), path = require("path");
        const file = path.resolve("./box.dat");
        let data = {};
        try { data = JSON.parse(fs.readFileSync(file)); } catch {}
        data[key] = val;
        fs.writeFileSync(file, JSON.stringify(data));
        return true;
      }
    },

    // 常用转换
    toObj: (str, fallback = {}) => { try { return JSON.parse(str); } catch { return fallback; } },
    toStr: (obj, fallback = '') => { try { return JSON.stringify(obj); } catch { return fallback; } },
    queryStr: (obj) => Object.entries(obj).map(([k, v]) => `${k}=${v}`).join("&"),

    // 网络请求
    async request(opts) {
      const method = (opts.method || (opts.body ? "POST" : "GET")).toUpperCase();
      const url = opts.url;
      if (typeof process !== "undefined") {
        const got = require("got"), tough = require("tough-cookie"), iconv = require("iconv-lite");
        const ckjar = new tough.CookieJar();
        try {
          const res = await got(url, {
            method,
            headers: opts.headers,
            body: opts.body,
            cookieJar: ckjar,
            responseType: "buffer"
          });
          return iconv.decode(res.rawBody, "utf-8");
        } catch (e) {
          return e.toString();
        }
      }
      if (typeof $httpClient !== "undefined") {
        return new Promise(res => {
          $httpClient[method.toLowerCase()](opts, (err, resp, body) => res(body));
        });
      }
      if (typeof $task !== "undefined") {
        return $task.fetch(opts).then(resp => resp.body).catch(e => e.toString());
      }
    },

    // 脚本完成
    done(val = {}) {
      if (typeof $done !== "undefined") $done(val);
      if (typeof process !== "undefined") process.exit(0);
    }
  }
}
