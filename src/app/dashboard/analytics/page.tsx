'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const attendanceData = [
  { name: 'Event A', attended: 4000, registered: 2400 },
  { name: 'Event B', attended: 3000, registered: 1398 },
  { name: 'Event C', attended: 2000, registered: 9800 },
  { name: 'Event D', attended: 2780, registered: 3908 },
  { name: 'Event E', attended: 1890, registered: 4800 },
];

const sustainabilityData = [
  { name: 'Waste Recycled', value: 80 },
  { name: 'Carbon Footprint', value: 20 },
];

const COLORS = ['#0088FE', '#FF8042'];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl font-bold font-headline text-primary mb-8">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Event Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="attended" fill="#82ca9d" />
                <Bar dataKey="registered" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Sustainability Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={sustainabilityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                  {sustainabilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-card-foreground mb-4">Contact Us</h2>
        <p className="text-muted-foreground mb-4">Have questions or feedback? We&apos;d love to hear from you!</p>
        <a href="mailto:contact@evergreenevents.com" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/80">
          Email Us
        </a>
      </div>
    </div>
  );
}
