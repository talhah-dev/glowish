"use client";

import React, { useMemo, useState } from "react";
import DashboardLayout from "../../../DashboardLayout";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  Select,
  SelectItem,
  Switch,
  Chip,
} from "@nextui-org/react";
import { Plus, Trash2 } from "lucide-react";

export default function Page() {
  // ----- core fields
  const [type, setType] = useState("single"); // 'single' | 'multiple'
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [disclaimer, setDisclaimer] = useState("");

  // taxonomy
  const [categories, setCategories] = useState("");
  const [tags, setTags] = useState("");

  // options
  const [options, setOptions] = useState([
    { id: crypto.randomUUID(), label: "" },
    { id: crypto.randomUUID(), label: "" },
  ]);

  // participation & visibility
  const [audience, setAudience] = useState("public"); // 'public' | 'verified'
  const [oneVote, setOneVote] = useState(true);
  const [ipCheck, setIpCheck] = useState(true);
  const [deviceCheck, setDeviceCheck] = useState(true);
  const [resultDisplay, setResultDisplay] = useState("live"); // 'live' | 'after_vote' | 'after_close'

  // scheduling (label outside + readable text classes => fixes overlapping/visibility)
  const [openAt, setOpenAt] = useState("");
  const [closeAt, setCloseAt] = useState("");

  // helpers
  const addOption = () =>
    setOptions((o) => [...o, { id: crypto.randomUUID(), label: "" }]);

  const updateOption = (id, v) =>
    setOptions((o) => o.map((it) => (it.id === id ? { ...it, label: v } : it)));

  const removeOption = (id) =>
    setOptions((o) => (o.length <= 2 ? o : o.filter((it) => it.id !== id)));

  const parsedTags = useMemo(
    () =>
      tags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [tags]
  );
  const parsedCats = useMemo(
    () =>
      categories
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [categories]
  );

  const onSubmit = (intent) => {
    const cats = parsedCats;
    const tg = parsedTags;

    const payload = {
      status: intent === "active" ? "active" : "draft",
      type, // single | multiple
      title,
      summary,
      disclaimer,
      options: options.filter((o) => o.label.trim()),
      audience, // public | verified
      rules: { oneVote, ipCheck, deviceCheck },
      results: { display: resultDisplay }, // live | after_vote | after_close
      schedule: { openAt, closeAt },
      categories: cats,
      tags: tg,
    };

    // simple log only
    console.log("NEW SURVEY ->", payload);
  };

  return (
    <DashboardLayout className="mt-5 pr-3">
      <div className="mx-auto w-full max-w-[1000px] px-4 space-y-6 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">Create Survey</h1>
          <div className="flex items-center gap-2">
            <Button variant="light" onPress={() => onSubmit("draft")}>
              Save Draft
            </Button>
            <Button color="primary" onPress={() => onSubmit("active")}>
              Create & Activate
            </Button>
          </div>
        </div>

        {/* Basics */}
        <Card>
          <CardHeader>
            <div className="font-semibold">Basics</div>
          </CardHeader>
          <CardBody className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Survey Question (Title)"
                labelPlacement="outside"
                placeholder="e.g. Which framework do you prefer?"
                value={title}
                onValueChange={setTitle}
              />
              <Select
                label="Survey Type"
                labelPlacement="outside"
                selectedKeys={[type]}
                onSelectionChange={(keys) => setType(Array.from(keys)[0])}
              >
                <SelectItem key="single">Single choice</SelectItem>
                <SelectItem key="multiple">Multiple choice</SelectItem>
              </Select>
            </div>

            <Textarea
              label="Description"
              labelPlacement="outside"
              placeholder="Short context shown under the question…"
              value={summary}
              onValueChange={setSummary}
              className="w-full"
            />
          </CardBody>
        </Card>

        {/* Options */}
        <Card>
          <CardHeader>
            <div className="font-semibold">Options</div>
          </CardHeader>
          <CardBody className="space-y-4">
            {options.map((opt, idx) => (
              <div key={opt.id} className="grid grid-cols-[1fr_auto] gap-2">
                <Input
                  label={`Option ${idx + 1}`}
                  placeholder={idx === 0 ? "e.g. React" : idx === 1 ? "e.g. Vue" : "Add option"}
                  value={opt.label}
                  onValueChange={(v) => updateOption(opt.id, v)}
                />
                <Button
                  color="danger"
                  variant="flat"
                  isDisabled={options.length <= 2}
                  onPress={() => removeOption(opt.id)}
                  startContent={<Trash2 size={16} />}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button startContent={<Plus size={16} />} onPress={addOption}>
              Add Option
            </Button>
            <p className="text-xs text-default-500">
              Tip: For multiple choice, voters may select more than one option.
            </p>
          </CardBody>
        </Card>

        {/* Participation & Visibility */}
        <Card>
          <CardHeader>
            <div className="font-semibold">Participation & Visibility</div>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Select
                label="Audience"
                labelPlacement="outside"
                selectedKeys={[audience]}
                onSelectionChange={(keys) => setAudience(Array.from(keys)[0])}
              >
                <SelectItem key="public">Public</SelectItem>
                <SelectItem key="verified">Verified only (Politics)</SelectItem>
              </Select>

              <Select
                label="Results visibility"
                labelPlacement="outside"
                selectedKeys={[resultDisplay]}
                onSelectionChange={(keys) => setResultDisplay(Array.from(keys)[0])}
              >
                <SelectItem key="live">Live</SelectItem>
                <SelectItem key="after_vote">After user votes</SelectItem>
                <SelectItem key="after_close">After poll closes</SelectItem>
              </Select>

              <div className="grid grid-cols-1 gap-3">
                <Switch isSelected={oneVote} onValueChange={setOneVote}>
                  1 vote per user
                </Switch>
                <Switch isSelected={ipCheck} onValueChange={setIpCheck}>
                  IP check
                </Switch>
                <Switch isSelected={deviceCheck} onValueChange={setDeviceCheck}>
                  Device check
                </Switch>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Schedule (label outside + readable text colors) */}
        <Card>
          <CardHeader>
            <div className="font-semibold">Schedule</div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                type="datetime-local"
                label="Open date/time"
                labelPlacement="outside"
                value={openAt}
                onChange={(e) => setOpenAt(e.target.value)}
                classNames={{
                  inputWrapper: "bg-white", // ensure clear bg
                  input:
                    "text-default-800 placeholder:text-default-400", // readable text
                }}
              />
              <Input
                type="datetime-local"
                label="Close date/time"
                labelPlacement="outside"
                value={closeAt}
                onChange={(e) => setCloseAt(e.target.value)}
                classNames={{
                  inputWrapper: "bg-white",
                  input: "text-default-800 placeholder:text-default-400",
                }}
              />
            </div>
          </CardBody>
        </Card>

        {/* Tags & Categories & Disclaimer */}
        <Card>
          <CardHeader>
            <div className="font-semibold">Tags & Categories</div>
          </CardHeader>
          <CardBody className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Categories (comma separated)"
                labelPlacement="outside"
                placeholder="e.g. #Current, #Politics"
                value={categories}
                onValueChange={setCategories}
              />
              <Input
                label="Tags (comma separated)"
                labelPlacement="outside"
                placeholder="e.g. #Sports, #Events"
                value={tags}
                onValueChange={setTags}
              />
            </div>

            {(parsedCats.length > 0 || parsedTags.length > 0) && (
              <div className="flex flex-wrap gap-2">
                {[...parsedCats, ...parsedTags].map((t) => (
                  <Chip key={t} size="sm" variant="flat">
                    {t}
                  </Chip>
                ))}
              </div>
            )}

            <Textarea
              label="Disclaimer (optional)"
              labelPlacement="outside"
              placeholder="Add disclaimer or methodology note…"
              value={disclaimer}
              onValueChange={setDisclaimer}
            />
          </CardBody>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="light" onPress={() => onSubmit("draft")}>
            Save Draft
          </Button>
          <Button color="primary" onPress={() => onSubmit("active")}>
            Create & Activate
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
