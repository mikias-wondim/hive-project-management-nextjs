import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { getAllKeysExceptLabelKey } from '@/lib/utils';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as ReLineChart,
  XAxis,
  YAxis,
} from 'recharts';

interface Props {
  data: any[];
  config: ChartConfig;
}

export const LineChart = ({ data, config }: Props) => {
  console.log('line');
  const keys = getAllKeysExceptLabelKey(data, 'name');

  return (
    <ChartContainer
      config={config}
      className="min-h-[200px] w-full border rounded-sm p-6"
    >
      <ReLineChart accessibilityLayer data={data}>
        <XAxis dataKey={'name'} tickLine={false} />
        <YAxis />
        <CartesianGrid />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend
          verticalAlign="top"
          margin={{ bottom: 60 }}
          style={{ marginTop: '-20px' }}
          className="top-20"
        />

        {keys.map((dataKey, i) => (
          <Line
            type="monotone"
            key={dataKey}
            dataKey={dataKey}
            name={dataKey}
            fill="#3182ce"
            stroke="#3182ce"
            strokeWidth={2}
          />
        ))}
      </ReLineChart>
    </ChartContainer>
  );
};
