<template>
<div id="Home5">
  <el-form :inline="true"  class="demo-form-inline">

    <el-table :data="tableData" style="width: 100%"  height=750  border>
      <el-table-column
        prop="left"
        label="IP"
        width="180">
      </el-table-column>
      <el-table-column
        prop="middle"
        label="类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="right"
        label="计数" sortable
        width="180">
      </el-table-column>
    </el-table>

    
    <el-form-item>
      <el-button type="primary" @click="selectTableData">刷新</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  import axios from 'axios'
  axios.defaults.baseURL = "/api" 
    export default {
      name: 'Home5',
      data() {
        return {
          tablePage: {
            pageNum: 1, // 第几页
            pageSize: 10, // 每页多少条
            total: 0 // 总记录数
          },
          tableData: []
        }
      },
      methods: {
        selectTableData() {
          this.tableData = []
          let config = {
            method: 'get',
            url: '/common/query/local?localType=all'
          };
          axios.request(config)
          .then((response) => {
            const obj = response.data.data;
            console.log(obj)
            for (let i in obj) {
              let middle;
              if(i === "all"){
                middle = '总计';
              }else if (i.indexOf("9997") == -1){
                middle = '离线'
              }else {
                middle = '实时'
              }
              this.tableData.push({"left":i,"middle":middle,"right":obj[i]})
            }
          })
          .catch((error) => {
            console.log(error);
          });

        }
      },
      mounted() {
        this.selectTableData()
      }
    }
</script>