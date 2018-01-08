<template>
    <ui-page name="tomato" title="番茄工作法">
        <div class="row">
            <div class="col-md-6 col-timer">
                <div class="tip" v-if="showTip">夜深了，注意休息</div>
                <div class="label label-success" v-if="isWorkTime">工作时间</div>
                <div class="label label-warning" v-if="!isWorkTime">休息时间</div>
                <div class="tt-countdown">{{timeStr}}</div>
                <div class="input-minute input-group">
                    <input class="form-control" placeholder="工作时间" v-model="formData.minute">
                    <div class="input-group-addon">分钟</div>
                </div>
                <button class="btn-start btn btn-success" type="button" @click="startCount">开始计时</button>
            </div>
            <div class="col-md-6">
            </div>
        </div>
        <!-- 声音提醒 -->
        <audio id="tip">
            <source src="/static/res/tip.mp3">
            <source src="WhiteChristmas.ogg">
        </audio>
    </ui-page>
</template>

<script>
    export default {
        data () {
            return {
                showTip: false,
                timeStr: '00:00:00',
                second: 0,
                formData: {
                    minute: 25,
                    text: '' // 用户输入的待办事项
                },
                timerId: null,
                isWorkTime: false // 是否工作时间
            }
        },
        mounted() {
//            this.init()
        },
        methods: {
            // 点击开始计时按钮事件
            startCount() {
                // 如果输入的分钟不正确，默认25分钟
                if (isNaN(this.formData.minute) || this.formData.minute <= 0 ||
                        this.formData.minute > 24 * 60) {
                    this.formData.minute = 25
                }

                this.isWorkTime = true
                this.countDown(this.formData.minute * 60)
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
            /**
             * 倒计时
             * @param time 时间（秒）
             */
            countDown(time) {
                clearInterval(this.timerId)

                let workTime = time
                this.time = time + 1
    
                let countTime = () => {
                    this.time--
                    if (this.time === 0) {
                        if (this.isWorkTime) {
                            this.time = 5 * 60
                        } else {
                            this.time = workTime + 1
                        }
                        this.isWorkTime = !this.isWorkTime
    
                        this.tip()
                    }
    
                    let hour = Math.floor(this.time / 3600)
                    let minute = Math.floor(this.time / 60)
                    let second = Math.floor(this.time % 60)
                    hour = (hour < 10) ? ('0' + hour) : hour
                    minute = (minute < 10) ? ('0' + minute) : minute
                    second = (second < 10) ? ('0' + second) : second
    
                    this.timeStr = hour + ':' + minute + ':' + second
                }
                countTime()
                this.timerId = setInterval(countTime, 1000)
            }
        }
    }
</script>

<style scoped>
</style>
