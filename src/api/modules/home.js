import {main} from "../main";
export default {
    getScore(params){
        return  main.get('/getScore',{params:params})
    },
    getCodeSend(params){
        return  main.get('/sendSms',{params:params})
    },
    getRank(params){
        return  main.get('/getRank',{params:params})
    },

    isLogin(params){
        return  main.get('/isLogin',{params:params})
    },

    tgLogin(params){
        return  main.get('/tg_login',{params:params})
    },

    loginDefault(params){
        return  main.get('/client/mobile/in/login',{params:params})
    },
    weixinLogin(params){
        return  main.get('/client/mobile/weixin/weixinLogin',{params:params})
    },
    createAccChargeOrder(params){
        return  main.post('/client/account/createOrder', params)
    },
    queryHasPayed(params){
        return  main.get('/client/account/charge/status', {params:params})
    }
}