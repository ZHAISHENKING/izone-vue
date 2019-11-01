总结技术点:

[TOC]

### 1. iview上传图片`Upload`组件改手动上传

- beforeUpload钩子中`return false`阻止上传, 最终上传时通过`this.$refs.upload.post(file)`方式显示提交
- beforeUpload钩子中生成`blob:url`来预览本地上传图片
- 限制提交图片大小2M，图片类型
- 点击提交上传到七牛云，在后台接口调用七牛SDK，二进制流式提交避免服务器缓存
- 提交的图片url为  `baseurl+ 5位随机字符串`

生成blob代码如下:

```js
// blob生成预览图
let URL = window.URL || window.webkitURL;
if (URL && URL.createObjectURL) {
  file.blob = URL.createObjectURL(file);
}
```

显示上传图片代码片段：

```html
<button @click="handleUpload">开始上传</button>

handleUpload(){
	this.files.map((item)=>{
		this.$refs.upload.post(item)
  })
}
```

### 2. vuex实现组件传值

<img src="https://qiniu.s001.xin/ekstn.jpg">

- 内层modal上传组件中的分类信息和外层组件（非父子组件）中data中的分类list值共用
- 使用vuex，定义了state和mutations
- 由于vuex中的state一刷新就没有了，利用`store.subscribe`钩子函数在mutation每次提交时将`store`对象持久存储到`localStorage`，并且定义函数从localStorage中获取state

代码demo上传至<a href="https://github.com/ZHAISHENKING/vue_api_demo/blob/master/vue_state/07_plugin.html">Github</a>

### 3. 图片上传之后，想要让store中的state实现刷新。

我原先组件传值是这样的

<img src="https://qiniu.s001.xin/8b7u6.jpg" width=500>

这样就出现一些问题：

1. 子组件通过提交mutations修改父组件值以后，如何在本页面刷新取到新值

   为了不用把后端请求的`getList`方法重复写，我把这个请求封装到 mutations中, 这样父组件第一次填充data直接`store.commit('getList')`就可以

2. 踩到一个坑，就是父组件在`created`钩子调用`getList`后，给data赋值， 总显示空值

   就是commit会消耗时间，刷新页面后`store.state`值会清空，赋值操作会在commit操作之前完成。

   如果setTimeout，你就会发现赋值成功了。

   解决方法： 将state值声明在组件的computed中，这样state变化是能够被监听到的

   <img src="https://qiniu.s001.xin/beueg.jpg" width=500>

### 4. axios POST方法传数组

想让后端接收到`ids: [1,2,3]`这样的参数，但实际上接收的是`ids[0]:1,ids[1]:2,ids[2]:3`这样的

查看axios文档，发现`qs.stringify`

```js
import axios from 'axios'
import qs from 'qs'

axios.post(url, qs.stringify(
    params: {
     ids: [1,2,3],
     type: 1
    }, { indices: false }))
```

这样处理之后，传参变成`ids=1,ids=2,ids=3`后端接收还是失败

```js
qs.stringify({ids: [1, 2, 3]}, { indices: false })
 //形式： ids=1&ids=2&id=3
qs.stringify({ids: [1, 2, 3]}, {arrayFormat: ‘indices‘})
 //形式： ids[0]=1&aids1]=2&ids[2]=3
qs.stringify({ids: [1, 2, 3]}, {arrayFormat: ‘brackets‘})
 //形式：ids[]=1&ids[]=2&ids[]=3
qs.stringify({ids: [1, 2, 3]}, {arrayFormat: ‘repeat‘})
//形式： ids=1&ids=2&id=3
```

最终处理还是前后端一起修改，前端发送`ids: [1,2,3].toString() //'1,2,3'`

<img src="https://qiniu.s001.xin/cbmug.jpg" width=400>

后端将字符串转换为数组

<img src="https://qiniu.s001.xin/iroyy.jpg" width=400>

### 5. 模块结构问题

原本模块结构

- mutations中放axios请求数据
- components初始化数据，修改数据后刷新都需要`commit mutations`或`dispatch actions`
- 使用actions控制mutations执行顺序

问题如下:

```shell
1. axios传参需要从components经过actions传入mutations
2. 想要在页面中处理axios返回的数据
3. 在第三个问题图片上传中，我为了解决全局刷新问题将axios请求放入mutations中，导致mutations不再清爽，还做了json数据解析的工作
```

`mutations.js`

<img src="https://qiniu.s001.xin/wgc08.jpg" width=500>

`store.js`

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import {myPlugin} from './config'
import mutations from "./mutations"
import actions from './actions'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        picList: [],
        cateList: [],
    },
    plugins: [myPlugin],
    mutations: mutations,
    actions: actions
})
```

Components.vue

<img src="https://qiniu.s001.xin/0hwf5.jpg" width=500>

这样写之后， 在组件中处理数据， 将处理后的数据放入store, 同步更新state,

子组件（兄弟组件）通过state取值

mutations.js也变得清爽，只是处理state改变（本来就应该这么做）

### 6. 图片预览

图片预览我使用的是`v-viewer`插件

原始预览：

<img src="https://qiniu.s001.xin/iv9yv.jpg" width=600>

`Main.js`

```js
// main.js
import VueViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
VueViewer.setDefaults({
    toolbar: {
        zoomIn: 1,
        zoomOut: 1,
        oneToOne: 0,
        reset: 4,
        prev: {size: 'large'},
        play: {
            show: true,
            size: 'large',
        },
        next: {size: 'large'},
        rotateLeft: 4,      // 左右翻转
        rotateRight: 4,
        flipHorizontal: 4,  // 上下翻转
        flipVertical: 4,
    },
    zoomOnWheel: false, // 支持鼠标缩放
})
Vue.use(ViewUI);
```

`components`

```HTML
<template>
  <viewer :images="list">
  	<img v-for="i in list" :src="i.url">
  </viewer>
</template>
```

### 7. 裁剪头像

裁剪头像使用的是`vue-image-crop-upload`库

<img src="https://qiniu.s001.xin/wfm28.jpg" width=600>


