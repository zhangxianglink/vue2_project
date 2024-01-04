<template>
<div id="Home3">
  <el-row>
    <el-col :span="8">
      <el-card class="box-card">
        <el-input 
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model.trim="textarea">
        </el-input>
        <div style="margin: 20px 0;"></div>
        <el-input placeholder="替换结果"
          type="textarea"
          :rows="5"
          v-model="textarea2">
        </el-input>
        <div style="margin: 10px 0;"></div>
        <el-button type="primary" style="float: right;" plain @click="pinyin()">拼音替换</el-button>
        <el-button type="primary" style="float: right; margin-right: 10px;" plain  @click="textClear()">清空操作</el-button>
      </el-card>
    </el-col>

    <el-col :span="8">
      <el-card class="box-card">
        <el-input 
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model.trim="textarea3">
        </el-input>
        <div style="margin: 20px 0;"></div>
        <el-input 
          type="textarea"
          :rows="5"
          placeholder="替换结果"
          v-model="textarea4">
        </el-input>
        <div style="margin: 10px 0;"></div>
        <el-button type="primary" style="float: right;" plain @click="hotWord()">热词替换</el-button>
        <el-button type="primary" style="float: right; margin-right: 10px;" plain  @click="textClear2()">清空操作</el-button>
      </el-card>
    </el-col>


    <el-col :span="8">
      <el-card class="box-card">
        <el-input 
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model.trim="textarea5">
        </el-input>
        <div style="margin: 20px 0;"></div>
        <el-input 
          type="textarea"
          :rows="5"
          placeholder="替换结果"
          v-model="textarea6">
        </el-input>
        <div style="margin: 10px 0;"></div>
        <el-button type="primary" style="float: right;" plain @click="cn2an()">中文转换阿拉伯数字</el-button>
        <el-button type="primary" style="float: right; margin-right: 10px;" plain  @click="textClear3()">清空操作</el-button>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
  import axios from 'axios'
    export default {
      name: 'Home3',
      data() {
        return {
          textarea:"",
          textarea2:"",
          textarea3:"",
          textarea4:"",
          textarea5:"",
          textarea6:""
        }
      },
      methods: {
        textClear() {
          this.textarea = "";
          this.textarea2 = "";
        },
        textClear2() {
          this.textarea3 = "";
          this.textarea4 = "";
        },
        textClear3() {
          this.textarea5 = "";
          this.textarea6 = "";
        },
        pinyin() {
          axios.get('http://localhost:8099/word/zh', {
            params: {
              text: this.textarea,
              key: 'hot:zh'
            }
          })
          .then((response) => {
            this.textarea2 = response.data.data;
          })
          .catch(function (error) {
            console.log(error);
          });
        },
        hotWord() {
          let data = {
            "text": this.textarea3,
            "timestamps": Array.from(new Array(this.textarea3.length).keys()),
            "tokens": this.textarea3.split("")
          };

          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8099/word/rule',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : JSON.stringify(data)
          };
          axios.request(config)
          .then((response) => {
            this.textarea4 = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
        },
        cn2an() {
          axios.get('http://localhost:8099/word/cn/an', {
            params: {
              text: this.textarea5
            }
          })
          .then((response) => {
            this.textarea6 = response.data.data;
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      },
      mounted() {
      }
    }
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 500px;
    height: 330px;
  }
</style>
