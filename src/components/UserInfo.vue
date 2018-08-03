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
                             <el-input v-model="find" clearable @keyup.enter.native="findOne" :placeholder="findby"></el-input>
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
                                    <el-button @click="EditOne(scope.row)" type="text" size="small">查看</el-button>
                                    <el-button @click="DelOne(scope.row)" type="text" size="small">移除</el-button>
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
import {requestUserFind} from '../api/api';
import {requestUserDel} from '../api/api';

export default {
    data () {
        return {
            msg: 'User-Info List',
            findby: '输入用户名搜索',
            LIST: [], // 初始化LIST 作为用户信息数组
            find: ''  // 初始化查询参数
        }
    },
    mounted () { // 生命周期  -->  控制自动加载请求数据
        this.handleUserInfo()
    },
    methods: {
        handleUserInfo () {
            requestUserInfo().then(data => {
                // console.log(data);
                // console.log(data.jsonStr[0].uName); 
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
        },
        findOne () {
            if(this.find != ''){
                var FUParams = {uName:this.find} // 请求参数
                // console.log(FUParams);
                requestUserFind(FUParams).then(data => {
                    // console.log(data);
                    this.$message({
                        message:"查询成功",
                        type:'success'
                    });
                    this.LIST = data.jsonStr
                }).catch((err) => {
                    this.$message({
                        message:"查询失败",
                        type:'error'
                    });
                });
            }else{
                this.handleUserInfo();
            }
        },
        DelOne (requ) {
            var DelParams = {id:requ.id}
            // console.log(DelParams);
            requestUserDel(DelParams).then(data => {
                this.$message({
                    message:"删除成功",
                    type:'infomation'
                });
                this.LIST.splice(this.LIST.indexOf(requ), 1) // 页面表格删除这条栏位
            }).catch((err) => {
                this.$message({
                    message:"请求失败",
                    type:'error'
                });
            });
        },
        EditOne (requ) {
            console.log(requ.id);
            this.$router.push({path:'/Uinformation',query:{id:requ.id}})
            // 或者 this.$router.push({path:'/MovieContent',params:{id:this.eleId}})
        }

    }
}
</script>
<style scopeds>
.el-header{text-align: center}
</style>