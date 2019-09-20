<template>
  <div>
      <div id="myChart" style="width:100%;height:360px"></div>
  </div>
</template>

<script>
export default {
  name: "echarts",
  props: {
    options: {
      type: Object,
      default: function() {
        return {
         
          xAxis: {
            data: ["05-01", "05-01", "05-01", "05-01", "05-01", "05-01"]
          },
          series: [
            {
              data: [5, 20, 36, 10, 10, 20]
            }
          ]
        };
      }
    }
  },
  data() {
    return {
      myCharts: ""
    };
  },
  mounted() {
    this.myCharts = this.$echarts.init(document.getElementById("myChart"));
    this.myCharts.setOption(this.options);
     let self=this;
    window.onresize = function () {
           self.myCharts.resize();
}
  },
  watch:{
    options:{
      handler(newVal,oldVal){
         this.myCharts.setOption(this.options);
      },
      deep:true
    }
  }
};
</script>

<style>

</style>
