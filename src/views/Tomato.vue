<template>
    <my-page title="番茄钟" :page="page">
        <div class="common-container container">
            <div class="tomato-box">
                <div class="col-md-6 col-timer">
                    <div class="tip" v-if="showTip">夜深了，注意休息</div>
                    <div class="label label-success" v-if="isRuning && isWorkTime">工作</div>
                    <div class="label label-warning" v-if="isRuning && !isWorkTime">休息</div>
                    <div class="tt-countdown">{{timeStr}}</div>
                    <!-- <div class="input-minute input-group">
                        <input class="form-control" placeholder="工作时间" v-model="formData.minute">
                        <div class="input-group-addon">分钟</div>
                    </div> -->
                    
                    <br>
                    <ui-raised-button class="btn" primary label="工作" @click="startCount" v-if="!isRuning && !isWorkTime" />
                    <ui-raised-button class="btn" primary label="休息 5 分钟" @click="startRest(5)" v-if="!isRuning && isWorkTime" />
                    <ui-raised-button class="btn" secondary label="休息 20 分钟" @click="startRest(20)" v-if="!isRuning && isWorkTime" />
                    <!-- <button class="btn-start btn btn-success" type="button" @click="startCount">开始计时</button> -->
                    <!-- <button class="btn" type="button" @click="reset">重置</button> -->
                    <ui-raised-button class="btn" label="重置" @click="reset" />
                </div>
                <div class="col-md-6">
                </div>
            </div>
        </div>
        <!-- 声音提醒 -->
        <audio id="tip">
            <source src="/static/res/tip.mp3">
            <source src="WhiteChristmas.ogg">
        </audio>
        <ui-drawer class="setting-box" right :open="settingVisible" :docked="false" @close="toggleSetting()">
            <ui-appbar title="设置">
                <ui-icon-button icon="close" slot="left" @click="toggleSetting" />
                <ui-icon-button icon="check" slot="right" @click="finish" />
            </ui-appbar>
            <div class="body">
                <ui-text-field v-model="formData.minute" label="工作时间（分钟）" />
            </div>
        </ui-drawer>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                showTip: false,
                timeStr: '00:00',
                second: 0,
                formData: {
                    minute: 25,
                    text: '' // 用户输入的待办事项
                },
                timerId: null,
                afterWork: false,
                isWorkTime: false, // 是否工作时间
                settingVisible: false,
                isRuning: false,
                progress: 0,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'settings',
                            click: this.toggleSetting,
                            title: '设置'
                        },
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/864d1ee065c311e9a7018922ed87a412',
                            target: '_blank',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
//            this.init()
            if (this.$route.query.start) {
                this.startCount()
            }
            this.formData.minute = this.$storage.get('workTime', 25)

            this.isRuning = this.$storage.get('isRuning', false)
            console.log('this.isRuning', this.isRuning)
            if (this.isRuning) {
                this.startTime = this.$storage.get('startTime', 0)
                this.afterWork = this.$storage.get('afterWork', false)
                this.totalTime = this.$storage.get('totalTime', 0)
                this.isWorkTime = this.$storage.get('isWorkTime', false)
                console.log('正字允许')
                this.startTimer()
            }
        },
        destroyed() {
            this.timerId && clearInterval(this.timerId)
        },
        methods: {
            reset() {
                this.timerId && clearInterval(this.timerId)
                this.afterWork = false
                this.isWorkTime = false
                this.isRuning = false
                this.progress = 0
                this.timeStr = '00:00'
                this.$storage.set('isRuning', false)
            },
            toggleSetting() {
                this.settingVisible = !this.settingVisible
            },
            finish() {
                this.$storage.set('workTime', this.formData.minute)
                this.settingVisible = false
            },
            // 点击开始计时按钮事件
            startCount() {
                // 如果输入的分钟不正确，默认25分钟
                if (isNaN(this.formData.minute) || this.formData.minute <= 0 ||
                        this.formData.minute > 24 * 60) {
                    this.formData.minute = 25
                }
                this.isWorkTime = true
                this.$storage.set('isWorkTime', true)
                this.countDown(this.formData.minute * 60)
                // this.countDown(1 * 60)
            },
            startRest(minute) {
                this.isWorkTime = false
                this.$storage.set('isWorkTime', false)
                this.countDown(minute * 60)
            },
            // 初始化
            init() {
                // 温馨提示
                let date = new Date()
                if (date.getHours() > 23 || date.getHours() < 4) {
                    this.showTip = true
                }
            },
            tip() {
                document.getElementById('tip').play()
            },
            startTimer() {
                let countTime = () => {
                    // this.time--
                    this.time = this.totalTime - (new Date().getTime() - this.startTime) / 1000
                    if (this.time <= 0) {
                        if (this.isWorkTime) {
                            // this.time = 5 * 60
                            this.afterWork = true
                        } else {
                            // this.time = workTime + 1
                        }
                        // this.isWorkTime = !this.isWorkTime
                        
                        this.isRuning = false
                        this.$storage.set('isRuning', false)
                        this.tip()
                        clearInterval(this.timerId)
                        // alert('时间到了')
                        this.$message({
                            type: 'info',
                            text: '时间到了'
                        })
                        return
                    }
    
                    let minute = Math.floor(this.time / 60)
                    let second = Math.floor(this.time % 60)
                    minute = (minute < 10) ? ('0' + minute) : minute
                    second = (second < 10) ? ('0' + second) : second
    
                    this.timeStr = minute + ':' + second
                    document.title = this.timeStr
                }
                countTime()
                this.timerId = setInterval(countTime, 1000)
            },
            /**
             * 倒计时
             * @param time 时间（秒）
             */
            countDown(time) {
                clearInterval(this.timerId)
                this.startTime = new Date().getTime()
                this.$storage.set('startTime', this.startTime)
                this.$storage.set('isRuning', true)
                this.$storage.set('afterWork', true)
                this.isRuning = true
                this.afterWork = false
                let workTime = time
                this.totalTime = time
                this.$storage.set('totalTime', time)
                // this.time = time + 1
                this.startTimer()
            }
        }
    }
</script>

<style lang="scss" scoped>
.setting-box {
    width: 320px;
    max-width: 100%;
    .body {
        padding: 16px;
    }
}
.container {
    width: 400px;
}
.btn {
    margin-right: 8px;
}
.label {
    display: inline;
    padding: .2em .6em .3em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25em;
}
.label-warning {
    background-color: #f7a54a;
}
.label-success {
    background-color: #5cb85c;
}
</style>
