<template>
  <div>
    <Top></Top>
    <div id="userInfo" class="lf_userInfo_con mg_t">
      <img :src="lf_info.headPortrait" alt="">
      <p><b>昵称：</b><input ref="inputInfo1" type="text" v-model="lf_info.nickName" readonly="true"></p>
      <p><b>所在班级：</b><input ref="inputInfo2" type="text" v-model="lf_info.myClass" readonly="true"></p>
      <p><b>联系电话：</b><input ref="inputInfo3" type="text" v-model.number="lf_info.phoneNumber" readonly="true"></p>
      <p><b>微信号：</b><input ref="inputInfo4" type="text" v-model="lf_info.weixinNumber" readonly="true"></p>
      <p><b>密码：</b><input ref="inputInfo5" type="password" v-model="lf_info.password" readonly="true"></p>
      <button @click="toChange(false)">更改</button>
      <button @click="updateInfo">保存</button>
    </div>
  </div>

</template>

<script>
  import Top from '../base/Top.vue'
  import {getCurUserInfoAPI, updateUserInfoInterface} from '../api'
  export default {
    data () {
      return {lf_info:{}}
    },
    created () {
      this.getUserInfo()
    },
    methods: {
      toChange(boo){
        for(let i = 1; i<6; i++){
          let item = `inputInfo${i}`
          this.$refs[item].readOnly = boo
        }
      },
      async updateInfo(){
        this.lf_info = await updateUserInfoInterface(this.lf_info.userId, this.lf_info)
        this.toChange(true)
        this.$router.push('/info')
      },
      async getUserInfo(){
        this.lf_info = await getCurUserInfoAPI()
      }
    },
    computed: {},
    components: {
      Top
    }
  }
</script>

<style scoped lang="less">
  html,body{
    height: 100%;
  }
  .lf_userInfo_con{
    height: 100%;
  }
.lf_userInfo_con>img{
  display: block;
  width: 100px;
  margin: 0 auto;
  padding: 10px 0;
  box-sizing: border-box;
}
  .lf_userInfo_con>p{
    height: 50px;
    text-align: center;
    font-size: 16px;
  }
  .lf_userInfo_con>button{
    display: block;
    width: 100px;
    height: 40px;
    margin: 5px auto;
    background-color: coral;
    border: 0;
    border-radius: 4px;
    color: whitesmoke;
    font-size: 16px;
    cursor: pointer;
  }

</style>
