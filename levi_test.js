// ========== 下面粘贴你的 LeviUtilsKit.js 工具箱 ==========
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
📦 LeviUtilskit.js - 全平台兼容通用工具箱 v1.0.0
=============================================*/
// 重试函数
async function retry(f, t = 3, i = 1000) { for (let n = 0; n < t; n++) { try { return await f(); } catch (e) { if (n === t - 1) throw e; await sleep(i); } } }
// Bark 推送通知(需传入$实例)
async function BarkNotify(c, k, t, b) { for (let i = 0; i < 3; i++) { console.log(`🔷Bark notify >> Start push (${i + 1})`); const s = await new Promise(n => { c.post({ url: 'https://api.day.app/push', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: t, body: b, device_key: k, ext_params: { group: t } }) }, (e, r, d) => r && r.status == 200 ? n(1) : n(d || e)) }); if (s === 1) { console.log('✅Push success!'); break } else { console.log(`❌Push failed! >> ${s.message || s}`) } } }
// 获取并显示免责声明(需传入$实例)
async function disclaimer($){const u=['https://fastly.jsdelivr.net/gh/czy13724/Quantumult-X@main/NAvailable/Declaration.json','https://fastly.jsdelivr.net/gh/czy13724/Quantumult-X@main/NAvailable/Description.json'];for(const x of u){let b=null;try{b=await new Promise(r=>typeof $httpClient!='undefined'?$httpClient.get({url:x,timeout:2},(e,_,d)=>r(e?null:d)):typeof $task!='undefined'?$task.fetch({url:x}).then(o=>r(o.body),_=>r(null)):require('https').get(x,o=>{let s='';o.on('data',c=>s+=c);o.on('end',()=>r(s))}).on('error',()=>r(null)))}catch(_){b=null}if(!b)continue;try{const j=JSON.parse(b);if(j&&j.notice){console.log(j.notice);break}}catch(_){}}}
// 复制到剪贴板(浏览器)
async function copyToClipboard(t) { if (typeof navigator === "undefined") return false; try { await navigator.clipboard.writeText(t); return true; } catch (e) { return false; } }
// 正则验证器(手机/邮箱/身份证/URL/IP/中文)
const validator = { isMobile: s => /^1[3-9]\d{9}$/.test(s), isEmail: s => /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(s), isIdCard: s => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(s), isUrl: s => /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(s), isIP: s => /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(s), isChinese: s => /^[\u4e00-\u9fa5]+$/.test(s) };
}
