import React from 'react';
import ReactEcharts from 'echarts-for-react';

const CostChart = ({totalesFinca}) => {

   const meses = totalesFinca.map((item) => item.mes); 
  const pagos = totalesFinca.map((item) => item.total_pagos);

  const option = {
    title: { text: 'Pago Mensual a trabajadores', left: 'center',textStyle:{ color: '#3F3F3F',fontSize: 16}, fontStyle:'semibold' },
    legend: {
      data: ['Pago de Trabajadores'],
      bottom: 0,
      textStyle:{ color: '#3F3F3F'}
    },
    grid: { left: '9%', right: '7%', bottom: '20%' },
    tooltip: {},
    xAxis: { name:'Meses',type: 'category', data: meses },
    yAxis: { type: 'value',name: 'Valor (CO)' },
    series: [
  
      {
        name: 'Pago de Trabajadores',
        type: 'bar',
        data: pagos,// Ejemplo de pagos en pesos
        itemStyle: { color: '#2E7D32' }, // Color verde
      }
    ]
  };

  return <ReactEcharts option={option} />;
};

export default CostChart;
