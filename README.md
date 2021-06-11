# h5-JS-SDK-
h5页面调用微信JS-SDK分享到微信好友或者朋友圈的配置 微信API：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html

全流程参考：https://www.cnblogs.com/xjbBill/p/7868095.html
【SPA与MPA参考：https://www.cnblogs.com/linybo/p/13322237.html】

引入<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>

我们用到了wx.config({})，wx.ready(function(){}),wx.error(function(){})

1、在页面配置wx.config 这里面有debug,appId（公众号的唯一标识） ，timestamp（生成签名的时间戳），nonceStr（生成签名的随机串），signature（有效的签名），jsApiList（需要配置哪些功能）；

   这些参数需要后端去拿appId和appsecret等等一系列操作去换取然后传给前端，此时前端需要把url传给后端才能拿到对应的config参数；
   
   对于前端来说最重要的是url，因为动不动就会报签名失效；导致失败的原因有：
   
          >首先url是当前界面的的链接，
          
          >>url不能太长，参数最好不能太多，
          
          >>>兼容问题就是微信会在每个调入的路径末尾加入随机生成的值使得单页面（SPA）保持每次刷新，ios不会它会取历史的，导致签名失效所以要借助多页面模式(MPA) 。
          
2、wx.ready会在wx.config配置好后才会执行哦，为了方便在获取config的导致的异步处理，所以视情况而定 如果确保config已经配置好，则无需ready。

3、wx.error会在config配置失败后触发，配合config中debug为true时使用，可以返回res(对于SPA可以在这里更新签名)。
