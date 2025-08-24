"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
  Select,
  SelectItem,
  Checkbox,
} from "@nextui-org/react";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Pencil,
  Trash2,
  MoreHorizontal,
  Image as ImageIcon,
  PlayCircle,
  Download,
} from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import DashboardLayout from "../../DashboardLayout";

/** ---------------- MOCK DATA (replace with API) ---------------- */
const INITIAL_POSTS = [
  {
    id: "p1",
    type: "image",
    title: "Champions Again: India’s Glorious World Cup Victory!",
    summary:
      "India celebrated a historic victory in the 2024 World Cup… Led by their captain’s inspiring leadership…",
    status: "published",
    author: "Editor Team",
    category: "Sports",
    tags: ["#Prime", "#Photos", "#Events"],
    createdAt: "2025-08-20T10:22:00Z",
    updatedAt: "2025-08-21T07:10:00Z",
    views: 2010,
    comments: 79,
    thumbnail:
      "https://images.unsplash.com/photo-1755677304075-d3357863b1f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D",
    slug: "champions-again-india-world-cup",
  },
  {
    id: "p2",
    type: "video",
    title: "AI Technology Effect on Human Life",
    summary:
      "AI is driving innovation across industries: early disease detection, personalized treatment plans…",
    status: "published",
    author: "Tech Desk",
    category: "Technology",
    tags: ["#Prime", "#Videos", "#Articles"],
    createdAt: "2025-08-21T12:40:00Z",
    updatedAt: "2025-08-21T15:05:00Z",
    views: 2610,
    comments: 79,
    thumbnail:
      "https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=500&auto=format&fit=crop",
    slug: "ai-technology-effect-on-human-life",
  },
  {
    id: "p3",
    type: "image",
    title: "Local Elections: What You Need To Know",
    summary: "A quick primer on the reforms and the new timeline.",
    status: "draft",
    author: "Politics",
    category: "Politics",
    tags: ["#Live", "#Articles"],
    createdAt: "2025-08-18T09:00:00Z",
    updatedAt: "2025-08-18T11:30:00Z",
    views: 340,
    comments: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=500&auto=format&fit=crop",
    slug: "local-elections-what-you-need-to-know",
  },
  {
    id: "p4",
    type: "video",
    title: "Flood Preparedness: 10 Things You Can Do",
    summary: "Practical tips, verified resources, and municipal hotlines.",
    status: "scheduled",
    author: "City Desk",
    category: "Community",
    tags: ["#Prime", "#Events"],
    createdAt: "2025-08-22T08:00:00Z",
    updatedAt: "2025-08-22T08:00:00Z",
    views: 0,
    comments: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1755720233919-3382ed081bc3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D",
    slug: "flood-preparedness-10-things",
  },
];

/** ---------------- HELPERS ---------------- */
const STATUS_COLOR = {
  published: "success",
  draft: "default",
  scheduled: "warning",
  archived: "secondary",
};
const CATEGORIES = ["All", "Sports", "Technology", "Politics", "Community"];
const fmt = (d) => new Date(d).toLocaleString();

/** ---------------- PAGE ---------------- */
export default function Page() {
  const [rows, setRows] = useState(INITIAL_POSTS);
  const [search, setSearch] = useState("");
  const [typeTab, setTypeTab] = useState("all"); // all | image | video
  const [statusFilter, setStatusFilter] = useState("all"); // all | draft | scheduled | published | archived
  const [category, setCategory] = useState("All");
  const [selectedKeys, setSelectedKeys] = useState(new Set([])); // used in desktop table
  const [cardSelected, setCardSelected] = useState(new Set([])); // used in mobile cards
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const {
    isOpen: confirmOpen,
    onOpen: openConfirm,
    onOpenChange: onConfirmChange,
  } = useDisclosure();
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* Derived data */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      const hitsSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.tags.join(" ").toLowerCase().includes(q);
      const hitsType = typeTab === "all" ? true : r.type === typeTab;
      const hitsStatus = statusFilter === "all" ? true : r.status === statusFilter;
      const hitsCategory = category === "All" ? true : r.category === category;
      return hitsSearch && hitsType && hitsStatus && hitsCategory;
    });
  }, [rows, search, typeTab, statusFilter, category]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  /* Actions */
  const handleDelete = async (id) => {
    try {
      // TODO: await fetch(`/api/posts/${id}`, { method: "DELETE" });
      setRows((prev) => prev.filter((r) => r.id !== id));
      toast.success("Post deleted");
    } catch {
      toast.error("Failed to delete post");
    }
  };

  const handleBulk = async (action, source = "table") => {
    const ids =
      source === "table" ? Array.from(selectedKeys) : Array.from(cardSelected);
    if (!ids.length) {
      toast.warn("No items selected");
      return;
    }
    try {
      if (action === "delete") {
        // TODO: bulk delete
        setRows((prev) => prev.filter((r) => !ids.includes(r.id)));
      } else if (action === "publish" || action === "unpublish") {
        setRows((prev) =>
          prev.map((r) =>
            ids.includes(r.id)
              ? { ...r, status: action === "publish" ? "published" : "draft" }
              : r
          )
        );
      } else if (action === "archive") {
        setRows((prev) =>
          prev.map((r) => (ids.includes(r.id) ? { ...r, status: "archived" } : r))
        );
      }
      toast.success("Action complete");
      setSelectedKeys(new Set([]));
      setCardSelected(new Set([]));
    } catch {
      toast.error("Bulk action failed");
    }
  };

  const exportCSV = () => {
    const columns = [
      "id",
      "type",
      "title",
      "status",
      "author",
      "category",
      "views",
      "comments",
      "createdAt",
      "updatedAt",
    ];
    const csv = [
      columns.join(","),
      ...filtered.map((r) => columns.map((c) => JSON.stringify(r[c] ?? "")).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "posts_export.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.info("CSV exported");
  };

  const toggleCardSelect = (id) => {
    setCardSelected((prev) => {
      const ns = new Set(prev);
      if (ns.has(id)) ns.delete(id);
      else ns.add(id);
      return ns;
    });
  };

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      <DashboardLayout className="mt-5 pr-3">
        <div className="mx-auto w-full  space-y-5">
          {/* ---------- Toolbar (responsive) ---------- */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-center">
            <div className="md:col-span-4">
              <Input
                aria-label="Search posts"
                placeholder="Search by title, tag, category…"
                startContent={<Search size={16} />}
                value={search}
                onValueChange={(v) => {
                  setSearch(v);
                  setPage(1);
                }}
              />
            </div>

            <div className="md:col-span-4 flex items-center gap-2">
              <Tabs
                selectedKey={typeTab}
                onSelectionChange={(k) => {
                  setTypeTab(k);
                  setPage(1);
                }}
                radius="full"
                variant="solid"
                className="w-full"
              >
                <Tab
                  key="all"
                  title={
                    <span className="flex items-center gap-1">
                      <Filter size={14} /> All
                    </span>
                  }
                />
                <Tab
                  key="image"
                  title={
                    <span className="flex items-center gap-1">
                      <ImageIcon size={14} /> Images
                    </span>
                  }
                />
                <Tab
                  key="video"
                  title={
                    <span className="flex items-center gap-1">
                      <PlayCircle size={14} /> Videos
                    </span>
                  }
                />
              </Tabs>
            </div>

            <div className="md:col-span-2">
              <Select
                aria-label="Status"
                selectedKeys={[statusFilter]}
                onSelectionChange={(keys) => {
                  const k = Array.from(keys)[0];
                  setStatusFilter(k);
                  setPage(1);
                }}
              >
                {["all", "draft", "scheduled", "published", "archived"].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s[0].toUpperCase() + s.slice(1)}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="md:col-span-2">
              <Select
                aria-label="Category"
                selectedKeys={[category]}
                onSelectionChange={(keys) => {
                  const k = Array.from(keys)[0];
                  setCategory(k);
                  setPage(1);
                }}
              >
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="md:col-span-12 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {/* Bulk actions (cards/mobile) */}
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="flat" startContent={<MoreHorizontal size={16} />}>
                      Bulk actions
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu onAction={(key) => handleBulk(key, "cards")}>
                    <DropdownItem key="publish">Publish</DropdownItem>
                    <DropdownItem key="unpublish">Unpublish</DropdownItem>
                    <DropdownItem key="archive">Archive</DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger">
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <Button variant="flat" startContent={<Download size={16} />} onPress={exportCSV}>
                  Export CSV
                </Button>
              </div>

              <Button
                as={Link}
                href="/dashboard/posts/create-post"
                color="primary"
                startContent={<Plus size={16} />}
              >
                New Post
              </Button>
            </div>
          </div>

          {/* ---------- Mobile Cards (<= md) ---------- */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {visible.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border bg-white p-3 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-20 w-28 rounded shrink-0 object-cover border"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium leading-tight line-clamp-2">
                        {item.title}
                      </h3>
                      <Checkbox
                        isSelected={cardSelected.has(item.id)}
                        onValueChange={() => toggleCardSelect(item.id)}
                        aria-label="select"
                      />
                    </div>
                    <p className="mt-1 text-sm text-default-500 line-clamp-2">
                      {item.summary}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Chip
                        size="sm"
                        variant="flat"
                        startContent={
                          item.type === "video" ? (
                            <PlayCircle size={14} />
                          ) : (
                            <ImageIcon size={14} />
                          )
                        }
                      >
                        {item.type}
                      </Chip>
                      <Chip size="sm" color={STATUS_COLOR[item.status]} variant="flat">
                        {item.status}
                      </Chip>
                      <span className="text-xs text-default-500">
                        {item.category} • {fmt(item.updatedAt)}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        as={Link}
                        href={`/posts/${item.slug}`}
                        size="sm"
                        variant="flat"
                        startContent={<Eye size={14} />}
                      >
                        Preview
                      </Button>
                      <Button
                        as={Link}
                        href={`/dashboard/posts/${item.id}/edit`}
                        size="sm"
                        variant="flat"
                        startContent={<Pencil size={14} />}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        startContent={<Trash2 size={14} />}
                        onPress={() => {
                          setDeleteTarget(item);
                          openConfirm();
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ---------- Desktop Table (>= md) ---------- */}
          <div className="hidden md:block rounded-xl border bg-white">
            <Table
              aria-label="All posts table"
              removeWrapper
              selectionMode="multiple"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <TableHeader>
                <TableColumn key="title">Post</TableColumn>
                <TableColumn key="type" className="w-[110px]">
                  Type
                </TableColumn>
                <TableColumn key="status" className="w-[120px]">
                  Status
                </TableColumn>
                <TableColumn key="category" className="w-[140px]">
                  Category
                </TableColumn>
                <TableColumn key="views" className="w-[100px] text-right">
                  Views
                </TableColumn>
                <TableColumn key="comments" className="w-[110px] text-right">
                  Comments
                </TableColumn>
                <TableColumn key="updated" className="w-[160px]">
                  Updated
                </TableColumn>
                <TableColumn key="actions" className="w-[160px] text-right">
                  Actions
                </TableColumn>
              </TableHeader>
              <TableBody emptyContent="No posts found" items={visible}>
                {visible.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="h-10 w-14 rounded shrink-0 object-cover border"
                        />
                        <div className="min-w-0">
                          <div className="font-medium leading-tight line-clamp-1">
                            {item.title}
                          </div>
                          <div className="text-xs text-default-500 line-clamp-1">
                            {item.summary}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Chip
                        size="sm"
                        variant="flat"
                        startContent={
                          item.type === "video" ? (
                            <PlayCircle size={14} />
                          ) : (
                            <ImageIcon size={14} />
                          )
                        }
                      >
                        {item.type}
                      </Chip>
                    </TableCell>

                    <TableCell>
                      <Chip
                        size="sm"
                        color={STATUS_COLOR[item.status] || "default"}
                        variant="flat"
                      >
                        {item.status}
                      </Chip>
                    </TableCell>

                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">
                      {item.views.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">{item.comments}</TableCell>
                    <TableCell>
                      <span className="text-xs text-default-500">
                        {fmt(item.updatedAt || item.createdAt)}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          as={Link}
                          href={`/posts/${item.slug}`}
                          size="sm"
                          variant="flat"
                          startContent={<Eye size={14} />}
                        >
                          Preview
                        </Button>
                        <Button
                          as={Link}
                          href={`/dashboard/posts/${item.id}/edit`}
                          size="sm"
                          variant="flat"
                          startContent={<Pencil size={14} />}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          variant="flat"
                          startContent={<Trash2 size={14} />}
                          onPress={() => {
                            setDeleteTarget(item);
                            openConfirm();
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

            {/* Desktop bulk actions bar */}
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
                  <DropdownMenu onAction={(key) => handleBulk(key, "table")}>
                    <DropdownItem key="publish">Publish</DropdownItem>
                    <DropdownItem key="unpublish">Unpublish</DropdownItem>
                    <DropdownItem key="archive">Archive</DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger">
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Button variant="flat" startContent={<Download size={16} />} onPress={exportCSV}>
                  Export CSV
                </Button>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-1 py-3">
            <span className="text-sm text-default-500">
              Showing <b>{filtered.length ? start + 1 : 0}</b>–
              <b>{Math.min(start + pageSize, filtered.length)}</b> of{" "}
              <b>{filtered.length}</b>
            </span>
            <Pagination total={pages} page={page} onChange={setPage} showControls radius="full" />
          </div>
        </div>

        {/* Confirm Delete */}
        <Modal isOpen={confirmOpen} onOpenChange={onConfirmChange} placement="center">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Delete Post</ModalHeader>
                <ModalBody>
                  <p>
                    Are you sure you want to delete{" "}
                    <b>{deleteTarget?.title ?? "this post"}</b>? This action cannot be undone.
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
                      if (deleteTarget) {
                        handleDelete(deleteTarget.id);
                        setDeleteTarget(null);
                      }
                    }}
                    startContent={<Trash2 size={16} />}
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