<template>
    <div class="app-main">
        <h1>物品管理</h1>
        <div class="config-box">
            <p><span>三国点：</span><input v-model="QQSG.SGD" type="text"></p>
            <p><span>三国币：</span><input v-model="QQSG.SGB" type="text"></p>
        </div>
        <Tabs :baseGoods="QQSG.BaseGoods.init(QQSG)"></Tabs>
        <div class="input-search-box form-inline">
            <Autocomplete :data="likeArr" @select="selectAutocomplete"></Autocomplete>
        </div>
        <!-- <Recursion :d="ga"></Recursion> -->
        <GoodsCount :d="gc"></GoodsCount>
    </div>
</template>
<script>
import qqsg_G from './datas/qqsg_G';//全局配置
import Goods from './datas/goods';
import Recursion from '@/components/recursion';
import GoodsCount from '@/components/goodsCount';
import Autocomplete from '@/components/autocomplete';
import Tabs from '@/components/tabs';
import LHH from './js/LHH';
export default {
    data(){
        return {
            QQSG: qqsg_G,
            baseGoods: qqsg_G.BaseGoods.init(qqsg_G),
            likeArr:[],
            ga: {},
            gc: {}
        }
    },
    watch: {
        // 'QQSG':{
        //     handler: function(newVal, oldVal){
                
        //     },
        //     deep: true,
        //     immediate: true
        // }
    },
    components:{
        Recursion,
        GoodsCount,
        Autocomplete,
        Tabs
    },
    created() {
        this.likeArr = Goods(this.baseGoods).getLike( this.baseGoods );//element-autocomplete-data
    },
    methods: {
        //选择物品触发回调事件
        selectAutocomplete(item){
            let name = item.value;
            this.btnSearchInput(name);
        },
        //搜索物品
        btnSearchInput(searchName){
            if(!searchName){ return false; }
            let ga = Goods(this.baseGoods).getGoods(searchName, this.baseGoods);
            let gc = Goods(this.baseGoods).getCounts( ga );
            console.log('ga = ', ga, 'gc = ', gc);
            // this.ga = ga;
            // this.gc = gc;
        },
    },
}
</script>
<style>

</style>
<style lang="scss" scoped>
.input-search-box{
    padding: 10px 0 22px 0;
}
    
</style>
