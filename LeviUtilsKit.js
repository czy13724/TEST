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
----------------------------------------*/

/******************************************************************************
 * 🛠️ LeviUtilsKit.js - LeviUtilsKit工具箱
 * 适配：Quantumult X, Surge, Loon, Stash, Shadowrocket, Node.js
 * 
 * 📌 使用指南 (Remote Loader)
 * ---------------------------------------------------------------------------
 * 
 * 1️⃣ 脚本头部声明 (放在 const $ = new Env(...) 之前)
 * ----------------------------------------
 * // 加载 LeviUtilsKit 工具箱
 * let LeviUtilsKitReady;
 * const LeviUtilsKit = new Promise(resolve => LeviUtilsKitReady = resolve);
 * 
 * const $ = new Env('脚本名称');
 * 
 * 2️⃣ 业务逻辑
 * ----------------------------------------
 * !(async () => {
 *     await LeviUtilsKit;    // 等待加载并自动升级 $
 *     await $.disclaimer();  // 免责声明 (扩展功能)
 *     
 *     $.log($.md5('hello'));
 *     $.done();
 * })();
 * 
 * 3️⃣ 固定不动区域 (复制以下代码至文件最末尾)
 * ----------------------------------------
 * function Env(t,e){this.name=t;this.isNode=()=>typeof module!=='undefined'&&!!module.exports;}
 * !(async()=>{const urls=['https://cdn.jsdelivr.net/gh/czy13724/SCript@main/LeviUtilsKit.js','https://cdn.jsdmirror.com/gh/czy13724/SCript@main/LeviUtilsKit.js','https://fastly.jsdelivr.net/gh/czy13724/SCript@main/LeviUtilsKit.js','https://raw.githubusercontent.com/czy13724/SCript/main/LeviUtilsKit.js'],k='LeviUtilsKit_Code',isNode=typeof module!=='undefined'&&module.exports,getData=k=>isNode?(process.env[k]||''):(typeof $prefs!=='undefined'?$prefs.valueForKey(k):$persistentStore.read(k))||'',setData=(v,k)=>isNode?(process.env[k]=v,true):(typeof $prefs!=='undefined'?$prefs.setValueForKey(v,k):$persistentStore.write(v,k));let code=getData(k);if(code&&code.length>500){console.log('✅ 使用缓存加载 LeviUtilsKit')}else{for(const u of urls){try{code=await new Promise((ok,no)=>{const get=(u,cb)=>{if(isNode)require('https').get(u,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>cb(null,d));}).on('error',cb);else if(typeof $task!=='undefined')$task.fetch({url:u}).then(r=>cb(null,r.body),cb);else $httpClient.get({url:u},(e,r,b)=>cb(e,b));};get(u,(e,c)=>e?no(e):ok(c));});if(code&&code.length>500){console.log(`✅ LeviUtilsKit 加载成功: ${u}`);setData(code,k);break;}}catch(e){console.log('❌ LeviUtilsKit 加载失败');}}}Env=eval(code);if(typeof $!=='undefined'&&$.name){const _=new Env($.name);Object.assign($,_);Object.setPrototypeOf($,Object.getPrototypeOf(_));}LeviUtilsKitReady();})();
 * 
 * ============================================================================
 * 
 * ⚙️ 核心特性：
 * ⚡️ [无感加载] 自动接管并升级开头创建的空壳 $ 对象
 * 💾 [智能缓存] 首次下载后自动持久化，后续毫秒级启动
 * 🔄 [多源降级] 加载失败自动切换CDN镜像源
 * 
 * 💻 Node.js 开发：const Env = require('./LeviUtilsKit');
 ******************************************************************************/

// ====================================
// 🔧 扩展工具函数
// ====================================
//prettier-ignore
// From chavyleung's Env.js
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, a) => { s.call(this, t, (t, s, r) => { t ? a(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } getEnv() { return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0 } isNode() { return "Node.js" === this.getEnv() } isQuanX() { return "Quantumult X" === this.getEnv() } isSurge() { return "Surge" === this.getEnv() } isLoon() { return "Loon" === this.getEnv() } isShadowrocket() { return "Shadowrocket" === this.getEnv() } isStash() { return "Stash" === this.getEnv() } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const a = this.getdata(t); if (a) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, a) => e(a)) }) } runScript(t, e) { return new Promise(s => { let a = this.getdata("@chavy_boxjs_userCfgs.httpapi"); a = a ? a.replace(/\n/g, "").trim() : a; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [i, o] = a.split("@"), n = { url: `http://${o}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": i, Accept: "*/*" }, timeout: r }; this.post(n, (t, e, a) => s(a)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e); if (!s && !a) return {}; { const a = s ? t : e; try { return JSON.parse(this.fs.readFileSync(a)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), a = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : a ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const a = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of a) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, a) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[a + 1]) >> 0 == +e[a + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, a] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, a, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, a, r] = /^@(.*?)\.(.*?)$/.exec(e), i = this.getval(a), o = a ? "null" === i ? null : i || "{}" : "{}"; try { const e = JSON.parse(o); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), a) } catch (e) { const i = {}; this.lodash_set(i, r, t), s = this.setval(JSON.stringify(i), a) } } else s = this.setval(t, e); return s } getval(t) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.read(t); case "Quantumult X": return $prefs.valueForKey(t); case "Node.js": return this.data = this.loaddata(), this.data[t]; default: return this.data && this.data[t] || null } } setval(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.write(t, e); case "Quantumult X": return $prefs.setValueForKey(t, e); case "Node.js": return this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0; default: return this.data && this.data[e] || null } } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let s = require("iconv-lite"); this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: a, statusCode: r, headers: i, rawBody: o } = t, n = s.decode(o, this.encoding); e(null, { status: a, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: a, response: r } = t; e(a, r, r && s.decode(r.rawBody, this.encoding)) }) } } post(t, e = (() => { })) { const s = t.method ? t.method.toLocaleLowerCase() : "post"; switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient[s](t, (t, s, a) => { !t && s && (s.body = a, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, a) }); break; case "Quantumult X": t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: a, headers: r, body: i, bodyBytes: o } = t; e(null, { status: s, statusCode: a, headers: r, body: i, bodyBytes: o }, i, o) }, t => e(t && t.error || "UndefinedError")); break; case "Node.js": let a = require("iconv-lite"); this.initGotEnv(t); const { url: r, ...i } = t; this.got[s](r, i).then(t => { const { statusCode: s, statusCode: r, headers: i, rawBody: o } = t, n = a.decode(o, this.encoding); e(null, { status: s, statusCode: r, headers: i, rawBody: o, body: n }, n) }, t => { const { message: s, response: r } = t; e(s, r, r && a.decode(r.rawBody, this.encoding)) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let a = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in a) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? a[e] : ("00" + a[e]).substr(("" + a[e]).length))); return t } queryStr(t) { let e = ""; for (const s in t) { let a = t[s]; null != a && "" !== a && ("object" == typeof a && (a = JSON.stringify(a)), e += `${s}=${a}&`) } return e = e.substring(0, e.length - 1), e } msg(e = t, s = "", a = "", r) { const i = t => { switch (typeof t) { case void 0: return t; case "string": switch (this.getEnv()) { case "Surge": case "Stash": default: return { url: t }; case "Loon": case "Shadowrocket": return t; case "Quantumult X": return { "open-url": t }; case "Node.js": return }case "object": switch (this.getEnv()) { case "Surge": case "Stash": case "Shadowrocket": default: { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } case "Loon": { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } case "Quantumult X": { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl, a = t["update-pasteboard"] || t.updatePasteboard; return { "open-url": e, "media-url": s, "update-pasteboard": a } } case "Node.js": return }default: return } }; if (!this.isMute) switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: $notification.post(e, s, a, i(r)); break; case "Quantumult X": $notify(e, s, a, i(r)); break; case "Node.js": }if (!this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), a && t.push(a), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: this.log("", `❗️${this.name}, 错误!`, t); break; case "Node.js": this.log("", `❗️${this.name}, 错误!`, t.stack) } } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; switch (this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: $done(t); break; case "Node.js": process.exit(1) } } }(t, e) }
// MD5 加密
function md5(a) { function b(a, b) { return (a << b) | (a >>> (32 - b)); } function c(a, b) { var c, d, e, f, g; return ((e = 2147483648 & a), (f = 2147483648 & b), (c = 1073741824 & a), (d = 1073741824 & b), (g = (1073741823 & a) + (1073741823 & b)), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f); } function d(a, b, c) { return (a & b) | (~a & c); } function e(a, b, c) { return (a & c) | (b & ~c); } function f(a, b, c) { return a ^ b ^ c; } function g(a, b, c) { return b ^ (a | ~c); } function h(a, e, f, g, h, i, j) { return (a = c(a, c(c(d(e, f, g), h), j))), c(b(a, i), e); } function i(a, d, f, g, h, i, j) { return (a = c(a, c(c(e(d, f, g), h), j))), c(b(a, i), d); } function j(a, d, e, g, h, i, j) { return (a = c(a, c(c(f(d, e, g), h), j))), c(b(a, i), d); } function k(a, d, e, f, h, i, j) { return (a = c(a, c(c(g(d, e, f), h), j))), c(b(a, i), d); } function l(a) { for (var b, c = a.length, d = c + 8, e = (d - (d % 64)) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;)(b = (i - (i % 4)) / 4), (h = (i % 4) * 8), (g[b] = g[b] | (a.charCodeAt(i) << h)), i++; return ((b = (i - (i % 4)) / 4), (h = (i % 4) * 8), (g[b] = g[b] | (128 << h)), (g[f - 2] = c << 3), (g[f - 1] = c >>> 29), g); } function m(a) { var b, c, d = "", e = ""; for (c = 0; 3 >= c; c++)(b = (a >>> (8 * c)) & 255), (e = "0" + b.toString(16)), (d += e.substr(e.length - 2, 2)); return d; } function n(a) { a = a.replace(/\r\n/g, "\n"); for (var b = "", c = 0; c < a.length; c++) { var d = a.charCodeAt(c); 128 > d ? (b += String.fromCharCode(d)) : d > 127 && 2048 > d ? ((b += String.fromCharCode((d >> 6) | 192)), (b += String.fromCharCode((63 & d) | 128))) : ((b += String.fromCharCode((d >> 12) | 224)), (b += String.fromCharCode(((d >> 6) & 63) | 128)), (b += String.fromCharCode((63 & d) | 128))); } return b; } var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 22, C = 5, D = 9, E = 14, F = 20, G = 4, H = 11, I = 16, J = 23, K = 6, L = 10, M = 15, N = 21; for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16)(p = t), (q = u), (r = v), (s = w), (t = h(t, u, v, w, x[o + 0], y, 3614090360)), (w = h(w, t, u, v, x[o + 1], z, 3905402710)), (v = h(v, w, t, u, x[o + 2], A, 606105819)), (u = h(u, v, w, t, x[o + 3], B, 3250441966)), (t = h(t, u, v, w, x[o + 4], y, 4118548399)), (w = h(w, t, u, v, x[o + 5], z, 1200080426)), (v = h(v, w, t, u, x[o + 6], A, 2821735955)), (u = h(u, v, w, t, x[o + 7], B, 4249261313)), (t = h(t, u, v, w, x[o + 8], y, 1770035416)), (w = h(w, t, u, v, x[o + 9], z, 2336552879)), (v = h(v, w, t, u, x[o + 10], A, 4294925233)), (u = h(u, v, w, t, x[o + 11], B, 2304563134)), (t = h(t, u, v, w, x[o + 12], y, 1804603682)), (w = h(w, t, u, v, x[o + 13], z, 4254626195)), (v = h(v, w, t, u, x[o + 14], A, 2792965006)), (u = h(u, v, w, t, x[o + 15], B, 1236535329)), (t = i(t, u, v, w, x[o + 1], C, 4129170786)), (w = i(w, t, u, v, x[o + 6], D, 3225465664)), (v = i(v, w, t, u, x[o + 11], E, 643717713)), (u = i(u, v, w, t, x[o + 0], F, 3921069994)), (t = i(t, u, v, w, x[o + 5], C, 3593408605)), (w = i(w, t, u, v, x[o + 10], D, 38016083)), (v = i(v, w, t, u, x[o + 15], E, 3634488961)), (u = i(u, v, w, t, x[o + 4], F, 3889429448)), (t = i(t, u, v, w, x[o + 9], C, 568446438)), (w = i(w, t, u, v, x[o + 14], D, 3275163606)), (v = i(v, w, t, u, x[o + 3], E, 4107603335)), (u = i(u, v, w, t, x[o + 8], F, 1163531501)), (t = i(t, u, v, w, x[o + 13], C, 2850285829)), (w = i(w, t, u, v, x[o + 2], D, 4243563512)), (v = i(v, w, t, u, x[o + 7], E, 1735328473)), (u = i(u, v, w, t, x[o + 12], F, 2368359562)), (t = j(t, u, v, w, x[o + 5], G, 4294588738)), (w = j(w, t, u, v, x[o + 8], H, 2272392833)), (v = j(v, w, t, u, x[o + 11], I, 1839030562)), (u = j(u, v, w, t, x[o + 14], J, 4259657740)), (t = j(t, u, v, w, x[o + 1], G, 2763975236)), (w = j(w, t, u, v, x[o + 4], H, 1272893353)), (v = j(v, w, t, u, x[o + 7], I, 4139469664)), (u = j(u, v, w, t, x[o + 10], J, 3200236656)), (t = j(t, u, v, w, x[o + 13], G, 681279174)), (w = j(w, t, u, v, x[o + 0], H, 3936430074)), (v = j(v, w, t, u, x[o + 3], I, 3572445317)), (u = j(u, v, w, t, x[o + 6], J, 76029189)), (t = j(t, u, v, w, x[o + 9], G, 3654602809)), (w = j(w, t, u, v, x[o + 12], H, 3873151461)), (v = j(v, w, t, u, x[o + 15], I, 530742520)), (u = j(u, v, w, t, x[o + 2], J, 3299628645)), (t = k(t, u, v, w, x[o + 0], K, 4096336452)), (w = k(w, t, u, v, x[o + 7], L, 1126891415)), (v = k(v, w, t, u, x[o + 14], M, 2878612391)), (u = k(u, v, w, t, x[o + 5], N, 4237533241)), (t = k(t, u, v, w, x[o + 12], K, 1700485571)), (w = k(w, t, u, v, x[o + 3], L, 2399980690)), (v = k(v, w, t, u, x[o + 10], M, 4293915773)), (u = k(u, v, w, t, x[o + 1], N, 2240044497)), (t = k(t, u, v, w, x[o + 8], K, 1873313359)), (w = k(w, t, u, v, x[o + 15], L, 4264355552)), (v = k(v, w, t, u, x[o + 6], M, 2734768916)), (u = k(u, v, w, t, x[o + 13], N, 1309151649)), (t = k(t, u, v, w, x[o + 4], K, 4149444226)), (w = k(w, t, u, v, x[o + 11], L, 3174756917)), (v = k(v, w, t, u, x[o + 2], M, 718787259)), (u = k(u, v, w, t, x[o + 9], N, 3951481745)), (t = c(t, p)), (u = c(u, q)), (v = c(v, r)), (w = c(w, s)); var O = m(t) + m(u) + m(v) + m(w); return O.toLowerCase(); }
// SHA1 加密
function sha1(s) { function encodeUTF8(s) { var i, r = [], c, x; for (i = 0; i < s.length; i++)if ((c = s.charCodeAt(i)) < 0x80) r.push(c); else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F)); else { if ((x = c ^ 0xD800) >> 10 == 0) c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000, r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F)); else r.push(0xE0 + (c >> 12 & 0xF)); r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F)); } return r; } var data = new Uint8Array(encodeUTF8(s)); var i, j, t; var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2); s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer); for (t = new DataView(s.buffer), i = 0; i < l; i++)s[i] = t.getUint32(i << 2); s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8); s[l - 1] = data.length << 3; var w = [], f = [function () { return m[1] & m[2] | ~m[1] & m[3]; }, function () { return m[1] ^ m[2] ^ m[3]; }, function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; }, function () { return m[1] ^ m[2] ^ m[3]; }], rol = function (n, c) { return n << c | n >>> (32 - c); }, k = [1518500249, 1859775393, -1894007588, -899497514], m = [1732584193, -271733879, null, null, -1009589776]; m[2] = ~m[0], m[3] = ~m[1]; for (i = 0; i < s.length; i += 16) { var o = m.slice(0); for (j = 0; j < 80; j++)w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1), t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0, m[1] = rol(m[1], 30), m.pop(), m.unshift(t); for (j = 0; j < 5; j++)m[j] = m[j] + o[j] | 0; }; t = new DataView(new Uint32Array(m).buffer); for (var i = 0; i < 5; i++)m[i] = t.getUint32(i << 2); var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) { return (e < 16 ? "0" : "") + e.toString(16); }).join(""); return hex; }
// UUID 生成器
function guid() { function S4() { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); } return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()); }
// 随机整数
function randomInt(min, max) { return Math.round(Math.random() * (max - min) + min); }
// 手机号脱敏
function phoneNum(p) { return p && p.length === 11 ? p.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : p; }
// 随机字符串
function randomString(e = 32, t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678") { let n = ""; for (let a = 0; a < e; a++)n += t.charAt(Math.floor(Math.random() * t.length)); return n; }
// 随机 MAC 地址
function randomMac() { return "XX:XX:XX:XX:XX:XX".replace(/X/g, () => "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))); }
// Base64 编码
function base64Encode(s) { return typeof module !== "undefined" && module.exports ? Buffer.from(s, "utf-8").toString("base64") : btoa(unescape(encodeURIComponent(s))); }
// Base64 解码
function base64Decode(s) { return typeof module !== "undefined" && module.exports ? Buffer.from(s, "base64").toString("utf-8") : decodeURIComponent(escape(atob(s))); }
// 对象键转小写
function objectKeys2LowerCase(o) { return !o ? {} : Object.fromEntries(Object.entries(o).map(([k, v]) => [k.toLowerCase(), v])); }
// QueryString 转对象
function queryToObj(s) { let o = {}; if (!s) return o; s.split("&").forEach(i => { const p = i.split("="); if (p.length === 2) o[p[0]] = decodeURIComponent(p[1]); }); return o; }
// 对象转 URL 参数
function jsonToUrl(d) { let a = []; for (let i in d) { a.push(encodeURIComponent(i) + "=" + encodeURIComponent(d[i])); } return a.join("&"); }
// 13位时间戳
function ts13() { return Math.round(new Date().getTime()).toString(); }
// 10位时间戳
function ts10() { return Math.round(new Date().getTime() / 1000).toString(); }
// 时间戳转日期字符串
function tsToDate(t = +new Date()) { if (t.toString().length === 13) { let d = new Date(t + 8 * 3600 * 1000); return d.toJSON().substr(0, 19).replace("T", " "); } else if (t.toString().length === 10) { t = t * 1000; let d = new Date(t + 8 * 3600 * 1000); return d.toJSON().substr(0, 19).replace("T", " "); } }
// 获取当前小时
function localHours() { return new Date().getHours(); }
// 获取当前分钟
function localMinutes() { return new Date().getMinutes(); }
// 获取当前年份
function localYear() { return new Date().getFullYear(); }
// 获取当前月份
function localMonth() { return new Date().getMonth() + 1; }
// 获取当前月份(补零)
function localMonthPadded() { let m = localMonth(); return m.toString().length === 1 ? `0${m}` : m.toString(); }
// 获取当前日期
function localDay() { return new Date().getDate(); }
// 获取当前日期(补零)
function localDayPadded() { let d = localDay(); return d.toString().length === 1 ? `0${d}` : d.toString(); }
// URL 编码
function urlEncode(s) { return encodeURIComponent(s); }
// URL 解码
function urlDecode(s) { return decodeURIComponent(s); }
// 数组去重
function uniqueArray(a) { return [...new Set(a)]; }
// 深拷贝
function deepClone(o) { if (o === null || typeof o !== "object") return o; if (o instanceof Date) return new Date(o); if (o instanceof Array) return o.map(i => deepClone(i)); const c = {}; for (let k in o) { if (o.hasOwnProperty(k)) c[k] = deepClone(o[k]); } return c; }
// 睡眠/延迟(别名 sleep)
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
// 睡眠/延迟(别名 delay)
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
// 数字千分位格式化
function formatNumber(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
// 文件大小格式化
function formatFileSize(b) { if (b === 0) return "0 B"; const k = 1024, s = ["B", "KB", "MB", "GB", "TB"], i = Math.floor(Math.log(b) / Math.log(k)); return (b / Math.pow(k, i)).toFixed(2) + " " + s[i]; }
// 随机获取数组元素
function randomArrayItem(a) { return a[Math.floor(Math.random() * a.length)]; }
// 打乱数组
function shuffleArray(a) { const n = [...a]; for (let i = n.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[n[i], n[j]] = [n[j], n[i]]; } return n; }
// 首字母大写
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
// 字符串截取
function truncate(s, l, x = "...") { return s.length <= l ? s : s.substring(0, l) + x; }
// 判断空对象
function isEmptyObject(o) { return Object.keys(o).length === 0; }
// 判断空数组
function isEmptyArray(a) { return Array.isArray(a) && a.length === 0; }
// 安全获取对象值
function getObjectValue(o, p, d = undefined) { const k = p.replace(/\[(\d+)\]/g, ".$1").split("."); let r = o; for (const key of k) { r = r?.[key]; if (r === undefined) return d; } return r; }
// RGB 转 HEX
function rgbToHex(r, g, b) { return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1); }
// HEX 转 RGB
function hexToRgb(h) { const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h); return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : null; }
// 防抖函数
function debounce(f, w) { let t; return function (...a) { clearTimeout(t); t = setTimeout(() => f(...a), w); }; }
// 节流函数
function throttle(f, l) { let i; return function (...a) { if (!i) { f.apply(this, a); i = true; setTimeout(() => i = false, l); } }; }
// 版本号比较
function compareVersion(v1, v2) { const a1 = v1.split("."), a2 = v2.split("."), l = Math.max(a1.length, a2.length); for (let i = 0; i < l; i++) { const n1 = parseInt(a1[i]) || 0, n2 = parseInt(a2[i]) || 0; if (n1 > n2) return 1; if (n1 < n2) return -1; } return 0; }
// 生成数字范围数组
function range(s, e, t = 1) { const r = []; for (let i = s; i <= e; i += t)r.push(i); return r; }
// 数组分组
function groupBy(a, k) { return a.reduce((r, i) => { const g = typeof k === "function" ? k(i) : i[k]; if (!r[g]) r[g] = []; r[g].push(i); return r; }, {}); }
// 数组扁平化
function flattenArray(a, d = Infinity) { if (d <= 0) return a.slice(); return a.reduce((acc, v) => acc.concat(Array.isArray(v) ? flattenArray(v, d - 1) : v), []); }
// 数组交集
function intersection(...a) { return a.reduce((x, y) => x.filter(z => y.includes(z))); }
// 数组差集
function difference(a1, a2) { return a1.filter(x => !a2.includes(x)); }
// 数字补零
function padZero(n, l = 2) { return n.toString().padStart(l, "0"); }
// 获取 URL 参数
function getUrlParams(u) { try { const p = {}, url = new URL(u || window?.location?.href || ""); url.searchParams.forEach((v, k) => p[k] = v); return p; } catch (e) { return {}; } }
// 下载文件(浏览器)
function downloadFile(u, f) { if (typeof window === "undefined") return; const a = document.createElement("a"); a.href = u; a.download = f || ""; document.body.appendChild(a); a.click(); document.body.removeChild(a); }
// 分转元
function fenToYuan(f) { return (f / 100).toFixed(2); }
// 元转分
function yuanToFen(y) { return Math.round(y * 100); }
// 挂载至 Env 原型，支持 $.funcName() 调用
Object.assign(Env.prototype, {
      // 加密/编码
      md5, sha1, base64Encode, base64Decode, urlEncode, urlDecode,

      // 随机/生成
      guid, randomInt, randomString, randomMac, phoneNum,
      range, randomArrayItem, shuffleArray,

      // 时间/日期/流程
      ts13, ts10, tsToDate,
      localHours, localMinutes, localYear, localMonth, localMonthPadded, localDay, localDayPadded,
      sleep, delay, wait: delay, debounce, throttle,

      // 数据处理/格式化
      objectKeys2LowerCase, queryToObj, jsonToUrl, uniqueArray, deepClone,
      intersection, difference, padZero, fenToYuan, yuanToFen,
      formatNumber, formatFileSize, capitalize, truncate, rgbToHex, hexToRgb,

      // 判断
      isEmptyObject, isEmptyArray, compareVersion,

      // 对象/数组操作
      getObjectValue, groupBy, flattenArray,

      // 杂项
      getUrlParams, downloadFile,

if (typeof module !== 'undefined') module.exports = Env;
Env;
