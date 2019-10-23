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

<template>
    <List item-layout="vertical">
        <ListItem v-for="(item, index) in picList" :key="index">
            <CategoryDesc :item="item"/>
            <Row  :gutter="16" class="code-row-bg">
                <i-col span="6" style="margin-top:5px">
                    <Card class="float" :to="{name:'pic_cate',params:{id:item.id}}">
                        <div style="text-align:center">
                            <img :src="item.pic[0].url" style="width: 150px; height: 150px;"/>
                        </div>
                        <p class="abs">{{item.pic.length}}</p>
                    </Card>
                </i-col>
            </Row>
        </ListItem>
    </List>
</template>

<script>
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
                    {'id':1,"name": "我的最爱","desc": "记录我的最爱", "pic": [{"url": "/img/logo.82b9c7a5.png", "desc": "描述"}] },
                    {'id':2,"name": "高中","desc": "记录我的高中", "pic": [{"url": "/img/logo.82b9c7a5.png", "desc": "描述"}] },
                    {'id':3,"name": "大学","desc": "记录我的大学", "pic": [{"url": "/img/logo.82b9c7a5.png", "desc": "描述"}] },
                    {'id':4,"name": "工作照","desc": "记录我的工作照", "pic": [{"url": "/img/logo.82b9c7a5.png", "desc": "描述"}] }
                ]
            }
        },
        methods:{

        }
    }

</script>