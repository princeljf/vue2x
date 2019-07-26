import LHH from '../js/LHH';
const DefDetailArr = ['count', 'money', 'price'];
const DefDetailObj = {
    count: 0, money: 0, price:0
};

const maxFn = function(data){
    let arr = data || this;
    let max = 0;
    for(let i in arr){
        arr[i]>max && (max=arr[i]);
    }
    return max;
}

//对象合并：值相加
const extendAdd = (...args)=>{
    let obj = args[0];//覆盖对象，可传{}返回新对象
    let defArr = DefDetailArr;
    let defOpt = DefDetailObj;
    let i = 1;//从第二个对象开始合并
    for(i; i<args.length; i++){
        let o = args[i];
        for(let lv in o){
            !obj[lv] && (obj[lv] = {});
            for(let k in o[lv]){
                !obj[lv][k] && (obj[lv][k] = LHH.extend({}, defOpt));
                let oo = obj[lv][k], o2 = o[lv][k];
                for(let defKey of defArr){
                    oo[ defKey ] += (o2[ defKey ] || 0);
                }
            }
        }
    }
    return obj
};

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
        deep = maxFn(levelArr);
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
let getGoodsAnalyse = (name, baseGoods, option={})=>{
    let defOption = {
        count: 1,   //物品数量系数
    };
    let opt = null;
    if( LHH.isObject(option) ){
        //对象：传入配置项
        opt = LHH.extend({}, defOption, option);
    }else if( LHH.isNumber(option) && parseInt(option)>0 ){
        //正整数：传入count数量
        opt = LHH.extend({}, defOption, {count: parseInt(option)});
    }
    let goods = {}, bgs = baseGoods;
    goods.name = name;//物品名称
    goods.level = getOneLevel(name, baseGoods);//物品级别
    let obj = bgs[name];//对象
    if(obj){
        if(obj.price){
            //基础数据
            goods.price = obj.price;
            goods.level = 0;
            goods.count = opt.count;//物品数量
            goods.money = opt.count*obj.price;//合计金额
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
                goods.count = opt.count;//物品数量
                goods.money = opt.count*goods.price;//合计金额
                goods.arr.push( LHH.extend(temp, getGoodsAnalyse(key, bgs, { count:goods.count*temp.num })) );//结构递归
            }
        }
    }else{
        //数据未定义
        let err = name + '数据未定义';
        alert( err );
    }
    return goods;
};
const getGoodsCount = (data)=>{
    let d = LHH.isObject(data) ? data : {};
    let goods = {};
    let lv = d.level, lvStr = 'lv'+lv, name = d.name;
    let defArr = DefDetailArr;
    let defObj = LHH.extend({}, DefDetailObj);
    !goods[lvStr] && (goods[lvStr] = {});//如果不存在则创建存储容器
    !goods[lvStr][name] && (goods[lvStr][name] = defObj);//如果不存在则创建存储容器
    let obj = goods[lvStr][name];
    for(let i of defArr){
        obj[ i ] += (d[i] || 1);
    }
    if(lv){
        let arr = d.arr;
        for(let i2=0; i2<arr.length; i2++){
            let d2 = getGoodsCount( arr[i2] );
            extendAdd(goods, d2);
        }
    }
    return goods;
};

const getGoodsKeys = (baseGoods)=>{
    let bsg = baseGoods || {};
    let arr = [];
    for(let key in bsg){
        arr.push( key );
    }
    return arr;
};

const getLike = (baseGoods, type='el')=>{
    if(!type){ return false };
    let data = baseGoods;
    let arr = [];
    switch(type){
        case 'el':
            for(let key in data){
                arr.push({
                    value: key
                });
            }
            break;
        default:
    }
    
    return arr;
};

//Goods对象
const Goods = (baseGoods)=>{
    let getGood = (name)=>{
        return bsg[name];
    };
    return {
        baseGoods: baseGoods,     //所有物品基础数据
        keys: getGoodsKeys(baseGoods),//物品数组
        getLike: getLike,//模糊查询
        getPrice: getOnePrice, //获取单价
        getGood: getGood,   //获取物品基础数据
        getLevel: getOneLevel,  //获取物品级别

        getGoods: getGoodsAnalyse,    //获取物品完整分析数据
        getCounts: getGoodsCount,    //获取物品各等级合计数据
    }
};
export default Goods;