<template>
    <div>
        <ButtonGroup style="margin-left: 10px">
            <Button type="info" ghost @click="handleOpenModal">上传图片</Button>
            <Button type="info" ghost>批量管理</Button>
        </ButtonGroup>
        <Modal
                footer-hide
                title="上传图片"
                v-model="modal"
                class-name="vertical-center-modal"
                width="800"
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
                                ref="upload"
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
                                v-show="!$refs.upload || !$refs.upload.active"
                                @click="handleUpload"
                        >开始上传</Button>
                        <Button type="default"
                                v-show="$refs.upload && $refs.upload.active"
                                @click.prevent="$refs.upload.active = false"
                        >取消上传</Button>
                    </ButtonGroup>
                </div>
            </div>
            <Upload
                    ref="upload"
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
                    <Icon type="md-images" />
                    <p>上传图片</p>
                </Button>
            </Upload>

        </Modal>

    </div>
</template>

<script>
import {baseUrl} from '../api/baseUrl'
import {store} from '../store'
import {lastState} from '../store/config'

export default {
    name: 'uploadPic',
    data(){
        return {
            baseUrl: baseUrl + '/upload/img',
            modal: false,
            select: {id:1, label:"我"},
            files: [],
            cateList: [],
            imageUrl: "",
            defaultList: [
                {
                    'name': 'a42bdcc1178e62b4694c830f028db5c0',
                    'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                },
                {
                    'name': 'bc7521e033abdd1e92222d733590f104',
                    'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                }
            ],
            imgName: '',
            visible: false,
            uploadList: [{
                'name': 'a42bdcc1178e62b4694c830f028db5c0',
                'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
            },]
        }
    },
    methods: {
        handleSuccess(res){
            if (res.code === 0){
                this.$Message.success("上传成功");
                this.files = [];
            }else{
                // 上传失败
                window.console.log(res.msg);
                this.$Notice.error({
                    title: "上传失败",
                    desc: res.msg
                })
            }
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
        handleRemove(file){
          this.files.splice(this.files.indexOf(file), 1)
        },
        handleBeforeUpload (file) {
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: 'Up to five pictures can be uploaded.'
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
        handleOpenModal(){
            this.modal = true;
            const id = this.$route.params.id
            this.cateList = [{id: id}]
            this.select = id
            if(lastState) this.cateList = lastState.picList
            else this.cateList = store.state.picList
        },
        /**
         * 上传逻辑
         * */
        handleUpload(){
            this.files.map((item)=>{
                this.$refs.upload.data = {id: this.select}
                this.$refs.upload.post(item)
            })
        }

    }
}
</script>

<style lang="less">
    .center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .vertical-center-modal{
        .center
        .ivu-modal{
            top: 0;
        }
        .ivu-modal-content{
            min-height:400px;
        }
        .ivu-modal-body{
            min-height:400px;
            .center
        }
        button{
            width:200px;
            height:50px;
            border-radius: 5px
        }
    }
    .upload-list{
        position: relative;
        width: 100%;
        min-height: 400px;
    }
    .demo-upload-btn{
        position:absolute;
        bottom: 30px;
    }
    .demo-ul{
        position:absolute;
    }
    .demo-upload-list{
        position: relative;
        width:150px;
        height:150px;
        line-height:150px;
        float: left;
        text-align: center;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .upload-btn{
        cursor:pointer;
        border:dotted 1px #ccc;
        box-shadow: none;
        .ivu-upload{
            width:150px;
        }
    }
    .upload-btn:hover{
        border:dotted 1px deepskyblue;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        line-height: 40px;
        height:40px;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    .modal-header{
        .ivu-list-item {
            padding:0;
        }
        .ivu-avatar {
            border-radius: 0;
        }
        .ivu-select-item{
            width:100%;
        }
    }
</style>