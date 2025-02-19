import React from 'react';
import ReactEcharts from 'echarts-for-react';

const InfoPasillaChart = ({ pasilla }) => {
  const valorCafe = pasilla.map((item) => item.total_valor); 
  const cantidadCafe = pasilla.map((item) => item.total_cantidad);
  const mes = pasilla.map((item) => item.mes);

  const option = {
    title: { text: 'Producción Mensual de PASILLA',left: 'center',textStyle:{ color: '#3F3F3F'} },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {
      data: ['Cantidad en kilos', 'Valor pasilla'],
      bottom: 0,
      textStyle:{ color: '#3F3F3F'}
    },
    grid: { left: '9%', right: '7%', bottom: '20%' },
    xAxis: {
      name: 'Meses',
      type: 'category',
      data: mes,
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
        data: cantidadCafe,
        yAxisIndex: 0, // Usar el eje Y principal (izquierda)
      },
      {
        name: 'Valor pasilla',
        type: 'bar',
        data: valorCafe,
        yAxisIndex: 1, // Usar el eje Y secundario (derecha)
      },
    ],
  };

  return <ReactEcharts option={option} />;
};

export default InfoPasillaChart;
