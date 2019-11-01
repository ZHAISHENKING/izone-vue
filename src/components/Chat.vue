<template>
    <div>
        <Modal title="聊天室" v-model="modal">
            <List style="min-height:400px">
                <ListItem v-for="(item, index) in messages" :key="index">
                    {{item.name}}: {{item.msg}}
                </ListItem>
            </List>
            <div slot="footer">
                <i-input v-model="message" placeholder="随便说点什么..." style="width:50%"></i-input>
                <Button @click="sendMessage">发送</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    // import io from 'socket.io-client';
    import store2 from 'store2'
    import {mapActions, mapState} from 'vuex'

    export default {
        name: 'chat',
        data(){
            const name = store2.get('name')
            return {
                modal: true,
                ws: null,
                message: '',
                name: name,
                isConnected: false
            }
        },
        computed: {
            ...mapState(['messages'])
        },
        // sockets: {
        //     connect () {
        //         this.isConnected = true
        //     },
        //     message(msg){
        //         this.SAVE_MESSAGE(msg)
        //     }
        // },
        methods:{
            ...mapActions(['SAVE_MESSAGE']),
            sendMessage(){
                this.$socket.emit('message', {name: this.name, msg: this.message})
                this.message = ""
            }
        },
    }
</script>

<style>
</style>