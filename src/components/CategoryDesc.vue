<template>
    <div class="ivu-list-item-meta">
        <div style="text-align:left">
            <div class="ivu-list-item-meta-title">
                <h3 v-show="titleShow">
                    {{item.title}}
                    <Icon type="ios-create" style="cursor: pointer" @click="titleShow=false"/>
                </h3>
                <p v-show="!titleShow"><input type="text" v-model="item.title" @keyup.enter="editTitle" /></p>
            </div>
            <div class="ivu-list-item-meta-description" v-show="descShow" @click="descShow=false">{{item.desc}}</div>
            <p v-show="!descShow"><i-input type="text" v-model="item.desc" @on-enter="editDesc"></i-input></p>
        </div>
        <slot name="desc"></slot>
    </div>
</template>

<script>
    import {put_album} from "../api";

    export default {
        name: 'CategoryDesc',
        props: ['item'],
        data(){
            return {
                titleShow: true,
                descShow: true
            }
        },
        methods:{
            editTitle(){
                this.titleShow=true;
                put_album(
                    {id: this.item.id, title: this.item.title},
                    () => {
                        this.$Message.success('修改成功');
                        this.$emit('edit')
                    },
                    () => {this.$Message.error('修改失败')}
                )
            },
            editDesc(){
                this.descShow=true;
                put_album(
                    {id: this.item.id, desc: this.item.desc},
                    () => {
                        this.$Message.success('修改成功');
                        this.$emit('edit')
                    },
                    () => {this.$Message.error('修改失败')}
                )
            }
        }
    }
</script>