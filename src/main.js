import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import axios from 'axios'
import api from '@/api';
import '@/assets/css/style.css';

import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
/**
 * vant 组件相关导入
 */
var Vant = window.vant
Vue.use(Vant);
import { Swipe, SwipeItem, Toast} from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Toast);
import 'amfe-flexible/index.js';
// function setRem () {
//     let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
//     let htmlDom = document.getElementsByTagName('html')[0];
//     htmlDom.style.fontSize = (htmlWidth / 10) > 75 ? "75px" : htmlWidth / 10 + 'px'; // 设置1rem最大不超过75px
// }
// setRem();
// window.onresize = function () {
//     setRem();
// }

Vue.prototype.$api=api;
Vue.prototype.$axios=axios;
Vue.config.productionTip = false
axios.defaults.withCredentials = true;

Vue.prototype.$returnInfo = (arr, val) => {
	let tabs =  arr.find(it => it.value == val)
	if(!tabs) tabs = store.state.dictionaries.info;
	return tabs
},

Date.prototype.format = function(fmt)   {
    var o = {
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

Vue.prototype.$dateAdd = (number,date) => {  
    let year = date.getFullYear()
    let month = date.getMonth()+1
    let newMonth = (month + number) % 12
    let newYear = ~~((~~month + ~~number) / 12)
    let newDay = 30
    if(newMonth == 0) newMonth = 12;
    if((year+newYear) % 4 === 0 && newMonth == 2) newMonth = 13;
    switch (newMonth) {
        case 1:case 3:case 5:case 7:case 8:case 10:case 12:
            newDay = 31
            break;
        case 2:
            newDay = 28
            break;
        case 13:
            newMonth = 2
            newDay = 29
            break;
        default:
            break;
    }
    return `${year+newYear}-${newMonth}-${newDay}`
}
Vue.prototype.$claerElement = obj => {
    for (let key in obj) {
        obj[key] = ""
    }
    return obj;
}
 /**
 * 创建账户充值订单
 * @param amount
 */
Vue.prototype.$createAccChargeOrder = amount => {
    let params = {amount:amount,payWay:'weixin-official'};
    this.$api.createAccChargeOrder(params).then(res => {
        if(res.data.code ==0){
            // this.chargeOrderId = res.data.data.orderId
            this.$createAccChargeOrderPay(res.data.data.orderId);
        }
    })
}

 /**
 * 充值订单
 * @param chargeOrderId
 */
Vue.prototype.$createAccChargeOrderPay = chargeOrderId =>{
    Toast.loading({duration: 0,mask: true, forbidClick: true });
    let params = {orderId:this.chargeOrderId, payWay:'weixin-official',openId:localStorage.openId};
    this.$api.createOrderPay(params).then(res => {
        Toast.clear();
        let d = res.data;
        if (d.code !== 0) {
            Toast(d.msg);
            return;
        }
        this.$payFn(d);
    });
}

 /**
 * 微信调起支付
 * @param json d
 */
Vue.prototype.$payFn = d => {
    if (!this.$store.state.wxSDKReady) {
        setTimeout(payFn, 1000);
        return;
    }
    wx.chooseWXPay({
        timestamp: d.data.timestamp,
        nonceStr:  d.data.nonceStr,
        package:   d.data.packAge,
        signType: "MD5",
        paySign:   d.data.sign,
        success: res => {
              this.$checkHasPay();
        }
    });
}

 /**
 * 微信调起支付
 * @param json d
 */
Vue.prototype.$checkHasPay = () => {
    let that = this;
    let a = setInterval(() => {
        let params = {chargeOrderId:this.chargeOrderId};
        this.$api.queryHasPayed(params).then(res=>{
            //已经支付
            if(res.data.code==0){
                clearInterval(a);
                this.$createRefueingOrder();
            }
        });
    },1000);
    this.timer = a;
}

Vue.prototype.$createRefueingOrder = () =>{
    let params ={
        msisdns:[this.arrs.msisdn],
        packId:this.arrs.packId,
        period:this.arrs.period
    }
    this.$api.addRefueing(params).then(res => {
        if(res.data.code == 0){
            localStorage.refueingOrderId = res.data.data;
            localStorage.removeItem('refueing');
            this.$router.push({name:''});
        }
    })
}

let that = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


export default that;