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
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';

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
    color: '#34d399', // emerald-400
    icon: Recycle,
  },
  carbonSaved: {
    label: 'Carbon Saved (kg CO₂)',
    color: '#a7f3d0', // emerald-200
    icon: Sprout,
  },
};

export default function DashboardPage() {
  const [events, loading, error] = useCollection(collection(db, 'events'));

  const addEvent = async () => {
    await addDoc(collection(db, 'events'), {
      name: 'New Event',
      date: serverTimestamp(),
      status: 'Upcoming',
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 via-emerald-900/20 to-gray-900"></div>
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold font-headline flex items-center"><Leaf className="h-8 w-8 mr-3 text-emerald-400"/> Dashboard</h1>
            <Button onClick={addEvent} className="h-11 text-base bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-bold shadow-lg shadow-emerald-500/20 transform hover:scale-105 transition-transform">Add Event</Button>
        </div>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-black/30 backdrop-blur-sm border border-white/10 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Events</CardTitle>
            <Leaf className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{events?.docs.length || 0}</div>
            <p className="text-xs text-gray-500">+1 since last month</p>
          </CardContent>
        </Card>
        <Card className="bg-black/30 backdrop-blur-sm border border-white/10 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Attendee Engagement</CardTitle>
            <Users className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8,432 Actions</div>
            <p className="text-xs text-gray-500">+201 since last event</p>
          </CardContent>
        </Card>
        <Card className="bg-black/30 backdrop-blur-sm border border-white/10 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Eco-Vendors</CardTitle>
            <Recycle className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <p className="text-xs text-gray-500">+5 new this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mt-8">
        <Card className="bg-black/30 backdrop-blur-sm border border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Sustainability Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)"/>
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  stroke="#888"
                />
                <YAxis stroke="#888"/>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" className="bg-black/50 border-gray-700"/>}
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
        <Card className="bg-black/30 backdrop-blur-sm border border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Events</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && <p className="text-gray-400">Loading...</p>}
            {error && <p className="text-red-500">Error: {error.message}</p>}
            <Table>
              <TableHeader>
                <TableRow className="border-b-white/10">
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Date</TableHead>
                  <TableHead className="text-right text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events?.docs.map((doc) => {
                  const event = doc.data();
                  return (
                    <TableRow key={doc.id} className="border-b-white/10">
                      <TableCell className="font-medium">{event.name}</TableCell>
                      <TableCell className="text-gray-400">
                        {event.date?.toDate().toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          className={event.status === 'Upcoming' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-gray-500/20 text-gray-300 border-gray-500/40'}
                        >
                          {event.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
