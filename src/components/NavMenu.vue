<template>
    <Menu mode="horizontal" theme="dark" active-name="img">
        <div class="layout-log"></div>
        <MenuItem name="pic" to="/pic">
            <Icon type="ios-paper" />
            相册
        </MenuItem>
        <MenuItem name="video" to="/video">
            <Icon type="ios-people" />
            视频
        </MenuItem>
        <MenuItem name="3" to="/center">
            <Icon type="ios-construct" />
            个人中心
        </MenuItem>
        <MenuItem name="4" to="/setting">
            <Icon type="ios-construct" />
            设置
        </MenuItem>
    </Menu>


</template>

<script>
    export default{
        name: 'nav-menu'
    }
</script>
