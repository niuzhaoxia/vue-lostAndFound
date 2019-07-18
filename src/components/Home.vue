<template>
  <div>
    <Top></Top>
    <div class="search">
      <p>输入物品特征快速搜索</p>
      <p><input type="text" v-model="searchCon">
        <button @click="search()">搜索一下</button>
      </p>
      <p>
      <ul class="hotSearch clearfix">
        <li>热门搜索：</li>
        <li v-for="hl in hotSearchList"><a href="javascript:;">{{hl.keyWord}}</a></li>
      </ul>
      </p>
    </div>
    <router-link to="/detail" class="publishBtn min">发布寻物/招领启事</router-link>
    <div class="content min">
      <ul class="lf_dyn_list">
        <li v-for="lf_dynamic in lf_dynamics">
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
          <div class="commentArea">
            <span class="iconfont icon-pinglun"></span>
            <span v-for="comment in lf_dynamic.my_comments">{{`${comment.commentator}评论${lf_dynamic.nickName}：  ${comment.content}`}}</span>
          </div>
        </li>
      </ul>
      <div class="lf_content_r">
        <Notice></Notice>
        <Goodnews></Goodnews>
      </div>
    </div>
    <!--<el-button-->
      <!--plain-->
      <!--@click="open">-->
      <!--不会自动关闭-->
    <!--</el-button>-->
  </div>

</template>

<script>
  import Top from '../base/Top.vue'
  import Notice from '../base/Notice.vue'
  import Goodnews from '../base/Goodnews.vue'
  import {staLetterInterface, getDynamicsInterface, isUserLoginOnAPI, getHotSearchAPI} from '../api'

  export default {
    data () {
      return {lf_dynamics: [], curUser: {}, searchCon: '', hotSearchList: []}
    },
    created () {
      this.staLetters()
      this.getDynamics()
      this.getHotSearch()
      this.confirmCurUser()
    },
    methods: {
      async getDynamics () {
        this.lf_dynamics = await getDynamicsInterface()
      },
      async staLetters () {
        await staLetterInterface()
      },
      async confirmCurUser () {
        this.curUser = await isUserLoginOnAPI()
      },
      search () {
        let reg = new RegExp(this.searchCon)
        this.lf_dynamics = this.lf_dynamics.filter(item => {
          return item.goods_descr.match(reg)
        })
      },
      async getHotSearch() {
        this.hotSearchList = await getHotSearchAPI()
        this.open()
      },
      open() {
        let keyword = this.hotSearchList[0].keyWord
        this.$notify({
          position: 'bottom-right',
          title: '平台温馨提醒',
          message: `最近${keyword}丢失较多，请同学注意保管好自己的物品`,
          duration: 0
        });
      }

      // toDetail () {
      //   if (this.curUser) {
      //     console.log(this)
      //     // this.$router.push(`/dynamicdetail`)
      //   } else {
      //     this.$router.push('/login')
      //   }
      // }
    },
    computed: {
      sortDate: function () {
        this.lf_dynamics.sort((a, b) => {
          a = this.$moment(a.publish_time).format('YYYY-MM-DD').replace(/-/g, '')
          b = this.$moment(b.publish_time).format('YYYY-MM-DD').replace(/-/g, '')
          console.log(a, b)
          return b - a
        })
      }
    },
    components: {
      Top, Notice,Goodnews
    }
  }
</script>

<style scoped lang="less">
  .search {
    width: 80%;
    margin: 80px auto 10px;
    padding: 10px 0;
    background-color: rgba(239, 239, 239, 0.8);
  }

  .search > p{
    font-size: 18px;
    text-align: center;
    font-weight: bolder;
    color: #505050;
    padding: 5px 0;
  }

  .search input {
    width: 50%;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, .2);
  }

  .search p > button {
    width: 100px;
    height: 40px;
    border: 0;
    background-color: rgba(0, 0, 0, .2);
    color: white;
    cursor: pointer;
    margin-left: -5px;
  }

  .hotSearch {
    margin: 0 auto;
    width: 50%;
    margin: 0 auto;
  }

  .hotSearch > li {
    float: left;
  }

  .hotSearch > li a{
    color: lightsalmon;
    padding: 0 5px;
    text-decoration: lightsalmon;
  }
  .hotSearch > li:first-child {
    color: black;
  }

  .publishBtn {
    display: block;
    width: 150px;
    height: 40px;
    line-height: 40px;
    background-color: #393939;
    color: whitesmoke;
    font-size: 14px;
    border-radius: 4px;
    text-align: center;
    font-weight: bolder;
    cursor: pointer;
  }

  .content{
    display: flex;
  }

  .lf_dyn_list {
    padding: 10px;
    width:70%;
    box-sizing: border-box;
  }

  .lf_content_r{
    width: 30%;
    margin-left: 20px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  .lf_dyn_list > li {
    border: 1px solid #000000;
    padding: 20px 80px;
    margin-bottom: 10px;
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
    margin-bottom: 5px;
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
    width: 150px;
    padding: 0 15px 5px 0;
  }

  .commentArea {
    border: 1px solid rgba(27, 27, 27, 0.22);
    padding: 5px 0;
    height: 30px;
    box-sizing: border-box;
  }

  .commentArea > span {
    cursor: pointer;
    padding: 0 5px 0 5px;
    float: left;
  }

  .commentArea > span:nth-child(2) {
    width: 80%;
    color: #d0d0d0;
    border-left: 1px solid rgba(27, 27, 27, 0.22);
  }
</style>
