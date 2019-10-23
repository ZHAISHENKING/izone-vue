<template>
    <Row type="flex" justify="center" class="code-row-bg">
        <i-col style="width:320px">
            <Card style="width:320px">
                <img alt="Vue logo" src="../assets/logo.png">
                <Form ref="formInline" :model="formInline" :rules="ruleInline" >
                    <FormItem prop="user">
                        <i-input type="text" v-model="formInline.user" placeholder="Username">
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
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>
