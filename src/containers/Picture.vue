<template>
    <div>
        <List v-if="!cateList.length">
            <p>暂无相册，开始创建吧</p>
            <Button @click="modal=true">
                创建相册
            </Button>
        </List>
        <List item-layout="vertical" v-else>
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
        <Modal v-model="modal" title="创建相册">
            <CreateAlbum @close="modal=false">
            </CreateAlbum>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    import {mapMutations, mapState} from 'vuex'
    import CategoryDesc from '../components/CategoryDesc'
    import {get_album} from "../api";
    import CreateAlbum from '../components/CreateAlbum'

    export default {
        name: "pic",
        components:{
            CategoryDesc, CreateAlbum
        },
        data(){
            return {
                logo : "/img/logo.82b9c7a5.png",
                modal: false
            }
        },
        computed: {
            ...mapState(['cateList', 'picList'])
        },
        methods:{
            ...mapMutations(['SET_PIC_LIST', 'CATE_LIST']),
            getPicList(){
                get_album({},
                    (data) => {
                        let arr = [];
                        data.data.map((item) => {
                            let obj = {
                                id: item.id,
                                title: item.title,
                                desc: item.desc,
                                pic: item.cover || this.logo,
                                len: item.pic.length
                            }
                            arr.push(obj)
                        })
                        this.CATE_LIST(arr)
                        this.SET_PIC_LIST(data.data)
                    }
                )
            },
            closeModal(){
                this.modal = false
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