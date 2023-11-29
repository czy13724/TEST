{
  "id": "Sliverkiss.sub",
  "name": "Sliverkiss脚本订阅",
  "author": "@Sliverkiss",
  "icon": "https://raw.githubusercontent.com/Sliverkiss/GoodNight/master/icon/sliverkiss.png",
  "repo": "",
  "apps": [
    {
      "id": "iios",
      "name": "iios",
      "script": "",
      "author": "@Sliverkiss",
      "repo": "",
      "icons": [
        "https://raw.githubusercontent.com/Sliverkiss/GoodNight/master/icon/Iios.png",
        "https://raw.githubusercontent.com/Sliverkiss/GoodNight/master/icon/Iios.png"  
      ],
      "keys": ["iios_data"],
      "descs_html": ["将脚本拉取到本地->打开网站随便逛逛，若提示获取cookie成功则可以使用该脚本"],
      "settings": [
       {
        "id": "iios_data",
        "name": "iios_data",
        "val": "",
        "type": "textarea",
        "placeholder": "",
        "desc": "抓包www.iios.fun域名下的Authorization，填写到iios_data,多账号用@分割"
       }  
      ]
    },
    {
      "id": "acfun",
      "name": "acfun",
      "script": "",
      "author": "@mcdasheng",
      "repo": "",
      "icons": [
        "https://raw.githubusercontent.com/Orz-3/mini/master/Color/acfun.png",
        "https://raw.githubusercontent.com/Orz-3/mini/master/Color/acfun.png"
      ],
      "keys": ["acfun_session"],
      "descs_html": ["我的 --> 手动签到一次"],
      "settings": [
       {
        "id": "acfun_session",
        "name": "acfun_session",
        "val": "",
        "type": "textarea",
        "placeholder": "",
        "desc": "我的 --> 手动签到一次"
       }  
      ]
    },
    {
      "id": "adjd",
      "name": "亚朵酒店",
      "script": "",
      "author": "@Sliverkiss",
      "repo": "",
      "icons": [
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Adjd.png",
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Adjd.png"
      ],
      "keys": [
	"adjd_url",
	"adjd_header",
        "adjd_draw"
      ],
      "descs_html": ["1.复制Cookie脚本到本地</br>2.打开亚朵酒店app手动签到一次，若提示获取cookie成功则可以使用签到脚本</br>3.关闭获取token脚本"],
      "settings": [
	{
        "id": "adjd_url",
        "name": "adjd_url",
        "val": "",
        "type": "textarea",
        "placeholder": "",
        "desc": ""
       },
       {
        "id": "adjd_header",
        "name": "adjd_header",
        "val": "",
        "type": "text",
        "placeholder": "",
        "desc": "六宫格设置抽奖,默认为随机,可填入0~5"
       },
       {
        "id": "adjd_draw",
        "name": "adjd_draw",
        "val": "",
        "type": "textarea",
        "placeholder": "",
        "desc": "通知相关"
       }
      ]
    },
    {
      "id": "aDriveCheckIn",
      "name": "阿里云盘自动签到",
      "author": "@zqzess",
      "repo": "",
      "icons": [
        "https://raw.githubusercontent.com/Softlyx/Fileball/main/YUAN/ALiYun.png",
        "https://raw.githubusercontent.com/Softlyx/Fileball/main/YUAN/ALiYun.png"
      ],
      "keys": [
        "@ADriveCheckIn.refresh_token_body",
        "@ADriveCheckIn.headers",
        "@ADriveCheckIn.refresh_token",
        "@ADriveCheckIn.isAutoGetReword"
      ],
      "settings": [
        {
          "id": "@ADriveCheckIn.refresh_token",
          "name": "refresh_token",
          "val": null,
          "type": "text",
          "autoGrow": false,
          "rows": 1,
          "desc": "阿里云盘refresh_token"
        },
        {
          "id": "@ADriveCheckIn.isAutoGetReword",
          "name": "开启自动领取奖励",
          "val": true,
          "type": "boolean",
          "desc": "默认开启"
        }
      ]
    },
    {
      "id": "bwcj",
      "name": "霸王茶姬",
      "script": "",
      "author": "",
      "repo": "",
      "icons": [
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Bwcj.png",
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Bwcj.png"
      ],
      "keys": [
	"bwtoken",
	"bwbody"	
      ],
      "descs_html": ["微信霸王茶姬小程序 --> 积分商城 --> 积分签到 --> 签到"],
      "settings": [
       {
        "id": "bwtoken",
        "name": "bwtoken",
        "val": "",
        "type": "textarea",
        "placeholder": "",
        "desc": ""
       },
       {
        "id": "bwbody",
        "name": "bwbody",
        "val": "",
        "type": "textarea",
        "placeholder": "",
        "desc": ""
       }  
      ]
    },
   {
      "id": "glados",
      "name": "Glados签到",
      "script": "",
      "author": "@Sliverkiss",
      "repo": "",
      "icons": [
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Glados.png",
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Glados.png"
      ],
      "keys": [
	    "glados_userSignKey"	
      ],
      "descs_html": [" "],
      "settings": [
       {
        "id": "glados_userSignKey",
        "name": "glados_userSignKey",
        "val": "",
        "type": "textarea",
        "placeholder": "",
        "desc": ""
       } 
      ]
    },
    {
      "id": "gaode",
      "name": "高德打车",
      "author": "@苍井灰灰",
      "repo": "https://github.com/wf021325/",
      "script": "https://github.com/wf021325/qx/blob/main/task/ampDache.js?raw=true",
      "descs_html": [
        "<font size='2'><b>获取Cookie以及脚本配置请查看</b></font><a href='https://github.com/wf021325/qx/blob/main/task/ampDache.js?raw=true'><font class='orange--text'>脚本注释</font></a>"
      ],
      "icons": [
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Gddt.png",
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Gddt.png"
      ],
      "keys": [
        "GD_Val"
      ],
      "settings": [
        {
          "id": "GD_Val",
          "name": "GD_Val",
          "val": "",
          "type": "textarea",
          "desc": "GD_Val"
        }
      ]
    },
    {
      "id": "Hisense",
      "name": "海信爱家",
      "author": "@FoKit",
      "script": "https://raw.githubusercontent.com/FoKit/Scripts/main/scripts/Hisense.js",
      "descs_html": [""],
      "icons": [
        "https://raw.githubusercontent.com/FoKit/Scripts/main/images/hisense.png",
        "https://raw.githubusercontent.com/FoKit/Scripts/main/images/hisense.png"
      ],
      "keys": ["HISENSE_CPS", "HISENSE_SWEIXIN", "HISENSE_GAME_SCORE"],
      "settings": [
        {
          "id": "HISENSE_CPS",
          "name": "签到数据",
          "val": "",
          "type": "textarea",
          "autoGrow": true,
          "rows": 1,
          "desc": "多账户用 @ 隔开"
        },
        {
          "id": "HISENSE_SWEIXIN",
          "name": "用户数据",
          "val": "",
          "type": "textarea",
          "autoGrow": true,
          "rows": 1,
          "desc": "多账户用 @ 隔开"
        },
        {
          "id": "HISENSE_GAME_SCORE",
          "name": "游戏分数",
          "val": "",
          "type": "text",
          "desc": "打地鼠随机积分范围，格式 20-30"
        }
      ]
    },
    {
      "id": "hdl",
      "name": "海底捞",
      "script": "",
      "author": "@Sliverkiss",
      "repo": "",
      "icons": [
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Hdl.png",
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Hdl.png"
      ],
      "keys": ["hdl_data"],
      "descs_html": ["登录后抓包 superapp-public.kiwa-tech.com域名下的_haidilao_app_token，填写到hdl_data,多账号用 @ 分割"],
      "settings": [
	   {
        "id": "hdl_data",
        "name": "hdl_data",
        "val": "",
        "type": "textarea",
        "placeholder": "",
        "desc": "登录后抓包 superapp-public.kiwa-tech.com域名下的_haidilao_app_token，填写到hdl_data,多账号用 @ 分割"
       } 
      ]
    },
    {
      "id": "hldc",
      "name": "哈啰单车",
      "script": "",
      "author": "@Sliverkiss",
      "repo": "",
      "icons": [
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Hldc.png",
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Hldc.png"
      ],
      "keys": ["hldc_data"],
      "descs_html": ["1.将获取Cookie脚本保存到本地</br>2.打开小程序->奖励中心，若提示获取Cookie成功则可以使用该脚本</br>3.关闭获取ck脚本，避免产生不必要的mitm。"],
      "settings": [
	   {
        "id": "hldc_data",
        "name": "hldc_data",
        "val": "",
        "type": "textarea",
        "placeholder": "",
        "desc": "登录后抓包 api.hellobike.com域名下的token,填写到hldc_data,多账号用 @ 分割"
       } 
      ]
    },
    {
      "id": "hsay",
      "name": "沪上阿姨",
      "script": "",
      "author": "@Sliverkiss",
      "repo": "",
      "icons": [
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Hsay.png",
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Hsay.png"
      ],
      "keys": ["hsay_data"],
      "descs_html": ["1.将获取Cookie脚本保存到本地</br>2.打开小程序->我的，若提示获取Cookie成功则可以使用该脚本</br>3.关闭获取ck脚本，避免产生不必要的mitm。"],
      "settings": [
       {
        "id": "hsay_data",
        "name": "hsay_data",
        "val": "",
        "type": "textarea",
        "placeholder": "",
        "desc": "抓包 webapi.qmai.cn域名下的Qm-User-Token，填写到hsay_data,多账号用 @ 分割"
       }
      ]
    },
    {
      "id": "hzh",
      "name": "华住会",
      "script": "",
      "author": "@苍井灰灰",
      "repo": "",
      "icons": [
        "https://raw.githubusercontent.com/Raphael689/RW/master/iCons/hzh.png",
        "https://raw.githubusercontent.com/Raphael689/RW/master/iCons/hzh.png"
      ],
      "keys": ["token_key"],
      "descs_html": [""],
      "settings": [
	   {
        "id": "token_key",
        "name": "token_key",
        "val": "",
        "type": "textarea",
        "placeholder": "",
        "desc": ""
       }  
      ]
    },
    {
      "id": "jparking",
      "name": "捷停车",
      "author": "@FoKit",
      "descs_html": ["捷停车签到"],
      "icons": [
        "https://raw.githubusercontent.com/FoKit/Scripts/main/images/jparking.png",
        "https://raw.githubusercontent.com/FoKit/Scripts/main/images/jparking.png"
      ],
      "scripts": [
        {
          "name": "捷停车签到",
          "script": "https://raw.githubusercontent.com/FoKit/Scripts/main/scripts/jparking_sign.js"
        }
      ],
      "keys": [
	    "jtc_userId", 
		"jtc_taskNo"
		],
      "settings": [
        {
          "id": "jtc_userId",
          "name": "用户ID",
          "val": "",
          "type": "textarea",
          "autoGrow": true,
          "rows": 1,
          "placeholder": "userId1@userId2",
          "desc": "多个ID@隔开"
        },
        {
          "id": "jtc_taskNo",
          "name": "任务ID",
          "val": "T71811221608",
          "type": "text",
          "placeholder": "T71811221608",
          "desc": "默认 T71811221608 可留空"
        }
      ]
    },
    {
      "id": "mtmc",
      "name": "美团买菜",
      "author": "@JoJoJotarou@MuTu888",
      "repo": "https://raw.githubusercontent.com/JoJoJotarou/myScript/master/script/meituan/mall.meituan.mallcoin.task.js",
      "script": "https://raw.githubusercontent.com/JoJoJotarou/myScript/master/script/meituan/mall.meituan.mallcoin.task.js",
      "icons": [
          "https://raw.githubusercontent.com/JoJoJotarou/myScript/master/script/meituan/icon/mall.meituan.png",
          "https://raw.githubusercontent.com/JoJoJotarou/myScript/master/script/meituan/icon/mall.meituan.png"
      ],
      "keys": [
          "jojo_mall_meituan"
      ],
      "settings": [
        {
            "id": "jojo_mall_meituan",
            "name": "美团买菜Token",
            "val": "",
            "type": "text",
            "placeholder": "",
            "autoGrow": true,
            "rows": 2,
            "desc": "美团买菜Token"
	}
      ]
    },
    {
      "id": "qidian",
      "name": "起点读书",
      "script": "https://raw.githubusercontent.com/MCdasheng/QuantumultX/main/Scripts/myScripts/qidian.js",
      "author": "@mcdasheng",
      "repo": "https://github.com/mcdasheng",
      "icons": [
        "https://raw.githubusercontent.com/chxm1023/Script_X/main/icon/qidian.png",
        "https://raw.githubusercontent.com/chxm1023/Script_X/main/icon/qidian.png"
      ],
      "keys": [
        "qd_session",
        "qd_session_2",
        "qd_taskId",
        "qd_taskId_2",
        "qd_timeout"
      ],
      "desc": "",
      "settings": [
        {
          "id": "qd_session",
          "name": "qd_session",
          "val": "",
          "type": "text",
          "placeholder": "",
          "desc": ""
        },
        {
          "id": "qd_session_2",
          "name": "qd_session_2",
          "val": "",
          "type": "text",
          "placeholder": "",
          "desc": ""
        },
        {
          "id": "qd_taskId",
          "name": "qd_taskId",
          "val": "",
          "type": "text",
          "placeholder": "",
          "desc": ""
        },
        {
          "id": "qd_taskId_2",
          "name": "qd_taskId_2",
          "val": "",
          "type": "text",
          "placeholder": "",
          "desc": ""
        },
        {
          "id": "qd_timeout",
          "name": "间隔时间",
          "val": 20,
          "type": "number",
          "placeholder": "",
          "desc": "默认间隔20s"
        }
      ]
    },
    {
      "id": "sfsy",
      "name": "顺丰",
      "script": "",
      "author": "@leafTheFish",
      "repo": "",
      "descs_html": ["顺丰签到和做任务得积分,可以换运费券和实物</br>打开小程序或APP-我的-积分,点进去任务列表界面. 捉以下几种url之一,把整个url放到变量 sfsyUrl 里,多账号换行分割</br>https://mcs-mimp-web.sf-express.com/mcs-mimp/share/weChat/shareGiftReceiveRedirect</br>https://mcs-mimp-web.sf-express.com/mcs-mimp/share/app/shareRedirect</br>每天跑一到两次就行"],
      "icons": [
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Sfsy.png",
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Sfsy.png"  
      ],
      "keys": ["sfsyUrl"],
      "settings": [
	{
         "id": "sfsyUrl",
         "name": "sfsyUrl",
         "val": "",
         "type": "textarea",
         "placeholder": "",
         "desc": ""
       }
      ]
    },
    {
      "id": "smzdm",
      "name": "什么值得买",
      "author": "@blackmatrix7",
      "repo": "https://github.com/blackmatrix7/ios_rule_script/tree/master/script/smzdm",
      "icons": [
        "https://raw.githubusercontent.com/Orz-3/mini/master/Alpha/smzdm.png",
        "https://raw.githubusercontent.com/Orz-3/mini/master/Color/smzdm.png"
      ],
      "keys": [
        "smzdm_cookie",
        "smzdm_cookie_id",
        "smzdm_signin",
        "smzdm_mission",
        "smzdm_lottery",
        "smzdm_blackroom",
        "smzdm_sync_qinglong"
      ],
      "scripts": [
        {
          "name": "执行每日签到与任务",
          "script": "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/script/smzdm/smzdm_daily.js"
        }
      ],
      "settings": [
        {
          "id": "smzdm_sync_qinglong",
          "name": "同步数据到青龙面板",
          "val": false,
          "type": "boolean",
          "desc": "将必要数据同步至青龙面板，以执行作业"
        },
        {
          "id": "smzdm_signin",
          "name": "执行每日签到",
          "val": false,
          "type": "boolean",
          "desc": ""
        },
        {
          "id": "smzdm_mission",
          "name": "执行每日任务",
          "val": false,
          "type": "boolean",
          "desc": ""
        },
        {
          "id": "smzdm_lottery",
          "name": "执行每日抽奖",
          "val": false,
          "type": "boolean",
          "desc": ""
        },
        {
          "id": "smzdm_blackroom",
          "name": "脚本运行时进行黑号检测",
          "val": false,
          "type": "boolean",
          "desc": ""
        }
      ]
    },
    {
      "id": "sxios",
      "name": "松鼠ios",
      "script": "",
      "author": "@Sliverkiss",
      "repo": "",
      "icons": [
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Firework.png",
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Firework.png"
        ],
      "keys": ["sxios_data"],
      "descs_html": ["1.将获取Cookie脚本保存到本地</br>打开小程序->个人中心->登录后刷新，确保拿到完整的Cookie，若提示获取Cookie成功则可以使用该脚本</br>3.关闭获取ck脚本，避免产生不必要的mitm。"],
      "settings": [
	{
         "id": "sxios_data",
         "name": "sxios_data",
         "val": "",
         "type": "textarea",
         "placeholder": "",
         "desc": "抓包 https://ios.xiezhenge.com/user , 找到 Cookie，填写到sxios_data,多账号用 @ 分割"
	}
      ]
    },
    {
      "id": "TestFlight",
      "name": "TestFlight自动加入",
      "script": "https://raw.githubusercontent.com/MCdasheng/QuantumultX/main/Scripts/myScripts/TestFlight.js",
      "author": "@mcdasheng",
      "repo": "https://github.com/mcdasheng",
      "icons": [
        "https://raw.githubusercontent.com/Orz-3/mini/master/Color/testflight.png",
        "https://raw.githubusercontent.com/Orz-3/mini/master/Color/testflight.png"
      ],
      "keys": [
        "tf_appIds",
        "tf_account_key",
        "tf_session_id",
        "tf_request_id",
        "tf_session_digest"
      ],
      "desc": "详见脚本注释",
      "settings": [
        {
          "id": "tf_appIds",
          "name": "tf_appIds",
          "val": "",
          "type": "text",
          "placeholder": "",
          "desc": ""
        },
        {
          "id": "tf_account_key",
          "name": "tf_account_key",
          "val": "",
          "type": "text",
          "placeholder": "",
          "desc": ""
        },
        {
          "id": "tf_session_id",
          "name": "tf_session_id",
          "val": "",
          "type": "text",
          "placeholder": "",
          "desc": ""
        },
        {
          "id": "tf_request_id",
          "name": "tf_request_id",
          "val": "",
          "type": "text",
          "placeholder": "",
          "desc": ""
        },
        {
          "id": "tf_session_digest",
          "name": "tf_session_digest",
          "val": "",
          "type": "text",
          "placeholder": "",
          "desc": ""
        }
      ]
    },
    {
      "id": "tyyp",
      "name": "天翼云盘",
      "author": "@MCdasheng",
      "repo": "",
      "script": "",
      "descs_html": [
        "<font size='2'><b>获取Cookie以及脚本配置请查看</b></font><a href='https://raw.githubusercontent.com/MCdasheng/QuantumultX/main/Scripts/myScripts/ty.cookie.js'><font class='orange--text'>脚本注释</font></a>"
      ],
      "icons": [
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Tyyp.png",
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Tyyp.png"
      ],
      "keys": [
        "ty_session"
      ],
      "settings": [ 
        {
          "id": "ty_session",
          "name": "ty_session",
          "val": "",
          "type": "textarea",
          "desc": "我的 --> 手动签到一次"
        }
      ]
    },
    {
      "id": "Tuhyche",
      "name": "途虎签到",
      "author": "@Zoo",
      "repo": "https://github.com/Crazy-Z7/Task",
      "script": "https://github.com/Crazy-Z7/Task/blob/main/Tuhyche.js?raw=true",
      "descs_html": [
        "<font size='2'><b>获取Cookie以及脚本配置请查看</b></font><a href='https://github.com/Crazy-Z7/Task/blob/main/Tuhyche.js?raw=true'><font class='orange--text'>脚本注释</font></a></br><font class='red--text'>cookie获取:公众号搜索途虎小程序登录</font>"
      ],
      "icons": [
        "https://raw.githubusercontent.com/Raphael689/RW/master/iCons/tuhu.png",
        "https://raw.githubusercontent.com/Raphael689/RW/master/iCons/tuhu.png"
      ],
      "keys": [
        "tuhuvx",
        "TU_usersignKeyTU"
      ],
      "settings": [
        {
          "id": "tuhuvx",
          "name": "tuhuvx",
          "val": "",
          "type": "textarea",
          "desc": "tuhuvx"
        },
        {
          "id": "TU_usersignKeyTU",
          "name": "TU_usersignKeyTU",
          "val": "",
          "type": "textarea",
          "desc": "TU_usersignKeyTU"
        }
      ]
    },
    {
      "id": "tls",
      "name": "特仑苏",
      "author": "@Sliverkiss",
      "repo": "https://github.com/Sliverkiss",
      "script": "https://github.com/Raphael689/RW/blob/master/Scripts/tls.js?raw=true",
      "descs_html": [
        "<font size='2'><b>获取Cookie以及脚本配置请查看</b></font><a href='https://github.com/Raphael689/RW/blob/master/Scripts/tls.js?raw=true'><font class='orange--text'>脚本注释</font></a>"
      ],
      "icons": [
        "https://raw.githubusercontent.com/Raphael689/RW/master/iCons/tls.png",
        "https://raw.githubusercontent.com/Raphael689/RW/master/iCons/tls.png"
      ],
      "keys": [
        "tls_data"
      ],
      "settings": [
        {
          "id": "tls_data",
          "name": "tls_data",
          "val": "",
          "type": "textarea",
          "desc": "tls_data"
        }
      ]
    },
    {
      "id": "wbzj",
      "name": "腕表之家",
      "author": "@苍井灰灰",
      "repo": "https://github.com/wf021325/",
      "script": "https://github.com/wf021325/qx/blob/main/task/wbzj.js?raw=true",
      "descs_html": [
        "<font size='2'><b>获取Cookie以及脚本配置请查看</b></font><a href='https://github.com/wf021325/qx/blob/main/task/wbzj.js?raw=true'><font class='orange--text'>脚本注释</font></a>"
      ],
      "icons": [
        "https://raw.githubusercontent.com/Raphael689/RW/master/iCons/wbzj.png",
        "https://raw.githubusercontent.com/Raphael689/RW/master/iCons/wbzj.png"
      ],
      "keys": [
        "WBZJ_KEY"
      ],
      "settings": [
        {
          "id": "WBZJ_KEY",
          "name": "WBZJ_KEY",
          "val": "",
          "type": "textarea",
          "desc": "WBZJ_KEY"
        }
      ]
    },
    {
      "id": "yqslhy",
      "name": "元气森林会员中心",
      "author": "@Sliverkiss",
      "repo": "https://github.com/Sliverkiss",
      "script": "https://github.com/Raphael689/RW/blob/master/Scripts/yqslhy.js?raw=true",
      "descs_html": [
        "<font size='2'><b>获取Cookie以及脚本配置请查看</b></font><a href='https://github.com/Raphael689/RW/blob/master/Scripts/yqslhy.js?raw=true'><font class='orange--text'>脚本注释</font></a>"
      ],
      "icons": [
        "https://raw.githubusercontent.com/Raphael689/RW/master/iCons/yqsl.png",
        "https://raw.githubusercontent.com/Raphael689/RW/master/iCons/yqsl.png"
      ],
      "keys": [
        "yqslCookie"
      ],
      "settings": [ 
        {
          "id": "yqslCookie",
          "name": "yqslCookie",
          "val": "",
          "type": "textarea",
          "desc": "yqslCookie"
        }
      ]
    },
    {
      "id": "xdm",
      "name": "小豆苗",
      "author": "@苍井灰灰",
      "repo": "https://github.com/Sliverkiss",
      "script": "https://raw.githubusercontent.com/wf021325/qx/master/task/xdm.js",
      "descs_html": [
        "<font size='2'><b>获取Cookie以及脚本配置请查看</b></font><a href='https://raw.githubusercontent.com/wf021325/qx/master/task/xdm.js'><font class='orange--text'>脚本注释</font></a>"
      ],
      "icons": [
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Xdm.png",
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Xdm.png"
      ],
      "keys": [
        "XDM_Header"
      ],
      "settings": [ 
        {
          "id": "XDM_Header",
          "name": "XDM_Header",
          "val": "",
          "type": "textarea",
          "desc": ""
        }
      ]
    },
    {
      "id": "yuchenios",
      "name": "雨晨ios",
      "script": "",
      "author": "@Sliverkiss",
      "repo": "",
      "icons": [
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Sxios.jpg",
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Sxios.jpg"
      ],
      "keys": ["yuchenCookie"],
      "descs_html": ["打开网站->登录后进入个人中心，若提示获取ck成功则可以使用该脚本"],
      "settings": [
	   {
        "id": "yuchenCookie",
        "name": "yuchenCookie",
        "val": "",
        "type": "textarea",
        "placeholder": "",
        "desc": "抓取yuchen.tonghuaios.com域名下签到的cookie填写到yuchenCookie，多账号用 @ 分隔"
       }  
      ]
    },
    {
      "id": "zmhy",
      "name": "中免会员",
      "script": "",
      "author": "@Sliverkiss",
      "repo": "",
      "icons": [
        "https://raw.githubusercontent.com/Raphael689/RW/master/iCons/zmhy.png",
        "https://raw.githubusercontent.com/Raphael689/RW/master/iCons/zmhy.png"  
      ],
      "keys": ["zmhy_data"],
      "descs_html": ["1.将获取Cookie脚本保存到本地</br>打开小程序->我的->积分明细,若提示获取token成功则可以使用该脚本</br>3.关闭获取ck脚本，避免产生不必要的mitm。"],
      "settings": [
       {
         "id": "zmhy_data",
         "name": "zmhy_data",
         "val": "",
         "type": "textarea",
         "placeholder": "",
         "desc": "抓包 cdfmbrapi.cdfg.com.cn域名下的x-access-token，填写到zmhy_data,多账号用 @ 分割"
       }  
      ]
    },
	{
      "id": "zhixuan",
      "name": "知轩",
      "script": "",
      "author": "@Sliverkiss",
      "repo": "",
      "icons": [
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Zxcs.png",
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Zxcs.png"
      ],
      "keys": ["zhixuan_data"],
      "descs_html": ["1.将获取Cookie脚本保存到本地</br>登录网站，打开个人中心，若提示获取ck成功则可以使用该脚本</br>3.关闭获取ck脚本，避免产生不必要的mitm。"],
      "settings": [
       {
         "id": "zhixuan_data",
         "name": "zhixuan_data",
         "val": "",
         "type": "textarea",
         "placeholder": "",
         "desc": "抓取yuchenios.com域名下签到的cookie填写到zhixuan_data，多账号用 @ 分隔"
       }
     ]
    },
    {
      "id": "zsfc",
      "name": "掌上飞车",
      "author": "@chiupam",
      "repo": "",
      "script": "",
      "icons": [
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Zsfc.png",
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Zsfc.png"
      ],
      "keys": [
	"zsfc_url",
	"zsfc_headers",  
	"zsfc_param"
      ],
      "descs_html": [
        "<h4 align=\"center\">获取数据方法：掌上飞车APP => 下方咨询栏 => 签到(每日福利) </a></h4>"
      ],
      "settings": [
        {
          "id": "zsfc_url",
          "name": "签到地址",
          "val": "",
          "type": "text",
          "desc": "每日签到的地址"
        },
        {
          "id": "zsfc_headers",
          "name": "签到请求头",
          "val": "",
          "type": "textarea",
          "desc": "每日签到的请求头"
        },
        {
          "id": "zsfc_param",
          "name": "签到请求体",
          "val": "",
          "type": "textarea",
          "desc": "每日签到的请求体"
        },
        {
          "id": "zsfc_time",
          "name": "获取数据时间",
          "val": "",
          "type": "text",
          "desc": "获取到以上数据的时间"
        }
      ]
    },
    {
      "id": "zsfc.shop.online",
      "name": "掌飞商城",
      "author": "",
      "repo": "",
      "script": "",
      "icons": [
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Zsfc.png",
        "https://raw.githubusercontent.com/Sliverkiss/QuantumultX/main/icon/Zsfc.png"
      ],
      "keys": [
	"zsfc_bang_shopname",
	"zsfc_bang_url",   
	"zsfc_bang_referer",
	"zsfc_bang_data"
      ],
      "descs_html": [
        "<h4 align=\"center\">获取数据方法：掌上飞车APP => 下方游戏栏 => 掌上商城</h4>",
        "<h4 align=\"center\">道具名称只能填写以下其中之一</h4>",
        "<h4 align=\"center\">雷诺、进气系统、燃料系统、点火系统、引擎系统、防护装置、普通粒子推进、普通阿尔法离合、重生宝珠LV1、效率宝珠LV1、效率宝珠LV2</h4>"
      ],
      "settings": [
        {
          "id": "zsfc_bang_shopname",
          "name": "道具名称",
          "val": "",
          "type": "text",
          "desc": "有点券或消费券时进行消费购物"
        },
        {
          "id": "zsfc_bang_url",
          "name": "余额地址",
          "val": "",
          "type": "text",
          "desc": "获取余额的地址"
        },
        {
          "id": "zsfc_bang_referer",
          "name": "购物请求头",
          "val": "",
          "type": "textarea",
          "desc": "发起购物请求的请求头"
        },
        {
          "id": "zsfc_bang_data",
          "name": "购物请求体",
          "val": "",
          "type": "textarea",
          "desc": "发起购物请求的请求体"
        }
      ]
    }
  ]
}

