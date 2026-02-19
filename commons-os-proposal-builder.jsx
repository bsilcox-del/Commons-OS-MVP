import { useState, useRef } from "react";

const BRAND = {
  dark: "#0B2525",
  cyan: "#49F7F7",
  lilac: "#CBBFFC",
  white: "#FFFFFF",
  black: "#000000",
  grey: "#E8E8E8",
  midGrey: "#7A8A8A",
  darkMuted: "#163636",
};

const STEPS = [
  { id: "intake", label: "Client & Brief" },
  { id: "value", label: "Value Framing" },
  { id: "diagnosis", label: "Problem Diagnosis" },
  { id: "pathway", label: "Pathway Selection" },
  { id: "approach", label: "Approach Design" },
  { id: "planOnPage", label: "Plan on a Page" },
  { id: "commercial", label: "Commercial" },
  { id: "check", label: "Pre-Submission" },
];

const PATHWAYS = {
  problemPursuit: {
    name: "Problem Pursuit",
    colour: BRAND.cyan,
    summary: "The problem itself is unclear, contested, or poorly quantified.",
    signals: [
      "The brief feels symptomatic rather than causal",
      "No shared internal language for the problem",
      "Client is asking 'what should we do?' not 'how should we do it?'",
      "Multiple stakeholders with different views of the issue",
      "Previous attempts to solve have missed the mark",
    ],
    description:
      "Use when the real opportunity lies in reframing what the client is actually solving. This pathway prioritises understanding before action. The output is a reframed problem definition and evidence base that unlocks the right strategic response.",
  },
  strategicLiberation: {
    name: "Strategic Liberation",
    colour: BRAND.lilac,
    summary: "The problem is understood but the strategic response is locked.",
    signals: [
      "Client has data but isn't acting on it",
      "Previous strategies have stalled or run out of road",
      "Internal disagreement about direction",
      "Brief uses words like 'refresh', 'reset', 'new approach'",
      "Category conventions are constraining thinking",
    ],
    description:
      "Use when the client knows what's happening but can't move — because of internal orthodoxies, category conventions, or a strategy that's exhausted. This pathway prioritises reframing and unlocking. The output is a liberated strategic framework the organisation can act on.",
  },
  relentlessApplication: {
    name: "Relentless Application",
    colour: BRAND.cyan,
    summary: "The strategy exists and is sound — execution is the bottleneck.",
    signals: [
      "A strategy document already exists and is broadly right",
      "The problem is implementation pace, consistency, or capability",
      "Brief is about 'making it happen' not 'figuring it out'",
      "Internal teams need embedded support, not another deck",
      "The gap is between what's been decided and what's in market",
    ],
    description:
      "Use when the client needs sustained, embedded support to make something real in market. This pathway prioritises doing over thinking. The output is tangible work in market — campaigns, assets, capabilities, systems — delivered at pace.",
  },
};

const TextArea = ({ value, onChange, placeholder, rows = 3 }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    rows={rows}
    style={{
      width: "100%",
      padding: "12px 14px",
      borderRadius: 6,
      border: `1px solid ${BRAND.midGrey}40`,
      backgroundColor: BRAND.darkMuted,
      color: BRAND.white,
      fontSize: 14,
      fontFamily: "'Approach', 'Inter', system-ui, sans-serif",
      resize: "vertical",
      lineHeight: 1.6,
      outline: "none",
      boxSizing: "border-box",
      transition: "border-color 0.2s",
    }}
    onFocus={(e) => (e.target.style.borderColor = BRAND.cyan)}
    onBlur={(e) => (e.target.style.borderColor = `${BRAND.midGrey}40`)}
  />
);

const PromptCard = ({ prompt, children }) => (
  <div
    style={{
      padding: "16px 18px",
      borderRadius: 8,
      backgroundColor: `${BRAND.darkMuted}`,
      border: `1px solid ${BRAND.midGrey}20`,
      marginBottom: 16,
    }}
  >
    <p
      style={{
        color: BRAND.cyan,
        fontSize: 13,
        fontWeight: 600,
        marginBottom: 10,
        fontFamily: "'Approach', 'Inter', system-ui, sans-serif",
        letterSpacing: "0.02em",
      }}
    >
      {prompt}
    </p>
    {children}
  </div>
);

const CheckItem = ({ label, checked, onChange }) => (
  <div
    onClick={() => onChange(!checked)}
    style={{
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
      padding: "12px 16px",
      borderRadius: 6,
      backgroundColor: checked ? `${BRAND.cyan}10` : `${BRAND.darkMuted}`,
      border: `1px solid ${checked ? BRAND.cyan + "40" : BRAND.midGrey + "20"}`,
      cursor: "pointer",
      marginBottom: 8,
      transition: "all 0.2s",
    }}
  >
    <div
      style={{
        width: 20,
        height: 20,
        minWidth: 20,
        borderRadius: 4,
        border: `2px solid ${checked ? BRAND.cyan : BRAND.midGrey}`,
        backgroundColor: checked ? BRAND.cyan : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 1,
        transition: "all 0.2s",
      }}
    >
      {checked && (
        <span style={{ color: BRAND.dark, fontSize: 13, fontWeight: 700 }}>
          ✓
        </span>
      )}
    </div>
    <span
      style={{
        color: BRAND.white,
        fontSize: 14,
        lineHeight: 1.5,
        fontFamily: "'Approach', 'Inter', system-ui, sans-serif",
      }}
    >
      {label}
    </span>
  </div>
);

const PathwayCard = ({ id, pathway, selected, onSelect }) => (
  <div
    onClick={() => onSelect(id)}
    style={{
      padding: 20,
      borderRadius: 10,
      border: `2px solid ${selected ? pathway.colour : BRAND.midGrey + "30"}`,
      backgroundColor: selected ? `${pathway.colour}12` : BRAND.darkMuted,
      cursor: "pointer",
      transition: "all 0.25s",
      flex: 1,
      minWidth: 220,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: selected ? pathway.colour : "transparent",
          border: `2px solid ${pathway.colour}`,
          transition: "all 0.2s",
        }}
      />
      <span
        style={{
          color: pathway.colour,
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "'Approach', 'Inter', system-ui, sans-serif",
        }}
      >
        {pathway.name}
      </span>
    </div>
    <p
      style={{
        color: BRAND.white,
        fontSize: 13,
        lineHeight: 1.5,
        marginBottom: 12,
        opacity: 0.9,
      }}
    >
      {pathway.summary}
    </p>
    <p
      style={{
        color: BRAND.midGrey,
        fontSize: 12,
        lineHeight: 1.5,
        marginBottom: 14,
      }}
    >
      {pathway.description}
    </p>
    <div style={{ borderTop: `1px solid ${BRAND.midGrey}20`, paddingTop: 12 }}>
      <p
        style={{
          color: BRAND.cyan,
          fontSize: 11,
          fontWeight: 600,
          marginBottom: 6,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Selection signals
      </p>
      {pathway.signals.map((s, i) => (
        <p
          key={i}
          style={{
            color: BRAND.midGrey,
            fontSize: 12,
            lineHeight: 1.5,
            paddingLeft: 10,
            borderLeft: `2px solid ${pathway.colour}30`,
            marginBottom: 4,
          }}
        >
          {s}
        </p>
      ))}
    </div>
  </div>
);

const PhaseEditor = ({ phase, index, onChange }) => (
  <div
    style={{
      padding: 18,
      borderRadius: 8,
      backgroundColor: BRAND.darkMuted,
      border: `1px solid ${BRAND.midGrey}20`,
      marginBottom: 14,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          backgroundColor: BRAND.cyan,
          color: BRAND.dark,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 13,
        }}
      >
        {index + 1}
      </div>
      <input
        value={phase.name}
        onChange={(e) => onChange({ ...phase, name: e.target.value })}
        placeholder={`Phase ${index + 1} name`}
        style={{
          flex: 1,
          padding: "8px 12px",
          borderRadius: 6,
          border: `1px solid ${BRAND.midGrey}30`,
          backgroundColor: "transparent",
          color: BRAND.white,
          fontSize: 15,
          fontWeight: 600,
          fontFamily: "'Approach', 'Inter', system-ui, sans-serif",
          outline: "none",
        }}
      />
    </div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
        marginBottom: 10,
      }}
    >
      <div>
        <label
          style={{
            color: BRAND.cyan,
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            display: "block",
            marginBottom: 6,
          }}
        >
          Question this phase answers
        </label>
        <TextArea
          value={phase.question}
          onChange={(v) => onChange({ ...phase, question: v })}
          placeholder="What is this phase trying to answer?"
          rows={2}
        />
      </div>
      <div>
        <label
          style={{
            color: BRAND.cyan,
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            display: "block",
            marginBottom: 6,
          }}
        >
          Tangible output
        </label>
        <TextArea
          value={phase.output}
          onChange={(v) => onChange({ ...phase, output: v })}
          placeholder="What does the client get at the end?"
          rows={2}
        />
      </div>
    </div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 10,
      }}
    >
      <div>
        <label
          style={{
            color: BRAND.cyan,
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            display: "block",
            marginBottom: 6,
          }}
        >
          Core activities
        </label>
        <TextArea
          value={phase.activities}
          onChange={(v) => onChange({ ...phase, activities: v })}
          placeholder="Research, workshops, analysis..."
          rows={2}
        />
      </div>
      <div>
        <label
          style={{
            color: BRAND.cyan,
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            display: "block",
            marginBottom: 6,
          }}
        >
          Elapsed time
        </label>
        <input
          value={phase.timing}
          onChange={(e) => onChange({ ...phase, timing: e.target.value })}
          placeholder="e.g. 3–4 weeks"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 6,
            border: `1px solid ${BRAND.midGrey}40`,
            backgroundColor: BRAND.darkMuted,
            color: BRAND.white,
            fontSize: 14,
            fontFamily: "'Approach', 'Inter', system-ui, sans-serif",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>
      <div>
        <label
          style={{
            color: BRAND.cyan,
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            display: "block",
            marginBottom: 6,
          }}
        >
          Client input needed
        </label>
        <TextArea
          value={phase.clientInput}
          onChange={(v) => onChange({ ...phase, clientInput: v })}
          placeholder="Data access, stakeholder time..."
          rows={2}
        />
      </div>
    </div>
  </div>
);

const SummaryField = ({ label, value }) => (
  <div style={{ marginBottom: 16 }}>
    <p
      style={{
        color: BRAND.cyan,
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: 4,
      }}
    >
      {label}
    </p>
    <p
      style={{
        color: value ? BRAND.white : BRAND.midGrey,
        fontSize: 14,
        lineHeight: 1.6,
        fontStyle: value ? "normal" : "italic",
      }}
    >
      {value || "Not yet completed"}
    </p>
  </div>
);

const emptyPhase = () => ({
  name: "",
  question: "",
  activities: "",
  output: "",
  timing: "",
  clientInput: "",
});

export default function ProposalBuilder() {
  const [step, setStep] = useState(0);
  const contentRef = useRef(null);

  const [data, setData] = useState({
    clientName: "",
    sector: "",
    sponsor: "",
    clientBrief: "",
    trigger: "",
    existingKnowledge: "",
    relationship: "",
    competitiveContext: "",
    constraints: "",
    commercialScale: "",
    costOfInaction: "",
    upside: "",
    plPosition: "",
    evidence: "",
    multiplier: "",
    problemUnderstanding: "",
    keyQuestions: "",
    clientAssumptions: "",
    existingData: "",
    orgFactors: "",
    selectedPathway: null,
    pathwayRationale: "",
    sequencing: "",
    clientExpectation: "",
    pathwayRisk: "",
    phases: [emptyPhase(), emptyPhase()],
    decisionPoints: "",
    popContext: "",
    popProblem: "",
    popGoal: "",
    popOutcomes: "",
    totalInvestment: "",
    feeStructure: "",
    valueAlignment: "",
    paymentStaging: "",
    sharedRisk: "",
    exclusions: "",
    additionalCosts: "",
    checks: {
      leadsWithClient: false,
      valueCaseCredible: false,
      questionsGenuine: false,
      pathwayEarned: false,
      approachSpecific: false,
      popStandalone: false,
      commercialProportionate: false,
    },
  });

  const update = (field, value) =>
    setData((d) => ({ ...d, [field]: value }));

  const goTo = (s) => {
    setStep(s);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };

  const completionForStep = (idx) => {
    const fields = {
      0: ["clientName", "clientBrief", "trigger"],
      1: ["commercialScale", "costOfInaction", "upside"],
      2: ["problemUnderstanding", "keyQuestions"],
      3: ["selectedPathway", "pathwayRationale"],
      4: [],
      5: ["popContext", "popProblem", "popGoal", "popOutcomes"],
      6: ["totalInvestment", "feeStructure"],
      7: [],
    };
    const f = fields[idx] || [];
    if (idx === 4) {
      const filled = data.phases.filter((p) => p.name && p.question).length;
      return filled > 0 ? Math.min(100, (filled / 2) * 100) : 0;
    }
    if (idx === 7) {
      const checks = Object.values(data.checks);
      return Math.round(
        (checks.filter(Boolean).length / checks.length) * 100
      );
    }
    if (f.length === 0) return 0;
    const filled = f.filter((k) => data[k] && data[k].length > 0).length;
    return Math.round((filled / f.length) * 100);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <p
              style={{
                color: BRAND.midGrey,
                fontSize: 14,
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              Capture what you know before any S+T framing. The raw material
              goes here — client context, the brief as they described it, and
              the conditions around the engagement.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <PromptCard prompt="Client name">
                <input
                  value={data.clientName}
                  onChange={(e) => update("clientName", e.target.value)}
                  placeholder="Organisation name"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 6,
                    border: `1px solid ${BRAND.midGrey}40`,
                    backgroundColor: BRAND.darkMuted,
                    color: BRAND.white,
                    fontSize: 14,
                    fontFamily: "'Approach', 'Inter', system-ui, sans-serif",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </PromptCard>
              <PromptCard prompt="Sector">
                <input
                  value={data.sector}
                  onChange={(e) => update("sector", e.target.value)}
                  placeholder="e.g. Financial services, FMCG"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 6,
                    border: `1px solid ${BRAND.midGrey}40`,
                    backgroundColor: BRAND.darkMuted,
                    color: BRAND.white,
                    fontSize: 14,
                    fontFamily: "'Approach', 'Inter', system-ui, sans-serif",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </PromptCard>
              <PromptCard prompt="Sponsor / Buyer">
                <input
                  value={data.sponsor}
                  onChange={(e) => update("sponsor", e.target.value)}
                  placeholder="Name and role"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 6,
                    border: `1px solid ${BRAND.midGrey}40`,
                    backgroundColor: BRAND.darkMuted,
                    color: BRAND.white,
                    fontSize: 14,
                    fontFamily: "'Approach', 'Inter', system-ui, sans-serif",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </PromptCard>
            </div>
            <PromptCard prompt="What did the client actually ask for? Use their language, not ours.">
              <TextArea
                value={data.clientBrief}
                onChange={(v) => update("clientBrief", v)}
                placeholder="The brief as the client described it..."
                rows={3}
              />
            </PromptCard>
            <PromptCard prompt="What triggered this request? Is it reactive (something broke), proactive (ambition), or political (internal mandate)?">
              <TextArea
                value={data.trigger}
                onChange={(v) => update("trigger", v)}
                placeholder="Why now? What changed?"
                rows={2}
              />
            </PromptCard>
            <PromptCard prompt="What do we already know about this client's business, brand, or market position?">
              <TextArea
                value={data.existingKnowledge}
                onChange={(v) => update("existingKnowledge", v)}
                placeholder="Existing intelligence, public information, previous work..."
                rows={3}
              />
            </PromptCard>
            <PromptCard prompt="Relationship context — existing or new? Agency competition?">
              <TextArea
                value={data.relationship}
                onChange={(v) => update("relationship", v)}
                placeholder="Is there an existing relationship? Formal pitch process?"
                rows={2}
              />
            </PromptCard>
            <PromptCard prompt="Hard constraints: timeline expectations, budget signals, internal politics">
              <TextArea
                value={data.constraints}
                onChange={(v) => update("constraints", v)}
                placeholder="Anything that shapes what's possible..."
                rows={2}
              />
            </PromptCard>
          </div>
        );

      case 1:
        return (
          <div>
            <p
              style={{
                color: BRAND.midGrey,
                fontSize: 14,
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              Pivot from what they asked for to what solving it is worth. Every
              proposal should lead with commercial value — anchor numbers that
              the rest of the proposal hangs from. You don't need precision, you
              need to demonstrate you've thought commercially.
            </p>
            <PromptCard prompt="What is the commercial scale of the area the brief touches?">
              <TextArea
                value={data.commercialScale}
                onChange={(v) => update("commercialScale", v)}
                placeholder="Revenue, margin, customer base — the size of the playing field..."
                rows={3}
              />
            </PromptCard>
            <PromptCard prompt="What is the estimated cost of inaction — what happens if they don't solve this?">
              <TextArea
                value={data.costOfInaction}
                onChange={(v) => update("costOfInaction", v)}
                placeholder="Customer loss, market share erosion, margin compression..."
                rows={3}
              />
            </PromptCard>
            <PromptCard prompt="Can you quantify the upside of getting it right, even directionally?">
              <TextArea
                value={data.upside}
                onChange={(v) => update("upside", v)}
                placeholder="Revenue growth, cost savings, market capture..."
                rows={3}
              />
            </PromptCard>
            <PromptCard prompt="Where does this sit in their P&L — growth lever, cost problem, or risk issue?">
              <TextArea
                value={data.plPosition}
                onChange={(v) => update("plPosition", v)}
                placeholder="How the CFO would categorise this..."
                rows={2}
              />
            </PromptCard>
            <PromptCard prompt="What evidence do we have (or can get quickly) to make the value case tangible?">
              <TextArea
                value={data.evidence}
                onChange={(v) => update("evidence", v)}
                placeholder="Published data, analyst reports, client financials, benchmarks..."
                rows={2}
              />
            </PromptCard>
            <PromptCard prompt="Is there a simple multiplier or sensitivity? (e.g., 'every 1% improvement in X = £Y')">
              <TextArea
                value={data.multiplier}
                onChange={(v) => update("multiplier", v)}
                placeholder="The anchor number the value case hangs from..."
                rows={2}
              />
            </PromptCard>
          </div>
        );

      case 2:
        return (
          <div>
            <p
              style={{
                color: BRAND.midGrey,
                fontSize: 14,
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              Before selecting a pathway, articulate what kind of problem this
              actually is. This step sharpens your own thinking and becomes the
              backbone of the "key questions" section in the proposal.
            </p>
            <PromptCard prompt="How well does the client understand the actual problem (vs. the symptoms they've described)?">
              <TextArea
                value={data.problemUnderstanding}
                onChange={(v) => update("problemUnderstanding", v)}
                placeholder="Do they have the right diagnosis, or are they treating symptoms?"
                rows={3}
              />
            </PromptCard>
            <PromptCard prompt="What are the 3–5 most important questions that need answering? Rank by likely value impact.">
              <TextArea
                value={data.keyQuestions}
                onChange={(v) => update("keyQuestions", v)}
                placeholder="The questions your proposal needs to promise to answer..."
                rows={5}
              />
            </PromptCard>
            <PromptCard prompt="What does the client think they already know — and where might they be wrong?">
              <TextArea
                value={data.clientAssumptions}
                onChange={(v) => update("clientAssumptions", v)}
                placeholder="Assumptions to test, orthodoxies to challenge..."
                rows={3}
              />
            </PromptCard>
            <PromptCard prompt="What data or customer understanding already exists vs. what's missing?">
              <TextArea
                value={data.existingData}
                onChange={(v) => update("existingData", v)}
                placeholder="Research, analytics, customer insight — what's available, what's not..."
                rows={3}
              />
            </PromptCard>
            <PromptCard prompt="Are there organisational or cultural factors shaping how the problem is perceived?">
              <TextArea
                value={data.orgFactors}
                onChange={(v) => update("orgFactors", v)}
                placeholder="Politics, structure, history that affects the engagement..."
                rows={2}
              />
            </PromptCard>
          </div>
        );

      case 3:
        return (
          <div>
            <p
              style={{
                color: BRAND.midGrey,
                fontSize: 14,
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              Select the pathway based on your diagnosis, not the brief. Each
              implies a different starting point, pace, and type of output. Read
              the selection signals carefully — the right pathway should feel
              earned, not assumed.
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                marginBottom: 24,
                flexWrap: "wrap",
              }}
            >
              {Object.entries(PATHWAYS).map(([id, pw]) => (
                <PathwayCard
                  key={id}
                  id={id}
                  pathway={pw}
                  selected={data.selectedPathway === id}
                  onSelect={(id) => update("selectedPathway", id)}
                />
              ))}
            </div>
            {data.selectedPathway && (
              <div>
                <PromptCard prompt="Why this pathway? What from your diagnosis makes it the right fit?">
                  <TextArea
                    value={data.pathwayRationale}
                    onChange={(v) => update("pathwayRationale", v)}
                    placeholder="Connect your diagnosis to the pathway selection..."
                    rows={3}
                  />
                </PromptCard>
                <PromptCard prompt="Is this a single-pathway engagement, or does it sequence across pathways?">
                  <TextArea
                    value={data.sequencing}
                    onChange={(v) => update("sequencing", v)}
                    placeholder="e.g. Problem Pursuit leading into Strategic Liberation..."
                    rows={2}
                  />
                </PromptCard>
                <PromptCard prompt="What would the client expect to have in hand at the end?">
                  <TextArea
                    value={data.clientExpectation}
                    onChange={(v) => update("clientExpectation", v)}
                    placeholder="The deliverable they'd describe to their board..."
                    rows={2}
                  />
                </PromptCard>
                <PromptCard prompt="Is there a risk the client thinks they need one pathway but actually needs another?">
                  <TextArea
                    value={data.pathwayRisk}
                    onChange={(v) => update("pathwayRisk", v)}
                    placeholder="How you'd navigate this tension in the proposal..."
                    rows={2}
                  />
                </PromptCard>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div>
            <p
              style={{
                color: BRAND.midGrey,
                fontSize: 14,
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              Build the actual work. Each phase should answer a clear question,
              involve specific activities, and produce a tangible output. The
              approach should read as a narrative, not a task list.
            </p>
            {data.phases.map((phase, i) => (
              <PhaseEditor
                key={i}
                phase={phase}
                index={i}
                onChange={(updated) => {
                  const next = [...data.phases];
                  next[i] = updated;
                  update("phases", next);
                }}
              />
            ))}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <button
                onClick={() =>
                  update("phases", [...data.phases, emptyPhase()])
                }
                style={{
                  padding: "10px 20px",
                  borderRadius: 6,
                  border: `1px dashed ${BRAND.cyan}60`,
                  backgroundColor: "transparent",
                  color: BRAND.cyan,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Approach', 'Inter', system-ui, sans-serif",
                }}
              >
                + Add phase
              </button>
              {data.phases.length > 1 && (
                <button
                  onClick={() =>
                    update("phases", data.phases.slice(0, -1))
                  }
                  style={{
                    padding: "10px 20px",
                    borderRadius: 6,
                    border: `1px dashed ${BRAND.midGrey}40`,
                    backgroundColor: "transparent",
                    color: BRAND.midGrey,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "'Approach', 'Inter', system-ui, sans-serif",
                  }}
                >
                  Remove last
                </button>
              )}
            </div>
            <PromptCard prompt="Are there natural decision points where the client can pause or redirect?">
              <TextArea
                value={data.decisionPoints}
                onChange={(v) => update("decisionPoints", v)}
                placeholder="Gates, check-ins, go/no-go moments..."
                rows={2}
              />
            </PromptCard>
          </div>
        );

      case 5:
        return (
          <div>
            <p
              style={{
                color: BRAND.midGrey,
                fontSize: 14,
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              Compress the entire proposal into one view. This is the page the
              sponsor uses internally to get buy-in. It should work as a
              standalone document.
            </p>
            <div
              style={{
                padding: 24,
                borderRadius: 10,
                border: `2px solid ${BRAND.cyan}30`,
                backgroundColor: `${BRAND.darkMuted}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                  paddingBottom: 16,
                  borderBottom: `1px solid ${BRAND.midGrey}20`,
                }}
              >
                <span
                  style={{
                    color: BRAND.cyan,
                    fontSize: 18,
                    fontWeight: 700,
                    fontFamily: "'Approach', 'Inter', system-ui, sans-serif",
                  }}
                >
                  Plan on a Page
                  {data.clientName ? ` — ${data.clientName}` : ""}
                </span>
                {data.selectedPathway && (
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: 20,
                      backgroundColor: PATHWAYS[data.selectedPathway].colour + "20",
                      color: PATHWAYS[data.selectedPathway].colour,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {PATHWAYS[data.selectedPathway].name}
                  </span>
                )}
              </div>
              <PromptCard prompt="Context — 2–3 sentences on the situation">
                <TextArea
                  value={data.popContext}
                  onChange={(v) => update("popContext", v)}
                  placeholder="The market reality, the client's position, why this matters now..."
                  rows={3}
                />
              </PromptCard>
              <PromptCard prompt="Problem — The reframed problem statement (not the brief)">
                <TextArea
                  value={data.popProblem}
                  onChange={(v) => update("popProblem", v)}
                  placeholder="The actual problem as we see it..."
                  rows={2}
                />
              </PromptCard>
              <PromptCard prompt="Goal — What success looks like">
                <TextArea
                  value={data.popGoal}
                  onChange={(v) => update("popGoal", v)}
                  placeholder="The outcome this engagement delivers..."
                  rows={2}
                />
              </PromptCard>
              <div
                style={{
                  padding: 14,
                  borderRadius: 8,
                  backgroundColor: `${BRAND.dark}`,
                  border: `1px solid ${BRAND.midGrey}15`,
                  marginBottom: 16,
                }}
              >
                <p
                  style={{
                    color: BRAND.cyan,
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  Activities (auto-populated from Approach Design)
                </p>
                {data.phases.filter((p) => p.name).length > 0 ? (
                  data.phases
                    .filter((p) => p.name)
                    .map((p, i) => (
                      <p
                        key={i}
                        style={{
                          color: BRAND.white,
                          fontSize: 13,
                          lineHeight: 1.6,
                          paddingLeft: 12,
                          borderLeft: `2px solid ${BRAND.cyan}40`,
                          marginBottom: 6,
                        }}
                      >
                        <strong>{p.name}</strong>
                        {p.timing ? ` — ${p.timing}` : ""}
                        {p.output ? ` → ${p.output}` : ""}
                      </p>
                    ))
                ) : (
                  <p style={{ color: BRAND.midGrey, fontSize: 13, fontStyle: "italic" }}>
                    Complete the Approach Design step to populate phases here.
                  </p>
                )}
              </div>
              <PromptCard prompt="Outcomes — What the client will have">
                <TextArea
                  value={data.popOutcomes}
                  onChange={(v) => update("popOutcomes", v)}
                  placeholder="The tangible deliverables and strategic assets..."
                  rows={3}
                />
              </PromptCard>
            </div>
          </div>
        );

      case 6:
        return (
          <div>
            <p
              style={{
                color: BRAND.midGrey,
                fontSize: 14,
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              Frame cost against value, not as a line-item invoice. The
              investment section should feel value-aligned — proportionate to the
              opportunity you've quantified, not just the hours you'll spend.
            </p>
            {data.multiplier && (
              <div
                style={{
                  padding: 14,
                  borderRadius: 8,
                  backgroundColor: `${BRAND.cyan}10`,
                  border: `1px solid ${BRAND.cyan}30`,
                  marginBottom: 20,
                }}
              >
                <p style={{ color: BRAND.cyan, fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                  VALUE ANCHOR FROM STEP 2
                </p>
                <p style={{ color: BRAND.white, fontSize: 14, lineHeight: 1.6 }}>
                  {data.multiplier}
                </p>
              </div>
            )}
            <PromptCard prompt="Total investment and structure">
              <TextArea
                value={data.totalInvestment}
                onChange={(v) => update("totalInvestment", v)}
                placeholder="Total fee, broken down by phase or month..."
                rows={3}
              />
            </PromptCard>
            <PromptCard prompt="Fee structure — how is it broken down?">
              <TextArea
                value={data.feeStructure}
                onChange={(v) => update("feeStructure", v)}
                placeholder="By phase, by month, fixed fee, day rate, blended..."
                rows={3}
              />
            </PromptCard>
            <PromptCard prompt="How does the investment relate to the value at stake?">
              <TextArea
                value={data.valueAlignment}
                onChange={(v) => update("valueAlignment", v)}
                placeholder="Draw the line between what we cost and what solving this is worth..."
                rows={2}
              />
            </PromptCard>
            <PromptCard prompt="Payment staging — options that reduce client risk?">
              <TextArea
                value={data.paymentStaging}
                onChange={(v) => update("paymentStaging", v)}
                placeholder="Phase-gated, milestone-based, monthly..."
                rows={2}
              />
            </PromptCard>
            <PromptCard prompt="Shared-risk or value-aligned element?">
              <TextArea
                value={data.sharedRisk}
                onChange={(v) => update("sharedRisk", v)}
                placeholder="Performance fee, outcome bonus, skin in the game..."
                rows={2}
              />
            </PromptCard>
            <PromptCard prompt="Exclusions and additional costs">
              <TextArea
                value={data.additionalCosts}
                onChange={(v) => update("additionalCosts", v)}
                placeholder="VAT, expenses, third-party costs, what's out of scope..."
                rows={2}
              />
            </PromptCard>
          </div>
        );

      case 7:
        return (
          <div>
            <p
              style={{
                color: BRAND.midGrey,
                fontSize: 14,
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              Pressure-test the proposal before it goes out. Each check maps to
              a quality marker that separates a good proposal from a generic
              one.
            </p>
            <CheckItem
              label="Does the proposal lead with the client's world, not ours?"
              checked={data.checks.leadsWithClient}
              onChange={(v) =>
                update("checks", { ...data.checks, leadsWithClient: v })
              }
            />
            <CheckItem
              label="Is the value case concrete enough that a CFO would find it credible?"
              checked={data.checks.valueCaseCredible}
              onChange={(v) =>
                update("checks", { ...data.checks, valueCaseCredible: v })
              }
            />
            <CheckItem
              label="Are the key questions genuinely diagnostic, not just restating the brief?"
              checked={data.checks.questionsGenuine}
              onChange={(v) =>
                update("checks", { ...data.checks, questionsGenuine: v })
              }
            />
            <CheckItem
              label="Does the pathway selection feel earned — could a reader understand why this one?"
              checked={data.checks.pathwayEarned}
              onChange={(v) =>
                update("checks", { ...data.checks, pathwayEarned: v })
              }
            />
            <CheckItem
              label="Is the approach specific enough to inspire confidence but flexible enough for discovery?"
              checked={data.checks.approachSpecific}
              onChange={(v) =>
                update("checks", { ...data.checks, approachSpecific: v })
              }
            />
            <CheckItem
              label="Does the Plan on a Page work as a standalone document?"
              checked={data.checks.popStandalone}
              onChange={(v) =>
                update("checks", { ...data.checks, popStandalone: v })
              }
            />
            <CheckItem
              label="Is the commercial framing proportionate to the value at stake?"
              checked={data.checks.commercialProportionate}
              onChange={(v) =>
                update("checks", {
                  ...data.checks,
                  commercialProportionate: v,
                })
              }
            />
            <div style={{ marginTop: 32 }}>
              <p
                style={{
                  color: BRAND.cyan,
                  fontSize: 16,
                  fontWeight: 700,
                  marginBottom: 16,
                  fontFamily: "'Approach', 'Inter', system-ui, sans-serif",
                }}
              >
                Proposal Summary
              </p>
              <div
                style={{
                  padding: 20,
                  borderRadius: 10,
                  backgroundColor: BRAND.darkMuted,
                  border: `1px solid ${BRAND.midGrey}20`,
                }}
              >
                <SummaryField label="Client" value={data.clientName} />
                <SummaryField label="Brief" value={data.clientBrief} />
                <SummaryField label="Value at Stake" value={data.upside || data.costOfInaction} />
                <SummaryField label="Key Questions" value={data.keyQuestions} />
                <SummaryField
                  label="Pathway"
                  value={
                    data.selectedPathway
                      ? `${PATHWAYS[data.selectedPathway].name} — ${data.pathwayRationale}`
                      : null
                  }
                />
                <SummaryField
                  label="Phases"
                  value={data.phases
                    .filter((p) => p.name)
                    .map((p) => p.name)
                    .join(" → ")}
                />
                <SummaryField label="Investment" value={data.totalInvestment} />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: BRAND.dark,
        fontFamily: "'Approach', 'Inter', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 32px",
          borderBottom: `1px solid ${BRAND.midGrey}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              backgroundColor: BRAND.cyan,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 14,
              color: BRAND.dark,
            }}
          >
            S+T
          </div>
          <span
            style={{ color: BRAND.white, fontSize: 18, fontWeight: 700 }}
          >
            Commons OS
          </span>
          <span
            style={{
              color: BRAND.midGrey,
              fontSize: 14,
              marginLeft: 4,
            }}
          >
            / Proposal Builder
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {data.clientName && (
            <span
              style={{
                padding: "4px 12px",
                borderRadius: 20,
                backgroundColor: `${BRAND.cyan}15`,
                color: BRAND.cyan,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {data.clientName}
            </span>
          )}
          {data.selectedPathway && (
            <span
              style={{
                padding: "4px 12px",
                borderRadius: 20,
                backgroundColor:
                  PATHWAYS[data.selectedPathway].colour + "15",
                color: PATHWAYS[data.selectedPathway].colour,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {PATHWAYS[data.selectedPathway].name}
            </span>
          )}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div
          style={{
            width: 260,
            minWidth: 260,
            borderRight: `1px solid ${BRAND.midGrey}20`,
            padding: "20px 0",
            overflowY: "auto",
          }}
        >
          {STEPS.map((s, i) => {
            const completion = completionForStep(i);
            const active = i === step;
            return (
              <div
                key={s.id}
                onClick={() => goTo(i)}
                style={{
                  padding: "12px 24px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  backgroundColor: active
                    ? `${BRAND.cyan}10`
                    : "transparent",
                  borderLeft: `3px solid ${active ? BRAND.cyan : "transparent"}`,
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: `2px solid ${
                      completion === 100
                        ? BRAND.cyan
                        : active
                        ? BRAND.cyan
                        : BRAND.midGrey + "40"
                    }`,
                    backgroundColor:
                      completion === 100 ? BRAND.cyan : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color:
                      completion === 100
                        ? BRAND.dark
                        : active
                        ? BRAND.cyan
                        : BRAND.midGrey,
                    transition: "all 0.2s",
                  }}
                >
                  {completion === 100 ? "✓" : i + 1}
                </div>
                <div>
                  <p
                    style={{
                      color: active ? BRAND.white : BRAND.midGrey,
                      fontSize: 13,
                      fontWeight: active ? 600 : 400,
                      margin: 0,
                    }}
                  >
                    {s.label}
                  </p>
                  {completion > 0 && completion < 100 && (
                    <div
                      style={{
                        width: 60,
                        height: 3,
                        backgroundColor: `${BRAND.midGrey}30`,
                        borderRadius: 2,
                        marginTop: 4,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${completion}%`,
                          height: "100%",
                          backgroundColor: BRAND.cyan,
                          borderRadius: 2,
                          transition: "width 0.3s",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main content */}
        <div
          ref={contentRef}
          style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}
        >
          <div style={{ maxWidth: 820 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <h2
                style={{
                  color: BRAND.white,
                  fontSize: 24,
                  fontWeight: 700,
                  margin: 0,
                  fontFamily: "'Approach', 'Inter', system-ui, sans-serif",
                }}
              >
                {STEPS[step].label}
              </h2>
              <span
                style={{ color: BRAND.midGrey, fontSize: 13 }}
              >
                Step {step + 1} of {STEPS.length}
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 2,
                backgroundColor: `${BRAND.midGrey}20`,
                borderRadius: 1,
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: `${((step + 1) / STEPS.length) * 100}%`,
                  height: "100%",
                  backgroundColor: BRAND.cyan,
                  borderRadius: 1,
                  transition: "width 0.3s",
                }}
              />
            </div>

            {renderStep()}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 32,
                paddingTop: 20,
                borderTop: `1px solid ${BRAND.midGrey}20`,
              }}
            >
              <button
                onClick={() => step > 0 && goTo(step - 1)}
                disabled={step === 0}
                style={{
                  padding: "12px 24px",
                  borderRadius: 6,
                  border: `1px solid ${BRAND.midGrey}40`,
                  backgroundColor: "transparent",
                  color: step === 0 ? BRAND.midGrey + "40" : BRAND.white,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: step === 0 ? "default" : "pointer",
                  fontFamily: "'Approach', 'Inter', system-ui, sans-serif",
                }}
              >
                ← Previous
              </button>
              <button
                onClick={() =>
                  step < STEPS.length - 1 && goTo(step + 1)
                }
                disabled={step === STEPS.length - 1}
                style={{
                  padding: "12px 24px",
                  borderRadius: 6,
                  border: "none",
                  backgroundColor:
                    step === STEPS.length - 1 ? BRAND.midGrey + "40" : BRAND.cyan,
                  color: BRAND.dark,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor:
                    step === STEPS.length - 1 ? "default" : "pointer",
                  fontFamily: "'Approach', 'Inter', system-ui, sans-serif",
                }}
              >
                {step === STEPS.length - 1 ? "Complete" : "Next →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
