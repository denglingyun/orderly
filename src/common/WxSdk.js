import wx from "weixin-js-sdk";
import api from '@/api';
export default function (title, desc, url, img) {
    return api.wxSDK({
        params: {
            url: location.href.split("#")[0]
        }
    }).then(d => {
        console.log('@@@@@  author qun.xu  @date 2018-01-12 @@@@');
        console.log('loading wxsdk.js...');
        d = d.data;
        console.log(JSON.stringify(d));
        wx.config({
            debug: false,                // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: d.data.appId,         // 必填，公众号的唯一标识
            timestamp: d.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: d.data.nonceStr,  // 必填，生成签名的随机串
            signature: d.data.signature, // 必填，签名，见附录1
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage" ,"chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        return new Promise(resolve => {
            wx.ready(function () {
                wx.onMenuShareTimeline({
                    title: title, // 分享标题
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: img === undefined ? '' : `${location.origin}${img}`, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    }
                });
                wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: desc, // 分享描述
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: img === undefined ? '' : `${location.origin}${img}`, // 分享图标
                    type: "link", // 分享类型,music、video或link，不填默认为link
                    dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                resolve();
            });
        })
    });
}