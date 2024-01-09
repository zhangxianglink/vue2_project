<template>
    <div id="Home2">
<el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="查询日期">
      <el-select v-model="formInline.dateStr" placeholder="查询日期">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="查询热词">
      <el-input v-model="formInline.key" placeholder="查询热词"></el-input>
    </el-form-item>
    <el-form-item label="热词结果">
      <el-input v-model="formInline.value" placeholder="热词结果"></el-input>
    </el-form-item>


    <el-form-item>
      <el-button type="primary" @click="selectTableData">查询</el-button>
    </el-form-item>

    <el-table :data="tableData" style="width: 100%"  height=750  border>
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
        label="使用计数" sortable
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="danger" size="medium">热词详情</el-button>
        </template>
      </el-table-column>
    </el-table>

  

    <el-dialog title="热词详情列表" :visible.sync="dialogTableVisible">
      <el-table :data="detailData">
        <el-table-column property="data" label="详情" >
          <template slot-scope="scope">
            <div v-html="scope.row.data"></div>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="detailPage.pageNum"
      :page-size="detailPage.pageSize"
      :page-sizes="pageSizes"
      :total="detailPage.total"
      @size-change="detailSizeChange"
      @current-change="detailPageChange"
    />
    </el-dialog>

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
      props: ['username'],
      data() {
        return {
          dialogTableVisible: false,
          pageSizes: [10],
          detailPage: {
            pageNum: 1, // 第几页
            pageSize: 10, // 每页多少条
            total: 0 // 总记录数
          },
          tablePage: {
            pageNum: 1, // 第几页
            pageSize: 10, // 每页多少条
            total: 0 // 总记录数
          },
          formInline: {
            key: '',
            value:'',
            dateStr: ''
          },
          options: [],
          tableData: [],
          detailData: [],
          tmp: {}
        }
      },
      methods: {
        formatDate(index) {
          const date = new Date()
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate() - index).padStart(2, '0');
          return `${year}-${month}-${day}`;
        },
        handleClick(row) {
          this.tmp = row;
          this.dialogTableVisible = true;
          this.detailData = []
            axios.post("/common/detail/page",{
              "match": "",
              "key": row.left,
              "dayTimeStr": this.formInline.dateStr,
              "valueMatch": "",
              "pageSize": this.detailPage.pageSize,
              "pageNum": this.detailPage.pageNum
            }).then(
                  response => {
                    const obj = response.data.result;
                    this.detailPage.total = response.data.total;
                    for (let i in obj) {
                    let  msg = obj[i].replace(
                    row.left, 
                    // 这里是替换成html格式的数据，最好再加一个样式权重，保险一点
                    
                    '<font style="color:red!important;">'+ row.left +'</font>'
                )
                      this.detailData.push({"data": msg })
                  }                 
            },
            error => {
              console.log('请求失败了',error.message)
            })
        },
        
        selectTableData() {
          this.tableData = []
            axios.post("/common/word/page",{
              "match": this.formInline.key,
              "key": 'count:',
              "dayTimeStr": this.formInline.dateStr,
              "valueMatch": this.formInline.value,
              "pageSize": this.tablePage.pageSize,
              "pageNum": this.tablePage.pageNum
            }).then(
                  response => {
                    const obj = response.data.result;
                    this.tablePage.total = response.data.total;                 
                    for (let i in obj) {
                      this.tableData.push(obj[i]);
                  }
            },
            error => {
              console.log('请求失败了',error.message)
            })
        },
        handlePageChange(currentPage) {
          this.tablePage.pageNum = currentPage;
          this.selectTableData();
        },
        handleSizeChange(pageSize) {
          this.tablePage.pageSize = pageSize
          this.selectTableData();
        },          
        detailPageChange(currentPage) {
          this.detailPage.pageNum = currentPage;
          this.handleClick(this.tmp)
        },
        detailSizeChange(pageSize) {
          this.detailPage.pageSize = pageSize
          
        },
        selectOptions(){
          this.options.push({label:"今天",value:this.formatDate(0)});
          this.options.push({label:"昨天",value:this.formatDate(1)});
          this.options.push({label:"前天",value:this.formatDate(2)});
          this.formInline.dateStr = this.formatDate(0);
        }
      },
      mounted() {
        this.selectOptions()
      }
    }
</script>