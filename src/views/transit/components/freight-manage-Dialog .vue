<template>
  <el-dialog
    :title="form.id ? '编辑数据': '新增模板' "
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
      <el-form-item
        v-model="form.associatedCityList[1]"
        label="关联城市"
      >

        <span v-if="form.templateType === '3'">
          <!-- <el-checkbox
            v-model="checked1"
            value="'2'"
            label="[2,'京津冀']"
          >京津冀</el-checkbox>
          <el-checkbox
            v-model="checked2"
            value="'3'"
            label="[3,'江浙沪']"
          >江浙沪</el-checkbox>
          <el-checkbox
            v-model="checked3"
            value="'4'"
            label="[4,'川渝']"
          >川渝</el-checkbox>
          <el-checkbox
            v-model="checked4"
            value="'5'"
            label="[5,'黑吉辽']"
          >黑吉辽</el-checkbox> -->
          <el-checkbox-group v-model="form.associatedCityList">
            <el-checkbox label="2">京津冀</el-checkbox>
            <el-checkbox label="3">江浙沪</el-checkbox>
            <el-checkbox label="4">川渝</el-checkbox>
            <el-checkbox label="5">黑吉辽</el-checkbox>
          </el-checkbox-group>
        </span>
        <span
          v-else
          label="全国"
        >全国</span>
      </el-form-item>

      <!-- 首重价格 -->
      <el-form-item
        label="首重价格"
        prop="firstWeight"
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
      <el-form-item
        label="续重价格"
        prop="continuousWeight"
      >
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
        prop="lightThrowingCoefficient"
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
//  postManagerCarriages新增
// getManagerCarriages,
import { postManagerCarriages } from '@/api/branch'
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
        associatedCityList: ['1'],
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
        firstWeight: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        continuousWeight: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        lightThrowingCoefficient: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      changeRow: {}
    }
  },
  watch: {
    'form.templateType': {
      handler(newval) {
        // console.log(newval, oldval)
        if (newval !== '3') {
          this.form.associatedCityList = ['1']
        } else {
          console.log(1111)
          this.form.associatedCityList = []
        }
        // console.log(typeof (newval))
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async submit() {
      if (this.form.id) {
        const res = await postManagerCarriages(this.form)
        if (res.msg === 'ok') {
          this.$message.success('编辑成功')
        } else {
          this.$message.warning(res.msg)
        }
      } else {
        const res = await postManagerCarriages(this.form)
        // 需拿到 Network中 返回的preview中的msg 的返回值
        if (res.msg === 'ok') {
          this.$message.success('添加成功')
        } else {
          this.$message.warning(res.msg)
        }
      }
      this.closebox()
    },
    async closebox() {
      this.$emit('update:dialog-visible', false)
      this.getformList()

      setTimeout(() => {
        this.form = {
          associatedCityList: ['1'],
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

        }
      }, 500)
    },
    async getformList() {
      // const { data } = await getManagerCarriages()
      // console.log(data)
      this.$emit('getlockList')
    },
    async changeid(row) {
      // console.log(row)
      this.changeRow = row
      this.form.templateType = this.changeRow.templateType.toString()
      this.form.transportType = this.changeRow.transportType.toString()
      this.form.associatedCityList = this.changeRow.associatedCityList
      this.form.firstWeight = this.changeRow.firstWeight
      this.form.continuousWeight = this.changeRow.continuousWeight
      this.form.lightThrowingCoefficient = this.changeRow.lightThrowingCoefficient
      this.form.id = this.changeRow.id
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
