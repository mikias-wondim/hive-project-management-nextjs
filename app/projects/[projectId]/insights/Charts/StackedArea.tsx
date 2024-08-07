import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { defaultFieldColor } from '@/consts/colors';
import { getAllKeysExceptLabelKey } from '@/lib/utils';
import { Area, AreaChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';

interface Props {
  data: any[];
  config: ChartConfig;
  colors: { [label: string]: string };
}

export const StackedAreaChart = ({ data, config, colors }: Props) => {
  const keys = getAllKeysExceptLabelKey(data, 'name');

  return (
    <ChartContainer
      config={config}
      className="min-h-[200px] w-full border rounded-sm p-6"
    >
      <AreaChart data={data}>
        <CartesianGrid />
        <XAxis dataKey={'name'} tickLine={false} />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend
          verticalAlign="top"
          margin={{ bottom: 60 }}
          style={{ marginTop: '-20px' }}
          className="top-20"
        />
        {keys.map((dataKey) => (
          <Area
            type="monotone"
            key={dataKey}
            dataKey={dataKey}
            fillOpacity={0.1}
            fill={colors[dataKey] || defaultFieldColor}
            stroke={colors[dataKey] || defaultFieldColor}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
};
