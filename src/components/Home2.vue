<template>
    <div id="Home2">
<el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="查询热词">
      <el-input v-model="formInline.key" placeholder="查询热词"></el-input>
    </el-form-item>
    <el-form-item label="查询索引">
      <el-select v-model="formInline.index" placeholder="查询索引">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="selectTableData">查询</el-button>
    </el-form-item>

    <el-table :data="tableData" style="width: 100%"  height=750  border>
      <el-table-column
        prop="key"
        label="热词"
        width="180">
      </el-table-column>
      <el-table-column
        prop="value"
        label="使用计数"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="danger" size="medium">删除</el-button>
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
  </el-form>
</div>
</template>

<script>
  import axios from 'axios'
  axios.defaults.baseURL = "/api" 
    export default {
      name: 'Home2',
      data() {
        return {
          pageSizes: [10, 20, 30],
          tablePage: {
            pageNum: 1, // 第几页
            pageSize: 10, // 每页多少条
            total: 0 // 总记录数
          },
          formInline: {
            key: '',
            index: 'word:count'
          },
          options: [{value:"word:count",label:"word:count"}],
          tableData: []
        }
      },
      methods: {
        handleClick(row) {
          let delKey = this.formInline.index + ":" +row.key
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: '/word/del?key=' + delKey,
          };
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            this.selectTableData();
          })
          .catch((error) => {
            console.log('请求失败了',error.message)
          });

        },
        selectTableData() {
          this.tableData = []
            axios.post("/common/word/page",{
              "match": this.formInline.key,
              "key": this.formInline.index,
              "pageSize": this.tablePage.pageSize,
              "pageNum": this.tablePage.pageNum
            }).then(
                  response => {
                    const obj = response.data.result;
                    this.tablePage.total = response.data.total;
                    for (let key in obj) {
                      this.tableData.push({"key":key,"value":obj[key]})
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