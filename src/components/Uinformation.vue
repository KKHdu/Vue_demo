<template>
    <div>
         <el-container>
            <el-header><h2>{{title}}</h2></el-header>
        </el-container>
        <el-container>
            <el-main>
                <el-row :gutter="20" type="flex" justify="center">
                    <el-col :span="6">
                        <div class="demo-input-suffix">
                            用户名<el-input :value="detail.uName" prefix-icon="el-icon-date"></el-input>
                            联系方式<el-input :value="detail.uPhone" prefix-icon="el-icon-date"></el-input>
                            邮箱<el-input :value="detail.uEmail" prefix-icon="el-icon-date"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="demo-input-suffix">
                            真实姓名<el-input :value="detail.uRealname" suffix-icon="el-icon-date"></el-input>
                            地域<el-input :value="detail.uArea" suffix-icon="el-icon-date"></el-input>
                            人员类型<el-input :value="detail.uType" suffix-icon="el-icon-date"></el-input>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import {requestUinfoDet} from '../api/api';

export default {
    data () {
        return {
            title: '用户详细信息',
            msg: '',
            detail: []
        }
    },
    mounted () { // 生命周期  -->  控制自动加载请求数据
        this.created()
    },
    methods: {
        created(){
            this.msg = this.$route.query.id;
            // 或者 this.id = this.$route.params.id;
            var SOParams = {id:this.msg} // 请求参数
            requestUinfoDet(SOParams).then(data => {
                console.log(data);
                console.log(data.uName);
                this.$message({
                  message: "请求成功",
                  type: 'success'
                });
                this.detail = data // 把接收到的后台返回值 data 赋值给 detail
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

<style>
.el-header{text-align: center}
</style>

