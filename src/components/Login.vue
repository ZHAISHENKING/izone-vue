<template>
    <Row type="flex" justify="center" class="code-row-bg">
        <i-col style="width:320px">
            <Card style="width:320px">
                <img alt="Vue logo" src="../assets/logo.png">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" v-if="reg===false">
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
                    <p @click="reg=true">没有账号？ 去注册</p>
                    <FormItem>
                        <Button style="width:100%" @click="handleSubmit('formInline')">登录</Button>
                    </FormItem>
                </Form>
                <Form v-else ref="regForm" :model="regForm" :rules="regRule">
                    <FormItem prop="username">
                        <i-input type="text" v-model="regForm.username" placeholder="请输入用户名">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </i-input>
                    </FormItem>
                    <FormItem prop="password">
                        <i-input type="password" v-model="regForm.password" placeholder="请输入密码">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </i-input>
                    </FormItem>
                    <FormItem prop="repeat">
                        <i-input type="password" v-model="regForm.repeat" placeholder="再次输入密码">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </i-input>
                    </FormItem>
                    <FormItem>
                        <Button style="width:100%" @click="handleRegister('regForm')">注册</Button>
                    </FormItem>
                </Form>
            </Card>
        </i-col>
    </Row>
</template>

<script>
    import {login, register} from "../api";
    import sha1 from 'sha1'
    import store from 'store2'

    export default {
        data () {
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.regForm.password) {
                    callback(new Error('两次输入密码不一致！'));
                } else {
                    callback();
                }
            };
            return {
                reg: false,
                regForm:{
                    username: '',
                    password: '',
                    repeat: ''
                },
                formInline: {
                    username: '',
                    password: ''
                },
                regRule: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码少于6位，请重试', trigger: 'blur' }
                    ],
                    repeat: [
                        { required: true, message: '再次输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码少于6位，请重试', trigger: 'blur' },
                        { validator: validatePassCheck, trigger: 'blur'}
                    ]
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
                                res = res.data
                                localStorage.setItem('jwt', res.jwt);
                                store.set("name",res.username);
                                store.set("user",res);
                                this.$Message.success("登录成功, 即将跳转")
                                setTimeout(()=>{this.$router.push('/');}, 1500)
                            },
                            (code, msg) => {
                                this.$Message.error(msg)
                            }
                        )
                    } else {
                        this.$Message.error('验证未通过!');
                    }
                })
            },
            handleRegister(name){
                this.$refs[name].validate((valid)=>{
                    if (valid){
                        register(
                            {
                                username: this.regForm.username,
                                password: sha1(this.regForm.password)
                            },
                            (res) => {
                                localStorage.setItem('jwt', res.data.jwt);
                                store.set("name",res.data.username);
                                store.set("user",res.data);
                                this.$Message.success("注册成功, 即将跳转")
                                setTimeout(()=>{this.$router.push('/');}, 1500)
                            },
                            (err) => {
                                this.$Notice.error({
                                    title: '注册失败',
                                    desc: err
                                });
                            }
                        )
                    }
                })
            }
        }
    }
</script>
