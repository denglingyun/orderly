<template>
  <div id="app">

    <van-nav-bar
      :title="$store.state.pageTitle"
      :left-arrow="showBackBtn"
      :right-text="$store.state.exit"
      @click-right="onClickRight"
      @click-left="goBack">
    </van-nav-bar>

    <transition name="fade" mode="out-in">
      <router-view class="router"></router-view>
    </transition>
  </div>

</template>
<script>
import Url from '@/common/Url.js';
import wxSdk from "@/common/WxSdk.js";
export default {
    name: 'app',
    data() {
        return {
            showBackBtn: false,
            historyUrl: sessionStorage.historyUrl ? JSON.parse(sessionStorage.historyUrl) : [],
            backFlag: false, // 记录本次路由更新是否为用户的后退操作
            way: 3,
            exit:''
        }
    },
    methods: {
        onClickRight(){
          localStorage.setItem("rank",JSON.stringify([]));
          localStorage.setItem("flag","");
          localStorage.setItem("message","");
          this.$store.commit('setExit', "");
          this.$router.push({name:'Login'});
        },
        //回退
        goBack() {
            this.backFlag = true; // 设置本次页面跳转为后退跳转，让本次跳转不写进historyUrl记录中
            this.$router.push(this.historyUrl[0]);
            this.historyUrl.splice(0, 1);
        },
        wxInit() {
            //根据openId，执行WxSDK的初始化
            let openId = this.$store.state.openId;
            if (openId) {
                console.log('exists openId,init sdk running');
                this.initWxSdk(); //有openID 可以执行wxSDK
                return;
            }
            let code = Url.getQuery("code");
            if (code === null) {
                console.log("not exist openId and code, redirect to  weixin auth !");
                location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxedd06db2e94c5c0b&redirect_uri=${encodeURIComponent(
                    `${location.href}`
                )}&response_type=code&scope=snsapi_userinfo#wechat_redirect`;
            } else {
                // console.log("code:"+code);
                this.$api.getWeixinOpenId(code).then(res => {
                    if (res.data.code == 0) {
                        let openId = (this.$store.state.openId = localStorage.openId = res.data.data);
                        this.initWxSdk();
                    }
                });
            }
        },
        initWxSdk() {
            wxSdk(
                "",
                "",
                ``,
                require("@/assets/img/logo.png")
            ).then(d => {
                this.$store.state.wxSDKReady = true;
                 let message = localStorage.getItem("message");
                if(!!message){
                  let messages = JSON.parse(localStorage.getItem("message"));
                  this.$api.isLogin({id:messages.id}).then(res => {
                    if(res.data.code==200){
                        let d = res.data.data;
                        if(d.is_bind == 1){
                          localStorage.setItem("rank",JSON.stringify(d.rank));
                        }else{
                          localStorage.setItem("rank",JSON.stringify([]));
                        }
                        this.$router.push({name:'Detail'});
                    }else{
                      this.$router.push({name:'Login'});
                    }
                  })
                }else{
                  this.$router.push({name:'Login'});
                }
                // if(!!Url.getQuery("msisdn") && !!Url.getQuery("token") && !!Url.getQuery("uuid")){
                //   this.$api.loginDefault({token:Url.getQuery("token"), uuid:Url.getQuery("uuid")}).then(res => {
                //     if(res.data.code == 0){
                //       localStorage.setItem("accessToken",Url.getQuery("token"));
                //       localStorage.setItem("uuid",Url.getQuery("uuid"));
                //       localStorage.setItem("msisdn",Url.getQuery("msisdn"));
                //       this.$router.push('/card/info');
                //     }
                //   })
                // }else{
                //   let uuid = localStorage.getItem("uuid");
                //   let accessToken = localStorage.getItem("accessToken");
                //   if(!!uuid && !!accessToken){
                //       this.$router.push({name:'/card/info'});
                //   }else{
                //     this.$router.push({name:'Login'});
                //   }
                // }
                
            });
        }
  },
  computed: {

  },
  watch: {
    '$route'(to, from) {
      // 记录每次访问的页面
      if(!this.backFlag) { // 不是用户主动后退导致的路由跳转
        if(from.path != this.historyUrl[0]) { // 避免连续写入两个同样的url
          if(this.historyUrl.length > 0 && from.path == "/") {
            // 如果历史访问地址已经有数据了，而且识别到上一页面为"/"，很有可能是用户刷新导致进入的判断，所以不写入
          } else {
            this.historyUrl = [from.path, ...this.historyUrl]; // 在historyUrl的开头插入一个历史访问地址
          }
        }
      } else {
        this.backFlag = false; // 本次由于是用户主动后退，不进行记录。但还原此标记，使下一次触发路由跳转能够正常判断。
      }
      sessionStorage.historyUrl = JSON.stringify(this.historyUrl); // 页面每次发生跳转，都将历史访问地址写进临时存储中，方便刷新后的读取
      if(this.$route.path == "/"){
        this.showBackBtn = false;
      } else {
        this.showBackBtn = true;
      }
    }
  },
  created() {
    // alert(Url.getQuery("msisdn"),Url.getQuery("token"))
    // if(!localStorage.uuid){
    //   localStorage.uuid = '123456'
    // }
    // if(!localStorage.msisdn){
    //   localStorage.msisdn = '18493410596'
    // }
    // this.wxInit();
    
    let message = localStorage.getItem("message");
    let flag = localStorage.getItem("flag");
    if(!!flag && flag == 1){
      if(!!message){
        let messages = JSON.parse(localStorage.getItem("message"));
        this.$api.isLogin({id:messages.id}).then(res => {
          if(res.data.code==200){
              let d = res.data.data;
              if(d.is_bind == 1){
                localStorage.setItem("rank",JSON.stringify(d.rank));
              }else{
                localStorage.setItem("rank",JSON.stringify([]));
              }
              this.$store.commit('setExit', "退出");
              this.$router.push({name:'Detail'});
          }else{
            this.$router.push({name:'Login'});
            this.$store.commit('setExit', "");
          }
        }).catch(e => {
            this.$router.push({name:'Login'});
            this.$store.commit('setExit', "");
        })
      }else{
        this.$router.push({name:'Login'});
        this.$store.commit('setExit', "");
      }
    }else if(!!flag && flag == 2){
      let tgMess = JSON.parse(localStorage.getItem("tgMess"));
      this.$api.tgLogin(tgMess).then(res => {
        if(res.data.code == 200){
          this.$store.commit('setExit', "退出");
          localStorage.setItem("messScore",JSON.stringify(res.data.data));
          this.$router.push({name:'Message'});
        }else{
          this.$router.push({name:'Login'});
          this.$store.commit('setExit', "");
        }
      }).catch(e => {
          this.$router.push({name:'Login'});
          this.$store.commit('setExit', "");
      })
    }else{
      this.$router.push({name:'Login'});
      this.$store.commit('setExit', "");
    }
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
  /* REM适配，但为了PC端显示正常，页面最高不大于750px */
  max-width: 750px;
  margin: 0 auto;
}
/* 路由切换过渡动画 */
.fade-enter{
    opacity: 0;
}
.fade-enter-active{
    transition: opacity .35s;
}
.fade-leave{
    opacity: 0;
}
.fade-leave-active{
    transition: opacity .35s;
}

/* 以下是页面样式 */
.van-nav-bar__title, .van-nav-bar__arrow{
  font-size: 36px;
  color: #222 !important;
}
.van-nav-bar{
  height: 100px;
  line-height: 100px;
  width: 750px;
  position: fixed;
  top: 0;
  /* background-color: #f4f4f4; */
}
.router{
  padding-top:80px;
}
</style>
