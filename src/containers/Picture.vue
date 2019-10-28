<template>
    <List item-layout="vertical">
        <ListItem v-for="(item, index) in picList" :key="index">
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
    export default {
        name: "pic",
        components:{
            CategoryDesc
        },
        props: ['item'],

        computed:{
            ...mapState(['picList'])
        },
        methods:{
            ...mapMutations(["getPicList"])
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