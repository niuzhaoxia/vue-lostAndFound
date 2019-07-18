<template>
  <div class="login_con clearfix">
    <div class="login_cl">
      <p>Lost</p>
      <p>And</p>
      <p>Found</p>
    </div>
    <ul class="login_cr">
      <li>
        <p>Welcome to</p>
        <p>Lost and Found Platform</p>
      </li>
      <li>
        <label for="userAccount">用户名：</label>
        <input type="text" id="userAccount" v-model.number="userName">
      </li>
      <li>
        <label for="password">密码：</label>
        <input type="password" id="password" v-model="userPassword">
      </li>
      <li>
        <input id="indentify" type="text" placeholder="输入验证码" v-model="indentify">
        <span @click="changeImageCode()"><img :src="imageCode"  alt=""></span>
      </li>
      <li>
        <button @click="login">登录</button>
      </li>
      <li>
        <router-link to="/resgister">没有账号？去注册</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getLoginInterface} from '../api'

  export default {
    data () {
      return {
        userName: 20154234066,
        userPassword: 'nzx1234',
        curUser: '',
        imageCode: 'http://www.7xiwang.com/WebService/ImageValidateCode?code=7xiw',
        code: '', indentify:''
      }
    },
    created () {
      this.changeImageCode()
    },
    methods: {
      async login () {
        if (this.indentify && this.indentify !== this.code) {
          alert(`${this.indentify===this.code}`)
          return
        }
        this.curUser = await getLoginInterface(this.userName, this.userPassword)
        this.curUser === '' ? alert('密码或账户错误'):this.curUser
        if (this.curUser) {
          this.$router.push('/home')
        }
      },
      GetRandomCode(n) {
        let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let res = "";
        for (let i = 0; i < n ; i++) {
          let id = Math.ceil(Math.random() * 35);
          res += chars[id];
        }
        return res;
      },
      changeImageCode() {
        let co = this.GetRandomCode(4)
        this.code = co
        this.imageCode = `http://www.7xiwang.com/WebService/ImageValidateCode?code=${co}`
      }
    },
    computed: {}
    ,
    components: {}
  }
</script>

<style scoped lang="less">
  html, body {
    height: 100%;
  }

  /*tan*/
  .login_con {
    height: 100%;
    background-color: rgb(29, 21, 19);
  }

  .login_cl {
    width: 50%;
    height: 100%;
    float: left;
    position: relative;
  }

  .login_cl p {
    color: whitesmoke;
    font-size: 45px;
    position: absolute;
  }

  .login_cl > p:nth-child(1) {
    top: 200px;
    left: 150px;
  }

  .login_cl > p:nth-child(2) {
    top: 250px;
    left: 250px;
  }

  .login_cl > p:nth-child(3) {
    top: 300px;
    left: 350px;
  }

  .login_cr {
    float: right;
    width: 300px;
    height: 400px;
    background-color: white;
    border-radius: 5px;
    margin: 100px 200px 0 0;
    box-shadow: whitesmoke 1px 1px 5px;
    padding: 25px 10px;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
  }

  .login_cr > li > p {
    padding: 5px 0;
    background-color: rgba(27, 27, 27, 0.22);
    font-size: 16px;
    color: white;
  }

  .login_cr > li {
    padding: 5px 0;
  }

  .login_cr > li:nth-child(2), .login_cr > li:nth-child(3), .login_cr > li:nth-child(4) {
    margin-top: 20px;
  }

  .login_cr > li > button {
    width: 70%;
    height: 50px;
    background-color: #393939;
    border-radius: 5px;
    color: white;
    border: 0;
    font-size: 18px;
    letter-spacing: 10px;
  }
  .login_cr > li > a {
    color: coral;
  }

</style>
