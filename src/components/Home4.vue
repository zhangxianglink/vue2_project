<template>
 <div class="login-container">
    <div class="login-box">
      <h2 class="title">授权登录</h2>
      <form>
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" id="username" v-model.trim="username" placeholder="请输入用户名" />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" id="password" v-model.trim="password" placeholder="请输入密码" />
        </div>
        <button class="login-button" @click.prevent="login">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home4',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      // 实现登录逻辑
      if(this.username === 'master19' && this.password === '123456'){
        this.$emit('updateUsername', this.username);
        this.$router.push('/home');
    
      }else {
        this.$alert('账号密码错误', '重新登录', {
                confirmButtonText: '确定',
        });
      }
      this.username = '';
      this.password = '';
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #f5f5f5;
}

.login-box {
  width: 400px;
  padding: 40px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.title {
  margin-bottom: 30px;
  text-align: center;
  font-size: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #666;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>
