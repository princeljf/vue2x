import LHH from '../js/LHH';
const baseGoods = {
    '精致凿': 500,
    // '小凿子': 200,
    // '小铁椎': 460,

    '金之微尘':{ '精致凿': 4 },
    // '银之微尘':{ '小凿子': 8 },
    // '铜之微尘':{ '小铁椎': 4 },

    '金之精粹':{ '金之微尘': 10 },
    // '银之精粹':{ '银之微尘': 10 },
    // '铜之精粹':{ '铜之微尘': 10 },

    '财富之源':{ '金之精粹': 1, '银之精粹': 1, '铜之精粹': 1 }, 
};
let test = {
    '财富之源': {
        gn: 3,//变换次数
        name: '财富之源',//名称
        price: 40000,//
        num: 1,
        arr:[
            {
                gn: 2,
                name:'金之精粹',
                price: 20000,
                num: 1,
                count: 1*1,
                arr: [
                    {
                        gn: 1,
                        name: '金之微尘',
                        price: 2000,
                        num: 10,
                        count: 1*1*10,
                        arr: [
                            {
                                gn: 0,
                                name: '精致凿',
                                price: 500,
                                num: 4,
                                count: 1*1*10*4,
                            }
                        ] 
                    }
                ]
            },
            {
                gn: 2,
                name:'金之精粹',
                price: 20000,
                num: 1,
                count: 1*1,
                arr: [
                    {
                        gn: 1,
                        name: '金之微尘',
                        price: 2000,
                        num: 10,
                        count: 1*1*10,
                        arr: [
                            {
                                gn: 0,
                                name: '精致凿',
                                price: 500,
                                num: 4,
                                count: 1*1*10*4
                            }
                        ] 
                    }
                ]
            },
        ],
        gnList:{
            gn2:[
                {
                    name:'金之精粹',
                    price: 40000,
                    num: 2,
                    count: 1+1,
                }
            ],
            gn1:[
                {
                    name:'金之微尘',
                    price: 4000,
                    num: 2,
                    count: 10+10,
                }
            ],
            gn0:[
                {
                    name:'精致凿',
                    price: 40000,
                    num: 2,
                    count: 40+40,
                }
            ]
        },
        
    }
}
const initGoods = (baseGoods)=>{
    let bgs = baseGoods;
    let goods = {};
    for(let name in bgs){
        if( bgs[name] ){
            //数据已定义
            if( LHH.isNumber(bgs[name]) ){

            }else{

            }
        }else{
            //数据未定义
        }
    }
    return goods;
};
const goods = initGoods(baseGoods);
console.log(999,goods);
export default goods