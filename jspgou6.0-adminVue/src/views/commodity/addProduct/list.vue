<template>
    <div style="height:500px; background:#fff;padding:24px">
    
        <div class="flex-items">
            <ul v-for="(arr,index) in items" :key="index" class="white-items">
                <li v-for="(item,index1) in arr" :key="item.id" @click="selectItems($event,index,item)">{{item.name}}</li>
            </ul>
        </div>
        <div class="selectedSort">
            <b>您当前选择的商品类别是：</b>
            <span v-for="(item,index) in breads" :key="index" class="breads-items">{{item.name}}</span>
        </div>
        <div class="text-align">
            <el-button :disabled="disabled" type="primary" style="padding:10px 40px" @click="addProduct">发布正式商品</el-button>
        </div>
    </div>
</template>

<script>
    import * as fetch from "@/api/commodity";
    export default {
        data() {
            return {
                items: [],
                breads: [],
                disabled: true,
            };
        },
        methods: {
            getTypeList(typeId) {
                fetch.getCommodityCategoryTree({
                    pid: typeId
                }).then(res => {
                    this.items.push(res.body);
                })
            },
            selectItems(el, index, item) {
                $(el.target).parent('ul').find('li').removeClass('active');
                $(el.target).addClass('active');
                this.items.splice(index + 1, this.items.length);
                if (index <= this.breads.length) {
                    this.breads.splice(index, this.breads.length);
                }
                this.breads.push(item);
                if (item.isChild) {
                    this.getTypeList(item.id);
                }
            },
            addProduct(){
                let obj=this.breads[this.breads.length-1];
                this.$router.push({path:'/productList/save',query:obj})  
            }
        },
        watch:{
            breads:{
                handler(newVal,oldVal){
                    this.disabled=newVal.length<=0?true:false;
                },
                deep:true
            }
        },
        created: function() {
            this.getTypeList(0); //拉去数据
        }
    }
</script>

<style>
    .flex-items {
        display: flex;
        flex-wrap: wrap;
    }
    
    .white-items {
        float: left;
        min-width: 260px;
        max-height: 300px;
        overflow-y: auto;
        padding: 10px 0;
        border: 1px solid #ddd;
        margin-right: 7px;
        margin-left: 8px;
        background-color: #fff;
        margin-bottom: 15px;
    }
    
    .white-items li {
        cursor: pointer;
        padding: 8px 12px;
        font-size: 14px;
    }
    
    .white-items li.active {
        border-color: #52bea6;
        background: #cefff4;
        color: #52bea6;
    }
    
    .white-items li.active1::after {
        font-size: 10px;
        font-family: element-icons!important;
        content: "";
        speak: none;
        font-style: normal;
        font-weight: 200;
        font-variant: normal;
        text-transform: none;
        line-height: 19px;
        vertical-align: baseline;
        float: right;
    }
    
    .white-items li.active::after {
        font-size: 10px;
        font-family: element-icons!important;
        content: "\E613";
        speak: none;
        font-style: normal;
        font-weight: 200;
        font-variant: normal;
        text-transform: none;
        line-height: 19px;
        vertical-align: baseline;
        float: right;
    }
    
    .white-items:last-child li.active::after {
        font-size: 10px;
        font-family: element-icons!important;
        content: "";
        speak: none;
        font-style: normal;
        font-weight: 200;
        font-variant: normal;
        text-transform: none;
        line-height: 19px;
        vertical-align: baseline;
        float: right;
    }
    
    .selectedSort {
        padding: 10px 15px;
        border: 1px solid #ed7f5a;
        margin-top: 10px;
        margin-bottom: 10px;
        background-color: #fff4f0;
        color: #ed7f5a;
        font-size: 14px;
    }
    
    .breads-items {
        color: green;
    }
    
    .breads-items:last-child::after {
        content: ''
    }
    
    .breads-items::after {
        content: ' > '
    }
    
    .text-align {
        text-align: center;
    }
</style>
