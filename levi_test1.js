/**************************************
*
💠       ╱╲*╱╲  💠
     ╱💎╳ ▲╱╲      ╲
  ╱╱  ◢◣ 💠    ╳╲ 
 ╱  💠 ◢💎◣  ／    ╲
💠    ◢██◣    LeviUtilsKit
     _▂▂█▂▂   by Levi 2025.04.15
----------------------------------------
// ✨ 全平台通用脚本工具箱 ✨
// ✅ 支持平台：Surge、Quantumult X、Loon、Shadowrocket、Stash、Node.js（青龙）
// 🧰 功能：平台检测、网络请求封装、数据读写、日志输出、通知推送、JWT解析、工具函数等

// 📦 使用方式：
// 方式一（粘贴）：将此工具箱代码粘贴到脚本末尾，脚本开头直接使用
//     const $ = new Env('脚本名称');
// 方式二（远程）：动态加载后直接用 new Env(...)
 
// —— 工具箱代码开始 ——

// 如果在 Node.js（青龙）环境下，全局化 require
if (typeof module !== 'undefined' && module.exports) {
  global.require = require;
}

// Proxy 封装，可捕获方法错误
function createProxy(target, handler) {
  return new Proxy(target, {
    get(obj, prop) {
      const orig = obj[prop];
      if (typeof orig === 'function') {
        return async function (...args) {
          try {
            return await orig.apply(obj, args);
          } catch (err) {
            handler.call(obj, err);
          }
        };
      }
      return orig;
    }
  });
}

// sendMsg：兼容青龙和脚本平台的通知
async function sendMsg(message, opts) {
  if (!message) return;
  if ($.isNode()) {
    const notify = require('sendNotify');
    await notify.sendNotify($.name, message);
  } else {
    $.msg($.name, $.title || '', message, opts);
  }
}

// 双重日志：控制台 + 缓存
function DoubleLog(msg) {
  if (!msg) return;
  $.log(msg);
  $.notifyMsg = $.notifyMsg || [];
  $.notifyMsg.push(msg);
}

// 环境检查（可自定义）
async function checkEnv() {
  try {
    if (!userCookie?.length) throw new Error('no available accounts found');
    $.log(`\n[INFO] 检测到 ${userCookie.length} 个账号\n`);
    $.userList = userCookie.map(c => new UserInfo(c)).filter(Boolean);
  } catch (err) {
    throw err;
  }
}

// 调试输出
function debug(msg, tag = 'debug') {
  if ($.isDebug) {
    $.log(`\n-----------${tag}------------\n`);
    $.log(typeof msg === 'string' ? msg : JSON.stringify(msg, null, 2));
    $.log(`\n-----------${tag}------------\n`);
  }
}

// 键名小写
function ObjectKeys2LowerCase(obj) {
  if (!obj) return {};
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v])
  );
}

// HTTP 请求：支持青龙 / Surge-Loon-Stash / Quantumult X
async function Request(opts) {
  if (typeof opts === 'string') opts = { url: opts };
  if (!opts.url) throw new Error('[URL][ERROR] 缺少 url 参数');
  const method = (opts.method || (opts.body ? 'POST' : 'GET')).toUpperCase();
  let url = opts.url;
  if (method === 'GET' && opts.params) {
    url += '?' + Object.entries(opts.params).map(([k,v])=>`${k}=${v}`).join('&');
  }
  const timeout = opts.timeout || 10000;

  if ($.isNode()) {
    const got = require('got'), tough = require('tough-cookie'), iconv = require('iconv-lite');
    const jar = new tough.CookieJar();
    try {
      const res = await got(url, {
        method,
        headers: opts.headers,
        body: opts.body,
        cookieJar: jar,
        timeout,
        responseType: 'buffer'
      });
      return iconv.decode(res.rawBody, 'utf-8');
    } catch (err) {
      $.log(`[${method}][Node ERROR] ${err}`);
      throw err;
    }
  }

  if ($.isSurge() || $.isLoon() || $.isStash()) {
    return new Promise((resolve, reject) => {
      $httpClient[method.toLowerCase()]({ url, headers: opts.headers, body: opts.body }, (err, resp, body) => {
        err ? reject(err) : resolve(body);
      });
    });
  }

  if ($.isQuanX()) {
    opts.method = method;
    return $task.fetch(opts).then(r => r.body).catch(e => { throw e; });
  }
}

// JWT 解析
function parseJwt(token) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT token');
  const decode = s => {
    s = s.replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    return Buffer.from(s, 'base64').toString();
  };
  return {
    header: JSON.parse(decode(parts[0])),
    payload: JSON.parse(decode(parts[1]))
  };
}

// 通用环境封装
function Env(name) {
  this.name = name;
  this.title = '';
  this.startTime = Date.now();
  this.notifyMsg = [];
  // 把功能方法挂载到 this
  this.sendMsg = sendMsg;
  this.DoubleLog = DoubleLog;
  this.checkEnv = checkEnv;
  this.debug = debug;
  this.Request = Request;
  this.parseJwt = parseJwt;
  this.ObjectKeys2LowerCase = ObjectKeys2LowerCase;
  // 代理注册未捕获的异步错误
  return createProxy(this, this.log);
}

// 平台判断（函数）
Env.prototype.isNode   = function() { return typeof module !== 'undefined' && !!module.exports; };
Env.prototype.isQuanX  = function() { return typeof $task !== 'undefined'; };
Env.prototype.isSurge  = function() { return typeof $httpClient !== 'undefined' && typeof $loon==='undefined'; };
Env.prototype.isLoon   = function() { return typeof $loon !== 'undefined'; };
Env.prototype.isStash  = function() { return typeof $environment !== 'undefined' && !!$environment['stash-version']; };

// 日志与通知
Env.prototype.log      = function(...args) { console.log(...args); };
Env.prototype.msg      = function(t,s='',b='',o={}) {
  if (this.isQuanX())   $notify(t,s,b,o);
  else if (this.isSurge()||this.isLoon()||this.isStash()) $notification.post(t,s,b,o);
  else if (this.isNode()) console.log(`${t}\n${s}\n${b}`);
};

// 数据存取
Env.prototype.getdata  = function(key) {
  if (this.isQuanX())   return $prefs.valueForKey(key);
  if (this.isSurge()||this.isLoon()||this.isStash()) return $persistentStore.read(key);
  if (this.isNode()) {
    const fs = require('fs'), path = require('path');
    const file = path.resolve(process.cwd(),'box.dat');
    try { const d = JSON.parse(fs.readFileSync(file)); return d[key]; } catch { return null; }
  }
};
Env.prototype.setdata  = function(val,key) {
  if (this.isQuanX())   return $prefs.setValueForKey(val,key);
  if (this.isSurge()||this.isLoon()||this.isStash()) return $persistentStore.write(val,key);
  if (this.isNode()) {
    const fs = require('fs'), path = require('path');
    const file = path.resolve(process.cwd(),'box.dat');
    let d={}; try{d=JSON.parse(fs.readFileSync(file));}catch{} d[key]=val; fs.writeFileSync(file,JSON.stringify(d));
    return true;
  }
};

// 结束脚本
Env.prototype.done     = function(val={}) {
  if (typeof $done==='function') $done(val);
  if (this.isNode()) process.exit(0);
};

// 导出 Env 构造函数
module.exports = Env;

// —— 工具箱代码结束 —— 
