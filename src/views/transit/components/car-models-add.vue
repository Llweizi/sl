<!-- 车型添加 -->
<template>
  <div>
    <el-dialog
      :title="addModelForm.id ? '编辑车型' : '新增车型'"
      :visible="isDialogShow"
      width="600px"
      @close="onClose"
    >
      <el-form
        ref="addModelFormRef"
        label-width="120px"
        style="width: 100%"
        :model="addModelForm"
        :rules="rules"
      >
        <el-form-item
          label="车辆类型:"
          prop="name"
        >
          <el-input
            v-model="addModelForm.name"
            placeholder="请输入车辆类型"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item
          label="应载重量:"
          prop="allowableLoad"
        >
          <el-input
            v-model="addModelForm.allowableLoad"
            type="text"
            placeholder="请输入车载重量"
            maxlength="10"
          ><i
            slot="suffix"
            class="weight"
          > 吨 </i>
          </el-input>
        </el-form-item>
        <el-form-item
          label="应载体积:"
          prop="allowableVolume"
        >
          <el-input
            v-model="addModelForm.allowableVolume"
            placeholder="请输入车载体积"
            maxlength="10"
            width="120px"
          >
            <i
              slot="suffix"
              class="weight"
            >立方</i>
          </el-input>
        </el-form-item>
        <el-form-item
          label="长:"
          prop="measureLong"
        >
          <el-input
            v-model="addModelForm.measureLong"
            placeholder="请输入长"
            maxlength="15"
            width="120px"
          >
            <i
              slot="suffix"
              class="weight"
            >米</i>
          </el-input>
        </el-form-item>
        <el-form-item
          label="宽:"
          prop="measureWidth"
        >
          <el-input
            v-model="addModelForm.measureWidth"
            placeholder="请输入宽"
            maxlength="15"
            width="120px"
          >
            <i
              slot="suffix"
              class="weight"
            >米</i></el-input>
        </el-form-item>
        <el-form-item
          label="高:"
          prop="measureHigh"
        >
          <el-input
            v-model="addModelForm.measureHigh"
            placeholder="请输入高"
            maxlength="15"
            width="120px"
          >
            <i
              slot="suffix"
              class="weight"
            >米</i></el-input>
        </el-form-item>
      </el-form>
      <div class="addbtn">
        <template v-solt="footer">
          <el-button
            type="warning"
            size="medium"
            @click="handlerCarmodeline"
          >确认</el-button>
          <el-button
            size="medium"
            @click="onClose"
          >取消</el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addSimleType, getTruckTypeId, updateSimleType } from '@/api/models'

export default {
  name: 'CarModelsAdd',
  props: {
    isDialogShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const allowableNum = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('内容不可为空'))
      } else if (value > 100) {
        return callback(new Error('只可输入1-100之间的整数'))
      } else {
        callback()
      }
    }
    const allowableLoad = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('应载重量不能为空'))
      }
      if (value > 100) {
        return callback(new Error('只可输入1-100之间的整数'))
      }
      const reg = /^\+?[1-9][0-9]*$/ // 正整数
      if (!reg.test(value)) {
        return callback(new Error('只能输入1-100之间的正整数,请重新输入'))
      } else {
        return callback()
      }
    }
    const validateVolume = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('应载体积不能为空'))
      }
      if (value > 100) {
        return callback(new Error('只可输入1-100之间的整数'))
      }
      const reg = /^\+?[1-9][0-9]*$/ // 正整数
      if (!reg.test(value)) {
        return callback(new Error('只能输入1-100之间的正整数,请重新输入'))
      } else {
        return callback()
      }
    }
    return {
      title: '新增车辆',
      start: 0,
      addModelForm: {
        allowableLoad: '',
        allowableVolume: '',
        goodsTypes: [],
        id: '',
        measureHigh: '0.0',
        measureLong: '0.0',
        measureWidth: '0.0',
        name: '',
        num: ''
      },
      rules: {
        name: [{ required: true, message: '车型名称不能为空', trigger: 'blur' }],
        allowableLoad: [{ required: true, message: '应载重量不能为空', trigger: 'blur' }, { validator: allowableLoad, trigger: 'blur' }],
        allowableVolume: [{ required: true, message: '应载体积不能为空', trigger: 'blur' }, { validator: validateVolume, trigger: 'blur' }],
        measureHigh: [{ validator: allowableNum, trigger: 'blur' }],
        measureWidth: [{ validator: allowableNum, trigger: 'blur' }],
        measureLong: [{ validator: allowableNum, trigger: 'blur' }]
      }
    }
  },
  methods: {
    onClose() {
      this.$refs.addModelFormRef.resetFields()
      this.addModelForm = {
        allowableLoad: '',
        allowableVolume: '',
        goodsTypes: [],
        id: '',
        measureHigh: '0.0',
        measureLong: '0.0',
        measureWidth: '0.0',
        name: '',
        num: ''
      }
      this.$emit('update:isDialogShow', false)
    },
    async getModelDetail(id) {
      this.addModelForm.id = id
      const { data } = await getTruckTypeId(this.addModelForm)
      delete data.goodsTypes
      delete data.num
      this.addModelForm = data
    },
    async handlerCarmodeline() {
      await this.$refs.addModelFormRef.validate()
      try {
        // 判断是否有id
        if (this.addModelForm.id) {
          await updateSimleType(this.addModelForm)
          this.$message.success('更新车型成功')
        } else {
          await addSimleType(this.addModelForm)
          this.$message.success('新增车型成功')
        }
      } catch (error) {
        console.log(error)
      }
      this.$emit('update-list')
      this.onClose()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input {
  width: 400px;
}
.weight {
  font-weight: 700;
}
.addbtn {
  margin-left:180px;
}
</style>
