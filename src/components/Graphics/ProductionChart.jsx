import React from 'react';
import ReactEcharts from 'echarts-for-react';

const ProductionChart = ({totalesFinca}) => {
  const meses = totalesFinca.map((item) => item.mes); 
  const kilos = totalesFinca.map((item) => item.total_kilos); 

  const option = {
    title: { text: 'Kilos recolectados por mes' },
    legend: {
      data: ['Kilos recolectados'],
      bottom: 0,
      textStyle:{ color: '#3F3F3F'}
    },
    grid: { left: '9%', right: '7%', bottom: '20%' },
    tooltip: {},
    xAxis: { type: 'category', data: meses },
    yAxis: { type: 'value',name: 'Producción (kg)' },
    series: [{
      name: 'Kilos recolectados',
      type: 'line',
      data: kilos,
      itemStyle: { color: '#0c0467' } // Color verde
    }]
  };

  return <ReactEcharts option={option} />;
};

export default ProductionChart;
