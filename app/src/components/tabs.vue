<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="搜索" name="searchGoods">搜索</el-tab-pane>
    <el-tab-pane label="基础物品" name="baseGoods">
        <div v-for="(item,key) in baseGoods" :key="key" class="goods-box">
            <span v-if="item.price">
                <span>{{key}}：</span><input v-model="item.price" type="text">
            </span>
        </div>
    </el-tab-pane>
    <el-tab-pane label="分类物品" name="typeGoods">分类物品</el-tab-pane>
    <el-tab-pane label="录入物品" name="addGoods">录入物品</el-tab-pane>
    </el-tabs>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'searchGoods'
        };
    },
    props:{
        'baseGoods':{ default:()=>{
            return {};
        } }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>