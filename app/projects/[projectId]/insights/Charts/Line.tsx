import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { SelectedCustomField } from '@/consts';
import { defaultFieldColor, grayFieldColor } from '@/consts/colors';
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
  colors: { [label: string]: string };
}

export const LineChart = ({ data, config, colors }: Props) => {
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
            fill={colors[dataKey] || defaultFieldColor}
            stroke={colors[dataKey] || defaultFieldColor}
            strokeWidth={2}
          />
        ))}
      </ReLineChart>
    </ChartContainer>
  );
};
