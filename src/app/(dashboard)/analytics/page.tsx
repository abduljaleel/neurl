"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { modelUsage } from "@/lib/data/models";

type TimeRange = "24h" | "7d" | "30d";

const multipliers: Record<TimeRange, number> = {
  "24h": 1,
  "7d": 7,
  "30d": 30,
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("24h");
  const mult = multipliers[timeRange];

  const data = modelUsage.map((m) => ({
    ...m,
    requests: Math.round(m.requests * mult),
    totalCost: parseFloat((m.totalCost * mult).toFixed(2)),
    tokensProcessed: Math.round(m.tokensProcessed * mult),
  }));

  const totalCost = data.reduce((s, m) => s + m.totalCost, 0);
  const maxCost = Math.max(...data.map((m) => m.totalCost));
  const maxLatency = Math.max(...data.map((m) => m.p95Latency));

  // Build latency distribution buckets
  const latencyBuckets = [
    { label: "0-100ms", min: 0, max: 100 },
    { label: "100-200ms", min: 100, max: 200 },
    { label: "200-300ms", min: 200, max: 300 },
    { label: "300-500ms", min: 300, max: 500 },
    { label: "500ms+", min: 500, max: 9999 },
  ];

  // Simulate distribution based on avg latency
  const latencyDist = latencyBuckets.map((bucket) => {
    const count = data.reduce((sum, m) => {
      if (m.avgLatency >= bucket.min && m.avgLatency < bucket.max) {
        return sum + m.requests;
      }
      // Spread some traffic to adjacent buckets
      const dist = Math.abs(m.avgLatency - (bucket.min + bucket.max) / 2);
      if (dist < 150) {
        return sum + Math.round(m.requests * 0.15);
      }
      return sum;
    }, 0);
    return { ...bucket, count };
  });

  const maxBucketCount = Math.max(...latencyDist.map((b) => b.count));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Cost and performance analytics across all model endpoints
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-lg border p-1">
          {(["24h", "7d", "30d"] as TimeRange[]).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Model Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Model Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead className="text-right">Requests</TableHead>
                <TableHead className="text-right">Avg Latency</TableHead>
                <TableHead className="text-right">p95 Latency</TableHead>
                <TableHead className="text-right">Total Cost</TableHead>
                <TableHead className="text-right">Tokens Processed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data
                .sort((a, b) => b.requests - a.requests)
                .map((m) => (
                  <TableRow key={m.model}>
                    <TableCell className="font-medium">{m.model}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {m.requests.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {m.avgLatency}ms
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      <span
                        className={
                          m.p95Latency > 800
                            ? "text-yellow-600 dark:text-yellow-400"
                            : ""
                        }
                      >
                        {m.p95Latency}ms
                      </span>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      ${m.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {(m.tokensProcessed / 1_000_000).toFixed(1)}M
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow className="font-semibold border-t-2">
                <TableCell>Total</TableCell>
                <TableCell className="text-right tabular-nums">
                  {data
                    .reduce((s, m) => s + m.requests, 0)
                    .toLocaleString()}
                </TableCell>
                <TableCell className="text-right">—</TableCell>
                <TableCell className="text-right">—</TableCell>
                <TableCell className="text-right tabular-nums">
                  ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {(
                    data.reduce((s, m) => s + m.tokensProcessed, 0) / 1_000_000
                  ).toFixed(1)}
                  M
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Cost by Model */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Cost by Model
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data
                .sort((a, b) => b.totalCost - a.totalCost)
                .map((m) => {
                  const pct = (m.totalCost / maxCost) * 100;
                  return (
                    <div key={m.model} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{m.model}</span>
                        <span className="text-muted-foreground tabular-nums">
                          ${m.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary/70"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        {/* Latency Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Latency Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {latencyDist.map((bucket) => {
                const pct =
                  maxBucketCount > 0
                    ? (bucket.count / maxBucketCount) * 100
                    : 0;
                return (
                  <div key={bucket.label} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium font-mono text-xs">
                        {bucket.label}
                      </span>
                      <span className="text-muted-foreground tabular-nums">
                        {bucket.count.toLocaleString()} req
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          bucket.min >= 500
                            ? "bg-yellow-500/70"
                            : "bg-primary/70"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
