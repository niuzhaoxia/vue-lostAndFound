<template>
    <div class="notice">
        <h2>网站公告</h2>
        <p>物归原主 弘扬助人为乐精神</p>
        <p>拾金不昧 体现中华民族美德</p>
        <p>更多功能，敬请期待...</p>
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
        margin-bottom: 20px;
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