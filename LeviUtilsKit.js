/*
*
    __              _ _                       
   / /   ___ _   __(_|_)________ _____ ___  __
  / /   / _ \ | / / / / ___/ __ `/ __ `/ / / /
 / /___/  __/ |/ / / (__  ) /_/ / /_/ / /_/ / 
/_____/\___/|___/_/_/____/\__, /\__,_/\__, /  
                         /____/      /____/   
    LeviUtilsKit
                   by Levi 2025.04.15
----------------------------------------
=============================================
📦 LeviUtilsKit.js - 全平台兼容通用工具箱 v1.0.0
=============================================

📌【用途说明】
本工具箱用于支持 Quantumult X、Surge、Loon、Stash、Shadowrocket、Node.js（青龙）平台的通用脚本开发。
整合了常用日志输出、HTTP 请求、数据存取、通知推送等能力，方便快速编写跨平台脚本。

✅【兼容平台】
- Quantumult X
- Surge
- Loon
- Stash
- Shadowrocket
- Node.js（支持青龙）

// 📦 使用方式：
// ✅ 方式一（推荐）：在脚本末尾直接粘贴本工具箱代码
📌【引入方式】
适用于脚本最上方：
  const $ = require('./LeviUtilsKit')('脚本名称');
📌【提供功能】
- $.log(...)          → 日志输出（支持分级别）
- $.msg(...)          → 多平台通知支持
- $.request(...)      → 自动平台识别的 HTTP 请求（支持 GET/POST）
- $.getdata(...)      → 数据读取（支持 boxjs/本地文件/平台存储）
- $.setdata(...)      → 数据写入（支持平台持久化）
- $.toObj/toStr       → JSON 解析/字符串化
- $.queryStr(...)     → 对象转 query 字符串
- $.time(...)         → 时间格式化
- $.done(...)         → 脚本结束
- $.debug(...)        → Debug 日志（需开启 $.is_debug = true）
📌【使用样例】
  const $ = require('./LeviUtilsKit')('示例脚本');

  $.log('脚本开始...');
  $.msg('通知标题', '通知副标题', '内容');

  const data = await $.request({ url: 'https://httpbin.org/get' });
  $.log(data);

  $.done();
*/
// ✅ 方式二（远程）：
// 🚀 远程引入 Levi 工具箱
async function loadLeviUtils() {
    let code = ($.isNode() ? process.env['LeviUtils_code'] : $.getdata('LeviUtils_code')) || '';
    if (code && Object.keys(code).length) {
        console.log(`✅ ${$.name}: 缓存中存在 LeviUtils 代码，跳过下载`)
        eval(code);
        return creatLeviUtils(); // 用这个函数构建工具对象
    }

    console.log(`🚀 ${$.name}: 开始下载 LeviUtils 代码`);
    return new Promise(async (resolve) => {
        $.getScript('https://cdn.jsdelivr.net/gh/czy13724/TEST@refs/heads/main/LeviUtilsKit.js').then(fn => {
            $.setdata(fn, 'LeviUtils_code');
            eval(fn);
            const LeviUtils = creatLeviUtils(); // 创建工具对象
            console.log(`✅ LeviUtils 加载成功`);
            resolve(LeviUtils);
        });
    });
}

// 环境判断函数封装
function LeviUtilsKit(name) {
  const isNode = typeof module !== "undefined" && !!module.exports;
  const isQuanX = typeof $task !== "undefined";
  const isSurge = typeof $httpClient !== "undefined" && typeof $loon === "undefined";
  const isLoon = typeof $loon !== "undefined";
  const isStash = typeof $environment !== "undefined" && $environment["stash-version"];
  const start = Date.now();

  return {
    name,
    isNode, isQuanX, isSurge, isLoon, isStash,

    // 日志输出封装
    log(...msg) { console.log(`[${name}]`, ...msg); },

    // 消息推送封装（兼容多平台）
    msg(title, subtitle = '', body = '', opts = {}) {
      if (isQuanX) $notify(title, subtitle, body, opts);
      else if (isSurge || isLoon || isStash) $notification.post(title, subtitle, body, opts);
      else if (isNode) console.log(title + "\n" + subtitle + "\n" + body);
    },

    // 数据读取
    getval(key) {
      if (isSurge || isLoon || isStash) return $persistentStore.read(key);
      if (isQuanX) return $prefs.valueForKey(key);
      if (isNode) {
        const fs = require("fs"), path = require("path");
        const file = path.resolve("./box.dat");
        try {
          const data = JSON.parse(fs.readFileSync(file));
          return data[key];
        } catch { return null; }
      }
    },

    // 数据写入
    setval(val, key) {
      if (isSurge || isLoon || isStash) return $persistentStore.write(val, key);
      if (isQuanX) return $prefs.setValueForKey(val, key);
      if (isNode) {
        const fs = require("fs"), path = require("path");
        const file = path.resolve("./box.dat");
        let data = {};
        try { data = JSON.parse(fs.readFileSync(file)); } catch {}
        data[key] = val;
        fs.writeFileSync(file, JSON.stringify(data));
        return true;
      }
    },

    // JSON字符串转对象
    toObj(str, fallback = {}) {
      try { return JSON.parse(str); } catch { return fallback; }
    },

    // 对象转 JSON 字符串
    toStr(obj, fallback = "") {
      try { return JSON.stringify(obj); } catch { return fallback; }
    },

    // 对象转 query 字符串
    queryStr(obj) {
      return Object.entries(obj).map(([k, v]) => `${k}=${v}`).join("&");
    },

    // 简单封装的请求方法（支持 GET、POST）
    async request(opts) {
      const method = (opts.method || (opts.body ? "POST" : "GET")).toUpperCase();
      const url = opts.url;

      // Node.js 请求封装
      if (isNode) {
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
          return e;
        }
      }

      // Surge / Loon / Stash 请求封装
      if (isSurge || isLoon || isStash) {
        return new Promise(resolve => {
          $httpClient[method.toLowerCase()](opts, (err, resp, body) => {
            resolve(body);
          });
        });
      }

      // QuantumultX 请求封装
      if (isQuanX) {
        return $task.fetch(opts).then(resp => resp.body).catch(e => e);
      }
    },

    // 脚本完成时退出 / 通知
    done(val = {}) {
      const end = (Date.now() - start) / 1000;
      this.log(`🔔${name}, 结束! 🕛 ${end} 秒`);
      if (typeof $done !== "undefined") $done(val);
      if (isNode) process.exit(0);
    }
  };
}

module.exports = LeviUtilsKit;


// 📤 导出方法（用于远程使用时创建工具对象）
function creatLeviUtils() {
    return {
        Request,
        parseJwt,
        ObjectKeys2LowerCase,
        sendMsg,
        DoubleLog,
        checkEnv,
        debug,
        Env,
        createProxy
    }
}
