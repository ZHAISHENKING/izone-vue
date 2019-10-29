<template>
    <List item-layout="vertical">
        <ListItem v-for="(item, index) in cateList" :key="index">
            <CategoryDesc :item="item" @edit="getPicList" />
            <Row  :gutter="16" class="code-row-bg">
                <i-col span="6" style="margin-top:5px">
                    <Card class="float" :to="{name:'pic_cate',params:{id:item.id}}">
                        <div style="text-align:center">
                            <img :src="item.pic" style="width: 150px; height: 150px;"/>
                        </div>
                        <p class="abs">{{item.len}}</p>
                    </Card>
                </i-col>
            </Row>
        </ListItem>
    </List>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    import CategoryDesc from '../components/CategoryDesc'
    import {get_category} from "../api";

    export default {
        name: "pic",
        components:{
            CategoryDesc
        },
        props: ['item'],
        data(){
            return {
                logo : "/img/logo.82b9c7a5.png",
            }
        },
        computed: {
            ...mapState(['cateList', 'picList'])
        },
        methods:{
            ...mapMutations(['SET_PIC_LIST', 'CATE_LIST']),
            getPicList(){
                get_category({},
                    (data) => {
                        let arr = [];
                        data.data.map((item) => {
                            // 接口数据解析，默认缩略图pic展示分类下第一张图片
                            let pic = JSON.stringify(item.pic)
                            // 分类下没有图片展示默认图
                            if (pic === '[]') pic = this.logo
                            else pic = item.pic[0].image_url
                            let obj = {
                                id: item.id,
                                title: item.title,
                                desc: item.desc,
                                pic: pic,
                                len: item.pic.length
                            }
                            arr.push(obj)
                        })
                        this.CATE_LIST(arr)
                        this.SET_PIC_LIST(data.data)
                    }
                )
            }
        },
        created(){
            this.getPicList()
        },
    }

</script>

<style>
    .float{
        position: relative;
    }
    .abs{
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: rgba(55,55,55,.6);
        color: #fff;
        font-size: 30px;
    }
</style>