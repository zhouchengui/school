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
      <el-table-column label="学生学号" prop="studentId" width="180"></el-table-column>
      <el-table-column label="宿舍号" prop="dormitoryId" width="180"></el-table-column>
      <el-table-column width="180" label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
      <el-form :model="form">
        <el-form-item label="宿舍号" :label-width="formLabelWidth" prop="dormitoryId">
          <el-input type="number" v-model="form.dormitoryId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="编号" :label-width="formLabelWidth" prop="id">
          <el-input type="number" v-model="form.id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学生学号" :label-width="formLabelWidth" prop="studentId">
          <el-input type="number" v-model="form.studentId" autocomplete="off" />
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
  allStudent,
  delStudent,
  addStudent,
  editStudent,
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
      form: {}
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
        addStudent(this.form).then(res => {
          console.log(res)
          this.dialogFormVisible = false
          this.loadingData()

        }).catch(() => {
        })
      } else {
        editStudent(this.form).then(res => {
          console.log(res)
          this.dialogFormVisible = false
          this.loadingData()

        }).catch(() => {
        })
      }

    },
    add () {
      this.dialogTitle = '新增宿舍学生'
      this.form = {}
      this.addOrUpdate = 1
      this.dialogFormVisible = true
    },
    handleEdit (e) {
      this.dialogTitle = '编辑宿舍学生'
      this.addOrUpdate = 2
      this.form = { ...e }
      this.dialogFormVisible = true
    },
    handleDelete (e) {
      console.log(e);
      delStudent(e).then(res => {
        console.log(res)
        this.loadingData()
      }).catch(() => {
      })

    },
    loadingData () {
      allStudent().then(res => {
        console.log(res)
        this.tableData = res.data.dormitoryStudents
      }).catch(() => {
      })
    },
  }
});

</script>

<style lang='less' scoped>
</style>