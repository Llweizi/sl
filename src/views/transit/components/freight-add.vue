<template>
  <el-dialog
    title="提示"
    :visible="dialogVisible"
    width="40%"
    class="diaglog__font"
    @close="closebox"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="110px"
      :rules="rules"
    >
      <!--  模板类型 -->
      <el-form-item
        label="模板类型"
      >
        <el-select
          v-model="form.templateType"
          class="select__width"
          placeholder="请选择模板类型"
          label-width="100%"
        >
          <el-option
            label="同城寄"
            value="1"
          ></el-option>
          <el-option
            label="省内寄"
            value="2"
          ></el-option>
          <el-option
            label="经济区互寄"
            value="3"
          ></el-option>
          <el-option
            label="跨省"
            value="4"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 运送类型 -->
      <el-form-item label="运送类型">
        <el-select
          v-model="form.transportType"
          placeholder="请选择运送类型"
          class="select__width"
        >
          <el-option
            label="普快"
            value="1"
          ></el-option>
          <el-option
            label="特快"
            value="2"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 管连城市 -->
      <el-form-item label="关联城市">
        <span>全国</span>
      </el-form-item>

      <!-- 首重价格 -->
      <el-form-item
        label="首重价格"
        prop="region"
      >
        <el-input
          v-model="form.firstWeight"
          placeholder="请输入首重价格"
          type="text"
        ><span
          slot="append"
          class="money"
        >元</span></el-input>
      </el-form-item>

      <!-- 续重价格 -->
      <el-form-item label="续重价格">
        <el-input
          v-model="form.continuousWeight"
          type="text"
          placeholder="请输入续重价格"
        ><span
          slot="append"
          class="money"
        >元</span></el-input>
      </el-form-item>

      <!-- 轻抛系数 -->
      <el-form-item
        label="轻抛系数"
        prop="Price"
      >
        <el-input
          v-model="form.lightThrowingCoefficient"
          placeholder="请输入轻抛系数"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row
        type="flex"
        justify="center"
      >
        <el-button
          type="primary"
          class="btn"
          @click="submit()"
        >确 定</el-button>
        <el-button
          class="btn1"
          @click="closebox()"
        >取 消</el-button>
      </el-row>
    </template>

  </el-dialog>
</template>

<script>
import { getManagerCarriages, postManagerCarriages } from '@/api/branch'
export default {
  name: 'FreightManageDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        associatedCityList: [1, '全国'],
        computeWeight: '',
        continuousWeight: '',
        created: '',
        expense: '',
        firstWeight: '',
        id: '',
        lightThrowingCoefficient: '',
        templateType: '',
        transportType: '',
        updated: ''
      },
      rules: {
        region: [
          { required: true, message: '模板类型不能为空', trigger: 'change' }
        ],
        Price: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  // mounted() {
  //   this.$emit('getlockList')
  // },
  methods: {
    async submit() {
      await postManagerCarriages(this.form)
      // 需拿到 Network中 返回的preview中的msg 的返回值
      this.$message.success('添加成功')
      this.closebox()
    },
    closebox() {
      this.$emit('update:dialog-visible', false)
      this.getformList()
    },
    async getformList() {
      const { data } = await getManagerCarriages()
      console.log(data)
      this.$emit('getlockList')
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
.diaglog__font{
  font-weight:0
}
.select__width{
  width: 100%;
}
.btn{
    background-color: #e15536;
    color: #fff;
    width: 90px;
    border-radius: 5px;
    font-weight: 400;
    border: 1px solid #e15536;
}
.btn1{
    width: 90px;
    border-radius: 5px;
    font-weight: 400;
}

</style>
