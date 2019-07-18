<template>
    <div class="app-main">
        <h1>物品解构</h1>
        <Recursion :d="ga"></Recursion>
        <GoodsCount :d="gc"></GoodsCount>
    </div>
</template>
<script>
import goods from './datas/goods';
import Recursion from '@/components/recursion';
import GoodsCount from '@/components/goodsCount';
import LHH from './js/LHH';
export default {
    data(){
        return {
            ga:{},
            gc:{},
        }
    },
    components:{
        Recursion,
        GoodsCount
    },
    created() {
        //测试数据
        // let ga = goods.getGoods('精致凿', goods.baseGoods);
        // let ga = goods.getGoods('金之微尘', goods.baseGoods);
        // let ga = goods.getGoods('金之精粹', goods.baseGoods);
        let ga = goods.getGoods('财富之源', goods.baseGoods);
        console.log('ga = ', ga);
        let gc = goods.getCounts( ga );
        console.log('gc = ', gc);
        this.ga = ga;
        this.gc = gc;
    },
}
</script>