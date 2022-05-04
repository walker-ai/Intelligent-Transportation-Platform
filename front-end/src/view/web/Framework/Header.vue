<template>
  <el-container>
    <div class="imgUrl">
      <div class="titleText">
        testTitle
      </div>
      <div class="btn">
        <el-button @click="loginOut" type="primary">退出</el-button>
      </div>
    </div>
  </el-container>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    loginOut() {
      this.$router.push('/login')
    },
  },
};
</script>

<style>
/*.el-header {*/
/*  line-height: 50px;*/
/*  color: rgb(250, 248, 248);*/
/*  font-size: 20px;*/
/*}*/

/*.el-header img {*/
/*  vertical-align: middle;*/
/*}*/

/*.imgUrl {*/
/*  color: #000;*/
/*  background: rgb(190, 223, 223);*/
/*  background-size: 100% 100%;*/
/*  width: 100%;*/
/*}*/

/*.titleText {*/
/*  float: left;*/
/*  margin-left:20px*/
/*}*/

/*.btn {*/
/*  float: right;*/
/*  margin-right:20px*/
/*}*/
</style>
