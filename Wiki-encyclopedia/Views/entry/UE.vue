<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
import '../../../public/UEditor/ueditor.config.js'
import '../../../public/UEditor/ueditor.all.js'
import '../../../public/UEditor/lang/zh-cn/zh-cn.js'

export default {
  name: 'ue',
  data() {
    return {
      editor: null
    }
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object,
      serverUrl: '/baseApi/file/uploadFile',
      // ,
      UEDITOR_HOME_URL: '/UEditor/'
    },
    id: {
      type: String
    }
  },
  mounted() {
    const _this = this
    this.editor = window.UE.getEditor('editor', this.config) // 初始化UE
    //初始化UE
    // const _this = this;
    // this.editor = UE.delEditor("editor");
    // this.editor = UE.getEditor('editor',this.config);

    // this.editor = window.UE.getEditor('editor', this.config);
    // this.editor.addListener('ready',  () => {
    //     this.editor.setContent(this.value)
    // })
  },
  methods: {
    getUEContent() {
      return this.editor.getContent()
    },
    getContentTxt() {
      return this.editor.getContentTxt()
    },
    setUEContent(value) {
      // this.editor.addListener('ready',  (value) => {
      //     this.editor.setContent(value)
      // })
      this.editor.setContent(value)
    },
    init() {
      const _this = this
      this.editor = window.UE.getEditor('editor', this.config) // 初始化UE
    }
  },
  destroyed() {
    this.editor.destroy()
  }
}
</script>
<style lang="scss" scoped>
.edit {
  width: 1200px;
  margin: auto;
}
</style>
