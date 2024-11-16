'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Heart, Activity} from 'lucide-react'

// Mock data for demonstration purposes
const vitalsData = [
  { name: 'Mon', heartRate: 72, bloodPressure: 120, oxygenLevel: 98 },
  { name: 'Tue', heartRate: 75, bloodPressure: 118, oxygenLevel: 97 },
  { name: 'Wed', heartRate: 71, bloodPressure: 122, oxygenLevel: 98 },
  { name: 'Thu', heartRate: 73, bloodPressure: 119, oxygenLevel: 99 },
  { name: 'Fri', heartRate: 74, bloodPressure: 121, oxygenLevel: 98 },
  { name: 'Sat', heartRate: 76, bloodPressure: 117, oxygenLevel: 97 },
  { name: 'Sun', heartRate: 72, bloodPressure: 120, oxygenLevel: 98 },
];

export default function Vitals() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vitals Overview</CardTitle>
          <CardDescription>Your health metrics at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vitalsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="heartRate" stroke="#8884d8" name="Heart Rate" />
              <Line yAxisId="left" type="monotone" dataKey="bloodPressure" stroke="#82ca9d" name="Blood Pressure" />
              <Line yAxisId="right" type="monotone" dataKey="oxygenLevel" stroke="#ffc658" name="Oxygen Level" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <VitalCard title="Heart Rate" value="72 bpm" icon={<Heart className="text-red-500" />} />
            <VitalCard title="Blood Pressure" value="120/80 mmHg" icon={<Activity className="text-blue-500" />} />
            <VitalCard title="Oxygen Level" value="98%" icon={<Heart className="text-green-500" />} />
        </div>
    </div>
  );
}
interface VitalCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
  }
  
function VitalCard({ title, value, icon }:VitalCardProps ) {
    return (
      <Card>
        <CardContent className="flex items-center p-6">
          <div className="mr-4">{icon}</div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </CardContent>
      </Card>
    )
  }
  