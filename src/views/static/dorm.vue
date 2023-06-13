<!--  -->
<template>
  <div class=''>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-button @click="add" type="primary">新增</el-button>
      </el-col>
    </el-row>
    <el-table height="700" :data="tableData" style="width: 100%">
      <el-table-column label="宿舍编号" prop="id" width="180"></el-table-column>
      <el-table-column label="学校" prop="school" width="180"></el-table-column>
      <el-table-column label="宿舍" prop="building" width="180"></el-table-column>
      <el-table-column label="宿舍名" prop="name" width="180"></el-table-column>
      <el-table-column label="宿舍长编号" prop="leader" width="180"></el-table-column>
      <el-table-column label="总床位数" prop="maxNumber" width="180"></el-table-column>
      <el-table-column label="入住人数" prop="liveNumber" width="180"></el-table-column>
      <el-table-column label="空床位" prop="leftNumber" width="180"></el-table-column>
      <el-table-column label="类型" prop="type" width="180"></el-table-column>
      <el-table-column label="宿舍状态" prop="status" width="180"></el-table-column>
      <el-table-column label="备注" prop="comment" width="180"></el-table-column>
      <el-table-column width="180" label="操作" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
      <el-form :model="form">
        <el-form-item label="学校" :label-width="formLabelWidth" prop="school">
          <el-input v-model="form.school" autocomplete="off" />
        </el-form-item>
        <el-form-item label="宿舍" :label-width="formLabelWidth" prop="building">
          <el-input v-model="form.building" autocomplete="off" />
        </el-form-item>
        <el-form-item label="宿舍名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="宿舍长" :label-width="formLabelWidth" prop="leader">
          <el-input type="number" v-model="form.leader" autocomplete="off" />
        </el-form-item>
        <el-form-item label="总床位数" :label-width="formLabelWidth" prop="maxNumber">
          <el-input type="number" v-model="form.maxNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="入住人数" :label-width="formLabelWidth" prop="liveNumber">
          <el-input type="number" v-model="form.liveNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="	空位数" :label-width="formLabelWidth" prop="leftNumber">
          <el-input type="number" v-model="form.leftNumber" autocomplete="off" />
        </el-form-item>
        <el-form-item label="宿舍类型" :label-width="formLabelWidth" prop="type">
          <el-select v-model="form.type" placeholder="宿舍类型">
            <el-option label="男寝" :value="0" />
            <el-option label="女寝" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍状态" :label-width="formLabelWidth" prop="status">
          <el-select v-model="form.status" placeholder="宿舍状态">
            <el-option label="空" :value="0" />
            <el-option label="学生入住" :value="1" />
            <el-option label="老师入住" :value="2" />
            <el-option label="废弃宿舍" :value="3" />
          </el-select>
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
import { allDormitory, delDormitory, addDormitory, editDormitory } from "../../http/index"
import { defineComponent } from "vue"
export default defineComponent({
  data () {
    return {
      addOrUpdate: 1,
      dialogTitle: '新增宿舍',
      formLabelWidth: 180,
      dialogFormVisible: false,
      tableData: Array(),
      form: {},
      sex:'asd'
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
        addDormitory(this.form).then(res => {
          console.log(res)
          this.dialogFormVisible = false
          this.loadingData()

        }).catch(() => {
        })
      } else {
        if (this.form.type==='男寝') {
         this.form.type=0
        }if (this.form.type==='女寝') {
          this.form.type=1
        }
        if (this.form.status==='空') {
         this.form.status=0
        }if (this.form.status==='学生入住') {
          this.form.status=1
        }if (this.form.status==='老师入住') {
          this.form.status=2
        }if (this.form.status==='废弃宿舍') {
          this.form.status=3
        }
        editDormitory(this.form).then(res => {
          console.log(res)
          this.dialogFormVisible = false
          this.loadingData()

        }).catch(() => {
        })
      }

    },
    add () {
      this.dialogTitle = '新增宿舍'
      this.addOrUpdate = 1
      this.form = {}

      this.dialogFormVisible = true
    },
    handleEdit (e) {
      this.dialogTitle = '编辑宿舍'
      this.addOrUpdate = 2
      this.form = { ...e }
      this.dialogFormVisible = true
    },
    handleDelete (e) {
      console.log(e);
      delDormitory(e).then(res => {
        console.log(res)
        this.loadingData()
      }).catch(() => {
      })

    },
    loadingData () {
      allDormitory().then(res => {
       res.data.dormitories.forEach(item=>{
        if (item.type===0) {
        return item.type='男寝'
        }if (item.type===1) {
         return item.type='女寝'
        }
      })
        res.data.dormitories.forEach(item=>{
        if (item.status===0) {
        return item.status='空'
        }if (item.status===1) {
         return item.status='学生入住'
        }if (item.status===2) {
         return item.status='老师入住'
        }if (item.status===3) {
         return item.status='废弃宿舍'
        }
      })
        this.tableData = res.data.dormitories
 
      }).catch(() => {
      })
    },
    ata() {
    return {
      form: {
        status: 1 // 初始值为1，表示"学生入住"
      }
    }
  },
}
});

</script>

<style lang='less' scoped>
</style>