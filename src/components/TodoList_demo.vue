<template>
  <div>
      <el-container>
          <el-header><h1 v-text="msg"></h1></el-header>
      </el-container>
      <el-row :gutter="20">
          <el-col :span="12" :offset="6">
              <el-input v-model="newItem" v-on:keyup.enter.native="addNew"></el-input>
              <!-- 输入框/v-on事件(enter键),(.native:此处用到饿了么组件 -->
          </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="12" :offset="6">
              <table>
                  <tr><th>#</th><th>事项</th><th>状态</th><th>操作</th></tr>
                  <tr v-for="item in items">
                  <!-- v-for:索引指定名(单个/数组)，多次渲染元素。(注意:key="item.id) -->
                      <td>
                          <label type="index"></label>
                      </td>
                      <td>
                          <label>{{item.label}}</label>
                      </td>
                      <td>
                          <el-button v-bind:class="{finished: item.isFinished}">{{changeWord(item)}}</el-button>
                      </td>
                      <td>
                          <el-button v-bind:class="{finished: item.isFinished}" v-on:click="togFinished(item)" icon="el-icon-success"></el-button>
                          <el-button v-on:click="deleteThis(item)" icon="el-icon-delete"></el-button>
                      </td>
                  </tr>
              </table>
              
          </el-col>
          <el-col :span="12" :offset="6">
              <p v-if="!items.length">暂无listTodo</p>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import STORE from '../Storage/storage'

export default {
    data () {
        return {
            msg: 'this is a List Todo',
            items: STORE.fetch(), // 新增事项加入Local Storage,实现刷新不重置
            newItem: '',
        }
    },
    watch: {
        items: {
            handler: function (items) {
                STORE.save(items) 
            },
            deep: true
        }
    },
    props: ['msgfromboy'],
    methods: {
        togFinished (item) {
            item.isFinished = !item.isFinished
        },
        addNew () {
            this.items.push({ // 加入列表 push
                label: this.newItem,
                isFinished: false
            })
            this.newItem = '' // newItem重新定义-旨在让input每完成一次都返回空值状态
        },
        changeWord (item) { // 通过状态改变状态的显示string值
            if(item.isFinished === true){
                return "Finished"
            }
            return "Todo"
        },
        deleteThis (item) {
            if(item.isFinished === true){
                this.items.splice(this.items.indexOf(item), 1)
                Store.save(this.items)
            }else{
                alert("please todo first");
            }
        }
    }
}
</script>

<style>
.finished{color:limegreen}
table{width: 100%;}
table tr td,th:first-child{ width:10px; } 
table td,th{width: 30%;text-align: center}
.el-col{text-align: center}
</style>

