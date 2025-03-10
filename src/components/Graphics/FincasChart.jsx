import React from 'react';
import ReactEcharts from 'echarts-for-react';

const FincasChart = ({infoFincas}) => {
  const fincas =infoFincas.map((item)=>item.nombre); 
  const kilos = infoFincas.map((item) => item.total_kilos);
  const pagos = infoFincas.map((item) => item.total_pagos);

  const option = {
    title: { text: 'Pago y Recolecta de café por finca', left: 'center',textStyle:{ color: '#3F3F3F',fontSize: 16}},
    tooltip: {},
    legend: {
      data: ['Kilos recolectados', 'Pago de trabajadores'],
      bottom: '5%', // Baja la leyenda
      textStyle: { color: '#3F3F3F' }
    },
    grid: { left: '9%', right: '7%', bottom: '30%' }, // Más espacio inferior
    xAxis: {  name:'Fincas',type: 'category', data:fincas,
      axisLabel: {
        rotate: fincas.length > 4 ? 45 : 0, 
        interval: 0, 
        fontSize: 10
      }
    },   
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

export default FincasChart;
