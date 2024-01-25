<template>
  <div class="layout">
        <el-container>
          
          <el-aside width="160px" id="head" v-if="username === 'master19' ||  username === 'slave7'">
            <el-menu router
            class="el-menu-demo" :default-active="$route.path"
            mode="vertical"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">

              <el-menu-item index="/home"  >
                热词修改
              </el-menu-item>
              <el-menu-item index="/home2" >
                热词统计
              </el-menu-item>
              <el-menu-item index="/home3"  >
                热词效果
              </el-menu-item>
              <el-menu-item index="/home5" >
                ASR运行统计
              </el-menu-item>
              <el-menu-item v-if="!disable" index="/home6"  :disabled="disable">
                热词审核
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main>
            <router-view  :username="username" @updateUsername="updateUsername" />
          </el-main>
        </el-container>
</div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name: 'Layout',
  data() {
      return {
        disable: true,
        username: ""
      };
    },
    methods: {
      ...mapActions({setName:'setName'}),
      ...mapMutations({increment:'ADDNUM'}),
      updateUsername(newUsername) {
        console.log("接收子组件数据",newUsername)
        if(newUsername === 'master19' || newUsername === 'slave7'){
          this.username = newUsername;
          // this.setName(this.username)
          this.increment(this.username)
          //原始写法  this.$store.dispatch('setName',this.username)
        }
        if(newUsername === 'master19'){
          this.disable = false;
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