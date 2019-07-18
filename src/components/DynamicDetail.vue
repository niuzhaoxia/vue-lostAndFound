<template>
  <div>
    <Top></Top>
    <div class="contBox min mg_t">
      <div class="d_top clearfix">
        <h3 class="title">发布人：<span>{{publiser[0].nickName}}</span></h3>
        <ul class="details">
          <li><span>类别：</span><span>{{goodsdetail.goods_type}}</span></li>
          <li><span>发布时间：</span><span>{{goodsdetail.publish_time}}</span></li>
          <li><span>丢失地点：</span><span>{{goodsdetail.lostLocation}}</span></li>
          <li><span>物品描述：</span><span>{{goodsdetail.goods_descr}}</span></li>
          <li><img v-for="pic in goodsdetail.goods_pic" :src="pic" alt=""></li>
          <li><span>电话联系：</span><span>{{publiser[0].phoneNumber}}</span></li>
          <li><span>加我微信：</span><span>{{publiser[0].weixinNumber}}</span></li>
        </ul>
        <div class="report">举报该用户</div>
      </div>
      <div class="isFound">{{isFound}}</div>
      <div class="sendlet">发送感谢信</div>
    </div>
  </div>
</template>

<script>
  import Top from '../base/Top'
  import {getGoodsDetailAPI} from '../api'

  export default {
    data () {
      return {goodsdetail: {}, isFound: false}
    },
    created () {
      this.getDetail()
    },
    methods: {
      async getDetail () {
        this.goodsdetail = await getGoodsDetailAPI(this.gid)
        this.isFound = this.goodsdetail.isFound ? "已找回" : "未找回"
      }
    },
    computed: {
      gid(){
        return this.$route.params.gid
      },
      publiser(){
        return this.goodsdetail.goodsList
      }
    },
    components: {
      Top
    }
  }
</script>

<style scoped>
  .title {
    margin: 20px 5px;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    font-weight: bolder;
    background-color: #d0d0d0;
    color: #393939;
  }
  .contBox > .d_top > .report{
    float: right;
    background-color: whitesmoke;
    color: lightsalmon;
  }
  .details{
    padding: 20px 15px;
    float: left;
  }
  .details img {
    width: 150px;
    padding: 10px;
  }
  .details > li {
    padding: 5px 0;
  }
  .details > li > span:nth-child(1){
    font-weight: bolder;
    font-size: 14px;
  }
  .isFound {
    margin-right: 50px;
    float: left;
  }
  .sendlet{
    float: left;
  }
  .isFound, .sendlet, .report{
    width: 70px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border-radius: 5px;
    background-color: #505050;
    color: #d0d0d0;
  }
</style>
