"use client";

import React, { useMemo, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  Switch,
  Tabs,
  Tab,
  Select,
  SelectItem,
  Divider,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Settings as SettingsIcon,
  Globe,
  SearchIcon as SearchLg,
  Bell,
  Shield,
  MessageSquare,
  CreditCard,
  Server,
} from "lucide-react";

export default function Page() {
  /* ========== General ========== */
  const [siteName, setSiteName] = useState("Newsroom");
  const [siteTagline, setSiteTagline] = useState("Fast, fair, and verified.");
  const [canonicalBase, setCanonicalBase] = useState("https://example.com");
  const [logoFile, setLogoFile] = useState(null);
  const [ogFile, setOgFile] = useState(null);

  const logoUrl = useMemo(
    () => (logoFile ? URL.createObjectURL(logoFile) : null),
    [logoFile]
  );
  const ogUrl = useMemo(() => (ogFile ? URL.createObjectURL(ogFile) : null), [ogFile]);

  /* ========== SEO ========== */
  const [metaTitle, setMetaTitle] = useState("Latest news and live polls");
  const [metaDesc, setMetaDesc] = useState(
    "Read trusted reporting, vote in live polls, and follow verified analysis."
  );
  const [robotsIndex, setRobotsIndex] = useState(true);
  const [sitemapOn, setSitemapOn] = useState(true);

  /* ========== Notifications ========== */
  const [emailProvider, setEmailProvider] = useState("sendgrid"); // sendgrid | postmark
  const [emailFrom, setEmailFrom] = useState("news@example.com");
  const [pushEnabled, setPushEnabled] = useState(true);

  /* ========== Security ========== */
  const [require2FA, setRequire2FA] = useState(true);
  const [sessionMins, setSessionMins] = useState(60);
  const [allowlistOn, setAllowlistOn] = useState(false);
  const [ipAllowlist, setIpAllowlist] = useState("127.0.0.1\n192.168.0.0/24");

  /* ========== Content & Moderation ========== */
  const [commentsDefault, setCommentsDefault] = useState(true);
  const [linkLimit, setLinkLimit] = useState(2);
  const [rateLimitPerMin, setRateLimitPerMin] = useState(20);
  const [wordBlacklist, setWordBlacklist] = useState("badword1\nbadword2");
  const [aiToxicity, setAiToxicity] = useState(true);
  const [aiSpam, setAiSpam] = useState(true);
  const [aiHate, setAiHate] = useState(true);

  /* ========== Payments ========== */
  const [stripeOn, setStripeOn] = useState(true);
  const [paypalOn, setPaypalOn] = useState(false);
  const [stripePub, setStripePub] = useState("");
  const [stripeSecret, setStripeSecret] = useState("");
  const [stripeWebhook, setStripeWebhook] = useState("");
  const [paypalClient, setPaypalClient] = useState("");

  /* ========== System ========== */
  const [environment, setEnvironment] = useState("production"); // staging | production
  const [maintenance, setMaintenance] = useState(false);
  const [maintMsg, setMaintMsg] = useState(
    "We’re doing scheduled maintenance. Back soon!"
  );

  const commonInputFix = {
    inputWrapper: "bg-white",
    input: "text-default-800 placeholder:text-default-400",
  };

  const handleSave = (section, payload) => {
    console.log(`SETTINGS SAVE [${section}] ->`, payload);
    toast.success(`${section} saved`);
  };

  const saveAll = () => {
    const payload = {
      general: {
        siteName,
        siteTagline,
        canonicalBase,
        logoFile,
        ogFile,
      },
      seo: { metaTitle, metaDesc, robotsIndex, sitemapOn },
      notifications: {
        emailProvider,
        emailFrom,
        pushEnabled,
      },
      security: { require2FA, sessionMins, allowlistOn, ipAllowlist },
      content: {
        commentsDefault,
        linkLimit,
        rateLimitPerMin,
        wordBlacklist,
        aiToxicity,
        aiSpam,
        aiHate,
      },
      payments: {
        stripeOn,
        paypalOn,
        stripePub: stripePub ? "***provided***" : "",
        stripeSecret: stripeSecret ? "***provided***" : "",
        stripeWebhook: stripeWebhook ? "***provided***" : "",
        paypalClient: paypalClient ? "***provided***" : "",
      },
      system: { environment, maintenance, maintMsg },
    };
    console.log("SETTINGS SAVE [ALL] ->", payload);
    toast.success("All settings saved");
  };

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />
      <DashboardLayout className="mt-5 pr-3">
        <div className="mx-auto w-full max-w-[1100px] px-4 pb-12">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              <h1 className="text-2xl font-semibold">Admin Settings</h1>
            </div>
            <Button color="primary" onPress={saveAll}>
              Save All
            </Button>
          </div>

          <Tabs aria-label="Settings Tabs" radius="full" variant="solid" className="w-full">
            {/* ========== General ========== */}
            <Tab
              key="general"
              title={
                <span className="flex items-center gap-1">
                  <Globe size={16} /> General
                </span>
              }
            >
              <Card className="mt-3">
                <CardHeader>Site & Branding</CardHeader>
                <CardBody className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input
                      label="Site name"
                      labelPlacement="outside"
                      value={siteName}
                      onValueChange={setSiteName}
                      classNames={commonInputFix}
                    />
                    <Input
                      label="Tagline"
                      labelPlacement="outside"
                      value={siteTagline}
                      onValueChange={setSiteTagline}
                      classNames={commonInputFix}
                    />
                    <Input
                      label="Canonical base URL"
                      labelPlacement="outside"
                      value={canonicalBase}
                      onValueChange={setCanonicalBase}
                      classNames={commonInputFix}
                    />
                  </div>

                  <Divider />

                  {/* Logo & OG only (language/color/theme removed) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-default-700 mb-2">
                        Logo (PNG/SVG)
                      </label>
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 hover:bg-default-50">
                        <span>Choose file</span>
                        <input
                          type="file"
                          accept="image/*,image/svg+xml"
                          className="hidden"
                          onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                        />
                      </label>
                      {logoUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={logoUrl}
                          alt="Logo preview"
                          className="mt-2 h-12 object-contain"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-default-700 mb-2">
                        Default OG image
                      </label>
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 hover:bg-default-50">
                        <span>Choose file</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => setOgFile(e.target.files?.[0] || null)}
                        />
                      </label>
                      {ogUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={ogUrl}
                          alt="OG preview"
                          className="mt-2 h-20 w-36 rounded-md object-cover"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onPress={() =>
                        handleSave("General", {
                          siteName,
                          siteTagline,
                          canonicalBase,
                          hasLogo: !!logoFile,
                          hasOG: !!ogFile,
                        })
                      }
                    >
                      Save General
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Tab>

            {/* ========== SEO ========== */}
            <Tab
              key="seo"
              title={
                <span className="flex items-center gap-1">
                  <SearchLg size={16} /> SEO
                </span>
              }
            >
              <Card className="mt-3">
                <CardHeader>SEO Defaults</CardHeader>
                <CardBody className="space-y-5">
                  <Input
                    label="Default meta title"
                    labelPlacement="outside"
                    value={metaTitle}
                    onValueChange={setMetaTitle}
                    classNames={commonInputFix}
                  />
                  <Textarea
                    label="Default meta description"
                    labelPlacement="outside"
                    value={metaDesc}
                    onValueChange={setMetaDesc}
                    classNames={{
                      inputWrapper: "bg-white",
                      input:
                        "text-default-800 placeholder:text-default-400 min-h-[80px]",
                    }}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Switch isSelected={robotsIndex} onValueChange={setRobotsIndex}>
                      Allow indexing (robots.txt)
                    </Switch>
                    <Switch isSelected={sitemapOn} onValueChange={setSitemapOn}>
                      Enable sitemap.xml
                    </Switch>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onPress={() =>
                        handleSave("SEO", {
                          metaTitle,
                          metaDesc,
                          robotsIndex,
                          sitemapOn,
                        })
                      }
                    >
                      Save SEO
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Tab>

            {/* ========== Notifications (API/Firebase removed) ========== */}
            <Tab
              key="notifications"
              title={
                <span className="flex items-center gap-1">
                  <Bell size={16} /> Notifications
                </span>
              }
            >
              <Card className="mt-3">
                <CardHeader>Email & Push</CardHeader>
                <CardBody className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Select
                      label="Email provider"
                      labelPlacement="outside"
                      selectedKeys={[emailProvider]}
                      onSelectionChange={(k) => setEmailProvider(Array.from(k)[0])}
                    >
                      <SelectItem key="sendgrid">SendGrid</SelectItem>
                      <SelectItem key="postmark">Postmark</SelectItem>
                    </Select>
                    <Input
                      label="From email"
                      labelPlacement="outside"
                      value={emailFrom}
                      onValueChange={setEmailFrom}
                      classNames={commonInputFix}
                    />
                  </div>

                  <Divider />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Switch isSelected={pushEnabled} onValueChange={setPushEnabled}>
                      Enable web push
                    </Switch>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onPress={() =>
                        handleSave("Notifications", {
                          emailProvider,
                          emailFrom,
                          pushEnabled,
                        })
                      }
                    >
                      Save Notifications
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Tab>

            {/* ========== Security ========== */}
            <Tab
              key="security"
              title={
                <span className="flex items-center gap-1">
                  <Shield size={16} /> Security
                </span>
              }
            >
              <Card className="mt-3">
                <CardHeader>Account & Access</CardHeader>
                <CardBody className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Switch isSelected={require2FA} onValueChange={setRequire2FA}>
                      Require 2FA for staff
                    </Switch>
                    <Input
                      type="number"
                      label="Session timeout (minutes)"
                      labelPlacement="outside"
                      value={String(sessionMins)}
                      onValueChange={(v) => setSessionMins(Number(v || 0))}
                      classNames={commonInputFix}
                    />
                    <Switch isSelected={allowlistOn} onValueChange={setAllowlistOn}>
                      Enable IP allowlist
                    </Switch>
                  </div>
                  <Textarea
                    label="Allowed IPs / CIDRs (one per line)"
                    labelPlacement="outside"
                    value={ipAllowlist}
                    onValueChange={setIpAllowlist}
                    classNames={{
                      inputWrapper: "bg-white",
                      input:
                        "text-default-800 placeholder:text-default-400 min-h-[120px]",
                    }}
                  />
                  <div className="flex justify-end">
                    <Button
                      onPress={() =>
                        handleSave("Security", {
                          require2FA,
                          sessionMins,
                          allowlistOn,
                          ipAllowlist,
                        })
                      }
                    >
                      Save Security
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Tab>

            {/* ========== Content ========== */}
            <Tab
              key="content"
              title={
                <span className="flex items-center gap-1">
                  <MessageSquare size={16} /> Content
                </span>
              }
            >
              <Card className="mt-3">
                <CardHeader>Comments & Moderation</CardHeader>
                <CardBody className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Switch
                      isSelected={commentsDefault}
                      onValueChange={setCommentsDefault}
                    >
                      Comments enabled by default
                    </Switch>
                    <Input
                      type="number"
                      label="Max links per comment"
                      labelPlacement="outside"
                      value={String(linkLimit)}
                      onValueChange={(v) => setLinkLimit(Number(v || 0))}
                      classNames={commonInputFix}
                    />
                    <Input
                      type="number"
                      label="Rate limit (actions/min)"
                      labelPlacement="outside"
                      value={String(rateLimitPerMin)}
                      onValueChange={(v) => setRateLimitPerMin(Number(v || 0))}
                      classNames={commonInputFix}
                    />
                  </div>

                  <Textarea
                    label="Word blacklist (one per line)"
                    labelPlacement="outside"
                    value={wordBlacklist}
                    onValueChange={setWordBlacklist}
                    classNames={{
                      inputWrapper: "bg-white",
                      input:
                        "text-default-800 placeholder:text-default-400 min-h-[120px]",
                    }}
                  />

                  <div className="flex flex-wrap gap-4">
                    <Switch isSelected={aiToxicity} onValueChange={setAiToxicity}>
                      AI toxicity filter
                    </Switch>
                    <Switch isSelected={aiSpam} onValueChange={setAiSpam}>
                      AI spam filter
                    </Switch>
                    <Switch isSelected={aiHate} onValueChange={setAiHate}>
                      AI hate-speech filter
                    </Switch>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onPress={() =>
                        handleSave("Content", {
                          commentsDefault,
                          linkLimit,
                          rateLimitPerMin,
                          wordBlacklist,
                          aiToxicity,
                          aiSpam,
                          aiHate,
                        })
                      }
                    >
                      Save Content
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Tab>

            {/* ========== Payments ========== */}
            <Tab
              key="payments"
              title={
                <span className="flex items-center gap-1">
                  <CreditCard size={16} /> Payments
                </span>
              }
            >
              <Card className="mt-3">
                <CardHeader>Stripe & PayPal</CardHeader>
                <CardBody className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Switch isSelected={stripeOn} onValueChange={setStripeOn}>
                      Enable Stripe
                    </Switch>
                    <Switch isSelected={paypalOn} onValueChange={setPaypalOn}>
                      Enable PayPal
                    </Switch>
                    <div />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input
                      label="Stripe public key"
                      labelPlacement="outside"
                      placeholder="pk_live_..."
                      value={stripePub}
                      onValueChange={setStripePub}
                      classNames={commonInputFix}
                    />
                    <Input
                      label="Stripe secret key"
                      labelPlacement="outside"
                      placeholder="••••••••"
                      type="password"
                      value={stripeSecret}
                      onValueChange={setStripeSecret}
                      classNames={commonInputFix}
                    />
                    <Input
                      label="Stripe webhook secret"
                      labelPlacement="outside"
                      placeholder="••••••••"
                      type="password"
                      value={stripeWebhook}
                      onValueChange={setStripeWebhook}
                      classNames={commonInputFix}
                    />
                    <Input
                      label="PayPal Client ID"
                      labelPlacement="outside"
                      placeholder="Abc123..."
                      value={paypalClient}
                      onValueChange={setPaypalClient}
                      classNames={commonInputFix}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onPress={() =>
                        handleSave("Payments", {
                          stripeOn,
                          paypalOn,
                          stripePub: stripePub ? "***provided***" : "",
                          stripeSecret: stripeSecret ? "***provided***" : "",
                          stripeWebhook: stripeWebhook ? "***provided***" : "",
                          paypalClient: paypalClient ? "***provided***" : "",
                        })
                      }
                    >
                      Save Payments
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Tab>

            {/* ========== System ========== */}
            <Tab
              key="system"
              title={
                <span className="flex items-center gap-1">
                  <Server size={16} /> System
                </span>
              }
            >
              <Card className="mt-3">
                <CardHeader>Environment & Maintenance</CardHeader>
                <CardBody className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Select
                      label="Environment"
                      labelPlacement="outside"
                      selectedKeys={[environment]}
                      onSelectionChange={(k) => setEnvironment(Array.from(k)[0])}
                    >
                      <SelectItem key="staging">Staging</SelectItem>
                      <SelectItem key="production">Production</SelectItem>
                    </Select>
                    <Switch isSelected={maintenance} onValueChange={setMaintenance}>
                      Maintenance mode
                    </Switch>
                  </div>

                  <Textarea
                    label="Maintenance message"
                    labelPlacement="outside"
                    value={maintMsg}
                    onValueChange={setMaintMsg}
                    classNames={{
                      inputWrapper: "bg-white",
                      input:
                        "text-default-800 placeholder:text-default-400 min-h-[80px]",
                    }}
                  />

                  <div className="flex justify-end">
                    <Button
                      onPress={() =>
                        handleSave("System", {
                          environment,
                          maintenance,
                          maintMsg,
                        })
                      }
                    >
                      Save System
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>

          {/* Footer Save All */}
          <div className="mt-6 flex justify-end">
            <Button color="primary" onPress={saveAll}>
              Save All
            </Button>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}