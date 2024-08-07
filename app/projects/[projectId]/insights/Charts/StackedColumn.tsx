import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { grayFieldColor } from '@/consts/colors';
import { getAllKeysExceptLabelKey } from '@/lib/utils';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';

interface Props {
  data: any[];
  config: ChartConfig;
  colors: { [label: string]: string };
}

export const StackedColumnChart = ({ data, config, colors }: Props) => {
  const keys = getAllKeysExceptLabelKey(data, 'name');

  return (
    <ChartContainer
      config={config}
      className="min-h-[200px] w-full border rounded-sm p-6"
    >
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid />
        <XAxis dataKey={'name'} tickLine={false} tickMargin={10} />
        <YAxis />

        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend
          verticalAlign="top"
          margin={{ bottom: 60 }}
          style={{ marginTop: '-20px' }}
          className="top-20"
        />

        {keys.map((dataKey, i) => (
          <Bar
            key={dataKey}
            dataKey={dataKey}
            name={dataKey}
            fillOpacity={0.1}
            fill={colors[dataKey] || grayFieldColor}
            stroke={colors[dataKey] || grayFieldColor}
            strokeWidth={2}
            stackId="a"
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
};
