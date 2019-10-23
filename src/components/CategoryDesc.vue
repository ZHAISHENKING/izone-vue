<template>
    <div class="ivu-list-item-meta">
        <div class="ivu-list-item-meta-avatar">
            <div class="ivu-avatar ivu-avatar-circle ivu-avatar-image ivu-avatar-default">
                <img src="../assets/logo.png" alt="">
            </div>
        </div>
        <div class="ivu-list-item-meta-content" style="text-align:left">
            <div class="ivu-list-item-meta-title">
                <p v-if="show">
                    {{item.name}}
                    <Icon type="ios-create" style="cursor: pointer" @click="show=false" />
                </p>
                <p v-else><input type="text" v-model="item.name" @keyup.enter="show=true" /></p>
            </div>
            <div class="ivu-list-item-meta-description">{{item.desc}}</div>
        </div>
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
        }
    }
</script>