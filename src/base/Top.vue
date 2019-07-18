<template>
  <div class="lf_Header">
    <div class="min clearfix">
      <h1 class="h_left">
        lost and found
      </h1>
      <div class="h_right">
        <router-link to="/home">
          <i class="iconfont icon-index"></i>
          <span>首页</span>
        </router-link>

        <b @click="jump('/info')">
          <i class="iconfont icon-gerenxinxi"></i>
          <span>个人信息</span>
        </b>

        <b @click="jump('/letter')">
          <i class="iconfont icon-xinjian"></i>
          <span>感谢信</span>
        </b>
        <div @click="myPublish()" class="headPic" v-if="curUser" :style="{backgroundImage:`url(${curUser.headPortrait})`}">
        </div>

        <div class="enter" v-else>
          <router-link to="/login">
            登录
          </router-link>

          <span>|</span>

          <router-link to="/register">
            注册
          </router-link>
        </div>


      </div>
    </div>
  </div>

</template>

<script>
  import {isUserLoginOnAPI} from '../api'

  export default {
    data () {
      return {curUser: null}
    },
    created () {
      this.confirmCurUser()
    },
    methods: {
      async confirmCurUser () {
        this.curUser = await isUserLoginOnAPI()
      },
      jump (jumpRouter) {
        if (this.curUser) {
          this.$router.push(jumpRouter)
        } else {
          this.$router.push('/login')
        }
      },
      myPublish() {
        this.$router.push('/myPublish')
      }
    },
    computed: {},
    components: {}
  }
</script>

<style scoped lang="less">

  .lf_Header {
    height: 70px;
    color: white;
    background-color: rgb(29, 21, 19);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .h_left {
    float: left;
    font-size: 22px;
    color: whitesmoke;
    height: 70px;
    line-height: 70px;
  }

  .enter {
    float: right;
    margin-left: 15px;
    font-size: 12px;
  }

  .headPic {
    width: 40px;
    height: 40px;
    float: right;
    margin: 15px 10px 0;
    border-radius: 50%;
    background: rgba(0,0,0,0) center center no-repeat;
    background-size: cover;
  }

  .h_right {
    float: right;
  }

  .h_right a, b {
    color: #d0d0d0;
    height: 70px;
    line-height: 70px;
    cursor: pointer;
  }

  .h_right > a, b {
    margin-left: 10px;
  }

  a.router-link-active {
    color: whitesmoke;
  }
</style>
