
var xyz = [];
var counterIndex = 0;
var counter = [];

export function formatProductList(source) {
    let format = [];
    xyz=[];
    counterIndex=[];
    counter=[];

   let errorcount = 0;
    //初始化参数
    let c = 0;
    for (var i = 0; i < source.length; i++) {
        if(source[i].length > 0){
            counter[c] = 0;
            xyz[c] = source[i];
            c++;
        }else{
            errorcount++;
        }
    }
    if(errorcount == source.length){
        return [];
    }
    counterIndex = xyz.length - 1
    //获取笛卡尔乘积的总数
    var s = 1;
    for (var j = 0; j < xyz.length; j++) {
       
        s = s * xyz[j].length;
    }
    //开始罗列顺序
    for (var i = 0; i < s; i++) {
        var con = [];
        for (var k = 0; k < xyz.length; k++) {
            //      		con = con+xyz[k][counter[k]].standardName+'('+xyz[k][counter[k]].standardId+")---";
            con.push(xyz[k][counter[k]].standardId);
            con.push(xyz[k][counter[k]].standardName);
        }
        format.push(con);
        handle();
    }
    
    return format;

}

function handle() {
    counter[counterIndex]++;
    if (counter[counterIndex] >= xyz[counterIndex].length) {
        counter[counterIndex] = 0;
        counterIndex--;
        if (counterIndex >= 0) {
            handle();
        }
        counterIndex = xyz.length - 1;
    }
}  