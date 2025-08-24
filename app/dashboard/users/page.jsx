"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import DashboardLayout from "../../DashboardLayout";
import {
  Button,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
  Avatar,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Checkbox,
  Switch,
} from "@nextui-org/react";
import {
  Search,
  MoreHorizontal,
  ShieldCheck,
  Shield,
  Eye,
  Pencil,
  Ban,
  UserMinus,
  Trash2,
  MailCheck,
  Download,
  Users as UsersIcon,
  UserCheck,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ---------------- MOCK USERS (swap with API) ---------------- */
const INITIAL_USERS = [
  {
    id: "u1",
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    role: "Editor",
    status: "active", // active | suspended | banned | pending
    verified: true,
    avatar: "https://i.pravatar.cc/100?img=1",
    lastLogin: "2025-08-21T09:20:00Z",
    joinedAt: "2024-03-11T09:00:00Z",
    activity: { votes: 45, comments: 12, donations: 2 },
    labels: ["VIP"],
  },
  {
    id: "u2",
    name: "Bilal Ahmad",
    email: "bilal@example.com",
    role: "Moderator",
    status: "active",
    verified: true,
    avatar: "https://i.pravatar.cc/100?img=15",
    lastLogin: "2025-08-22T12:01:00Z",
    joinedAt: "2024-05-01T09:00:00Z",
    activity: { votes: 3, comments: 19, donations: 0 },
    labels: [],
  },
  {
    id: "u3",
    name: "Sana Shah",
    email: "sana@example.com",
    role: "Analyst",
    status: "suspended",
    verified: false,
    avatar: "https://i.pravatar.cc/100?img=8",
    lastLogin: "2025-08-10T16:10:00Z",
    joinedAt: "2024-06-12T09:00:00Z",
    activity: { votes: 0, comments: 0, donations: 0 },
    labels: ["Tester"],
  },
  {
    id: "u4",
    name: "Hamza Tariq",
    email: "hamza@example.com",
    role: "User",
    status: "active",
    verified: false,
    avatar: "https://i.pravatar.cc/100?img=5",
    lastLogin: "2025-08-20T13:40:00Z",
    joinedAt: "2025-01-15T09:00:00Z",
    activity: { votes: 12, comments: 2, donations: 0 },
    labels: [],
  },
  {
    id: "u5",
    name: "Fatima Raza",
    email: "fatima@example.com",
    role: "Partner Manager",
    status: "banned",
    verified: true,
    avatar: "https://i.pravatar.cc/100?img=20",
    lastLogin: "2025-06-01T12:00:00Z",
    joinedAt: "2024-02-10T09:00:00Z",
    activity: { votes: 0, comments: 0, donations: 1 },
    labels: ["Media"],
  },
];

const ROLE_OPTIONS = ["All", "User", "Moderator", "Editor", "Analyst", "Partner Manager", "Admin"];
const STATUS_COLOR = {
  active: "success",
  suspended: "warning",
  banned: "danger",
  pending: "secondary",
};
const fmt = (d) => new Date(d).toLocaleString();

/* ---------------- PAGE ---------------- */
export default function UsersPage() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("all"); // all | active | suspended | banned | pending
  const [verTab, setVerTab] = useState("all"); // all | verified | unverified
  const [involvedOnly, setInvolvedOnly] = useState(false);

  const [selectedKeys, setSelectedKeys] = useState(new Set([])); // desktop selection
  const [cardSelected, setCardSelected] = useState(new Set([])); // mobile selection

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [confirmAction, setConfirmAction] = useState(null); // 'delete' | 'suspend' | 'ban'
  const [target, setTarget] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return users.filter((u) => {
      const hitsSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q);

      const hitsRole = role === "All" ? true : u.role === role;
      const hitsStatus = status === "all" ? true : u.status === status;
      const hitsVer =
        verTab === "all" ? true : verTab === "verified" ? u.verified : !u.verified;

      const involved =
        (u.activity?.votes || 0) + (u.activity?.comments || 0) + (u.activity?.donations || 0) > 0;
      const hitsInvolved = involvedOnly ? involved : true;

      return hitsSearch && hitsRole && hitsStatus && hitsVer && hitsInvolved;
    });
  }, [users, search, role, status, verTab, involvedOnly]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  /* ---------------- Actions ---------------- */
  const doAction = async (action, ids) => {
    try {
      // TODO: call your API here based on `action` and `ids`
      if (action === "delete") {
        setUsers((prev) => prev.filter((u) => !ids.includes(u.id)));
      } else if (action === "suspend") {
        setUsers((prev) =>
          prev.map((u) => (ids.includes(u.id) ? { ...u, status: "suspended" } : u))
        );
      } else if (action === "ban") {
        setUsers((prev) =>
          prev.map((u) => (ids.includes(u.id) ? { ...u, status: "banned" } : u))
        );
      } else if (action === "reset") {
        // no UI change
      }
      toast.success(
        action === "delete"
          ? "User(s) deleted"
          : action === "suspend"
          ? "User(s) suspended"
          : action === "ban"
          ? "User(s) banned"
          : "Password reset sent"
      );
      setSelectedKeys(new Set([]));
      setCardSelected(new Set([]));
    } catch {
      toast.error("Action failed");
    }
  };

  const exportCSV = () => {
    const cols = [
      "id",
      "name",
      "email",
      "role",
      "status",
      "verified",
      "votes",
      "comments",
      "donations",
      "lastLogin",
      "joinedAt",
    ];
    const csv = [
      cols.join(","),
      ...filtered.map((u) =>
        [
          u.id,
          u.name,
          u.email,
          u.role,
          u.status,
          u.verified,
          u.activity?.votes ?? 0,
          u.activity?.comments ?? 0,
          u.activity?.donations ?? 0,
          u.lastLogin,
          u.joinedAt,
        ]
          .map((v) => JSON.stringify(v ?? ""))
          .join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users_export.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.info("CSV exported");
  };

  const openConfirm = (action, user) => {
    setConfirmAction(action);
    setTarget(user);
    onOpen();
  };

  const confirmDo = () => {
    onOpenChange();
    if (!confirmAction) return;
    const ids = target ? [target.id] : [];
    doAction(confirmAction, ids);
    setTarget(null);
  };

  const toggleCardSelect = (id) =>
    setCardSelected((prev) => {
      const ns = new Set(prev);
      if (ns.has(id)) ns.delete(id);
      else ns.add(id);
      return ns;
    });

  const bulkFromCards = () => Array.from(cardSelected);
  const bulkFromTable = () => Array.from(selectedKeys);

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      <DashboardLayout className="mt-5 pr-3">
        <div className="mx-auto w-full max-w-[1200px] px-4 space-y-5">
          {/* -------- Toolbar -------- */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-center">
            <div className="md:col-span-5">
              <Input
                aria-label="Search users"
                placeholder="Search by name, email, role…"
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
                aria-label="Role"
                selectedKeys={[role]}
                onSelectionChange={(keys) => {
                  const k = Array.from(keys)[0];
                  setRole(k);
                  setPage(1);
                }}
              >
                {ROLE_OPTIONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="md:col-span-2">
              <Select
                aria-label="Status"
                selectedKeys={[status]}
                onSelectionChange={(keys) => {
                  const k = Array.from(keys)[0];
                  setStatus(k);
                  setPage(1);
                }}
              >
                {["all", "active", "suspended", "banned", "pending"].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s[0].toUpperCase() + s.slice(1)}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="md:col-span-3 flex items-center gap-3">
              <Tabs
                selectedKey={verTab}
                onSelectionChange={(k) => {
                  setVerTab(k);
                  setPage(1);
                }}
                radius="full"
                variant="solid"
              >
                <Tab key="all" title="All" />
                <Tab key="verified" title={<span className="flex items-center gap-1"><ShieldCheck size={14}/>Verified</span>} />
                <Tab key="unverified" title={<span className="flex items-center gap-1"><Shield size={14}/>Unverified</span>} />
              </Tabs>
            </div>

            <div className="md:col-span-12 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-4">
                <Switch
                  isSelected={involvedOnly}
                  onValueChange={setInvolvedOnly}
                  size="sm"
                >
                  Involved only
                </Switch>

                {/* Bulk actions (mobile uses cardSelected, desktop uses table selection) */}
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="flat" startContent={<MoreHorizontal size={16} />}>
                      Bulk actions
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    onAction={(key) =>
                      doAction(
                        key,
                        window.innerWidth < 768 ? bulkFromCards() : bulkFromTable()
                      )
                    }
                  >
                    <DropdownItem key="suspend" startContent={<UserMinus size={14} />}>
                      Suspend
                    </DropdownItem>
                    <DropdownItem key="ban" startContent={<Ban size={14} />}>
                      Ban
                    </DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger" startContent={<Trash2 size={14}/>}>
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <Button variant="flat" startContent={<Download size={16} />} onPress={exportCSV}>
                  Export CSV
                </Button>
              </div>

              <Button as={Link} href="/dashboard/staff" startContent={<UsersIcon size={16} />}>
                Manage Staff
              </Button>
            </div>
          </div>

          {/* -------- Mobile Cards -------- */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {visible.map((u) => {
              const act = u.activity || {};
              return (
                <div key={u.id} className="rounded-xl border bg-white p-3 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar src={u.avatar} name={u.name} />
                      <div>
                        <div className="font-medium leading-tight">{u.name}</div>
                        <div className="text-xs text-default-500">{u.email}</div>
                      </div>
                    </div>
                    <Checkbox
                      isSelected={cardSelected.has(u.id)}
                      onValueChange={() => toggleCardSelect(u.id)}
                      aria-label="select"
                    />
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Chip size="sm" variant="flat">{u.role}</Chip>
                    <Chip size="sm" color={STATUS_COLOR[u.status]} variant="flat">{u.status}</Chip>
                    {u.verified ? (
                      <Chip size="sm" color="success" variant="flat" startContent={<UserCheck size={14}/>}>
                        Verified
                      </Chip>
                    ) : (
                      <Chip size="sm" variant="flat">Unverified</Chip>
                    )}
                  </div>

                  <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-default-600">
                    <div>Votes: <b>{act.votes ?? 0}</b></div>
                    <div>Comments: <b>{act.comments ?? 0}</b></div>
                    <div>Donations: <b>{act.donations ?? 0}</b></div>
                  </div>
                  <div className="mt-1 text-xs text-default-500">
                    Last login: {u.lastLogin ? fmt(u.lastLogin) : "—"}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button as={Link} href={`/dashboard/users/${u.id}`} size="sm" variant="flat" startContent={<Eye size={14} />}>
                      View
                    </Button>
                    <Button as={Link} href={`/dashboard/users/${u.id}/edit`} size="sm" variant="flat" startContent={<Pencil size={14} />}>
                      Edit
                    </Button>
                    <Button size="sm" variant="flat" startContent={<MailCheck size={14} />} onPress={() => doAction("reset", [u.id])}>
                      Reset Password
                    </Button>
                    <Button size="sm" variant="flat" startContent={<UserMinus size={14} />} onPress={() => openConfirm("suspend", u)}>
                      Suspend
                    </Button>
                    <Button size="sm" color="danger" variant="flat" startContent={<Ban size={14} />} onPress={() => openConfirm("ban", u)}>
                      Ban
                    </Button>
                    <Button size="sm" color="danger" variant="flat" startContent={<Trash2 size={14} />} onPress={() => openConfirm("delete", u)}>
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* -------- Desktop Table -------- */}
          <div className="hidden md:block rounded-xl border bg-white">
            <Table
              aria-label="Users table"
              removeWrapper
              selectionMode="multiple"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <TableHeader>
                <TableColumn>User</TableColumn>
                <TableColumn className="w-[140px]">Role</TableColumn>
                <TableColumn className="w-[110px]">Status</TableColumn>
                <TableColumn className="w-[120px]">Verified</TableColumn>
                <TableColumn className="w-[100px] text-right">Votes</TableColumn>
                <TableColumn className="w-[120px] text-right">Comments</TableColumn>
                <TableColumn className="w-[120px] text-right">Donations</TableColumn>
                <TableColumn className="w-[170px]">Last Login</TableColumn>
                <TableColumn className="w-[260px] text-right">Actions</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No users found" items={visible}>
                {visible.map((u) => {
                  const act = u.activity || {};
                  return (
                    <TableRow key={u.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar src={u.avatar} name={u.name} />
                          <div className="min-w-0">
                            <div className="font-medium leading-tight line-clamp-1">{u.name}</div>
                            <div className="text-xs text-default-500 line-clamp-1">{u.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{u.role}</TableCell>
                      <TableCell>
                        <Chip size="sm" color={STATUS_COLOR[u.status]} variant="flat">
                          {u.status}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        {u.verified ? (
                          <Chip size="sm" color="success" variant="flat" startContent={<ShieldCheck size={14} />}>
                            Verified
                          </Chip>
                        ) : (
                          <Chip size="sm" variant="flat" startContent={<Shield size={14} />}>
                            Unverified
                          </Chip>
                        )}
                      </TableCell>
                      <TableCell className="text-right">{act.votes ?? 0}</TableCell>
                      <TableCell className="text-right">{act.comments ?? 0}</TableCell>
                      <TableCell className="text-right">{act.donations ?? 0}</TableCell>
                      <TableCell><span className="text-xs text-default-500">{u.lastLogin ? fmt(u.lastLogin) : "—"}</span></TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button as={Link} href={`/dashboard/users/${u.id}`} size="sm" variant="flat" startContent={<Eye size={14} />}>
                            View
                          </Button>
                          <Button as={Link} href={`/dashboard/users/${u.id}/edit`} size="sm" variant="flat" startContent={<Pencil size={14} />}>
                            Edit
                          </Button>
                          <Button size="sm" variant="flat" startContent={<MailCheck size={14} />} onPress={() => doAction("reset", [u.id])}>
                            Reset Password
                          </Button>
                          <Button size="sm" variant="flat" startContent={<UserMinus size={14} />} onPress={() => openConfirm("suspend", u)}>
                            Suspend
                          </Button>
                          <Button size="sm" color="danger" variant="flat" startContent={<Ban size={14} />} onPress={() => openConfirm("ban", u)}>
                            Ban
                          </Button>
                          <Button size="sm" color="danger" variant="flat" startContent={<Trash2 size={14} />} onPress={() => openConfirm("delete", u)}>
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* Bulk actions footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
              <div className="text-sm text-default-500">
                Selected: <b>{Array.from(selectedKeys).length}</b>
              </div>
              <div className="flex items-center gap-2">
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="flat" startContent={<MoreHorizontal size={16} />}>
                      Bulk actions
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu onAction={(key) => doAction(key, bulkFromTable())}>
                    <DropdownItem key="suspend" startContent={<UserMinus size={14} />}>
                      Suspend
                    </DropdownItem>
                    <DropdownItem key="ban" startContent={<Ban size={14} />}>
                      Ban
                    </DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger" startContent={<Trash2 size={14}/>}>
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Button variant="flat" startContent={<Download size={16} />} onPress={exportCSV}>
                  Export CSV
                </Button>
              </div>
            </div>

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

        {/* Confirm modal for suspend/ban/delete */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {confirmAction === "delete"
                    ? "Delete User"
                    : confirmAction === "ban"
                    ? "Ban User"
                    : "Suspend User"}
                </ModalHeader>
                <ModalBody>
                  <p>
                    Are you sure you want to{" "}
                    <b>
                      {confirmAction === "delete"
                        ? "delete"
                        : confirmAction === "ban"
                        ? "ban"
                        : "suspend"}
                    </b>{" "}
                    <b>{target?.name ?? "this user"}</b>?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color={confirmAction === "delete" ? "danger" : "warning"}
                    startContent={
                      confirmAction === "delete" ? (
                        <Trash2 size={16} />
                      ) : confirmAction === "ban" ? (
                        <Ban size={16} />
                      ) : (
                        <UserMinus size={16} />
                      )
                    }
                    onPress={() => confirmDo()}
                  >
                    {confirmAction === "delete"
                      ? "Delete"
                      : confirmAction === "ban"
                      ? "Ban"
                      : "Suspend"}
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
