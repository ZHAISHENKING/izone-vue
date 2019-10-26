const StorageKey = "key"
export const myPlugin = store => {
    // 传入两个参数 mutation, state 如果不需要可以不传
    store.subscribe(() => {
        // 每次mutation后调用
        let data = store.state
        // 状态锁定， 不记录
        if (data.lock) return
        // 格式化处理，节省资源且操作安全
        data = JSON.stringify(data)
        data = encodeURIComponent(data)
        // base64编码
        if (window.btoa) data = btoa(data)
        window.localStorage.setItem(StorageKey, data)
    })
}

export const lastState = (()=>{
    // 获取状态
    let data = window.localStorage.getItem(StorageKey)
    if (!data) return false
    try {
        if (window.btoa) data = atob(data)
        data = decodeURIComponent(data)
        data = JSON.parse(data)
    } catch (e) {
        if (window.console || window.console.error) {
            window.console.error('读取记录错误:', e)
        }
        return false
    }
    return data
})()
