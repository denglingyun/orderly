<template>
    <div>
        <ul class="menu">
            <li>
                <button @click="$router.push('/cycle')">续周期</button>
                <span>延长使用时间，流量不增加</span>
            </li>
            <li>
                <button @click="refueing()">充值加油包</button>
                <span>流量增加，使用时间不变。<br>如发现流量不够，推荐使用加油包。</span>
            </li>
            <li>
                <button @click="up">升级套餐</button>
                <span>已使用流量大于80%（不支持升级套餐），<br>请先充加油包，再升级套餐；升级套餐次月生效。</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { Toast } from "vant";
export default {
    data() {
        return {
            arrs:{}
        }
    },
    methods: {
        refueing(){
            if(!this.arrs.poolId){
                this.$router.push({name:'refueingCharge'})
            }else{
                Toast("在流量池里的卡不允许充值加油包");
            }
        },
        up(){
            if(!this.arrs.poolId){
                this.$router.push({name:'upDetail'})
            }else{
                Toast("在流量池里的卡不允许升级套餐");
            }
        }
    },
    created() {
        this.$store.commit('setPageTitle', "充值续费")
        if(!localStorage.message){
            this.$api.getCardInfo({cardNumber:localStorage.msisdn}).then(res => {
                if(res.data.code == 0){
                    this.arrs = Object.assign({},res.data.data)
                    localStorage.message = JSON.stringify(this.arrs)
                }
            })
        }else{
            this.arrs = JSON.parse(localStorage.message)
        }
    }
}
</script>

<style lang="scss" scoped>
.menu{
    li{
        margin: 35px auto;
        display: inline-block;
        width: 690px;
        height: 230px;
        border: 1Px solid #e5e5e7;
        button{
            border: none;
            border-radius: 10px;
            background-color: #209df2;
            color: #fff;
            font-size: 32px;
            display: block;
            margin: 40px auto 20px;
            width: 80%;
            height: 75px;
            transition: all 0.15s;
        }
        button:hover{
            background-color: #1a7fef;
        }
        span{
            display: block;
            font-size: 24px;
            color: #737373;
        }
    }
}
</style>