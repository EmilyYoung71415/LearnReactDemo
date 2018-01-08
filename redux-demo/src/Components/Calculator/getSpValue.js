/**
 *  @func 特殊符号计算的处理
 *  @desc  遍历传来的预计算值
 *         找到需要预计算的值:
 *              以空格为分割符
 *              既不是数字[字符串类型的数字]  判断字符串是否为数字
 *              又不是运算符  isOperator
 *              也不是空
 *  @return 一串运算表达式 只是将需要预处理的数值转换为计算后的数值
 */

let operatorName = ['+','-','/','*','(',')'];
//判断是否为操作符
function isOperator(data,priorarr){
    let rev = false;
    priorarr.forEach(element => {
        if(data === element){
            rev = true;
        }
    });
    return rev;
}

const getSpValue =(str)=>{
    let newArr = []; 
    let newStr = '';
    let strArr = str.split(' ');
    strArr.forEach(ele=>{
        if(!isOperator(ele,operatorName)&&ele!==''){//不是操作符
            let n = Number(ele);
            if(isNaN(n)){//也不是字符串型的数字
                //那么它就是需要预备处理的特殊字符 或者e π
                ele = convertSpdata(ele);
            }
        }
        newArr.push(ele);
    })
    newStr = newArr.join(' ');
    return newStr;
 }


const convertSpdata=(spdata)=>{
    /**
     *  e 和 π
     *  遍历字符串 '^(2)','%','√','sin','cos','tan','ln'
     *      '^(2)','%','√': 找关键词 
     *  如果不属于前三个则  划分字符串前两位
     *     'sin','cos','tan','lg' 得到下面的
     */
    let rev;
    if(spdata==='e'){
        rev = Math.E;
    }
    else if(spdata === 'π'){
        rev = Math.PI;
    }
    //平方 或 x的y次方
    else if(spdata.indexOf('^')!==-1){
        let data_before =Number(spdata.split('^(')[0]);
        let data_after = Number(spdata.split('^(')[1]);
        rev = data_before ** data_after;// 2**3
    }
    //求余
    else if(spdata.indexOf('%')!==-1){
        let data_before = Number(spdata.split('%')[0]);
        let data_after = Number(spdata.split('%')[1]);
        if(data_after>data_before){ //2%10
            rev = data_before;
        }else{
            let n = Math.floor(data_before / data_after);
            rev = data_before - n * data_after;
        }
    }
    //开根号
    else if(spdata.indexOf('√')!==-1){
        let str_after = spdata.split('√')[1];
        rev = Math.sqrt(Number(str_after));
    }
    //sin等
    else{
        let strtype = spdata.substr(0,2);
        let data;
        switch (strtype) {
            case 'si':
                data = spdata.split('sin')[1];
                rev = Math.sin(Number(data));break;
            case 'co':
                data = spdata.split('cos')[1];
                rev = Math.cos(Number(data));break;
            case 'ta':
                data = spdata.split('tan')[1];
                rev = Math.tan(Number(data));break;
            case 'ln':
                data = spdata.split('ln')[1];
                rev = Math.log(Number(data));break;
            default:
                return spdata;
        }
    }
    return rev;
}

export default getSpValue;