import {main} from "../main";
export default {
    //物联网卡-> 加油包查询
    getRefueingInfo(params){
        return  main.get('/client/mobile/refueing/get/package',{params:params})
    },
    //物联网卡 -> 加油包订单
    addRefueing(params){
        return  main.put('/client/mobile/refueing/add', params)
    }
}