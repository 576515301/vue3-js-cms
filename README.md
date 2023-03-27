# 项目介绍
  基于vue3 + element-plus + j s+ vue-router + axios + pinia开发的cms后台管理系统模板（更新ing）
>## 已实现功能
  1. axios请求封装。 
  2. 动态路由权限。
  3. 多级菜单栏组件。
  3. table组件基本功能。
  
  
  
>## 目录结构
        |   index.html
        |   package-lock.json
        |   package.json
        |   README.md
        |   vite.config.js
        |       
        +---public
        |       vite.svg
        |       
        \---src                   
            |   App.vue
            |   main.js
            |   
            +---api                             // 接口文件相关目录
            |   |   request.js                    // 封装的axios方法
            |   |   
            |   +---staff
            |   |       api.js                    // 详细的api接口
            |   |       staff.js
            |   |       
            |   \---user
            |           api.js
            |           user.js
            |           
            +---assets                         // 静态文件目录
            |   \---style
            |           base.css
            |           normalize.css
            |           
            +---components                      // 组件
            |   +---bread
            |   |       bread.vue
            |   |       
            |   +---header
            |   |       header.vue
            |   |       
            |   +---menu                      // 菜单组件---支持多级菜单、菜单排序
            |   |       menu.vue
            |   |       menuItem.vue
            |   |        
            |   \---table                    // 二次封装table组件
            |           table.vue
            |           
            +---config                       // 项目一些配置文件，如接口url，是否使用mock接口，是否使用本地路由等。。。
            |       config.js
            |       
            +---router                       // 路由文件目录
            |       navigationGuard.js          // 路由守卫
            |       routeName.js                // 页面地址 如{dashboard: () => import('@views/dashboard/dashboard.vue')}
            |       router.js
            |       routes.js                   // 基础路由+权限路由+404等
            |       
            +---store                        // 状态管理目录pinia
            |       userStore.js             
            |       
            +---utils                        // 工具函数
            |       storage.js
            |       utils.js
            |       
            \---views                        // vue页面目录
                +---addMenuList
                |       addMenuList.vue
                |       
                +---auth
                |       auth.vue
                |       
                +---dashboard
                |       dashboard.vue
                |       
                +---docs
                |       docs.vue
                |       
                +---layout
                |       layout.vue
                |       
                +---leaveManage
                |       leaveManage.vue
                |       
                +---login
                |       login.vue
                |       loginBg.vue
                |       
                +---menuList
                |       menuList.vue
                |       
                +---notFound
                |       notFound.vue
                |       
                +---resume
                |       resume.vue
                |       
                +---setting
                |       setting.vue
                |       
                \---staffList
                        staffList.vue
                        
>## 开发文档
### 权限路由
 后台返回目录配置好的router结构然后通过 ***name*** 字段和 ***routeName.js*** 文件所导出的对象相匹配排序得到新的路由结构，然后动态添加到路由上去。  
 后台返回目录结构如下  
 ```
 [{
    path: "/staff",                // 路由地址
    name: "staff",                 // 路由名称
    redirect:"staffList",          // 重定向
    meta: {                        // 自定义字段
      title: "成员管理",            // 用于menu所展示页面名称
      icon: "User",                // 图标
      index: 3                     // 排序 从小到大从上到下
    },
    children: [{
        path: "/staffList",
        name: "staffList",
        meta: {
          title: "成员列表",
          index: 1
        }
      }, {
        path: "/leaveManage",
        name: "leaveManage",
        meta: {
          title: "请假管理",
          index: 3
        }
      },
      {
        path: "/auth",
        name: "auth",
        meta: {
          title: "权限管理",
          index: 2
        }
      }
    ]
  }]
 ```
 ### table组件使用  
 组件接受一个参数 ***tableSetting***
 ```
 <sslc-table :tableSetting="tableSetting"></sslc-table>
 ```
 参数配置如下
 ```
 const tableSetting = reactive({
    tableHeader: [                  // table表头字段配置
        {
            isCheckbox: true,       // 此table是否可以被多选，一般用于第一个元素上，并且无其他参数
        },
        {
            key: "name",            // 通过此字段去列表中匹配对应需要显示的数据
            label: "姓名",          // 表头所显示的文字
            isRevise: true,         // 是否可以被修改，为true时此字段会在修改弹窗中展示
            isSearch: true,         // 是否作为被搜索的条件，为true时会在搜索栏中作为搜索条件展示
        },
        {
            key: "sex",
            label: "性别",
            type: "select",         // 默认input [input,select,checkbox,radio,switch,textarea] 当isSearch或者isRevise为true时 所显示的类型，目前搜索栏只支持imput|select
            isRevise: true,
            isSearch: true,
            values: sexValues,      // 当type为select|checkbox|radio时 其选项的配置如：[{id: 1,label: "男"},{id: 2,label: "女"}],只有id与label两个字段
            custom: "custom",       // 自定义类型 custom | action 当值为custom时，完全自定义，下方render将生效
            render: (scope, h) => { // 自定义渲染函数接受两个参数 scope：element-plus的table组件所返回scope.row可获取当前行的对象，h是vue自带渲染函数
                const sexStr = sexValues.find(item => item.id === scope.row.sex);
                return h("span", null, !!sexStr ? sexStr.label : "")
            }
        },
        {
            key: "age",
            label: "年龄",
            isRevise: true,
            isSearch: true,
        },
        {
            key: "action",
            label: "操作",
            custom: "action",      // action(默认自定义样式有修改和删除两个按钮) || custom(完全自定义) 一般custom===action在最后一个元素中使用
            revise: true,          // 当action==='action'时生效，是否显示修改按钮
            del: true,             // 当action==='action'时生效，是否显示删除按钮

        }
    ],
    funcGetList: getStaffList,     // 列表查询api
    funcAddItem: reviseStaff,      // 添加成员api
    funcDel: delStaff              // 删除成员api
})
 ```