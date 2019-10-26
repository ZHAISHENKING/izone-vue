<template>
    <List item-layout="vertical">
        <ListItem v-for="(item, index) in picList" :key="index">
            <CategoryDesc :item="item"/>
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
    import {get_category} from "../api";
    import {store} from '../store'
    import CategoryDesc from '../components/CategoryDesc'
    export default {
        name: "pic",
        components:{
            CategoryDesc
        },
        props: ['item'],
        data(){
            return {
                picList: [
                    // {
                    //     'id':1,"title": "我的最爱","desc": "记录我的最爱",
                    //     "pic": "/img/logo.82b9c7a5.png"
                    // },
                ],
                logo: "/img/logo.82b9c7a5.png"
            }
        },
        created(){
            get_category({}).then((data)=>{
                let all = data.data;
                if(all.code === 0 && all.data){
                    let arr = [];
                    all.data.map((item) => {
                        // 接口数据解析，默认缩略图pic展示分类下第一张图片
                        let pic = JSON.stringify(item.pic)
                        // 分类下没有图片展示默认图
                        if (pic == '[]') pic = this.logo
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
                    this.picList = arr
                    store.commit('setPicList', this.picList)
                }

            })
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