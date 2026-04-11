"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { apiKeys as initialKeys, type ApiKey } from "@/lib/data/models";
import { Plus, Copy, AlertTriangle } from "lucide-react";

export default function KeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyRateLimit, setNewKeyRateLimit] = useState("100");
  const [copied, setCopied] = useState(false);

  function generateKey() {
    if (!newKeyName) return;
    const fullKey = `sk-nr-${newKeyName.toLowerCase().replace(/\s+/g, "-")}-${crypto.randomUUID().slice(0, 32)}`;
    const prefix = `sk-nr-****${fullKey.slice(-4)}`;
    const key: ApiKey = {
      id: `k-${Date.now()}`,
      name: newKeyName,
      prefix,
      createdAt: new Date().toISOString().split("T")[0],
      lastUsed: null,
      status: "active",
      rateLimit: parseInt(newKeyRateLimit, 10) || 100,
    };
    setKeys((prev) => [key, ...prev]);
    setGeneratedKey(fullKey);
  }

  function revokeKey(id: string) {
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: "revoked" } : k))
    );
  }

  function closeDialog() {
    setDialogOpen(false);
    setGeneratedKey(null);
    setNewKeyName("");
    setNewKeyRateLimit("100");
    setCopied(false);
  }

  function copyKey() {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
          <p className="text-muted-foreground">
            Manage API keys for authenticating with the Neurl gateway
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) closeDialog(); else setDialogOpen(true); }}>
          <DialogTrigger
            render={
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Generate Key
              </Button>
            }
          />
          <DialogContent className="sm:max-w-md">
            {!generatedKey ? (
              <>
                <DialogHeader>
                  <DialogTitle>Generate API Key</DialogTitle>
                  <DialogDescription>
                    Create a new API key for your application.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="key-name">Key Name</Label>
                    <Input
                      id="key-name"
                      placeholder="e.g. Production API"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate-limit">Rate Limit (req/min)</Label>
                    <Input
                      id="rate-limit"
                      type="number"
                      value={newKeyRateLimit}
                      onChange={(e) => setNewKeyRateLimit(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={generateKey}>Generate</Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>API Key Generated</DialogTitle>
                  <DialogDescription>
                    Copy your key now. It will not be shown again.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-3">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      This key is displayed only once. Store it securely.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded-lg border bg-muted p-3 text-xs font-mono break-all">
                      {generatedKey}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyKey}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={closeDialog}>Done</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Rate Limit</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                      {key.prefix}
                    </code>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {key.createdAt}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {key.lastUsed || "Never"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        key.status === "active" ? "default" : "destructive"
                      }
                    >
                      {key.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {key.rateLimit}/min
                  </TableCell>
                  <TableCell className="text-right">
                    {key.status === "active" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => revokeKey(key.id)}
                      >
                        Revoke
                      </Button>
                    )}
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
