import {main} from "../main";
export default {
    //物联网卡-> 根据卡号模糊查询卡信息
    getCardInfo(params){
        return  main.get('/client/mobile/card/info',{params:params})
    },
    //移动端API接口-> 续费查询卡套餐详情
    getRenewInfo(params){
        return  main.get('/client/mobile/renew/info',{params:params})
    },
    //移动端API接口 -> 添加续费订单
    addRenew(params){
        return  main.put('/client/mobile/renew/add',params)
    },

}