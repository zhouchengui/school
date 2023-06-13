<!--  -->
<template>
  <div class=''>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-button @click="add" type="primary">新增</el-button>
      </el-col>
    </el-row>
    <el-table height="700" :data="tableData" style="width: 100%">
      <el-table-column label="学校编号" prop="id" width="180"></el-table-column>
      <el-table-column label="学校名称" prop="schoolName" width="180"></el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="180"></el-table-column>
      <el-table-column label="学校描述" prop="description" width="180"></el-table-column>
      <el-table-column label="省份" prop="province" width="180"></el-table-column>
      <el-table-column label="城市" prop="city" width="180"></el-table-column>
      <el-table-column label="地区" prop="area" width="180"></el-table-column>
      <el-table-column label="地址" prop="address" width="180"></el-table-column>
      <el-table-column label="纬度" prop="latitude" width="180"></el-table-column>
      <el-table-column label="经度" prop="longitude" width="180"></el-table-column>
      <!-- <el-table-column label="是否启用" prop="enable" width="180"></el-table-column> -->
      <el-table-column label="是否启用" prop="enable" width="180">
        <template #default="{ row }">
          <span>{{ row.enable === 1 ? "启用" : "未启用" }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="更新时间" prop="updateTime" width="180"></el-table-column>
      <el-table-column width="180" label="操作" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="学校编号" :label-width="formLabelWidth" prop="id">
          <el-input v-model="form.id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学校名称" :label-width="formLabelWidth" prop="schoolName">
          <el-input v-model="form.schoolName" autocomplete="off" v-on:blur = "validateName" />
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth" prop="createTime">
          <el-input v-model="form.createTime" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学校描述" :label-width="formLabelWidth" prop="description">
          <el-input v-model="form.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="省份" :label-width="formLabelWidth" prop="province">
          <el-input v-model="form.province" autocomplete="off" v-on:blur = "validateName" />
        </el-form-item>
        <el-form-item label="地区" :label-width="formLabelWidth" prop="area" >
          <el-input v-model="form.area" autocomplete="off"  v-on:blur = "validateName" />
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth" prop="city">
          <el-input v-model="form.city" autocomplete="off"  v-on:blur = "validateName" />
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"  v-on:blur = "validateName" />
        </el-form-item>
        <el-form-item label="经度" :label-width="formLabelWidth" prop="longitude">
          <el-input v-model="form.longitude" autocomplete="off"  v-on:blur = "validateName" />
        </el-form-item>
        <el-form-item label="纬度" :label-width="formLabelWidth" prop="latitude">
          <el-input v-model="form.latitude" autocomplete="off"  v-on:blur = "validateName" />
        </el-form-item>
        <!-- <el-table-column label="显示状态" prop="enable" width="180">
        <template #default="{ row }">
          <span>{{ row.enable === 1 ? "启用" : "未启用" }}</span>
        </template>
      </el-table-column> -->
        <el-form-item label="是否启用" :label-width="formLabelWidth" prop="enable" >
          <el-select v-model="form.enable" placeholder="是否启用">
            <el-option label="未启用 " :value="0" />
            <el-option label="启用" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="更新时间" :label-width="formLabelWidth">
          <el-input v-model="form.updateTime" autocomplete="off" />
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
import { allSchool, delSchool, addSchool, editSchool } from "../../http/index"
import { defineComponent } from "vue"
export default defineComponent({
  data () {
    return {
      addOrUpdate: 1,
      dialogTitle: '新增学校',
      formLabelWidth: 180,
      dialogFormVisible: false,
      tableData: [],
      form: {},
      //表单校验规则
      rules:{
          schoolName:[
            {required: true,message:"学校名称不能为空",trigger :"blur"}
          ],
          address:[
            {required: true,message:"学校地址不能为空",trigger :"blur"}
          ],
          latitude:[
            {required: true,message:"纬度不能为空",trigger :"blur"}
          ],
          longitude:[
            {required: true,message:"经度不能为空",trigger :"blur"}
          ],
          province:[
            {required: true,message:"省份不能为空",trigger :"blur"}
          ],
          area:[
            {required: true,message:"省|市不能为空",trigger :"blur"}
          ],
          city:[
            {required: true,message:"市不能为空",trigger :"blur"}
          ]
          
      }
    }
  },
  components: {

  },
  mounted () {
    this.allSchool()
  },
  methods: {
    primary () {
      if (this.addOrUpdate == 1) {
        addSchool(this.form).then(res => {
          console.log(res)
          this.dialogFormVisible = false
          this.allSchool()

        }).catch(() => {
        })
      } else {
        editSchool(this.form).then(res => {
          console.log(res)
          this.dialogFormVisible = false
          this.allSchool()

        }).catch(() => {
        })
      }

    },
    add () {
      this.dialogTitle = '新增学校'
      this.addOrUpdate = 1
      this.form = {}

      this.dialogFormVisible = true
    },
    handleEdit (e) {
      this.dialogTitle = '编辑学校'
      this.addOrUpdate = 2
      this.form = { ...e }
      this.dialogFormVisible = true
    },
    handleDelete (e) {
      console.log(e);
      delSchool(e).then(res => {
        console.log(res)
        this.allSchool()

      }).catch(() => {
      })

    },
    allSchool () {
      allSchool().then(res => {
        console.log(res)
        this.tableData = res.data.schools
      }).catch(() => {
      })
    },
    validateName(){
      if(!this.form.schoolName){
        this.$refs.form.validateField("rules.schoolName",'请输入学校名称',(message) =>{
                console.log('validateerror : ${message}');
        });
      }else{
        this.$refs.form.clearValidate("rules.shoolName");
      }
      if(!this.form.address){
        this.$refs.form.validateField("rules.address",'请输入学校地址',(message) =>{
                console.log('validateerror : ${message}');
        });
      }else{
        this.$refs.form.clearValidate("rules.address");
      }
      if(!this.form.latitude){
        this.$refs.form.validateField("rules.latitude",'请输入纬度',(message) =>{
                console.log('validateerror : ${message}');
        });
      }else{
        this.$refs.form.clearValidate("rules.latitude");
      }
      if(!this.form.longitude){
        this.$refs.form.validateField("rules.latitude",'请输入经度',(message) =>{
                console.log('validateerror : ${message}');
        });
      }else{
        this.$refs.form.clearValidate("rules.longitude");
      }
      if(!this.form.province){
        this.$refs.form.validateField("rules.province",'请输入省份',(message) =>{
                console.log('validateerror : ${message}');
        });
      }else{
        this.$refs.form.clearValidate("rules.province");
      }

    }
    
  }
});

</script>

<style lang='less' scoped>
</style>