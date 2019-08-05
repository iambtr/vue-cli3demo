const path = require('path');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: ''
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('$img', resolve('src/assets/img'))
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*']
                    })
                ]
            },
            less: {
                modifyVars: {
                    'progress-background-color':'#D9952B',
                    'text-color': '#333',
                    'tabbar-item-active-color': '#666',
                    // 'button-primary-height': '40px',
                    // 'button-primary-line-height': '38px',
                    // 'button-primary-font-size': '14px',
                    'button-primary-color': '#fff',
                    'button-primary-background-color': '#FF8239',
                    'button-primary-border-color': '#FF8239',
                    // 'button-default-height': '40px',
                    // 'button-default-line-height': '38px',
                    // 'button-default-font-size': '16px',
                    'button-default-color': '#fff',
                    'button-default-background-color': '#A1AAB8',
                    'button-default-border-color': '#A1AAB8',
                }
            }
        }
    }
}
