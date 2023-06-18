<!-- 订单管理 -->
<template>
  <div
    class="dashboard-container order-list customer-list-box "
  >
    <div class="app-container">
      <el-card
        class="table-card-box"
        shadow="never"
      >
        <el-form
          ref="orderFormData"
          :model="orderFormData"
          label-width="80px"
        >
          <el-row :gutter="60">
            <el-col :span="8">
              <el-form-item
                label="订单编号:"
                style="margin-bottom: 0px"
                label-width="110px"
              >
                <el-input
                  v-model="orderFormData.id"
                  placeholder="请输入订单编号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="订单状态:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <el-select
                  v-model="orderFormData.status"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in status"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="付费状态:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <el-select
                  v-model="orderFormData.paymentStatus"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in paymentStatus"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="发件人姓名:"
                style="margin-bottom: 0px"
                label-width="110px"
              >
                <el-input
                  v-model="orderFormData.senderName"
                  placeholder="请输入发件人姓名"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="发件人电话:"
                style="margin-bottom: 0px"
                label-width="110px"
              >
                <el-input
                  v-model="orderFormData.senderPhone"
                  placeholder="请输入发件人电话"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="发件人地址:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <el-row
                  :gutter="4"
                  type="flex"
                >
                  <el-col :span="8">
                    <el-select
                      v-model="orderFormData.senderProvinceId"
                      clearable
                      placeholder="请选择省"
                      @change="changeCity"
                    >
                      <el-option
                        v-for="item in senderProvinceId"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select
                      v-model="orderFormData.senderCityId"
                      clearable
                      placeholder="请选择市"
                      @change="changeCityCity"
                    >
                      <el-option
                        v-for="item in senderCityId"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select
                      v-model="orderFormData.senderCountyId"
                      clearable
                      placeholder="请选择县/区"
                    >
                      <el-option
                        v-for="item in senderCountyId"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="收件人姓名:"
                style="margin-bottom: 0px"
                label-width="110px"
              >
                <el-input
                  v-model="orderFormData.receiverName"
                  placeholder="请输入收件人姓名"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="收件人电话:"
                style="margin-bottom: 0px"
                label-width="110px"
              >
                <el-input
                  v-model="orderFormData.receiverPhone"
                  placeholder="请输入收件人电话"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="收件人地址:"
                style="margin-bottom: 20px"
                label-width="110px"
              >
                <el-row
                  :gutter="4"
                  type="flex"
                >
                  <el-col :span="8">
                    <el-select
                      v-model="orderFormData.receiverProvinceId"
                      clearable
                      placeholder="请选择省"
                      @change="changeProvince"
                    >
                      <el-option
                        v-for="item in receiverProvinceId"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select
                      v-model="orderFormData.receiverCityId"
                      clearable
                      placeholder="请选择市 "
                      @change="changeReCity"
                    >
                      <el-option
                        v-for="item in receiverCityId"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select
                      v-model="orderFormData.receiverCountyId"
                      clearable
                      placeholder="请选择县/区"
                    >
                      <el-option
                        v-for="item in receiverCountyId"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>

            <el-col
              :span="8"
              style="padding-left:50px"
            >
              <el-button
                type="warning"
                @click="handleFilter"
              >搜索</el-button>
              <el-button
                plain
                class="reset-btn"
                @click="resetForm"
              >重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <el-card
        shadow="never"
        class="table-card-box"
        style="margin-top:20px"
      >
        <template>
          <el-table
            ref="multipleTable"
            :data="tableData"
            fit
            stripe
            :header-cell-style="{ background: 'rgba(250,252,255,1)' }"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="date"
              label="序号"
              width="100"
            >
              <template slot-scope="scope">
                <span>{{
                  scope.$index +
                    (orderFormData.page - 1) *
                    orderFormData.pageSize +
                    1
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              label="订单编号"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="transportOrder.id"
              label="运单编号"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="下单时间"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="status"
              label="订单状态"
              width="120"
            >
              <template slot-scope="scope">
                <span
                  v-if="scope.row.status== 23000"
                >待取件</span>
                <span v-else-if="scope.row.status == 23001">已取件</span>
                <span v-else-if="scope.row.status == 23005">运输中</span>
                <span v-else-if="scope.row.status == 23008">派送中</span>
                <span v-else-if="scope.row.status == 23009">已签收</span>
                <span v-else-if="scope.row.status == 23010">拒收</span>
                <span v-else-if="scope.row.status == 230011">已取消</span>
                <span v-else-if="scope.row.status == 0">全部</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="senderName"
              label="发件人姓名"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="senderPhone"
              label="发件人电话"
              width="120"
            >
            </el-table-column>
            <el-table-column
              label="发件人地址"
              width="120"
            >
              <template slot-scope="{row}">
                {{ row.senderProvince.name }}
                {{ row.senderCity.name }}
                {{ row.senderCounty.name }}
                {{ row.senderAddress }}
              </template>
            </el-table-column>
            <el-table-column
              prop="receiverName"
              label="收件人姓名"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="receiverPhone"
              label="收件人电话"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="receiverAddress"
              label="收件人地址"
              width="120"
            >
              <template slot-scope="{row}">
                {{ row.receiverProvince.name }}
                {{ row.receiverCity.name }}
                {{ row.receiverCounty.name }}
                {{ row.receiverAddress }}
              </template>
            </el-table-column>
            <el-table-column
              prop="pickupType"
              label="取件类型"
              width="120"
            >
              <template slot-scope="scope">
                <span
                  v-if="scope.row.pickupType==1"
                >网点自寄</span>
                <span v-else-if="scope.row.pickupType==0">上门取件</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="paymentMethod"
              label="付费类型"
              width="120"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.paymentMethod == 1">预结</span>
                <span v-else-if="scope.row.paymentMethod==2">到付</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="paymentStatus"
              label="付费状态"
              width="120"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.paymentStatus == 1">未付</span>
                <span v-else-if="scope.row.paymentStatus == 2">已付</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100"
            >
              <template #default="{ row }">
                <el-button
                  type="text"
                  size="small"
                  @click="handleClick(row.id)"
                >查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <!-- end -->
        <!-- 分页 -->

        <el-pagination
          :page-sizes="[10, 20, 30, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>

      </el-card>
    </div>
  </div>
</template>
<script>
import { areaList } from '@/api/common.js'
import { orderList } from '@/api/order'
// import pickupstatus from '@/api/pickupstatus.json'
import status from '@/api/orderstatus.json'
export default {
  data() {
    return {
      // 页数和当前页,请求接口的参数
      orderFormData: {
        page: 1,
        pageSize: 10,
        id: '', // 订单编号
        senderName: '', // 发件人姓名
        receiverName: '', // 收件人姓名
        senderPhone: '', // 发件人电话
        receiverPhone: '', // 收件人电话
        status: '', // 订单状态
        paymentStatus: '', // 付费状态
        receiverAddress: '', // 收件人详细地址
        receiverCityId: '',
        receiverCountyId: '',
        receiverProvinceId: '',
        senderAddress: '', // 发件人详细地址
        senderCityId: '',
        senderCountyId: '',
        pickupType: '', // 取件类型
        senderProvinceId: ''
      },
      // 取件类型
      // pickupType: [],
      // 付费状态
      paymentStatus: [
        {
          id: 1,
          name: '未付'
        },
        {
          id: 2,
          name: '已付'
        }
      ],
      // 订单状态
      status: [],
      // 绑定的请求过来的分页数据
      tableData: [],
      // 总条数
      total: 0,
      senderProvinceId: [], // 发件人省
      senderCityId: [], // 发件人市
      senderCountyId: [], // 发件人县
      receiverProvinceId: [], // 收件人省
      receiverCityId: [], // 收件人市
      receiverCountyId: [], // 收件人县
      areaList: {
        parentId: ''
      }
    }
  },
  created() {
    // 初始化
    this.loadList()
    // 获取订单状态
    this.getstatus()
    // 获取行政区域简要信息列表
    this.getOrder()
  },
  methods: {
    // 获取行政区域简要信息列表
    async getOrder() {
      const { data: res } = await areaList()
      this.senderProvinceId = res
      this.receiverProvinceId = res
    },
    // 发件人省
    async changeCity(val) {
      this.areaList.parentId = val
      const { data } = await areaList(this.areaList)
      this.senderCityId = data
      this.orderFormData.senderCityId = ''
      this.orderFormData.senderCountyId = ''
      // const res = this.senderProvinceId.filter(item => item.areaId === val)
      // console.log(res)
      // this.senderCityId = res[0].cities
      // console.log(this.senderCityId)
    },
    // 发件人市
    async  changeCityCity(val) {
      this.areaList.parentId = val
      const { data } = await areaList(this.areaList)
      this.senderCountyId = data
      this.orderFormData.senderCountyId = ''
      // const res = this.senderCityId.filter(item => item.areaId === val)
      // this.senderCountyId = res[0].counties
    },
    // 收件人省
    async  changeProvince(val) {
      this.areaList.parentId = val
      const { data } = await areaList(this.areaList)
      this.receiverCityId = data
      this.orderFormData.receiverCityId = ''
      this.orderFormData.receiverCountyId = ''
      // const res = this.receiverProvinceId.filter(item => item.areaId === val)
      // // this.orderFormData.receiverProvince.name = res[0].areaName
      // // console.log(this.orderFormData)
      // this.receiverCityId = res[0].cities
    },
    // 收件人市
    async  changeReCity(val) {
      this.areaList.parentId = val
      const { data } = await areaList(this.areaList)
      this.receiverCountyId = data
      this.orderFormData.receiverCountyId = ''
      // console.log(val)
      // const res = this.receiverCityId.filter(item => item.areaId === val)
      // // console.log(res)
      // this.receiverCountyId = res[0].counties
    },

    // 获取取件类型
    // getpickupType() {
    //   this.pickupType = pickupstatus
    // },
    // 获取订单状态
    getstatus() {
      this.status = status
    },
    // 重置
    async resetForm() {
      await this.$refs.orderFormData.resetField
      this.orderFormData = {
        page: 1,
        pageSize: 10,
        id: '', // 订单编号
        senderName: '', // 发件人姓名
        receiverName: '', // 收件人姓名
        senderPhone: '', // 发件人电话
        receiverPhone: '', // 收件人电话
        status: '', // 订单状态
        paymentStatus: '', // 付费状态
        receiverAddress: '', // 收件人详细地址
        receiverCityId: '',
        receiverCountyId: '',
        receiverProvinceId: '',
        senderAddress: '', // 发件人详细地址
        senderCityId: '',
        senderCountyId: '',
        pickupType: '', // 取件类型
        senderProvinceId: ''
      }
    },
    // 搜索信息
    async  handleFilter() {
      const { data } = await orderList(this.orderFormData)
      this.total = Number(data.counts)
      this.tableData = data.items
    },
    handleSelectionChange() {},
    // 渲染分页数据
    async loadList() {
      try {
        const { data } = await orderList(this.orderFormData)
        this.total = Number(data.counts)
        this.tableData = data.items
      } catch (error) {
        console.log(error)
      }
    },
    // pageSize 改变时会触发
    handleSizeChange(val) {
      this.orderFormData.pageSize = val
      this.loadList()
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.orderFormData.page = val
      this.loadList()
    },
    // 跳转运单详情
    handleClick(id) {
      this.$router.push({
        path: '/business/edit-order',
        query: { id: id }
      })
    }

  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.alert {
  margin: 10px 0px;
}
.pagination {
  margin-top: 40px;
}

// 下拉框
/deep/ .el-select {
  width: 100%;
}

</style>

<style lang="scss" scoped>
.order-list /deep/ .el-table td,
.el-table th {
  padding: 12px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
  overflow: hidden;
}
.el-pagination{
  text-align: center;
  margin: 10px;
}
</style>
