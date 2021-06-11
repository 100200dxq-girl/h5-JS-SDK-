import { WX } from "@/config/rest.api";
export function wx_shareInfor(params = {}) {
    let data = {};
    WX.getWxConfig({url:params.url}).then((res) => {
        if (res.code === 1) {
            data = res.data;
            // console.log("config", data);
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    "updateAppMessageShareData",
                    "updateTimelineShareData"
                ],
            });
        }
    });
    wx.ready(function() {
        const title = params.title,
            desc = params.desc,
            timeLinetitle = params.timeLinetitle,
            myurl = params.myurl || "https://www.xxx.com",
            imgUrl = params.imgUrl ||'https://xxx.qpic.cn/mmbiz_jpg/gnZ8N47iaS51rLiaLmibA7yTkFRjwgjrdfwfL7RXRRysQBkyMO77Xkjmz6EfnBU5cBMiae1BbWhQYKibo2OPPCpGO5w/0?wx_fmt=jpeg';
            // imgUrl = 'https://www.51youpian.com/file/oss/test/image/nft-goods/5bd26e9416a54a009ca7af6acde016c7.jpeg';
        //分享给朋友
        wx.updateAppMessageShareData({
            title : title, // 分享标题
            desc : desc, // 分享描述
            link : myurl, // 分享链接
            imgUrl: imgUrl,
            type : 'link', // 分享类型,music、video或link，不填默认为link
            success : function() {
                // 用户确认分享后执行的回调函数
                // alert("wx.updateAppMessageShareData share");
            },
            cancel : function() {
                // 用户取消分享后执行的回调函数
                alert("取消分享");
            }
        });

        wx.updateTimelineShareData({
            title : timeLinetitle, // 分享标题
            link : myurl, // 分享链接
            imgUrl: imgUrl,
            success : function() {
                // 用户确认分享后执行的回调函数
                // alert("wx.updateTimelineShareData share");
            },
            cancel : function() {
                // 用户取消分享后执行的回调函数
                alert("取消分享");
            }
        });

    });
    wx.error(function(res) {
        alert('error',res.errMsg);
    }); 
}
