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
    </Menu>
</template>

<script>
    export default{
        name: 'nav-menu'
    }
</script>
