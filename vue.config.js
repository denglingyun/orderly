module.exports = {
    devServer: {
        port: 8031,
        https: false,
        open: false,
        disableHostCheck:true
    },
    configureWebpack: {
        externals: {
          'vue': 'Vue',
          "vant": "Vant",
        },
        
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 75,
                        selectorBlackList: ['.weui', '.mu', '.van-button','.van-toast','.van-dialog','.van-field', 'van-stepper'],
                        propList: ['*']
                    })
                ]
            }
        }
    }
};