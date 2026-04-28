"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { models as initialModels, type Model, type ModelProvider } from "@/lib/data/models";
import { Plus, Circle } from "lucide-react";

export default function ModelsPage() {
  const [modelList, setModelList] = useState<Model[]>(initialModels);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newModel, setNewModel] = useState({
    name: "",
    provider: "OpenAI" as ModelProvider,
    modelId: "",
    endpoint: "",
  });

  function toggleStatus(id: string) {
    setModelList((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "active" ? "inactive" : "active" }
          : m
      )
    );
  }

  function addModel() {
    if (!newModel.name || !newModel.modelId || !newModel.endpoint) return;
    const model: Model = {
      id: `m-${Date.now()}`,
      name: newModel.name,
      provider: newModel.provider,
      modelId: newModel.modelId,
      endpoint: newModel.endpoint,
      status: "active",
      avgLatency: 0,
      costPer1kTokens: 0,
    };
    setModelList((prev) => [...prev, model]);
    setNewModel({ name: "", provider: "OpenAI", modelId: "", endpoint: "" });
    setDialogOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Models</h1>
          <p className="text-muted-foreground">
            Manage your model registry and endpoint configuration
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger
            render={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Model
              </Button>
            }
          />
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Model</DialogTitle>
              <DialogDescription>
                Register a new model endpoint in your routing infrastructure.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="model-name">Name</Label>
                <Input
                  id="model-name"
                  placeholder="e.g. GPT-4 Turbo"
                  value={newModel.name}
                  onChange={(e) =>
                    setNewModel({ ...newModel, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Provider</Label>
                <Select
                  value={newModel.provider}
                  onValueChange={(val: string | null) =>
                    setNewModel({ ...newModel, provider: val as ModelProvider })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OpenAI">OpenAI</SelectItem>
                    <SelectItem value="Anthropic">Anthropic</SelectItem>
                    <SelectItem value="Google">Google</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="model-id">Model ID</Label>
                <Input
                  id="model-id"
                  placeholder="e.g. gpt-4-turbo"
                  value={newModel.modelId}
                  onChange={(e) =>
                    setNewModel({ ...newModel, modelId: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model-endpoint">API Endpoint</Label>
                <Input
                  id="model-endpoint"
                  placeholder="https://api.example.com/v1/completions"
                  value={newModel.endpoint}
                  onChange={(e) =>
                    setNewModel({ ...newModel, endpoint: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addModel}>Add Model</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Model ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Avg Latency</TableHead>
                <TableHead className="text-right">Cost / 1K Tokens</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modelList.map((model) => (
                <TableRow key={model.id}>
                  <TableCell className="font-medium">{model.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{model.provider}</Badge>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                      {model.modelId}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Circle
                        className={`h-2 w-2 fill-current ${
                          model.status === "active"
                            ? "text-green-500"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span className="text-sm capitalize">{model.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {model.avgLatency > 0 ? `${model.avgLatency}ms` : "—"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {model.costPer1kTokens > 0
                      ? `$${model.costPer1kTokens.toFixed(5)}`
                      : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStatus(model.id)}
                    >
                      {model.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
