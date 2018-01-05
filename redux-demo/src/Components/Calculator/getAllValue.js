//定义一个栈的类
//将中缀表达式转换为后缀表达式
//栈结构求后缀表达式

//使用数组dataStore保存站内元素，构造函数将其初始化为一个空数组。
//变量top定义栈顶的位置，构造时初始化为0，表示栈的起始位置为0
function Stack(){
    this.dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.clear = clear;
    this.length = length;
    this.isempty = isempty;
    //注意++操作符的位置，它放在this.top的后面，这样新入栈的元素就被放在top的当前位置对应的位置，同时top自加1，指向下一个位置
    function push(element){
        this.dataStore[this.top++] = element;
    }
    //返回栈顶元素，同时top的位置减1
    function pop(){
        //return this.dataStore[--this.top];
        let peekdata = this.dataStore[this.top-1];
        this.top--;
        return peekdata;
    }
    //peek()方法返回数组的第top-1个位置的元素，即栈顶元素
    function peek(){
        return this.dataStore[this.top-1];
    }
    //将top的值设置0，即清空一个栈
    function clear(){
        this.top = 0;
    }
    //返回变量top的值即为栈内元素的个数
    function length(){
        return this.top;
    }
    function isempty(){
        return this.top === 0;
    }
}


let operatorName = ['+','-','/','*','(',')'];
let priorValue = {};
//优先级函数
function initPrior(){
    priorValue['+'] = 100;
    priorValue['-'] = 100;
    priorValue['*'] = 200;
    priorValue['/'] = 200;
    priorValue['('] = 1000;
    priorValue[')'] = 0;
}

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

//const testdata = ' ( 3 + 4 )  * 5 - 6'
//suffixExpression(testdata)


//中缀转后缀
function suffixExpression(str){
    initPrior(); //初始化优先级值
    //测试数据
    // var str = ' ( 3 + 4 )  * 5 - 6';//34+5*6-
    //var str = 'a + b * c +  ( d * e + f ) * g'; //a b c * + d e * f  + g * +
    let strarr = str.split(" ");
    var stack = new Stack();
    var outStack = [];
    while(strarr.length!==0){
        /**顺序扫描中缀表达式
         * 如果是'' 不做处理
         * 1.如果是操作数 则直接存入数组
         * 2.如果当前元素为操作符
         *     2.1  如果为“(”，则将其直接入栈；
         *     2.2  如果为“)”，则将栈中的操作符弹栈，并将弹栈的操作符存入到后缀表达式中，
                         直至遇到“(”，将“(”从栈中弹出，并不将其存入到后缀表达式中（后缀表
                         达式是不需要“(”和“)”的）；
               2.3  如果是其他操作符（+、-、*、/）
                    2.3.1 其优先级高于栈顶操作符的优先级 将其入栈
                    2.3.2 小于或低于栈顶操作符优先级 则依次弹出栈顶操作符并存
                         入数组中 直至遇到一个栈顶优先级小于当前元素优先级时或者栈顶元
                         素为“(”为止,保持当前栈顶元素不变，并将当前元素入栈
            扫描完毕整个中缀表达式后，检测操作符栈，依次弹出其元素，并将其元素顺序存入到数组中
        */
        //如果是空
        if(strarr[0]===''){
            strarr.shift();
            continue;
        }
        //如果是操作数
        else if(!isOperator(strarr[0],operatorName)){
            outStack.push(strarr[0])
        }
        //如果操作符
        else{
            //如果为“(”，则将其直接入栈；
            if(strarr[0]==='('){
                stack.push(strarr[0])
            }
            //如果为“)”
            else if(strarr[0]===')'){ 
                //遍历栈,当栈顶不是( 时一直执行弹栈压数组的操作[栈一直更新]
                //当栈顶是(时 则仅仅将栈弹出即可,随后删除strarr.shift()
                while(stack.peek()!=='('){
                    outStack.push(stack.pop());
                } 
                //当栈顶是(时 跳出while循环 删除栈顶元素
                stack.pop()               
            }
            //如果为其他运算符 则依据运算符优先级来
            else{
                //如果为空栈则直接入栈
                if(stack.isempty()){
                    stack.push(strarr[0]);
                }
                else{
                    //如果当前操作符优先级高于站定操作符优先级 则直接入栈
                    if(priorValue[strarr[0]] > priorValue[stack.peek()]){
                        stack.push(strarr[0]);
                    }
                    //否则弹出中优先级大于等于当前操作符优先级的操作符，并最后将当前操作符压栈
                    else{
                        while(!stack.isempty()&&priorValue[stack.peek()]>=priorValue[strarr[0]]&&stack.peek()!=='('){
                            outStack.push(stack.pop());
                        }
                        stack.push(strarr[0]);
                    }
                }
            }
        }
        strarr.shift();
    }
    //遍历完算数表达式后,开始处理栈中的元素
    //依次弹出其元素，并将其元素顺序存入到数组中
    while(!stack.isempty()){
        outStack.push(stack.pop());
    }
    let revData = countSuffixExpression(outStack);
    return revData;
}

//用栈结构求后缀表达式的值
function countSuffixExpression(revarr){
    let stack =  new Stack();
    while(revarr.length!==0){
        //不会出现值为空的情况
        //如果是操作数
        if(!isOperator(revarr[0],operatorName)){
            stack.push(revarr[0]);
        }
        //如果是操作符
        else{
            let topdata = stack.pop();
            let followdata = stack.peek();
            let result = 0;
            switch (revarr[0]) {
                case '+':
                    result = Number(followdata) + Number(topdata);break;
                case '-':
                    result = Number(followdata) - Number(topdata);break;
                case '*':
                    result = Number(followdata) * Number(topdata);break;
                case '/':
                    result = Number(followdata) / Number(topdata);break;
                default:
                    return revarr[0];
            }
            stack.pop();//删除栈顶的第二个元素
            stack.push(result);
        }
        revarr.shift();
    }
    let resultData = stack.pop();
    //console.log(resultData);
    //resultData.toFixed(10)//js浮点数的精确度问题粗略解决 如果输入7=则toFixed(2)抛出错误
    if(isNaN(resultData)) resultData = '错误';
    if(resultData === Infinity) resultData = '无穷';
    return resultData;
}
/**
 *  后缀表达式求值
 *  1. 从左到右扫描后缀表达式
 *  2. 如果是操作数 则压入栈中
 *     如果是操作符 取栈顶的两个元素 栈顶邻近的元素 操作符[如减] 栈顶元素
 *                  并将所得压入栈中 成为栈顶元素
 *  3. 直至扫描完毕
 *  4. 扫描后缀表达式完毕之后，栈中只剩一个元素，即为运算结果
 */

 export default suffixExpression;