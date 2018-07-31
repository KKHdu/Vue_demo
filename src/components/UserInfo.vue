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
                             <el-input clearable @keyup.enter.native="findOne"></el-input>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" :offset="6">
                        <el-table :data="LIST" stripe>
                            <el-table-column type="index"></el-table-column>
                            <el-table-column prop="uName" label="NAME"></el-table-column>
                            <el-table-column prop="uPhone" label="PHONE"></el-table-column>
                            <el-table-column prop="uEmail" label="EMAIL"></el-table-column>
                            <!-- prop="LIST数组中字段名" -->
                            <el-table-column fixed="right" label="ACTION"> 
                                <!-- fixed 属性，接收Boolean值/left/right 固定在表格左/右 -->
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                                    <el-button type="text" size="small">编辑</el-button>
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
import {requestUserInfo} from '../api/api';

export default {
    data () {
        return {
            msg: 'User-Info List',
            LIST:[] // 初始化LIST 作为用户信息数组
        }
    },
    mounted () { // 生命周期
        this.handleUserInfo()
    },
    methods: {
        handleUserInfo () {
            requestUserInfo().then(data => {
                console.log(data);
                console.log(data.jsonStr[0].uName); 
                this.$message({
                  message: "请求成功",
                  type: 'success'
                });
                this.LIST = data.jsonStr // 把接收到的后台返回值 data 赋值给 LIST
            }).catch((err) => {
                this.$message({
                  message: "请求失败，请重试",
                  type: 'error'
                });
            });
        }        
    }
}
</script>
<style scopeds>
.el-header{text-align: center}
</style>