'use client';

import { ChartConfig } from '@/components/ui/chart';
import { labels, priorities, sizes, statuses, tasks } from '@/mock-data';
import { useParams } from 'next/navigation';
import { BarChart } from './Charts/Bar';
import { ColumnChart } from './Charts/Column';
import { generateChartData } from './functions';
import { useInsightsContext } from '@/contexts/insightsContext';
import { LineChart } from './Charts/Line';
import { StackedAreaChart } from './Charts/StackedArea';
import { StackedBarChart } from './Charts/StackedBar';
import { StackedColumnChart } from './Charts/StackedColumn';

const chartConfig = {} satisfies ChartConfig;

interface Props {
  layout: ChartLayout;
}
export function ChartRenderer({ layout }: Props) {
  const params = useParams();
  const { xAxis, groupBy } = useInsightsContext();

  const allTasks = tasks.filter((task) => task.project_id === params.projectId);
  const allSizes = sizes.filter((size) => size.project_id === params.projectId);
  const allLabels = labels.filter(
    (label) => label.project_id === params.projectId
  );
  const allStatuses = statuses.filter(
    (status) => status.project_id === params.projectId
  );
  const allPriorities = priorities.filter(
    (priority) => priority.project_id === params.projectId
  );

  const { data, colors } = generateChartData(
    xAxis,
    groupBy,
    allTasks,
    allStatuses,
    allLabels,
    allSizes,
    allPriorities
  );

  if (layout === 'column') {
    return <ColumnChart data={data} config={chartConfig} colors={colors} />;
  }

  if (layout === 'line') {
    return <LineChart data={data} config={chartConfig} colors={colors} />;
  }

  if (layout === 'stacked-area') {
    return (
      <StackedAreaChart data={data} config={chartConfig} colors={colors} />
    );
  }

  if (layout === 'stacked-bar') {
    return <StackedBarChart data={data} config={chartConfig} colors={colors} />;
  }

  if (layout === 'stacked-column') {
    return (
      <StackedColumnChart data={data} config={chartConfig} colors={colors} />
    );
  }

  return <BarChart data={data} config={chartConfig} colors={colors} />;
}
