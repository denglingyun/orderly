<template>
    <div class="info">
        <div style="width:100%;overflow: hidden;margin-top:20px;">
            <div class="titleLeft"></div>
            <div class="titleRight">考试成绩查询结果</div>
        </div>

        <div>
            <van-row>
                <van-col span="12">
                    <div class="colName">姓名</div>
                    <div class="colAmount">{{arrs.name}}</div>
                </van-col>
                <van-col span="12">
                    <div class="colName">笔试成绩</div>
                    <div class="colAmount">{{arrs.total_score}}</div>
                </van-col>
            </van-row>
        </div>

        <!-- <div class="scoreSearch" @click="searchScore">查询不带成绩？请手动输入</div> -->

        <div style="width:100%;overflow: hidden;" class="amount">
            <div class="titleLeft"></div>
            <div class="titleRight">笔试成绩</div>
        </div>

        <div class="amount1">
            <van-grid :column-num="2" >
                <van-grid-item text="考试科目" />
                <van-grid-item class="color1" :text="arrs.kskm" />
                <van-grid-item text="准考证号" />
                <van-grid-item class="color1" :text="`${arrs.zkzh}`" />
                <van-grid-item text="综合知识" />
                <van-grid-item class="color1" :text="arrs.zhzs" />
                <van-grid-item text="学科知识" />
                <van-grid-item class="color1" :text="arrs.xkzs" />
                <van-grid-item text="岗位代码" />
                <van-grid-item class="color1" :text="arrs.job_num" />
                <van-grid-item text="岗位名称" />
                <van-grid-item class="color1" :text="arrs.job_name" />
                <van-grid-item text="岗位名称入围最低分" />
                <van-grid-item class="color1" :text="arrs.lowest_score == '' ? '未查询到信息': arrs.lowest_score" />
            </van-grid>
        </div>

        <div style="width:100%;overflow: hidden;" class="amount">
            <div class="titleLeft"></div>
            <div class="titleRight">同岗位分数及目前排名</div>
            <div class="titleRight" style="margin-top:15px;">
                <a href="http://www.jxpxt.net/jxpxt/vip_doc/18070943.html" style="color:#ee0a24">点击加入面试备考群(最新面试公告、笔试资料分享)</a>
            </div>
            
        </div>

        <div class="amount1">
            <van-grid :column-num="3">
                <van-grid-item text="姓名" />
                <van-grid-item text="分数"/>
                <van-grid-item text="排名" />
            </van-grid>
            <van-grid :column-num="3" v-for="(item, i) in arrs.ranks" :key="i">
                <van-grid-item :text="formatName(item.name,item.id_no)" :class="[ formatName(item.name,item.id_no).indexOf('*')!= -1?'unactive':'active']"/>
                <van-grid-item :text="item.total_score" />
                <van-grid-item :text="item.rank" />
            </van-grid>
            <van-divider
            :style="{ color: '#33CC99', borderColor: '#33CC99', padding: '10px 8px 0' }">
                培训通祝您考试成功！
            </van-divider>
        </div>

       
    </div>
</template>

<script>
import Url from '@/common/Url.js';
export default {
    name:'Message',
    data() {
        return {
            search:{
                show:false,
                form:{}
            },
            showRank:false,
            loading:false,
            mobile:{
                phone:'',
                code:'',
                job_num:''
            },
            message:{},
            rank:[],
            countDown:60,
            smsTitle:'发送验证码',
            disabled:false,
            show:false,
            arrs:{
                name:'张三',
                amount:163,
                form:{
                    number:'19999999',
                    amount1:'123',
                    amount2:'133',
                    amount3:'143',
                    address:'西湖区XXX小学语文老师'
                },
                sort:[{
                    name:"李四",
                    total_score:"156",
                    key:1
                },{
                    name:"666",
                    total_score:"146",
                    key:2
                }],
            },
            cardStatus:{
                type:'success',
                label:'正常'
            }
        }
    },
    methods: {
        formatName(name, id) {
            let newStr;
            if(id == this.arrs.id_no)return name;
            
            if (name.length === 2) {
                newStr = name.substr(0, 1) + '*';
            } else if (name.length > 2) {
                newStr = name.substr(0, 1) + "**";
            } else {
                newStr = name;
            }
            return newStr;
        },
        searchScore(){
            this.search.show = true
        },
        showPopup(){
            this.show = true
            this.loading = false
        },
        onScoreSubmit(){
            this.search.show = false
        },
        onSubmit(){
            this.loading = true
            this.$api.getRank({phone_num:this.mobile.phone,code:this.mobile.code,id:this.message.id}).then(res => {
                if(res.data.code == 200){
                    this.$toast.success('查询成功');
                    this.show = false
                    this.showRank = true
                    this.arrs.sort = res.data.data
                }
                this.loading = false
            })
        },
   
        clock(num){
            let b = setInterval( _ => {
                if(num > 1){
                    num--;
                    this.smsTitle = num + 's'
                }else{
                    clearInterval(b);
                    this.disabled = false;
                    this.smsTitle = '获取验证码'
                }
            }, 1000);
        },
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
    },
    created() {
        this.$store.commit('setPageTitle', "查询结果");
        this.arrs = JSON.parse(localStorage.messScore)
    }
}
</script>

<style lang="scss" scoped>
$actionHeight: 200px; // 底部功能菜单的高度
.info{
    font-size: 28px;width: 100%;
}
.titleLeft{
    float: left;height: 43px;width: 15px;background: #33CC99;margin: 0 20px 0 35px;
}
.titleRight{
    float: left;font-weight: 600;
}
.colName{
    color: #B7B7B7;margin: 55px auto 35px auto;
}
.colAmount{
    color: #33CC99;font-size: 45px;font-weight: 600;
}
.amount{
    margin-top: 60px;
}
.amount1{
    margin: 60px auto;width: 95%;
}
.scoreSearch{
    color: #33CC99;font-size: 15px;font-weight: 600;margin-top:30px;
}

// .unactive .van-grid-item__text{
//     color: red !important;
// }


</style>