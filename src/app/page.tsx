'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Leaf, Recycle, Users, Sprout } from 'lucide-react';

const chartData = [
  { month: 'January', wasteDiverted: 186, carbonSaved: 80 },
  { month: 'February', wasteDiverted: 305, carbonSaved: 200 },
  { month: 'March', wasteDiverted: 237, carbonSaved: 120 },
  { month: 'April', wasteDiverted: 273, carbonSaved: 190 },
  { month: 'May', wasteDiverted: 209, carbonSaved: 130 },
  { month: 'June', wasteDiverted: 214, carbonSaved: 140 },
];

const chartConfig = {
  wasteDiverted: {
    label: 'Waste Diverted (kg)',
    color: 'hsl(var(--chart-1))',
    icon: Recycle,
  },
  carbonSaved: {
    label: 'Carbon Saved (kg CO2)',
    color: 'hsl(var(--chart-2))',
    icon: Sprout,
  },
};

const recentActivities = [
  {
    user: 'Alex Johnson',
    action: 'Checked in at "Green Tech Summit"',
    points: '+10 points',
    time: '5m ago',
  },
  {
    user: 'Eco-Catering Co.',
    action: 'Registered as a new vendor',
    points: 'Verified',
    time: '1h ago',
  },
  {
    user: 'Samantha Bee',
    action: 'Completed "Recycling Challenge"',
    points: '+50 points',
    time: '3h ago',
  },
  {
    user: 'Ben Carter',
    action: 'Visited "Solar Power Solutions" booth',
    points: '+5 points',
    time: 'yesterday',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waste Diverted</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254 kg</div>
            <p className="text-xs text-muted-foreground">+15.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendee Engagement</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,432 Actions</div>
            <p className="text-xs text-muted-foreground">+201 since last event</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eco-Vendors</CardTitle>
            <Recycle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+5 new this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sustainability Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="wasteDiverted"
                  fill="var(--color-wasteDiverted)"
                  radius={4}
                />
                <Bar
                  dataKey="carbonSaved"
                  fill="var(--color-carbonSaved)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{activity.user}</TableCell>
                    <TableCell>
                      {activity.action}
                      <p className="text-xs text-muted-foreground md:hidden">
                        {activity.time}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          activity.points.startsWith('+')
                            ? 'default'
                            : 'secondary'
                        }
                        className={activity.points.startsWith('+') ? 'bg-primary/20 text-primary hover:bg-primary/30' : ''}
                      >
                        {activity.points}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
