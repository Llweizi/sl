<!-- 车型管理 -->
<template>
  <div class="dashboard-container operational-range customer-list-box">
    <div class="app-container">
      <el-card
        class="search-card-box"
        shadow="never"
      >
        <el-form
          :model="modelsListFormData"
          label-width="95px"
        >
          <el-row :gutter="60">
            <el-col :span="8">
              <el-form-item
                label="车型编号:"
                style="margin-bottom: 0px; margin-left: -20px"
              >
                <el-input
                  v-model="modelsListFormData.id"
                  clearable
                  placeholder="请输入车型编号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="应载重量:"
                style="margin-bottom: 0px;margin-left: -20px"
              >
                <el-select
                  v-model="modelsListFormData.allowableLoad"
                  filterable
                  clearable
                  placeholder="请选择应载重量"
                >
                  <el-option
                    v-for="item in loadOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="应载体积:"
                style="margin-bottom: 0px;margin-left: -20px"
                label-width="110px"
              >
                <el-select
                  v-model="modelsListFormData.allowableVolume"
                  filterable
                  clearable
                  placeholder="请选择应载体积"
                >
                  <el-option
                    v-for="item in volumeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              style="padding-left: 10px; padding-right: 30px;"
            >
              <el-form-item
                prop="username"
                label="车辆类型:"
                style="margin-top: 20px; margin-bottom: 0px;"
              >
                <el-input
                  v-model="modelsListFormData.name"
                  clearable
                  placeholder="请输入车辆类型"
                  width="100px"
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="8"
              style="padding-left: 20px; padding-right: 30px; margin-top: 20px;"
            >
              <el-button
                type="warning"
                @click="handlerSearch"
              >搜索</el-button>
              <el-button
                plain
                class="reset-btn"
                @click="resetLoginForm"
              >重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
    <div
      v-loading="listLoading"
      :class="{ 'loading-box': listLoading }"
      element-loading-text="加载中"
      style="margin-top: 20px"
    >
      <!-- 下面card部分 -->
      <el-card
        :key="tableKey"
        class="table-card-box"
        shadow="never"
        :data="modelsList"
        style="width: 100%; margin-left:20px; margin-top:-20px;"
      >
        <!-- 新增车辆按钮 -->
        <el-button
          class="addbtn"
          type="warning"
          @click="addCarmodel"
        >新增车型</el-button>
        <!-- 表格 -->
        <el-table
          border
          stripe
          :data="modelsList"
          style="width: 100%"
          :header-cell-style="{ background: 'rgba(250,252,255,1)' }"
        >
          <!-- 判断没有数据的时候 -->
          <div
            v-show="(!modelsList || modelsList.length <= 0 && !listLoading)"
            slot="empty"
            style="width: 100%;
                  min-height: 320px;
                  display: flex;
                  flex-flow: column;
                  align-items: center;
                  justify-content: center;"
          >
            <img
              src="static/img/icon-empty.3abd3b9a.png"
              alt="img"
              style=" width: 336px;height: 232px;"
            >
            <span
              style="font-size: 14px;
                     color: #818693;
                     line-height: 21px;"
            >没有找到您要的内容哦~</span>
          </div>
          <!-- 序号 -->
          <el-table-column
            align="left"
            label="序号"
            width="80px"
          >
            <template #default="row">
              <span>{{
                row.$index +
                  (modelsListFormData.page - 1) *
                  modelsListFormData.pageSize +
                  1
              }}
              </span>
            </template>
          </el-table-column>
          <!-- 车型编号 -->
          <el-table-column
            align="center"
            label="车型编号"
            min-width="190px"
          >
            <template #default="{ row }">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>
          <!-- 车辆类型 -->
          <el-table-column
            align="center"
            label="车型类型"
            min-width="130px"
          >
            <template #default="{ row }">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <!-- 车辆数量 -->
          <el-table-column
            align="center"
            label="车型数量"
            min-width="100px"
          >
            <template #default="{ row }">
              <span>{{ row.num }}</span>
            </template>
          </el-table-column>
          <!-- 应载重量 -->
          <el-table-column
            align="center"
            label="应载重量（吨）"
            min-width="150px"
          >
            <template #default="{ row }">
              <span>{{ row.allowableLoad }}</span>
            </template>
          </el-table-column>
          <!-- 应载体积 -->
          <el-table-column
            align="center"
            label="应载体积（立方米）"
            min-width="150px"
          >
            <template #default="{ row }">
              <span>{{ row.allowableVolume }}</span>
            </template>
          </el-table-column>
          <!-- 长(米) -->
          <el-table-column
            align="center"
            label="长（米）"
            min-width="100px"
          >
            <template #default="{ row }">
              <span>{{ row.measureLong }}</span>
            </template>
          </el-table-column>
          <!-- 宽(米) -->
          <el-table-column
            align="center"
            label="宽（米）"
            min-width="100px"
          >
            <template #default="{ row }">
              <span>{{ row.measureWidth }}</span>
            </template>
          </el-table-column>
          <!-- 高(米) -->
          <el-table-column
            align="center"
            label="高（米）"
            min-width="100px"
          >
            <template #default="{ row }">
              <span>{{ row.measureHigh }}</span>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
            align="center"
            label="操作"
            min-width="100px"
          >
            <template #default="{ row }">
              <el-link
                type="primary"
                :underline="false"
                @click="editModels(row.id)"
              >编辑</el-link>
              <div
                data-v-3e3e9b32=""
                class="el-divider el-divider--vertical"
              ></div>
              <el-button
                type="text"
                @click="delModels(row.id)"
              ><el-link
                type="danger"
                :underline="false"
              >删除</el-link>
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 底部分页 -->
        <div
          v-show="modelsList && modelsList.length > 0"
          class="pagination"
        >
          <div class="pages">
            <el-pagination
              :current-page="Number(modelsListFormData.page)"
              :total="Number(total)"
              :page-size="Number(modelsListFormData.pageSize)"
              :page-sizes="[5, 10, 15, 20]"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-card>
    </div>
    <!-- <empty
      v-show="(!modelsList || modelsList.length <= 0) && !listLoading"
    ></empty> -->
    <CarModelsAddVue
      ref="modelsListFormRef"
      :is-dialog-show.sync="isDialogShow"
      @update-list="getModelsList"
    ></CarModelsAddVue>
  </div>
</template>
<script>
import { delSimleType, getSimleType } from '@/api/models'
import CarModelsAddVue from './components/car-models-add.vue'

export default {
  name: 'CarModels',
  components: {
    CarModelsAddVue
  },
  data() {
    return {
      modelsList: [],
      tableKey: 0,
      total: null,
      listLoading: true,
      alertText: '',
      value: '',
      modelsListFormData: {
        page: 1,
        pageSize: 5,
        name: '',
        id: '',
        num: '',
        goodsTypes: '',
        showStatus: ''
      },
      loadOptions: [{
        value: 'RANGE_LEVEL_1',
        label: '<1.8(吨)'
      }, {
        value: 'RANGE_LEVEL_2',
        label: '1.6-8(吨)'
      }, {
        value: 'RANGE_LEVEL_3',
        label: '6-14(吨)'
      }, {
        value: 'RANGE_LEVEL_4',
        label: '14-30(吨)'
      }, {
        value: 'RANGE_LEVEL_5',
        label: '30-50(吨)'
      }, {
        value: 'RANGE_LEVEL_6',
        label: '50-100(吨)'
      }, {
        value: 'RANGE_LEVEL_7',
        label: '>100(吨)'
      }],
      volumeOptions: [{
        value: 'RANGE_LEVEL_1',
        label: '<3(m³)'
      }, {
        value: 'RANGE_LEVEL_2',
        label: '3-5(m³)'
      }, {
        value: 'RANGE_LEVEL_3',
        label: '5-10(m³)'
      }, {
        value: 'RANGE_LEVEL_4',
        label: '10-15(m³)'
      }, {
        value: 'RANGE_LEVEL_5',
        label: '15-30(m³)'
      }, {
        value: 'RANGE_LEVEL_6',
        label: '30-50(m³)'
      }, {
        value: 'RANGE_LEVEL_7',
        label: '50-80(m³)'
      }, {
        value: 'RANGE_LEVEL_8',
        label: '80-150(m³)'
      }, {
        value: 'RANGE_LEVEL_9',
        label: '150>(m³)'
      }],
      isDialogShow: false
    }
  },
  created () {
    this.initialDate()
    // 创建时监听：
    window.addEventListener('keydown', this.handleKeyDown, true)// 开启键盘监听模式
  },
  methods: {
    // 回车键刷新
    handleKeyDown(e) {
      let key = null
      if (window.event === undefined) {
        key = e.keyCode
      } else {
        key = window.event.keyCode
      }
      if (key === 13) {
        this.handlerSearch()
      }
    },
    initialDate() {
      this.resetLoginForm()
      this.handlerSearch()
      this.getModelsList()
    },
    handleSizeChange(newpageSize) {
      this.modelsListFormData.pageSize = newpageSize
      this.getModelsList()
    },
    handleCurrentChange(newPage) {
      this.modelsListFormData.page = newPage
      this.getModelsList()
    },
    // 获取初始数据
    async getModelsList(data = this.modelsListFormData) {
      this.listLoading = true
      const res = await getSimleType(this.modelsListFormData)
      this.modelsList = res.data.items
      this.total = res.data.counts
      this.listLoading = false
    },
    // 搜索按钮
    async handlerSearch() {
      await this.getModelsList(this.modelsListFormData)
      this.modelsListFormData.page = 1
    },
    // 添加数据
    addCarmodel() {
      this.isDialogShow = true
    },
    // 删除数据
    async delModels(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delSimleType(id)
          this.getModelsList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑功能
    async editModels(id) {
      this.isDialogShow = true
      await this.$refs.modelsListFormRef.getModelDetail(id)
    },
    // 重置按钮
    resetLoginForm () {
      Object.assign(this.$data, this.$options.data())
      this.getModelsList()
    }
  }
}
</script>
<style lang="scss" scoped>
.alert {
  margin: 10px 0px;
}
.pagination {
  margin-top: 40px;
}
.operational-range {
  .el-card {
    overflow: initial;
  }
}
.addbtn {
  margin-bottom: 20px;
}
.el-input {
  width: 280px !important;
}
/deep/ .el-select{
  width: 100%;
}
</style>
