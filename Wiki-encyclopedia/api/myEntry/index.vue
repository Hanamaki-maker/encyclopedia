<template>
  <div>
    <el-row class="versionHistory" style="max-width:1080px;margin: 40px auto 20px">
      <el-col :span="4">
        <el-image src="" style="width: 160px;height: 160px;padding:10px"></el-image>
      </el-col>
      <el-col :span="20" style="margin-top: 10px;font-size: 26px;">
        <el-row
          style="padding: 20px 40px;font-size: 20px;font-weight: bold;color:rgb(51, 140, 230);border-bottom: 1px solid #eee"
        >
          Creator
        </el-row>
        <el-row>
          <el-col :span="4" style="border-right: 1px solid #eee;">
            <el-row style="text-align: center;padding: 15px 0;font-weight: bold;color:#444">
              提交版本
            </el-row>
            <el-row style="text-align: center;padding: 15px 0;color:#444">
              {{ userStatisticsObj.submitVersionCount }}
            </el-row>
          </el-col>
          <el-col :span="4" style="border-right: 1px solid #eee;">
            <el-row style="text-align: center;padding: 15px 0;font-weight: bold;color:#444">
              通过版本
            </el-row>
            <el-row style="text-align: center;padding: 15px 0;color:#444">
              {{ userStatisticsObj.passVersionCount }}
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row style="text-align: center;padding: 15px 0;font-weight: bold;color:#444">
              通过率
            </el-row>
            <el-row style="text-align: center;padding: 15px 0;color:#444">
              {{ userStatisticsObj.passRatio }}%
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div style="max-width: 1280px;margin: 0 auto">
      <div style="display: flex; justify-content: space-between; height: 50px;margin-top: 40px;">
        <ul class="statusList" style="margin-left: 40px;margin-top: 10px;">
          <li
                  v-for="(item, index) in statusList"
                  :key="index"
                  :class="item.choosed ? 'choosed' : ''"
                  @click="chooseStatus(item)"
          >
            {{ item.name }}
          </li>
        </ul>
        <el-form :inline="true" :model="search" class="demo-form-inline searchEntry"  v-show="showSearch">
          <el-form-item>
            <el-input v-model="search.keywords" placeholder="请输入词条名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="userEntryList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table class="departTable" :data="MyEntryList" border style="width: 100%">
        <el-table-column prop="ENTRY_NAME" label="词条名称" width="180"></el-table-column>
        <el-table-column label="保存时间" width="180">
          <template slot-scope="scope">
            {{ parseTime(scope.row.CREATE_TIME) }}
          </template>
        </el-table-column>
        <el-table-column label="提交时间" width="180">
          <template slot-scope="scope">
            {{ parseTime(scope.row.CREATE_TIME) }}
          </template>
        </el-table-column>
        <el-table-column label="审核时间" width="180">
          <template slot-scope="scope">
            {{ parseTime(scope.row.AUDIT_TIME) }}
          </template>
        </el-table-column>
        <el-table-column prop="AUDITOR" label="审核人员" width=""></el-table-column>
        <el-table-column prop="AUDIT_CONTENT" label="审核意见"></el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              style="color: #6b9cec;"
              v-if="scope.row.STATE - 0 === 1 || scope.row.STATE - 0 === 4"
              @click="modifyEntry(scope.row)"
              type="text"
              size="small"
            >
              继续修改
            </el-button>
            <el-button
              style="color: #ec6b6b;"
              v-if="scope.row.STATE - 0 === 1"
              @click="deleteEntry(scope.row)"
              type="text"
              size="small"
            >
              删除
            </el-button>
            <el-button
              style="color: #33e37d;"
              @click="seeEntry(scope.row)"
              type="text"
              size="small"
            >
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.page"
        :page-size="pagination.limit"
        layout="total, sizes, prev, pager, next"
        :total="pagination.count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { userEntryList, userStatistics } from '@/api/onlyShowData/index.js'
import { deleteEntry } from '@/api/entry/index.js'
import { parseTimeYMD } from '@/utils/commonMethod.js'
import ElImage from '../../../node_modules/element-ui/packages/image/src/main.vue'
export default {
  components: { ElImage },
  name: 'myEntry',
  data() {
    return {
      search:{},
      statusList: [
        { id: '1', name: '草稿', choosed: true },
        { id: '2', name: '待审核' },
        { id: '5', name: '已通过' },
        { id: '4', name: '未通过' }
      ],
      MyEntryList: [],
      showSearch: true,
      status: '1',
      pagination: {
        page: 1,
        limit: 10,
        count: 0
      },
      userStatisticsObj: {} //统计数据
    }
  },
  watch: {
    status() {
      this.pagination.page = 1
      this.userEntryList()
    }
  },
  created() {
    let vm = this
    Cetc10Auth().init(function() {
      vm.userEntryList()
      vm.userStatistics()
    })
  },
  methods: {
    userStatistics() {
      userStatistics().then(res => {
        this.userStatisticsObj = res.data
      })
    },
    modifyEntry(item) {
      this.$router.push({
        name: 'editEntry',
        query: {
          entryId: item.ENTRY_ID,
          versionId: item.ID,
          viewType: 'preview'
        }
      })
    },
    deleteEntry(item) {
      this.$confirm('确认删除当前词条？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(() => {
          deleteEntry({
            entryId: item.ENTRY_ID,
            versionId: item.ID
          }).then(() => {
            this.$message('删除成功')
            this.pagination.page = 1
            this.userEntryList()
          })
        })
        .catch(e => {
          console.log(e)
        })
    },
    seeEntry(item) {
      this.$router.push({
        name: 'viewEntry',
        query: {
          entryId: item.ENTRY_ID,
          versionId: item.ID,
          viewType: 'preview'
        }
      })
    },

    parseTime(str) {
      return parseTimeYMD(str)
    },
    handleSizeChange(val) {
      this.pagination.page = 1
      this.pagination.limit = val
      this.userEntryList()
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      this.userEntryList()
    },
    userEntryList() {
      console.log(this.search.keywords);
      userEntryList({
        pageNumber: this.pagination.page,
        pageSize: this.pagination.limit,
        auditState: this.status,
        entry_name: this.search.keywords,
        userChineseName: JSON.parse(sessionStorage.getItem('user')).userId
      })
        .then(res => {
          this.MyEntryList = res.data.records
          this.pagination.count = res.data.total

        })
        .catch(e => {
          console.log(e)
        })
    },
    chooseStatus(item) {
      if(item.id === '1') {
        this.showSearch = true
      } else {
        this.showSearch = false
      }
      this.statusList.map(item => {
        item.choosed = false
      })
      this.status = item.id
      item.choosed = true
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-button {
  background: none;

  font-size: 26px;
}
/deep/ .el-table {
  thead {
    font-size: 28px;
    .cell {
      text-align: left; // table 表头 左对齐
    }
    th,
    tr,
    td {
      background: linear-gradient(to bottom, #ededed, #ffffff, #ededed) !important;
    }
  }
  .cell {
    text-align: left;
  }
  .delete-row {
    color: #d8d8d8;
  }

  .el-table__expand-icon {
    //修改 el-tabel 折叠按钮的位置
    float: right;
  }

  // 去掉table的border start----------------------------
  border: 0;
  th,
  tr,
  td {
    font-size: 26px;
    background: #fbfbfb;
    border: 0;
  }
  &::before {
    height: 0;
  }
  &::after {
    width: 0;
  }
  &:hover {
    cursor: pointer;
    background: #e6e6e6;
  }

  .el-table__fixed:before {
    height: 0;
  }
  // 去掉table的border end----------------------------
}
.searchEntry{
  .el-button{
    background-color: #337ab7;
    color: #fff;
  }
}
.statusList {
  li {
    display: inline-block;
    background: #e6e6e6;
    color: #adadad;
    font-weight: bold;
    font-size: 26px;
    width: 90px;
    text-align: center;
    border-right: 1px solid #d0d0d0;
    line-height: 40px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;
  }
  .choosed {
    background: #337ab7;
    color: white;
  }
}
</style>
