import {main} from "../main";
export default {
    wxSDK(params) {
        return main.get('/client/mobile/weixin/sign/get',params);
    },
    //通过code获取openId
    getWeixinOpenId(code) {
        return main.get(`/client/mobile/weixin/openId/get/${code}`);
    },
    createOrderPay(params){
        return main.post('/pay/weixin/order',params  );
    }
}