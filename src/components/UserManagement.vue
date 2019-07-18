<template>
    <div class="box">
      <div class="content clearfix">
        <div class="c_left">
          <h5 class="title">来自用户的举报消息</h5>
          <ul class="list">
            <li v-for="r in ReportedUser"><span>用户名{{r.studentId}}</span><span>用户ID{{r.userId}}</span></li>
          </ul>
        </div>
        <div class="c_right">
          <p>请输入要删除的用户ID</p>
          <input type="text">
        </div>
      </div>

    </div>
</template>

<script>
  import {getReportedUserAPI} from '../api'
  export default {
    data () {
      return {ReportedUser: {}}
    },
    created () {
      this.getReportedUser()
    },
    methods: {
      async getReportedUser () {
        this.ReportedUser = await getReportedUserAPI()
      }
    },
    computed: {},
    components: {}
  }
</script>

<style scoped lang="less">
  .box {
    height: 100%;
    background-color: #d0d0d0;
  }
  .content {
    width: 80%;
    margin: 0 auto;
    padding: 50px;
  }
  .content > div {
    float: left;
    height: 500px;
    padding: 20px 10px;
    width: 50%;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid whitesmoke;
  }
  .content > .c_left{
    border-right: 1px dashed #eaeaea;
  }
  .title {
    background-color: #787777;
    color: white;
    font-size: 18px;
    font-weight: bolder;
    padding: 10px 0;
    margin-bottom: 5px;
  }
  .list > li {
    padding: 5px;
  }
  .list > li:nth-child(n+1){
    background-color: whitesmoke;
  }
  .list > li:nth-child(2n){
    background-color: #d0d0d0;
  }
  .list > li > span {
    display: inline-block;
    width: 50%;
  }
</style>
