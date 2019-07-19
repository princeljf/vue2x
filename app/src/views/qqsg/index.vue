<template>
    <div class="app-main">
        <h1>物品解构</h1>
        <div class="input-search-box form-inline">
            <Autocomplete :data="likeArr" @select="selectAutocomplete"></Autocomplete>
        </div>
        <Recursion :d="ga"></Recursion>
        <GoodsCount :d="gc"></GoodsCount>
    </div>
</template>
<script>
import Goods from './datas/goods';
import Recursion from '@/components/recursion';
import GoodsCount from '@/components/goodsCount';
import Autocomplete from '@/components/autocomplete';
import LHH from './js/LHH';
export default {
    data(){
        return {
            ga:{},
            gc:{},
            gds:{
                searchName: ''
            },
            likeArr:[]
        }
    },
    components:{
        Recursion,
        GoodsCount,
        Autocomplete
    },
    created() {
        this.likeArr = Goods.getLike('el');//element-autocomplete-data
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
            let ga = Goods.getGoods(searchName, Goods.baseGoods);
            let gc = Goods.getCounts( ga );
            this.ga = ga;
            this.gc = gc;
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
