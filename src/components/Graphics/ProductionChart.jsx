import React from 'react';
import ReactEcharts from 'echarts-for-react';

const ProductionChart = ({totalesFinca}) => {
  const meses = totalesFinca.map((item) => item.mes); 
  const kilos = totalesFinca.map((item) => item.total_kilos); 

  const option = {
    title: { text: 'Kilos recolectados por mes',left: 'center',textStyle:{ color: '#3F3F3F',fontSize: 16}},
    legend: {
      data: ['Kilos recolectados'],
      bottom: '5%', // Baja la leyenda
      textStyle:{ color: '#3F3F3F'}
    },
    grid: { left: '9%', right: '7%', bottom: '30%' }, // Más espacio inferior
    tooltip: {},
    xAxis: { type: 'category', data: meses,
      axisLabel: {
        rotate: meses.length > 4 ? 45 : 0, 
        interval: 0, 
        fontSize: 10
      }
     },
    yAxis: { type: 'value',name: 'Producción (kg)' },
    series: [{
      name: 'Kilos recolectados',
      type: 'line',
      data: kilos,
      itemStyle: { color: '#2E7D32' } 
    }]
  };

  return <ReactEcharts option={option} />;
};

export default ProductionChart;
