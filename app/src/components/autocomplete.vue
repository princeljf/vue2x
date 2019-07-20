<template>
    <div class="lhh-autocomplete-tpl">
        <el-row class="demo-autocomplete">
            <el-col :span="12">
                <el-autocomplete
                class="inline-input"
                v-model="state1"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
                ></el-autocomplete>
            </el-col>
        </el-row>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        restaurants: [],
        state1: '',
        state2: ''
      };
    },
    props:{
        data:{default: ()=>{
            return [];
        }}
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        ];
      },
      handleSelect(item) {
        this.$emit('select',item);
      }
    },
    mounted() {
      this.restaurants = this.data;
    }
  }
</script>