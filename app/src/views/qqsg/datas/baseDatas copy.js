
const goods = {
    //基础物品
    '精致凿':{ price:500 },
    '小凿子':{ price:230 },
    '小铁椎':{ price:460 },

    //一级合成物品
    '金之微尘':{ '精致凿': 4 },
    '银之微尘':{ '小凿子': 8 },
    '铜之微尘':{ '小铁椎': 4 },
    //二级合成物品
    '金之精粹':{ '金之微尘': 10 },
    '银之精粹':{ '银之微尘': 10 },
    '铜之精粹':{ '铜之微尘': 10 },
    //三级合成物品
    '财富之源':{ '金之精粹': 1, '银之精粹': 1, '铜之精粹': 1 }, 
};


const npc = {
    '巴郡':{

    },
    '成都子城':{

    },
    '成都罗城':{

    }
};
const baseDatas = {
    //所有数据
    goods: goods
};

const getOnePrice = (names, goods, number=1, deep=false)=>{
    let price = null, name = names, count = number;
    if(goods[names] && goods[names].price){
        //基础物品
        price = goods[names].price*count;
        if(price<=0){
            console.warn('价格配置错误', name);
        }else{
            // console.log(name, price);
        }
    }else{
        //合成物品，递归查询
        let obj = goods[name];
        for(let n in obj){
            let num = obj[n];//合成数量
            price += getOnePrice(n, goods, num, true);
        }
    }
    if(!deep){
        let str = `${count}个 ${name} = ${price}`
        console.log( str );
    }
    return price;
};

// getOnePrice('精致凿', goods);
// getOnePrice('金之微尘', goods);
getOnePrice('财富之源', goods);


export default baseDatas