import {main} from "../main";
export default {
    //移动端API接口-> 升级套餐包查询
    getToUpPack(params){
        return  main.get('/client/mobile/toUpPack/get/package',{params:params})
    },
    //移动端API接口 -> 升级套餐订单实际扣款数
    getAmountUpPack(params){
        return  main.get('/client/mobile/toUpPack/getAmount',{params:params})
    },
    //移动端API接口 -> 升级套餐订单
    addToUpPack(params){
        return  main.put('/client/mobile/toUpPack/add', params)
    },
}