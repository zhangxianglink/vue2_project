<template>
<el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="查询key">
      <el-input v-model="formInline.key" placeholder="查询key2"></el-input>
    </el-form-item>
    <el-form-item label="查询索引">
      <el-select v-model="formInline.index" placeholder="查询索引2">
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

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="key"
        label="key"
        width="180">
      </el-table-column>
      <el-table-column
        prop="value"
        label="value"
        width="180">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="edit(scope.$index,scope.row)">编辑</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>


    <el-dialog id="edit" title="修改数据" :visible.sync="editOn">
      <el-form :model="editFrom">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="editFrom.key" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-input v-model="editFrom.value" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editOn = false">取 消</el-button>
        <el-button type="primary" @click="updateRow()">确 定</el-button>
      </div>
    </el-dialog>
  </el-form>

</template>

<script>
  import axios from 'axios'
    export default {
      name: 'Home',
      data() {
        return {
          formLabelWidth:'',
          editOn: false,
          formInline: {
            key: '',
            index: ''
          },
          editFrom:{
            key: '',
            value: ''
          },
          options: [],
          tableData: []
        }
      },
      methods: {
        updateRow() {
          console.log("修改值成功",this.editFrom);
          this.editOn = false;
        },
        edit(index ,row){
          this.editOn = true;
          this.editFrom.key = row.key;
          this.editFrom.value = row.value;
        },
        handleClick(row) {
        console.log(row);
      },
        onSubmit() {
          console.log(this.formInline);
        },
        selectOptions() {
            axios.get("http://localhost:8082/word/hot/word/keys").then(
                response => {
						const arr = response.data.data;
                        for(let i =0; i<arr.length; i++){
                            this.options.push({"lable":i,"value":arr[i]})
                        }
                        console.log(this.options)
					},
					error => {
						console.log('请求失败了',error.message)
					}
            )
        },
        selectTableData() {
          axios.post("http://localhost:8082/word/hot/word/search",{
            "match": this.formInline.key,
            "key": this.formInline.index,
            "pageSize": 10,
            "pageNum": 1
          }).then(
                response => {
                  const arr = response.data.data;
                  for (let key in jsonMap) {
                    this.tableData.push({})
                  }
					},
					error => {
						console.log('请求失败了',error.message)
					}
            )
        }
      },
      mounted() {
        this.selectOptions();
      }
    }
</script>