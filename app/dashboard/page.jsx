"use client";

import React from "react";
import DashboardLayout from "../DashboardLayout";
import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Progress,
  Avatar,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Breadcrumbs,
  BreadcrumbItem
} from "@nextui-org/react";
import {
  Activity,
  Users,
  Eye,
  Coins,
  BarChart3,
  ListChecks,
  Flag,
  ShieldCheck,
  Mail,
  Bell,
  Server,
  Globe,
  Repeat,
  Edit,
  CheckCircle2,
  TimerReset,
} from "lucide-react";

export default function Page() {
  return (
    <DashboardLayout className="mt-5 pb-5 pr-3">

      <Breadcrumbs>
        <BreadcrumbItem>Dashboard</BreadcrumbItem>
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumbs>

      <div className="pb-5 mt-7">
        <h2 className="text-3xl font-medium ">Dashboard</h2>
      </div>

      <div className="space-y-6">
        {/* ===== Top KPI Cards ===== */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <KpiCard
            icon={<Activity className="h-5 w-5" />}
            label="DAU (24h)"
            value="48,920"
            delta="+6.4%"
            deltaColor="success"
            hint="vs. yesterday"
          />
          <KpiCard
            icon={<Users className="h-5 w-5" />}
            label="New Signups"
            value="1,284"
            delta="+3.1%"
            deltaColor="success"
            hint="last 24h"
          />
          <KpiCard
            icon={<Coins className="h-5 w-5" />}
            label="MRR"
            value="€42,730"
            delta="+1.9%"
            deltaColor="success"
            hint="vs. last week"
          />
          <KpiCard
            icon={<BarChart3 className="h-5 w-5" />}
            label="Active Polls"
            value="18"
            delta="2 flagged"
            deltaColor="warning"
            hint="fraud checks pending"
          />
        </section>

        {/* ===== Queues & Pipelines ===== */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                <h3 className="font-semibold">Editorial Pipeline</h3>
              </div>
              <Button as="a" href="/dashboard/articles" size="sm" variant="flat">
                View all
              </Button>
            </CardHeader>
            <CardBody className="space-y-4">
              <PipelineRow label="Drafts" value={42} total={100} />
              <PipelineRow label="In Review" value={18} total={50} />
              <PipelineRow label="Scheduled" value={9} total={20} />
              <PipelineRow label="Published Today" value={12} total={30} color="success" />
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListChecks className="h-5 w-5" />
                <h3 className="font-semibold">Polls Overview</h3>
              </div>
              <Button as="a" href="/dashboard/polls" size="sm" variant="flat">
                Manage
              </Button>
            </CardHeader>
            <CardBody className="space-y-4">
              <StatsRow left="Active" right="18" />
              <StatsRow left="Closing in 24h" right="5" />
              <StatsRow left="Closed (7d)" right="21" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-warning" />
                  <span className="text-sm text-default-600">Fraud Flags</span>
                </div>
                <Chip color="warning" size="sm" variant="flat">
                  7 under review
                </Chip>
              </div>
              <div className="pt-2">
                <Progress
                  label="Participation rate (avg)"
                  value={67}
                  className="max-w-full"
                />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="font-semibold">KYC & Moderation</h3>
              </div>
              <Button as="a" href="/dashboard/moderation/queue" size="sm" variant="flat">
                Review queue
              </Button>
            </CardHeader>
            <CardBody className="space-y-4">
              <StatsRow left="KYC Pending" right="23" />
              <StatsRow left="KYC In Review" right="8" />
              <StatsRow left="Reports (24h)" right="64" />
              <div className="grid grid-cols-2 gap-3 pt-1">
                <Chip color="success" variant="flat" startContent={<CheckCircle2 className="h-4 w-4" />}>
                  92% Approved
                </Chip>
                <Chip color="danger" variant="flat" startContent={<Flag className="h-4 w-4" />}>
                  3 Bans issued
                </Chip>
              </div>
              <Progress
                label="Moderation SLA met"
                value={88}
                className="max-w-full"
                color="success"
              />
            </CardBody>
          </Card>
        </section>

        {/* ===== Recent Activity ===== */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="xl:col-span-2">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <h3 className="font-semibold">Recent Activity</h3>
              </div>
              <Button as="a" href="/dashboard/audit-logs" size="sm" variant="flat">
                Audit logs
              </Button>
            </CardHeader>
            <CardBody>
              <Table aria-label="Recent Activity Table" removeWrapper>
                <TableHeader>
                  <TableColumn>User</TableColumn>
                  <TableColumn>Action</TableColumn>
                  <TableColumn>Entity</TableColumn>
                  <TableColumn>When</TableColumn>
                  <TableColumn>Status</TableColumn>
                </TableHeader>
                <TableBody>
                  {RECENT_ACTIVITY.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar src={row.avatar} size="sm" />
                          <div>
                            <div className="text-sm font-medium">{row.name}</div>
                            <div className="text-xs text-default-500">{row.role}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{row.action}</TableCell>
                      <TableCell className="text-sm">{row.entity}</TableCell>
                      <TableCell className="text-sm text-default-500">{row.when}</TableCell>
                      <TableCell>
                        <Chip size="sm" color={row.statusColor} variant="flat">
                          {row.status}
                        </Chip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                <h3 className="font-semibold">System Health</h3>
              </div>
              <Button as="a" href="/dashboard/system/health" size="sm" variant="flat">
                Details
              </Button>
            </CardHeader>
            <CardBody className="space-y-4">
              <HealthRow icon={<Mail className="h-4 w-4" />} label="Email (Sendgrid)" status="Operational" color="success" />
              <HealthRow icon={<Bell className="h-4 w-4" />} label="Push (Firebase)" status="Operational" color="success" />
              <HealthRow icon={<Server className="h-4 w-4" />} label="Background Jobs" status="Delayed" color="warning" />
              <HealthRow icon={<Globe className="h-4 w-4" />} label="CDN/Cache" status="Operational" color="success" />
              <HealthRow icon={<Repeat className="h-4 w-4" />} label="Webhooks" status="Intermittent" color="warning" />
            </CardBody>
          </Card>
        </section>

        {/* ===== Top Content & Payments Snapshot ===== */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="xl:col-span-2">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                <h3 className="font-semibold">Top Articles (24h)</h3>
              </div>
              <Button as="a" href="/dashboard/analytics/content" size="sm" variant="flat">
                See analytics
              </Button>
            </CardHeader>
            <CardBody>
              <Table aria-label="Top Articles Table" removeWrapper>
                <TableHeader>
                  <TableColumn>Title</TableColumn>
                  <TableColumn className="text-right">Views</TableColumn>
                  <TableColumn className="text-right">CTR</TableColumn>
                  <TableColumn className="text-right">Comments</TableColumn>
                  <TableColumn className="text-right">Status</TableColumn>
                </TableHeader>
                <TableBody>
                  {TOP_ARTICLES.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar radius="sm" size="sm" src={a.cover} />
                          <div className="text-sm font-medium line-clamp-1">{a.title}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{a.views.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{a.ctr}%</TableCell>
                      <TableCell className="text-right">{a.comments}</TableCell>
                      <TableCell className="text-right">
                        <Chip size="sm" color={a.statusColor} variant="flat">
                          {a.status}
                        </Chip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                <h3 className="font-semibold">Payments Snapshot</h3>
              </div>
              <Button as="a" href="/dashboard/payments/metrics" size="sm" variant="flat">
                Finance
              </Button>
            </CardHeader>
            <CardBody className="space-y-4">
              <StatsRow left="MRR" right="€42,730" />
              <StatsRow left="Churn (30d)" right="2.4%" />
              <StatsRow left="New Subs (7d)" right="392" />
              <StatsRow left="Refunds (7d)" right="€640" />
              <div className="pt-1">
                <Progress label="Target to €50k MRR" value={85} />
              </div>
            </CardBody>
          </Card>
        </section>

        {/* ===== Quick Actions ===== */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <h3 className="font-semibold">Quick Actions</h3>
            </CardHeader>
            <CardBody className="flex flex-wrap gap-4">
              <Button as="a" href="/dashboard/articles/new" color="primary" variant="shadow" size="sm">
                Create Article
              </Button>
              <Button as="a" href="/dashboard/polls/new" variant="flat" size="sm">
                New Poll
              </Button>
              <Button as="a" href="/dashboard/broadcasts" variant="flat" size="sm">
                Send Broadcast
              </Button>
              <Button as="a" href="/dashboard/system/cache" variant="flat" size="sm">
                Purge Cache
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <h3 className="font-semibold">SLAs</h3>
              <TimerReset className="h-5 w-5" />
            </CardHeader>
            <CardBody className="space-y-3">
              <Progress label="Comments < 2h" value={91} color="success" />
              <Progress label="KYC < 24h" value={88} color="success" />
              <Progress label="Reports < 12h" value={76} color="warning" />
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <h3 className="font-semibold">Licensing (B2B)</h3>
              <ShieldCheck className="h-5 w-5" />
            </CardHeader>
            <CardBody className="space-y-2">
              <StatsRow left="Catalog Items" right="34" />
              <StatsRow left="Open Orders" right="6" />
              <StatsRow left="Expiring this week" right="3" />
              <Button as="a" href="/dashboard/licensing/catalog" size="sm" variant="flat" className="mt-2">
                Manage Catalog
              </Button>
            </CardBody>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}

/* ========= Small UI Helpers ========= */

function KpiCard({
  icon,
  label,
  value,
  delta,
  deltaColor = "default",
  hint,
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardBody className="p-5">
        <div className="flex items-center justify-between">
          <div className="rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-50 p-2">
            {icon}
          </div>
          <Chip color={deltaColor} variant="flat" size="sm">
            {delta}
          </Chip>
        </div>
        <div className="mt-4">
          <div className="text-xs uppercase tracking-wide text-default-500">{label}</div>
          <div className="text-2xl font-semibold">{value}</div>
          {hint && <div className="text-xs text-default-400 mt-1">{hint}</div>}
        </div>
      </CardBody>
    </Card>
  );
}

function PipelineRow({
  label,
  value,
  total,
  color,
}) {
  const pct = Math.round((value / total) * 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm">{label}</span>
        <span className="text-sm text-default-500">
          {value}/{total}
        </span>
      </div>
      <Progress value={pct} color={color} />
    </div>
  );
}

function StatsRow({ left, right }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-default-600">{left}</span>
      <span className="font-medium">{right}</span>
    </div>
  );
}

function HealthRow({
  icon,
  label,
  status,
  color = "default",
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <Chip size="sm" color={color} variant="flat">
        {status}
      </Chip>
    </div>
  );
}

/* ========= Mock Data (replace with real) ========= */

const RECENT_ACTIVITY = [
  {
    id: 1,
    name: "Ayesha Khan",
    role: "Editor",
    avatar: "https://i.pravatar.cc/100?img=1",
    action: "Approved article",
    entity: "Election Analysis – Part 2",
    when: "5m ago",
    status: "OK",
    statusColor: "success",
  },
  {
    id: 2,
    name: "Bilal Ahmad",
    role: "Moderator",
    avatar: "https://i.pravatar.cc/100?img=15",
    action: "Resolved report",
    entity: "Comment #98231",
    when: "18m ago",
    status: "Resolved",
    statusColor: "success",
  },
  {
    id: 3,
    name: "Sana Shah",
    role: "Analyst",
    avatar: "https://i.pravatar.cc/100?img=8",
    action: "Exported poll results",
    entity: "Youth Vote 2025",
    when: "1h ago",
    status: "Exported",
    statusColor: "primary",
  },
  {
    id: 4,
    name: "Hamza Tariq",
    role: "KYC Reviewer",
    avatar: "https://i.pravatar.cc/100?img=5",
    action: "Rejected KYC",
    entity: "User #20419",
    when: "2h ago",
    status: "Rejected",
    statusColor: "danger",
  },
  {
    id: 5,
    name: "Fatima Raza",
    role: "Partner Manager",
    avatar: "https://i.pravatar.cc/100?img=20",
    action: "Issued license",
    entity: "Poll #77 — Exit Poll",
    when: "3h ago",
    status: "Issued",
    statusColor: "secondary",
  },
];

const TOP_ARTICLES = [
  {
    id: 1,
    title: "Economic Outlook 2025: What the Markets Expect",
    views: 18920,
    ctr: 4.1,
    comments: 126,
    status: "Featured",
    statusColor: "success",
    cover: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Inside the Coalition Talks: Day 3 Highlights",
    views: 15380,
    ctr: 3.5,
    comments: 89,
    status: "Trending",
    statusColor: "primary",
    cover: "https://images.unsplash.com/photo-1513530176992-0cf39c4cbed4?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Flood Preparedness: What Changed This Year",
    views: 12990,
    ctr: 2.8,
    comments: 61,
    status: "Published",
    statusColor: "secondary",
    cover: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Sports: The Rise of New Talent in PSL",
    views: 11234,
    ctr: 3.1,
    comments: 44,
    status: "Published",
    statusColor: "secondary",
    cover: "https://images.unsplash.com/photo-1486286701208-1d58e9338013?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Tech Policy: What the New Bill Means",
    views: 9866,
    ctr: 2.3,
    comments: 38,
    status: "Published",
    statusColor: "secondary",
    cover: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=200&auto=format&fit=crop",
  },
];