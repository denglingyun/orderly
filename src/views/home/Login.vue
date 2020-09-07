<template>
    <div>
        <div class="login">
            <!-- <div style="margin-bottom: 40px">
                <img src="@/assets/img/logo.png" style="width: 100px"/>
            </div> -->


            <van-form @submit="onSubmit" >
                <van-field
                        v-model="names"
                        label="姓名"
                        placeholder="请输入姓名"
                        style="margin-top:15px"
                        :rules="[{ required: true, message: '请填写姓名' }]"
                />
                <van-field
                        v-model="id"
                        
                        label="身份证号"
                        placeholder="请输入身份证号"
                        style="margin-top:15px"
                        :rules="[{ required: true, message: '请填写身份证号' }]"
                />

            
                <div style="margin: 16px;">
                    <van-button block  :loading="loading" class="sub-van" native-type="submit" loading-text="正在提交...">提 交</van-button>
                </div>
                    
             </van-form>

                    
                     <!-- <van-field
                                v-model="names"
                                label="手机号/账户"
                                placeholder="请输入手机号/账户"
                                style="margin-top:15px"
                                :rules="[{ required: true, message: '请填写手机号/账户' }]"
                        />
                        <van-field
                                v-model="password"
                                label="密码"
                                placeholder="请输入密码"
                                type="password"
                                style="margin-top:15px"
                                :rules="[{ required: true, message: '请填写密码' }]"
                        />

                        <van-field
                            v-model.number.trim="code"
                            center
                            clearable
                            label="验证码"
                            placeholder="请输入验证码"
                            :rules="[{ required: true, message: '请填写验证码' }]"
                            >
                            <template #button>
                                <div @click="getImg" >
                                    <van-loading v-show="imgLoding" color="#33CC99" /> 
                                    <img v-show="!imgLoding" :src="img" alt="" >
                                </div>
                                
                            </template>
                        </van-field>


                        <van-field
                                v-model="password"
                            
                                name="准考证号"
                                label="准考证号"
                                placeholder="请输入准考证号"
                            :rules="[{ required: true, message: '请填写准考证号' }]"
                        />
                        <van-field
                            v-model="sms"
                            center
                            clearable
                            label="短信验证码"
                            placeholder="请输入短信验证码"
                            >
                            <template #button>
                                <van-button size="small" @click="setTime" :disabled="disabled" class="sub-van">{{smsTitle}}</van-button>
                            </template>
                        </van-field> -->
            <!-- <van-tabs type="card" color="#33CC99" style="padding-top:35px;">
                <van-tab title="国编查询">
                    <van-form @submit="onSubmit" style="padding-top:30px;">
                        <van-field
                                v-model="names"
                                label="姓名"
                                placeholder="请输入姓名"
                                style="margin-top:15px"
                                :rules="[{ required: true, message: '请填写姓名' }]"
                        />
                        <van-field
                                v-model="id"
                                
                                label="身份证号"
                                placeholder="请输入身份证号"
                                style="margin-top:15px"
                                :rules="[{ required: true, message: '请填写身份证号' }]"
                        />

                       
                        <div style="margin: 16px;">
                           
                            <van-button block  :loading="loading" class="sub-van" native-type="submit" loading-text="正在查询...">查询分数及排名</van-button>
                        </div>
                    
                    </van-form>

                </van-tab>
                <van-tab title="特岗查询">
                    
                    <van-form @submit="onSubmit2" style="padding-top:30px;">
                        <van-field
                                label-width="110px"
                                v-model="tg.loginName"
                                label="身份证/手机号 "
                                placeholder="请输入身份证号或手机号"
                                style="margin-top:15px"
                                :rules="[{ required: true, message: '请输入身份证号或手机号' }]"
                        />
                        <van-field
                                label-width="110px"
                                v-model="tg.passWord"
                                label="密码"
                                placeholder="请输入密码"
                                style="margin-top:15px"
                                :rules="[{ required: true, message: '请填写密码' }]"
                        />
                        <div style="margin: 16px;">
                            <van-button block  :loading="loading" class="sub-van" native-type="submit" loading-text="正在查询...">查询分数及排名</van-button>
                        </div>
                    
                    </van-form>
                </van-tab>
            </van-tabs> -->
            
            <van-divider
            :style="{ color: '#33CC99', borderColor: '#33CC99', padding: '10px 20px' }">
                说明：本系统与人事考试中心系统分数同步
            </van-divider>
           
        </div>
    </div>

</template>

<script>
    import { Toast} from 'vant';
    import axios from "axios";
    export default {
        name: 'Login',
        data() {
            return {
                tg:{
                    loginName:'',
                    passWord:''
                },
                imgLoding:false,
                key:'',
                code:'',
                img:'',
                names:'',
                id:'',
                loading:false,
                password:'',
                sms:'',
                countDown:60,
                smsTitle:'发送验证码',
                disabled:false
            }
        },
        methods:{
            setTime(val) {
                if (this.countDown == 0) {
                    this.disabled = false
                    this.smsTitle = "发送验证码";
                    this.countDown = 60;
                    return;
                } else {
                    this.disabled = true
                    this.smsTitle = `(${this.countDown} s)`;
                    this.countDown--;
                }
                setTimeout(_ => {
                    this.setTime(val)
                }, 1000)
            },
            onSubmit2(){
                this.loading = true
                // let params = {name: this.names,id:this.id}
                // if(!this.account||!this.password){
                //     Toast.fail('账户名或者密码不能为空!');
                //     return;
                // }
                this.$api.tgLogin(this.tg).then(res=>{
                    if(res.data.code==200){
                        let d = res.data.data;
                        // localStorage.setItem("accessToken",d.token.accessToken);
                        localStorage.setItem("flag",'2');
                        localStorage.setItem("messScore",JSON.stringify(res.data.data));
                        localStorage.setItem("tgMess",JSON.stringify(this.tg));
                        this.$router.push({name:'Message'});
                        this.$store.commit('setExit', "退出");
                    }
                    this.loading = false
                }).catch(e => {
                    Toast.fail("服务器异常，请稍后尝试")
                    this.loading = false
                })
            },
            onSubmit(values) {
                this.loading = true
                let params = {name: this.names,id:this.id}
                // if(!this.account||!this.password){
                //     Toast.fail('账户名或者密码不能为空!');
                //     return;
                // }
                this.$api.getScore(params).then(res=>{
                    if(res.data.code==200){
                        let d = res.data.data;
                        // localStorage.setItem("accessToken",d.token.accessToken);
                        // localStorage.setItem("flag",'1');
                        localStorage.setItem("orderlyscore",JSON.stringify(d));
                        localStorage.setItem("orderlyMessage",JSON.stringify({id:this.id,name:this.names}));
                        this.$api.isLogin({id:this.id}).then(res => {
                            if(res.data.code==200){
                                let d = res.data.data;
                                if(d.is_bind == 1){
                                    localStorage.setItem("orderlyRank",JSON.stringify(d.rank));
                                }else{
                                    localStorage.setItem("orderlyRank",JSON.stringify([]));
                                }
                            }
                            this.$router.push({name:'Detail'});
                            this.$store.commit('setExit', "退出");
                        })
                        
                    }
                    this.loading = false
                }).catch(e => {
                    Toast.fail("服务器异常，请稍后尝试")
                    this.loading = false
                })
            },
            getImg(){
                this.imgLoding = true
                axios.get('https://sydw.jxpta.com/api/securityCodeBase64', {
                    params:{}
                })
                //成功返回
                .then(res => {
                    let json = res.data
                    for (var key in json) {
                        this.img = json[key]
                        this.key = key
                    }
                    this.imgLoding = false
                })
                //失败返回
                .catch(error => {
                    Toast.fail('获取失败请点击图片刷新!');
                    console.log(error);
                    this.imgLoding = false
                })
            },
        },
        created(){
            this.$store.commit('setPageTitle', "查分排名");
            // this.getImg()
            
        }
    }
</script>

<style lang="scss">
    .login{
        width:100%;
        height:100%;
        background-size:cover;
        position:fixed;
        z-index:-10;}
    .welcome{
        width:100%;
        margin:25% 0;
    }
    .welcome img{
        width:100%;
    }
    .login-inp{
        margin:0 30px 15px 30px;
        border:1px solid #fff;
        border-radius:25px;
    }
    .login-inp label{
        width:4em;
        text-align:center;
        display:inline-block;
        color:#fff;
    }
    .login-inp input{
        line-height:40px;
        color:#fff;
        background-color:transparent;
        border:none;
        outline: none;
    }
    .login-inp a{
        display:block;
        width:100%;
        text-align:center;
        line-height:40px;
        color:#fff;
        font-size:16px;
        letter-spacing:5px;
    }
    .login-txt{
        text-align:center;
        color:#fff;
    }
    .login-txt a{
        color:#fff;
        padding:0 5px;
    }
    .system-title{
        font-family: 楷体;
        font-weight: bold;
        font-size: 25px;
    }
    
</style>
