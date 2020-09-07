
const dictionaries = {
    state: {
        info:{label:'未知',value:1, type:'default'},
        cardStatus:[
            {label:'未开卡',value:0,type:'primary'},
            {label: '已购买',value: 1,type:'success'},
            {label: '沉默期',value: 2,type:'warning'},
            {label: '测试期',value: 3,type:'warning'},
            {label: '已停机',value: 4,type:'danger'},
            {label: '已断网',value: 5,type:'primary'},
            {label: '休眠',value: 6,type:'info'},
            {label: '待激活',value: 8,type:'warning'},
            {label: '正常使用',value: 9,type:'success'},
            {label: '期满,关停',value: 20,type:'info'},
            {label: '已回收状态',value: 20,type:'danger'},
            {label: '未知状态',value: 80,type:'info'},
            {label: '已删除',value: 80,type:'danger'}
        ],
    },
    
    mutations: {
        setCondition:(state,data)=>{
            state.condition = data;
        },
    },
    actions: {

    }

}
export default dictionaries