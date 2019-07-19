<template>
    <div v-show="Object.keys(obj).length" class="lhh-recursion-tpl">
        <ul class="goods-box">
            <li v-for="(val,key) in obj" :key="key" class="goods-line">
                <span>{{ key }}</span>
                <ul v-for="(item,key2) in obj[key]" :key="key2">
                    <li>
                        <span>{{key2}}</span>
                        <span>（</span><span>{{ item[keys.count] }}</span><span> x </span>
                        <span>{{ item[keys.price] }}</span><span> = </span>
                        <span>{{ item[keys.money] }}</span><span>）</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'lhh-recursion-tpl',
    data() { 
        return {
            obj:[],
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
    watch: {
        '$attrs':{
            handler(newVal,oldVal){
                this.obj = this.$attrs.d;
            },
            deep:true,
            immediate: true
        },
    },
    created() {

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