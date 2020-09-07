import axios from "axios";
import Code from '@/api/utils/code'
import {Dialog, Toast} from 'vant';
import _this  from '../main'


const main = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10000000000
});

main.interceptors.request.use(config => {
    // let uuid = localStorage.getItem("uuid");
    // let accessToken = localStorage.getItem("accessToken");
    // config.headers['uuid'] = uuid;
    // config.headers['accessToken'] = accessToken;
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
});


/**
 * @author qun.xu
 * @desc   response登出。
 */
main.interceptors.response.use(
    res => {
        if(res.data.code==200){
            return res;
        }else{
            if(res.data.code == Code.UNAUTHEN || res.data.code == Code.UNLOGIN){
                Dialog.alert({
                    title: '登陆提醒',
                    message: '登陆超时或未登陆，重新登录！'
                }).then(() => {
                    // _this.$router.push({name:'Login'});
                })
            }else{
                Toast.fail(res.data.message);
                return res;
            }
            return res;
        }
    }
)

export {main};