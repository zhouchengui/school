<!--  -->
<template>
  <div class=''>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-button @click="add" type="primary">新增</el-button>
      </el-col>
    </el-row>
    <el-table height="700" :data="tableData" style="width: 100%">
      <el-table-column label="编号" prop="id" width="180"></el-table-column>
      <el-table-column label="楼栋名" prop="name" width="180"></el-table-column>
      <el-table-column label="楼管" prop="chager" width="180"></el-table-column>
      <el-table-column label="学校编号" prop="schoolId" width="180"></el-table-column>
      <el-table-column width="180" label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="编号" :label-width="formLabelWidth" prop="id">
          <el-input v-model="form.id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="楼栋名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" v-on:blur = "validateName" />
        </el-form-item>
        <el-form-item label="楼管" :label-width="formLabelWidth" prop="chager">
          <el-input type="number" v-model="form.chager" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学校编号" :label-width="formLabelWidth" prop="schoolId">
          <el-input type="number" v-model="form.schoolId" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="primary">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  allDormitory, delDormitory, addDormitory, editDormitory, editBuilding,
  addBuilding,
  delBuilding,
  allBuilding,
} from "../../http/index"
import { defineComponent } from "vue"
export default defineComponent({
  data () {
    return {
      addOrUpdate: 1,
      dialogTitle: '新增宿舍',
      formLabelWidth: 180,
      dialogFormVisible: false,
      tableData: [],
      form: {},
      rules:{
        name:[
            {required: true,message:"宿栋名称不能为空",trigger :"blur"}
          ],

      }
    }
  },
  components: {

  },
  mounted () {
    this.loadingData()
  },
  methods: {
    primary () {
      if (this.addOrUpdate == 1) {
        addBuilding(this.form).then(res => {
          console.log(res)
          this.dialogFormVisible = false
          this.loadingData()

        }).catch(() => {
        })
      } else {
        editBuilding(this.form).then(res => {
          console.log(res)
          this.dialogFormVisible = false
          this.loadingData()

        }).catch(() => {
        })
      }

    },
    add () {
      this.dialogTitle = '新增建筑'
      this.addOrUpdate = 1
      this.form = {}
      this.dialogFormVisible = true
    },
    handleEdit (e) {
      this.dialogTitle = '编辑建筑'
      this.addOrUpdate = 2
      this.form = { ...e }
      this.dialogFormVisible = true
    },
    handleDelete (e) {
      console.log(e);
      delBuilding(e).then(res => {
        console.log(res)
        this.loadingData()
      }).catch(() => {
      })

    },
    loadingData () {
      allBuilding().then(res => {
        console.log(res)
        this.tableData = res.data.buildings
      }).catch(() => {
      })
    },
    validateName(){
      if(!this.form.name){
        this.$refs.form.validateField("rules.name",'请输入宿舍楼栋名称',(message) =>{
                console.log('validateerror : ${message}');
        });
      }else{
        this.$refs.form.clearValidate("rules.name");
      }
    }
  }
});

</script>

<style lang='less' scoped>
</style>