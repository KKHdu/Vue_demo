<template>
    <div>
        <el-container>
            <el-header><h1 v-text="msg"></h1></el-header>
        </el-container>
        <el-container>
            <el-main>
                <el-row :gutter="20">
                    <el-col :span="12" :offset="6">
                        <div class="grid-content bg-purple">
                            <el-input v-model="newItems" clearable @keyup.enter.native="addNew"></el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" :offset="6">
                        <el-table :data="items">
                            <el-table-column type="index"></el-table-column>
                            <el-table-column prop="label" label="事项" type="normal"></el-table-column>
                            <el-table-column prop="isFinished" label="状态" 
                            :filters="[{ text: 'Todo', value: false }, { text: 'Finish', value: true }]" 
                            :filter-method="filterTag" filter-placement="bottom-end">
                                <template slot-scope="scope"> <!-- slot 插槽 -->
                                    <el-tag :type="isF(scope.row)">{{changeWord(scope.row)}}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="action" label="操作">
                                <template slot-scope="scope">
                                    <el-button v-on:click="togFinished(scope.row)" :type="isF(scope.row)" icon="el-icon-success" size="mini"></el-button>
                                    <el-button v-on:click="deleteThis(scope.row)" :icon="isIcon(scope.row)" size="mini"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>    
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Storage from "../Storage/storage";

export default {
    data () {
        return {
            msg: 'List Todo',
            items: Storage.fetch(), // 新增事项加入Local Storage,实现刷新不重置
            newItems: '',
        }
    },
    watch: {
        items: {
        handler(items) {
            Storage.save(items);
        },
        deep: true //深度监视，只要 items 有一点改变就会触发回调函数handler
        }
    },
    methods: {
        filterTag(value, row) { // 查询
            return row.isFinished === value;
        },
        addNew () {
            this.items.push({ // 加入列表 push
                label: this.newItems,
                isFinished: false
            });
            this.newItems = ""; // newItem重新定义-旨在让input每完成一次都返回空值状态
        },
        togFinished (item) {
            item.isFinished = !item.isFinished
            },
        isF (item) {
            if(item.isFinished === true){
                return "success"
            }
            return "danger"
        },
        isIcon (item) {
            if(item.isFinished === true){
                return "el-icon-delete"
            }
            return "el-icon-date"
        },
        changeWord (item) { // 通过状态改变状态的显示string值
            if(item.isFinished === true){
                return "Finish"
            }
            return "Todo"
        },
        deleteThis (item) {
            if(item.isFinished === true){
                this.items.splice(this.items.indexOf(item), 1)
                Storage.save(this.items) // 从 Local Storage 中删除
            }else{
                this.$message({
                    message: '要先完成事项哦',
                    type: 'warning'
                });
            }
        },
    }
}
</script>
<style scopeds>
.el-header{text-align: center}
</style>

      