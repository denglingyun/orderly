<template>
  <div>
      <div style="margin-top: 20%">
          <!-- <div style="margin-bottom: 20px">
              <img src="@/assets/img/logo.png" style="width: 100px"/>
          </div> -->
          <van-field v-model="value" placeholder="请输入MSISDN、ICCID系统将自动检索" />
          <van-button type="info" block style="margin-top:20px" @click="submitMsisdn">查询</van-button>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            value:''
        }
    },
    methods:{
        submitMsisdn(){
            this.$api.getCardInfo({cardNumber:this.value}).then(res => {
            if(res.data.code == 0){
                if(!!res.data.data && res.data.data.length != 0){
                    localStorage.msisdn = this.value;
                    this.$router.push('/card/info');
                }else{
                    this.$dialog.alert({message: '未查询到卡号，请重新输入'})
                }
            }
            
        })
        }
    },
    created(){
        this.$store.commit('setPageTitle', "查询卡号");
    }

}
</script>

<style lang="scss" scoped>
p{
    font-size: 30px;
}
.van-cell{
    font-size:0.5rem;
}


</style>
