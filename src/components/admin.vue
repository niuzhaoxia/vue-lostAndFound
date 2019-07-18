<template>
    <div class="box">
      <ul class="login_cr">
        <li>
          <p>Entering The</p>
          <p>Backstage Management Center</p>
        </li>
        <li>
          <label for="userAccount">Admin：</label>
          <input type="text" id="userAccount" v-model.number="admin">
        </li>
        <li>
          <label for="password">password：</label>
          <input type="password" id="password" v-model="password">
        </li>
        <li>
          <button>登录</button>
        </li>
      </ul>
    </div>
</template>

<script>
  export default {
    data () {
      return {admin: 'nzx', password: {}}
    },
    created () {
    },
    methods: {},
    computed: {},
    components: {}
  }
</script>

<style scoped lang="less">
  .box {
    height: 100%;
  }

  .login_cr {
    width: 300px;
    height: 400px;
    background-color: white;
    border: 1px solid #505050;
    border-radius: 5px;
    margin: 100px auto;
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
    padding: 10px 0;
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
