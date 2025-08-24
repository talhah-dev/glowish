"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import DashboardLayout from "../../DashboardLayout";
import {
  Button,
  Input,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Checkbox,
} from "@nextui-org/react";
import {
  Search,
  Trash2,
  Pencil,
  BarChart3,
  Filter,
  ListChecks,
  CheckCircle2,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ---------- MOCK DATA (swap with API) ---------- */
const INITIAL_SURVEYS = [
  {
    id: "s1",
    title: "What is your favorite language?",
    type: "single", // single | multiple
    status: "active", // draft | active | closed | archived
    openAt: "2025-05-16T08:00:00Z",
    closeAt: "2025-05-23T08:00:00Z",
    totalVotes: 83,
    tags: ["#Current", "#Politics"],
  },
  {
    id: "s2",
    title: "Which framework do you prefer?",
    type: "multiple",
    status: "active",
    openAt: "2025-05-16T08:00:00Z",
    closeAt: "2025-05-30T08:00:00Z",
    totalVotes: 13,
    tags: ["#Current", "#Tech"],
  },
  {
    id: "s3",
    title: "City flood preparedness score",
    type: "single",
    status: "draft",
    openAt: "",
    closeAt: "",
    totalVotes: 0,
    tags: ["#Community"],
  },
  {
    id: "s4",
    title: "Weekend sports interest",
    type: "multiple",
    status: "closed",
    openAt: "2025-05-02T08:00:00Z",
    closeAt: "2025-05-05T08:00:00Z",
    totalVotes: 241,
    tags: ["#Sports"],
  },
];

const STATUS_COLOR = {
  active: "success",
  draft: "default",
  closed: "secondary",
  archived: "warning",
};

const fmtDT = (v) => (v ? new Date(v).toLocaleString() : "—");

/* ---------- PAGE ---------- */
export default function SurveysPage() {
  const [rows, setRows] = useState(INITIAL_SURVEYS);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all"); // all | draft | active | closed | archived
  const [typeTab, setTypeTab] = useState("all"); // all | single | multiple
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [target, setTarget] = useState(null);
  const [cardSelected, setCardSelected] = useState(new Set([])); // for mobile

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      const hitsSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.tags.join(" ").toLowerCase().includes(q);
      const hitsStatus = status === "all" ? true : r.status === status;
      const hitsType = typeTab === "all" ? true : r.type === typeTab;
      return hitsSearch && hitsStatus && hitsType;
    });
  }, [rows, search, status, typeTab]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  const handleDelete = async (id) => {
    try {
      // TODO: await fetch(`/api/surveys/${id}`, { method: "DELETE" });
      setRows((prev) => prev.filter((s) => s.id !== id));
      toast.success("Survey deleted");
    } catch {
      toast.error("Failed to delete survey");
    }
  };

  const toggleCardSelect = (id) => {
    setCardSelected((prev) => {
      const ns = new Set(prev);
      if (ns.has(id)) ns.delete(id);
      else ns.add(id);
      return ns;
    });
  };

  const deleteSelected = async () => {
    const ids = Array.from(cardSelected);
    if (!ids.length) {
      toast.warn("No surveys selected");
      return;
    }
    try {
      // TODO: bulk delete
      setRows((prev) => prev.filter((s) => !ids.includes(s.id)));
      setCardSelected(new Set([]));
      toast.success("Selected surveys deleted");
    } catch {
      toast.error("Bulk delete failed");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      <DashboardLayout className="mt-5 pr-3">
        <div className="mx-auto w-full space-y-5">
          {/* Toolbar */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-center">
            <div className="md:col-span-5">
              <Input
                aria-label="Search surveys"
                placeholder="Search by title or tags…"
                startContent={<Search size={16} />}
                value={search}
                onValueChange={(v) => {
                  setSearch(v);
                  setPage(1);
                }}
              />
            </div>

            <div className="md:col-span-4">
              <Tabs
                selectedKey={typeTab}
                onSelectionChange={(k) => {
                  setTypeTab(k);
                  setPage(1);
                }}
                radius="full"
                variant="solid"
              >
                <Tab
                  key="all"
                  title={
                    <span className="flex items-center gap-1">
                      <Filter size={14} /> All Types
                    </span>
                  }
                />
                <Tab
                  key="single"
                  title={
                    <span className="flex items-center gap-1">
                      <ListChecks size={14} /> Single
                    </span>
                  }
                />
                <Tab
                  key="multiple"
                  title={
                    <span className="flex items-center gap-1">
                      <CheckCircle2 size={14} /> Multiple
                    </span>
                  }
                />
              </Tabs>
            </div>

            <div className="md:col-span-3">
              <Select
                aria-label="Status"
                selectedKeys={[status]}
                onSelectionChange={(keys) => {
                  const k = Array.from(keys)[0];
                  setStatus(k);
                  setPage(1);
                }}
              >
                {["all", "draft", "active", "closed", "archived"].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s[0].toUpperCase() + s.slice(1)}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="md:col-span-12 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 md:hidden">
                <Button variant="flat" color="danger" onPress={deleteSelected}>
                  Delete Selected
                </Button>
              </div>
              <Button
                as={Link}
                href="/dashboard/surveys/new"
                color="primary"
              >
                New Survey
              </Button>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {visible.map((s) => (
              <div key={s.id} className="rounded-xl border bg-white p-3 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-medium leading-tight">{s.title}</h3>
                  <Checkbox
                    isSelected={cardSelected.has(s.id)}
                    onValueChange={() => toggleCardSelect(s.id)}
                    aria-label="select"
                  />
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Chip size="sm" variant="flat">
                    {s.type}
                  </Chip>
                  <Chip size="sm" color={STATUS_COLOR[s.status]} variant="flat">
                    {s.status}
                  </Chip>
                  <span className="text-xs text-default-500">
                    Votes: {s.totalVotes}
                  </span>
                </div>
                <div className="mt-2 text-xs text-default-500">
                  <div>Open: {fmtDT(s.openAt)}</div>
                  <div>Close: {fmtDT(s.closeAt)}</div>
                </div>
                {s.tags?.length ? (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {s.tags.map((t) => (
                      <Chip key={t} size="sm" variant="flat">
                        {t}
                      </Chip>
                    ))}
                  </div>
                ) : null}
                <div className="mt-3 flex gap-2">
                  <Button
                    as={Link}
                    href={`/dashboard/surveys/${s.id}/edit`}
                    size="sm"
                    variant="flat"
                    startContent={<Pencil size={14} />}
                  >
                    Edit
                  </Button>
                  <Button
                    as={Link}
                    href={`/dashboard/surveys/${s.id}/results`}
                    size="sm"
                    variant="flat"
                    startContent={<BarChart3 size={14} />}
                  >
                    View Votes
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    startContent={<Trash2 size={14} />}
                    onPress={() => {
                      setTarget(s);
                      onOpen();
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block rounded-xl border bg-white">
            <Table aria-label="Surveys table" removeWrapper>
              <TableHeader>
                <TableColumn>Survey</TableColumn>
                <TableColumn className="w-[110px]">Type</TableColumn>
                <TableColumn className="w-[110px]">Status</TableColumn>
                <TableColumn className="w-[170px]">Open</TableColumn>
                <TableColumn className="w-[170px]">Close</TableColumn>
                <TableColumn className="w-[110px] text-right">Votes</TableColumn>
                <TableColumn className="w-[200px] text-right">Actions</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No surveys found" items={visible}>
                {visible.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div className="min-w-0">
                        <div className="font-medium leading-tight line-clamp-1">{s.title}</div>
                        {s.tags?.length ? (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {s.tags.map((t) => (
                              <Chip key={t} size="sm" variant="flat">{t}</Chip>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip size="sm" variant="flat">{s.type}</Chip>
                    </TableCell>
                    <TableCell>
                      <Chip size="sm" color={STATUS_COLOR[s.status]} variant="flat">
                        {s.status}
                      </Chip>
                    </TableCell>
                    <TableCell><span className="text-xs text-default-500">{fmtDT(s.openAt)}</span></TableCell>
                    <TableCell><span className="text-xs text-default-500">{fmtDT(s.closeAt)}</span></TableCell>
                    <TableCell className="text-right">{s.totalVotes}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          as={Link}
                          href={`/dashboard/surveys/${s.id}/edit`}
                          size="sm"
                          variant="flat"
                          startContent={<Pencil size={14} />}
                        >
                          Edit
                        </Button>
                        <Button
                          as={Link}
                          href={`/dashboard/surveys/${s.id}/results`}
                          size="sm"
                          variant="flat"
                          startContent={<BarChart3 size={14} />}
                        >
                          View Votes
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          variant="flat"
                          startContent={<Trash2 size={14} />}
                          onPress={() => {
                            setTarget(s);
                            onOpen();
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
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

        {/* Confirm Delete */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Delete Survey</ModalHeader>
                <ModalBody>
                  <p>
                    Are you sure you want to delete <b>{target?.title ?? "this survey"}</b>? This
                    action cannot be undone.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="danger"
                    startContent={<Trash2 size={16} />}
                    onPress={() => {
                      onClose();
                      if (target) {
                        handleDelete(target.id);
                        setTarget(null);
                      }
                    }}
                  >
                    Delete
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
