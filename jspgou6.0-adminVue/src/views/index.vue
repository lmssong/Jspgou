<template>
  <div>
  <el-row :gutter="24" >
  <el-col :xs="24" :sm="12" :md="12" :lg="6" class="span-24">
    <div class="grid-content bg-green">
        <div class="flex-grid">
          <span class="iconfont1 icon-xiaoshoue"></span>
          <span class="count">{{productInfo.orderSale}}</span>
        </div>
        <div class="grid-name">今日销售额</div>
    </div>
    </el-col>
  <el-col :xs="24" :sm="12" :md="12" :lg="6" class="span-24">
    <div class="grid-content bg-yellow">
        <div class="flex-grid">
          <span class="iconfont1 icon-2"></span>
          <span class="count">{{productInfo.orderCount}}</span>
        </div>
        <div class="grid-name">今日订单数</div>
    </div>
    </el-col>
  <el-col :xs="24" :sm="12" :md="12" :lg="6" class="span-24">
    <div class="grid-content bg-blue">
        <div class="flex-grid">
          <span class="iconfont1 icon-fabushangpin"></span>
          <span class="count">{{productInfo.productCount}}</span>
        </div>
        <div class="grid-name">出售商品数</div>
    </div>
    </el-col>
  <el-col :xs="24" :sm="12" :md="12" :lg="6" class="span-24">
    <div class="grid-content bg-purple">
        <div class="flex-grid">
          <span class="iconfont1 icon-_zhuzhanghao-copy"></span>
          <span class="count">{{productInfo.memberCount}}</span>
        </div>
        <div class="grid-name">总会员数</div>
    </div>
    </el-col>
</el-row>
<!-- 待处理 -->
  <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" class="span-24">
            <div class="sys-panel span-24">
                <div class="sys-header">
                    <h3>待处理</h3>
                </div>
                <div  class="sys-body">
                      <ul class="handling-box" style="height:133px;">
                        <li class="handling-items" @click="routerLink('/order','shippingStatus',1)">
                            <i class="iconfont1 icon-daifahuo"></i>
                             <div class="handling-name">待发货</div>
                             <div class="handling-count">{{unDealStatistics.unSendOrderCount}}</div>
                        </li>
                      <li class="handling-items" @click="routerLink('/order','paymentStatus',1)">
                            <i class="iconfont1 icon-daifukuan"></i>
                             <div class="handling-name">待付款</div>
                             <div class="handling-count">{{unDealStatistics.unPayOrderCount}}</div>
                        </li>
                        <li class="handling-items" @click="routerLink('/orderReturn','status',1)">
                            <i class="iconfont1 icon-tuihuotuikuan"></i>
                             <div class="handling-name">退货/退款</div>
                             <div class="handling-count">{{unDealStatistics.retrunCount}}</div>
                        </li>
                        <li class="handling-items"  @click="routerLink('/saleChat','index',1)">
                            <i class="iconfont1 icon-kucun"></i>
                             <div class="handling-name">库存预警</div>
                           <div class="handling-count">{{unDealStatistics.overStockProductCount}}</div>
                        </li>
                       <li class="handling-items" @click="routerLink('/consultList','index',1)">
                            <i class="iconfont1 icon-zixun"></i>
                             <div class="handling-name">商品咨询</div>
                           <div class="handling-count">{{unDealStatistics.productConsultCount}}</div>
                        </li>
                        </ul>
                </div>
            </div>
            <!-- 常用菜单 -->
              <div class="sys-panel">
                     <div class="sys-header">
                        <h3>常用菜单</h3>
                     </div>
                       <div  class="sys-body">
                      <ul class="handling-box" style="padding:24px">
                        <li class="handling-items" @click="routerLink('/addproduct','list')">
                            <div class="color-box color-1">
                              <i class="iconfont1 icon-fabushangpin"></i>
                              </div>
                             <div class="handling-name">商品发布</div>
                        </li>
                      <li class="handling-items" @click="routerLink('/poster','list')">
                              <div class="color-box color-2">
                              <i class="iconfont1 icon-tupian"></i>
                              </div>
                             <div class="handling-name">首页轮播图</div>
                        </li>
                        <li class="handling-items" @click="routerLink('/coupon','list')" >
                             <div class="color-box color-3">
                              <i class="iconfont1 icon-youhuiquan"></i>
                              </div>
                             <div class="handling-name">优惠卷</div>
                        </li>
                        <li class="handling-items" @click="routerLink('/customerService','list')">
                              <div class="color-box color-4">
                              <i class="iconfont1 icon-zaixiankefu"></i>
                              </div>
                             <div class="handling-name">在线客服</div>
                        </li>
                       <li class="handling-items" @click="routerLink('/articleList','list')">
                            <div class="color-box color-5">
                              <i class="iconfont1 icon-fabudewenzhang"></i>
                              </div>
                             <div class="handling-name">文章发布</div>
                        </li>
                        </ul>
                </div>
              </div>
      </el-col>
      <!-- 热销商品 -->
      <el-col :sm="24" :md="24" :lg="12"  class="span-24" style="height:395px;">
               <div class="sys-panel">
                     <div class="sys-header">
                        <h3>热销商品</h3>
                        <div>
                            <el-radio-group  size="small" v-model="hotCheck" @change="changeHot">
                              <el-radio-button label="month">月</el-radio-button>
                                <el-radio-button label="year">年</el-radio-button>
                                
                                <el-radio-button label="all">总</el-radio-button>
                              </el-radio-group>
                              <span class="iconfont bbs-ellipsis"></span>
                          </div>
                     </div>
                       <div  class="sys-body" style="height:345px;overflow:hidden" >
                         <table class="index-table" style="table-layout:fixed;">
                             <tr>
                               <th class="text-left">商品名称</th>
                               <th>分类</th>
                               <th>销量</th>
                             </tr>
                             <tr v-for="(item,index) in hotProduct" :key="index">
                               <td class="text-left">
                                 <div class="text-inner"> {{item.productName}}</div>
                                </td>
                               <td>{{item.categoryName}}</td>
                                <td>{{item.saleCount}}</td>
                             </tr>
                         </table>
                       </div>
              </div>
      </el-col>
  </el-row>
  <el-row class="span-24">
      <el-col :span="24">
            <div class="sys-panel" >
                     <div class="sys-header">
                        <h3>销售额统计</h3>
                        <div>
                            <el-radio-group  size="small" v-model="changeChart" @change="changeChartData">
                                <el-radio-button label="month">月</el-radio-button>
                                <el-radio-button label="year">年</el-radio-button>
                              </el-radio-group>
                              <span class="iconfont bbs-ellipsis"></span>
                          </div>
                     </div>
                    <div class="sys-body" style="height:360px;">
                        <echarts :options="chartsInfo" v-if="myCharts" ></echarts>
                    </div>
            </div>
     </el-col>
  </el-row>
  <!-- 信息 -->
  <el-row :gutter="24">
    <el-col  :xs="24" :sm="24" :md="24" :lg="12" class="span-24">
         <div class="sys-panel p-24" style="height:128px">
           <el-button type="primary" @click="setIndex">生成索引</el-button>
           <p>系统初始时必须生成索引。生成后可加快商品的搜索速度，减小访问数据库的压力。
索引只需要生成一次即可。</p>
         </div>
    </el-col>
      <el-col  :xs="24" :sm="24" :md="24" :lg="12" class="span-24">
         <div class="sys-panel p-24">
        <div class="flex-system">
              <div class="system-xitong">
                <i class="iconfont1 icon-xitong"></i>
              </div>
          <div>
            <p class="sys-info"><span class="sys-gray">当前系统版本:</span> jspgou 单店版 5.0版 </p>
            <p class="sys-info"> <span class="sys-gray">最近登录时间:</span>{{systeMemory.lastLoginTime}}</p>
            <p class="sys-info"> <span class="sys-gray">内存:</span>已用 {{systeMemory.useMemory}}MB
              <span class="sys-green">剩余 {{systeMemory.freeMemory}}MB</span>
              <span class="sys-yellow">最大 {{systeMemory.maxMemory}}MB</span>
            </p>
          </div>
          </div>
          </div>
      </el-col>
  </el-row>
  </div>
</template>

<script>
import echarts from "@/components/echarts";
import * as fetch from "@/api/index";
import axios from "axios";
export default {
  components: {
    echarts
  },
  data() {
    return {
      myCharts: false,
      productInfo: {}, //销售额、今日订单数、总商品数、总会员数
      unDealStatistics: [],
      hotProduct: [],
      chartsInfo: {},
      systeMemory: {},
      hotCheck: "month",
      changeChart: "month"
    };
  },
  methods: {
    getIndexInfo() {
      axios
        .all([
          fetch.getStatistics(),
          fetch.unDealStatistics(), //分类
          fetch.chatStatistics({ type: "month" }),
          fetch.saleStatistics({ type: "month", size: 10 }),

          fetch.getSystemMemory()
        ])
        .then(
          axios.spread((res1, res2, res4, res3, res5) => {
            this.productInfo = res1.body;
            this.unDealStatistics = res2.body;
            this.hotProduct = res3.body;
            this.chartsInfo = {
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "cross",
                  label: {
                    backgroundColor: "#6a7985"
                  }
                }
              },
              xAxis: {
                data: res4.body.xdata
              },

              grid: {
                left: "24",
                right: "24",
                bottom: "24",
                top: "24",
                containLabel: true
              },
              yAxis: {},
              series: [
                {
                  name: "销售额",
                  type: "line",
                  data: res4.body.ySaleData
                },
                {
                  name: "销售量",
                  type: "line",
                  data: res4.body.yCountData
                }
              ]
            };
            this.myCharts = true;
            this.loading = false;
            this.systeMemory = res5.body;
          })
        );
    },
    setIndex() {
      fetch.creatIndex().then(res => {
        if (res.code == "200") {
          this.successMessage("索引生成成功");
        }
      });
    },
    changeChartData(val) {
      fetch.chatStatistics({ type: val }).then(res4 => {
        this.chartsInfo = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            }
          },
          xAxis: {
            data: res4.body.xdata
          },
          grid: {
            left: "24",
            right: "24",
            bottom: "24",
            top: "24",
            containLabel: true
          },
          yAxis: {},
          series: [
            {
              name: "销售额",
              type: "line",
              data: res4.body.ySaleData
            },
            {
              name: "销售量",
              type: "line",
              data: res4.body.yCountData
            }
          ]
        };
      });
    },
    changeHot(val) {
      fetch.saleStatistics({ type: val, size: 8 }).then(res => {
        this.hotProduct = res.body;
      });
    }
  },

  created: function() {
    this.getIndexInfo();
  }
};
</script>

<style scoped lang='scss'>
.sys-green {
  color: #55de9f;
  margin-left: 10px;
}
.sys-yellow {
  color: #ffbe60;
  margin-left: 10px;
}
.sys-gray {
  color: #656565;
}
.flex-system {
  display: flex;
  align-items: flex-start;
}
.system-xitong {
  width: 78px;
  height: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d8dce5;
  border-radius: 4px;
  margin-right: 24px;
  i {
    font-size: 48px;
    color: #aab2c2;
  }
}
.p-24 {
  padding: 24px;
  p {
    font-size: 14px;
    color: #656565;
    margin-top: 5px;
    line-height: 1.5;
  }
}
p.sys-info {
  font-size: 14px;
  margin-top: -1px;
  margin-bottom: 6px;
  color: #000;
}
.index-table {
  width: 100%;
  th {
    height: 45px;
    background: #f6f9fb;
    color: #89a8c0;
    font-weight: 400;
    font-size: 14px;
  }
  td {
    height: 43px;
    background: #fff;
    font-weight: 400;
    font-size: 14px;
    text-align: center;
  }
  tr {
    border-bottom: 1px solid #f5f5f5;
  }
  tr:last-child {
    border-bottom: none;
  }
}
.text-left {
  text-align: left !important;
  padding-left: 24px;
  width: 60%;
}
.text-inner {
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.handling-box {
  display: flex;
  padding: 24px 47px;
  justify-content: space-between;
  .handling-items {
    cursor: pointer;
    float: left;
    text-align: center;
    .iconfont1 {
      font-size: 28px;
      color: #c0d9ec;
    }
    .handling-name {
      margin-top: 3px;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #999999;
    }
    .handling-count {
      margin-top: 8px;
      font-size: 18px;
        height: 22px;
      line-height: 22px;
      color: #353535;
    }
  }
}
.color-box {
  margin: 0 auto;
  width: 64px;
  height: 64px;
  border-radius: 4px;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  .iconfont1 {
    color: #fff !important;
    font-size: 36px !important;
  }
}
.color-1 {
  background: #ffbe60;
}
.color-2 {
  background: #47d7e8;
}
.color-3 {
  background: #55de9f;
}
.color-4 {
  background: #fb99cc;
}
.color-5 {
  background: #87c0ea;
}
.right-radio-group {
  float: right;
}
.sys-panel {
  border: 1px solid #ececec;
  background: #fff;
}
.bbs-ellipsis {
  margin-left: 25px;
  margin-right: 15px;
  color: #f0f0f0;
  cursor: pointer;
}
.bbs-ellipsis:hover{
  color: #353535;
}
.sys-header {
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-size: 16px;
    padding-left: 24px;
    font-weight: 400;
  }
}
.grid-content {
  height: 112px;
  padding: 16px 20px;
  color: #fff;
  cursor: pointer;
  overflow: hidden;
  .iconfont1 {
    font-size: 36px;
  }
  .count {
    font-size: 30px;
  }
  .grid-name {
    margin-top: 16px;
    text-align: right;
  }
}
.flex-grid {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bg-green {
  background: #17d57e;
}
.bg-yellow {
  background: #fec92b;
}
.bg-blue {
  background: #2da3fb;
}
.bg-purple {
  background: #c172d8;
}
.span-24 {
  margin-bottom: 24px;
}
</style>
