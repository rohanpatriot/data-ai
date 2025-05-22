import React from 'react';
import ReactECharts from 'echarts-for-react';
import WidgetBase from '../../WidgetBase';
import 'echarts-wordcloud';

interface WordCloudWidgetProps {
  data: {
    title: string;
    words: { text: string; value: number }[];
  };
  id: string;
  refresh?: () => void;
}

const WordCloudWidget: React.FC<WordCloudWidgetProps> = ({ data, id, refresh }) => {
  const options = {
    series: [{
      type: 'wordCloud',
      shape: 'circle',
      left: 'center',
      top: 'center',
      width: '70%',
      height: '80%',
      right: null,
      bottom: null,
      sizeRange: [12, 60],
      rotationRange: [-90, 90],
      rotationStep: 45,
      gridSize: 8,
      drawOutOfBound: false,
      textStyle: {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        color: function () {
          return 'rgb(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(',') + ')';
        }
      },
      emphasis: {
        focus: 'self',
        textStyle: {
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      data: data.words.map(item => ({
        name: item.text,
        value: item.value,
      }))
    }]
  };

  return (
    <WidgetBase widgetId={id} title={data.title} refresh={refresh}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </WidgetBase>
  );
};

export default WordCloudWidget;