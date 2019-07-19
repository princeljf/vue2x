<template>
    <div v-show="arr.length" class="lhh-recursion-tpl">
        <ul class="goods-box">
            <li v-for="(item,i) in arr" :key="i" class="goods-line">
                <span>lv</span><span>{{ item[keys.level] }}</span><span> - </span>
                <span>{{ item[keys.name] }}</span>
                <span>（</span><span>{{ item[keys.count] }}</span><span> x </span>
                <span>{{ item[keys.price] }}</span><span> = </span>
                <span>{{ item[keys.money] }}</span><span>）</span>
                <lhh-recursion-tpl v-if="item[keys.arr]" :d="item[keys.arr]"></lhh-recursion-tpl>
            </li>
        </ul>
    </div>
</template>

<script>
import DMK from 'dmk';
export default {
    mixins: [DMK],
    name: 'lhh-recursion-tpl',
    data() { 
        return {
            arr:[],
            keys:{
                arr: 'arr',
                count: 'count',
                level: 'level',
                money: 'money',
                name: 'name',
                price: 'price',
            }
        }
    },
    components:{
        
    },
    created() {
        this.DMK('arr');
    },

}
</script>

<style lang="scss" scoped>
.lhh-recursion-tpl{
    ul{
        border-top: 1px solid #aaa; 
        border-left: 1px solid #e6e6e6;
        background-color: #fff; 
        li{
            margin: 0 0 0 12px;
            background-color: #e6e6e6; 
        }
    }
}
</style>