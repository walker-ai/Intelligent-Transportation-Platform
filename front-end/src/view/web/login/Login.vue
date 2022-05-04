<template>
  <body id="poster">
    <div class="login">
      <div class="login_title">
        <div class="login_context">
          <div class="login_logo">
            <img src="../../../assets/login_images/njfu.png" alt="" />
          </div>
          <el-form :model="loginRuleForm" :rules="loginRules" ref="loginRules" class="login_box">
            <el-form-item label="账号" prop="username">
              <el-input v-model="loginRuleForm.username"
                        placeholder="请输入账号"
                        prefix-icon="el-icon-user">
              </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                  v-model="loginRuleForm.password"
                  placeholder="请输入密码"
                  :type="passw"
                  prefix-icon="el-icon-lock">
                  <i slot="suffix" :class="icon" @click="showPass"></i>
              </el-input>
            </el-form-item>
            <el-form-item class="btns">
              <el-button type="primary" @click="login">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
// Vue 代码逻辑
export default {
  data() {
    return {
      icon: "el-input__icon el-icon-view",
      passw: "password",
      // 表单请求数据
      loginRuleForm: {
        username: '',
        password: '',
      },
      // 表单验证规则
      loginRules: {
        username: [{
          required: true,
          message: "请输入用户名",
          trigger: "blur"
        },
          {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "blur",
          },
        ],
        password: [{
          required: true,
          message: "请输入密码",
          trigger: "blur"
        },
          {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "blur",
          }
        ]
      }
    };
  },
  methods: {
    activate() {
      this.$router.go(0);
    },
    showPass() {
      if (this.passw === "text") {
        this.passw = "password";
        this.icon = "el-input__icon el-icon-view";
      } else {
        this.passw = "text";
        this.icon = "el-input__icon el-icon-loading";
      }
    },
    login() {
      // 登陆进行规则的校验，只有校验成功才能登陆
      // vaild=>所有的规则校验都成立才会进入到这里
      this.$refs.loginRules.validate((valid) => {
        if (valid) {
          // 跳转到主页
          this.$router.push("/home");
          this.$message.success("WelCome! " + this.loginRuleForm.username + " 欢迎来到卫星车辆检测系统！");
          this.$axios.post("http://192.168.17.176:8089/login", this.qs.stringify(this.loginRuleForm)).then((
              res) => {
            if (res.data.code !== 0 && res.data.code !== 401) {
              return this.$message.error(res.data.msg);
            }
          })
        }
      })
    }
  }
}
</script>

<style> /*  这里不能改成 scope，否则只会作用于局部，因为外面还有一层html  */
  #poster {
    position: fixed;
    background: url("../../../assets/login_images/interstellar.png");
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    height: 100%;
    width: 100%;
    background-size: 100%;
  }

  body {
    margin: 0px;
    padding: 0;
  }

  .login {
    /* 高度 */
    height: 100%;
    width: 100%;
  }
  .login_title {
    /* 字体水平左右居中 */
    text-align:center;
  }

  .login_context {
    /* 宽度 */
    background: transparent !important;
    width: 450px;
    /* 高度 */
    height: 300px;
    /* 背景色 */
    background: #fff;
    /* 属性定位 */
    position: absolute;
    /* 属性定位，顶部占比 */
    top: 50%;
    /* 属性定位，左侧占比 */
    left: 50%;
    /* 水平垂直居中 */
    transform: translate(-50%, -50%);
    /* 四个角的圆角角度 */
    border-radius: 20px;
    /* 阴影 */
    box-shadow: 0 0 5px 2px #ddd;
  }

  .login_logo {
    /* 宽度 */
    width: 150px;
    /* 高度 */
    height: 150px;
    /* 属性定位 */
    position: absolute;
    /* 属性定位，顶部占比 */
    top: -95px;
    /* 属性定位，左侧占比 */
    left: 49%;
    /* logo左侧边距 */
    margin-left: -75px;
    /* 带有边框属性 */
    border: 1px solid #eee;
    /* 四个角的圆角角度 */
    border-radius: 50%;
    /* 背景色 */
    background: #fff;
    /* 设置内边距属性 */
    padding: 10px;
    /* 阴影 */
    box-shadow: 0 0 2px 2px #ddd;
  }

  .login_logo img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgb(238, 238, 238);
  }

  .login_box {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 0 50px;
    /* 边框边距 */
    box-sizing: border-box;
  }

  .btns {
    /* 将对象作为弹性伸缩盒显示 */
    display: flex;
    /* 横轴方向上的对齐方式 */
    justify-content: flex-end;
  }
</style>
