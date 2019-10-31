<template>
    <Row type="flex" justify="center" class="code-row-bg">
        <i-col style="width:320px">
            <Card style="width:320px">
                <img alt="Vue logo" src="../assets/logo.png">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" >
                    <FormItem prop="username">
                        <i-input type="text" v-model="formInline.username" placeholder="Username">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </i-input>
                    </FormItem>
                    <FormItem prop="password">
                        <i-input type="password" v-model="formInline.password" placeholder="Password">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </i-input>
                    </FormItem>
                    <FormItem>
                        <Button style="width:100%" @click="handleSubmit('formInline')">登录</Button>
                    </FormItem>
                </Form>
            </Card>
        </i-col>
    </Row>
</template>

<script>
    import {login} from "../api";
    import sha1 from 'sha1'
    import store from 'store2'

    export default {
        data () {
            return {
                formInline: {
                    username: '',
                    password: ''
                },
                ruleInline: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码少于6位，请重试', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        login(
                            {
                                username:this.formInline.username,
                                password:sha1(this.formInline.password)
                            },
                            (res) => {
                                localStorage.setItem('jwt', res.jwt);
                                store.set("name",res.username);
                                store.set("user",res);
                                this.$router.push('/');
                            }
                        )
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>
