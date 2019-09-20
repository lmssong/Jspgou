<template>
  <div>
      <el-button  @click="centerDialogVisible = true">选择规格</el-button>
       <span class="gray">再次选择规格后，已存在的规格组合信息将会被清空，请选择好规格后，再填入规格组合信息</span>
     <el-dialog
  title="选择规格"
  :visible.sync="centerDialogVisible"
  width="70%"
  center>
      <el-tabs type="card">
    <el-tab-pane  v-for="(item,index) in standardTypeItems" :key="index"  :label="item.name">
         <div v-if="item.dataType">
           <el-checkbox-group v-model="checkGroup[index].check" @change="getImgId">
                <el-checkbox :label="check.standardId" v-for="(check,index2) in item.standard" :key="index2" >
                    {{check.standardName}}
                </el-checkbox>
                </el-checkbox-group >
            </div>
            <!-- 判断是否有图类型 -->
            <div v-else>
                      <el-checkbox-group v-model="checkGroup[index].check" >
                    <el-checkbox :label="check.standardId" v-for="(check,index2) in item.standard" :key="index2" >
                        {{check.standardName}}
                    </el-checkbox>
                    </el-checkbox-group >
              </div> 
    </el-tab-pane>
  </el-tabs>
</el-dialog> 

<div v-for='(item,index) in checkGroup' :key="index" v-if="item.check.length>0&&!item.dataType" >
           <label>{{item.label}}</label>
              <el-checkbox-group v-model="checkGroup[index].check">
                         <el-checkbox :label="item2.standardId" v-for="(item2,index2) in checkStandardList[index]" :key="index2">
                             {{item2.standardName}}
                         </el-checkbox> 
                </el-checkbox-group >
          </div>
          <div v-else-if="item.check.length>0&&item.dataType">
               <label>{{item.label}}</label>
               <div >
                    <el-checkbox-group v-model="checkGroup[index].check" @change="getImgId"> 
                          <div class="flex-image">
                                    <div v-for="(item2,index2) in checkStandardList[index]" :key="index2" class="flex-image-items">
                                        <imageUpload class="pos-image" :index="index2" @getPath="getPath" :path="dataArr.colorImg[index2]"></imageUpload>
                                         <el-checkbox :label="item2.standardId" class="pos-check" @change="changeCoverImg(index2)">
                                              &nbsp;                      
                                         </el-checkbox>
                                         <p style="color:#000;font-size:14px"> {{item2.standardName}}</p>
                                    </div>
                                   
                                </div>
                        </el-checkbox-group >

                </div>
          </div>

        <table class="compent-table">
            <tr v-if="checkState">
             <th v-if="checkState">默认款式</th>
             <th v-for="(item,index6) in checkGroup" 
             :key="index6" 
              v-if="item.check.length>0">{{item.label}}</th>
              <th v-if="checkState">商品库存</th>
              <th v-if="checkState">销售价</th>
              <th v-if="checkState">市场价</th>
               <th v-if="checkState">成本价</th>
               <th v-if="checkState">操作</th>
               </tr>
               <tr v-for='(item,index3) in tableList' :key="index3">
                   <td style="text-align:left">
                       <el-radio v-model="dataArr.isDefaults[index3]" 
                       @click.native="getDefaults(index3)" :label="true">&nbsp;</el-radio></td>
                    <td v-for='(item2,index4) in item' :key="index4" v-if="index4%2!=0">{{item2}}</td>
                    <td>
                        <el-input v-model.number='dataArr.stockCounts[index3]' type="number" min="0"></el-input>    
                    </td>
                    <td>
                        <el-input v-model.number='dataArr.salePrices[index3]' type="number"  min="0"></el-input>    
                    </td>
                     <td>
                        <el-input v-model.number='dataArr.marketPrices[index3]' type="number"  min="0"></el-input>    
                    </td>
                     <td>
                        <el-input v-model.number='dataArr.costPrices[index3]' type="number"  min="0"></el-input>    
                    </td>
                     <td>
                      <span class="iconfont bbs-delete" @click="deleteInfoItems(index3)"></span>
                    </td>
               </tr>
        </table>
   <div >     
       </div>  
    


  </div>    
</template>

<script>
import * as fetch from "@/api/commodity";
import imageUpload from "@/components/uploadImage.vue";

import { formatProductList } from "@/untils/descartes";
export default {
  name: "colorSize",
  components: {
    imageUpload
  },
  props: {
    id: {}
  },
  data() {
    return {
      centerDialogVisible: false,
      checkGroup: [],
      standardTypeItems: [],
      standardTypeAll: [], //所有的规格种类
      checkStandardList: [], //选中的所又规格种类
      tableList: [], //测试,
      checkState: false,
      colorImgObj: [],
      dataArr: {
        isDefaults: [],
        pictureId: [],
        nature: [],
        colorImg: [],
        stockCounts: [], //商品库存
        salePrices: [], //销售价
        marketPrices: [], //市场价
        costPrices: [], //成本价
        paramsState: true, //规格必选验证
        pictureState: false, //规格图片类型必填验证
        countState: false
      }
    };
  },
  methods: {
    getTypeInfo() {
      fetch.getCommodityStandardType({ categoryId: this.id }).then(res => {
        this.standardTypeItems = res.body;
        for (let i in res.body) {
          //规格列
          let obj = {
            dataType: res.body[i].dataType,
            label: res.body[i].name,
            check: []
          };
          this.checkGroup.push(obj);
          this.checkStandardList.push([]);
        }

        for (let j in res.body) {
          //所有规格
          for (let k in res.body[j].standard) {
            this.standardTypeAll.push(res.body[j].standard[k]);
          }
        }
      });
    },
    deleteInfoItems(index) {
      this.tableList.splice(index, 1);
      this.dataArr.isDefaults.splice(index, 1);
      this.dataArr.stockCounts.splice(index, 1);
      this.dataArr.salePrices.splice(index, 1);
      this.dataArr.marketPrices.splice(index, 1);
      this.dataArr.costPrices.splice(index, 1);
      this.dataArr.nature.splice(index, 1);
      this.getData();
    },
    getDefaults(index) {
      for (let i in this.dataArr.isDefaults) {
        if (i == index) {
          this.dataArr.isDefaults[i] = true;
        } else {
          this.dataArr.isDefaults[i] = false;
        }
      }
    },
    getPath(path, index) {
      this.dataArr.colorImg[index] = path;
      this.getData();
    },
    getImgId(val) {
      this.dataArr.pictureId = val;
      this.getData();
    },
    changeCoverImg(index) {
      this.dataArr.colorImg.splice(index, 1);
      this.getData();
    },
    getData() {
      let arr = [];
      for (let i in this.checkStandardList) {
        for (let j in this.checkStandardList[i]) {
          arr.push(this.checkStandardList[i][j].standardId);
        }
      }
      //  判断图片是否上传
      let pictureState = true;
      let img = this.dataArr.colorImg;
      let id = this.dataArr.pictureId;
      if (img.length == id.length) {
        for (let i in img) {
          if (img[i] == "undefined") {
            this.dataArr.pictureState = false;
            break;
          } else {
            this.dataArr.pictureState = true;
          }
        }
      } else {
        this.dataArr.pictureState = false;
      }

      let countState = true;
      let len = this.dataArr.isDefaults.length;
      let stockCounts = this.dataArr.stockCounts;
      let salePrices = this.dataArr.salePrices;
      let marketPrices = this.dataArr.marketPrices;
      let costPrices = this.dataArr.costPrices;

      if (
        stockCounts.length +
          salePrices.length +
          marketPrices.length +
          costPrices.length ==
        4 * len
      ) {
        for (let i in this.dataArr.isDefaults) {
          if (stockCounts[i] == "undefined" || stockCounts[i] === "") {
            countState = false;
            break;
          } else if (salePrices[i] == "undefined" || salePrices[i] === "") {
            countState = false;
            break;
          }
          if (marketPrices[i] == "undefined" || marketPrices[i] === "") {
            countState = false;
            break;
          }
          if (costPrices[i] == "undefined" || costPrices[i] === "") {
            countState = false;
            break;
          }
        }
      } else {
        countState = false;
      }

      this.dataArr.countState = countState;

      let obj = {
        character: arr.join(","),
        picture: this.dataArr.pictureId.join(","),
        colorImg: this.dataArr.colorImg.join(","),
        isDefaults: this.dataArr.isDefaults.join(","),
        stockCounts: this.dataArr.stockCounts.join(","),
        salePrices: this.dataArr.salePrices.join(","),
        marketPrices: this.dataArr.marketPrices.join(","),
        costPrices: this.dataArr.costPrices.join(","),
        nature: this.dataArr.nature.join(","),
        paramsState: this.dataArr.paramsState,
        pictureState: this.dataArr.pictureState,
        countState: this.dataArr.countState
      };
      this.$emit("getData", obj);
    }
  },
  watch: {
    checkGroup: {
      handler(newVal, oldVal) {
        let count = 0;
        //获取到选中的对向
        for (let i in newVal) {
          this.checkStandardList[i] = [];
          for (let j in newVal[i].check) {
            for (let k in this.standardTypeAll) {
              if (newVal[i].check[j] == this.standardTypeAll[k].standardId) {
                this.checkStandardList[i].push(this.standardTypeAll[k]);
                count++;
              }
            }
          }
        }
        (this.dataArr.stockCounts = []), //商品库存
          (this.dataArr.salePrices = []), //销售价
          (this.dataArr.marketPrices = []), //市场价
          (this.dataArr.costPrices = []), //成本价
          (this.checkState = count > 0 ? true : false);

        let paramsState = true;
        for (let i in this.checkStandardList) {
          let len = this.checkStandardList[i].length;
          if (len <= 0) {
            paramsState = false;
            break;
          }
        }
        this.dataArr.paramsState = paramsState;
        if (paramsState) {
          this.tableList = formatProductList(this.checkStandardList);
        } else {
          this.tableList = [];
        }

        this.getData();
      },
      deep: true
    },
    tableList: {
      handler(newVal, oldVal) {
        let nature = [];
        let natureStr = [];
        for (let i in newVal) {
          this.dataArr.isDefaults[i] = i == 0 ? true : false;
          let inner = [];
          for (let j in newVal[i]) {
            if (j % 2 == 0) {
              inner.push(newVal[i][j]);
            }
          }
          nature.push(inner);
        }

        for (let i in nature) {
          let str = nature[i].join("_");
          natureStr.push(str);
        }
        this.dataArr.nature = natureStr;
        this.checkState = newVal.length > 0 ? true : false;
      },
      deep: true
    },
    checkStandardList: {
      handler(newVal, oldVal) {
        this.getData();
      },
      deep: true
    },
    dataArr: {
      handler(newVal, oldVal) {
        this.getData();
      },
      deep: true
    }
  },
  created() {
    this.getTypeInfo();
  }
};
</script>

<style>
.compent-table {
}
.compent-table th:first-child {
  text-align: left;
  width: 60px;
}
.compent-table th {
  text-align: center;
  color: #8a8e98;
  font-size: 14px;
}

.compent-table td {
  text-align: center;
  padding: 12px 25px;
}
.compent-table .el-input {
  width: 80px;
}
.flex-image {
  display: flex;
}
.flex-image-items {
  position: relative;
  text-align: center;
  margin-right: 20px;
}
.pos-check {
  position: absolute;
  top: -9px;
  right: -13px;
  z-index: 20;
}
</style>
