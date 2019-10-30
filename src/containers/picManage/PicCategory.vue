<template>
    <div>
        <CategoryDesc :item="items" @edit="INIT_PIC_LIST">
            <div slot="desc" class="desc">
                <UploadPic @change="getImg" @check="is_check=!is_check"></UploadPic>
            </div>
        </CategoryDesc>
        <CheckboxGroup v-model="box">
            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;" v-if="is_check">
                <Checkbox
                    :indeterminate="indeterminate"
                    :value="checkAll"
                    @click.prevent.native="handleCheckAll"
                >
                    全选
                </Checkbox>
                <Button @click="handleDelete">删除</Button>
                <Button @click="is_check=false">取消管理</Button>
            </div>
            <viewer :images="img_list">
            <Row :gutter="16" class="code-row-bg" justify="start" type="flex" style="min-height:300px;">
                <i-col span="4" v-for="(item, index) in img_list" :key="index" >
                    <Card class="card">
                        <img :src="item.image_url" :alt="item.desc" style="width:100%; height:100px;">
                        <p class="ivu-divider-with-text-center center">{{item.desc}}</p>
                    </Card>
                    <Checkbox border :label="item.id" v-if="is_check">
                    </Checkbox>
                </i-col>
            </Row>
            </viewer>
        </CheckboxGroup>
    </div>
</template>

<script>
    import {get_img, delete_img} from "../../api";
    import CategoryDesc from '../../components/CategoryDesc'
    import UploadPic from '../../components/UploadPic.vue';
    import {mapMutations, mapActions} from 'vuex'
    export default {
        name: 'pic_cate',
        components: {
            CategoryDesc, UploadPic
        },
        props: ['item'],
        data(){
            return {
                is_check: false,
                items: {"desc": "描述", "name": "我最爱的", "id": 1},
                img_list: [
                    {"url":'/img/logo.82b9c7a5.png', 'date': "2017-9-12"},
                    {"url":'/img/logo.82b9c7a5.png', 'date': "2017-9-12"}
                ],
                box: [],
                checkAll: false,
                indeterminate: false
            }
        },
        methods:{
            ...mapActions(['GET_CATE']),
            ...mapMutations(["INIT_PIC_LIST"]),
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;
                if (this.checkAll) {
                    this.box = this.img_list.map(o=>o.id);
                } else {
                    this.box = [];
                }
            },
            handleDelete(){
                if (this.box.length === 0){
                    this.$Message.warning('请选择图片')
                    return false
                }
                delete_img(
                    {ids: this.box.toString()},
                    () => {
                        this.$Message.success("删除成功")
                        this.getImg();
                        this.GET_CATE();
                        this.box = [];
                    },
                    () => {this.$Message.success("删除失败")}
                )
            },
            getImg(){
                let id = this.$route.params.id
                get_img(
                    {id},
                    res => {
                        this.items = res.data;
                        this.img_list = res.data.pic
                    }
                )
            }
        },
        created(){
            this.getImg()
        }
    }
</script>

<style scoped>
    .desc{
        font-size: 1rem;min-height:50px;
    }
    .card {
        margin: 32px 0; height:150px; position: relative;
        cursor: pointer;
    }
    .center {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: rgba(55,55,55,.6);
        color: #fff;
        font-size: 14px;
        height:30px;
        line-height:30px;
    }
</style>