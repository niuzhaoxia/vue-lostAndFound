<template>
    <div>
      <Top></Top>
      <h3>我发布过的帖子：</h3>
      <ul class="myDyn min">
        <li v-for="lf_dynamic in my_dynamics">
          <div class="publisherInfo clearfix">
            <!--<img :src="lf_dynamic.headPortrait" class="headPortrait"></img>-->
            <router-link :to="{name: 'detail', params:{gid:lf_dynamic.goods_id}}"
                         :style="{backgroundImage:`url(${lf_dynamic.headPortrait})`}" class="headPortrait"></router-link>
            <div class="info_r">
              <p>{{lf_dynamic.nickName}}</p>
              <!--this.$moment(lf_dynamic.publish_time).format("YYYY-MM-DD")-->
              <p>{{lf_dynamic.publish_time|converDate}}</p>
            </div>
          </div>
          <div class="publishCon">
            <p>{{lf_dynamic.goods_descr}}</p>
            <img v-for="lf_pic in lf_dynamic.goods_pic" :src="lf_pic" alt="">
          </div>
          <div class="lf_operate">
            <a href="##">删除帖子</a>
            <a href="##">修改帖子</a>
            <a href="##">置顶帖子</a>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
  import Top from '../base/Top.vue'
  import {isUserLoginOnAPI, getMyDmynamicsAPI} from '../api'
  export default {
    data () {
      return {my_dynamics: [], curUser: {}}
    },
    created () {
      this.confirmCurUser ()
    },
    methods: {
      async confirmCurUser () {
        this.curUser = await isUserLoginOnAPI()
        this.my_dynamics = await getMyDmynamicsAPI(this.curUser.userId)
      },
    },
    computed: {},
    components: {Top}
  }
</script>

<style scoped>
  h3 {
    height: 40px;
    font-size: 18px;
    background-color: #d0d0d0;
    color: white;
    line-height: 40px;
    width: 60%;
    margin: 80px auto 10px;
    padding: 0 20px;
  }
  .myDyn.min {
    width: 60%;
  }
  .myDyn > li {
    margin-bottom: 10px;
    border: black 1px solid;
    padding: 5px 10px;
    position:relative;
    overflow: hidden;
  }
  .myDyn > li:hover .lf_operate{
    display: flex;
  }
  .myDyn > li > .lf_operate{
    display: flex;
    width: 15%;
    height: 100%;
    position: absolute;
    top:0;
    right: 0;
    background-color:rgba(0, 0, 0, 0.2);
    align-items: center;
    flex-wrap: wrap;
    display: none;
  }

  .myDyn > li>.lf_operate>a{
    width: 100%;
    text-align: center;
    padding: 10px 0;
    color: white;
  }
  .myDyn > li>.lf_operate>a:hover{
    background: orangered;
  }
  .publisherInfo > .headPortrait {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float: left;
    background: center center no-repeat;
    background-size: cover;
    cursor: pointer;
  }
  .info_r {
    float: left;
    margin: 5px 0 0 15px;
  }

  .info_r > p:first-child {
    font-size: 16px;
    color: #000000;
    margin-bottom: 3px;
  }

  .info_r > p:last-child {
    font-size: 12px;
    color: #787777;
  }

  .publishCon {
    margin: 10px 0;
  }

  .publishCon > p {
    padding: 5px 0 20px;
  }

  .publishCon > img {
    width: 120px;
    padding: 0 15px 5px 0;
  }
</style>
