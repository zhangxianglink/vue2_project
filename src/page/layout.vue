<template>
  <div class="layout">
        <el-container>
          <el-header id="head">
            <el-menu router
            class="el-menu-demo" :default-active="$route.path"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
              <el-menu-item index="/home4" >
              登录授权
              </el-menu-item>
              <el-menu-item index="/home"  :disabled="disable">
              热词操作
              </el-menu-item>
              <el-menu-item index="/home2"  :disabled="disable">
              热词统计
              </el-menu-item>
              <el-menu-item index="/home3"  :disabled="disable">
              热词效果
              </el-menu-item>
              <el-menu-item index="/home5"  :disabled="disable">
              ASR运行统计
              </el-menu-item>
            </el-menu>
          </el-header>
          <el-main>
            <router-view  :username="username" @updateUsername="updateUsername" />
          </el-main>
        </el-container>
</div>
</template>

<script>

export default {
  name: 'Layout',
  data() {
      return {
        disable: true,
        username: ""
      };
    },
    methods: {
      updateUsername(newUsername) {
        console.log("接收子组件数据",newUsername)
        if(newUsername === 'master19' || newUsername === 'slave7'){
          this.disable = false;
          this.username = newUsername;
        }
      },
      handleSelect(index, keyPath) {
        this.$router.push(index);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
html,body{
  width: 100%;
  height: 100%;
}
#app {
  height: 100%;
}
  #head {
    padding: 0%;
  }
  .el-container{
  position: absolute; 
  width: 100%; 
  top: 0px ; 
  left: 0 ; 
  bottom: 0;
}
.el-header{
  padding: 0;
  z-index: 1000;
}
 
/* // header菜单需要靠右的添加.fr即可(如：<el-menu-item class="fr" index="3">消息中心</el-menu-item>) */
.el-header .fr{
  float: right;
}
.el-header .el-menu{
  border-bottom: none;
}
.el-aside{
  z-index: 999;
  padding-top: 60px;
}
.el-aside{
  background: #545c64;
}
.el-main {
    margin-left: 10px;
    margin-top: 20px;
}
.el-aside .el-menu{
  border-right: none;
}
  

</style>