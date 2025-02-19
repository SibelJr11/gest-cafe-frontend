import React from 'react';
import ReactEcharts from 'echarts-for-react';

const InfoCafeSecoChart = ({cafeSeco}) => {
  const valorCafe =cafeSeco.map((item)=>item.total_valor); 
  const cantidadCafe = cafeSeco.map((item) => item.total_cantidad);
  const mes  = cafeSeco.map((item) => item.mes);

  const option = {
    title: { text: 'Producción Mensual de CAFÉ SECO', left: 'center',textStyle:{ color: '#3F3F3F'} },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['Cantidad en kilos','Valor café seco'],
      bottom: 0,
      textStyle:{ color: '#3F3F3F'}
    },
    grid: { left: '9%', right: '7%', bottom: '20%' },
    xAxis: {
      name:'Meses',
      type: 'category',
      data:mes
    },
    yAxis: [
      {
        type: 'value',
        name: 'Producción (kg)',
      },
      {
        type: 'value',
        name: 'Valor (CO)',
        // Este eje se mostrará en la parte derecha, asociado a la serie de valor.
        position: 'right',
      },
    ],
    series: [
      {
        name: 'Cantidad en kilos',
        type: 'bar',
        data:cantidadCafe,
        yAxisIndex: 0, 
        itemStyle: { color: '#1A4D2E' } 
      },
      {
        name: 'Valor café seco',
        type: 'bar',
        data: valorCafe,
        yAxisIndex: 1,
        itemStyle: { color: '#2E7D32' }
      },
     
    ],
  };

  return <ReactEcharts option={option} />;
};

export default InfoCafeSecoChart;
