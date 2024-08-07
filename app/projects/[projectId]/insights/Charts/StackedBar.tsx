import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { getAllKeysExceptLabelKey } from '@/lib/utils';
import {
  Bar,
  CartesianGrid,
  Legend,
  BarChart as ReBarChart,
  XAxis,
  YAxis,
} from 'recharts';

interface Props {
  data: any[];
  config: ChartConfig;
}

export const StackedBarChart = ({ data, config }: Props) => {
  const keys = getAllKeysExceptLabelKey(data, 'name');

  return (
    <ChartContainer
      config={config}
      className="min-h-[200px] w-full border rounded-sm p-6"
    >
      <ReBarChart accessibilityLayer data={data} layout="vertical">
        <CartesianGrid />
        <XAxis type="number" />
        <YAxis dataKey={'name'} type="category" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend
          verticalAlign="top"
          margin={{ bottom: 60 }}
          style={{ marginTop: '-20px' }}
          className="top-20"
        />
        {keys.map((dataKey) => (
          <Bar
            key={dataKey}
            dataKey={dataKey}
            fill="#3182ce"
            fillOpacity={0.1}
            stroke="#3182ce"
            strokeWidth={2}
            stackId="1"
          />
        ))}
      </ReBarChart>
    </ChartContainer>
  );
};
