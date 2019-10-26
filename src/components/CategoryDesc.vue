<template>
    <div class="ivu-list-item-meta">
        <!--<div class="ivu-list-item-meta-avatar">-->
            <!--<div class="ivu-avatar ivu-avatar-circle ivu-avatar-image ivu-avatar-default">-->
                <!--<img src="../assets/logo.png" alt="">-->
            <!--</div>-->
        <!--</div>-->
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
                this.$Message.success('修改成功');
            }
        }
    }
</script>