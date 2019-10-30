<template>
    <Form :model="formItem" :label-width="100">
        <FormItem label="相册名称：">
            <i-input v-model="formItem.title"></i-input>
        </FormItem>
        <FormItem label="相册描述：">
            <i-input type="textarea" v-model="formItem.desc" placeholder="说说这个相册的故事... (非必填)"
                     :autosize="{minRows: 2,maxRows: 5}"></i-input>
        </FormItem>
        <FormItem label="相册分类：" style="width:300px;">
            <i-select v-model="formItem.cate">
                <Option v-for="cate in cates" :label="cate" :key="cate" :value="cate"></Option>
            </i-select>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="submit">确定</Button>
            <Button style="margin-left: 8px" @click="handleCancel">取消</Button>
        </FormItem>
    </Form>
</template>

<script>
    import {create_album} from "../api";
    import {mapActions} from 'vuex'

    export default {
        name: 'create_album',
        data(){
            return {
                cates: ['最爱', '风景', '人物', '动物', '游记', '卡通', '生活', '其他'],
                formItem: {
                    title: '',
                    desc: '',
                    cate: '最爱',
                }
            }
        },
        methods:{
            ...mapActions(['GET_CATE']),
            submit(){
                window.console.log('aaa')
                create_album(
                    {...this.formItem},
                    () => {
                        this.$Message.success("创建成功")
                        this.$emit('close')
                        this.mapActions()
                    }
                )
            },
            handleCancel(){
                window.console.log('aaa')
                this.$emit('close')
            }
        }
    }
</script>