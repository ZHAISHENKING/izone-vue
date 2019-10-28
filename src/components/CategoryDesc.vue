<template>
    <div class="ivu-list-item-meta">
        <div style="text-align:left">
            <div class="ivu-list-item-meta-title">
                <h3 v-if="show">
                    {{item.title}}
                    <Icon type="ios-create" style="cursor: pointer" @click="show=false"/>
                </h3>
                <p v-else><input type="text" v-model="item.title" @keyup.enter="editTitle" /></p>
            </div>
            <div class="ivu-list-item-meta-description">{{item.desc}}</div>
        </div>
        <slot name="desc"></slot>
    </div>
</template>

<script>
    import {put_cate} from "../api";

    export default {
        name: 'CategoryDesc',
        props: ['item'],
        data(){
            return {
                show: true,
            }
        },
        methods:{
            editTitle(){
                this.show=true;
                put_cate({id: this.item.id, title: this.item.title}).then(data=>{
                    const _ = data.data;
                    if (_.code ===0){
                        this.$Message.success('修改成功');
                        this.$emit('edit')
                    }
                    else this.$Message.error('修改失败');
                })
            }
        }
    }
</script>