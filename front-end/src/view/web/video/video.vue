<template>
  <body id="VideoContent">
    <div id="Video_main_item">
      <el-card
          id="detect_box"
          class="box-card"
          style="
              border-radius: 8px;
              width: 792px;
              height: 360px;
              margin-bottom: -30px;
            "
      >
        <el-button
            v-show="showbutton"
            type="primary"
            icon="el-icon-upload"
            v-on:click="upload_video"
        >
          上传视频
          <input
              ref="upload"
              style="display: none"
              name="file"
              type="file"
              @change="update"
          />
        </el-button>
      </el-card>
    </div>
  </body>
</template>


<script>
import axios from "axios"

export default {
  name: "Content",
  data() {
    return {
      server_url: "http://127.0.0.1:5003",
      url: "",
      showbutton: true,
    };
  },
  methods: {

    activate() {
      this.$router.go(0);
    },

    // 获得目标文件
    upload_video() {
      this.$refs.upload.click();
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjcectURL !== undefined) {
        url = window.createOjcectURL(file);
      } else if (window.URL !== undefined) {
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL !== undefined) {
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    // 上传文件
    update(e) {
      // 上传时，隐藏按钮
      this.showbutton = false;
      this.url = "";  // 初始化文件地址
      // this.showbutton = false;  // 隐藏按钮
      let file = e.target.files[0];  // 取得文件对象
      this.url = this.$options.methods.getObjectURL(file);  // 获得文件地址
      let param = new FormData();  // 创建form对象
      param.append("file", file, file.name);  // 通过append向form对象添加数据
      let config = {
        headers: {"Content-Type": "multipart/form-data"},
      };  // 添加请求头
      axios
          .post(this.server_url + "/upload_video", param, config)
          .then((response) => {
            this.url = response.data.image_url;
            this.notice();
            let target_url = "http://127.0.0.1:5003/video_feed";
            setTimeout(function() {
              window.open(target_url);
            }, 500);
          });
    },
    notice() {
      this.$notify({
        title: "视频上传成功",
        duration: 0,
        type: "success",
      });
    },
  }
}

</script>


<style scoped>
  #VideoContent {
    position: fixed;
    /*background: url("../../../assets/login_images/interstellar.png");*/
    background:rgba(112, 175, 200, 0.1);
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    height: 100%;
    width: 100%;
    background-size: 100%;
  }

  body {  /* 隐藏body的边框 */
    margin: 0px;
    padding: 0;
  }

  .el-button {
    margin-left: 320px;
    margin-top: 120px;
  }

  #Video_main_item {
    margin-left: 380px;
    margin-top: 170px;
  }
</style>