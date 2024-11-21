'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Heart, Activity } from 'lucide-react';
import { useSensorData } from '@/context/SensorDataContext';
import { format } from 'date-fns';

// Define a type for the grouped data structure
interface GroupedVitals {
  name: string;
  heartRate: number;
  systolic_bp: number;
  diastolic_bp: number;
  oxygenLevel: number;
  count: number;
}

export default function Vitals() {
  const { recentSensorData, fetchRecentSensorData, loading, error } = useSensorData();

  useEffect(() => {
    fetchRecentSensorData(); // Fetch recent sensor data on component mount
  }, []);

  // Group the data by minute and calculate the averages
  const groupedVitalsData = Object.values(
    recentSensorData.reduce((acc: { [key: string]: GroupedVitals }, data) => {
      const minuteKey = format(new Date(data.timestamp), 'HH:mm'); // Format to group by 'HH:mm'

      if (!acc[minuteKey]) {
        acc[minuteKey] = {
          name: minuteKey,
          heartRate: 0,
          systolic_bp: 0,
          diastolic_bp: 0,
          oxygenLevel: 0,
          count: 0, // To calculate the average
        };
      }

      // Aggregate the values
      acc[minuteKey].heartRate += data.heart_rate;
      acc[minuteKey].systolic_bp += data.systolic_bp;
      acc[minuteKey].diastolic_bp += data.diastolic_bp;
      acc[minuteKey].oxygenLevel += data.spo2;
      acc[minuteKey].count += 1;

      return acc;
    }, {})
  ).map((group) => ({
    name: group.name,
    heartRate: group.heartRate / group.count, // Average heart rate
    systolic_bp: group.systolic_bp / group.count, // Average systolic BP
    diastolic_bp: group.diastolic_bp / group.count, // Average diastolic BP
    oxygenLevel: group.oxygenLevel / group.count, // Average oxygen level
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vitals Overview</CardTitle>
          <CardDescription>Your health metrics at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={groupedVitalsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="heartRate"
                stroke="#ff0000" // Red
                name="Heart Rate"
                strokeWidth={2}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="systolic_bp"
                stroke="#00b300" // Green
                name="Systolic BP"
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="oxygenLevel"
                stroke="#0000ff" // Blue
                name="Oxygen Level"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <VitalCard
          title="Heart Rate"
          value={`${recentSensorData[0]?.heart_rate.toFixed(0)} bpm`}
          icon={<Heart className="text-red-500" />}
        />
        <VitalCard
          title="Blood Pressure"
          value={`${recentSensorData[0]?.systolic_bp}/${recentSensorData[0]?.diastolic_bp} mmHg`}
          icon={<Activity className="text-blue-500" />}
        />
        <VitalCard
          title="Oxygen Level"
          value={`${recentSensorData[0]?.spo2.toFixed(0)}%`}
          icon={<Heart className="text-green-500" />}
        />
      </div>
    </div>
  );
}

interface VitalCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

function VitalCard({ title, value, icon }: VitalCardProps) {
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
  );
}
