<template>
  <div id="Home">
<el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="查询key">
      <el-input v-model="formInline.key" placeholder="查询key"></el-input>
    </el-form-item>
    <el-form-item label="查询索引">
      <el-select v-model="formInline.index" placeholder="查询索引">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="selectTableData">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="edit(-1)">新增</el-button>
    </el-form-item>

    <el-table border :data="tableData" style="width: 100%" height=750 >
      <el-table-column
        prop="left"
        label="热词"
        width="180">
      </el-table-column>
      <el-table-column
        prop="middle"
        label="结果"
        width="180">
      </el-table-column>
      <el-table-column
        prop="right"
        label="状态" sortable
        width="180">
      </el-table-column>
      <el-table-column
      label="操作"
      width="300">
      <template slot-scope="scope">
        <el-button type="primary" size="medium" @click="edit(scope.$index,scope.row)">编辑</el-button>
        <el-button  v-if="username === 'master19'" @click="handleClick(scope.row)" type="danger" size="medium" :disabled="username !== 'master19'">删除</el-button>
        <el-button v-if="username === 'master19'" type="primary" size="medium" :disabled="scope.row.right === '正常' || username !== 'master19'" @click="approved(scope.row)">审核通过</el-button>
      </template>
    </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="tablePage.pageNum"
      :page-size="tablePage.pageSize"
      :page-sizes="pageSizes"
      :total="tablePage.total"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />


    <el-dialog id="edit" :title="editName" :visible.sync="editOn">
      <el-form :model="editFrom">
        <el-form-item label="KEY" :label-width="formLabelWidth">
          <el-input v-model="editFrom.key" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VALUE" :label-width="formLabelWidth">
          <el-input  type="textarea" v-model.trim="editFrom.value" autocomplete="off" autosize ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editOn = false">取 消</el-button>
        <el-button type="primary" @click="updateRow()">保存</el-button>
      </div>
    </el-dialog>
  
</el-form>
</div>
</template>
<script>
  import axios from 'axios'
  axios.defaults.baseURL = "/api" 
    export default {
      name: 'Home',
      props: ['username'],
      data() {
        return {
          tablePage: {
            pageNum: 1, // 第几页
            pageSize: 10, // 每页多少条
            total: 0 // 总记录数
          },
          pageSizes: [10, 20, 30],
          formLabelWidth:'',
          editOn: false,
          editName: "",
          formInline: {
            key: '',
            index: 'hot:rule'
          },
          editFrom:{
            key: '',
            value: ''
          },
          options: [
          {"lable":1,"value":"hot:rule"},
          {"lable":2,"value":"hot:zh"},
          {"lable":3,"value":"hot:match"},
          {"lable":4,"value":"hot:regex"}
          ],
          tableData: []
        }
      },
      methods: {
        updateRow() {
          let editKey = this.editFrom.key;
          let editValue = this.editFrom.value;
          let dto = {
                    "indexName": "",
                    "companyWords": {},
                    "pinyinCompanyWords": {},
                    "customization_id": "",
                    "channelType": ""
                  }
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: '/word/hot/word/check',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : ""
          };
          if(this.formInline.index === 'hot:rule' || this.formInline.index === 'hot:match' ||  this.formInline.index === 'hot:regex'){
            dto.indexName = this.formInline.index;
            dto.companyWords = { [editKey] :editValue}
            config.data = JSON.stringify(dto);
          }else if (this.formInline.index === 'hot:zh'){
            dto.indexName = this.formInline.index;
            dto.pinyinCompanyWords = { [editKey] :editValue}
            config.data = JSON.stringify(dto);
          }else {
            this.$alert('可选索引：hot:zh，hot:rule，hot:match', '先选择索引', {
                confirmButtonText: '确定',
            });
          }
          if (config.data !== ""){
            axios.request(config)
              .then((response) => {
                  this.selectTableData();
                  console.log("拼音热词保存成功：",JSON.stringify(response.data));
              })
              .catch((error) => {
                  console.log("拼音热词保存失败：",error);
              });
          }
          this.editOn = false;
        },
        edit(index ,row){
          this.editOn = true;
          if(index === -1){
            this.editName = "新增数据";
            this.editFrom.key = '';
            this.editFrom.value = '';
          }else {
            this.editName = "修改数据";
            this.editFrom.key = row.left;
            this.editFrom.value = row.middle;
          }
        },
        approved(row){
          let delWords = [row.left]
          axios.post("word/hot/word/approve",{
              "indexName":this.formInline.index,
              "delWords": delWords,
              "delPinYinWords": [],
              "customization_id": "",
              "channelType": ""
            }).then(
                  response => {
                    console.log('请求失败了',response.data);
                    this.selectTableData();
            },
            error => {
              console.log('请求失败了',error.message)
            })
        },
        handleClick(row) {
          let dto = {
                "indexName": "",
                "delWords": [],
                "delPinYinWords": [],
                "customization_id": "",
                "channelType": ""
              } 
          let config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: '/word/hot/word/del',
              headers: { 
                'Content-Type': 'application/json'
              },
              data : ""
            };    
            if(this.formInline.index === 'hot:rule' || this.formInline.index === 'hot:match' ||  this.formInline.index === 'hot:regex'){
            dto.indexName = this.formInline.index;
            dto.delWords.push(row.left);
            config.data = JSON.stringify(dto);
          }else if (this.formInline.index === 'hot:zh'){
            dto.indexName = this.formInline.index;
            dto.delPinYinWords.push(row.left)
            config.data = JSON.stringify(dto);
          }else {
            this.$alert('可选索引 hot:zh, hot:rule, hot:match', '先选择索引', {
                confirmButtonText: '确定',
            });
            return;
          }
          axios.request(config)
              .then((response) => {
                console.log("替换热词删除成功：",JSON.stringify(response.data));
                this.selectTableData();
              })
              .catch((error) => {
                console.log("替换热词删除成功：",error);
          });
      },
        selectOptions() {
            axios.get("/word/hot/word/keys").then(
                response => {
						    const arr = response.data.data;
                        for(let i =0; i<arr.length; i++){
                            this.options.push({"lable":i,"value":arr[i]})
                        }
					},
					error => {
						console.log('请求失败了',error.message)
					}
            )
        },
        selectTableData() {
          this.tableData = []
          axios.post("/word/hot/word/search",{
            "match": this.formInline.key,
            "key": this.formInline.index,
            "pageSize": this.tablePage.pageSize,
            "pageNum": this.tablePage.pageNum
          }).then(
                response => {
                  const obj = response.data.data.result;
                  this.tablePage.total = response.data.data.total;
                  for (let i in obj) {
                    this.tableData.push(obj[i]);
                  }
					},
					error => {
						console.log('请求失败了',error.message)
					}
            )
        },
        handlePageChange(currentPage) {
          this.tablePage.pageNum = currentPage;
          this.selectTableData();
        },
        handleSizeChange(pageSize) {
          this.tablePage.pageSize = pageSize
          this.selectTableData();
        }
      },
      mounted() {
        
      }
    }
</script>