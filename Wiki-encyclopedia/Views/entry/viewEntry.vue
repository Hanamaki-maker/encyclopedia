<template>
  <div
    style="display: flex;margin: 0 auto;width: 1280px"
    id="entry-container"
    v-if="!doReload"
    v-loading="!wikiContent.entryName"
  >
    <div style="width: calc(100% - 300px);display: flex;flex-direction: column;margin-bottom: 50px">
      <div>
        <h1 style="font-weight: normal;font-size: 35px;">
          <span style="font-weight: bold;">{{ wikiContent.entryName }}</span>
          <span style="font-size: 28px;color: #338ce6;margin-left: 10px;">
            同义词：
            <template v-if="wikiContent.entrySynonyms.length">
              <template v-for="(item, index) in wikiContent.entrySynonyms">
                <span :key="index">{{ item.name }}</span>
                <span :key="index" v-if="index + 1 < wikiContent.entrySynonyms.length">，</span>
              </template>
            </template>
            <template v-if="!wikiContent.entrySynonyms.length">
              暂无同义词
            </template>
          </span>
        </h1>
      </div>
<!--      <div v-if="this.dataJudge === 0">-->
<!--        &lt;!&ndash; summary &ndash;&gt;-->
<!--        <div class="mg-top-20" id="summary">-->
<!--          <div class="block-container" style="display: flex;flex-direction: column">-->
<!--            <div class="ck-content ck-summary" style="width: 100%;padding: 20px 0">-->
<!--              <div v-if="summaryEditor !== ''" v-html="summaryEditor" class="main-content"></div>-->
<!--              <span v-else>当前词条暂无描述</span>-->
<!--            </div>-->
<!--            <el-collapse-->
<!--              accordion-->
<!--              @change="showOtherSummaries = !showOtherSummaries"-->
<!--              style="background: #eeeeee"-->
<!--              v-if="otherSummaries.length"-->
<!--            >-->
<!--              <el-collapse-item-->
<!--                :title="showOtherSummaries ? '收起' : '展开其他来源摘要'"-->
<!--                style="background: #eeeeee"-->
<!--              >-->
<!--                <div-->
<!--                  v-for="(item, index) in otherSummaries"-->
<!--                  :key="index"-->
<!--                  style="display: flex;padding: 10px"-->
<!--                >-->
<!--                  <img :src="item.img" class="avatar" style="width: 25%" alt="" />-->
<!--                  <p class="main-content" style="margin-left: 10px">-->
<!--                    {{ item.text }}-->
<!--                    [<span v-if="item.sourceType - 0 === 1" style="color: rgb(51, 140, 230)">-->
<!--                      词条来源：百度百科-->
<!--                    </span>-->
<!--                    <span v-if="item.sourceType - 0 === 2" style="color: rgb(51, 140, 230)">-->
<!--                      词条来源：搜狗百科-->
<!--                    </span>-->
<!--                    <span v-if="item.sourceType - 0 === 3" style="color: rgb(51, 140, 230)">-->
<!--                      词条来源：互动百科-->
<!--                    </span>-->
<!--                    <span v-if="item.sourceType - 0 === 4" style="color: rgb(51, 140, 230)">-->
<!--                      词条来源：维基百科-->
<!--                    </span>-->
<!--                    <span v-if="item.sourceType - 0 === 5" style="color: rgb(51, 140, 230)">-->
<!--                      词条来源：数据库抽取-->
<!--                    </span>-->
<!--                    <span v-if="item.sourceType - 0 === 6" style="color: rgb(51, 140, 230)">-->
<!--                      词条来源：文件夹抽取-->
<!--                    </span>-->
<!--                    ]-->
<!--                  </p>-->
<!--                </div>-->
<!--              </el-collapse-item>-->
<!--            </el-collapse>-->
<!--          </div>-->
<!--        </div>-->
<!--        &lt;!&ndash; 词条属性: 重新分割属性模块，取前两个固定，后面的通过循环得到 &ndash;&gt;-->
<!--        <div-->
<!--          class="mg-top-20"-->
<!--          id="attribute"-->
<!--          style="padding: 50px 0 20px;"-->
<!--          v-if="wikiContent.entryAttributes.length"-->
<!--        >-->
<!--          &lt;!&ndash; 词条属性的前两个，写死&ndash;&gt;-->
<!--          &lt;!&ndash;        <ul class="entry-attr">&ndash;&gt;-->
<!--          &lt;!&ndash;          <li v-for="i in 2" :key="i">&ndash;&gt;-->
<!--          &lt;!&ndash;            <div class="key">{{ wikiContent.entryAttributes[i - 1].key }}</div>&ndash;&gt;-->
<!--          &lt;!&ndash;            <div class="value">{{ wikiContent.entryAttributes[i - 1].value }}</div>&ndash;&gt;-->
<!--          &lt;!&ndash;          </li>&ndash;&gt;-->
<!--          &lt;!&ndash;        </ul>&ndash;&gt;-->

<!--          <ul class="entry-attr">-->
<!--            <li v-for="(item, i) in wikiContent.entryAttributes" :key="i">-->
<!--              <div class="key">{{ item.key }}</div>-->
<!--              <div class="value">{{ item.value }}</div>-->
<!--            </li>-->
<!--          </ul>-->
<!--          &lt;!&ndash; 循环剩下的属性 &ndash;&gt;-->
<!--          &lt;!&ndash;        <ul&ndash;&gt;-->
<!--          &lt;!&ndash;          class="entry-attr"&ndash;&gt;-->
<!--          &lt;!&ndash;          v-for="i in Math.ceil(wikiContent.entryAttributes.length / 2) - 1"&ndash;&gt;-->
<!--          &lt;!&ndash;          :key="i"&ndash;&gt;-->
<!--          &lt;!&ndash;        >&ndash;&gt;-->
<!--          &lt;!&ndash;          <li v-if="i * 2 < wikiContent.entryAttributes.length">&ndash;&gt;-->
<!--          &lt;!&ndash;            <div class="key">{{ wikiContent.entryAttributes[i * 2].key }}</div>&ndash;&gt;-->
<!--          &lt;!&ndash;            <div class="value">{{ wikiContent.entryAttributes[i * 2].value }}</div>&ndash;&gt;-->
<!--          &lt;!&ndash;          </li>&ndash;&gt;-->
<!--          &lt;!&ndash;          <li v-if="i * 2 + 1 < wikiContent.entryAttributes.length">&ndash;&gt;-->
<!--          &lt;!&ndash;            <div class="key">{{ wikiContent.entryAttributes[i * 2 + 1].key }}</div>&ndash;&gt;-->
<!--          &lt;!&ndash;            <div class="value">{{ wikiContent.entryAttributes[i * 2 + 1].value }}</div>&ndash;&gt;-->
<!--          &lt;!&ndash;          </li>&ndash;&gt;-->
<!--          &lt;!&ndash;        </ul>&ndash;&gt;-->
<!--        </div>-->
<!--        &lt;!&ndash; 目录 &ndash;&gt;-->

<!--        <div class="mg-top-20" style="display: flex;flex-direction: row" id="catalogue">-->
<!--          <div-->
<!--            class="block-container juedui_middle"-->
<!--            :style="{-->
<!--              width: '97px',-->
<!--              display: 'inline-block',-->
<!--              background: '#fbfbfb',-->
<!--              textAlign: 'center',-->
<!--              position: 'relative'-->
<!--            }"-->
<!--          >-->
<!--            <p class="vertical-middle">目录</p>-->
<!--          </div>-->
<!--          <ul-->
<!--            style="padding: 15px;width: 180px;display: inline-block;border-right: 1px dotted #ccc"-->
<!--          >-->
<!--            <li v-for="(item, index) in catalogueList" :key="index">-->
<!--              {{ index + 1 }}.<span v-html="item"></span>-->
<!--            </li>-->
<!--          </ul>-->
<!--          &lt;!&ndash;          <ul style="padding: 15px;width: 180px;display: inline-block;border-right: 1px dotted #ccc">&ndash;&gt;-->
<!--          &lt;!&ndash;            <li v-for="(item, index) in contentList[0]" :key="index">&ndash;&gt;-->
<!--          &lt;!&ndash;              <a&ndash;&gt;-->
<!--          &lt;!&ndash;                @click="slideToAnchor1(item)"&ndash;&gt;-->
<!--          &lt;!&ndash;                class="catalogue p1 pd-top-5 text-center"&ndash;&gt;-->
<!--          &lt;!&ndash;                style="color: #338ce6;"&ndash;&gt;-->
<!--          &lt;!&ndash;                v-if="parseInt(item.level) === 1"&ndash;&gt;-->
<!--          &lt;!&ndash;              >&ndash;&gt;-->
<!--          &lt;!&ndash;                {{ item.mark + 1 }} {{ item.value }}&ndash;&gt;-->
<!--          &lt;!&ndash;              </a>&ndash;&gt;-->
<!--          &lt;!&ndash;              <a&ndash;&gt;-->
<!--          &lt;!&ndash;                @click="slideToAnchor1(item)"&ndash;&gt;-->
<!--          &lt;!&ndash;                class="catalogue p2 pd-top-5 text-center"&ndash;&gt;-->
<!--          &lt;!&ndash;                v-else-if="parseInt(item.level) === 2"&ndash;&gt;-->
<!--          &lt;!&ndash;              >&ndash;&gt;-->
<!--          &lt;!&ndash;                &nbsp;{{ item.value }}&ndash;&gt;-->
<!--          &lt;!&ndash;              </a>&ndash;&gt;-->
<!--          &lt;!&ndash;              <a&ndash;&gt;-->
<!--          &lt;!&ndash;                      @click="slideToAnchor1(item)"&ndash;&gt;-->
<!--          &lt;!&ndash;                      class="catalogue p3 pd-top-5 text-center"&ndash;&gt;-->
<!--          &lt;!&ndash;                      v-else-if="parseInt(item.level) === 3"&ndash;&gt;-->
<!--          &lt;!&ndash;              >&ndash;&gt;-->
<!--          &lt;!&ndash;                {{ item.value }}&ndash;&gt;-->
<!--          &lt;!&ndash;              </a>&ndash;&gt;-->
<!--          &lt;!&ndash;            </li>&ndash;&gt;-->
<!--          &lt;!&ndash;          </ul>&ndash;&gt;-->
<!--          &lt;!&ndash;          <ul&ndash;&gt;-->
<!--          &lt;!&ndash;            v-if="contentList[1] && contentList[1].length"&ndash;&gt;-->
<!--          &lt;!&ndash;            style="padding: 15px;width: 180px;display: inline-block;border-right: 1px dotted #ccc"&ndash;&gt;-->
<!--          &lt;!&ndash;          >&ndash;&gt;-->
<!--          &lt;!&ndash;            <li v-for="(item, index) in contentList[1]" :key="index">&ndash;&gt;-->
<!--          &lt;!&ndash;              <a&ndash;&gt;-->
<!--          &lt;!&ndash;                @click="slideToAnchor1(item)"&ndash;&gt;-->
<!--          &lt;!&ndash;                class="catalogue p1 pd-top-5 text-center"&ndash;&gt;-->
<!--          &lt;!&ndash;                style="color: #338ce6;"&ndash;&gt;-->
<!--          &lt;!&ndash;                v-if="parseInt(item.level) === 1"&ndash;&gt;-->
<!--          &lt;!&ndash;              >&ndash;&gt;-->
<!--          &lt;!&ndash;                {{ item.mark + 1 }} {{ item.value }}&ndash;&gt;-->
<!--          &lt;!&ndash;              </a>&ndash;&gt;-->
<!--          &lt;!&ndash;              <a&ndash;&gt;-->
<!--          &lt;!&ndash;                @click="slideToAnchor1(item)"&ndash;&gt;-->
<!--          &lt;!&ndash;                class="catalogue p2 pd-top-5 text-center"&ndash;&gt;-->
<!--          &lt;!&ndash;                v-else-if="parseInt(item.level) === 2"&ndash;&gt;-->
<!--          &lt;!&ndash;              >&ndash;&gt;-->
<!--          &lt;!&ndash;                {{ item.value }}&ndash;&gt;-->
<!--          &lt;!&ndash;              </a>&ndash;&gt;-->
<!--          &lt;!&ndash;              <a&ndash;&gt;-->
<!--          &lt;!&ndash;                @click="slideToAnchor1(item)"&ndash;&gt;-->
<!--          &lt;!&ndash;                class="catalogue p3 pd-top-5 text-center"&ndash;&gt;-->
<!--          &lt;!&ndash;                v-else-if="parseInt(item.level) === 3"&ndash;&gt;-->
<!--          &lt;!&ndash;              >&ndash;&gt;-->
<!--          &lt;!&ndash;                {{ item.value }}&ndash;&gt;-->
<!--          &lt;!&ndash;              </a>&ndash;&gt;-->
<!--          &lt;!&ndash;            </li>&ndash;&gt;-->
<!--          &lt;!&ndash;          </ul>&ndash;&gt;-->
<!--          &lt;!&ndash;          <ul&ndash;&gt;-->
<!--          &lt;!&ndash;            v-if="contentList[2] && contentList[2].length"&ndash;&gt;-->
<!--          &lt;!&ndash;            style="padding: 15px;width: 180px;display: inline-block;border-right: 1px dotted #ccc"&ndash;&gt;-->
<!--          &lt;!&ndash;          >&ndash;&gt;-->
<!--          &lt;!&ndash;            <li v-for="(item, index2) in contentList[2]" :key="index2">&ndash;&gt;-->
<!--          &lt;!&ndash;              <a&ndash;&gt;-->
<!--          &lt;!&ndash;                @click="slideToAnchor1(item)"&ndash;&gt;-->
<!--          &lt;!&ndash;                class="catalogue p1 pd-top-5 text-center"&ndash;&gt;-->
<!--          &lt;!&ndash;                style="color: #338ce6;"&ndash;&gt;-->
<!--          &lt;!&ndash;                v-if="parseInt(item.level) === 1"&ndash;&gt;-->
<!--          &lt;!&ndash;              >&ndash;&gt;-->
<!--          &lt;!&ndash;                {{ item.mark + 1 }} {{ item.value }}&ndash;&gt;-->
<!--          &lt;!&ndash;              </a>&ndash;&gt;-->
<!--          &lt;!&ndash;              <a&ndash;&gt;-->
<!--          &lt;!&ndash;                @click="slideToAnchor1(item)"&ndash;&gt;-->
<!--          &lt;!&ndash;                class="catalogue p2 pd-top-5 text-center"&ndash;&gt;-->
<!--          &lt;!&ndash;                v-else-if="parseInt(item.level) === 2"&ndash;&gt;-->
<!--          &lt;!&ndash;              >&ndash;&gt;-->
<!--          &lt;!&ndash;                &nbsp;{{ item.value }}&ndash;&gt;-->
<!--          &lt;!&ndash;              </a>&ndash;&gt;-->
<!--          &lt;!&ndash;              <a&ndash;&gt;-->
<!--          &lt;!&ndash;                @click="slideToAnchor1(item)"&ndash;&gt;-->
<!--          &lt;!&ndash;                class="catalogue p3 pd-top-5 text-center"&ndash;&gt;-->
<!--          &lt;!&ndash;                v-else-if="parseInt(item.level) === 3"&ndash;&gt;-->
<!--          &lt;!&ndash;              >&ndash;&gt;-->
<!--          &lt;!&ndash;                {{ item.value }}&ndash;&gt;-->
<!--          &lt;!&ndash;              </a>&ndash;&gt;-->
<!--          &lt;!&ndash;            </li>&ndash;&gt;-->
<!--          &lt;!&ndash;          </ul>&ndash;&gt;-->
<!--          &lt;!&ndash;          <ul&ndash;&gt;-->
<!--          &lt;!&ndash;            v-if="contentList[3] && contentList[3].length"&ndash;&gt;-->
<!--          &lt;!&ndash;            style="padding: 15px;width: 180px;display: inline-block;"&ndash;&gt;-->
<!--          &lt;!&ndash;          >&ndash;&gt;-->
<!--          &lt;!&ndash;            <li v-for="(item, index3) in contentList[3]" :key="index3">&ndash;&gt;-->
<!--          &lt;!&ndash;              <a&ndash;&gt;-->
<!--          &lt;!&ndash;                @click="slideToAnchor1(item)"&ndash;&gt;-->
<!--          &lt;!&ndash;                class="catalogue p1 pd-top-5 text-center"&ndash;&gt;-->
<!--          &lt;!&ndash;                style="color: #338ce6;"&ndash;&gt;-->
<!--          &lt;!&ndash;                v-if="parseInt(item.level) === 1"&ndash;&gt;-->
<!--          &lt;!&ndash;              >&ndash;&gt;-->
<!--          &lt;!&ndash;                {{ item.mark + 1 }} {{ item.value }}&ndash;&gt;-->
<!--          &lt;!&ndash;              </a>&ndash;&gt;-->
<!--          &lt;!&ndash;              <a&ndash;&gt;-->
<!--          &lt;!&ndash;                @click="slideToAnchor1(item)"&ndash;&gt;-->
<!--          &lt;!&ndash;                class="catalogue p2 pd-top-5 text-center"&ndash;&gt;-->
<!--          &lt;!&ndash;                v-else-if="parseInt(item.level) === 2"&ndash;&gt;-->
<!--          &lt;!&ndash;              >&ndash;&gt;-->
<!--          &lt;!&ndash;                &nbsp;{{ item.value }}&ndash;&gt;-->
<!--          &lt;!&ndash;              </a>&ndash;&gt;-->
<!--          &lt;!&ndash;              <a&ndash;&gt;-->
<!--          &lt;!&ndash;                @click="slideToAnchor1(item)"&ndash;&gt;-->
<!--          &lt;!&ndash;                class="catalogue p3 pd-top-5 text-center"&ndash;&gt;-->
<!--          &lt;!&ndash;                v-else-if="parseInt(item.level) === 3"&ndash;&gt;-->
<!--          &lt;!&ndash;              >&ndash;&gt;-->
<!--          &lt;!&ndash;                {{ item.value }}&ndash;&gt;-->
<!--          &lt;!&ndash;              </a>&ndash;&gt;-->
<!--          &lt;!&ndash;            </li>&ndash;&gt;-->
<!--          &lt;!&ndash;          </ul>&ndash;&gt;-->
<!--        </div>-->
<!--        &lt;!&ndash; 词条详情 &ndash;&gt;-->
<!--        <div style="display: flex" class="mg-top-20" id="content" ref="content">-->
<!--          <div class="ck-content" style="width: 100%;padding: 20px 0">-->
<!--            <div v-html="wikiContent.entryContentVos" class="contentBody"></div>-->
<!--            &lt;!&ndash;          <div  v-for="(item, index) in wikiContent.entryContentVos" :key="index">&ndash;&gt;-->
<!--            &lt;!&ndash;            <div v-html="item.contentTitle" class="contentTitle"></div>&ndash;&gt;-->
<!--            &lt;!&ndash;            <div v-html="item.contentBody" class="contentBody"></div>&ndash;&gt;-->
<!--            &lt;!&ndash;          </div>&ndash;&gt;-->

<!--            &lt;!&ndash;          <template v-for="(item, index) in wikiContent.entryContentVos">&ndash;&gt;-->
<!--            &lt;!&ndash;            <div :key="index">&ndash;&gt;-->
<!--            &lt;!&ndash;              <h2 :id="item.id" v-if="item.contentTitle !== null && item.contentTitle !== null">&ndash;&gt;-->
<!--            &lt;!&ndash;                {{ item.contentTitle }}&ndash;&gt;-->
<!--            &lt;!&ndash;              </h2>&ndash;&gt;-->
<!--            &lt;!&ndash;              <div&ndash;&gt;-->
<!--            &lt;!&ndash;                class="text-indent"&ndash;&gt;-->
<!--            &lt;!&ndash;                v-html="item.contentBody"&ndash;&gt;-->
<!--            &lt;!&ndash;                v-if="&ndash;&gt;-->
<!--            &lt;!&ndash;                  item.contentBody !== '<p>null</p>' &&&ndash;&gt;-->
<!--            &lt;!&ndash;                    item.contentBody !== null &&&ndash;&gt;-->
<!--            &lt;!&ndash;                    item.contentBody !== 'null'&ndash;&gt;-->
<!--            &lt;!&ndash;                "&ndash;&gt;-->
<!--            &lt;!&ndash;              ></div>&ndash;&gt;-->
<!--            &lt;!&ndash;              <template v-if="item.children.length">&ndash;&gt;-->
<!--            &lt;!&ndash;                <template v-for="(key, i) in item.children">&ndash;&gt;-->
<!--            &lt;!&ndash;                  <div class="text-indent" :key="i">&ndash;&gt;-->
<!--            &lt;!&ndash;                    <h3&ndash;&gt;-->
<!--            &lt;!&ndash;                      :id="key.id"&ndash;&gt;-->
<!--            &lt;!&ndash;                      v-if="key.contentTitle !== null && key.contentTitle !== null"&ndash;&gt;-->
<!--            &lt;!&ndash;                    >&ndash;&gt;-->
<!--            &lt;!&ndash;                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ key.contentTitle }}&ndash;&gt;-->
<!--            &lt;!&ndash;                    </h3>&ndash;&gt;-->
<!--            &lt;!&ndash;                    <div&ndash;&gt;-->
<!--            &lt;!&ndash;                      v-html="key.contentBody"&ndash;&gt;-->
<!--            &lt;!&ndash;                      v-if="&ndash;&gt;-->
<!--            &lt;!&ndash;                        key.contentBody !== '<p>null</p>' &&&ndash;&gt;-->
<!--            &lt;!&ndash;                          key.contentBody !== null &&&ndash;&gt;-->
<!--            &lt;!&ndash;                          key.contentBody !== 'null'&ndash;&gt;-->
<!--            &lt;!&ndash;                      "&ndash;&gt;-->
<!--            &lt;!&ndash;                    ></div>&ndash;&gt;-->
<!--            &lt;!&ndash;                    <div v-else><p>&nbsp;</p></div>&ndash;&gt;-->
<!--            &lt;!&ndash;                  </div>&ndash;&gt;-->
<!--            &lt;!&ndash;                  <template v-if="key.children.length">&ndash;&gt;-->
<!--            &lt;!&ndash;                    <template v-for="(v, k) in key.children">&ndash;&gt;-->
<!--            &lt;!&ndash;                      <div class="text-indent" :key="k">&ndash;&gt;-->
<!--            &lt;!&ndash;                        <h4 :id="v.id" v-if="v.contentTitle !== null && v.contentTitle !== null">&ndash;&gt;-->
<!--            &lt;!&ndash;                          &nbsp;&nbsp;&nbsp;&nbsp;{{ v.contentTitle }}&ndash;&gt;-->
<!--            &lt;!&ndash;                        </h4>&ndash;&gt;-->
<!--            &lt;!&ndash;                        <div&ndash;&gt;-->
<!--            &lt;!&ndash;                          v-html="v.contentBody"&ndash;&gt;-->
<!--            &lt;!&ndash;                          v-if="&ndash;&gt;-->
<!--            &lt;!&ndash;                            v.contentBody !== '<p>null</p>' &&&ndash;&gt;-->
<!--            &lt;!&ndash;                              v.contentBody !== null &&&ndash;&gt;-->
<!--            &lt;!&ndash;                              v.contentBody !== 'null'&ndash;&gt;-->
<!--            &lt;!&ndash;                          "&ndash;&gt;-->
<!--            &lt;!&ndash;                        ></div>&ndash;&gt;-->
<!--            &lt;!&ndash;                        <div v-else-if="v.contentBody == '<p>null</p>'"><p>&nbsp;</p></div>&ndash;&gt;-->
<!--            &lt;!&ndash;                      </div>&ndash;&gt;-->
<!--            &lt;!&ndash;                    </template>&ndash;&gt;-->
<!--            &lt;!&ndash;                  </template>&ndash;&gt;-->
<!--            &lt;!&ndash;                </template>&ndash;&gt;-->
<!--            &lt;!&ndash;              </template>&ndash;&gt;-->
<!--            &lt;!&ndash;            </div>&ndash;&gt;-->
<!--            &lt;!&ndash;          </template>&ndash;&gt;-->
<!--          </div>-->
<!--        </div>-->
<!--        &lt;!&ndash; 引用 &ndash;&gt;-->
<!--        &lt;!&ndash;<div class="mg-top-20">-->
<!--                  <h3 id="reference">参考资料</h3>-->
<!--                  <div class="block-container">-->
<!--                      <template v-for="(item,index) in wikiContent.entryReferrences">-->
<!--                          <p style="line-height: 1.5;font-size: 26px;">-->
<!--                              {{index+1}}.<a class="quote-btn" @click="goLink(item.referrenceUrl)">{{item.referrenceTitle}}</a>-->
<!--                          </p>-->
<!--                      </template>-->
<!--                  </div>-->
<!--              </div>&ndash;&gt;-->
<!--        &lt;!&ndash; 标签 &ndash;&gt;-->
<!--        <div class="mg-top-20">-->
<!--          <h3 id="tag">标签</h3>-->
<!--          <div v-if="wikiContent.entryLabels && wikiContent.entryLabels.length">-->
<!--            <template v-for="(item, index) in wikiContent.entryLabels">-->
<!--              <el-tag-->
<!--                :key="index"-->
<!--                @click="chooseTag(item)"-->
<!--                :class="item.choosed ? 'el-tag-active' : ''"-->
<!--                >{{ item.labelName }}</el-tag-->
<!--              >-->
<!--            </template>-->
<!--          </div>-->
<!--          <template v-else>-->
<!--            <span style="color: #999;">该词条暂时还没有添加标签哦~</span>-->
<!--          </template>-->
<!--        </div>-->
<!--      </div>-->
      <div class="wikiContent">
        <div v-html="this.wikiContent.entryContentVos"></div>
      </div>
      <div v-show="this.newsData.length > 0">
        <span class="newsTitle">新闻推荐</span>
        <div class="newsData">
          <el-table :data="newsData" height="300" :show-header="false">
            <el-table-column prop="name" width="200"></el-table-column>
            <el-table-column prop="entryDesc">
              <template slot-scope="scope">
                <a :href="scope.row.url" target="_blank" style="text-decoration:none">{{
                  scope.row.entryDesc
                }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="time" width="200">
              <template slot-scope="scope">
                {{ parseTime(scope.row.time) }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div>
      <div class="box-card">
        <el-card v-show="auditShow">
          <div class="card-title">
            <span>审核操作</span>
            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <div class="audit-box">
            <el-button
              type="primary"
              style="background: #6b9cec;color: white;"
              size="small"
              @click="
                modalShow = true
                code = '3'
              "
            >
              审核通过
            </el-button>
            <el-button
              type="danger"
              style="background: #6b9cec;color: white;"
              size="small"
              @click="
                modalShow = true
                code = '4'
              "
            >
              审核不通过
            </el-button>
          </div>
        </el-card>
        <el-card v-show="auditShow1">
          <div class="card-title">
            <span>审核操作</span>
            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <div class="audit-box">
            <el-button
              type="primary"
              style="background: #6b9cec;color: white;"
              v-show="public"
              size="small"
              @click="
                modalShow = true
                code = '5'
              "
            >
              发布
            </el-button>
            <el-button
              type="danger"
              style="background: #6b9cec;color: white;"
              size="small"
              v-show="!public"
              @click="
                modalShow = true
                code = '6'
              "
            >
              取消发布
            </el-button>
          </div>
        </el-card>
        <el-card style="margin-top: 20px">
          <div class="card-title">
            <span>词条统计</span>
            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <p class="pd-left-10">创建者：{{ wikiInfo.creator }}</p>
          <p class="pd-left-10">
            编辑次数：{{ wikiInfo.versionApprovingCount }}次<a
              style="color:#338ce6;cursor:pointer;margin-left: 10px;"
              @click="toHistoryList(wikiInfo.id)"
              >历史版本</a
            >
          </p>
          <p class="pd-left-10" v-if="wikiContent.entryVersion.updateTime">
            最近更新：{{
              new Date(wikiContent.entryVersion.updateTime).getFullYear() +
                '-' +
                (new Date(wikiContent.entryVersion.updateTime).getMonth() + 1) +
                '-' +
                new Date(wikiContent.entryVersion.updateTime).getDate()
            }}
          </p>
          <p class="pd-left-10" v-else-if="wikiContent.entryVersion.createTime">
            最近更新：{{
              new Date(wikiContent.entryVersion.createTime).getFullYear() +
                '-' +
                (new Date(wikiContent.entryVersion.createTime).getMonth() + 1) +
                '-' +
                new Date(wikiContent.entryVersion.createTime).getDate()
            }}
          </p>
          <p class="pd-left-10" v-else>
            最近更新：-
          </p>
          <p
            v-if="viewType !== 'preview'"
            class="pd-left-10"
            @click="routeToEditOthersEntry()"
            style="color:#338ce6;cursor:pointer;"
          >
            修改词条
          </p>
        </el-card>
        <el-card style="margin-top: 20px;padding: 20px 0;">
          <div @click="scrollRightNav('down')" class="down-arrow-active"></div>
          <div class="card-title">
            <!--<span >快速导航</span>-->
            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <div id="rightNav" class="rightNav" style="max-height: 310px;overflow-y: scroll">
            <!--<a @click="slideToAnchor('summary')" class="catalogue pd-left-10">摘要</a>
            <a @click="slideToAnchor('catalogue')" class="catalogue pd-left-10">目录</a>
            <a @click="slideToAnchor('attribute')" class="catalogue pd-left-10">词条属性</a>-->
            <!--            <div-->
            <!--              v-for="(item, index) in wikiContent.entryContentVos"-->
            <!--              :key="index"-->
            <!--              class="pd-left-10"-->
            <!--            >-->
            <!--              <a-->
            <!--                v-if="item.contentTitle && item.contentTitle !== 'null'"-->
            <!--                :class="item.choosed ? 'current' : ''"-->
            <!--                class="catalogue1 catalogue"-->
            <!--                @click="slideToAnchor1(item)"-->
            <!--                ><span style="margin-right: 10px;">{{ index + 1 }}</span-->
            <!--                >{{ item.contentTitle }}</a-->
            <!--              >-->
            <!--              <div v-for="(k, index1) in item.children" :key="index1">-->
            <!--                <a-->
            <!--                  :class="k.choosed ? 'current' : ''"-->
            <!--                  v-if="k.contentTitle && k.contentTitle !== 'null'"-->
            <!--                  class="catalogue2 catalogue"-->
            <!--                  @click="slideToAnchor1(k)"-->
            <!--                >-->
            <!--                  <span style="margin-right: 10px;">{{ index + 1 }}.{{ index1 + 1 }}</span-->
            <!--                  >{{ k.contentTitle }}-->
            <!--                </a>-->
            <!--                <template v-for="(v, index2) in k.children">-->
            <!--                  <a-->
            <!--                    :key="index2"-->
            <!--                    v-if="v.contentTitle && v.contentTitle !== 'null'"-->
            <!--                    :class="v.choosed ? 'current' : ''"-->
            <!--                    class="catalogue3 catalogue"-->
            <!--                    @click="slideToAnchor1(v)"-->
            <!--                  >-->
            <!--                    <span style="margin-right: 10px;"-->
            <!--                      >{{ index + 1 }}.{{ index1 + 1 }}.{{ index2 + 1 }}</span-->
            <!--                    >{{ v.contentTitle }}-->
            <!--                  </a>-->
            <!--                </template>-->
            <!--              </div>-->
            <!--            </div>-->
            <ul>
              <li v-for="(item, index) in catalogueList" :key="index">
                {{ index + 1 }}.<span v-html="item"></span>
              </li>
            </ul>
            <!--<a @click="slideToAnchor('reference')" class="catalogue pd-left-10">引用</a>
                        <a @click="slideToAnchor('tag')" class="catalogue pd-left-10">标签</a>-->
          </div>
          <div @click="scrollRightNav('up')" class="down-arrow"></div>
        </el-card>
      </div>
      <!--<el-tabs v-model="activeName">-->
      <!--&lt;!&ndash;<el-tab-pane label="目录模板" name="first">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-button type="danger" @click="setTemplate(1)" class="btn-column">预设模板1</el-button>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-button type="danger" @click="setTemplate(2)" class="btn-column">预设模板2</el-button>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-tab-pane>&ndash;&gt;-->
      <!--<el-tab-pane label="目录" name="second">-->
      <!--</el-tab-pane>-->
      <!--</el-tabs>-->
    </div>
    <!--   专题新闻   -->
    <!--  专题词条  -->
    <el-dialog title="审核意见" :visible.sync="modalShow">
      <el-form>
        <el-form-item label="审核意见">
          <el-input v-model="comment" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modalShow = false">取 消</el-button>
        <el-button type="primary" @click="modify">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { audit, recommendation } from '@/api/entry'
import { parseTimeYMD } from '@/utils/commonMethod.js'

export default {
  name: 'editor',
  data() {
    return {
      catalogueList: [],
      dataJudge: 1,
      summaryEditor: '',
      otherSummaries: [],
      activeNames: ['1'],
      wikiContent: {
        entryContentVos: [],
        entrySummarys: [],
        entryReferrences: [],
        entryVersion: [],
        entrySynonyms: [],
        entryAttributes: [],
        categories: [],
        entryLabels: []
      },
      activeName: 'second',
      contentList: [],
      wikiInfo: {},
      comment: '', // 审核意见
      auditShow: false, // 审核操作框
      auditShow1: false,
      public: false,
      modalShow: false, // 审核diag对话框
      code: '', // 提交状态
      doReload: false,
      showOtherSummaries: false,
      viewType: '',
      newsData: []
    }
  },
  mounted() {
    let vm = this
    Cetc10Auth().init(function() {
      vm.entryId = vm.$route.query.entryId
      vm.versionId = vm.$route.query.versionId ? vm.$route.query.versionId : ''
      vm.viewType = vm.$route.query.viewType
      vm.state = vm.$route.query.state
      if (vm.state === 2) {
        vm.auditShow = sessionStorage.getItem('auditShow') === 'true'
      }
      if (vm.state === 5) {
        vm.auditShow1 = sessionStorage.getItem('auditShow1') === 'true'
        vm.public = sessionStorage.getItem('public') === 'false'
      }
      if (vm.state === 6) {
        vm.auditShow1 = sessionStorage.getItem('auditShow1') === 'true'
        vm.public = sessionStorage.getItem('public') === 'true'
      }
      vm.recommendation()
      if (vm.viewType == 'preview') {
        vm.$axios
          .post('/wiki-backend/api/entry/getByVersionId', {
            entryId: vm.entryId,
            versionId: vm.versionId
          })
          .then(res => {
            vm.handleEntryDetail(res)
          })
        vm.$axios.post('/wiki-backend/api/entry/info', { id: vm.entryId }).then(res => {
          vm.wikiInfo = res.data
        })
      } else {
        vm.$axios.post('/wiki-backend/api/entry/info', { id: vm.entryId }).then(res => {
          vm.wikiInfo = res.data
          vm.versionId = res.data.versionId
          vm.$axios
            .post('/wiki-backend/api/entry/getByVersionId', {
              entryId: vm.entryId,
              versionId: res.data.versionId
            })
            .then(res => {
              vm.handleEntryDetail(res)
            })
        })
      }
    })
  },
  updated() {
    this.$nextTick(() => {
      const wrapper = this.$refs.content
      if (wrapper.getElementsByTagName('img') !== null) {
        let target = wrapper.getElementsByTagName('img')
        const reg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
        // setTimeout(() => {
        for (let i = 0; i < target.length; i++) {
          if (!reg.test(target[i].getAttribute('src'))) {
            target[i].src = baseUrlConfig.IMG_PREFIX + target[i].getAttribute('src')
          }
        }
        // }, 1000)
        // 爬取的数据中的表格做 css 初始化
        const table = wrapper.querySelectorAll('table')
        for (let i = 0; i < table.length; i++) {
          table[i].setAttribute('width', 980)
          table[i].setAttribute('border', 1)
          table[i].setAttribute('cellspacing', 0)
          table[i].setAttribute('cellpadding', 0)
        }

        // 图片容器中的图片描述“xxx(15张)”，把 15张的字样删掉

        // 爬取的数据源不同，图片容器的类名也不同，需要按类名查找然后删除
        const sourceClassName = ['.a', '.b', '.c']
        for (let i = 0; i < sourceClassName.length; i++) {
          wrapper.querySelector(sourceClassName[i])
        }
      }
      // wrapper.querySelector()
    })
  },
  beforeRouteEnter(to, from, next) {
    sessionStorage.setItem('auditShow', from.path === '/entryVersionExamine')
    sessionStorage.setItem('auditShow1', from.path === '/entryVersionExamine')
    sessionStorage.setItem('public', from.path === '/entryVersionExamine')
    next()
  },
  methods: {
    parseTime(str) {
      return parseTimeYMD(str)
    },
    //新闻推荐
    recommendation() {
      recommendation({
        token: 'xxbk',
        entryId: '0022f240-2445-11ea-a0f7-0242ac120005'
      }).then(res => {
        this.newsData = res.data.records
        res.data.records.map(item => {
          item.entryDesc = JSON.parse(item.entryDesc).text
        })
      })
    },
    //处理词条详情
    handleEntryDetail(res) {
      let vm = this
      // this.wikiContent = res.data
      if (res.data.entryContentVos.contentBody.indexOf('<html>') !== -1) {
        this.dataJudge = 1
        this.wikiContent.entryName = res.data.entryName
        this.wikiContent.entryContentVos = res.data.entryContentVos.contentBody
        // console.log(this.wikiContent.entryContentVos);
        if (res.data.entryContentVos.contentBody.indexOf('class="catalog-list')) {
          let reg = new RegExp(/<span class="text"><a .*?>.*?<\/a><\/span>/g)
          let sideContent = res.data.entryContentVos.contentBody.match(reg)
          this.catalogueList = sideContent
        }
      } else {
        this.dataJudge = 0
        this.wikiContent.entryName = res.data.entryName
        let content = res.data.entryContentVos.contentBody.split('*')
        let entrySummarys = JSON.parse(content[0])
        let entryContentVos = JSON.parse(content[2])
        let entryAttributes = JSON.parse(content[1])
        if (this.wikiContent.entryLabels && this.wikiContent.entryLabels.length) {
          this.$set(this.wikiContent.entryLabels[0], 'choosed', true)
        }
        //摘要
        this.summaryEditor = JSON.parse(entrySummarys.value).text
        this.imageUrl = JSON.parse(entrySummarys.value).img
        // if (res.data.entrySummarys.length > 0) {
        //   res.data.entrySummarys.map(item => {
        //     if (item.dataType == 1) {
        //       this.summaryEditor = JSON.parse(item.summary).text
        //       // console.log(JSON.parse(item.summary).text, JSON.parse(item.summary));
        //       this.imageUrl = JSON.parse(item.summary).img
        //     } else {
        //       let obj = {
        //         img: JSON.parse(item.summary).img,
        //         text: JSON.parse(item.summary).text,
        //         sourceType: item.sourceType,
        //         sourceValue: item.sourceValue
        //       }
        //     }
        //   })
        // }
        //只显示dataType为1的内容
        const entryContentVosList = []
        let herf = new RegExp('<a[^>]*href[=\\"\\\'\\s]+([^\\"\\\']*)[\\"\\\']?[^>]*>', 'g')
        // let herf1 = new RegExp("<a[^>]*href[=\\\"\\'\\s]+([^\\\"\\']*)[\\\"\\']?[^>]*>");
        let endstr = entryContentVos.contentBody
        if (entryContentVos.contentBody.match(herf) !== null) {
          let strnew = ''
          let totalstr = entryContentVos.contentBody
          let matcharr = totalstr.match(herf)
          matcharr.map(item1 => {
            if (item1.indexOf('%') === -1) {
              let _class = ''
              let _target = ''
              let _style = ''
              let _href = ''
              if (item1.includes('href="')) {
                _href =
                  ' href="/#/viewEntry?entryId=' +
                  item1.split('href="/item/')[1].split('"')[0] +
                  '"'
              }
              if (item1.includes('target="')) {
                _target = ' target="' + item1.split('target="')[1].split('"')[0] + '"'
              }
              if (item1.includes('class="')) {
                _class = ' class="' + item1.split('class="')[1].split('"')[0] + '"'
              }
              if (item1.includes('style="')) {
                _style = ' style="' + item1.split('style="')[1].split('"')[0] + '"'
              }
              strnew = '<a' + _href + _target + _class + _style + '>'
            } else {
              strnew = item1.replace(/href/g, 'href1')
            }
            endstr = endstr.replace(item1, strnew)
          })
        }
        entryContentVos.contentBody = endstr
        entryContentVosList.push(entryContentVos)
        // this.wikiContent.entryContentVos = entryContentVosList
        // if (item.dataType === 1 && item.contentTitle && item.contentTitle !== null) {
        //   if (item.contentTitle.indexOf('<br/>') !== -1) {
        //     item.contentTitle = item.contentTitle.substring(0, item.contentTitle.indexOf('<br/>'))
        //   }
        //   let obj1 = JSON.parse(JSON.stringify(item))
        //   obj1.children = []
        //   item.children.map(k => {
        //     if (k.dataType === 1 && k.contentTitle && k.contentTitle !== null) {
        //       if (k.contentTitle.indexOf('<br/>') !== -1) {
        //         k.contentTitle = k.contentTitle.substring(0, k.contentTitle.indexOf('<br/>'))
        //       }
        //       let obj2 = k
        //       obj2.children = []
        //       obj1.children.push(obj2)
        //       k.children.map(v => {
        //         if (v.dataType === 1 && v.contentTitle && v.contentTitle !== null) {
        //           if (v.contentTitle.indexOf('<br/>') !== -1) {
        //             v.contentTitle = v.contentTitle.substring(0, v.contentTitle.indexOf('<br/>'))
        //           }
        //           obj2.children.push(v)
        //         }
        //       })
        //     }
        //   })
        //   entryContentVosList.push(obj1)
        // }
        // if (entryContentVos.length >= 0) {
        // entryContentVos.map(item => {
        //   let endstr = item.contentBody;
        //   if (item.contentBody.match(herf) !== null) {
        //     let strnew = '';
        //     let totalstr = item.contentBody;
        //     let matcharr =  totalstr.match(herf);
        //     matcharr.map(item1 => {
        //       if(item1.indexOf('%') === -1){
        //         let _class = '';
        //         let _target = '';
        //         let _style = '';
        //         let _href =  '';
        //         if (item1.includes('href="')) {
        //           _href = ' href="/#/viewEntry?entryId=' + item1.split('href="/item/')[1].split('\"')[0] + '\"';
        //         }
        //         if (item1.includes('target="')) {
        //           _target = ' target="' + item1.split('target="')[1].split('\"')[0] + '\"';
        //         }
        //         if (item1.includes('class="')) {
        //           _class = ' class="' + item1.split('class="')[1].split('\"')[0]+ '\"';
        //         }
        //         if (item1.includes('style="')) {
        //           _style = ' style="' + item1.split('style="')[1].split('\"')[0]+ '\"';
        //         }
        //         strnew = '<a' + _href + _target + _class + _style + '>';
        //       } else {
        //         strnew = item1.replace(/href/g, 'href1');
        //       }
        //       endstr = endstr.replace(item1, strnew);
        //     })
        //   }
        //   item.contentBody = endstr;
        //   entryContentVosList.push(item)
        //   // this.wikiContent.entryContentVos = entryContentVosList
        //   if (item.dataType === 1 && item.contentTitle && item.contentTitle !== null) {
        //     if (item.contentTitle.indexOf('<br/>') !== -1) {
        //       item.contentTitle = item.contentTitle.substring(0, item.contentTitle.indexOf('<br/>'))
        //     }
        //     let obj1 = JSON.parse(JSON.stringify(item))
        //     obj1.children = []
        //     item.children.map(k => {
        //       if (k.dataType === 1 && k.contentTitle && k.contentTitle !== null) {
        //         if (k.contentTitle.indexOf('<br/>') !== -1) {
        //           k.contentTitle = k.contentTitle.substring(0, k.contentTitle.indexOf('<br/>'))
        //         }
        //         let obj2 = k
        //         obj2.children = []
        //         obj1.children.push(obj2)
        //         k.children.map(v => {
        //           if (v.dataType === 1 && v.contentTitle && v.contentTitle !== null) {
        //             if (v.contentTitle.indexOf('<br/>') !== -1) {
        //               v.contentTitle = v.contentTitle.substring(0, v.contentTitle.indexOf('<br/>'))
        //             }
        //             obj2.children.push(v)
        //           }
        //         })
        //       }
        //     })
        //     entryContentVosList.push(obj1)
        //   }
        // })
        // }
        // this.wikiContent.entryContentVos = entryContentVosList
        this.wikiContent.entryContentVos = entryContentVos.contentBody
        //处理目录
        this.contentList = []
        let contentAry = []
        if (this.wikiContent.entryContentVos.indexOf('para-title') !== -1) {
          let index = 0
          let reg1 = new RegExp(/<h2.*?>(.*?)<\/h2>/g)
          let reg2 = new RegExp(/<h3.*?>(.*?)<\/h3>/g)
          let reg3 = new RegExp(/<h4.*?>(.*?)<\/h4>/g)
          let reg = new RegExp(/<h.*?>(.*?)<\/h.*?>/g)
          let m_1 = this.wikiContent.entryContentVos.match(reg)
          for (let i = 0; i < m_1.length; i++) {
            let str = m_1[i].slice(0, 4) + 'id="a' + (i + 1) + '" ' + m_1[i].slice(5)
            if (this.wikiContent.entryContentVos.indexOf(m_1[i]) !== -1) {
              this.wikiContent.entryContentVos = this.wikiContent.entryContentVos.replace(
                m_1[i],
                str
              )
            }
          }
          //一级目录
          let r_1 = this.wikiContent.entryContentVos.split(reg1)
          let r = r_1.filter(function(s) {
            return s && s.trim()
          })
          r.map((item, index) => {
            if (item === '&nbsp;') {
              r.splice(index, 1)
            }
          })
          r.map(item => {
            if (
              item.indexOf('</h3>') !== -1 ||
              item.indexOf('</h4>') !== -1 ||
              item.indexOf('</p>') !== -1
            ) {
              //二级目录
              let r_2 = item.split(reg2)
              let rr = r_2.filter(function(s) {
                return s && s.trim()
              })
              rr.map((item, index) => {
                if (item === '&nbsp;') {
                  rr.splice(index, 1)
                }
              })
              rr.map(item1 => {
                if (item1.indexOf('</h4>') !== -1 || item1.indexOf('</p>') !== -1) {
                  // 三级目录
                  let r_3 = item1.split(reg3)
                  let rrr = r_3.filter(function(s) {
                    return s && s.trim()
                  })
                  rrr.map((item2, index) => {
                    if (item === '&nbsp;') {
                      rrr.splice(index, 1)
                    }
                  })
                  rrr.map(item2 => {
                    if (item1.indexOf('</p>') !== -1) {
                    } else {
                      index++
                      if (item2.indexOf('<br/>') !== -1) {
                        item2 = item2.substring(0, item2.length - 5)
                      }
                      item2 =
                        '<span class="text"><a href="#a' + index + '">' + item2 + '</a></span>'
                      this.catalogueList.push(item2)
                    }
                  })
                } else {
                  index++
                  if (item1.indexOf('<br/>') !== -1) {
                    item1 = item1.substring(0, item1.length - 5)
                  }
                  item1 = '<span class="text"><a href="#a' + index + '">' + item1 + '</a></span>'
                  this.catalogueList.push(item1)
                }
              })
            } else {
              index++
              if (item.indexOf('<br/>') !== -1) {
                item = item.substring(0, item.length - 5)
              }
              item = '<span class="text"><a href="#a' + index + '">' + item + '</a></span>'
              this.catalogueList.push(item)
            }
          })
        }
        // this.wikiContent.entryContentVos.map((item, index) => {
        //   let obj1 = {
        //     level: 1,
        //     value: item.contentTitle,
        //     id: item.id,
        //     mark: index,
        //     dataType: item.dataType
        //   }
        //   // obj1.value = obj1.value.substring(0, obj1.value.indexOf('<br/>'))
        //   if (obj1.value !== 'null' && obj1.value !== null && obj1.dataType === 1) {
        //     contentAry.push(obj1)
        //   }
        //   item.children.map(k => {
        //     let obj2 = {
        //       level: 2,
        //       value: k.contentTitle,
        //       id: k.id,
        //       mark: index,
        //       dataType: k.dataType
        //     }
        //     // obj2.value = obj2.value.substring(0, obj2.value.indexOf('<br/>'))
        //     if (obj2.value !== 'null' && obj2.value !== null && obj2.dataType === 1) {
        //       contentAry.push(obj2)
        //     }
        //     k.children.map(v => {
        //       let obj3 = {
        //         level: 3,
        //         value: v.contentTitle,
        //         id: v.id,
        //         mark: index,
        //         dataType: v.dataType
        //       }
        //       // obj3.value = obj3.value.substring(0, obj3.value.indexOf('<br/>'))
        //       if (obj3.value !== 'null' && obj3.value !== null && obj3.dataType === 1) {
        //         contentAry.push(obj3)
        //       }
        //     })
        //   })
        // })
        //均分contentList
        let average = Math.ceil(contentAry.length / 4)
        for (let i = 0, len = contentAry.length; i < len; i += average) {
          this.contentList.push(contentAry.slice(i, i + average))
        }
        //只显示dataType为1的引用
        var entryReferrencesList = []
        if (res.data.entryReferrences && res.data.entryReferrences.length > 0) {
          res.data.entryReferrences.map(item => {
            if (item.dataType === 1) {
              entryReferrencesList.push(item)
            }
          })
        }

        this.wikiContent.entryReferrences = entryReferrencesList
        //只显示dataType为1的属性
        const entryAttributesList = []
        entryAttributes.map(item => {
          if (item.dataType === 1) {
            entryAttributesList.push(item)
          }
        })
        this.wikiContent.entryAttributes = entryAttributesList.reduce((next, current) => {
          const type = parseInt(current.attributeType)
          switch (type) {
            case 4:
              current.attributeValue = new Date(Number(current.attributeValue)).getFullYear()
              break
            case 5:
              current.attributeValue =
                new Date(Number(current.attributeValue)).getFullYear() +
                '年' +
                (new Date(Number(current.attributeValue)).getMonth() + 1) +
                '月'
              break
            case 6:
              current.attributeValue =
                new Date(Number(item.attributeValue)).getFullYear() +
                '年' +
                new Date(Number(item.attributeValue)).getMonth() +
                1 +
                '月' +
                new Date(Number(item.attributeValue)).getDate() +
                '日'
              break
            case 7:
              current.attributeValue =
                new Date(Number(item.attributeValue)).getFullYear() +
                '年' +
                new Date(Number(item.attributeValue)).getMonth() +
                1 +
                '月' +
                new Date(Number(item.attributeValue)).getDate() +
                '日 ' +
                new Date(Number(item.attributeValue)).getHours() +
                ':' +
                new Date(Number(item.attributeValue)).getMinutes() +
                ':' +
                new Date(Number(item.attributeValue)).getSeconds()
              break
          }

          next.push({
            key: current.key,
            value: current.value
          })
          return next
        }, [])
      }
    },
    routeToEditOthersEntry() {
      let vm = this
      vm.$router.push({
        name: 'editOthersEntry',
        query: {
          versionId: vm.versionId,
          entryId: vm.entryId
        }
      })
    },
    chooseTag(item) {
      this.wikiContent.entryLabels.map(item => {
        this.$set(item, 'choosed', false)
      })
      this.$set(item, 'choosed', true)
    },
    goLink(link) {
      if (link.slice(0, 4) == 'http') {
        window.open(link)
      } else {
        window.open('http://' + link)
      }
    },
    slideToAnchor(target) {
      document.getElementById(target).scrollIntoView({ behavior: 'smooth' })
    },
    scrollRightNav(type) {
      let dom = document.getElementById('rightNav')
      switch (type) {
        case 'up':
          dom.scrollTo(dom.scrollLeft, dom.scrollTop + 100)
          break
        case 'down':
          dom.scrollTo(dom.scrollLeft, dom.scrollTop - 100)
          break
      }
    },
    slideToAnchor1(target) {
      this.wikiContent.entryContentVos.map(item => {
        this.$set(item, 'choosed', false)
        item.children.map(item1 => {
          this.$set(item1, 'choosed', false)
          item1.children.map(item2 => {
            this.$set(item2, 'choosed', false)
          })
        })
      })
      this.$set(target, 'choosed', true)
      document.getElementById(target.id).scrollIntoView({ behavior: 'smooth' })
    },
    toHistoryList(target) {
      this.$router.push({
        name: 'entryVersionList',
        query: {
          entryId: target
        }
      })
    },
    modify() {
      if (this.comment.trim() === '') {
        this.$message('请输入审核意见')
        return
      }
      audit({
        versionId: this.versionId,
        auditContent: this.comment,
        state: this.code // 3 通过  4 拒绝
      }).then(res => {
        let vm = this
        sessionStorage.setItem('auditShow', false)
        sessionStorage.setItem('auditShow1', false)
        sessionStorage.setItem('public', false)
        this.modalShow = false
        this.auditShow = false
        // this.auditShow1 = false
        this.public = !this.public
        this.$message.success('词条状态修改成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 爬取回来的网页样式的初始化 css
table {
  width: 100% !important;
  border: 1px solid #eee !important;
  border-bottom: none !important;
  th {
    font-weight: bold !important;
  }
  th,
  td {
    padding: 0.8em !important;
    border-bottom: 1px solid #eee !important;
    border-right: 1px solid #eee !important;
  }
}
</style>

<style lang="scss" scoped>
.main-content,
.text-indent {
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  text-indent: 2em;
}
.ck-content {
  line-height: 20px;
  .contentTitle {
    margin: 20px;
    font-weight: bolder;
  }
}
.ck-content /deep/ .table {
  margin-bottom: 10px;
}
.ck-content /deep/ .table,
.ck-content /deep/ .table thead,
.ck-content /deep/ .table tr,
.ck-content /deep/ .table td {
  border: 1px solid #666;
  padding: 9px 15px 7px;
  font-size: 26px;
  text-align: left;
  word-wrap: break-word;
  word-break: break-all;
}
/deep/ .ck-content a {
  /*pointer-events: none;*/
  /*color: #6f727c;*/
  text-decoration: none;
}
h2 {
  font-weight: bold;
}
h3 {
  font-weight: normal;
}
h2,
h3 {
  font-size: 28px;
}
.down-arrow,
.down-arrow-active {
  display: block;
  position: relative;
  width: 40px;
  height: 30px;
  position: absolute;
  bottom: 0;
  left: calc(50% - 20px);
  &:hover {
    cursor: pointer;
    :after {
      border-color: #338ce6;
    }
  }
}
.down-arrow-active {
  bottom: auto;
  top: 0;
}

.down-arrow::after,
.down-arrow-active::after {
  display: inline-block;
  content: ' ';
  height: 18px;
  width: 18px;
  border-width: 0 3px 3px 0;
  border-color: #999999;
  border-style: solid;
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform-origin: center;
  transition: transform 0.3s;
  position: absolute;
  top: 50%;
  right: 10px;
  margin-top: -10px;
}
// 加上active旋转成 上箭头
.down-arrow-active::after {
  transform-origin: center;
  transform: rotate(-135deg);
  transition: transform 0.3s;
}
/*修改样式*/
.ck-content .table,
.ck-content .table thead,
.ck-content .table tr,
.ck-content .table td {
  border: 1px solid #e2e5f3;
  padding: 9px 15px 7px;
  text-align: left;
  word-wrap: break-word;
  word-break: break-all;
}
.el-card__body {
  padding: 15px;
  background: #f6fafb;
}
.el-tag {
  background: #f6fafb;
  color: #909293;
  padding: 0 15px;
  margin-bottom: 15px;
  line-height: 1.5;
  height: 40px;
  margin-right: 35px;
  margin-bottom: 35px;
  font-size: 26px;
  &:hover {
    cursor: pointer;
  }
}
.el-tag-active {
  background: #338ce6;
  color: #fff;
}
.newsTitle {
  color: #338ce6;
  display: inline-block;
  margin: 60px 0 20px;
  font-size: 24px;
}
.newsData {
  border: 1px solid #ccc;
  padding: 20px;
  background-color: #fff;
}
.ck-content,
#attribute,
#catalogue {
  height: auto;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  font-size: 26px;
  color: #6f727c;
}
#reference,
#tag {
  font-weight: normal;
}

.card-title {
  /*font-weight: bold;*/
  margin-bottom: 10px;
  span {
    color: #333333;
  }
}
.pd-left-10 {
  padding-left: 10px;
}
.ck-rounded-corners .ck.ck-editor__editable:not(.ck-editor__nested-editable),
.ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-rounded-corners {
  border: 1px solid #ccc;
}
.btn-column {
  margin-left: 0 !important;
  margin-top: 10px;
  width: 100%;
}
.mg-top-20 {
  margin-top: 20px;
}
.content-level2 {
  margin-left: 40px;
}
.content-level3 {
  margin-left: 80px;
}
.btn-row {
  width: 100px;
  float: right;
  margin-right: 10px;
}
.block {
  color: white;
  padding: 5px 10px;
  background: #338ce6;
  position: relative;
}
.block::after {
  content: '';
  display: block;
  position: absolute;
  box-shadow: -120px 0 10px 0px #bbb;
  width: 116px;
  height: 37px;
  top: -11px;
  right: -118px;
  z-index: -1;
  transform: skew(0, -11deg);
}
.el-card__header span {
  font-weight: bold;
}
.block-container {
  /*background: #eee;*/
  /*padding: 20px;*/
  border-top: 1px solid #eee;
  h6 {
    font-weight: normal;
  }
}
.pd-20 {
  padding: 20px;
}
.quote-btn {
  color: #8a8a8a;
  font-weight: normal;
  padding-right: 10px;
  cursor: pointer;
}
.box-card p {
  margin: 5px 0;
  font-size: 26px;
  line-height: 1.5;
}
.el-form-item {
  margin-bottom: 10px;
}
.box-card {
  position: fixed !important;
  top: 60px;
  width: 350px;
  // margin-top: 50px;
  margin-left: 50px;
}
.el-card {
  background: #f6fafb;
}
.p1 {
  font-size: 26px;
  font-weight: bolder;
}
.p2 {
  font-size: 24px;
  padding-left: 10px;
}
.p3 {
  font-size: 22px;
  padding-left: 20px;
  font-weight: lighter;
}
.pd-top-5 {
  padding-top: 5px;
}
a.catalogue {
  display: block;
  cursor: pointer;
  margin: 5px 0;
  font-weight: 500;
}

/*右侧导航样式*/
.rightNav::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
.rightNav::-webkit-scrollbar-thumb {
  background-color: #338ce6;
  background-clip: padding-box;
  min-height: 5px;
  -webkit-border-radius: 1em;
  -moz-border-radius: 1em;
  border-radius: 1em;
}
.rightNav {
  .catalogue {
    text-decoration: none;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-bottom: 4px;
    height: 26px;
    line-height: 1;
  }
  .catalogue1 {
    font-weight: 700;
    color: #666;
    padding-left: 10px;
    font-size: 26px;
  }
  .catalogue2 {
    font-size: 24px;
    padding-left: 20px;
    color: #666;
  }
  .catalogue3 {
    font-size: 22px;
    padding-left: 40px;
    color: #666;
  }
  .current {
    background: #e2eff9;
    position: relative;
    :before {
      content: '';
      width: 5px;
      height: 20px;
      background: #338ce6;
      position: absolute;
      left: 0;
      top: 5px;
    }
  }
}

.text-center {
  text-align: center;
}
.juedui_middle {
  position: relative;
}
.vertical-middle {
  font-weight: 500;
  width: 60%;
  /*height: 16px;*/
  margin: auto;
  line-height: 84px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
ul li {
  line-height: 1.5;
}

.audit-title {
  margin: 0;
  padding: 10px 10px 10px 0;
  font-size: 18px;
  font-weight: bold;
  span {
    border-left: 5px solid #007fff;
    padding-left: 15px;
  }
}

#attribute .entry-attr {
  /*border-bottom: 1px dotted rgb(204, 204, 204);*/
  display: flex;
  flex-wrap: wrap;
  padding: 15px 0;
  li {
    width: 45%;
    padding: 10px;
    border-bottom: 1px dotted rgb(204, 204, 204);
    display: flex;
    div {
      box-sizing: border-box;
      width: 50%;
      &.key {
        padding-left: 20px;
        font-weight: bolder;
        /*text-align: center;*/
      }
    }
  }
}

// 所有详情页外部来的图片的 wrapper className 统一处理
$classNameList: img_r, lemma-picture, lemma-album;

#content {
  color: #1a2237;
  height: auto;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  @each $value in $classNameList {
    /deep/ .#{$value} {
      float: right;
      text-align: center;
      display: flex;
      flex-direction: column;
      margin: 3px 20px;
      text-indent: 0;
      box-shadow: 0 0 1px 0 #b5b5b5;
      border: 1px solid rgba(181, 181, 181, 0.4);
      strong {
        padding: 5px;
        font-weight: normal;
        color: #666666;
      }
    }
  }
}
</style>
