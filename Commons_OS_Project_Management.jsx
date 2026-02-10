import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Users, Boxes, CalendarClock, DollarSign, ShieldAlert,
  RotateCw, ChevronRight, ChevronDown, ChevronLeft, Bell, Search, Settings,
  Plus, MoreHorizontal, Clock, Target, TrendingUp, AlertTriangle, CheckCircle2,
  Circle, ArrowRight, Sparkles, MessageSquare, Eye, EyeOff, Zap, Brain,
  BarChart3, PieChart, Activity, Layers, FileText, Milestone, GitBranch,
  UserCheck, Briefcase, Calendar, Timer, Shield, BookOpen, Lightbulb,
  ArrowUpRight, Filter, Maximize2, Minimize2, X, Send, Bot, RefreshCw,
  ChevronUp, Hash, Gauge, Package, ClipboardList, MapPin, Star, Flag
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   COMMONS OS — Project Management Canvas
   High-fidelity prototype for the "Commons" space
   ───────────────────────────────────────────────────────── */

// ── Colour tokens ──
const C = {
  bg: "#F7F6F3",
  surface: "#FFFFFF",
  surfaceHover: "#FAFAF8",
  border: "#E8E6E1",
  borderLight: "#F0EEEA",
  navy: "#1B2038",
  navyLight: "#252A45",
  navyMid: "#2F3555",
  accent: "#D4A853",
  accentLight: "#F5EDD8",
  accentDark: "#B8922E",
  teal: "#2A9D8F",
  tealLight: "#E6F5F3",
  coral: "#E76F51",
  coralLight: "#FDF0EC",
  indigo: "#6366F1",
  indigoLight: "#EEF0FE",
  purple: "#8B5CF6",
  purpleLight: "#F3EEFE",
  text: "#1A1A1A",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  green: "#059669",
  greenLight: "#ECFDF5",
  amber: "#D97706",
  amberLight: "#FFFBEB",
  red: "#DC2626",
  redLight: "#FEF2F2",
};

// ── Mock Data ──
const MOCK_PROJECT = {
  name: "Allwyn — Growth Strategy Reorientation",
  client: "Allwyn",
  status: "Design With",
  phase: "Strategic Liberation",
  startDate: "2026-01-13",
  endDate: "2026-06-30",
  daysRemaining: 141,
  progress: 34,
  tribe: "Tribe Alpha",
  managingPartner: "NB",
  health: "on-track",
};

const MOCK_SQUAD = [
  { id: 1, name: "Sarah Chen", role: "Strategy Partner", initials: "SC", capacity: 78, allocated: 65, skills: ["Strategic Planning", "Commercial Modelling", "Client Management"], color: C.indigo },
  { id: 2, name: "James Okafor", role: "Strategy Associate", initials: "JO", capacity: 85, allocated: 82, skills: ["Data Analysis", "Market Research", "Pattern Delivery"], color: C.teal },
  { id: 3, name: "Maya Patel", role: "Strategy Associate", initials: "MP", capacity: 85, allocated: 58, skills: ["Customer Research", "Synthesis", "Narrative Design"], color: C.purple },
  { id: 4, name: "Tom Aldridge", role: "Strategy Associate", initials: "TA", capacity: 85, allocated: 71, skills: ["Commercial Analysis", "Financial Modelling", "Reporting"], color: C.coral },
];

const MOCK_PATTERNS = [
  { id: 1, name: "Market Opportunity Sizing", hours: 16, effort: 12, status: "in-progress", owner: "JO", phase: "Problem Pursuit", product: "Outcome Gap" },
  { id: 2, name: "Competitive Landscape Mapping", hours: 12, effort: 4, status: "in-progress", owner: "MP", phase: "Problem Pursuit", product: "Strategic Reality" },
  { id: 3, name: "Customer Behaviour Analysis", hours: 24, effort: 0, status: "upcoming", owner: "MP", phase: "Problem Pursuit", product: "Problem Definition" },
  { id: 4, name: "Commercial Model Build", hours: 32, effort: 0, status: "upcoming", owner: "TA", phase: "Strategic Liberation", product: "Strategic Validation" },
  { id: 5, name: "Strategic Options Framework", hours: 16, effort: 0, status: "upcoming", owner: "SC", phase: "Strategic Liberation", product: "Strategic Choices" },
  { id: 6, name: "Investment Case Development", hours: 24, effort: 0, status: "planned", owner: "TA", phase: "Strategic Liberation", product: "Strategic Readiness" },
  { id: 7, name: "Capability Gap Assessment", hours: 12, effort: 0, status: "planned", owner: "JO", phase: "Relentless Application", product: "Capability Investment" },
  { id: 8, name: "Implementation Sequencing", hours: 40, effort: 0, status: "planned", owner: "SC", phase: "Relentless Application", product: "Strategic Implementation" },
];

const MOCK_MILESTONES = [
  { id: 1, name: "Fact Pack Complete", date: "2026-02-07", status: "completed", phase: "Problem Pursuit" },
  { id: 2, name: "Outcome Gap Presentation", date: "2026-02-21", status: "in-progress", phase: "Problem Pursuit" },
  { id: 3, name: "Strategic Reality Sign-off", date: "2026-03-13", status: "upcoming", phase: "Problem Pursuit" },
  { id: 4, name: "Problem Definition Workshop", date: "2026-03-27", status: "upcoming", phase: "Problem Pursuit" },
  { id: 5, name: "Strategic Choices Alignment", date: "2026-04-17", status: "upcoming", phase: "Strategic Liberation" },
  { id: 6, name: "Commercial Model Review", date: "2026-05-08", status: "planned", phase: "Strategic Liberation" },
  { id: 7, name: "Strategic Readiness Delivery", date: "2026-05-29", status: "planned", phase: "Strategic Liberation" },
  { id: 8, name: "Implementation Plan Sign-off", date: "2026-06-26", status: "planned", phase: "Relentless Application" },
];

const MOCK_RISKS = [
  { id: 1, title: "Client data access delays", impact: "high", likelihood: "medium", status: "mitigating", owner: "SC", mitigation: "Parallel workstream using public data while awaiting access" },
  { id: 2, title: "Key stakeholder availability", impact: "medium", likelihood: "high", status: "monitoring", owner: "SC", mitigation: "Scheduled standing sessions; async input protocol agreed" },
  { id: 3, title: "Scope creep from adjacent teams", impact: "medium", likelihood: "medium", status: "monitoring", owner: "SC", mitigation: "Clear scope boundary in charter; change request process" },
  { id: 4, title: "Resource conflict with LBG engagement", impact: "high", likelihood: "low", status: "identified", owner: "NB", mitigation: "Capacity flagged; contingency freelance resource identified" },
];

const MOCK_RITUALS = [
  { name: "Squad Stand-up", cadence: "Daily", time: "09:15", day: "Mon–Fri", owner: "SC", next: "Tomorrow" },
  { name: "Work Design Review", cadence: "Weekly", time: "10:00", day: "Monday", owner: "SC", next: "Today" },
  { name: "QA Review", cadence: "Weekly", time: "14:00", day: "Wednesday", owner: "SC", next: "Wed" },
  { name: "Capacity & Allocation", cadence: "Weekly", time: "11:00", day: "Thursday", owner: "SC", next: "Thu" },
  { name: "Client Check-in", cadence: "Fortnightly", time: "15:00", day: "Friday", owner: "SC", next: "21 Feb" },
  { name: "QBR All-Hands", cadence: "Quarterly", time: "09:00", day: "—", owner: "NB", next: "31 Mar" },
];

const MOCK_COMMERCIAL = {
  budget: 285000,
  spent: 72400,
  forecast: 268000,
  margin: { target: 42, current: 44, trend: "up" },
  burnRate: { planned: 1850, actual: 1720 },
  billableHours: { planned: 840, logged: 196, remaining: 644 },
};

const MOCK_AGENT_SUGGESTIONS = [
  { id: 1, type: "capacity", agent: "Resource Optimizer", message: "James Okafor is at 82% allocation — approaching the 85% cap. Consider redistributing the Customer Behaviour Analysis pattern.", priority: "warning", time: "12 min ago" },
  { id: 2, type: "risk", agent: "Risk Guardian", message: "Client data access request submitted 8 days ago with no response. Recommend escalation to Managing Partner.", priority: "alert", time: "1 hr ago" },
  { id: 3, type: "commercial", agent: "Commercial Analyst", message: "Current burn rate is 7% below forecast — margin tracking 2pts above target. Opportunity to reinvest in deeper customer research.", priority: "insight", time: "3 hrs ago" },
];

// ── Navigation Items ──
const NAV_SECTIONS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "charter", label: "Project Charter", icon: FileText },
  { id: "squad", label: "Squad & Resources", icon: Users },
  { id: "workdesign", label: "Work Design", icon: Boxes },
  { id: "delivery", label: "Delivery Plan", icon: CalendarClock },
  { id: "commercial", label: "Commercial", icon: DollarSign },
  { id: "risk", label: "Risk & Quality", icon: ShieldAlert },
  { id: "rituals", label: "Rituals & Cadence", icon: RotateCw },
];

const SPACES = [
  { id: "commons", label: "Commons", active: true },
  { id: "problem", label: "Problem Pursuit", active: false },
  { id: "strategic", label: "Strategic Liberation", active: false },
  { id: "relentless", label: "Relentless Application", active: false },
  { id: "client", label: "Client Success", active: false },
];

// ── Utility Components ──
const Badge = ({ children, color = C.navy, bg = C.borderLight }) => (
  <span style={{ background: bg, color, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 999, letterSpacing: 0.3, whiteSpace: "nowrap" }}>
    {children}
  </span>
);

const StatusDot = ({ status }) => {
  const colors = {
    "completed": C.green, "in-progress": C.indigo, "upcoming": C.amber,
    "planned": C.textMuted, "on-track": C.green, "at-risk": C.amber,
    "blocked": C.red, "mitigating": C.amber, "monitoring": C.teal,
    "identified": C.textMuted, "high": C.red, "medium": C.amber, "low": C.green,
  };
  return <span style={{ width: 8, height: 8, borderRadius: "50%", background: colors[status] || C.textMuted, display: "inline-block", flexShrink: 0 }} />;
};

const ProgressBar = ({ value, max = 100, color = C.indigo, height = 6, showLabel = false }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
    <div style={{ flex: 1, height, background: C.borderLight, borderRadius: height, overflow: "hidden" }}>
      <div style={{ width: `${Math.min((value / max) * 100, 100)}%`, height: "100%", background: color, borderRadius: height, transition: "width 0.6s ease" }} />
    </div>
    {showLabel && <span style={{ fontSize: 12, color: C.textSecondary, fontWeight: 500, minWidth: 36 }}>{Math.round((value / max) * 100)}%</span>}
  </div>
);

const Avatar = ({ initials, color = C.indigo, size = 32 }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: color + "18", color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, fontWeight: 700, flexShrink: 0, letterSpacing: 0.5 }}>
    {initials}
  </div>
);

const Card = ({ children, style = {}, onClick, hover = false }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.surface, border: `1px solid ${hovered && hover ? C.accent : C.border}`,
        borderRadius: 12, padding: 20, transition: "all 0.2s ease",
        cursor: onClick ? "pointer" : "default",
        boxShadow: hovered && hover ? `0 2px 12px ${C.accent}15` : "0 1px 3px rgba(0,0,0,0.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const SectionHeader = ({ icon: Icon, title, subtitle, action }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {Icon && <div style={{ width: 36, height: 36, borderRadius: 10, background: C.accent + "15", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={18} color={C.accent} /></div>}
      <div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 13, color: C.textSecondary, margin: 0, marginTop: 2 }}>{subtitle}</p>}
      </div>
    </div>
    {action}
  </div>
);

const MetricTile = ({ label, value, sub, icon: Icon, color = C.indigo, trend }) => (
  <Card style={{ padding: 16 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <p style={{ fontSize: 12, color: C.textSecondary, margin: 0, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</p>
        <p style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: "6px 0 0" }}>{value}</p>
        {sub && <p style={{ fontSize: 12, color: C.textSecondary, margin: "4px 0 0" }}>{sub}</p>}
      </div>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: color + "12", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={20} color={color} />
      </div>
    </div>
    {trend && (
      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 4 }}>
        <TrendingUp size={14} color={trend === "up" ? C.green : C.red} style={{ transform: trend === "down" ? "scaleY(-1)" : "none" }} />
        <span style={{ fontSize: 12, color: trend === "up" ? C.green : C.red, fontWeight: 600 }}>{trend === "up" ? "On track" : "Below target"}</span>
      </div>
    )}
  </Card>
);

// ── Phase Indicator ──
const PhaseTracker = () => {
  const phases = [
    { name: "Problem Pursuit", sub: "Understand", progress: 45, active: true },
    { name: "Strategic Liberation", sub: "Liberate", progress: 0, active: false },
    { name: "Relentless Application", sub: "Apply", progress: 0, active: false },
  ];
  return (
    <div style={{ display: "flex", gap: 2, width: "100%" }}>
      {phases.map((p, i) => (
        <div key={i} style={{ flex: 1, position: "relative" }}>
          <div style={{ padding: "10px 14px", background: p.active ? C.accent + "12" : C.borderLight, borderRadius: i === 0 ? "8px 0 0 8px" : i === 2 ? "0 8px 8px 0" : 0, border: p.active ? `1px solid ${C.accent}30` : `1px solid ${C.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: p.active ? C.accent : C.textMuted, margin: 0 }}>{p.name}</p>
                <p style={{ fontSize: 11, color: C.textSecondary, margin: 0 }}>{p.sub}</p>
              </div>
              {p.active && <span style={{ fontSize: 11, fontWeight: 700, color: C.accent }}>{p.progress}%</span>}
            </div>
            {p.active && (
              <div style={{ marginTop: 6, height: 3, background: C.accent + "25", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${p.progress}%`, height: "100%", background: C.accent, borderRadius: 3 }} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// SECTION VIEWS
// ══════════════════════════════════════════════════════════

// ── Overview Section ──
const OverviewSection = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    {/* Project Header */}
    <Card style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: 0 }}>{MOCK_PROJECT.name}</h1>
            <Badge color={C.green} bg={C.greenLight}>On Track</Badge>
          </div>
          <p style={{ fontSize: 14, color: C.textSecondary, margin: 0 }}>
            {MOCK_PROJECT.tribe} · SP: Sarah Chen · MP: {MOCK_PROJECT.managingPartner} · {MOCK_PROJECT.daysRemaining} days remaining
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {MOCK_SQUAD.map(m => <Avatar key={m.id} initials={m.initials} color={m.color} size={34} />)}
        </div>
      </div>
      <PhaseTracker />
    </Card>

    {/* Key Metrics */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
      <MetricTile label="Overall Progress" value={`${MOCK_PROJECT.progress}%`} sub="of delivery plan" icon={Target} color={C.indigo} trend="up" />
      <MetricTile label="Active Patterns" value="2 / 8" sub="16 of 176 hrs completed" icon={Boxes} color={C.teal} />
      <MetricTile label="Squad Capacity" value="69%" sub="avg. across 4 members" icon={Users} color={C.purple} />
      <MetricTile label="Margin" value={`${MOCK_COMMERCIAL.margin.current}%`} sub={`Target: ${MOCK_COMMERCIAL.margin.target}%`} icon={DollarSign} color={C.green} trend="up" />
    </div>

    {/* Two-Column Layout */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {/* Upcoming Milestones */}
      <Card>
        <SectionHeader icon={Milestone} title="Upcoming Milestones" subtitle="Next 30 days" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {MOCK_MILESTONES.filter(m => m.status !== "completed" && m.status !== "planned").slice(0, 4).map(m => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: C.bg, borderRadius: 8 }}>
              <StatusDot status={m.status} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: 0 }}>{m.name}</p>
                <p style={{ fontSize: 12, color: C.textSecondary, margin: 0 }}>{m.phase}</p>
              </div>
              <span style={{ fontSize: 12, color: C.textSecondary, fontWeight: 500 }}>{new Date(m.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Active Risks */}
      <Card>
        <SectionHeader icon={ShieldAlert} title="Risk Register" subtitle={`${MOCK_RISKS.length} active risks`} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {MOCK_RISKS.slice(0, 3).map(r => (
            <div key={r.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 12px", background: C.bg, borderRadius: 8 }}>
              <div style={{ marginTop: 2 }}><StatusDot status={r.impact} /></div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: 0 }}>{r.title}</p>
                <p style={{ fontSize: 12, color: C.textSecondary, margin: "2px 0 0", lineHeight: 1.4 }}>{r.mitigation}</p>
              </div>
              <Badge color={r.status === "mitigating" ? C.amber : C.teal} bg={r.status === "mitigating" ? C.amberLight : C.tealLight}>{r.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>

    {/* Pattern Progress */}
    <Card>
      <SectionHeader icon={Boxes} title="Work Packages (Patterns)" subtitle="8-80hr packages across value pathways" action={<Badge color={C.indigo} bg={C.indigoLight}>8 patterns</Badge>} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {MOCK_PATTERNS.map(p => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", background: C.bg, borderRadius: 8, border: `1px solid ${C.borderLight}` }}>
            <StatusDot status={p.status} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: 0 }}>{p.name}</p>
                <Badge color={C.textSecondary} bg={C.borderLight}>{p.phase.split(" ")[0]}</Badge>
              </div>
              <p style={{ fontSize: 12, color: C.textSecondary, margin: "2px 0 0" }}>{p.product} · {p.hours}hrs</p>
            </div>
            <div style={{ width: 120 }}>
              <ProgressBar value={p.effort} max={p.hours} color={p.status === "in-progress" ? C.indigo : C.borderLight} height={5} />
            </div>
            <span style={{ fontSize: 12, color: C.textSecondary, fontWeight: 500, minWidth: 60, textAlign: "right" }}>{p.effort}/{p.hours} hrs</span>
            <Avatar initials={p.owner} color={MOCK_SQUAD.find(s => s.initials === p.owner)?.color || C.textMuted} size={28} />
          </div>
        ))}
      </div>
    </Card>

    {/* Today's Rituals */}
    <Card>
      <SectionHeader icon={RotateCw} title="Rituals & Cadence" subtitle="Non-negotiable operating rhythms" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {MOCK_RITUALS.map((r, i) => (
          <div key={i} style={{ padding: "12px 14px", background: r.next === "Today" ? C.accentLight : C.bg, borderRadius: 8, border: `1px solid ${r.next === "Today" ? C.accent + "40" : C.borderLight}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: 0 }}>{r.name}</p>
              {r.next === "Today" && <Badge color={C.accentDark} bg={C.accent + "25"}>Today</Badge>}
            </div>
            <p style={{ fontSize: 12, color: C.textSecondary, margin: 0 }}>{r.cadence} · {r.day} {r.time}</p>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// ── Project Charter Section ──
const CharterSection = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    <SectionHeader icon={FileText} title="Project Charter" subtitle="The single source of truth for scope, goals and governance" action={
      <div style={{ display: "flex", gap: 8 }}>
        <Badge color={C.green} bg={C.greenLight}>Approved</Badge>
        <button style={{ padding: "6px 14px", background: C.navy, color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Export</button>
      </div>
    } />

    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Project Context */}
        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 12px" }}>Project Context & Scope</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Client", value: "Allwyn Entertainment Group" },
              { label: "Engagement Type", value: "Full Value Journey — Problem Pursuit → Strategic Liberation → Relentless Application" },
              { label: "Outcome Gap", value: "Allwyn's UK lottery growth has plateaued at 2.1% YoY against a target of 5.6% share growth. Current marketing investment is not converting to player acquisition or frequency uplift." },
              { label: "Strategic Ambition", value: "Reposition marketing as the primary growth engine, with a clear path from brand investment to measurable customer behaviour change." },
              { label: "Sponsor", value: "NB (Managing Partner)" },
            ].map((item, i) => (
              <div key={i}>
                <p style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, margin: 0, textTransform: "uppercase", letterSpacing: 0.5 }}>{item.label}</p>
                <p style={{ fontSize: 13, color: C.text, margin: "4px 0 0", lineHeight: 1.5 }}>{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Success Criteria */}
        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 12px" }}>Success Criteria</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "Clear identification of the outcome gap with quantified impact",
              "C-suite aligned problem definition with investment case",
              "Strategic choices validated with commercial model",
              "Implementation plan with sequenced courses of action",
              "Client team capability uplift measured and evidenced",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 10px", background: C.bg, borderRadius: 6 }}>
                <CheckCircle2 size={16} color={C.green} style={{ marginTop: 1, flexShrink: 0 }} />
                <p style={{ fontSize: 13, color: C.text, margin: 0, lineHeight: 1.4 }}>{item}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Value Pathways */}
        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 12px" }}>Value Pathways & Products</h3>
          {[
            { pathway: "Problem Pursuit", products: ["Outcome Gap", "Strategic Reality", "Problem Definition"], color: C.teal },
            { pathway: "Strategic Liberation", products: ["Strategic Choices", "Strategic Validation", "Strategic Readiness"], color: C.indigo },
            { pathway: "Relentless Application", products: ["Strategic Planning", "Work Design", "Capability Investment", "Strategic Implementation"], color: C.purple },
          ].map((vp, i) => (
            <div key={i} style={{ marginBottom: i < 2 ? 12 : 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 4, height: 16, borderRadius: 2, background: vp.color }} />
                <p style={{ fontSize: 13, fontWeight: 700, color: vp.color, margin: 0 }}>{vp.pathway}</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingLeft: 12 }}>
                {vp.products.map((p, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Badge color={vp.color} bg={vp.color + "12"}>{p}</Badge>
                    {j < vp.products.length - 1 && <ArrowRight size={12} color={C.textMuted} />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Card>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Key Dates */}
        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 12px" }}>Key Dates</h3>
          {[
            { label: "Start", value: "13 Jan 2026" },
            { label: "Problem Pursuit", value: "13 Jan – 27 Mar" },
            { label: "Strategic Liberation", value: "28 Mar – 29 May" },
            { label: "Relentless Application", value: "30 May – 26 Jun" },
            { label: "End", value: "30 Jun 2026" },
          ].map((d, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 4 ? `1px solid ${C.borderLight}` : "none" }}>
              <span style={{ fontSize: 12, color: C.textSecondary }}>{d.label}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{d.value}</span>
            </div>
          ))}
        </Card>

        {/* Stakeholders */}
        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 12px" }}>Stakeholders</h3>
          {[
            { name: "NB", role: "Managing Partner / Sponsor", type: "S+T" },
            { name: "Sarah Chen", role: "Strategy Partner / Squad Lead", type: "S+T" },
            { name: "CMO — Allwyn", role: "Exec Sponsor (Client)", type: "Client" },
            { name: "Head of Marketing", role: "Day-to-day Client Lead", type: "Client" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 3 ? `1px solid ${C.borderLight}` : "none" }}>
              <Avatar initials={s.name.split(" ").map(w => w[0]).join("")} color={s.type === "S+T" ? C.indigo : C.teal} size={28} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: 0 }}>{s.name}</p>
                <p style={{ fontSize: 11, color: C.textSecondary, margin: 0 }}>{s.role}</p>
              </div>
              <Badge color={s.type === "S+T" ? C.indigo : C.teal} bg={s.type === "S+T" ? C.indigoLight : C.tealLight}>{s.type}</Badge>
            </div>
          ))}
        </Card>

        {/* Governance */}
        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 12px" }}>Governance</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "QA Gate", desc: "SP review before any Front Stage content" },
              { label: "Scope Changes", desc: "Require MP approval + impact assessment" },
              { label: "Client Comms", desc: "Fortnightly cadence, tailored to CMO style" },
              { label: "Escalation", desc: "SP → MP within 24hrs of risk materialising" },
            ].map((g, i) => (
              <div key={i} style={{ padding: "8px 10px", background: C.bg, borderRadius: 6 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: C.text, margin: 0 }}>{g.label}</p>
                <p style={{ fontSize: 12, color: C.textSecondary, margin: "2px 0 0" }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </div>
);

// ── Squad & Resources Section ──
const SquadSection = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    <SectionHeader icon={Users} title="Squad & Resources" subtitle="Capacity planning at 85% max bookable · 15% protected for rituals, QA, learning" action={<Badge color={C.textSecondary} bg={C.borderLight}>Tribe Alpha</Badge>} />

    {/* Capacity Overview */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
      {MOCK_SQUAD.map(m => (
        <Card key={m.id} hover>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <Avatar initials={m.initials} color={m.color} size={40} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: 0 }}>{m.name}</p>
              <p style={{ fontSize: 12, color: C.textSecondary, margin: 0 }}>{m.role}</p>
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: C.textSecondary, fontWeight: 500 }}>Allocation</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: m.allocated > 80 ? C.amber : C.text }}>{m.allocated}% / {m.capacity}%</span>
            </div>
            <div style={{ height: 8, background: C.borderLight, borderRadius: 8, overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${m.capacity}%`, background: C.border, borderRadius: 8 }} />
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${m.allocated}%`, background: m.allocated > 80 ? C.amber : m.color, borderRadius: 8, transition: "width 0.6s ease" }} />
            </div>
            {m.allocated > 80 && <p style={{ fontSize: 11, color: C.amber, margin: "4px 0 0", fontWeight: 500 }}>Approaching 85% cap</p>}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {m.skills.map((s, i) => <Badge key={i} color={C.textSecondary} bg={C.bg}>{s}</Badge>)}
          </div>
        </Card>
      ))}
    </div>

    {/* Allocation Table */}
    <Card>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Pattern Allocation Matrix</h3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${C.border}` }}>
              <th style={{ textAlign: "left", padding: "8px 12px", color: C.textSecondary, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>Pattern</th>
              {MOCK_SQUAD.map(m => <th key={m.id} style={{ textAlign: "center", padding: "8px 12px", color: C.textSecondary, fontWeight: 600, fontSize: 11 }}>{m.initials}</th>)}
              <th style={{ textAlign: "right", padding: "8px 12px", color: C.textSecondary, fontWeight: 600, fontSize: 11 }}>Total Hrs</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PATTERNS.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${C.borderLight}`, background: i % 2 === 0 ? C.bg : "transparent" }}>
                <td style={{ padding: "10px 12px", fontWeight: 500 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <StatusDot status={p.status} />
                    {p.name}
                  </div>
                </td>
                {MOCK_SQUAD.map(m => (
                  <td key={m.id} style={{ textAlign: "center", padding: "10px 12px" }}>
                    {p.owner === m.initials ? (
                      <span style={{ background: m.color + "18", color: m.color, fontWeight: 700, padding: "2px 8px", borderRadius: 4, fontSize: 12 }}>{p.hours}h</span>
                    ) : <span style={{ color: C.textMuted }}>—</span>}
                  </td>
                ))}
                <td style={{ textAlign: "right", padding: "10px 12px", fontWeight: 600 }}>{p.hours}h</td>
              </tr>
            ))}
            <tr style={{ borderTop: `2px solid ${C.border}` }}>
              <td style={{ padding: "10px 12px", fontWeight: 700 }}>Total</td>
              {MOCK_SQUAD.map(m => {
                const total = MOCK_PATTERNS.filter(p => p.owner === m.initials).reduce((a, b) => a + b.hours, 0);
                return <td key={m.id} style={{ textAlign: "center", padding: "10px 12px", fontWeight: 700, color: m.color }}>{total}h</td>;
              })}
              <td style={{ textAlign: "right", padding: "10px 12px", fontWeight: 700 }}>{MOCK_PATTERNS.reduce((a, b) => a + b.hours, 0)}h</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

// ── Work Design Section ──
const WorkDesignSection = () => {
  const [expandedPattern, setExpandedPattern] = useState(null);
  const phases = [...new Set(MOCK_PATTERNS.map(p => p.phase))];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionHeader icon={Boxes} title="Work Design" subtitle="Patterns are the smallest assignable work packages (8–80 hrs) with clear inputs, transformations and outputs" />

      {phases.map(phase => {
        const phasePatterns = MOCK_PATTERNS.filter(p => p.phase === phase);
        const phaseColor = phase === "Problem Pursuit" ? C.teal : phase === "Strategic Liberation" ? C.indigo : C.purple;
        return (
          <div key={phase}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 4, height: 20, borderRadius: 2, background: phaseColor }} />
              <h3 style={{ fontSize: 15, fontWeight: 700, color: phaseColor, margin: 0 }}>{phase}</h3>
              <Badge color={phaseColor} bg={phaseColor + "12"}>{phasePatterns.length} patterns · {phasePatterns.reduce((a, b) => a + b.hours, 0)}hrs</Badge>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
              {phasePatterns.map(p => (
                <Card key={p.id} hover onClick={() => setExpandedPattern(expandedPattern === p.id ? null : p.id)} style={{ borderLeft: `3px solid ${phaseColor}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: 0 }}>{p.name}</p>
                        <StatusDot status={p.status} />
                      </div>
                      <p style={{ fontSize: 12, color: C.textSecondary, margin: "4px 0 0" }}>Product: {p.product}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: 0 }}>{p.hours}h</p>
                      <p style={{ fontSize: 11, color: C.textSecondary, margin: 0 }}>budget</p>
                    </div>
                  </div>
                  <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar initials={p.owner} color={MOCK_SQUAD.find(s => s.initials === p.owner)?.color || C.textMuted} size={26} />
                    <ProgressBar value={p.effort} max={p.hours} color={phaseColor} height={5} showLabel />
                  </div>
                  {expandedPattern === p.id && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.borderLight}` }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                        <div style={{ padding: 10, background: C.bg, borderRadius: 8 }}>
                          <p style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 0.5 }}>Inputs</p>
                          <p style={{ fontSize: 12, color: C.textSecondary, margin: 0 }}>Data sources, client materials, prior analysis</p>
                        </div>
                        <div style={{ padding: 10, background: C.bg, borderRadius: 8 }}>
                          <p style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 0.5 }}>Transformation</p>
                          <p style={{ fontSize: 12, color: C.textSecondary, margin: 0 }}>Analysis, synthesis, modelling</p>
                        </div>
                        <div style={{ padding: 10, background: C.bg, borderRadius: 8 }}>
                          <p style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 0.5 }}>Outputs</p>
                          <p style={{ fontSize: 12, color: C.textSecondary, margin: 0 }}>Front Stage deliverables, client-ready assets</p>
                        </div>
                      </div>
                      <div style={{ marginTop: 10, padding: "8px 10px", background: C.indigoLight, borderRadius: 8, display: "flex", alignItems: "center", gap: 8 }}>
                        <Bot size={14} color={C.indigo} />
                        <p style={{ fontSize: 12, color: C.indigo, margin: 0, fontWeight: 500 }}>Agent support available: data extraction, market sizing, evidence linking</p>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── Delivery Plan Section ──
const DeliverySection = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    <SectionHeader icon={CalendarClock} title="Delivery Plan & Timeline" subtitle="Work management flow: Brief → Sponsor → Choose With → Design With → Sit With → Wrap" />

    {/* Timeline Visualization */}
    <Card>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 16px" }}>Project Timeline</h3>
      <div style={{ position: "relative" }}>
        {/* Month Headers */}
        <div style={{ display: "grid", gridTemplateColumns: "140px repeat(6, 1fr)", borderBottom: `1px solid ${C.border}`, paddingBottom: 8, marginBottom: 12 }}>
          <div />
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(m => (
            <span key={m} style={{ fontSize: 11, fontWeight: 600, color: C.textSecondary, textAlign: "center" }}>{m} 2026</span>
          ))}
        </div>

        {/* Phase Bars */}
        {[
          { name: "Problem Pursuit", start: 0, width: 45, color: C.teal },
          { name: "Strategic Liberation", start: 45, width: 35, color: C.indigo },
          { name: "Relentless Application", start: 80, width: 20, color: C.purple },
        ].map((phase, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: phase.color }}>{phase.name}</span>
            <div style={{ position: "relative", height: 28 }}>
              <div style={{ position: "absolute", left: `${phase.start}%`, width: `${phase.width}%`, height: "100%", background: phase.color + "20", border: `1px solid ${phase.color}40`, borderRadius: 6, display: "flex", alignItems: "center", paddingLeft: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: phase.color }}>{phase.width}%</span>
              </div>
            </div>
          </div>
        ))}

        {/* Today Marker */}
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", marginTop: 4 }}>
          <div />
          <div style={{ position: "relative", height: 2 }}>
            <div style={{ position: "absolute", left: "16%", top: -20, height: 60, width: 2, background: C.red, zIndex: 1 }}>
              <span style={{ position: "absolute", top: -16, left: -14, fontSize: 10, color: C.red, fontWeight: 700 }}>Today</span>
            </div>
          </div>
        </div>
      </div>
    </Card>

    {/* Milestones Full List */}
    <Card>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Milestones & Gates</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {MOCK_MILESTONES.map((m, i) => (
          <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: i < MOCK_MILESTONES.length - 1 ? `1px solid ${C.borderLight}` : "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: m.status === "completed" ? C.greenLight : m.status === "in-progress" ? C.indigoLight : C.bg, flexShrink: 0 }}>
              {m.status === "completed" ? <CheckCircle2 size={18} color={C.green} /> : m.status === "in-progress" ? <Activity size={18} color={C.indigo} /> : <Circle size={18} color={C.textMuted} />}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: m.status === "completed" ? C.textSecondary : C.text, margin: 0, textDecoration: m.status === "completed" ? "line-through" : "none" }}>{m.name}</p>
              <p style={{ fontSize: 12, color: C.textSecondary, margin: "2px 0 0" }}>{m.phase}</p>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text, minWidth: 80 }}>{new Date(m.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
            <Badge color={m.status === "completed" ? C.green : m.status === "in-progress" ? C.indigo : C.textMuted} bg={m.status === "completed" ? C.greenLight : m.status === "in-progress" ? C.indigoLight : C.bg}>{m.status.replace("-", " ")}</Badge>
          </div>
        ))}
      </div>
    </Card>

    {/* Work Management Flow */}
    <Card>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Work Management Flow</h3>
      <div style={{ display: "flex", gap: 4 }}>
        {[
          { step: 1, name: "Brief Enters", desc: "MP triages, identifies outcome gap", status: "completed" },
          { step: 2, name: "Sponsor", desc: "MP sponsors, assigns to tribe", status: "completed" },
          { step: 3, name: "Choose With", desc: "Clarify value, agree scope", status: "completed" },
          { step: 4, name: "Design With", desc: "Co-create paths to outcomes", status: "active" },
          { step: 5, name: "Sit With", desc: "Drive action, execute", status: "upcoming" },
          { step: 6, name: "Wrap", desc: "Outputs to products", status: "upcoming" },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, position: "relative" }}>
            <div style={{ padding: "12px 10px", background: s.status === "active" ? C.accentLight : s.status === "completed" ? C.greenLight : C.bg, borderRadius: 8, border: `1px solid ${s.status === "active" ? C.accent + "50" : s.status === "completed" ? C.green + "30" : C.borderLight}`, textAlign: "center", minHeight: 80, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: s.status === "active" ? C.accent : s.status === "completed" ? C.green : C.textMuted, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, margin: "0 auto 6px" }}>{s.step}</div>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: 0 }}>{s.name}</p>
              <p style={{ fontSize: 11, color: C.textSecondary, margin: "2px 0 0" }}>{s.desc}</p>
            </div>
            {i < 5 && <ChevronRight size={14} color={C.textMuted} style={{ position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)", zIndex: 1 }} />}
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// ── Commercial Section ──
const CommercialSection = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    <SectionHeader icon={DollarSign} title="Commercial" subtitle="Budget, profitability tracking, and financial risk assessment" />

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
      <MetricTile label="Total Budget" value={`£${(MOCK_COMMERCIAL.budget / 1000).toFixed(0)}k`} sub="engagement value" icon={Briefcase} color={C.navy} />
      <MetricTile label="Spent to Date" value={`£${(MOCK_COMMERCIAL.spent / 1000).toFixed(1)}k`} sub={`${Math.round((MOCK_COMMERCIAL.spent / MOCK_COMMERCIAL.budget) * 100)}% of budget`} icon={TrendingUp} color={C.indigo} />
      <MetricTile label="Forecast" value={`£${(MOCK_COMMERCIAL.forecast / 1000).toFixed(0)}k`} sub="projected total" icon={BarChart3} color={C.teal} trend="up" />
      <MetricTile label="Margin" value={`${MOCK_COMMERCIAL.margin.current}%`} sub={`Target: ${MOCK_COMMERCIAL.margin.target}%`} icon={PieChart} color={C.green} trend="up" />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <Card>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Budget Burn</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: C.textSecondary }}>Overall Budget</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>£{(MOCK_COMMERCIAL.spent / 1000).toFixed(1)}k / £{(MOCK_COMMERCIAL.budget / 1000).toFixed(0)}k</span>
            </div>
            <ProgressBar value={MOCK_COMMERCIAL.spent} max={MOCK_COMMERCIAL.budget} color={C.indigo} height={10} />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: C.textSecondary }}>Billable Hours</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{MOCK_COMMERCIAL.billableHours.logged} / {MOCK_COMMERCIAL.billableHours.planned} hrs</span>
            </div>
            <ProgressBar value={MOCK_COMMERCIAL.billableHours.logged} max={MOCK_COMMERCIAL.billableHours.planned} color={C.teal} height={10} />
          </div>
          <div style={{ padding: "10px 12px", background: C.bg, borderRadius: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: C.textSecondary }}>Daily Burn Rate</span>
              <div>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.green }}>£{MOCK_COMMERCIAL.burnRate.actual}</span>
                <span style={{ fontSize: 11, color: C.textSecondary }}> / £{MOCK_COMMERCIAL.burnRate.planned} planned</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Cost by Phase</h3>
        {[
          { phase: "Problem Pursuit", budgeted: 95000, spent: 52400, color: C.teal },
          { phase: "Strategic Liberation", budgeted: 120000, spent: 20000, color: C.indigo },
          { phase: "Relentless Application", budgeted: 70000, spent: 0, color: C.purple },
        ].map((p, i) => (
          <div key={i} style={{ marginBottom: i < 2 ? 14 : 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: p.color }}>{p.phase}</span>
              <span style={{ fontSize: 12, color: C.textSecondary }}>£{(p.spent / 1000).toFixed(1)}k / £{(p.budgeted / 1000).toFixed(0)}k</span>
            </div>
            <ProgressBar value={p.spent} max={p.budgeted} color={p.color} height={8} />
          </div>
        ))}
      </Card>
    </div>
  </div>
);

// ── Risk & Quality Section ──
const RiskSection = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    <SectionHeader icon={ShieldAlert} title="Risk & Quality Assurance" subtitle="Risk identification, QA framework, and Definition of Done" />

    <Card>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Risk Register</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {MOCK_RISKS.map(r => (
          <div key={r.id} style={{ padding: "14px 16px", background: C.bg, borderRadius: 10, border: `1px solid ${C.borderLight}`, borderLeft: `3px solid ${r.impact === "high" ? C.red : C.amber}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: 0 }}>{r.title}</p>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <Badge color={r.impact === "high" ? C.red : C.amber} bg={r.impact === "high" ? C.redLight : C.amberLight}>Impact: {r.impact}</Badge>
                <Badge color={r.likelihood === "high" ? C.red : r.likelihood === "medium" ? C.amber : C.green} bg={r.likelihood === "high" ? C.redLight : r.likelihood === "medium" ? C.amberLight : C.greenLight}>Likelihood: {r.likelihood}</Badge>
                <Badge color={C.textSecondary} bg={C.borderLight}>{r.status}</Badge>
              </div>
            </div>
            <p style={{ fontSize: 13, color: C.textSecondary, margin: "0 0 6px", lineHeight: 1.4 }}><strong style={{ color: C.text }}>Mitigation:</strong> {r.mitigation}</p>
            <p style={{ fontSize: 12, color: C.textMuted }}>Owner: {r.owner}</p>
          </div>
        ))}
      </div>
    </Card>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <Card>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>QA Framework</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { rule: "Definition of Done for every Pattern", desc: "Clear acceptance criteria before work begins" },
            { rule: "Every Product must enable decision", desc: "Outputs must be actionable, not just informational" },
            { rule: "SP accountable for pre-client gate", desc: "No Front Stage content without SP review" },
            { rule: "Metrics tracked: rework rate, dependencies, quality scores", desc: "Continuous improvement through measurement" },
          ].map((q, i) => (
            <div key={i} style={{ padding: "10px 12px", background: C.bg, borderRadius: 8 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: 0 }}>{q.rule}</p>
              <p style={{ fontSize: 12, color: C.textSecondary, margin: "2px 0 0" }}>{q.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Critical Scenarios</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { scenario: "Scope Creep", desc: "Impact assessment + change request process", icon: "📐" },
            { scenario: "Resource Crisis", desc: "Replan protocol + contingency resource", icon: "🔄" },
            { scenario: "Budget Pressure", desc: "Cause analysis + margin preservation", icon: "📊" },
            { scenario: "Compliance Roadblock", desc: "Legal navigation + timeline adjustment", icon: "🛡️" },
            { scenario: "Client Dissatisfaction", desc: "Diagnostic + tailored response", icon: "💬" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: C.bg, borderRadius: 8 }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: 0 }}>{s.scenario}</p>
                <p style={{ fontSize: 12, color: C.textSecondary, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

// ── Rituals Section ──
const RitualsSection = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    <SectionHeader icon={RotateCw} title="Rituals & Cadence" subtitle="Non-negotiable operating rhythms that fix ritual drift, alignment decay and learning loss" />

    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
      {MOCK_RITUALS.map((r, i) => (
        <Card key={i} hover style={{ borderTop: r.next === "Today" ? `3px solid ${C.accent}` : `3px solid ${C.borderLight}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: 0 }}>{r.name}</p>
            {r.next === "Today" && <Badge color={C.accentDark} bg={C.accentLight}>Today</Badge>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <RefreshCw size={14} color={C.textMuted} />
              <span style={{ fontSize: 13, color: C.textSecondary }}>{r.cadence}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Clock size={14} color={C.textMuted} />
              <span style={{ fontSize: 13, color: C.textSecondary }}>{r.day} at {r.time}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <UserCheck size={14} color={C.textMuted} />
              <span style={{ fontSize: 13, color: C.textSecondary }}>{r.owner}</span>
            </div>
          </div>
          <div style={{ marginTop: 12, padding: "6px 10px", background: C.bg, borderRadius: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: C.textMuted }}>Next</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: r.next === "Today" ? C.accent : r.next === "Tomorrow" ? C.indigo : C.text }}>{r.next}</span>
          </div>
        </Card>
      ))}
    </div>

    <Card>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, margin: "0 0 14px" }}>Capacity Model</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {[
          { label: "Max Bookable", value: "85%", desc: "No individual exceeds 85% allocation", color: C.indigo },
          { label: "Protected Time", value: "15%", desc: "Reserved for rituals, QA and learning", color: C.teal },
          { label: "Surge Limit", value: "2 weeks", desc: "100% allocation capped at 2 consecutive weeks", color: C.amber },
        ].map((c, i) => (
          <div key={i} style={{ padding: "16px", background: C.bg, borderRadius: 10, textAlign: "center" }}>
            <p style={{ fontSize: 32, fontWeight: 800, color: c.color, margin: 0 }}>{c.value}</p>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: "4px 0" }}>{c.label}</p>
            <p style={{ fontSize: 12, color: C.textSecondary, margin: 0 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// ══════════════════════════════════════════════════════════
// AGENT PANEL (Right Sidebar)
// ══════════════════════════════════════════════════════════

const AgentPanel = ({ isOpen, onToggle }) => {
  const [activeTab, setActiveTab] = useState("suggestions");
  const [chatInput, setChatInput] = useState("");

  if (!isOpen) return null;

  return (
    <div style={{ width: 340, flexShrink: 0, background: C.surface, borderLeft: `1px solid ${C.border}`, display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${C.accent}, ${C.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={14} color="#fff" />
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Agent Ensemble</span>
          </div>
          <button onClick={onToggle} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><X size={16} color={C.textMuted} /></button>
        </div>
        <div style={{ display: "flex", gap: 2, background: C.bg, borderRadius: 8, padding: 2 }}>
          {[
            { id: "suggestions", label: "Suggestions" },
            { id: "agents", label: "Agents" },
            { id: "chat", label: "Chat" },
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ flex: 1, padding: "6px 0", background: activeTab === t.id ? C.surface : "transparent", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, color: activeTab === t.id ? C.text : C.textSecondary, cursor: "pointer", boxShadow: activeTab === t.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        {activeTab === "suggestions" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {MOCK_AGENT_SUGGESTIONS.map(s => (
              <div key={s.id} style={{ padding: "12px", background: s.priority === "alert" ? C.redLight : s.priority === "warning" ? C.amberLight : C.indigoLight, borderRadius: 10, border: `1px solid ${s.priority === "alert" ? C.red + "25" : s.priority === "warning" ? C.amber + "25" : C.indigo + "25"}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <Bot size={14} color={s.priority === "alert" ? C.red : s.priority === "warning" ? C.amber : C.indigo} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: s.priority === "alert" ? C.red : s.priority === "warning" ? C.amber : C.indigo }}>{s.agent}</span>
                  <span style={{ fontSize: 10, color: C.textMuted, marginLeft: "auto" }}>{s.time}</span>
                </div>
                <p style={{ fontSize: 12, color: C.text, margin: 0, lineHeight: 1.5 }}>{s.message}</p>
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <button style={{ padding: "4px 10px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", color: C.text }}>Act on this</button>
                  <button style={{ padding: "4px 10px", background: "transparent", border: "none", borderRadius: 6, fontSize: 11, color: C.textMuted, cursor: "pointer" }}>Dismiss</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "agents" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { name: "Planning Strategist", desc: "Scoping, timeline architecture, dependency mapping", color: C.indigo, status: "idle" },
              { name: "Resource Optimizer", desc: "Team allocation, capacity planning, skills matching", color: C.teal, status: "active" },
              { name: "Commercial Analyst", desc: "Budget modelling, profitability, financial risk", color: C.green, status: "idle" },
              { name: "Risk Guardian", desc: "Risk identification, mitigation, compliance", color: C.coral, status: "watching" },
              { name: "Client Experience Architect", desc: "Stakeholder mapping, communication, value storytelling", color: C.purple, status: "idle" },
            ].map((a, i) => (
              <div key={i} style={{ padding: "12px", background: C.bg, borderRadius: 10, border: `1px solid ${C.borderLight}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.status === "active" ? C.green : a.status === "watching" ? C.amber : C.textMuted }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: a.color }}>{a.name}</span>
                </div>
                <p style={{ fontSize: 12, color: C.textSecondary, margin: "0 0 8px", lineHeight: 1.4 }}>{a.desc}</p>
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{ padding: "4px 10px", background: a.color + "12", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", color: a.color }}>Delegate task</button>
                  <button style={{ padding: "4px 10px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 11, cursor: "pointer", color: C.textSecondary }}>Configure</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "chat" && (
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
              <div style={{ padding: "10px 12px", background: C.indigoLight, borderRadius: "10px 10px 10px 2px", maxWidth: "90%" }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: C.indigo, margin: "0 0 4px" }}>Planning Strategist</p>
                <p style={{ fontSize: 12, color: C.text, margin: 0, lineHeight: 1.5 }}>Based on the current pace, the Outcome Gap presentation milestone on Feb 21 is achievable. However, the Customer Behaviour Analysis pattern hasn't started yet — would you like me to draft a revised sequence?</p>
              </div>
              <div style={{ padding: "10px 12px", background: C.accent + "15", borderRadius: "10px 10px 2px 10px", maxWidth: "90%", alignSelf: "flex-end" }}>
                <p style={{ fontSize: 12, color: C.text, margin: 0, lineHeight: 1.5 }}>Yes, please draft a revised sequence that keeps us on track for the Feb 21 milestone.</p>
              </div>
              <div style={{ padding: "10px 12px", background: C.indigoLight, borderRadius: "10px 10px 10px 2px", maxWidth: "90%" }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: C.indigo, margin: "0 0 4px" }}>Planning Strategist</p>
                <p style={{ fontSize: 12, color: C.text, margin: 0, lineHeight: 1.5 }}>Working on it now. I'll factor in Maya's current capacity and check if any of the Customer Behaviour Analysis inputs can be pre-processed by the Decode Agent.</p>
                <div style={{ marginTop: 8, padding: "6px 8px", background: C.surface, borderRadius: 6, display: "flex", alignItems: "center", gap: 6 }}>
                  <Activity size={12} color={C.indigo} />
                  <span style={{ fontSize: 11, color: C.indigo, fontWeight: 500 }}>Processing...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      {activeTab === "chat" && (
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask the ensemble..."
              style={{ flex: 1, padding: "8px 12px", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, outline: "none", background: C.bg }}
            />
            <button style={{ width: 34, height: 34, borderRadius: 8, background: C.accent, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Send size={14} color="#fff" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════

export default function CommonsOS() {
  const [activeSection, setActiveSection] = useState("overview");
  const [agentPanelOpen, setAgentPanelOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "overview": return <OverviewSection />;
      case "charter": return <CharterSection />;
      case "squad": return <SquadSection />;
      case "workdesign": return <WorkDesignSection />;
      case "delivery": return <DeliverySection />;
      case "commercial": return <CommercialSection />;
      case "risk": return <RiskSection />;
      case "rituals": return <RitualsSection />;
      default: return <OverviewSection />;
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", background: C.bg, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", overflow: "hidden" }}>

      {/* ── Top Bar ── */}
      <div style={{ height: 52, background: C.navy, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: `linear-gradient(135deg, ${C.accent}, ${C.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Layers size={16} color="#fff" />
            </div>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: -0.3 }}>Commons OS</span>
          </div>

          {/* Space Tabs */}
          <div style={{ display: "flex", gap: 2 }}>
            {SPACES.map(s => (
              <button key={s.id} style={{ padding: "6px 14px", background: s.active ? C.accent + "20" : "transparent", border: s.active ? `1px solid ${C.accent}50` : "1px solid transparent", borderRadius: 6, color: s.active ? C.accent : "#ffffff80", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", position: "relative" }}>
            <Bell size={18} color="#ffffff80" />
            <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: C.coral, border: `2px solid ${C.navy}` }} />
          </button>
          <div style={{ width: 1, height: 20, background: "#ffffff15" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Avatar initials="SC" color={C.accent} size={28} />
            <span style={{ fontSize: 12, color: "#ffffffb0", fontWeight: 500 }}>Sarah Chen</span>
          </div>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Left Navigation Rail */}
        <div style={{ width: sidebarCollapsed ? 56 : 220, flexShrink: 0, background: C.surface, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", transition: "width 0.2s ease", overflow: "hidden" }}>
          <div style={{ padding: sidebarCollapsed ? "12px 8px" : "12px 14px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {!sidebarCollapsed && <span style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>Commons</span>}
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", borderRadius: 4 }}>
              {sidebarCollapsed ? <ChevronRight size={14} color={C.textMuted} /> : <ChevronLeft size={14} color={C.textMuted} />}
            </button>
          </div>
          <div style={{ flex: 1, padding: sidebarCollapsed ? "8px 6px" : "8px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
            {NAV_SECTIONS.map(item => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  title={sidebarCollapsed ? item.label : undefined}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: sidebarCollapsed ? "10px 0" : "9px 12px",
                    justifyContent: sidebarCollapsed ? "center" : "flex-start",
                    background: isActive ? C.accent + "12" : "transparent",
                    border: isActive ? `1px solid ${C.accent}25` : "1px solid transparent",
                    borderRadius: 8, cursor: "pointer",
                    transition: "all 0.15s ease",
                    width: "100%",
                  }}
                >
                  <Icon size={18} color={isActive ? C.accent : C.textSecondary} style={{ flexShrink: 0 }} />
                  {!sidebarCollapsed && <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 500, color: isActive ? C.accentDark : C.textSecondary, whiteSpace: "nowrap" }}>{item.label}</span>}
                </button>
              );
            })}
          </div>

          {/* Agent Toggle in sidebar */}
          {!sidebarCollapsed && (
            <div style={{ padding: "12px 14px", borderTop: `1px solid ${C.border}` }}>
              <button onClick={() => setAgentPanelOpen(!agentPanelOpen)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: agentPanelOpen ? C.accent + "12" : C.bg, border: `1px solid ${agentPanelOpen ? C.accent + "30" : C.border}`, borderRadius: 8, cursor: "pointer" }}>
                <Sparkles size={16} color={agentPanelOpen ? C.accent : C.textMuted} />
                <span style={{ fontSize: 12, fontWeight: 600, color: agentPanelOpen ? C.accentDark : C.textSecondary }}>Agent Ensemble</span>
                {!agentPanelOpen && <span style={{ marginLeft: "auto", width: 18, height: 18, borderRadius: "50%", background: C.coral, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>3</span>}
              </button>
            </div>
          )}
        </div>

        {/* Canvas Area */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {renderSection()}
        </div>

        {/* Agent Panel (Right) */}
        <AgentPanel isOpen={agentPanelOpen} onToggle={() => setAgentPanelOpen(false)} />
      </div>
    </div>
  );
}
