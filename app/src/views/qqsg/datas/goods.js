import LHH from '../js/LHH';
import baseGoods from './baseGoods';


Array.prototype.max = function(){
    let arr = this;
    let max = 0;
    for(let i in arr){
        arr[i]>max && (max=arr[i]);
    }
    return max;
}

//获取单价
const getOnePrice = (nameStr, goods)=>{
    let price = 0, name = nameStr;
    let obj = goods[name];
    if(obj && obj.price){
        //基础物品
        price = obj.price;
        if(price<=0){
            console.warn('价格配置错误', name);
        }
    }else{
        //合成物品，递归查询
        for(let n in obj){
            let num = obj[n];//合成数量
            price += getOnePrice(n, goods)*num;
        }
    }
    return price;
};

//获取物品级别
const getOneLevel = (nameStr, goods, deep=0)=>{
    let name = nameStr;
    let obj = goods[name];
    if(obj && obj.price){
        //基础物品
        deep = 0;
    }else{
        //合成物品，递归查询
        let levelArr = [];
        for(let n in obj){
            deep = getOneLevel(n, goods, deep)+1;
            levelArr.push( deep );
        }
        deep = levelArr.max();
    }
    return deep;
};

//获取物品级别
const getOneCount = (nameStr, goods)=>{
    let name = nameStr, count = 1;
    let obj = goods[name];
    if(obj && obj.price){
        //基础物品
        count = 1;
    }else{
        //合成物品，递归查询
        for(let n in obj){
            let num = obj[n];
            count = getOneCount(n, goods)*num;
        }
    }
    return count;
};

//获取物品完整分析数据
let getGoodAnalyse = (name, baseGoods, option={})=>{
    let goods = {}, bgs = baseGoods;
    goods.name = name;//物品名称
    goods.level = getOneLevel(name, baseGoods);//物品级别
    let optCount = option.count || 1;//物品乘法数量
    let obj = bgs[name];//对象
    if(obj){
        if(obj.price){
            //基础数据
            goods.price = obj.price;
            goods.level = 0;
            goods.count = optCount;//物品数量
            goods.money = optCount*obj.price;//合计金额
        }else{
            //递归数据
            goods.price = 0;
            goods.arr = [];
            for(let key in obj){
                let temp = {
                    price: getOnePrice(key, baseGoods),
                    num: obj[key],
                    level: getOneLevel(key, baseGoods),
                };
                goods.price += temp.price*temp.num;//物品单价
                goods.count = optCount;//物品数量
                goods.money = optCount*goods.price;//合计金额
                goods.arr.push( LHH.extend(temp, getGoodAnalyse(key, bgs, { count:goods.count*temp.num })) );//结构递归
            }
        }
    }else{
        //数据未定义
        let err = name + '数据未定义';
        alert( err );
    }
    return goods;
};

//测试数据
let d = getGoodAnalyse('财富之源', baseGoods);
console.log(d);

//Goods对象
const Goods = ((bsg)=>{
    let getGood = (name)=>{
        return bsg[name];
    };
    return {
        goods: bsg,     //所有物品基础数据
        getPrice: getOnePrice, //获取单价
        getGood: getGood,   //获取物品基础数据
        getGoods: getGoodAnalyse,    //获取物品完整分析数据
        getLevel: getOneLevel,  //获取物品级别
    }
})(baseGoods);
export default Goods