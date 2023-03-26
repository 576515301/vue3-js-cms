<template>
    <div id="addUserPage">
        <sslc-table :tableSetting="tableSetting"></sslc-table>
    </div>
</template>

<script setup>
import sslcTable from "@components/table/table.vue"
import { getStaffList, reviseStaff, delStaff } from "@api/staff/staff"
import { reactive } from "vue";
import _ from "lodash"
const sexValues = [
    {
        id: 1,
        label: "男"
    },
    {
        id: 2,
        label: "女"
    }
]
const positionValues = [
    {
        id: 1,
        label: "经理"
    },
    {
        id: 2,
        label: "主管"
    },
    {
        id: 3,
        label: "职员"
    },
    {
        id: 4,
        label: "实习生"
    },
]
const tableSetting = reactive({
    tableHeader: [
        {
            isCheckbox: true,
        },
        {
            key: "name",
            label: "姓名",
            isRevise: true,
            isSearch: true,
        },
        {
            key: "sex",
            label: "性别",
            type: "select",  // 默认input [input,select,checkbox,radio,switch,textarea]
            isRevise: true,
            values: sexValues,
            isSearch: true,
            custom: "custom",
            render: (scope, h) => {
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
            key: "email",
            label: "邮箱",
            isRevise: true,
            isSearch: true,
        },
        {
            key: "position",
            label: "职务",
            isRevise: true,
            isSearch: true,
            type: "select",
            values: positionValues,
            custom: "custom",
            render: (scope, h) => {
                const positionStr = positionValues.find(item => item.id === scope.row.position);
                return h("span", null, !!positionStr ? positionStr.label : "")
            }
        },
        {
            key: "action",
            label: "操作",
            custom: "action",  // action(默认自定义样式有修改和删除两个按钮) || custom(完全自定义)
            revise: true, // 当action==='action'时生效，值为修改此条数据的api方法
            del: true, // 当action==='action'时生效，值为删除此条数据的api方法

        }
    ],
    funcGetList: getStaffList,
    funcAddItem: reviseStaff,
    funcDel: delStaff
})


// const headerItem = {
//     key: "name",    // 需要在列表中显示的字段
//     label: "姓名",     // 表头显示的名称
//     custom: "action",  // action(默认自定义样式有修改和删除两个按钮) | custom(完全自定义)
//     render: (scope, h) => {   // 当custom==="custom"时生效，类型为函数有两个参数，scope为element-plus返回，scope.row可获取当前行数据。h为vue渲染函数
//         const sexStr = [{
//             id: 1,
//             label: "男"
//         },
//         {
//             id: 2,
//             label: "女"
//         }].find(item => item.id === scope.row.sex);
//         return h("span", null, sexStr.label)
//     },
//     isSearch: true,   // 是否被当做搜索条件
//     isRevise: true,  // 当header中有某一元素的属性custom==="action"时生效，是否可修改，为true时，在修改弹窗中可视，
//     type: "select",   // 当isRevise===true时生效,默认input 可选值为[input,select,checkbox,radio,switch,textarea]
//     values: [         // 当type==='select'|radio|checkbox时,作为子元素渲染
//         {
//             id: 1,
//             label: "男"
//         },
//         {
//             id: 2,
//             label: "女"
//         }
//     ],
//     handleRevise: reviseStaff, // 当custom==='action'时生效，值为修改此条数据的api方法
//     handleDel: delStaff, // 当action==='action'时生效，值为删除此条数据的api方法
//     isCheckbox:true,        // 这个table的每一行元素是否显示多选框，一般放在header第一个元素中，且不需要其他属性
// }
</script>

<style lang='scss' scoped></style>

