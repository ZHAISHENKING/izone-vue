<template>
    <div>
        <CategoryDesc :item="items" @edit="getPicList">
            <div slot="desc" class="desc">
                <UploadPic></UploadPic>
            </div>
        </CategoryDesc>
        <Row :gutter="16" class="code-row-bg" justify="start" type="flex" style="min-height:300px;">
            <i-col span="4" v-for="(item, index) in img_list" :key="index" >
                <Card class="card">
                    <img :src="item.image_url" :alt="item.desc" style="width:100%; height:100px;">
                    <p class="ivu-divider-with-text-center center">{{item.desc}}</p>
                </Card>
            </i-col>
        </Row>
    </div>
</template>

<script>
    import {get_img} from "../../api";
    import CategoryDesc from '../../components/CategoryDesc'
    import UploadPic from '../../components/UploadPic.vue';
    import {mapMutations} from 'vuex'
    export default {
        name: 'pic_cate',
        components: {
            CategoryDesc, UploadPic
        },
        props: ['item'],
        data(){
            return {
                items: {"desc": "描述", "name": "我最爱的", "id": 1},
                img_list: [
                    {"url":'/img/logo.82b9c7a5.png', 'date': "2017-9-12"},
                    {"url":'/img/logo.82b9c7a5.png', 'date': "2017-9-12"}
                ]
            }
        },
        methods:{
            ...mapMutations(["getPicList"])
        },
        created(){
            let id = this.$route.params.id
            get_img({id}).then((data)=>{
                let _ = data.data;
                if (_.code === 0 && _.data){
                    this.items = _.data
                    this.img_list = _.data.pic
                }
            })
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