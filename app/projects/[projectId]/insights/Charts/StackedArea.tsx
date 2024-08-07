import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { getAllKeysExceptLabelKey } from '@/lib/utils';
import { Area, AreaChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';

interface Props {
  data: any[];
  config: ChartConfig;
}

export const StackedAreaChart = ({ data, config }: Props) => {
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
            fill="#3182ce"
            fillOpacity={0.1}
            stroke="#3182ce"
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
};
