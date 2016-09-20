import * as React from "react";
import { View, Text, TouchableHighlight, StyleSheet, Dimensions, ListView } from 'react-native';
import ListViewDataSource = __React.ListViewDataSource;
import ScrollViewStyle = __React.ScrollViewStyle;
import ViewStyle = __React.ViewStyle;

const articleList = {
  '4': [
    {
      "id": "9799637",
      "img": "",
      "ext": "",
      "now": "2016-09-18(日)14:22:03",
      "userid": "WZottF4",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "在村逼亲戚眼里你在本省上211远没有那些省外三本和专科有出息，因为你是“没本事走出去”( ´_ゝ`)",
      "sage": "0",
      "admin": "0",
      "remainReplys": 15,
      "replyCount": "20",
      "replys": [{
        "id": "9799881",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:45:36",
        "userid": "3uxhTbV",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "我猜是他家里有去外省读书的",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799905",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:47:36",
        "userid": "kHX5OjL",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "还不如上沿海二本！——同省室友",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800099",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:06:59",
        "userid": "T9wvjvW",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "明明可以上外省211，硬是被父母和各路亲戚精神轰炸上了个本市的双非( ´_ゝ`)旦",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800158",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:12:30",
        "userid": "1PLJgaV",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "那么211可以约大专妹了吗，985的自己解决吧<br />\n(＾o＾)ﾉ ",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800189",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:15:52",
        "userid": "YEC0TfH",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "&gt;&gt;No.9800099<br />\n那是你自己傻咯",
        "sage": "0",
        "admin": "0"
      }]
    },
    {
      "id": "9800355",
      "img": "2016-09-18/57de43867863d",
      "ext": ".jpg",
      "now": "2016-09-18(日)15:34:30",
      "userid": "iW2SbIe",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "这淘宝广告推荐的是什么瘠薄玩意儿(*ﾟーﾟ)",
      "sage": "0",
      "admin": "0",
      "replyCount": "3",
      "replys": [{
        "id": "9800376",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:36:15",
        "userid": "ITHFLNx",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "|∀ﾟ猴米岛？",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800389",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:37:24",
        "userid": "rpVCXE7",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "我上次搜荧光灯丝辉光管啥的，它就开始莫名其妙给我推荐了一大堆hifi设备",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800470",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:45:10",
        "userid": "uB2nOhb",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "淘宝:已经为您挑好了，西门子S700系列PLC(*ﾟ∇ﾟ)",
        "sage": "0",
        "admin": "0"
      }]
    },
    {
      "id": "9800437",
      "img": "",
      "ext": "",
      "now": "2016-09-18(日)15:42:19",
      "userid": "jPdSMSu",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "朱军，100线小城市10月份学校组织去上海去逛逛，有什么地方推荐去玩的吗？不知道休息时间能有多少…不过还是想去看看(＾o＾)ﾉ",
      "sage": "0",
      "admin": "0",
      "replyCount": "1",
      "replys": [{
        "id": "9800468",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:45:06",
        "userid": "cPmdLsy",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "外滩请。。。还有海鲜也不错",
        "sage": "0",
        "admin": "0"
      }]
    },
    {
      "id": "9800297",
      "img": "",
      "ext": "",
      "now": "2016-09-18(日)15:27:28",
      "userid": "TofT8uC",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "朱军，我想离家出走了，想自驾在全国流浪，那么要攒多少钱够呢？",
      "sage": "0",
      "admin": "0",
      "remainReplys": 22,
      "replyCount": "27",
      "replys": [{
        "id": "9800377",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:36:33",
        "userid": "TofT8uC",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "&gt;&gt;No.9800353<br />\r\n我平时精神出现异常的时候，在附近走走就会感觉好些。。。但最近感觉越来越不行了。。。",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800387",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:37:14",
        "userid": "K7AEZ2U",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "自行车？",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800388",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:37:23",
        "userid": "yaq8dp2",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "万一开车开着开着路怒症发作怎么办？",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800422",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:40:28",
        "userid": "xrNFzjs",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "找个江浙一带的农村蹲一段时间吧，那边基础设施什么的都还不错(=ﾟωﾟ)=",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800432",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:41:34",
        "userid": "jnng1Qi",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "看医生才是正解",
        "sage": "0",
        "admin": "0"
      }]
    },
    {
      "id": "9800003",
      "img": "2016-09-18/57de3b3790392",
      "ext": ".jpg",
      "now": "2016-09-18(日)14:59:04",
      "userid": "IJL4lAL",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "(´ﾟДﾟ`)朱军，大一军训完了回去地铁上碰到一个以前的旅同学，为什么和她说了没两句她就走开了呢",
      "sage": "0",
      "admin": "0",
      "remainReplys": 12,
      "replyCount": "17",
      "replys": [{
        "id": "9800058",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:03:57",
        "userid": "CHG1VtX",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "是不是以前关系就很淡呢",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800061",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:04:11",
        "userid": "sj1gbcK",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "忙着和男朋友聊天",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800079",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:05:06",
        "userid": "IJL4lAL",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "&gt;&gt;No.9800058<br />\n( ﾟ∀ﾟ)可以这么说吧，不过算认识，其实能认识也是因为我们班的班长帅，我跟着沾光",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800080",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:05:10",
        "userid": "vQl5rG0",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "怎么碰到这个死宅了  好恶心啊还和我说话| ω・´)",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800101",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:07:01",
        "userid": "JvnJBG5",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "好恶心啊走开啦还拿出手机想干嘛看看你脸上的表情啊(╬ﾟдﾟ)",
        "sage": "0",
        "admin": "0"
      }]
    },
    {
      "id": "9800427",
      "img": "2016-09-18/57de450874ab4",
      "ext": ".png",
      "now": "2016-09-18(日)15:40:56",
      "userid": "gb1QtHs",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "给大家推荐一种零食吧，昨天晚上在超市买了几个散装的，真的挺好的，今天每种口味买一盒",
      "sage": "0",
      "admin": "0",
      "replyCount": "3",
      "replys": [{
        "id": "9800441",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:42:26",
        "userid": "6LBMotv",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "豆腐干   好想吃|-` )",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800457",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:44:28",
        "userid": "kOSb5fR",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "一直吃不来豆腐干…",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800469",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:45:07",
        "userid": "BnXqzoU",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "( ´ρ`)穷",
        "sage": "0",
        "admin": "0"
      }]
    },
    {
      "id": "9800454",
      "img": "",
      "ext": "",
      "now": "2016-09-18(日)15:44:15",
      "userid": "T9wvjvW",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "班委在讨论期末的晚会节目，要一个班表演的那种，然后有人提议跳舞跳极乐净土，还给不明真相的人放视频说明，我好尴尬( ・_ゝ・)",
      "sage": "0",
      "admin": "0",
      "replyCount": "0",
      "replys": []
    },
    {
      "id": "9800408",
      "img": "",
      "ext": "",
      "now": "2016-09-18(日)15:39:27",
      "userid": "K3kXc7Y",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "本肥肥下决心办了张两年健身卡4000这几个月要吃土了",
      "sage": "0",
      "admin": "0",
      "replyCount": "2",
      "replys": [{
        "id": "9800449",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:43:48",
        "userid": "6LBMotv",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "坚持两星期后  再也不见po(｀･ω･)",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800463",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:44:47",
        "userid": "GxigxdV",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "白瞎了4000块( ´_ゝ`)旦，不如吃鸡盒",
        "sage": "0",
        "admin": "0"
      }]
    },
    {
      "id": "9799186",
      "img": "",
      "ext": "",
      "now": "2016-09-18(日)13:34:42",
      "userid": "CmPCG4x",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "宣泄1<br />\n想裸辞<br />\n和这里所谓的同事（上级领导）已经关系恶劣到冰点<br />\n目前还在试用期，已经上了一个多月班了，也不知道怎么得罪了这帮人<br />\n工作上对我冷言冷语。<br />\n呆的实在痛苦 ",
      "sage": "0",
      "admin": "0",
      "remainReplys": 22,
      "replyCount": "27",
      "replys": [{
        "id": "9799586",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:16:12",
        "userid": "CmPCG4x",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "&gt;&gt;No.9799392<br />\n一个抽烟的欧巴桑",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799688",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:26:30",
        "userid": "0MmXvY2",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "既然不想干了 走之前钢正面啊 不然它还以为它很厉害呢",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799706",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:29:24",
        "userid": "4XygPXH",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "&gt;&gt;No.9799586<br />\r\n套用类似的话就是阻人装逼如同杀人父母~~",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799738",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:32:40",
        "userid": "6rVMpoX",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "1个月就把人得罪完你也是个人才啊。。。。自己辞职吧，免得让别人上班不开心",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799978",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:56:16",
        "userid": "CmPCG4x",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "&gt;&gt;No.9799738<br />\n话糙理不糙，我决定恶心他们(つд⊂)",
        "sage": "0",
        "admin": "0"
      }]
    },
    {
      "id": "9799523",
      "img": "",
      "ext": "",
      "now": "2016-09-18(日)14:09:34",
      "userid": "i8Q1OkZ",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "今天看到一个广告牌，突然明白alone为什么拼成alone了，alone=all one",
      "sage": "0",
      "admin": "0",
      "remainReplys": 1,
      "replyCount": "6",
      "replys": [{
        "id": "9799541",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:11:23",
        "userid": "YcxxVhr",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "你很懂哦",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799603",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:17:43",
        "userid": "i8Q1OkZ",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "&gt;&gt;No.9799541<br />\n那广告牌写了个alone然后把AL红色标记，突然就懂了",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799609",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:18:29",
        "userid": "rkaxFZK",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "是吗，那你很棒哦.jpg",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799671",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:25:10",
        "userid": "QiWcZv0",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "多了个l啊扑街",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799679",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:25:52",
        "userid": "ZLIuqsg",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "肥宅们迷の暴躁",
        "sage": "0",
        "admin": "0"
      }]
    }
  ],
  
  '20': [
    {
      "id": "9796961",
      "img": "",
      "ext": "",
      "now": "2016-09-18(日)10:14:41",
      "userid": "STn5QVW",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "那个……洗碗机到底好不好用呢<br />\n我妈想买个西门子的，但是我爸说没卵用不肯买 <br />\n其实每天洗碗的是我啊，淦(　ﾟ 3ﾟ) ",
      "sage": "0",
      "admin": "0",
      "remainReplys": 6,
      "replyCount": "11",
      "replys": [{
        "id": "9797174",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)10:32:36",
        "userid": "DzsHWd5",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "超好评的洗碗机就是你哟",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9797209",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)10:35:20",
        "userid": "B5CUCf3",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "昨天电视上各种宣传国产洗碗机的",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9797500",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)11:02:09",
        "userid": "axJg9xh",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "洗碗机也需要碗筷适合使用洗碗机",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9797528",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)11:04:46",
        "userid": "ZSucRYx",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "把买机器的钱给你 解决",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9798894",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)13:06:21",
        "userid": "YEO5qHn",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "| ω・´)我家里就是西门子的洗碗机<br />\n第一次用可能是我太蠢折腾了一个小时<br />\n<br />\n每次用的话还要提前把盘子碗上面大块的污垢给弄掉……不然有可能会堵住水管<br />\n<br />\n一次洗四十多分钟吧……整体还是挺方便辣 <br />\n<br />\n对我来说性价比不是很高|-` )",
        "sage": "0",
        "admin": "0"
      }]
    },
    {
      "id": "9800439",
      "img": "",
      "ext": "",
      "now": "2016-09-18(日)15:42:20",
      "userid": "6x3nk4x",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "朱军<br />\r\n太阳穴老是起痘<br />\r\n怎解<br />\r\n大雕",
      "sage": "0",
      "admin": "0",
      "replyCount": "0",
      "replys": []
    },
    {
      "id": "9800007",
      "img": "",
      "ext": "",
      "now": "2016-09-18(日)14:59:27",
      "userid": "HiGLhth",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "可是。。吉儿帮。。",
      "sage": "0",
      "admin": "0",
      "replyCount": "5",
      "replys": [{
        "id": "9800012",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:59:49",
        "userid": "rpVCXE7",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "割",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800014",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:59:51",
        "userid": "AHduiFg",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "翘",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800023",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:01:05",
        "userid": "Lbq6cOW",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "起",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800029",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:01:29",
        "userid": "rpVCXE7",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "剁",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800430",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:41:07",
        "userid": "A9q2NqI",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "掉",
        "sage": "0",
        "admin": "0"
      }]
    },
    {
      "id": "9798911",
      "img": "2016-09-18/57de212850e33",
      "ext": ".jpg",
      "now": "2016-09-18(日)13:07:52",
      "userid": "mr3Ma9W",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "好像有点腻害哦(*ﾟーﾟ)",
      "sage": "0",
      "admin": "0",
      "remainReplys": 4,
      "replyCount": "9",
      "replys": [{
        "id": "9798983",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)13:14:52",
        "userid": "e76CFAF",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "电信80块，下个月到期",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799088",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)13:24:43",
        "userid": "mr3Ma9W",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "&gt;&gt;No.9798983<br />\n所以你想换移动？别闹",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799194",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)13:35:15",
        "userid": "PM18Zen",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "我可以透支500(＾o＾)ﾉ",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799223",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)13:38:01",
        "userid": "1WBZvZK",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "(*ﾟ∀ﾟ*)我可以透支850欸",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799230",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)13:38:48",
        "userid": "lFOvxj6",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "妈的，我也移动三星级只能透二十块",
        "sage": "0",
        "admin": "0"
      }]
    },
    {
      "id": "9798343",
      "img": "",
      "ext": "",
      "now": "2016-09-18(日)12:15:33",
      "userid": "AoSl557",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "询问一<br />\n如果是肥肥的话，<br />\n是买低配外星人好？<br />\n还是买MAC好？<br />\n ",
      "sage": "0",
      "admin": "0",
      "remainReplys": 21,
      "replyCount": "26",
      "replys": [{
        "id": "9799650",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:23:38",
        "userid": "gTsDMSn",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "肌肉男买alienware<br />\n要是普通人我告诉你外星人带出去简直要亲命",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799651",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:23:39",
        "userid": "suDPBhU",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "无脑推xps15",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799668",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:24:56",
        "userid": "XLaRnw7",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "不负责任推x1carbon",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799669",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:24:59",
        "userid": "2vvkRxU",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "上船。外星人现在就是坨翔，谁买谁傻叉。真想装逼的话去买ROG。",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799703",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:29:10",
        "userid": "2vvkRxU",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "另外如果就是想看看视频的话弄个平板就好。强推宏碁switch alpha12。追求轻薄续航的话，惠普envy13，戴尔xps13（不带机械硬盘的版本），华硕U3000，宏碁蜂鸟。惠普新specture颜值极高，但是续航尿崩，别作死买那个。",
        "sage": "0",
        "admin": "0"
      }]
    },
    {
      "id": "9790332",
      "img": "",
      "ext": "",
      "now": "2016-09-17(六)18:57:21",
      "userid": "GMI0S5f",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "如果明天能过，就女装。不知道有没有人想看。<br />\r\n不是简单地穿个丝袜拍腿，要打扮得像花魁一样。<br />\r\n那么，我先下了。",
      "sage": "0",
      "admin": "0",
      "remainReplys": 83,
      "replyCount": "88",
      "replys": [{
        "id": "9800142",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:10:22",
        "userid": "4iZBuO3",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "(｀･ω･)已定阅",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800177",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:14:30",
        "userid": "WT2mPIC",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "　 ∧_∧::<br />\n 　 (´･ω･`)::<br />\n  /⌒　　⌒)::<br />\n /へ_＿ / /::<br />\n(＿＼＼ ﾐ)/::<br />\n　 ｜ `-イ::<br />\n　 /ｙ　 )::<br />\n　/／ ／::<br />\n／　／::<br />\n(　く:::<br />\n|＼ ヽ:::<br />\n呀啦那一卡",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800207",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:17:06",
        "userid": "uHqzDWo",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "敲碗(=ﾟωﾟ)=",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800213",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:17:54",
        "userid": "c3ii3g7",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "钓猴大成功(＾o＾)ﾉ",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800268",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:24:34",
        "userid": "GzzKCs2",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "订阅订阅( ´∀`)",
        "sage": "0",
        "admin": "0"
      }]
    },
    {
      "id": "9791679",
      "img": "",
      "ext": "",
      "now": "2016-09-17(六)21:11:39",
      "userid": "o6DAT5p",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "985和211的各位生活应该是怎么样的，有点好奇",
      "sage": "0",
      "admin": "0",
      "remainReplys": 140,
      "replyCount": "145",
      "replys": [{
        "id": "9799911",
        "img": "2016-09-18/57de38b61b96c",
        "ext": ".jpg",
        "now": "2016-09-18(日)14:48:22",
        "userid": "0DJRspQ",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "考研狗每天背背单词刷刷题刷刷岛然后混吃等死( ´_ゝ`)",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799916",
        "img": "2016-09-18/57de38c34704c",
        "ext": ".jpg",
        "now": "2016-09-18(日)14:48:35",
        "userid": "1kqRF55",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "垃圾双飞混日子",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799923",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:49:39",
        "userid": "wRRuf0H",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "&gt;&gt;No.9799911<br />\n校友你好|∀ﾟ",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799944",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)14:52:24",
        "userid": "YJohDbD",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "新饭卡串( ﾟ∀。)",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9799968",
        "img": "2016-09-18/57de3a3bf3695",
        "ext": ".jpg",
        "now": "2016-09-18(日)14:54:52",
        "userid": "YWnfYxk",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "末流211，差点找不到工作( ´_ゝ`)",
        "sage": "0",
        "admin": "0"
      }]
    },
    {
      "id": "9799960",
      "img": "",
      "ext": "",
      "now": "2016-09-18(日)14:54:16",
      "userid": "o6S0VFQ",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "好累啊，生活到底是为了什么啊，每天累死累活在公司被人嫌，回家被人骂，身边一个能倾述的人都没有，钱又得全部上交，自己的摩托车坏了都没钱修。然而在这样的环境还得每天鼓起干劲去拼搏，好累，好想放弃，总觉得未来没有一点希望。所以说我到底是为了什么。。。。",
      "sage": "0",
      "admin": "0",
      "remainReplys": 9,
      "replyCount": "14",
      "replys": [{
        "id": "9800126",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:08:39",
        "userid": "kWkemOg",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "而且没有人爱你",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800284",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:26:13",
        "userid": "4WqsuYb",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "因为不是985",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800383",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:36:44",
        "userid": "LiR16YN",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "不是985毕业也陪活在世上？",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800384",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:36:47",
        "userid": "IBjhjqK",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "为了联盟啊|∀ﾟ",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800392",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:37:40",
        "userid": "zAzmvKc",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "&gt;&gt;No.9800284<br />\n哦？敢问阁下学历如何，晒个学生证？",
        "sage": "0",
        "admin": "0"
      }]
    },
    {
      "id": "9795978",
      "img": "",
      "ext": "",
      "now": "2016-09-18(日)08:49:32",
      "userid": "2vvkRxU",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "慰菊哪有那么神奇……<br />\n<br />\n今天早上带着清洁手套试了下，根本没感觉啊……硬要说的话，只有极为强烈的憋屎感和抽出手指的时候的排泄感……",
      "sage": "0",
      "admin": "0",
      "remainReplys": 16,
      "replyCount": "21",
      "replys": [{
        "id": "9797533",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)11:05:19",
        "userid": "3XvOkBE",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "&gt;&gt;No.9796102<br />\n(つд⊂)第一次我用黄瓜捅射了",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9797612",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)11:12:13",
        "userid": "TTNlVnD",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "因为你，不会玩←_←",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9797638",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)11:14:58",
        "userid": "sUUPn6e",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "自己手按到高潮，我试过确实可以，但是至少要半个小时，弄完都快虚脱了。爽是爽，但是真心累。",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9797686",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)11:18:17",
        "userid": "JwIlOJN",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "&gt;&gt;No.9797612<br />\r\n我会玩，我来玩你好不好(〃∀〃)",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9798755",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)12:52:26",
        "userid": "t1zk5qX",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "&gt;&gt;No.9795978<br />\n因为po你戳的地方不是前列腺啦 ﾟ∀ﾟ)σ",
        "sage": "0",
        "admin": "0"
      }]
    },
    {
      "id": "9799314",
      "img": "2016-09-18/57de2a7400e41",
      "ext": ".jpg",
      "now": "2016-09-18(日)13:47:32",
      "userid": "wDsRA3F",
      "name": "无名氏",
      "email": "",
      "title": "无标题",
      "content": "昨天被蜈蚣咬了，被疼哭了( ´_ゝ`)",
      "sage": "0",
      "admin": "0",
      "replyCount": "2",
      "replys": [{
        "id": "9800169",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:14:10",
        "userid": "tfAk1rm",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "我有个同学被蜈蚣咬了还发在朋友圈。。现在在医院吊水 ",
        "sage": "0",
        "admin": "0"
      }, {
        "id": "9800410",
        "img": "",
        "ext": "",
        "now": "2016-09-18(日)15:39:32",
        "userid": "wDsRA3F",
        "name": "无名氏",
        "email": "",
        "title": "无标题",
        "content": "&gt;&gt;No.9800169<br />\n我的毒性不大，用酒精，肥皂水，风油精处理了，已经不疼了",
        "sage": "0",
        "admin": "0"
      }]
    }
  ]
};

const styles = StyleSheet.create({
  listView: {
    backgroundColor: '#f2f2f2',
    paddingTop: 5
  },

  postRow: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    padding: 10,
    borderColor: '#e8e9ea',
    borderWidth: 1,
    borderRadius: 3,
    shadowColor: 'rgba(32, 40, 49, 0.1)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 1
  },

  postRowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  } as ViewStyle,

  rowInfoText: {
    color: '#94999e',
    fontSize: 12
  }
});

interface articleProps {
  currentForumInfo: any;
}

interface articleState {
  dataSource: ListViewDataSource
}

class Article extends React.Component<articleProps, articleState> {
  constructor() {
    super();

    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: dataSource.cloneWithRows(articleList[4]),
    };
  }

  componentWillReceiveProps() {
    console.log('haha')
  }

  renderPostData(postData) {
    return (
      <TouchableHighlight>
        <View style={styles.postRow}>
          <View style={styles.postRowInfo}>
            <Text style={styles.rowInfoText}>{`${postData.userid} ${postData.now}`}</Text>
            <Text style={styles.rowInfoText}>{`reply：${postData.replyCount}`}</Text>
          </View>
          <Text>{postData.content}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    
    console.log(this.props);
    
    console.log('render article');
    
    const listViewProps = {
      dataSource: this.state.dataSource,
      renderRow: this.renderPostData.bind(this)
    };

    return (
      <View style = {{ flex: 1, marginTop: 64 }}>
        <ListView style={styles.listView} {...listViewProps}></ListView>
      </View>
    );
  }
}

export default Article;