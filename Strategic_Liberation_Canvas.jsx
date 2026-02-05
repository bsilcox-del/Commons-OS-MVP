import React, { useState, useRef } from 'react';

// ============================================
// STRATEGIC LIBERATION - UX DESIGN
// Commons OS Canvas - Second Key Space
// ============================================
// 
// COMPONENT INVENTORY - NEW FOR STRATEGIC LIBERATION
// (Building on existing Problem Pursuit infrastructure)
//
// SL.1 INITIATIVE SYSTEM
//   SL.1.1 Initiative Card - Core unit for potential actions
//   SL.1.2 Initiative Generator - Divergent thinking capture
//   SL.1.3 Initiative Detail Panel - Full attributes view
//
// SL.2 PRIORITIZATION TOOLS
//   SL.2.1 Matrix View (2x2) - Effort vs Impact plotting
//   SL.2.2 Horizon Timeline - H1/H2/H3 visual layout
//   SL.2.3 Long List Panel - Backlog management
//
// SL.3 VALIDATION FRAMEWORK
//   SL.3.1 WWHTBT Card - "What Would Have To Be True"
//   SL.3.2 Blocker/Enabler Panel - Dependencies tracking
//   SL.3.3 Initiative Audit - "Turn it off" analysis
//   SL.3.4 Business Case Builder - Commercial model
//   SL.3.5 Cross-Functional Matrix - Stakeholder mapping
//
// SL.4 READINESS & OUTPUT
//   SL.4.1 From-To Journey - Transformation visualization
//   SL.4.2 Scenario Card - Board choice options
//   SL.4.3 Activation Timeline - Who/when planning
//   SL.4.4 Readiness Scorecard - Go/no-go checklist
//
// SL.5 WORKSPACE HEADERS
//   SL.5.1 Strategic Choices Workspace
//   SL.5.2 Strategic Validation Workspace
//   SL.5.3 Strategic Readiness Workspace
//
// ============================================

// Color system (consistent with Problem Pursuit)
const colors = {
  teal: '#1A9B9B',
  purple: '#8B5CF6',
  coral: '#E8846B',
  navy: '#2C3E50',
  amber: '#F59E0B',
  blue: '#3B82F6',
  green: '#22C55E',
  red: '#EF4444',
  gray: {
    50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB', 300: '#D1D5DB',
    400: '#9CA3AF', 500: '#6B7280', 600: '#4B5563', 700: '#374151',
    800: '#1F2937', 900: '#111827',
  }
};

// ============================================
// STRATEGIC LIBERATION WORKSPACES
// Three phases matching the methodology
// ============================================
const liberationWorkspaces = {
  choices: {
    id: 'choices',
    name: 'Strategic Choices',
    icon: '💡',
    color: '#8B5CF6',
    phase: 1,
    subtitle: 'Generate and structure possibilities',
    question: 'What could we do?',
    tools: ['Long List', 'Matrix View', 'Horizon Map'],
  },
  validation: {
    id: 'validation',
    name: 'Strategic Validation',
    icon: '🔬',
    color: '#3B82F6',
    phase: 2,
    subtitle: 'Test and strengthen initiatives',
    question: 'What would have to be true?',
    tools: ['WWHTBT Analysis', 'Initiative Audit', 'Business Case'],
  },
  readiness: {
    id: 'readiness',
    name: 'Strategic Readiness',
    icon: '🚀',
    color: '#22C55E',
    phase: 3,
    subtitle: 'Finalize plan for board approval',
    question: 'How do we activate?',
    tools: ['Scenarios', 'From-To Journey', 'Activation Plan'],
  },
};

// Horizon definitions (key Strategic Liberation concept)
const horizons = {
  h1: {
    id: 'h1', name: 'Horizon 1', label: 'Immediate',
    color: '#22C55E', icon: '⚡', timeframe: '0-3 months',
    description: 'In your gift to change. No new money required.',
  },
  h2: {
    id: 'h2', name: 'Horizon 2', label: 'Near-term',
    color: '#F59E0B', icon: '📈', timeframe: '3-12 months',
    description: 'Higher rewards. May require resources from others.',
  },
  h3: {
    id: 'h3', name: 'Horizon 3', label: 'Long-term',
    color: '#8B5CF6', icon: '🔮', timeframe: '12+ months',
    description: 'Fundamental change. New partnerships or models.',
  },
};

// Initiative types
const initiativeTypes = {
  optimize: { id: 'optimize', label: 'Optimize', icon: '⚡', color: '#22C55E', desc: 'Improve existing' },
  build: { id: 'build', label: 'Build', icon: '🔨', color: '#3B82F6', desc: 'Create new capability' },
  transform: { id: 'transform', label: 'Transform', icon: '🔄', color: '#8B5CF6', desc: 'Fundamental change' },
  stop: { id: 'stop', label: 'Stop', icon: '🛑', color: '#EF4444', desc: 'Discontinue activity' },
  reallocate: { id: 'reallocate', label: 'Reallocate', icon: '↔️', color: '#F59E0B', desc: 'Shift resources' },
};

// Initiative statuses
const initiativeStatuses = {
  proposed: { label: 'Proposed', color: '#6B7280', bg: '#F3F4F6' },
  exploring: { label: 'Exploring', color: '#8B5CF6', bg: '#F3E8FF' },
  validating: { label: 'Validating', color: '#F59E0B', bg: '#FEF3C7' },
  validated: { label: 'Validated', color: '#3B82F6', bg: '#DBEAFE' },
  approved: { label: 'Approved', color: '#22C55E', bg: '#DCFCE7' },
  rejected: { label: 'Rejected', color: '#EF4444', bg: '#FEE2E2' },
};

// Demo data
const demoInitiatives = [
  {
    id: 'init-1',
    title: 'Implement Marketing Mix Modelling',
    description: 'Deploy full-funnel MMM to demonstrate ROI to CFO and restore measurement confidence',
    type: 'build',
    horizon: 'h2',
    effort: 'high',
    impact: 'high',
    status: 'validated',
    owner: 'Marketing Analytics',
    investment: 250000,
    expectedReturn: 1200000,
    linkedProblem: 'Measurement infrastructure eroding CFO confidence',
    wwhtbt: [
      { text: 'Finance agrees to shared ROI KPIs', status: 'validated', owner: 'CFO' },
      { text: 'Data infrastructure supports MMM', status: 'testing', owner: 'CTO' },
      { text: 'Agency has required capabilities', status: 'validated', owner: 'Procurement' },
    ],
    blockers: ['Data warehouse gaps', '3-month implementation timeline'],
    enablers: ['CFO mandate for better measurement', 'Existing agency relationship'],
  },
  {
    id: 'init-2',
    title: 'Reallocate events budget to digital',
    description: 'Shift £500k from low-ROI trade events to high-performing digital channels',
    type: 'reallocate',
    horizon: 'h1',
    effort: 'medium',
    impact: 'high',
    status: 'validated',
    owner: 'Brand Marketing',
    investment: 0,
    expectedReturn: 400000,
    linkedProblem: 'Misallocated marketing investment',
    wwhtbt: [
      { text: 'Sales accepts alternative touchpoints', status: 'testing', owner: 'Sales Director' },
      { text: 'Contract exit costs are minimal', status: 'validated', owner: 'Legal' },
    ],
    blockers: ['Sales team relationship concerns'],
    enablers: ['Poor event ROI data available', 'Digital performance benchmarks'],
  },
  {
    id: 'init-3',
    title: 'Discontinue CRM loyalty programme',
    description: 'Stop £1.5m annual spend on underperforming loyalty scheme, reallocate to acquisition',
    type: 'stop',
    horizon: 'h1',
    effort: 'low',
    impact: 'medium',
    status: 'validating',
    owner: 'CRM Team',
    investment: 50000,
    expectedReturn: 1500000,
    linkedProblem: 'Misallocated marketing investment',
    wwhtbt: [
      { text: 'Customer communication plan ready', status: 'untested', owner: 'CRM' },
      { text: 'Legal review of contracts complete', status: 'testing', owner: 'Legal' },
    ],
    blockers: ['Customer backlash risk', 'Existing vendor contracts'],
    enablers: ['Clear underperformance data', 'Board appetite for efficiency'],
  },
  {
    id: 'init-4',
    title: 'Launch customer data platform',
    description: 'Unify first-party data across touchpoints for personalization and attribution',
    type: 'transform',
    horizon: 'h3',
    effort: 'high',
    impact: 'high',
    status: 'exploring',
    owner: 'Marketing Technology',
    investment: 800000,
    expectedReturn: 2000000,
    linkedProblem: 'Measurement infrastructure eroding CFO confidence',
    wwhtbt: [
      { text: 'IT partnership secured', status: 'untested', owner: 'CTO' },
      { text: 'Privacy compliance confirmed', status: 'untested', owner: 'Legal' },
      { text: 'Vendor selection complete', status: 'untested', owner: 'Procurement' },
    ],
    blockers: ['IT capacity constraints', 'Privacy regulation uncertainty', '18-month timeline'],
    enablers: ['Board digital mandate', 'Competitor pressure'],
  },
  {
    id: 'init-5',
    title: 'Quick-win: Optimize paid search structure',
    description: 'Restructure campaigns, improve quality scores for immediate CPA reduction',
    type: 'optimize',
    horizon: 'h1',
    effort: 'low',
    impact: 'medium',
    status: 'approved',
    owner: 'Performance Team',
    investment: 15000,
    expectedReturn: 180000,
    linkedProblem: 'Category growth masking brand weakness',
    wwhtbt: [
      { text: 'Agency capacity available', status: 'validated', owner: 'Agency' },
    ],
    blockers: [],
    enablers: ['Clear benchmarks', 'Agency expertise'],
  },
];

// ============================================
// SL.1.1 INITIATIVE CARD
// Core unit for Strategic Liberation
// ============================================
const InitiativeCard = ({ initiative, isSelected, onSelect, onDragStart, compact = false }) => {
  const horizon = horizons[initiative.horizon];
  const type = initiativeTypes[initiative.type];
  const status = initiativeStatuses[initiative.status];

  const effortDots = { low: 1, medium: 2, high: 3 };
  const impactDots = { low: 1, medium: 2, high: 3 };

  if (compact) {
    return (
      <div
        onClick={() => onSelect?.(initiative)}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData('initiativeId', initiative.id);
          onDragStart?.(e, initiative);
        }}
        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
          isSelected ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-sm">{type.icon}</span>
          <span className="text-sm font-medium text-gray-900 truncate flex-1">{initiative.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span 
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ backgroundColor: horizon.color + '20', color: horizon.color }}
          >
            {horizon.icon} {horizon.label}
          </span>
          <span 
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ backgroundColor: status.bg, color: status.color }}
          >
            {status.label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onSelect?.(initiative)}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('initiativeId', initiative.id);
        onDragStart?.(e, initiative);
      }}
      className={`bg-white rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${
        isSelected ? 'border-teal-500 shadow-lg ring-2 ring-teal-200' : 'border-gray-200 hover:border-gray-300 hover:shadow'
      }`}
    >
      {/* Horizon indicator strip */}
      <div className="h-1.5" style={{ backgroundColor: horizon.color }} />

      <div className="p-4">
        {/* Header badges */}
        <div className="flex items-center gap-2 mb-2">
          <span 
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: type.color + '20', color: type.color }}
          >
            {type.icon} {type.label}
          </span>
          <span 
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: horizon.color + '20', color: horizon.color }}
          >
            {horizon.icon} {horizon.timeframe}
          </span>
          <span 
            className="text-xs px-2 py-0.5 rounded-full ml-auto"
            style={{ backgroundColor: status.bg, color: status.color }}
          >
            {status.label}
          </span>
        </div>

        {/* Title & Description */}
        <h4 className="font-semibold text-gray-900 text-sm mb-1">{initiative.title}</h4>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{initiative.description}</p>

        {/* Effort / Impact indicators */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-400">Effort</span>
            <div className="flex gap-0.5">
              {[1, 2, 3].map(i => (
                <div 
                  key={i}
                  className={`w-2 h-2 rounded-full ${i <= effortDots[initiative.effort] ? 'bg-amber-400' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-400">Impact</span>
            <div className="flex gap-0.5">
              {[1, 2, 3].map(i => (
                <div 
                  key={i}
                  className={`w-2 h-2 rounded-full ${i <= impactDots[initiative.impact] ? 'bg-green-400' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Financial summary */}
        <div className="flex items-center justify-between text-xs border-t border-gray-100 pt-3">
          <span className="text-gray-500">
            {initiative.investment > 0 ? `£${(initiative.investment / 1000).toFixed(0)}k invest` : 'No new investment'}
          </span>
          <span className="font-medium text-green-600">
            £{(initiative.expectedReturn / 1000).toFixed(0)}k return
          </span>
        </div>

        {/* Blockers warning */}
        {initiative.blockers?.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-100">
            <span className="text-xs text-amber-600">
              ⚠️ {initiative.blockers.length} blocker{initiative.blockers.length > 1 ? 's' : ''} to resolve
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// SL.1.2 INITIATIVE GENERATOR
// Divergent thinking capture interface
// ============================================
const InitiativeGenerator = ({ onAdd, linkedProblems = [], onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('optimize');
  const [horizon, setHorizon] = useState('h1');
  const [linkedProblem, setLinkedProblem] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd({
        id: `init-${Date.now()}`,
        title,
        description,
        type,
        horizon,
        linkedProblem,
        effort: 'medium',
        impact: 'medium',
        status: 'proposed',
        owner: 'TBD',
        investment: 0,
        expectedReturn: 0,
        wwhtbt: [],
        blockers: [],
        enablers: [],
      });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="bg-white rounded-xl border-2 border-purple-300 shadow-lg overflow-hidden">
      <div className="px-4 py-3 bg-purple-50 border-b border-purple-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">💡</span>
          <h4 className="font-semibold text-purple-900">Add Initiative</h4>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-purple-400 hover:text-purple-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">What could we do?</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Describe the initiative..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            autoFocus
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Why would this help?</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Expected outcome and rationale..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {Object.values(initiativeTypes).map(t => (
                <option key={t.id} value={t.id}>{t.icon} {t.label} - {t.desc}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Horizon</label>
            <select
              value={horizon}
              onChange={(e) => setHorizon(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {Object.values(horizons).map(h => (
                <option key={h.id} value={h.id}>{h.icon} {h.name} ({h.timeframe})</option>
              ))}
            </select>
          </div>
        </div>

        {linkedProblems.length > 0 && (
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Links to Problem</label>
            <select
              value={linkedProblem}
              onChange={(e) => setLinkedProblem(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select from Problem Pursuit...</option>
              {linkedProblems.map((p, idx) => (
                <option key={idx} value={p}>{p}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
        <button
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          Add to Long List
        </button>
      </div>
    </div>
  );
};

// ============================================
// SL.2.1 MATRIX VIEW (2x2)
// Effort vs Impact prioritization
// ============================================
const MatrixView = ({ initiatives, onSelectInitiative, selectedId }) => {
  const quadrants = [
    { key: 'quickWins', label: 'Quick Wins', icon: '⚡', color: '#22C55E', effort: 'low', impact: 'high', advice: 'Do first' },
    { key: 'bigBets', label: 'Big Bets', icon: '🎯', color: '#8B5CF6', effort: 'high', impact: 'high', advice: 'Plan carefully' },
    { key: 'fillIns', label: 'Fill-ins', icon: '📝', color: '#6B7280', effort: 'low', impact: 'low', advice: 'Do if time' },
    { key: 'hardSlogs', label: 'Hard Slogs', icon: '⚠️', color: '#F59E0B', effort: 'high', impact: 'low', advice: 'Reconsider' },
  ];

  const getQuadrant = (effort, impact) => {
    const isLowEffort = effort === 'low';
    const isHighImpact = impact === 'high' || impact === 'medium';
    if (isLowEffort && isHighImpact) return 'quickWins';
    if (!isLowEffort && isHighImpact) return 'bigBets';
    if (isLowEffort && !isHighImpact) return 'fillIns';
    return 'hardSlogs';
  };

  const grouped = initiatives.reduce((acc, init) => {
    const q = getQuadrant(init.effort, init.impact);
    if (!acc[q]) acc[q] = [];
    acc[q].push(init);
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">📊</span>
          <h3 className="font-semibold text-gray-900">Effort vs Impact Matrix</h3>
        </div>
        <span className="text-xs text-gray-500">{initiatives.length} initiatives plotted</span>
      </div>

      <div className="p-4">
        {/* Axis labels */}
        <div className="flex items-center justify-center mb-2">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            ← Low Effort — High Effort →
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 relative">
          {/* Y-axis label */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">↑ Impact</span>
          </div>

          {quadrants.map(q => (
            <div
              key={q.key}
              className="rounded-xl p-3 min-h-[180px] border-2"
              style={{ 
                backgroundColor: q.color + '08', 
                borderColor: q.color + '30',
                order: q.key === 'quickWins' ? 0 : q.key === 'bigBets' ? 1 : q.key === 'fillIns' ? 2 : 3
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const initId = e.dataTransfer.getData('initiativeId');
                // Handle drop - update initiative effort/impact
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span>{q.icon}</span>
                  <span className="text-xs font-semibold" style={{ color: q.color }}>{q.label}</span>
                </div>
                <span className="text-xs text-gray-400">{grouped[q.key]?.length || 0}</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">{q.advice}</p>
              <div className="space-y-1.5">
                {grouped[q.key]?.map(init => (
                  <button
                    key={init.id}
                    onClick={() => onSelectInitiative?.(init)}
                    className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${
                      selectedId === init.id
                        ? 'bg-white shadow text-gray-900 ring-1 ring-teal-400'
                        : 'bg-white/50 text-gray-700 hover:bg-white'
                    }`}
                  >
                    {init.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// SL.2.2 HORIZON TIMELINE
// H1/H2/H3 visual layout
// ============================================
const HorizonTimeline = ({ initiatives, onSelectInitiative, onMoveToHorizon }) => {
  const grouped = {
    h1: initiatives.filter(i => i.horizon === 'h1'),
    h2: initiatives.filter(i => i.horizon === 'h2'),
    h3: initiatives.filter(i => i.horizon === 'h3'),
  };

  // Calculate totals per horizon
  const totals = Object.entries(grouped).reduce((acc, [key, inits]) => {
    acc[key] = {
      count: inits.length,
      investment: inits.reduce((sum, i) => sum + (i.investment || 0), 0),
      return: inits.reduce((sum, i) => sum + (i.expectedReturn || 0), 0),
    };
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">📅</span>
          <h3 className="font-semibold text-gray-900">Horizon Map</h3>
        </div>
        <span className="text-xs text-gray-500">Drag to reorder</span>
      </div>

      <div className="p-4">
        <div className="flex gap-4">
          {Object.values(horizons).map(horizon => (
            <div
              key={horizon.id}
              className="flex-1 min-w-0"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const initId = e.dataTransfer.getData('initiativeId');
                onMoveToHorizon?.(initId, horizon.id);
              }}
            >
              {/* Horizon header */}
              <div 
                className="rounded-t-xl px-4 py-3 text-white"
                style={{ backgroundColor: horizon.color }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{horizon.icon}</span>
                    <div>
                      <h4 className="font-semibold">{horizon.name}</h4>
                      <p className="text-xs opacity-90">{horizon.timeframe}</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">{totals[horizon.id].count}</span>
                </div>
              </div>

              {/* Description */}
              <div 
                className="px-4 py-2 text-xs border-l border-r"
                style={{ borderColor: horizon.color + '40', backgroundColor: horizon.color + '10' }}
              >
                {horizon.description}
              </div>

              {/* Initiatives */}
              <div 
                className="p-3 border-2 border-t-0 border-dashed rounded-b-xl min-h-[200px]"
                style={{ borderColor: horizon.color + '40' }}
              >
                <div className="space-y-2">
                  {grouped[horizon.id].map(init => (
                    <InitiativeCard
                      key={init.id}
                      initiative={init}
                      compact
                      onSelect={onSelectInitiative}
                    />
                  ))}
                  {grouped[horizon.id].length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-8">
                      Drag initiatives here
                    </p>
                  )}
                </div>
              </div>

              {/* Horizon totals */}
              <div 
                className="mt-2 p-2 rounded-lg text-center"
                style={{ backgroundColor: horizon.color + '10' }}
              >
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">
                    Invest: £{(totals[horizon.id].investment / 1000).toFixed(0)}k
                  </span>
                  <span style={{ color: horizon.color }} className="font-medium">
                    Return: £{(totals[horizon.id].return / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// SL.3.1 WWHTBT CARD
// "What Would Have To Be True" analysis
// ============================================
const WWHTBTCard = ({ initiative, onUpdate }) => {
  const [newCondition, setNewCondition] = useState('');

  const conditionStatuses = {
    untested: { label: 'Untested', color: '#6B7280', icon: '○' },
    testing: { label: 'Testing', color: '#F59E0B', icon: '◐' },
    validated: { label: 'Validated', color: '#22C55E', icon: '●' },
    failed: { label: 'Failed', color: '#EF4444', icon: '✕' },
  };

  const conditions = initiative?.wwhtbt || [];
  const validatedCount = conditions.filter(c => c.status === 'validated').length;
  const progress = conditions.length > 0 ? (validatedCount / conditions.length) * 100 : 0;

  const handleAddCondition = () => {
    if (newCondition.trim() && onUpdate) {
      onUpdate({
        ...initiative,
        wwhtbt: [...conditions, { text: newCondition, status: 'untested', owner: 'TBD' }]
      });
      setNewCondition('');
    }
  };

  const cycleStatus = (index) => {
    const statusOrder = ['untested', 'testing', 'validated', 'failed'];
    const current = conditions[index].status;
    const nextIdx = (statusOrder.indexOf(current) + 1) % statusOrder.length;
    const updated = [...conditions];
    updated[index] = { ...updated[index], status: statusOrder[nextIdx] };
    onUpdate?.({ ...initiative, wwhtbt: updated });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔬</span>
            <div>
              <h4 className="font-semibold text-blue-900">What Would Have To Be True?</h4>
              <p className="text-xs text-blue-700">{initiative?.title || 'Select an initiative'}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-blue-900">{validatedCount}/{conditions.length}</p>
            <p className="text-xs text-blue-600">validated</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Conditions */}
        <div className="space-y-2 mb-4">
          {conditions.map((condition, idx) => {
            const status = conditionStatuses[condition.status];
            return (
              <div 
                key={idx}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg group"
              >
                <button
                  onClick={() => cycleStatus(idx)}
                  className="text-lg mt-0.5 hover:scale-110 transition-transform"
                  style={{ color: status.color }}
                  title={`Status: ${status.label} (click to change)`}
                >
                  {status.icon}
                </button>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{condition.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">Owner: {condition.owner}</span>
                    <span 
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: status.color + '20', color: status.color }}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add new condition */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newCondition}
            onChange={(e) => setNewCondition(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCondition()}
            placeholder="Add a condition that must be true..."
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddCondition}
            disabled={!newCondition.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Add
          </button>
        </div>

        {/* Common suggestions */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Common conditions:</p>
          <div className="flex flex-wrap gap-1">
            {['Budget approval', 'Stakeholder alignment', 'Technical feasibility', 'Regulatory compliance', 'Resource availability'].map(sug => (
              <button
                key={sug}
                onClick={() => setNewCondition(sug)}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
              >
                + {sug}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SL.3.2 BLOCKER/ENABLER PANEL
// Dependencies tracking
// ============================================
const BlockerEnablerPanel = ({ initiative, onUpdate }) => {
  const [newBlocker, setNewBlocker] = useState('');
  const [newEnabler, setNewEnabler] = useState('');

  const blockers = initiative?.blockers || [];
  const enablers = initiative?.enablers || [];

  const addBlocker = () => {
    if (newBlocker.trim() && onUpdate) {
      onUpdate({ ...initiative, blockers: [...blockers, newBlocker] });
      setNewBlocker('');
    }
  };

  const addEnabler = () => {
    if (newEnabler.trim() && onUpdate) {
      onUpdate({ ...initiative, enablers: [...enablers, newEnabler] });
      setNewEnabler('');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900">Blockers & Enablers</h4>
        <p className="text-xs text-gray-500">What's stopping us? What's helping us?</p>
      </div>

      <div className="p-4 grid grid-cols-2 gap-4">
        {/* Blockers */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-red-500">⛔</span>
            <span className="text-sm font-medium text-gray-900">Blockers</span>
            <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full">{blockers.length}</span>
          </div>
          <div className="space-y-1.5 mb-2">
            {blockers.map((b, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-red-50 rounded border border-red-100">
                <span className="text-xs text-red-700 flex-1">{b}</span>
                <button 
                  onClick={() => onUpdate?.({ ...initiative, blockers: blockers.filter((_, i) => i !== idx) })}
                  className="text-red-400 hover:text-red-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            <input
              type="text"
              value={newBlocker}
              onChange={(e) => setNewBlocker(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addBlocker()}
              placeholder="Add blocker..."
              className="flex-1 px-2 py-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <button onClick={addBlocker} className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded">+</button>
          </div>
        </div>

        {/* Enablers */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-green-500">✅</span>
            <span className="text-sm font-medium text-gray-900">Enablers</span>
            <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-600 rounded-full">{enablers.length}</span>
          </div>
          <div className="space-y-1.5 mb-2">
            {enablers.map((e, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-green-50 rounded border border-green-100">
                <span className="text-xs text-green-700 flex-1">{e}</span>
                <button 
                  onClick={() => onUpdate?.({ ...initiative, enablers: enablers.filter((_, i) => i !== idx) })}
                  className="text-green-400 hover:text-green-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            <input
              type="text"
              value={newEnabler}
              onChange={(e) => setNewEnabler(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addEnabler()}
              placeholder="Add enabler..."
              className="flex-1 px-2 py-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <button onClick={addEnabler} className="px-2 py-1 text-xs text-green-600 hover:bg-green-50 rounded">+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SL.3.3 INITIATIVE AUDIT
// "What if we turned this off?" analysis
// ============================================
const InitiativeAudit = ({ initiative, onComplete }) => {
  const [revenueAtRisk, setRevenueAtRisk] = useState('');
  const [dependencies, setDependencies] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const recommendations = [
    { value: 'keep', label: 'Keep - High value', color: '#22C55E' },
    { value: 'optimize', label: 'Optimize - Reduce spend', color: '#3B82F6' },
    { value: 'reallocate', label: 'Reallocate - Redirect funds', color: '#F59E0B' },
    { value: 'sunset', label: 'Sunset - Phase out', color: '#EF4444' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-amber-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔍</span>
          <div>
            <h4 className="font-semibold text-amber-900">Initiative Audit</h4>
            <p className="text-xs text-amber-700">"What would happen if we turned this off tomorrow?"</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Initiative being audited */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-900">{initiative?.title || 'Select existing initiative'}</p>
          <p className="text-xs text-gray-500">
            Current spend: £{((initiative?.investment || 0) / 1000).toFixed(0)}k annually
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Revenue at risk if stopped</label>
            <input
              type="text"
              value={revenueAtRisk}
              onChange={(e) => setRevenueAtRisk(e.target.value)}
              placeholder="e.g., £200k attributed revenue"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Dependencies & knock-on effects</label>
            <textarea
              value={dependencies}
              onChange={(e) => setDependencies(e.target.value)}
              placeholder="e.g., Sales team relies on lead scoring data..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              rows={2}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Recommendation</label>
            <div className="grid grid-cols-2 gap-2">
              {recommendations.map(rec => (
                <button
                  key={rec.value}
                  onClick={() => setRecommendation(rec.value)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    recommendation === rec.value
                      ? 'border-gray-900 shadow'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span 
                    className="text-xs font-medium px-2 py-0.5 rounded"
                    style={{ backgroundColor: rec.color + '20', color: rec.color }}
                  >
                    {rec.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end gap-2">
          <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Skip</button>
          <button 
            onClick={() => onComplete?.({ revenueAtRisk, dependencies, recommendation })}
            disabled={!recommendation}
            className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 disabled:opacity-50"
          >
            Complete Audit
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SL.3.4 BUSINESS CASE BUILDER
// Commercial model for initiatives
// ============================================
const BusinessCaseBuilder = ({ initiative, onUpdate }) => {
  const [investment, setInvestment] = useState(initiative?.investment || 0);
  const [expectedReturn, setExpectedReturn] = useState(initiative?.expectedReturn || 0);
  const [timeToValue, setTimeToValue] = useState(6);
  const [confidenceLevel, setConfidenceLevel] = useState(70);

  const roi = investment > 0 ? ((expectedReturn - investment) / investment * 100).toFixed(0) : 0;
  const paybackMonths = expectedReturn > 0 ? Math.ceil(investment / (expectedReturn / 12)) : 0;
  const netBenefit = expectedReturn - investment;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-green-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">💰</span>
          <div>
            <h4 className="font-semibold text-green-900">Business Case Builder</h4>
            <p className="text-xs text-green-700">Build the commercial model for board approval</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Investment & Return inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Investment Required</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
              <input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(parseInt(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Expected Annual Return</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
              <input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(parseInt(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Time to value slider */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Time to Value</label>
          <input
            type="range"
            min="1"
            max="24"
            value={timeToValue}
            onChange={(e) => setTimeToValue(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 month</span>
            <span className="font-medium text-gray-700">{timeToValue} months</span>
            <span>24 months</span>
          </div>
        </div>

        {/* Confidence slider */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Confidence Level</label>
          <input
            type="range"
            min="0"
            max="100"
            value={confidenceLevel}
            onChange={(e) => setConfidenceLevel(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Low</span>
            <span className={`font-medium ${confidenceLevel >= 70 ? 'text-green-600' : confidenceLevel >= 40 ? 'text-amber-600' : 'text-red-600'}`}>
              {confidenceLevel}%
            </span>
            <span>High</span>
          </div>
        </div>

        {/* Calculated metrics */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{roi}%</p>
            <p className="text-xs text-gray-500">ROI</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{paybackMonths}</p>
            <p className="text-xs text-gray-500">Months to Payback</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className={`text-2xl font-bold ${netBenefit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              £{(netBenefit / 1000).toFixed(0)}k
            </p>
            <p className="text-xs text-gray-500">Net Annual Benefit</p>
          </div>
        </div>

        <button
          onClick={() => onUpdate?.({ ...initiative, investment, expectedReturn, businessCase: { roi, paybackMonths, netBenefit, confidence: confidenceLevel } })}
          className="w-full py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
        >
          Save Business Case
        </button>
      </div>
    </div>
  );
};

// ============================================
// SL.3.5 CROSS-FUNCTIONAL MATRIX
// Stakeholder involvement mapping
// ============================================
const CrossFunctionalMatrix = ({ initiative }) => {
  const stakeholders = [
    { id: 'marketing', name: 'Marketing', icon: '📢' },
    { id: 'finance', name: 'Finance', icon: '💵' },
    { id: 'product', name: 'Product', icon: '📦' },
    { id: 'it', name: 'IT/Tech', icon: '💻' },
    { id: 'sales', name: 'Sales', icon: '🤝' },
    { id: 'legal', name: 'Legal', icon: '⚖️' },
    { id: 'ops', name: 'Operations', icon: '⚙️' },
    { id: 'hr', name: 'HR', icon: '👥' },
  ];

  const involvementLevels = [
    { value: 'lead', label: 'Lead', color: '#8B5CF6' },
    { value: 'approve', label: 'Approve', color: '#EF4444' },
    { value: 'consult', label: 'Consult', color: '#F59E0B' },
    { value: 'inform', label: 'Inform', color: '#6B7280' },
    { value: 'none', label: 'None', color: '#E5E7EB' },
  ];

  const [assignments, setAssignments] = useState({
    marketing: 'lead',
    finance: 'approve',
    product: 'consult',
    it: 'consult',
    sales: 'inform',
    legal: 'consult',
    ops: 'none',
    hr: 'none',
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900">Cross-Functional Involvement</h4>
        <p className="text-xs text-gray-500">"Get the elephants in the room"</p>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-4 gap-2">
          {stakeholders.map(s => {
            const level = involvementLevels.find(l => l.value === assignments[s.id]);
            return (
              <div key={s.id} className="text-center">
                <div className="w-12 h-12 mx-auto mb-1 rounded-xl bg-gray-50 flex items-center justify-center text-xl">
                  {s.icon}
                </div>
                <p className="text-xs font-medium text-gray-900 mb-1">{s.name}</p>
                <select
                  value={assignments[s.id]}
                  onChange={(e) => setAssignments({ ...assignments, [s.id]: e.target.value })}
                  className="w-full text-xs px-1 py-1 border rounded"
                  style={{ 
                    borderColor: level?.color,
                    backgroundColor: level?.color + '20',
                    color: level?.value === 'none' ? '#9CA3AF' : level?.color
                  }}
                >
                  {involvementLevels.map(l => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Involvement levels:</p>
          <div className="flex flex-wrap gap-2">
            {involvementLevels.filter(l => l.value !== 'none').map(l => (
              <span
                key={l.value}
                className="text-xs px-2 py-0.5 rounded text-white"
                style={{ backgroundColor: l.color }}
              >
                {l.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SL.4.1 FROM-TO JOURNEY
// Transformation visualization
// ============================================
const FromToJourney = ({ initiatives }) => {
  const validatedInitiatives = initiatives?.filter(i => i.status === 'validated' || i.status === 'approved') || [];
  const totalInvestment = validatedInitiatives.reduce((sum, i) => sum + (i.investment || 0), 0);
  const totalReturn = validatedInitiatives.reduce((sum, i) => sum + (i.expectedReturn || 0), 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900">From → To Journey</h4>
        <p className="text-xs text-gray-500">The transformation we're proposing to the board</p>
      </div>

      <div className="p-6">
        <div className="flex items-stretch gap-6">
          {/* FROM state */}
          <div className="flex-1 p-4 bg-red-50 rounded-xl border border-red-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📍</span>
              <span className="font-bold text-red-800 text-lg">Today</span>
            </div>
            <div className="space-y-3">
              {[
                { metric: 'Marketing ROI', value: '1.2x', status: 'poor' },
                { metric: 'Attribution', value: 'Last-click only', status: 'poor' },
                { metric: 'CFO Confidence', value: 'Low', status: 'poor' },
                { metric: 'Budget Efficiency', value: '45%', status: 'poor' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.metric}</span>
                  <span className="text-sm font-medium text-red-700">{item.value}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-red-600 italic border-t border-red-200 pt-3">
              "Fragmented measurement, budget under scrutiny"
            </p>
          </div>

          {/* Arrow with initiatives count */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-2">
              <span className="text-2xl">🚀</span>
            </div>
            <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <p className="text-xs text-gray-500 mt-2 text-center font-medium">
              {validatedInitiatives.length} initiatives<br />90 days
            </p>
          </div>

          {/* TO state */}
          <div className="flex-1 p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎯</span>
              <span className="font-bold text-green-800 text-lg">Target</span>
            </div>
            <div className="space-y-3">
              {[
                { metric: 'Marketing ROI', value: '2.5x', status: 'good' },
                { metric: 'Attribution', value: 'Full MMM', status: 'good' },
                { metric: 'CFO Confidence', value: 'High', status: 'good' },
                { metric: 'Budget Efficiency', value: '78%', status: 'good' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.metric}</span>
                  <span className="text-sm font-medium text-green-700">{item.value}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-green-600 italic border-t border-green-200 pt-3">
              "Unified measurement, marketing as growth partner"
            </p>
          </div>
        </div>

        {/* Commercial value */}
        <div className="mt-6 p-4 bg-teal-50 rounded-xl border border-teal-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-teal-700">Total Investment</p>
              <p className="text-2xl font-bold text-teal-900">£{(totalInvestment / 1000).toFixed(0)}k</p>
            </div>
            <div className="text-4xl">→</div>
            <div className="text-right">
              <p className="text-sm text-teal-700">Projected Annual Value</p>
              <p className="text-2xl font-bold text-teal-900">£{(totalReturn / 1000).toFixed(0)}k</p>
            </div>
            <div className="text-right pl-6 border-l border-teal-200">
              <p className="text-sm text-teal-700">Net Benefit</p>
              <p className="text-2xl font-bold text-green-600">£{((totalReturn - totalInvestment) / 1000).toFixed(0)}k</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SL.4.2 SCENARIO CARD
// Board choice options
// ============================================
const ScenarioCard = ({ scenario, isSelected, onSelect }) => {
  const riskColors = {
    low: { bg: '#DCFCE7', text: '#166534' },
    medium: { bg: '#FEF3C7', text: '#854D0E' },
    high: { bg: '#FEE2E2', text: '#991B1B' },
  };

  const risk = riskColors[scenario.riskLevel] || riskColors.medium;

  return (
    <div
      onClick={() => onSelect?.(scenario)}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
        isSelected ? 'border-teal-500 bg-teal-50 shadow-lg' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{scenario.name}</h4>
          <p className="text-xs text-gray-500">{scenario.description}</p>
        </div>
        {isSelected && (
          <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="p-2 bg-gray-50 rounded-lg text-center">
          <p className="text-xs text-gray-500">Investment</p>
          <p className="text-lg font-bold text-gray-900">{scenario.investment}</p>
        </div>
        <div className="p-2 bg-green-50 rounded-lg text-center">
          <p className="text-xs text-gray-500">Return</p>
          <p className="text-lg font-bold text-green-600">{scenario.expectedReturn}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">{scenario.initiatives} initiatives • {scenario.timeline}</span>
        <span 
          className="px-2 py-0.5 rounded-full font-medium"
          style={{ backgroundColor: risk.bg, color: risk.text }}
        >
          {scenario.riskLevel} risk
        </span>
      </div>
    </div>
  );
};

// ============================================
// SL.4.3 ACTIVATION TIMELINE
// Who/when planning
// ============================================
const ActivationTimeline = ({ initiatives }) => {
  const phases = [
    { id: 'w1-2', label: 'Week 1-2', title: 'Quick Wins', color: '#22C55E', initiatives: ['Optimize paid search', 'Budget reallocation'] },
    { id: 'w3-4', label: 'Week 3-4', title: 'Foundation', color: '#3B82F6', initiatives: ['MMM vendor selection', 'Data audit'] },
    { id: 'm2', label: 'Month 2', title: 'Build', color: '#8B5CF6', initiatives: ['MMM implementation', 'CRM sunset planning'] },
    { id: 'm3', label: 'Month 3', title: 'Launch', color: '#F59E0B', initiatives: ['First MMM reports', 'New digital campaigns'] },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900">Activation Timeline</h4>
        <p className="text-xs text-gray-500">90-day implementation roadmap</p>
      </div>

      <div className="p-4">
        <div className="flex gap-2">
          {phases.map((phase, idx) => (
            <div key={phase.id} className="flex-1">
              {/* Phase header */}
              <div 
                className="rounded-t-lg px-3 py-2 text-white text-center"
                style={{ backgroundColor: phase.color }}
              >
                <p className="text-xs font-medium opacity-90">{phase.label}</p>
                <p className="text-sm font-bold">{phase.title}</p>
              </div>

              {/* Phase content */}
              <div 
                className="p-2 border-2 border-t-0 rounded-b-lg min-h-[100px]"
                style={{ borderColor: phase.color + '40' }}
              >
                <div className="space-y-1">
                  {phase.initiatives.map((init, i) => (
                    <div 
                      key={i}
                      className="text-xs p-2 rounded"
                      style={{ backgroundColor: phase.color + '10' }}
                    >
                      {init}
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress indicator */}
              <div className="mt-2 flex justify-center">
                <div 
                  className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-green-500' : 'bg-gray-200'}`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Timeline bar */}
        <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full w-1/4 bg-green-500 rounded-full" />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Today</span>
          <span>90 days</span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SL.4.4 READINESS SCORECARD
// Go/no-go checklist for board
// ============================================
const ReadinessScorecard = ({ initiatives }) => {
  const criteria = [
    { id: 'initiatives', label: 'All initiatives validated', check: true },
    { id: 'business-case', label: 'Business cases complete', check: true },
    { id: 'stakeholders', label: 'Stakeholders aligned', check: true },
    { id: 'blockers', label: 'Blockers addressed', check: false },
    { id: 'timeline', label: 'Timeline agreed', check: true },
    { id: 'resources', label: 'Resources confirmed', check: false },
  ];

  const readiness = Math.round(criteria.filter(c => c.check).length / criteria.length * 100);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-gray-900">Strategic Readiness</h4>
          <p className="text-xs text-gray-500">Board approval checklist</p>
        </div>
        <div className={`text-3xl font-bold ${readiness >= 80 ? 'text-green-600' : readiness >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
          {readiness}%
        </div>
      </div>

      <div className="p-4">
        {/* Progress bar */}
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div 
            className={`h-full transition-all rounded-full ${readiness >= 80 ? 'bg-green-500' : readiness >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
            style={{ width: `${readiness}%` }}
          />
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          {criteria.map(c => (
            <div 
              key={c.id}
              className={`flex items-center gap-3 p-2 rounded-lg ${c.check ? 'bg-green-50' : 'bg-gray-50'}`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${c.check ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                {c.check && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`text-sm ${c.check ? 'text-green-700' : 'text-gray-500'}`}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <button 
          disabled={readiness < 80}
          className={`w-full py-2 text-sm font-medium rounded-lg transition-colors ${
            readiness >= 80 
              ? 'text-white bg-green-600 hover:bg-green-700' 
              : 'text-gray-500 bg-gray-200 cursor-not-allowed'
          }`}
        >
          {readiness >= 80 ? '🚀 Generate Board Pack' : 'Complete checklist to proceed'}
        </button>
      </div>
    </div>
  );
};

// ============================================
// SL.5 WORKSPACE HEADER
// Liberation workspace navigation
// ============================================
const LiberationWorkspaceHeader = ({ workspace, onBack }) => {
  const ws = liberationWorkspaces[workspace];

  return (
    <div 
      className="px-6 py-4 border-b"
      style={{ backgroundColor: ws.color + '10' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: ws.color + '20' }}
          >
            {ws.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span 
                className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                style={{ backgroundColor: ws.color }}
              >
                Phase {ws.phase}
              </span>
              <h2 className="text-lg font-semibold text-gray-900">{ws.name}</h2>
            </div>
            <p className="text-sm text-gray-500">{ws.question}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right mr-4">
            <p className="text-xs text-gray-500">Tools</p>
            <p className="text-sm font-medium text-gray-700">{ws.tools.join(' • ')}</p>
          </div>
          <button 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg"
            style={{ backgroundColor: ws.color }}
          >
            <span>🤖</span>
            Ask Agent
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP - Strategic Liberation Demo
// ============================================
export default function StrategicLiberationCanvas() {
  const [activeWorkspace, setActiveWorkspace] = useState('choices');
  const [initiatives, setInitiatives] = useState(demoInitiatives);
  const [selectedInitiative, setSelectedInitiative] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [showGenerator, setShowGenerator] = useState(false);

  const handleAddInitiative = (newInit) => {
    setInitiatives([...initiatives, newInit]);
    setShowGenerator(false);
  };

  const handleUpdateInitiative = (updated) => {
    setInitiatives(initiatives.map(i => i.id === updated.id ? updated : i));
    setSelectedInitiative(updated);
  };

  const handleMoveToHorizon = (initId, horizonId) => {
    setInitiatives(initiatives.map(i => i.id === initId ? { ...i, horizon: horizonId } : i));
  };

  const scenarios = [
    { id: 'a', name: 'Full Transformation', description: 'Maximum investment, maximum return', investment: '£1.1M', expectedReturn: '£5.3M', initiatives: 5, timeline: '12 months', riskLevel: 'medium' },
    { id: 'b', name: 'Phased Approach', description: 'Lower risk, staged investment', investment: '£400k', expectedReturn: '£2.2M', initiatives: 3, timeline: '18 months', riskLevel: 'low' },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">SL</span>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Strategic Liberation</h1>
            <p className="text-xs text-gray-500">From Problem to Choices & Actionable Plan</p>
          </div>
        </div>

        {/* Workspace tabs */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {Object.values(liberationWorkspaces).map(ws => (
            <button
              key={ws.id}
              onClick={() => setActiveWorkspace(ws.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeWorkspace === ws.id ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{ws.icon}</span>
              <span>{ws.name}</span>
            </button>
          ))}
        </div>

        <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
          Reorientation Phase 2
        </span>
      </div>

      {/* Workspace Header */}
      <LiberationWorkspaceHeader workspace={activeWorkspace} />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* STRATEGIC CHOICES WORKSPACE */}
        {activeWorkspace === 'choices' && (
          <>
            {/* Left: Initiative List */}
            <div className="w-96 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Long List</h3>
                  <p className="text-xs text-gray-500">{initiatives.length} possibilities captured</p>
                </div>
                <button 
                  onClick={() => setShowGenerator(true)}
                  className="text-xs px-3 py-1.5 text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100"
                >
                  + Add
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-3">
                {showGenerator && (
                  <InitiativeGenerator
                    onAdd={handleAddInitiative}
                    onClose={() => setShowGenerator(false)}
                    linkedProblems={['Measurement infrastructure eroding CFO confidence', 'Category growth masking brand weakness', 'Misallocated marketing investment']}
                  />
                )}
                {initiatives.map(init => (
                  <InitiativeCard
                    key={init.id}
                    initiative={init}
                    isSelected={selectedInitiative?.id === init.id}
                    onSelect={setSelectedInitiative}
                  />
                ))}
              </div>
            </div>

            {/* Center: Matrix & Horizon */}
            <div className="flex-1 overflow-auto p-6 space-y-6">
              <MatrixView
                initiatives={initiatives}
                selectedId={selectedInitiative?.id}
                onSelectInitiative={setSelectedInitiative}
              />
              <HorizonTimeline
                initiatives={initiatives}
                onSelectInitiative={setSelectedInitiative}
                onMoveToHorizon={handleMoveToHorizon}
              />
            </div>

            {/* Right: Details */}
            <div className="w-80 bg-white border-l border-gray-200 overflow-auto p-4">
              {selectedInitiative ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-1">{selectedInitiative.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{selectedInitiative.description}</p>
                    <p className="text-xs text-gray-400">Owner: {selectedInitiative.owner}</p>
                  </div>
                  <BlockerEnablerPanel initiative={selectedInitiative} onUpdate={handleUpdateInitiative} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="text-4xl mb-4">👆</span>
                  <p className="text-sm text-gray-500">Select an initiative to see details</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* STRATEGIC VALIDATION WORKSPACE */}
        {activeWorkspace === 'validation' && (
          <>
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                <WWHTBTCard initiative={selectedInitiative || demoInitiatives[0]} onUpdate={handleUpdateInitiative} />
                <div className="grid grid-cols-2 gap-6">
                  <BusinessCaseBuilder initiative={selectedInitiative || demoInitiatives[0]} onUpdate={handleUpdateInitiative} />
                  <CrossFunctionalMatrix initiative={selectedInitiative || demoInitiatives[0]} />
                </div>
                <InitiativeAudit initiative={demoInitiatives[2]} />
              </div>
            </div>
            <div className="w-80 bg-white border-l border-gray-200 overflow-auto p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Initiatives to Validate</h3>
              <div className="space-y-2">
                {initiatives.map(init => (
                  <InitiativeCard
                    key={init.id}
                    initiative={init}
                    compact
                    isSelected={selectedInitiative?.id === init.id}
                    onSelect={setSelectedInitiative}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* STRATEGIC READINESS WORKSPACE */}
        {activeWorkspace === 'readiness' && (
          <>
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Scenarios */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Board Scenarios</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {scenarios.map(s => (
                      <ScenarioCard
                        key={s.id}
                        scenario={s}
                        isSelected={selectedScenario === s.id}
                        onSelect={() => setSelectedScenario(s.id)}
                      />
                    ))}
                  </div>
                </div>

                <FromToJourney initiatives={initiatives} />
                <ActivationTimeline initiatives={initiatives} />
              </div>
            </div>
            <div className="w-80 bg-white border-l border-gray-200 overflow-auto p-4 space-y-4">
              <ReadinessScorecard initiatives={initiatives} />

              {/* CMO Outcomes */}
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3">🎯 CMO Empowerment</h4>
                <div className="space-y-2">
                  {[
                    { icon: '🔍', label: 'Clarity', desc: 'On what it takes to win' },
                    { icon: '💪', label: 'Confidence', desc: 'In the decisions made' },
                    { icon: '🦁', label: 'Courage', desc: 'To back them fully' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3 p-2 bg-white rounded-lg">
                      <span className="text-lg">{item.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
