"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import DashboardLayout from "../../DashboardLayout";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Divider,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
    Select,
    SelectItem,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure,
} from "@nextui-org/react";
import {
    Search,
    CreditCard,
    Download,
    ExternalLink,
    RefreshCw,
    Receipt,
    CircleDollarSign,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ---------------- Mock data (replace with your API) ---------------- */
const MOCK = [
    {
        id: "pay_001",
        user: { id: "u1", name: "Ayesha Khan", email: "ayesha@example.com" },
        amount: 500, // cents
        currency: "EUR",
        type: "one_time", // one_time | recurring
        provider: "stripe", // stripe | paypal
        method: "card", // card | apple_pay | google_pay | paypal
        status: "succeeded", // succeeded | pending | failed | refunded
        createdAt: "2025-05-16T09:30:00Z",
        receiptUrl: "#",
    },
    {
        id: "pay_002",
        user: { id: "u2", name: "Bilal Ahmad", email: "bilal@example.com" },
        amount: 1000,
        currency: "EUR",
        type: "recurring",
        provider: "stripe",
        method: "apple_pay",
        status: "succeeded",
        createdAt: "2025-05-17T12:15:00Z",
        receiptUrl: "#",
    },
    {
        id: "pay_003",
        user: { id: "u3", name: "Sana Shah", email: "sana@example.com" },
        amount: 1500,
        currency: "EUR",
        type: "one_time",
        provider: "paypal",
        method: "paypal",
        status: "refunded",
        createdAt: "2025-05-10T17:10:00Z",
        receiptUrl: "#",
    },
    {
        id: "pay_004",
        user: { id: "u4", name: "Hamza Tariq", email: "hamza@example.com" },
        amount: 2000,
        currency: "EUR",
        type: "one_time",
        provider: "stripe",
        method: "card",
        status: "pending",
        createdAt: "2025-05-20T08:05:00Z",
        receiptUrl: "#",
    },
    {
        id: "pay_005",
        user: { id: "u5", name: "Fatima Raza", email: "fatima@example.com" },
        amount: 500,
        currency: "EUR",
        type: "recurring",
        provider: "paypal",
        method: "paypal",
        status: "failed",
        createdAt: "2025-05-07T10:00:00Z",
        receiptUrl: "#",
    },
];

const STATUS_COLOR = {
    succeeded: "success",
    pending: "warning",
    failed: "danger",
    refunded: "secondary",
};

const METHOD_LABEL = {
    card: "Card",
    apple_pay: "Apple Pay",
    google_pay: "Google Pay",
    paypal: "PayPal",
};

const fmtMoney = (cents, cur = "EUR") =>
    new Intl.NumberFormat("en", { style: "currency", currency: cur }).format(
        (cents || 0) / 100
    );
const fmtDT = (v) => (v ? new Date(v).toLocaleString() : "—");

/* ---------------- Page ---------------- */
export default function PaymentsPage() {
    const [rows, setRows] = useState(MOCK);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all"); // all | succeeded | pending | failed | refunded
    const [provider, setProvider] = useState("all"); // all | stripe | paypal
    const [type, setType] = useState("all"); // all | one_time | recurring
    const [minAmt, setMinAmt] = useState("");
    const [maxAmt, setMaxAmt] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [onlyEUR, setOnlyEUR] = useState(true);

    const [page, setPage] = useState(1);
    const pageSize = 10;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [target, setTarget] = useState(null);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return rows.filter((r) => {
            const hitsQ =
                !q ||
                r.user.name.toLowerCase().includes(q) ||
                r.user.email.toLowerCase().includes(q) ||
                r.id.toLowerCase().includes(q);

            const hitsStatus = status === "all" ? true : r.status === status;
            const hitsProvider = provider === "all" ? true : r.provider === provider;
            const hitsType = type === "all" ? true : r.type === type;

            const hitsCurrency = onlyEUR ? r.currency === "EUR" : true;

            const amt = r.amount / 100;
            const hitsMin = minAmt ? amt >= Number(minAmt) : true;
            const hitsMax = maxAmt ? amt <= Number(maxAmt) : true;

            const ts = new Date(r.createdAt).getTime();
            const hitsFrom = fromDate ? ts >= new Date(fromDate).getTime() : true;
            const hitsTo = toDate ? ts <= new Date(toDate).getTime() + 86_399_000 : true;

            return (
                hitsQ &&
                hitsStatus &&
                hitsProvider &&
                hitsType &&
                hitsCurrency &&
                hitsMin &&
                hitsMax &&
                hitsFrom &&
                hitsTo
            );
        });
    }, [rows, search, status, provider, type, minAmt, maxAmt, fromDate, toDate, onlyEUR]);

    const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const start = (page - 1) * pageSize;
    const visible = filtered.slice(start, start + pageSize);

    /* ---------------- KPIs ---------------- */
    const kpis = useMemo(() => {
        const total = filtered.reduce((s, r) => s + (r.status === "succeeded" ? r.amount : 0), 0);
        const count = filtered.filter((r) => r.status === "succeeded").length;
        const avg = count ? total / count : 0;
        const refunds = filtered.filter((r) => r.status === "refunded").length;
        const recurring = filtered.filter((r) => r.type === "recurring" && r.status === "succeeded");
        const recurringSum = recurring.reduce((s, r) => s + r.amount, 0);
        return {
            total,
            count,
            avg,
            refundRate: filtered.length ? Math.round((refunds / filtered.length) * 100) : 0,
            recurringSum,
            recurringCount: recurring.length,
        };
    }, [filtered]);

    /* ---------------- Actions ---------------- */
    const exportCSV = () => {
        const cols = [
            "id",
            "name",
            "email",
            "amount",
            "currency",
            "type",
            "provider",
            "method",
            "status",
            "createdAt",
            "receiptUrl",
        ];
        const csv = [
            cols.join(","),
            ...filtered.map((r) =>
                [
                    r.id,
                    r.user.name,
                    r.user.email,
                    (r.amount / 100).toFixed(2),
                    r.currency,
                    r.type,
                    r.provider,
                    METHOD_LABEL[r.method] || r.method,
                    r.status,
                    r.createdAt,
                    r.receiptUrl,
                ]
                    .map((v) => JSON.stringify(v ?? ""))
                    .join(",")
            ),
        ].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "donations_export.csv";
        a.click();
        URL.revokeObjectURL(url);
        toast.info("CSV exported");
    };

    const doRefund = async (paymentId) => {
        try {
            // TODO: call refund API for paymentId
            setRows((prev) =>
                prev.map((r) => (r.id === paymentId ? { ...r, status: "refunded" } : r))
            );
            toast.success("Payment refunded");
        } catch {
            toast.error("Refund failed");
        }
    };

    return (
        <>
            <ToastContainer position="top-right" theme="colored" />
            <DashboardLayout className="mt-5 pr-3">
                <div className="mx-auto w-full max-w-[1200px] px-4 space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold flex items-center gap-2">
                            <CircleDollarSign className="h-6 w-6" /> Donations
                        </h1>
                        <div className="flex items-center gap-2">
                            <Button variant="flat" startContent={<Download size={16} />} onPress={exportCSV}>
                                Export CSV
                            </Button>
                        </div>
                    </div>

                    {/* KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <Card>
                            <CardHeader className="text-sm text-default-500">Total (Succeeded)</CardHeader>
                            <CardBody className="text-xl font-semibold">{fmtMoney(kpis.total, "EUR")}</CardBody>
                        </Card>
                        <Card>
                            <CardHeader className="text-sm text-default-500">Donations</CardHeader>
                            <CardBody className="text-xl font-semibold">{kpis.count}</CardBody>
                        </Card>
                        <Card>
                            <CardHeader className="text-sm text-default-500">Avg Donation</CardHeader>
                            <CardBody className="text-xl font-semibold">
                                {fmtMoney(Math.round(kpis.avg), "EUR")}
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader className="text-sm text-default-500">Recurring / mo</CardHeader>
                            <CardBody className="text-xl font-semibold">
                                {fmtMoney(kpis.recurringSum, "EUR")} <span className="text-xs">({kpis.recurringCount})</span>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Filters */}
                    <Card>
                        <CardBody className="grid grid-cols-1 md:grid-cols-12 gap-3">
                            <div className="md:col-span-4">
                                <Input
                                    aria-label="Search payments"
                                    placeholder="Search by donor, email or payment ID…"
                                    startContent={<Search size={16} />}
                                    value={search}
                                    onValueChange={(v) => {
                                        setSearch(v);
                                        setPage(1);
                                    }}
                                />
                            </div>

                            <div className="md:col-span-2">
                                <Select
                                    aria-label="Status"
                                    selectedKeys={[status]}
                                    onSelectionChange={(keys) => {
                                        setStatus(Array.from(keys)[0]);
                                        setPage(1);
                                    }}
                                >
                                    {["all", "succeeded", "pending", "failed", "refunded"].map((s) => (
                                        <SelectItem key={s}>{s[0].toUpperCase() + s.slice(1)}</SelectItem>
                                    ))}
                                </Select>
                            </div>

                            <div className="md:col-span-2">
                                <Select
                                    aria-label="Provider"
                                    selectedKeys={[provider]}
                                    onSelectionChange={(keys) => {
                                        setProvider(Array.from(keys)[0]);
                                        setPage(1);
                                    }}
                                >
                                    {["all", "stripe", "paypal"].map((p) => (
                                        <SelectItem key={p}>{p[0].toUpperCase() + p.slice(1)}</SelectItem>
                                    ))}
                                </Select>
                            </div>

                            <div className="md:col-span-2">
                                <Select
                                    aria-label="Type"
                                    selectedKeys={[type]}
                                    onSelectionChange={(keys) => {
                                        setType(Array.from(keys)[0]);
                                        setPage(1);
                                    }}
                                >
                                    {["all", "one_time", "recurring"].map((t) => (
                                        <SelectItem key={t}>
                                            {t === "one_time" ? "One-time" : t === "recurring" ? "Recurring" : "All"}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                            <div className="md:col-span-2 flex items-center">
                                <Switch isSelected={onlyEUR} onValueChange={setOnlyEUR}>
                                    EUR only
                                </Switch>
                            </div>

                            <Divider className="md:col-span-12" />

                            <div className="md:col-span-2">
                                <Input
                                    type="number"
                                    label="Min (€)"
                                    labelPlacement="outside"
                                    value={minAmt}
                                    onValueChange={setMinAmt}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Input
                                    type="number"
                                    label="Max (€)"
                                    labelPlacement="outside"
                                    value={maxAmt}
                                    onValueChange={setMaxAmt}
                                />
                            </div>
                            <div className="md:col-span-3">
                                <Input
                                    type="date"
                                    label="From"
                                    labelPlacement="outside"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-3">
                                <Input
                                    type="date"
                                    label="To"
                                    labelPlacement="outside"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2 flex items-end">
                                <Button
                                    variant="flat"
                                    startContent={<RefreshCw size={16} />}
                                    onPress={() => {
                                        setSearch("");
                                        setStatus("all");
                                        setProvider("all");
                                        setType("all");
                                        setOnlyEUR(true);
                                        setMinAmt("");
                                        setMaxAmt("");
                                        setFromDate("");
                                        setToDate("");
                                        setPage(1);
                                    }}
                                >
                                    Reset
                                </Button>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Mobile cards */}
                    <div className="grid grid-cols-1 gap-4 md:hidden">
                        {visible.map((r) => (
                            <Card key={r.id}>
                                <CardBody className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="text-lg font-semibold">{fmtMoney(r.amount, r.currency)}</div>
                                        <Chip size="sm" color={STATUS_COLOR[r.status]} variant="flat">
                                            {r.status}
                                        </Chip>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium">{r.user.name}</div>
                                        <div className="text-default-500">{r.user.email}</div>
                                    </div>
                                    <div className="text-xs text-default-500">
                                        <div>ID: {r.id}</div>
                                        <div>Date: {fmtDT(r.createdAt)}</div>
                                        <div>
                                            {r.provider.toUpperCase()} • {METHOD_LABEL[r.method]} •{" "}
                                            {r.type === "recurring" ? "Recurring" : "One-time"}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 pt-1">
                                        <Button
                                            as={Link}
                                            href={r.receiptUrl}
                                            target="_blank"
                                            size="sm"
                                            variant="flat"
                                            startContent={<Receipt size={14} />}
                                        >
                                            Receipt
                                        </Button>
                                        {(r.status === "succeeded") && (
                                            <Button
                                                size="sm"
                                                color="danger"
                                                variant="flat"
                                                onPress={() => {
                                                    setTarget(r);
                                                    onOpen();
                                                }}
                                            >
                                                Refund
                                            </Button>
                                        )}
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>

                    {/* Desktop table */}
                    <div className="hidden md:block rounded-xl border bg-white">
                        <Table aria-label="Donations table" removeWrapper>
                            <TableHeader>
                                <TableColumn>Donor</TableColumn>
                                <TableColumn className="w-[130px] text-right">Amount</TableColumn>
                                <TableColumn className="w-[110px]">Type</TableColumn>
                                <TableColumn className="w-[110px]">Provider</TableColumn>
                                <TableColumn className="w-[140px]">Method</TableColumn>
                                <TableColumn className="w-[130px]">Status</TableColumn>
                                <TableColumn className="w-[180px]">Date</TableColumn>
                                <TableColumn className="w-[220px] text-right">Actions</TableColumn>
                            </TableHeader>
                            <TableBody emptyContent="No payments found" items={visible}>
                                {visible.map((r) => (
                                    <TableRow key={r.id}>
                                        <TableCell>
                                            <div className="min-w-0">
                                                <div className="font-medium leading-tight line-clamp-1">{r.user.name}</div>
                                                <div className="text-xs text-default-500 line-clamp-1">{r.user.email}</div>
                                                <div className="text-[10px] text-default-400">#{r.id}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">{fmtMoney(r.amount, r.currency)}</TableCell>
                                        <TableCell>
                                            <Chip size="sm" variant="flat">
                                                {r.type === "recurring" ? "Recurring" : "One-time"}
                                            </Chip>
                                        </TableCell>
                                        <TableCell>{r.provider.toUpperCase()}</TableCell>
                                        <TableCell>{METHOD_LABEL[r.method] || r.method}</TableCell>
                                        <TableCell>
                                            <Chip size="sm" color={STATUS_COLOR[r.status]} variant="flat">
                                                {r.status}
                                            </Chip>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs text-default-500">{fmtDT(r.createdAt)}</span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    as={Link}
                                                    href={r.receiptUrl}
                                                    target="_blank"
                                                    size="sm"
                                                    variant="flat"
                                                    startContent={<ExternalLink size={14} />}
                                                >
                                                    Receipt
                                                </Button>
                                                <Button
                                                    as={Link}
                                                    href={`/dashboard/users/${r.user.id}`}
                                                    size="sm"
                                                    variant="flat"
                                                    startContent={<CreditCard size={14} />}
                                                >
                                                    Donor
                                                </Button>
                                                {r.status === "succeeded" && (
                                                    <Button
                                                        size="sm"
                                                        color="danger"
                                                        variant="flat"
                                                        onPress={() => {
                                                            setTarget(r);
                                                            onOpen();
                                                        }}
                                                    >
                                                        Refund
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Footer */}
                        <div className="flex items-center justify-between px-4 py-3">
                            <span className="text-sm text-default-500">
                                Showing <b>{filtered.length ? start + 1 : 0}</b>–
                                <b>{Math.min(start + pageSize, filtered.length)}</b> of{" "}
                                <b>{filtered.length}</b>
                            </span>
                            <Pagination total={pages} page={page} onChange={setPage} showControls radius="full" />
                        </div>
                    </div>
                </div>

                {/* Confirm Refund */}
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Refund Payment</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Refund <b>{fmtMoney(target?.amount || 0, target?.currency || "EUR")}</b> from{" "}
                                        <b>{target?.user?.name}</b> (ID <code>{target?.id}</code>)?
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button variant="light" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        color="danger"
                                        onPress={() => {
                                            onClose();
                                            if (target) doRefund(target.id);
                                        }}
                                    >
                                        Confirm Refund
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </DashboardLayout>
        </>
    );
}
