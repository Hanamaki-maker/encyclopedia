import request from '@/utils/axios'
//获取分类树状数据
export function categoryTree(data) {
  return request({
    url: '/wiki-backend/api/category/loadTree',
    method: 'post',
    data
  })
}

// 获取内部词条
export function getInternalEntryList(data) {
  return request({
    url: '/wiki-backend/api/category/loadTreeInner',
    method: 'post',
    data
  })
}

// 词条版本审核下载
export function dataExport(data) {
  return request({
    url: '/wiki-backend/api/entry/dataExport',
    method: 'post',
    data
  })
}

//获取模板数据列表
export function list(data) {
  return request({
    url: '/wiki-backend/api/categoryAttributeTemplate/list',
    method: 'post',
    data
  })
}
//新增/更新分类属性模板
export function save(data) {
  return request({
    url: '/wiki-backend/api/categoryAttributeTemplate/save',
    method: 'post',
    data
  })
}
//通过ID查询分类模板详细---
export function info111(data) {
  return request({
    url: '/wiki-backend/api/categoryAttributeTemplate/info111',
    method: 'post',
    data
  })
}
//通过ID查询分类模板详细
export function info(data) {
  return request({
    url: '/wiki-backend/api/categoryAttributeTemplate/info',
    method: 'post',
    data
  })
}
//通过ID删除对应的模板
export function attrDelete(data) {
  return request({
    url: '/wiki-backend/api/categoryAttributeTemplate/delete',
    method: 'post',
    data
  })
}
//通过分类ID获取属性模板数据（包含分类父级）
export function getAllAttributesByCategoryId(data) {
  return request({
    url: '/wiki-backend/api/categoryAttributeTemplate/getAttributesByCategoryId',
    method: 'post',
    data
  })
}
//查询关联词条
export function findEntry(data) {
  return request({
    url: '/wiki-backend/api/entry/relate/find',
    method: 'post',
    data
  })
}
//删除词条关联信息
export function deleteEntry(data) {
  return request({
    url: '/wiki-backend/api/entry/relate/delete',
    method: 'post',
    data
  })
}
//两个词条做关联
export function relatedEntry(data) {
  return request({
    url: '/wiki-backend/api/entry/relate/related',
    method: 'post',
    data
  })
}
//模糊查找词条
export function getEntryAll(data) {
  return request({
    url: '/wiki-backend/api/service/getEntryAllMsg',
    method: 'post',
    data
  })
}


// 两个词条做关联
// /api/entry/related

// 参数：
// fromId      当前词条
// toId          要关联的词条id
// descript   关联备注

// ---------------------------------------------------

// 查询关联词条
// /api/entry/find

// 参数：
// fromId      词条Id

// ---------------------------------------------------

// 删除词条关联信息
// /api/entry/delete

// 参数：
// id          关联id

// ---------------------------------------------------

// 更新词条关联信息
// /api/entry/update

// 参数：
// id          关联id
// fromId      词条id
// toId        关联的词条id
//查找词条
