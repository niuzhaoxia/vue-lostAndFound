<template>
    <div class="notice">
        <h2>招领报喜</h2>
        <p>李同学找回了自己的学生证</p>
        <p>王同学成功认领丢失的雨伞</p>
        <p>孙同学找回丢失的钱包</p>
        <p>周同学找回了自己的一卡通</p>
        <p>赵同学成功认领丢失的篮球</p>
        <p>孙同学找回丢失的笔记</p>
    </div>
</template>

<script>
  export default {
    data () {
      return {msg: 'hello'}
    },
    created () {
    },
    methods: {},
    computed: {},
    components: {}
  }
</script>

<style scoped lang="less">
    .notice{
        width: 90%;
        background-color: rgb(224, 221, 221);
        padding-bottom: 20px;
        h2{
            width: 100%;
            height:40px;
            line-height: 40px;
            font-size: 18px;
            font-weight: 800;
            color: white;
            background-color: rgb(124, 124, 124);
            padding-left: 5px;
            margin-bottom: 12px;
        }
        p{
            height: 30px;
            line-height: 30px;
            padding:0 10px;
        }
    }
</style>