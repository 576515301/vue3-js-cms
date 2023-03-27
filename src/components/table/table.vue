<template>
    <div id="tablePage">
        <!-- search -->
        <div class="search" v-loading="state.getLoading">
            <el-form :inline="true" :model="state.getListParam" class="demo-form-inline">
                <template v-for="item in tableSetting.tableHeader" :key="item.key">
                    <el-form-item :label="item.label" v-if="item.isSearch">
                        <!-- input -->
                        <el-input v-model="state.getListParam[item.key]" v-if="!item.type || item.type === 'input'"
                            size="default" />

                        <!-- select -->
                        <el-select v-model="state.getListParam[item.key]" :placeholder="`请选择${item.label}`" size="default"
                            v-if="item.type === 'select'">
                            <el-option label="请选择" value=""></el-option>
                            <el-option v-for="value in item.values" :key="value.id" :label="value.label"
                                :value="value.id" />
                        </el-select>
                    </el-form-item>
                </template>
                <el-form-item>
                    <el-button type="primary" @click="getList">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- table -->
        <div class="tableBox" v-loading="state.getLoading">
            <div class="tableBtn">
                <el-button type="primary" @click="handleRevise()">添加成员</el-button>
                <el-button type="danger" :disabled="!state.delDialog.delItems.length" @click="handleDel()">批量删除</el-button>
            </div>
            <el-table :data="state.tableList" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column v-for="item in tableSetting.tableHeader" :prop="item.key" :label="item.label"
                    :key="item.key" :type="item.isCheckbox ? 'selection' : ''">
                    <template #default="scope" v-if="item.custom === 'custom'">
                        <component :is="item.render(scope, h)" v-if="item.custom === 'custom'"></component>
                    </template>
                    <template #default="scope" v-if="item.custom === 'action'">
                        <el-button size="small" type="primary" v-if="item.revise"
                            @click="handleRevise(scope)">修改</el-button>
                        <el-button size="small" type="danger" v-if="item.del" @click="handleDel([scope])">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="paginationBox">
                <el-pagination class="pagination" :current-page="state.pagination.currentPage"
                    :page-size="state.pagination.pageSize" :page-sizes="[10, 20, 50]" background="background"
                    layout="total, sizes, prev, pager, next, jumper" :total="state.total" @size-change="getList"
                    @current-change="getList" />
            </div>
        </div>

        <!-- 删除弹窗 -->
        <el-dialog v-model="state.delDialog.show" :title="state.delDialog.title" width="30%">
            <span>{{ state.delDialog.msg }}</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="state.delDialog.cancel">取消</el-button>
                    <el-button type="primary" @click="state.delDialog.confirm" :loading="state.delLoading">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 修改弹窗 -->
        <el-dialog v-model="state.reviseDialog.show" :title="state.reviseDialog.title" width="30%">
            <el-form :model="state.reviseDialog.newItem" label-width="80px">
                <template v-for="item in tableSetting.tableHeader" :key="item.key">
                    <el-form-item :label="item.label" v-if="item.isRevise">
                        <!-- input -->
                        <el-input v-model="state.reviseDialog.newItem[item.key]"
                            v-if="!item.type || item.type === 'input'" />

                        <!-- select -->
                        <el-select v-model="state.reviseDialog.newItem[item.key]" :placeholder="`请选择${item.label}`"
                            v-if="item.type === 'select'">
                            <el-option label="请选择" value=""></el-option>
                            <el-option v-for="value in item.values" :key="value.id" :label="value.label"
                                :value="value.id" />
                        </el-select>

                        <!-- switch -->
                        <el-switch v-model="state.reviseDialog.newItem[item.key]" v-if="item.type === 'switch'" />

                        <!-- radio -->
                        <el-radio-group v-model="state.reviseDialog.newItem[item.key]" v-if="item.type === 'radio'">
                            <el-radio v-for="value in item.values" :key="value.id" :label="value.label" :value="value.id" />
                        </el-radio-group>

                        <!-- checkbox -->
                        <el-checkbox-group v-model="state.reviseDialog.newItem[item.key]" v-if="item.type === 'checkbox'">
                            <el-checkbox v-for="value in item.values" :key="value.id" :label="value.label" :value="value.id"
                                name="type" />
                        </el-checkbox-group>

                        <!-- textarea -->
                        <el-form-item v-if="item.type === 'textarea'">
                            <el-input v-model="state.reviseDialog.newItem[item.key]" type="textarea" />
                        </el-form-item>

                    </el-form-item>
                </template>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="state.reviseDialog.cancel">取消</el-button>
                    <el-button type="primary" @click="state.reviseDialog.confirm" :loading="state.reviseLoading">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { h, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash';
const { tableSetting } = defineProps(["tableSetting"]); // tableSetting:{tableHeader:[],funcGetList: getStaffList,funcAddItem: reviseStaff}

const state = reactive({
    delDialog: {
        title: "删除",
        show: false,
        delItems: [],
        msg: "是否删除此条数据?",
        confirm: () => { },
        cancel: () => {
            state.delDialog.show = false;
        }
    },
    reviseDialog: {
        title: "",
        show: false,
        addItem: {},
        newItem: {},
        confirm: () => { },
        cancel: () => {
            state.reviseDialog.show = false;
        }
    },
    getListParam: {

    },
    pagination: {
        currentPage: 1,
        pageSize: 10
    },
    total: 0,
    tableList: [],
    getLoading: false,
    delLoading: false,
    reviseLoading: false
})


// 修改
const handleRevise = (scope) => {
    state.reviseDialog.title = scope ? "修改成员" : "添加";
    state.reviseDialog.show = true;
    state.reviseDialog.newItem = {}
    if (scope) {
        state.reviseDialog.newItem = cloneDeep(scope.row)
    }
    state.reviseDialog.confirm = () => {
        state.reviseLoading = true;
        tableSetting.funcAddItem(state.reviseDialog.newItem).then(res => {
            renewItem(state.reviseDialog.newItem)
            state.reviseDialog.show = false;
            state.reviseLoading = false;
            ElMessage.success("成功");
        }).catch(res => {
            state.reviseDialog.show = false;
            state.reviseLoading = false;
        });
    }
}

// 修改后更新界面
const renewItem = (newItem) => {
    state.tableList = state.tableList.map(item => {
        if (item.id === newItem.id) {
            item = cloneDeep(newItem);
        }
        return item
    })
}

// 删除
const handleDel = (scopeArr) => {
    state.delDialog.show = true;
    let sendData = [];
    if (scopeArr && scopeArr.length === 1) {
        sendData = [scopeArr[0].row.id]
    } else {
        sendData = state.delDialog.delItems.map(item => item.id)
        state.delDialog.msg = "是否删除所选中的数据"
    }

    state.delDialog.confirm = () => {
        state.delLoading = true;
        tableSetting.funcDel(sendData).then(res => {
            state.delDialog.show = false;
            state.delLoading = false;
            state.delDialog.delItems = [];
            ElMessage.success("成功");
            getList();
        }).catch(res => {
            state.delDialog.show = false;
            state.delLoading = false;
        });
    }

}

// table多选按钮点击事件
const handleSelectionChange = (arr) => {
    state.delDialog.delItems = arr;
}

// 请求列表
const getList = () => {
    state.getLoading = true;
    tableSetting.funcGetList({ ...state.getListParam, ...state.pagination }).then(res => {
        state.tableList = res.list;
        state.total = res.total;
        state.getLoading = false;
    }).catch(res => {
        state.getLoading = false;
    })
}

// 初始化请求参数
const setGetListParam = () => {
    tableSetting.tableHeader.map(item => {
        if (item.isSearch) {
            state.getListParam[item.key] = ""
        }
    })
}

onMounted(() => {
    setGetListParam();
    getList();
})

</script>

<style lang='scss' scoped>
#tablePage {
    .search {
        border: 1px solid #dedede;
        border-radius: 6px;
        padding: 20px 20px 0 20px;
        margin-bottom: 20px;
    }

    .tableBox {
        padding: 20px;
        border: 1px solid #dedede;
        border-radius: 6px;

        .tableBtn {
            margin-bottom: 20px;
        }
    }

    .paginationBox {
        margin-top: 20px;
        overflow: hidden;

        .pagination {
            float: right;
        }
    }
}
</style>