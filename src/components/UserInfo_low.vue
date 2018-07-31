<template>
    <div>
        <el-container>
            <el-header><h1 v-text="msg"></h1></el-header>
        </el-container>
        <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="list in LIST">
                  <td>{{list.id}}</td>
                  <td>{{list.uName}}</td>
                  <td>{{list.uPhone}}</td>
                  <td>{{list.uEmail}}</td>
                  <td><el-button>详情</el-button><el-button>删除</el-button></td>
              </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {requestUserInfo} from '../api/api';

export default {
    data () {
        return {
            msg: 'User-Info List',
            LIST:[]
        }
    },
    // mounted () { // 生命周期
    //     this.handleUserInfo()
    // },
    methods: {
        handleUserInfo () {
            requestUserInfo().then(data => {
                console.log(data);
                console.log(data.jsonStr[0].uName); 
                this.$message({
                  message: "请求成功",
                  type: 'success'
                });
                this.LIST = data.jsonStr
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