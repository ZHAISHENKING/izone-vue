<template>
    <Menu mode="horizontal" theme="dark" active-name="img">
        <MenuItem name="pic" to="/pic">
            <Icon type="ios-paper" />
            相册
        </MenuItem>
        <MenuItem name="video" to="/video">
            <Icon type="ios-people" />
            视频
        </MenuItem>
        <Dropdown style="margin-left:20px;" placement="bottom-start" @on-click="handleChange">
            <div class="layout-logo">
                <img :src="cover" alt="" style="width:100%">
                <div class="layout-name">
                    <span>
                        {{name}}
                        <Icon type="ios-arrow-down"></Icon>
                    </span>
                </div>
            </div>
            <DropdownMenu slot="list">
                <DropdownItem name="cover">更换头像</DropdownItem>
                <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <MyUpload
                ref="cover"
                field="file"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
                v-model="show"
                :width="40"
                :height="40"
                :url="url"
                :headers="headers"
        >
        </MyUpload>
    </Menu>
</template>

<script>
    import {baseUrl} from '../api/baseUrl'
    import MyUpload from 'vue-image-crop-upload';
    import store2 from 'store2'
    export default{
        name: 'nav-menu',
        components:{MyUpload},
        computed:{
            headers(){
                return {jwt: store2.get('jwt')}
            }
        },
        data(){
            return {
                url: baseUrl + '/user/cover',
                imgDataUrl:'',
                show: false,
                name: store2.get('name'),
                cover: store2.get('user').cover
            }
        },
        methods:{
            handleChange(name){
                switch(name){
                    case 'cover':
                        this.show = !this.show;
                        break;
                    case 'logout':
                        store2.set('name', null)
                        store2.set('user', null)
                        store2.set('jwt', null)
                        this.$Message.info('退出成功，即将跳转')
                        setTimeout(()=>this.$router.push('/login'), 1500)
                        break;
                    default:
                        break;
                }
            },
            cropSuccess(imgDataUrl){
                this.imgDataUrl = imgDataUrl;
            },
            // 上传成功
            cropUploadSuccess(jsonData){
                if (jsonData.code === 0){
                    let user = store2.get('user')
                    user.cover = jsonData.data
                    store2.set('user', user)
                    this.cover = jsonData.data
                }else {
                    this.$Message.error("上传失败. 请重试")
                }
            },
            /**
             * upload fail
             *
             * [param] status    server api return error status, like 500
             * [param] field
             */
            cropUploadFail(status, field){
                this.$Notice.error({
                    title: status,
                    desc: field
                })
            }
        }
    }
</script>

<style lang="less">
    .layout-logo{
        width: 30px;
        height: 30px;
        background: #5b6270;
        border-radius: 50%;
        top: 15px;
        right: 40px;
        .layout-name{
            min-width:100px;
            height: 30px;
            top: -13px;
            position: absolute;
            left: 20px;
            color: #fff;
        }
    }
    .ivu-dropdown{
        cursor: pointer;
        top: 17px;
        position: relative;
        float: right;
        right: 65px;
    }
</style>
