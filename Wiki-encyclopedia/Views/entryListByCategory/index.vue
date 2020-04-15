<template>
  <div style="margin-bottom: 20px">
    <ul class="categoryList">
      <li
        v-for="(item, index) in categoryList"
        :key="index"
        :class="item.choosed ? 'highlight' : ''"
        @click="choose(item)"
      >
        <p>
          {{ item.name }}
<!--          <span style="font-size: 26px;vertical-align: top;" v-if="hasFinishAjax && item.choosed">-->
<!--            ({{ pagination.count }})-->
<!--          </span>-->
        </p>
      </li>
    </ul>
    <ul class="third-menu" v-show="thirdMenu.length">
      <li @click="list" :class="thirdMenu ? 'highlight' : ''">
        <p>
          全部({{ thirdAll }})
          <span style="font-size: 26px;vertical-align: top;"></span>
        </p>
      </li>
      <li
        v-for="(item, index) in thirdMenu"
        :key="index"
        @click="entryDetail(item, index)"
        :class="hasFinishAjax && index === thirdMenuIndex ? 'highlight' : ''"
      >
        <p>
          {{ item.name }}
          <span
            style="font-size: 26px;vertical-align: top;"
            v-if="hasFinishAjax && index === thirdMenuIndex"
          >
            ({{ thirdTotal }})
          </span>
        </p>
      </li>
    </ul>
    <ul class="entryList">
      <li v-for="(item, index) in entryListData" :key="index" @click="seeEntry(item)">
        <img
          v-if="item.SUMMARY.length && item.SUMMARY[0].summary && item.img"
          :src="baseUrlConfig.IMG_PREFIX + item.img"
          alt=""
        />
        <img v-else src="/static/image/tank.png" alt="" />
        <div>
          <p class="entry-title">{{ item.ENTRY_NAME }}</p>
          <div v-if="item.SUMMARY.length && item.SUMMARY[0].summary" v-html="$options.filters.labelChange(item.text)"></div>
        </div>
      </li>
    </ul>
    <div class="noDataRemindContent" v-if="!entryListData.length">当前分类暂无词条</div>
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
</template>

<script>
import { categoryTree, getInternalEntryList } from '@/api/classifyManager'
import { getEntryDetail } from '@/api/onlyShowData'
export default {
  name: 'entryListByCategory',
  data() {
    return {
      thirdMenu: [],
      thirdMenuIndex: '',
      thirdTotal: '',
      thirdAll: 0,
      entryListData: [],
      categoryList: [],
      categoryTreeList: [],
      pagination: {
        page: 1,
        limit: 10,
        count: 0
      },
      categoryId: '',
      hasFinishAjax: false
    }
  },
  watch: {
    categoryId() {
      this.pagination.page = 1
      this.list()
    }
  },
  methods: {
    seeEntry(hash) {
      this.$router.push({
        name: 'viewEntry',
        query: {
          entryId: hash.ENTRY_ID,
          // versionId: hash.ID,
          viewType: 'view'
        }
      })
    },
    choose(item) {
      this.thirdMenuIndex = -1
      this.categoryList.map(item => {
        item.choosed = false
      })
      item.choosed = true
      this.categoryId = item.id
      if (item.children && item.children.length > 0) {
        this.thirdMenu = item.children
      } else {
        this.thirdMenu = item.children
      }
      this.list()
    },
    entryDetail(value, index) {
      this.thirdMenuIndex = index
      this.hasFinishAjax = false
      // getEntry({
      // console.log(555, this.pagination.page);
      getEntryDetail({
        pageNumber: 1,
        pageSize: this.pagination.limit,
        categoryIds: value.id,
        keyword: ''
      }).then(res => {
        this.hasFinishAjax = true
        if (res.data.records && res.data.records.length !== 0) {
          res.data.records.map(item => {
            item.text = JSON.parse(item.SUMMARY[0].summary).text
            item.img = JSON.parse(item.SUMMARY[0].summary).img
          })
          this.thirdTotal = res.data.records.length
          this.entryListData = res.data.records
        } else {
          this.thirdTotal = 0
          this.entryListData = []
        }
        this.pagination.count = res.data.total
      })
    },
    routeToEntry(id) {
      this.$router.push({
        name: 'entryDetail',
        params: { id: id }
      })
    },
    handleSizeChange(val) {
      this.pagination.page = 1
      this.pagination.limit = val
      this.list()
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      this.list()
    },

    /*
     * 重新刷新
     * */
    categoryTree() {
      const obj = JSON.parse(sessionStorage.getItem('choosedCategoryInfo'))
      if (obj.id === 1) {
        categoryTree()
          .then(res => {
            if (res.data.children) {
              console.log(4141, res.data.children);
              res.data.children.map(item => {
                if (item.id === obj.thirdAry[0].parentId) {
                  this.categoryList = item.children
                  this.categoryList.forEach(child => {
                    child.choosed = false
                    if (child.id === obj.id2) {
                      child.choosed = true
                      if (child.children && child.children.length > 0) {
                        this.thirdMenu = child.children
                      } else {
                        this.thirdMenu = child.children
                      }
                      this.entryDetail(child, 0)
                    }
                  })
                }
              })
              this.categoryId = obj.id2
            }
          })
          .catch(res => {
            console.log(res)
          })
      } else {
        getInternalEntryList()
          .then(res => {
            if (res.data.children) {
              // console.log(5235, res.data.children);
              res.data.children.map(item => {
                if (item.id === obj.thirdAry[0].parentId) {
                  this.categoryList = item.children
                  this.categoryList.forEach(child => {
                    child.choosed = false
                    if (child.id === obj.id2) {
                      child.choosed = true
                      this.entryDetail(child, 0)
                      this.choose(child)
                    }
                  })
                  // this.entryDetail(this.categoryList[0], 0)
                  // console.log(85, this.categoryList[0]);
                  // this.choose(this.categoryList[0])
                }
              })
              this.categoryId = obj.id2
            }
          })
          .catch(res => {
            console.log(res)
          })
      }
    },

    //根据分类id获取词条列表
    list() {
      this.hasFinishAjax = false
      this.thirdMenuIndex = -1
      getEntryDetail({
        pageNumber: this.pagination.page,
        pageSize: this.pagination.limit,
        categoryIds: this.categoryId,
        keyword: ''
      }).then(res => {
        this.hasFinishAjax = true
        if (res.data.records && res.data.records.length !== 0) {
          res.data.records.map(item => {
            item.text = JSON.parse(item.SUMMARY[0].summary).text
            item.img = JSON.parse(item.SUMMARY[0].summary).img
          })
          this.entryListData = res.data.records
        } else {
          this.entryListData = []
        }
        this.pagination.count = res.data.total
        this.thirdAll = res.data.total
      })
    }
    //根据本地存储的首页传参高亮显示首页选中的分类
    /*getChoosedCategoryInfo() {
      try {
        var obj = JSON.parse(sessionStorage.getItem('choosedCategoryInfo'))
        console.log(56, obj);
        obj.thirdAry.map(item => {
          item.choosed = false
        })
        this.categoryList = obj.thirdAry
        this.categoryId = this.categoryList[obj.index2].id
        this.categoryList[obj.index2].choosed = true
      } catch (e) {
        throw e
      }
    }*/
  },
  filters: {
    labelChange: function(value) {
      if (value === undefined || value === null || value.length === 0) {
        return ''
      }
      if (value.indexOf('img') !== -1) {
        value = "<p>[图片]</p>"
      }
      if (value.indexOf('div') !== -1) {
        value = value.replace(/div/g, 'p')
      }
      if (value.indexOf('h1') !== -1) {
        value = value.replace(/h1/g, 'p')
      }
      if (value.indexOf('h2') !== -1) {
        value = value.replace(/h2/g, 'p')
      }
      if (value.indexOf('h3') !== -1) {
        value = value.replace(/h3/g, 'p')
      }
      if (value.indexOf('h4') !== -1) {
        value = value.replace(/h4/g, 'p')
      }
      if (value.indexOf('a') !== -1) {
        value = value.replace(/a/g, 'p')
      }
      return value
    }
  },
  created() {
    Cetc10Auth().init(() => {
      // vm.getChoosedCategoryInfo()
      this.categoryTree()
    })
  }
}
</script>

<style lang="scss" scoped>
.entryList {
  width: 1210px;
  margin: 20px auto auto;
  li {
    display: inline-block;
    vertical-align: top;
    width: 380px;
    height: 430px;
    background: #f6fafb;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    line-height: 25px;
    margin-right: 30px;
    margin-bottom: 30px;
    font-size: 26px;
    color: #666666;

    &:nth-child(3n + 3) {
      margin-right: 0;
    }
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
    img {
      width: 100%;
      height: 120px;
      border-radius: 5px;
      margin-bottom: 10px;
    }
    .entry-title {
      line-height: 45px;
      font-weight: bold;
      font-size: 28px;
      color: black;
      text-align: center;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    div {
      font-size: 26px;
      padding: 0 20px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 8;
      overflow: hidden;
    }
  }
}

.highlight {
  color: #338ce6;
}
.el-pagination {
  text-align: center;
}
.noDataRemindContent {
  text-align: center;
  padding: 20px 0;
}
.categoryList {
  font-size: 26px;
  color: #7b7d7f;
  background: #eaf4fe;
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
  li {
    display: inline-block;
    margin: 0;
    line-height: 40px;
    text-align: center;
    padding: 5px 0;
    border-bottom: 1px solid white;
    p {
      padding: 0 20px;
      border-right: 1px solid white;
      cursor: pointer;
    }
    p:hover {
      color: #338ce6;
    }
  }
}
.third-menu {
  font-size: 26px;
  color: #7b7d7f;
  background: #eaf4fe;
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
  li {
    display: inline-block;
    margin: 0;
    line-height: 40px;
    text-align: center;
    padding: 5px 0;
    border-bottom: 1px solid white;
    p {
      padding: 0 20px;
      border-right: 1px solid white;
      cursor: pointer;
    }
    p:hover {
      color: #338ce6;
    }
  }
}
</style>
