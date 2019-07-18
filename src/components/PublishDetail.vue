<template>
  <div>
    <top></top>
    <div class="details min">
      <h4>请输入详细的失物信息</h4>
      <ul class="details_con">
        <li>
          <label for="nickName">发布人：</label>
          <input id="nickName" type="text" v-model="lf_info.nickName" style="border: 0">
        </li>
        <li>
          <span>发布类型：</span>
          <select name="" v-model="lf_select">
            <option value="" disabled>请选择发布类型</option>
            <option value="0">失物招领贴</option>
            <option value="1">寻物启事贴</option>
          </select>
        </li>
        <li>
          <span>物品分类：</span>
          <select name="" v-model="lf_type">
            <option value="" disabled>请选择物品类型</option>
            <option value="prop">钱包</option>
            <option value="certificates">证件</option>
            <option value="dailyUsing">生活用品</option>
            <option value="elpro">电子产品</option>
            <option value="studyUsing">学习用品</option>
            <option value="studyUsing">体育用品</option>
          </select>
        </li>
        <li>
          <label for="location">地点：</label>
          <input id="location" type="text" v-model="location">
        </li>
        <li>
          <label for="">物品描述：</label>
          <textarea name="" id="" cols="50" rows="5" v-model="des"></textarea>
        </li>
        <li>
          <span>上传照片：</span>
          <UploadFile></UploadFile>
        </li>
        <li>
          <button>确认发布</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Top from '../base/Top.vue'
  import UploadFile from '../base/UploadFile.vue'
  import FileUpload from 'vue-upload-component'
  import {getCurUserInfoAPI} from '../api'

  export default {
    data () {
      return {
        lf_info: {},
        lf_select: '',
        lf_type: '',
        location: '',
        des: ''
      }
    },
    created () {
      this.getUserInfo()
    },
    methods: {
      async getUserInfo () {
        this.lf_info = await getCurUserInfoAPI()
      }
    },
    computed: {},
    components: {
      Top, FileUpload,UploadFile
    }
  }
</script>

<style scoped lang="less">
  .details {
    margin-top: 80px;
  }

  .details > h4 {
    font-size: 18px;
    color: whitesmoke;
    padding: 10px;
    background-color: #d0d0d0;
  }

  .details_con {
    padding: 20px 10px;
  }

  .details_con > li {
    padding-bottom: 20px;
    font-size: 14px;
    color: #505050;
  }

  .details_con > li > label, .details_con > li > span {
    font-weight: bolder;
  }

  .details_con > li > button {
    margin-top: 20px;
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
    border: 0;
  }
</style>
