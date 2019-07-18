<template>
  <div>
    <Top></Top>
    <ul class="lf_letters min">
      <li v-for="letter in letters">
        <h3>来自 <span style="color: lightsalmon;">{{letter.sender}}</span> 的感谢信</h3>
        <p>{{letter.content}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import Top from '../base/Top.vue'
  import {getLettersInterface} from '../api'

  export default {
    data () {
      return {letters: []}
    },
    created () {
      this.getLetters()
    },
    methods: {
      async getLetters() {
        this.letters = await getLettersInterface()
      }
    },
    computed: {},
    components: {
      Top
    }
  }
</script>

<style scoped lang="less">
  .lf_letters {
    padding: 80px 10px;
  }

  .lf_letters > li {
    border: 1px solid #505050;
    margin-bottom: 10px;
  }

  .lf_letters > li > h3 {
    padding: 5px 5px;
    font-size: 16px;
    font-weight: bolder;
    background: #787777;
    color: whitesmoke;
  }

  .lf_letters > li > p {
    padding: 10px 20px;
  }
</style>
