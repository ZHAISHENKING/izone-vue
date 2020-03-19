<template>
  <div>
    <ButtonGroup style="margin-left: 10px">
      <Button type="info" ghost @click="handleOpenModal">上传图片</Button>
      <Button type="info" ghost @click="$emit('check')">批量管理</Button>
    </ButtonGroup>
    <Modal
        ref="modal"
        footer-hide
        title="上传图片"
        v-model="modal"
        class-name="vertical-center-modal"
        width="800"
        @on-cancel="handleCloseModal"
    >
      <div slot="header">
        <div class="modal-header">
          <p>上传到</p>
          <Select v-model="select" style="width:250px;">
            <List>
              <ListItem v-for="item in cateList" :key="item.id">
                <Option :value="item.id" :label="item.title">
                  <ListItemMeta :avatar="item.pic" :description="+item.len+'张'" :title="item.title">
                    {{item.title}}
                  </ListItemMeta>
                </Option>
              </ListItem>
            </List>
          </Select>
        </div>
      </div>
      <div v-if="files.length" class="upload-list">
        <ul class="demo-ul">
          <li class="demo-upload-list" v-for="(item, index) in files" :key="index">
            <img :src="item.blob" style="width:150px; height:150px;">
            <div class="demo-upload-list-cover">
              <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
          </li>
          <li class="demo-upload-list upload-btn" v-if="files.length<5">
            <Upload
                ref="file"
                v-model="files"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                :action="baseUrl"
            >
              <Icon type="ios-camera" size="50"></Icon>
            </Upload>
          </li>
        </ul>
        <div class="demo-upload-btn">
          <ButtonGroup>
            <Button type="primary" ghost
                    v-show="!$refs.file || !$refs.file.active"
                    @click="handleUpload"
            >开始上传
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <Upload
          ref="file"
          v-model="files"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          multiple
          :action="baseUrl"
          v-else
      >
        <Button type="primary">
          <Icon type="md-images"/>
          <p>上传图片</p>
        </Button>
      </Upload>
    </Modal>
  </div>
</template>

<script>
    import {baseUrl} from '../api/baseUrl'
    import {mapState, mapMutations, mapActions} from 'vuex'

    export default {
        name: 'uploadPic',
        data() {
            return {
                baseUrl: baseUrl + '/upload/img',
                modal: false,
                select: null,
                files: [],
                successList: [],
                imageUrl: "",
                visible: false
            }
        },
        computed: {
            ...mapState(['cateList'])
        },
        methods: {
            ...mapActions(['GET_CATE']),
            ...mapMutations(['INIT_PIC_LIST', 'SET_PIC_LIST']),
            /**
             * 上传格式化错误
             * */
            handleFormatError(file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            /**
             * 上传大小超出
             * */
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            /**
             * 移除图片
             * */
            handleRemove(file) {
                this.files.splice(this.files.indexOf(file), 1)
            },
            /**
             * 上传格式化错误
             * */
            handleBeforeUpload(file) {
                const check = this.files.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '每次最多上传5张图片.'
                    });
                }
                // blob生成预览图
                let URL = window.URL || window.webkitURL;
                if (URL && URL.createObjectURL) {
                    file.blob = URL.createObjectURL(file);
                    this.files.push(file)
                }
                return false;
            },
            /**
             * 开启模态框
             * */
            handleOpenModal() {
                this.modal = true;
                const id = this.$route.params.id
                this.select = parseInt(id)
            },
            /**
             * 关闭模态框
             * */
            handleCloseModal() {
                this.$refs.modal.visible = true;
                this.modal = true;
                if (this.files.length) {
                    this.$Modal.confirm({
                        title: "是否终止本次上传？",
                        content: '<p>点击确定将终止</p>',
                        loading: true,
                        onOk: () => {
                            setTimeout(() => {
                                this.$Modal.remove();
                                this.modal = false;
                                this.files = [];
                                this.successList = [];
                            }, 2000)
                        }
                    })
                } else this.modal = false

            },
            /**
             * 上传提交
             * */
            handleUpload() {
                this.files.map((item) => {
                    this.$refs.file.data = {id: this.select}
                    this.$refs.file.post(item)
                })
            },
            /**
             * 上传成功
             * */
            handleSuccess(res, file) {
                if (res.code === 0) {
                    this.successList.push(file);
                    // 由于iview上传是map显示提交，会触发多次success
                    // 判断提交图片和成功上传图片长度是否一致
                    if (this.successList.length === this.files.length) {
                        this.$Message.success("上传成功");
                        this.files = [];
                        this.successList = [];
                        this.INIT_PIC_LIST()
                        this.$emit('change')
                        this.GET_CATE()
                    }
                }
            },
        },
        mounted() {
            this.INIT_PIC_LIST()
        }
    }
</script>

<style lang="less">
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .vertical-center-modal {
    .center
    .ivu-modal {
      top: 0;
    }

    .ivu-modal-content {
      min-height: 400px;
    }

    .ivu-modal-body {
      min-height: 400px;
      .center
    }

    button {
      width: 200px;
      height: 50px;
      border-radius: 5px
    }
  }

  .upload-list {
    position: relative;
    width: 100%;
    min-height: 400px;
  }

  .demo-upload-btn {
    position: absolute;
    bottom: 30px;
  }

  .demo-ul {
    position: absolute;
  }

  .demo-upload-list {
    position: relative;
    width: 150px;
    height: 150px;
    line-height: 150px;
    float: left;
    text-align: center;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .upload-btn {
    cursor: pointer;
    border: dotted 1px #ccc;
    box-shadow: none;

    .ivu-upload {
      width: 150px;
    }
  }

  .upload-btn:hover {
    border: dotted 1px deepskyblue;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    line-height: 40px;
    height: 40px;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

  .modal-header {
    .ivu-list-item {
      padding: 0;
    }

    .ivu-avatar {
      border-radius: 0;
    }

    .ivu-select-item {
      width: 100%;
    }
  }
</style>