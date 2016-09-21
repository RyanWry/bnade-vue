<template>
    <div class="search-result" v-if="resultShow">
        <div class="search-info" flex="box:mean">
            <div flex="main:center cross:center" style="border-right: 1px solid #797979"
                 @click="showInfo()">
                <i class="fa fa-info-circle" aria-hidden="true"></i><span>信息</span>
            </div>
            <div flex="main:center cross:center" @click="showChart()">
                <i class="fa fa-bar-chart " aria-hidden="true"></i><span>图表</span>
            </div>
        </div>

        <div class="search-list">
            <div v-for="item in searchResult" class="search-item">
                <div style="font-weight: bold">{{item.realmId | realmName}}</div>

                <div style="margin-top: 10px" flex="dir:left box:last">
                    <div>
                        <span style="font-size: 1.2em;color: #f05948"> {{(item.price||item.startPrice) | priceFormat}}</span>
                        <span style="font-size: 0.8em">{{item.price==0?'(竞拍)':''}}</span>
                    </div>
                    <div flex="cross:center">{{item.owner}}</div>
                </div>
                <div style="margin-top: 10px" flex="dir:left box:last">
                    <div> {{item.quantity+' | '}}{{item.timeLeft | timeLeft}}</div>
                    <div> {{item.time | dateFormat}}</div>
                </div>
            </div>
        </div>


        <div class="search-chart" v-show="chartShow" flex="main:center cross:center" @click="hideChart($event)">
            <div class="chart-content" style="background: white">
                <canvas id="myChart" width="400" height="400" ></canvas>
            </div>
        </div>

        <div class="search-chart" v-show="infoShow" flex="main:center cross:center" @click="infoShow=false">
            <div class="tooltip-content chart-content" id="itemInfo">
            </div>
        </div>


    </div>
</template>

<script type="text/babel">
    import Chart from 'chart.js'

    export default{
        name: 'Result',
        props: ['searchResult', 'resultShow', 'searchItem', 'realmId'],
        data(){
            return {
                chartShow: false,
                infoShow: false
            }
        },
        vuex: {
            getters: {
                pastData: state=>state.pastData,
            }
        },
        watch: {
            resultShow: function (val) {
                if (val === true) {
                    this.$http.get(
                            (process.env.NODE_ENV !== 'development'
                                    ? ''
                                    : 'http://localhost:5000')
                            + '/wow/item/info/' + this.searchItem.id).then(response => {
                        var itemInfo = document.getElementById('itemInfo');
                        if (itemInfo)  itemInfo.innerHTML = response.data
                    });
                }
            }
        },
        methods: {
            showChart(){
                var _this = this;

                this.chartShow = true;
                var prices = [];
                var numbers = [];
                var ctx = document.getElementById("myChart");

                if (this.realmId === 0) {
                    this.searchResult.forEach((item, index)=> {
                        if (index < this.searchResult.length / 2) {
                            prices.push(parseInt(item.price / 10000));
                            numbers.push(item.quantity)
                        }
                    });
                } else {
                    this.pastData.forEach((item, index)=> {
                        if (index > this.pastData.length / 2) {
                            prices.push(parseInt(item[0] / 10000));
                            numbers.push(item[1])
                        }
                    })
                }
                setTimeout(()=> {
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: new Array(prices.length),
                            datasets: [
                                {
                                    type: 'line',
                                    label: '# 价格',
                                    data: prices,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255,99,132,1)',
                                    borderWidth: 1,
                                    yAxisID: '1',
                                    pointRadius: 0,
                                },
                                {
                                    label: '# 数量',
                                    type: _this.realmId === 0 ? 'bar' : 'line',
                                    data: numbers,
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1,
                                    pointRadius: 0,
                                    yAxisID: '2',
                                    fill: false
                                }
                            ]
                        },
                        options: {
                            scales: {
                                yAxes: [{id: '1'}, {id: '2', position: 'right'}]
                            }
                        }
                    });
                })
            },
            hideChart(event){
                if (event.target.id !== 'myChart') {
                    this.chartShow = false;
                }
            },
            showInfo(){
                this.infoShow = true;
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .search-result {
        position: absolute;
        top: 50px;
        height: 100%;
        width: 100%;
        background: white;
        overflow: hidden;
        .search-info {
            padding: 10px;

            i {
                margin-right: 5px;
            }
        }
        .search-list {
            padding: 0 10px;
            height: 92%;
            overflow: scroll;
            .search-item {
                padding: 15px 0;
                border-bottom: 1px solid #d2d2d2;
            }
        }
    }

    .search-chart {
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
        .chart-content {
            margin: 0 auto;
            padding: 10px;
            border: 1px solid #888;
            width: 90%;
            overflow: auto;
        }
    }
</style>