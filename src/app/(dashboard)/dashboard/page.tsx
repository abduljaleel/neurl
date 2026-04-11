"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { hourlyUsage, modelUsage, alerts } from "@/lib/data/models";
import {
  Activity,
  Clock,
  DollarSign,
  AlertTriangle,
  AlertCircle,
  Info,
} from "lucide-react";

export default function DashboardPage() {
  const totalRequests = hourlyUsage.reduce((sum, h) => sum + h.requests, 0);
  const avgLatency = 247;
  const totalCost = 233.85;
  const errorRate = 2.4;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Operations overview — last 24 hours
        </p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Requests (24h)"
          value={totalRequests.toLocaleString()}
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          delta="+12.3% vs yesterday"
        />
        <MetricCard
          title="Avg Latency"
          value={`${avgLatency}ms`}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          delta="-8ms vs yesterday"
        />
        <MetricCard
          title="Total Cost (24h)"
          value={`$${totalCost.toFixed(2)}`}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          delta="+$18.40 vs yesterday"
        />
        <MetricCard
          title="Error Rate"
          value={`${errorRate}%`}
          icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
          delta="-0.3% vs yesterday"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Request Volume Sparkline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Request Volume (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-[3px] h-32">
              {hourlyUsage.map((h) => {
                const max = Math.max(...hourlyUsage.map((u) => u.requests));
                const height = (h.requests / max) * 100;
                return (
                  <div
                    key={h.hour}
                    className="group relative flex-1 flex flex-col items-center"
                  >
                    <div className="absolute -top-6 hidden group-hover:block text-xs bg-popover border rounded px-1.5 py-0.5 whitespace-nowrap shadow-sm z-10">
                      {h.hour}: {h.requests}
                    </div>
                    <div
                      className="w-full rounded-t bg-primary/80 hover:bg-primary transition-colors min-h-[2px]"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:00</span>
            </div>
          </CardContent>
        </Card>

        {/* Model Usage Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Model Usage Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {modelUsage
                .sort((a, b) => b.requests - a.requests)
                .map((m) => {
                  const max = Math.max(...modelUsage.map((u) => u.requests));
                  const pct = (m.requests / max) * 100;
                  return (
                    <div key={m.model} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{m.model}</span>
                        <span className="text-muted-foreground tabular-nums">
                          {m.requests.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
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
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => {
              const Icon =
                alert.severity === "error"
                  ? AlertCircle
                  : alert.severity === "warning"
                    ? AlertTriangle
                    : Info;
              return (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  <Icon
                    className={`h-4 w-4 mt-0.5 shrink-0 ${
                      alert.severity === "error"
                        ? "text-destructive"
                        : alert.severity === "warning"
                          ? "text-yellow-500"
                          : "text-blue-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <Badge
                    variant={
                      alert.severity === "error"
                        ? "destructive"
                        : alert.severity === "warning"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {alert.severity}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon,
  delta,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  delta: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tabular-nums">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{delta}</p>
      </CardContent>
    </Card>
  );
}
