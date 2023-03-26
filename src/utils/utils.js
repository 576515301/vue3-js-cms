/**
 * @description 用于给菜单元素升序排列
 * @param {Array} arr 
 * @returns Array
 */
export function menuSort(arr) {
    let index = 0;
    arr = arr.sort((a, b) => {
        if (index === 0 && b.children && b.children.length > 0) {
            menuSort(b.children)
            index++;
        }
        if (a.children && a.children.length > 0) {
            menuSort(a.children)
        }
        return a.meta.index - b.meta.index
    });
    return arr
}

/**
 *对返回的路由进行拼接添加component成为新的路由
 * @param {Array} menu 
 */
export function getMenuList(menu, routeName) {
    return menu.map(item => {
        if (item.children && item.children.length > 0) {
            getMenuList(item.children, routeName)
        } else {
            item.component = routeName[item.name]
        }
        return item
    })
}


/**
 * 获取权限路由的第一个可访问页面的路径（主要是为了给/ 重定向）
 * @param {Array} routes 
 */
export function getRedirectPath(routes) {
    return routes[0].children && routes[0].children.length > 0 ? getRedirectPath(routes[0].children) : routes[0].path
}


