<!-- 运费管理 -->
<template>
  <div class="dashboard-container waybill-list customer-list-box">
    <el-card class="box-card">
      <el-button
        class="Editbtn"
        @click="openDlog()"
      >新增模板</el-button>
      <template>

        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <!--  -->

          <el-table-column
            prop="templateType"
            label="模板类型"
            :formatter="templateTypefn"
          >

          </el-table-column>

          <el-table-column
            prop="transportType"
            label="运送类型"
            :formatter="transportTypefn"
          >
          </el-table-column>

          <el-table-column
            prop="associatedCityList"
            label="关联城市"
          >
            <!--使用插槽 拿到关联城市  -->
            <template #default="{row}">
              <span
                v-for="(item,index) in row.associatedCityList"
                :key="index"
              >
                {{ city[item] }}
              </span>
              <!-- {{ row.associatedCityList[1] }} -->
            </template>
          </el-table-column>

          <el-table-column
            prop="firstWeight"
            label="首重"
          >
          </el-table-column>
          <el-table-column
            prop="continuousWeight"
            label="续重"
          >
          </el-table-column>
          <el-table-column
            prop="lightThrowingCoefficient"
            label="轻抛系数"
          >
          </el-table-column>
          <el-table-column

            label="操作"
            align="center"
          >
            <template #default="{ row }">
              <el-link
                type="primary"
                :underline="false"
                @click="openDlog(row)"
              >编辑</el-link>
              <div
                data-v-3e3e9b32=""
                class="el-divider el-divider--vertical"
              ></div>
              <el-button
                type="text"
                @click="delManager(row.id)"
              ><el-link
                type="danger"
                :underline="false"
              >删除</el-link>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
    <firightManage
      ref="sunRef"
      :dialog-visible.sync="dialogVisible"
      @getlockList="getlockList"
    />
  </div>
</template>

<script>
// getManagerCarriages
import { getManagerCarriages, delManagerCarriages } from '@/api/branch'
import firightManage from '@/views/transit/components/freight-manage-Dialog .vue'
import { formtemplateType, transportType } from '@/api/branchidname'
//  associatedCityList,
export default {
  components: {
    firightManage
  },
  data() {
    return {
      tableData: [],
      tableDataid: 0,
      // formOfEmployment: ,// 关联城市
      dialogVisible: false,
      Templatetype: '',
      fatherid: {},
      dataList: '',
      city:
        {
          '1': '全国',
          '2': '京津冀',
          '3': '江浙沪',
          '4': '川渝',
          '5': '黑吉辽'
        }
    }
  },
  async mounted() {
    await this.getlockList()
    // switch (this.Templatetype) {
    //   case 1:
    //     '全国'
    //     break
    //   case 2:
    //     '省内寄'
    //     break
    //   case 3:
    //     '经济区互寄'
    //     break
    //   case 4:
    //     '跨省'
    //     break
    //   default:
    // }
  },
  methods: {
    async getlockList() {
      const { data } = await getManagerCarriages()
      this.tableData = data
    },
    // 删除当前行
    async delManager(id) {
      await this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delManagerCarriages(id)
        this.$message.success('删除成功')
        this.getlockList()
      }).catch((error) => {
        console.log(error)
        this.$message('删除失败')
      })
    },
    openDlog(row) {
      this.dialogVisible = true
      if (row) {
        this.$refs.sunRef.changeid(row)
      }
    },
    // 枚举
    templateTypefn(row) {
      // console.log(row)
      const current = formtemplateType.find(item => item.id === row.templateType)
      console.log(current.name)
      return current.name
    },
    transportTypefn(row) {
      // console.log(row)
      const current = transportType.find(item => item.id === row.transportType)
      return current.name
    }

  }
}

</script>

<style lang="scss" scoped rel="stylesheet/scss">
.waybill-list {
  .el-dialog__wrapper {
    /deep/ .el-dialog__body {
      padding-left: 0px;
    }
  }
}
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    padding: 10px;
    margin: 20px;
    border: 1px solid #ebeef5;
  }

  .Editbtn{
    width: 100px;
    height: 40px;
    background: #e15536;
    border-radius: 4px;
    border-color: transparent;
    color: white;
    margin-bottom: 20px;
}

//  .Edit{
//    margin-right: 5px;
//   // border-right: #000,1px,solid ;
//  }
//  .Delete{
//   margin-left: 5px;
//   // border-right: #000,1px,solid ;
//  }
 .el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 1em;
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
}
</style>

