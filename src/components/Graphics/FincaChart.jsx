import React from 'react';
import ReactEcharts from 'echarts-for-react';

const FincaChart = ({infoFincas}) => {
  const fincas =infoFincas.map((item)=>item.nombre); 
  const kilos = infoFincas.map((item) => item.total_kilos);
  const pagos = infoFincas.map((item) => item.total_pagos);

  const option = {
    title: { text: 'Pago y Recolecta de café por finca', left: 'center',textStyle:{ color: '#3F3F3F'}},
    tooltip: {},
    legend: {
      data: ['Kilos recolectados', 'Pago de trabajadores'],
      bottom: 0,
      textStyle:{ color: '#3F3F3F'}
    },
    grid: { left: '9%', right: '7%', bottom: '20%' },
    xAxis: {  name:'Fincas',type: 'category', data:fincas},   
    yAxis: { type: 'value'},
    series: [
      {
        name: 'Kilos recolectados',
        type: 'bar',
        data: kilos, // Kilos recolectados por finca
        itemStyle: { color: '#1A4D2E'  }
      },
      {
        name: 'Pago de trabajadores',
        type: 'bar',
        data: pagos, // Pagos realizados por finca
        itemStyle: { color: '#2E7D32' } 
      }
    ]
  };

  return <ReactEcharts option={option} />;
};

export default FincaChart;
