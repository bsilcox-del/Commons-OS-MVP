import React, { useState } from 'react';

// ============================================
// RELENTLESS APPLICATION CANVAS
// Commons OS - Fourth Key Space
// "The kinetic energy that fights inertia"
// ============================================
//
// DESIGN PRINCIPLE: This space is about DOING, not DECIDING.
// The UI must feel operational, action-oriented, and rhythmic.
// Every component should answer: "What happens next?"
//
// REUSED COMPONENTS (from existing spaces):
//   - Workspace Header (all spaces)
//   - Blocker/Enabler Panel (Strategic Liberation SL.3.2)
//   - Initiative Cards (Strategic Liberation SL.1.1 — as inputs)
//   - Horizon framework (Strategic Liberation SL.2.2)
//   - Stakeholder Card (Client Success CS.1.2)
//   - Momentum Tracker (Client Success CS.4.4)
//
// NEW COMPONENTS — RELENTLESS APPLICATION ONLY:
//
// RA.1 WORK DESIGN MODULE
//   RA.1.1 Blueprint Card — Operational change unit
//   RA.1.2 Team Design Panel — Roles, responsibilities, reshaping
//   RA.1.3 Metrics Framework — Leading/lagging indicators
//   RA.1.4 Ways of Working Card — Behavioural shifts
//
// RA.2 STRATEGIC PLANNING MODULE
//   RA.2.1 Budget Reallocation View — Stop/start/shift
//   RA.2.2 Investment Timeline — OPEX/CAPEX phasing
//   RA.2.3 Divestment Tracker — What we're stopping
//
// RA.3 STRATEGIC IMPLEMENTATION MODULE
//   RA.3.1 Course of Action Card — Sequenced execution
//   RA.3.2 POC / Mini-Op Model — Proof of concept tracker
//   RA.3.3 Drumbeat Dashboard — Feedback loop & sponsor rhythm
//   RA.3.4 Decision Framework Card — Empowerment guardrails
//
// RA.4 CAPABILITY INVESTMENT MODULE
//   RA.4.1 Capability Gap Map — Skills needed vs available
//   RA.4.2 Upskill Tracker — Training & coaching progress
//   RA.4.3 Cross-Unit Alignment — Business unit coordination
//
// RA.5 UNIVERSAL
//   RA.5.1 Strategic Productivity Score — Overall execution health
//   RA.5.2 Pattern of Play Card — Embedded behavioral change
//
// ============================================

// Workspace definitions - 4 modules from the methodology
const relentlessWorkspaces = {
  workDesign: {
    id: 'workDesign',
    name: 'Work Design',
    icon: '📐',
    color: '#F97316',
    subtitle: 'Blueprint for operational change',
    question: 'Do teams know what to do, how to do it, and how success is measured?',
    outcome: 'Your teams know what to do, how to do it, and how success is measured.',
    tools: ['Blueprint', 'Team Design', 'Metrics Framework', 'Ways of Working'],
  },
  strategicPlanning: {
    id: 'strategicPlanning',
    name: 'Strategic Planning',
    icon: '💰',
    color: '#0EA5E9',
    subtitle: 'Investment aligned to execution',
    question: "Are you investing in what matters and divesting from what doesn't?",
    outcome: "You're investing in what matters and divesting from what doesn't—with commercial justification.",
    tools: ['Budget Reallocation', 'Investment Timeline', 'Divestment Tracker'],
  },
  implementation: {
    id: 'implementation',
    name: 'Strategic Implementation',
    icon: '⚡',
    color: '#8B5CF6',
    subtitle: 'Sequenced action with feedback loops',
    question: 'Is execution happening with speed, not endless meetings?',
    outcome: 'Execution happens with speed and effectiveness, not endless meetings and rework.',
    tools: ['Courses of Action', 'POC Tracker', 'Drumbeat', 'Decision Frameworks'],
  },
  capability: {
    id: 'capability',
    name: 'Capability Investment',
    icon: '🎓',
    color: '#22C55E',
    subtitle: 'Teams upskilled and performing',
    question: "Are you bottlenecked by capability gaps?",
    outcome: "You're not bottlenecked by capability gaps—teams are upskilled and performing.",
    tools: ['Capability Gap Map', 'Upskill Tracker', 'Cross-Unit Alignment'],
  },
};

// Demo data - initiatives flowing in from Strategic Liberation
const approvedInitiatives = [
  { id: 'init-1', title: 'Marketing Mix Modelling', horizon: 'h2', status: 'in-flight', owner: 'Analytics', progress: 35 },
  { id: 'init-2', title: 'Events → Digital reallocation', horizon: 'h1', status: 'complete', owner: 'Brand', progress: 100 },
  { id: 'init-3', title: 'CRM programme sunset', horizon: 'h1', status: 'in-flight', owner: 'CRM', progress: 60 },
  { id: 'init-5', title: 'Paid search restructure', horizon: 'h1', status: 'complete', owner: 'Performance', progress: 100 },
  { id: 'init-4', title: 'Customer data platform', horizon: 'h3', status: 'planning', owner: 'MarTech', progress: 10 },
];

// ============================================
// RA.1.1 BLUEPRINT CARD
// Operational change unit — the "what needs to change"
// ============================================
const BlueprintCard = ({ blueprint, isSelected, onSelect }) => {
  const statusConfig = {
    draft: { label: 'Draft', color: '#6B7280' },
    agreed: { label: 'Agreed', color: '#3B82F6' },
    'in-progress': { label: 'In Progress', color: '#F97316' },
    embedded: { label: 'Embedded', color: '#22C55E' },
  };

  const status = statusConfig[blueprint.status];

  return (
    <div
      onClick={() => onSelect?.(blueprint)}
      className={`bg-white rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${
        isSelected ? 'border-orange-500 shadow-lg ring-2 ring-orange-200' : 'border-gray-200 hover:border-gray-300 hover:shadow'
      }`}
    >
      <div className="h-1.5 bg-orange-500" />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-gray-900 text-sm">{blueprint.title}</h4>
          <span 
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: status.color + '20', color: status.color }}
          >
            {status.label}
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-3">{blueprint.description}</p>

        {/* Change dimensions */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {blueprint.dimensions.map((dim, idx) => (
            <div key={idx} className="text-center p-2 bg-orange-50 rounded-lg">
              <span className="text-lg block mb-0.5">{dim.icon}</span>
              <span className="text-xs text-orange-700">{dim.label}</span>
            </div>
          ))}
        </div>

        {/* Teams affected */}
        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
          <span>{blueprint.teams.length} teams involved</span>
          <span className="font-medium" style={{ color: status.color }}>
            {blueprint.completionPct}% complete
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// RA.1.2 TEAM DESIGN PANEL
// Roles, responsibilities, reshaping
// ============================================
const TeamDesignPanel = ({ team }) => {
  const roleChanges = [
    { role: 'Marketing Analyst', from: 'Report production', to: 'Insight generation & MMM interpretation', status: 'transitioning' },
    { role: 'Brand Manager', from: 'Campaign execution', to: 'Brand strategy & measurement lead', status: 'planned' },
    { role: 'Digital Lead', from: 'Channel management', to: 'Full-funnel performance ownership', status: 'active' },
  ];

  const statusColors = {
    planned: '#6B7280',
    transitioning: '#F97316',
    active: '#22C55E',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-orange-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">👥</span>
          <div>
            <h4 className="font-semibold text-orange-900">Team Design</h4>
            <p className="text-xs text-orange-700">Designing work with people, not just for them</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {roleChanges.map((change, idx) => (
          <div key={idx} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">{change.role}</span>
              <span 
                className="text-xs px-2 py-0.5 rounded-full capitalize"
                style={{ backgroundColor: statusColors[change.status] + '20', color: statusColors[change.status] }}
              >
                {change.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-2 bg-red-50 rounded text-xs text-red-700 border border-red-100">
                <span className="font-medium">From:</span> {change.from}
              </div>
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="flex-1 p-2 bg-green-50 rounded text-xs text-green-700 border border-green-100">
                <span className="font-medium">To:</span> {change.to}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between">
        <button className="text-xs text-orange-600 hover:text-orange-700 font-medium">+ Add role change</button>
        <button className="text-xs text-gray-500 hover:text-gray-700">View org chart</button>
      </div>
    </div>
  );
};

// ============================================
// RA.1.3 METRICS FRAMEWORK
// Leading/lagging indicators tied to outcomes
// ============================================
const MetricsFramework = ({ initiative }) => {
  const metrics = [
    { id: 'm1', name: 'Return on Ad Spend', type: 'lagging', target: '2.5x', current: '1.4x', trend: 'up', owner: 'Performance' },
    { id: 'm2', name: 'Attribution coverage', type: 'leading', target: '80%', current: '35%', trend: 'up', owner: 'Analytics' },
    { id: 'm3', name: 'CFO confidence score', type: 'lagging', target: '8/10', current: '5/10', trend: 'stable', owner: 'CMO' },
    { id: 'm4', name: 'Data quality index', type: 'leading', target: '95%', current: '72%', trend: 'up', owner: 'Data Team' },
    { id: 'm5', name: 'Budget reallocation %', type: 'leading', target: '30%', current: '18%', trend: 'up', owner: 'Finance' },
  ];

  const trendIcons = { up: '↑', down: '↓', stable: '→' };
  const trendColors = { up: '#22C55E', down: '#EF4444', stable: '#6B7280' };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">📏</span>
            <h3 className="font-semibold text-gray-900">Metrics Framework</h3>
          </div>
          <div className="flex gap-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Leading</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">Lagging</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500">
              <th className="px-4 py-2 text-left">Metric</th>
              <th className="px-3 py-2 text-center">Type</th>
              <th className="px-3 py-2 text-center">Current</th>
              <th className="px-3 py-2 text-center">Target</th>
              <th className="px-3 py-2 text-center">Trend</th>
              <th className="px-3 py-2 text-left">Owner</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric, idx) => (
              <tr key={metric.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 font-medium text-gray-900">{metric.name}</td>
                <td className="px-3 py-3 text-center">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    metric.type === 'leading' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {metric.type}
                  </span>
                </td>
                <td className="px-3 py-3 text-center font-mono text-gray-700">{metric.current}</td>
                <td className="px-3 py-3 text-center font-mono text-gray-900 font-medium">{metric.target}</td>
                <td className="px-3 py-3 text-center">
                  <span className="text-lg" style={{ color: trendColors[metric.trend] }}>
                    {trendIcons[metric.trend]}
                  </span>
                </td>
                <td className="px-3 py-3 text-xs text-gray-500">{metric.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <button className="text-xs text-orange-600 hover:text-orange-700 font-medium">+ Add metric</button>
        <span className="text-xs text-gray-500">Updated weekly • Next review: Friday</span>
      </div>
    </div>
  );
};

// ============================================
// RA.1.4 WAYS OF WORKING CARD
// Behavioural & cultural shift tracker
// ============================================
const WaysOfWorkingCard = ({ patterns }) => {
  const demoPatterns = patterns || [
    { id: 'p1', from: 'Annual budget cycles', to: 'Quarterly investment reviews', status: 'embedding', icon: '🔄' },
    { id: 'p2', from: 'Channel-siloed reporting', to: 'Cross-channel performance huddles', status: 'active', icon: '📊' },
    { id: 'p3', from: 'Agency briefs by email', to: 'Co-creation sprints with agency partners', status: 'planned', icon: '🤝' },
    { id: 'p4', from: 'Gut-feel decisions', to: 'Evidence-based decision framework', status: 'embedding', icon: '🧠' },
  ];

  const statusConfig = {
    planned: { label: 'Planned', color: '#6B7280', pct: 0 },
    active: { label: 'Active', color: '#F97316', pct: 50 },
    embedding: { label: 'Embedding', color: '#3B82F6', pct: 75 },
    embedded: { label: 'Embedded', color: '#22C55E', pct: 100 },
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-orange-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔄</span>
          <div>
            <h4 className="font-semibold text-orange-900">Ways of Working</h4>
            <p className="text-xs text-orange-700">Doing things differently, not just talking differently</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {demoPatterns.map(pattern => {
          const status = statusConfig[pattern.status];
          return (
            <div key={pattern.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{pattern.icon}</span>
                  <span 
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: status.color + '20', color: status.color }}
                  >
                    {status.label}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded flex-1 text-center">{pattern.from}</span>
                <span className="text-gray-400 text-sm">→</span>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded flex-1 text-center">{pattern.to}</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ width: `${status.pct}%`, backgroundColor: status.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// RA.2.1 BUDGET REALLOCATION VIEW
// Stop/start/shift investment
// ============================================
const BudgetReallocationView = () => {
  const allocations = [
    { id: 'b1', activity: 'Trade events programme', action: 'stop', current: 500000, proposed: 0, rationale: 'Low ROI, digital alternatives available' },
    { id: 'b2', activity: 'CRM loyalty programme', action: 'reduce', current: 1500000, proposed: 300000, rationale: 'Sunset phase — retain core only' },
    { id: 'b3', activity: 'Paid search campaigns', action: 'maintain', current: 800000, proposed: 800000, rationale: 'Performing well, optimise in place' },
    { id: 'b4', activity: 'Marketing Mix Modelling', action: 'invest', current: 0, proposed: 250000, rationale: 'Board-approved measurement capability' },
    { id: 'b5', activity: 'Digital performance', action: 'invest', current: 200000, proposed: 700000, rationale: 'Absorbs reallocated events budget' },
  ];

  const actionConfig = {
    stop: { label: 'Stop', color: '#EF4444', icon: '🛑' },
    reduce: { label: 'Reduce', color: '#F59E0B', icon: '📉' },
    maintain: { label: 'Maintain', color: '#6B7280', icon: '➡️' },
    invest: { label: 'Invest', color: '#22C55E', icon: '📈' },
  };

  const totalCurrent = allocations.reduce((sum, a) => sum + a.current, 0);
  const totalProposed = allocations.reduce((sum, a) => sum + a.proposed, 0);
  const netChange = totalProposed - totalCurrent;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-sky-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">💰</span>
            <div>
              <h3 className="font-semibold text-sky-900">Budget Reallocation</h3>
              <p className="text-xs text-sky-700">Investing in what matters, divesting from what doesn't</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-lg font-bold ${netChange <= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {netChange <= 0 ? '↓' : '↑'} £{(Math.abs(netChange) / 1000).toFixed(0)}k net
            </p>
            <p className="text-xs text-gray-500">budget neutral ✓</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {allocations.map(alloc => {
          const action = actionConfig[alloc.action];
          const change = alloc.proposed - alloc.current;
          return (
            <div key={alloc.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span>{action.icon}</span>
                  <span className="text-sm font-medium text-gray-900">{alloc.activity}</span>
                  <span 
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: action.color + '20', color: action.color }}
                  >
                    {action.label}
                  </span>
                </div>
                <span className={`text-sm font-bold ${change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                  {change > 0 ? '+' : ''}£{(change / 1000).toFixed(0)}k
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">Current:</span>
                  <span className="text-gray-600 font-mono">£{(alloc.current / 1000).toFixed(0)}k</span>
                </div>
                <span className="text-gray-300">→</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">Proposed:</span>
                  <span className="font-mono font-medium" style={{ color: action.color }}>£{(alloc.proposed / 1000).toFixed(0)}k</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1">{alloc.rationale}</p>
            </div>
          );
        })}
      </div>

      {/* Summary bar */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2">Reallocation flow</p>
        <div className="flex h-4 rounded-full overflow-hidden">
          {allocations.filter(a => a.proposed > 0).map(alloc => {
            const pct = (alloc.proposed / totalProposed) * 100;
            const action = actionConfig[alloc.action];
            return (
              <div 
                key={alloc.id}
                className="h-full"
                style={{ width: `${pct}%`, backgroundColor: action.color }}
                title={`${alloc.activity}: £${(alloc.proposed / 1000).toFixed(0)}k`}
              />
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>£0</span>
          <span>£{(totalProposed / 1000).toFixed(0)}k total proposed</span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// RA.3.1 COURSE OF ACTION CARD
// Sequenced execution plans
// ============================================
const CourseOfActionCard = ({ course, isSelected, onSelect }) => {
  const phaseColors = ['#22C55E', '#3B82F6', '#8B5CF6', '#F97316'];

  return (
    <div
      onClick={() => onSelect?.(course)}
      className={`bg-white rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${
        isSelected ? 'border-purple-500 shadow-lg ring-2 ring-purple-200' : 'border-gray-200 hover:border-gray-300 hover:shadow'
      }`}
    >
      <div className="h-1.5 bg-purple-500" />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">{course.title}</h4>
            <p className="text-xs text-gray-500">{course.initiative}</p>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            course.status === 'active' ? 'bg-purple-100 text-purple-700' :
            course.status === 'complete' ? 'bg-green-100 text-green-700' :
            'bg-gray-100 text-gray-600'
          }`}>
            {course.status === 'active' ? '▶ Active' : course.status === 'complete' ? '✓ Complete' : '○ Planned'}
          </span>
        </div>

        {/* Action sequence */}
        <div className="flex items-center gap-1 mb-3">
          {course.steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div 
                className={`flex-1 h-8 rounded flex items-center justify-center text-xs font-medium text-white ${
                  step.done ? 'opacity-100' : 'opacity-40'
                }`}
                style={{ backgroundColor: phaseColors[idx % phaseColors.length] }}
                title={step.label}
              >
                {step.done ? '✓' : idx + 1}
              </div>
              {idx < course.steps.length - 1 && (
                <svg className="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Current step detail */}
        <div className="p-2 bg-purple-50 rounded-lg border border-purple-100">
          <p className="text-xs text-purple-600 font-medium mb-0.5">Current step:</p>
          <p className="text-sm text-purple-900">{course.currentStep}</p>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
          <span>Owner: {course.owner}</span>
          <span>Due: {course.deadline}</span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// RA.3.2 POC / MINI-OP MODEL
// Proof of concept tracker
// ============================================
const POCTracker = ({ pocs }) => {
  const demoPOCs = pocs || [
    {
      id: 'poc1',
      name: 'MMM Pilot — UK Retail',
      description: 'Mini-op model: dedicated team of 4 (2 client + 2 S+T) to prove MMM value on one business unit',
      status: 'active',
      team: ['Analytics Lead (Client)', 'Data Scientist (S+T)', 'Performance Mgr (Client)', 'Consultant (S+T)'],
      duration: '8 weeks',
      week: 5,
      totalWeeks: 8,
      hypothesis: 'MMM can demonstrate 30% improvement in budget allocation decisions',
      successMetric: 'CFO accepts MMM as primary measurement framework',
      learnings: ['Data quality better than expected', 'Finance buy-in growing'],
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-purple-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">🧪</span>
          <div>
            <h4 className="font-semibold text-purple-900">Proof of Concepts</h4>
            <p className="text-xs text-purple-700">Mini-op models — demonstrating the art of the possible</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {demoPOCs.map(poc => (
          <div key={poc.id} className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{poc.name}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{poc.description}</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">
                Week {poc.week} of {poc.totalWeeks}
              </span>
            </div>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full transition-all"
                  style={{ width: `${(poc.week / poc.totalWeeks) * 100}%` }}
                />
              </div>
            </div>

            {/* Team */}
            <div className="mb-3">
              <p className="text-xs font-medium text-gray-600 mb-1">Dedicated team:</p>
              <div className="flex flex-wrap gap-1">
                {poc.team.map((member, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-white rounded border border-gray-200">
                    {member}
                  </span>
                ))}
              </div>
            </div>

            {/* Hypothesis & Success metric */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-2 bg-blue-50 rounded border border-blue-100">
                <p className="text-xs text-blue-600 font-medium">Hypothesis</p>
                <p className="text-xs text-blue-800 mt-0.5">{poc.hypothesis}</p>
              </div>
              <div className="p-2 bg-green-50 rounded border border-green-100">
                <p className="text-xs text-green-600 font-medium">Success looks like</p>
                <p className="text-xs text-green-800 mt-0.5">{poc.successMetric}</p>
              </div>
            </div>

            {/* Learnings */}
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Learnings so far:</p>
              <div className="space-y-1">
                {poc.learnings.map((learning, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <span className="text-green-500">●</span>
                    <span className="text-gray-700">{learning}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// RA.3.3 DRUMBEAT DASHBOARD
// Feedback loop & sponsor rhythm
// ============================================
const DrumbeatDashboard = () => {
  const drumbeats = [
    { id: 'd1', type: 'sponsor-update', label: 'CMO Weekly Sync', frequency: 'Weekly', next: 'Friday 10am', status: 'scheduled', attendees: 'Sarah, S+T Lead' },
    { id: 'd2', type: 'team-standup', label: 'Execution Stand-up', frequency: 'Bi-weekly', next: 'Monday', status: 'scheduled', attendees: 'Working team' },
    { id: 'd3', type: 'board-update', label: 'Board Progress Report', frequency: 'Monthly', next: 'Feb 28', status: 'prep-needed', attendees: 'CMO, CFO, CEO' },
    { id: 'd4', type: 'learning-review', label: 'POC Learning Review', frequency: 'Fortnightly', next: 'Next Weds', status: 'scheduled', attendees: 'POC team + sponsors' },
  ];

  const typeConfig = {
    'sponsor-update': { color: '#EC4899', icon: '🎯' },
    'team-standup': { color: '#F97316', icon: '⚡' },
    'board-update': { color: '#8B5CF6', icon: '📊' },
    'learning-review': { color: '#22C55E', icon: '🧠' },
  };

  const statusConfig = {
    scheduled: { label: 'Scheduled', color: '#22C55E' },
    'prep-needed': { label: 'Prep needed', color: '#F59E0B' },
    overdue: { label: 'Overdue', color: '#EF4444' },
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-lg">🥁</span>
          <div>
            <h3 className="font-semibold text-gray-900">Drumbeat</h3>
            <p className="text-xs text-gray-500">Maintaining momentum through rhythm and visibility</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {drumbeats.map(beat => {
          const type = typeConfig[beat.type];
          const status = statusConfig[beat.status];
          return (
            <div 
              key={beat.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                style={{ backgroundColor: type.color + '20' }}
              >
                {type.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{beat.label}</p>
                <p className="text-xs text-gray-500">{beat.frequency} • {beat.attendees}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{beat.next}</p>
                <span 
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: status.color + '20', color: status.color }}
                >
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">+ Add rhythm</button>
        <span className="text-xs text-gray-400">Momentum over perfection</span>
      </div>
    </div>
  );
};

// ============================================
// RA.3.4 DECISION FRAMEWORK CARD
// Empowerment guardrails
// ============================================
const DecisionFrameworkCard = () => {
  const decisions = [
    { level: 'Team can decide', color: '#22C55E', examples: ['Channel optimisation', 'Creative testing', 'A/B experiments'], icon: '✅' },
    { level: 'Team + Lead approval', color: '#3B82F6', examples: ['Budget shifts < £10k', 'New vendor trials', 'Process changes'], icon: '👤' },
    { level: 'CMO sign-off', color: '#F59E0B', examples: ['Budget shifts > £10k', 'Team restructures', 'Agency changes'], icon: '🔑' },
    { level: 'Board approval', color: '#EF4444', examples: ['New headcount', 'CAPEX > £100k', 'Strategy pivots'], icon: '🏛️' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚖️</span>
          <h3 className="font-semibold text-gray-900">Decision Framework</h3>
        </div>
        <p className="text-xs text-gray-500">Who can decide what — clear empowerment guardrails</p>
      </div>

      <div className="p-4 space-y-2">
        {decisions.map((level, idx) => (
          <div 
            key={idx}
            className="p-3 rounded-lg border-l-4"
            style={{ borderLeftColor: level.color, backgroundColor: level.color + '08' }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span>{level.icon}</span>
              <span className="text-sm font-medium text-gray-900">{level.level}</span>
            </div>
            <div className="flex flex-wrap gap-1 ml-7">
              {level.examples.map((ex, i) => (
                <span key={i} className="text-xs px-2 py-0.5 bg-white rounded text-gray-600">{ex}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// RA.4.1 CAPABILITY GAP MAP
// Skills needed vs available
// ============================================
const CapabilityGapMap = () => {
  const capabilities = [
    { name: 'Marketing Mix Modelling', needed: 90, current: 25, gap: 'critical', plan: 'External hire + agency partnership' },
    { name: 'Data storytelling', needed: 80, current: 45, gap: 'significant', plan: 'Training programme — 6 weeks' },
    { name: 'Performance marketing', needed: 85, current: 70, gap: 'minor', plan: 'Upskill existing team' },
    { name: 'Budget management', needed: 75, current: 60, gap: 'minor', plan: 'Finance partnership & coaching' },
    { name: 'Customer analytics', needed: 90, current: 30, gap: 'critical', plan: 'CDP vendor + 2 new hires' },
  ];

  const gapConfig = {
    critical: { color: '#EF4444', label: 'Critical Gap' },
    significant: { color: '#F59E0B', label: 'Significant Gap' },
    minor: { color: '#22C55E', label: 'Minor Gap' },
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-green-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <div>
            <h3 className="font-semibold text-green-900">Capability Gap Map</h3>
            <p className="text-xs text-green-700">Where are we bottlenecked?</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {capabilities.map((cap, idx) => {
          const gap = gapConfig[cap.gap];
          return (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{cap.name}</span>
                <span 
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: gap.color + '20', color: gap.color }}
                >
                  {gap.label}
                </span>
              </div>

              {/* Dual bar */}
              <div className="relative h-5 bg-gray-100 rounded-full overflow-hidden mb-1">
                <div 
                  className="absolute top-0 left-0 h-full bg-green-200 rounded-full"
                  style={{ width: `${cap.needed}%` }}
                />
                <div 
                  className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                  style={{ width: `${cap.current}%` }}
                />
                {/* Gap indicator */}
                <div 
                  className="absolute top-0 h-full opacity-20"
                  style={{ 
                    left: `${cap.current}%`, 
                    width: `${cap.needed - cap.current}%`,
                    backgroundColor: gap.color 
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Current: {cap.current}%</span>
                <span>Needed: {cap.needed}%</span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Plan: {cap.plan}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// RA.5.1 STRATEGIC PRODUCTIVITY SCORE
// Overall execution health — the heartbeat
// ============================================
const StrategicProductivityScore = ({ initiatives }) => {
  const inits = initiatives || approvedInitiatives;
  const completePct = Math.round(inits.filter(i => i.status === 'complete').length / inits.length * 100);
  const avgProgress = Math.round(inits.reduce((sum, i) => sum + i.progress, 0) / inits.length);

  const dimensions = [
    { label: 'Execution velocity', value: 72, icon: '⚡' },
    { label: 'Blocker resolution', value: 65, icon: '🔓' },
    { label: 'Behavioural adoption', value: 55, icon: '🔄' },
    { label: 'Sponsor engagement', value: 88, icon: '🤝' },
  ];

  const getColor = (v) => v >= 70 ? '#22C55E' : v >= 40 ? '#F59E0B' : '#EF4444';

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-purple-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <h3 className="font-semibold text-gray-900">Strategic Productivity</h3>
          </div>
          <p className="text-xs text-gray-500">The realization of your strategic choices</p>
        </div>
      </div>

      <div className="p-4">
        {/* Big score */}
        <div className="text-center mb-4">
          <p className="text-5xl font-bold" style={{ color: getColor(avgProgress) }}>{avgProgress}%</p>
          <p className="text-sm text-gray-500 mt-1">Overall progress against approved initiatives</p>
        </div>

        {/* Initiative progress */}
        <div className="space-y-2 mb-4">
          {inits.map(init => (
            <div key={init.id} className="flex items-center gap-3">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs text-white ${
                init.status === 'complete' ? 'bg-green-500' :
                init.status === 'in-flight' ? 'bg-blue-500' : 'bg-gray-300'
              }`}>
                {init.status === 'complete' ? '✓' : init.status === 'in-flight' ? '▶' : '○'}
              </span>
              <span className="text-sm text-gray-700 flex-1">{init.title}</span>
              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${init.status === 'complete' ? 'bg-green-500' : 'bg-blue-500'}`}
                  style={{ width: `${init.progress}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 w-8 text-right">{init.progress}%</span>
            </div>
          ))}
        </div>

        {/* Execution dimensions */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
          {dimensions.map(dim => (
            <div key={dim.label} className="p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">{dim.icon} {dim.label}</span>
                <span className="text-xs font-bold" style={{ color: getColor(dim.value) }}>{dim.value}%</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{ width: `${dim.value}%`, backgroundColor: getColor(dim.value) }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// RA.5.2 PATTERN OF PLAY CARD
// Embedded behavioral change proof
// ============================================
const PatternOfPlayCard = ({ pattern }) => {
  const demoPattern = pattern || {
    name: 'Evidence-Based Decision Making',
    description: 'Teams use data and frameworks rather than gut feel to make marketing investment decisions',
    evidence: [
      { type: 'behaviour', text: 'Weekly performance reviews now use MMM data', verified: true },
      { type: 'artefact', text: 'Decision log shows framework usage in 8/10 recent decisions', verified: true },
      { type: 'language', text: 'Team now asks "what does the model say?" before budget changes', verified: false },
    ],
    embedScore: 70,
    owner: 'Analytics Lead',
  };

  return (
    <div className="bg-white rounded-xl border-2 border-orange-200 overflow-hidden">
      <div className="px-4 py-3 bg-orange-50 border-b border-orange-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏆</span>
            <h4 className="font-semibold text-orange-900">Pattern of Play</h4>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-orange-700">{demoPattern.embedScore}%</p>
            <p className="text-xs text-orange-600">embedded</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-semibold text-gray-900 mb-1">{demoPattern.name}</h4>
        <p className="text-xs text-gray-500 mb-3">{demoPattern.description}</p>

        <p className="text-xs font-medium text-gray-600 mb-2">Evidence of adoption:</p>
        <div className="space-y-2">
          {demoPattern.evidence.map((ev, idx) => (
            <div 
              key={idx}
              className={`flex items-start gap-2 p-2 rounded-lg ${ev.verified ? 'bg-green-50' : 'bg-gray-50'}`}
            >
              <span className={`mt-0.5 ${ev.verified ? 'text-green-500' : 'text-gray-300'}`}>
                {ev.verified ? '●' : '○'}
              </span>
              <div>
                <span className="text-xs px-1.5 py-0.5 rounded bg-gray-200 text-gray-600 capitalize">{ev.type}</span>
                <p className="text-sm text-gray-700 mt-0.5">{ev.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// WORKSPACE HEADER
// ============================================
const RAWorkspaceHeader = ({ workspace }) => {
  const ws = relentlessWorkspaces[workspace];

  return (
    <div 
      className="px-6 py-4 border-b"
      style={{ backgroundColor: ws.color + '10' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: ws.color + '20' }}
          >
            {ws.icon}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{ws.name}</h2>
            <p className="text-sm text-gray-500">{ws.question}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right mr-4 max-w-xs">
            <p className="text-xs text-gray-500">Outcome</p>
            <p className="text-xs font-medium text-gray-700 italic">{ws.outcome}</p>
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
// MAIN APP
// ============================================
export default function RelentlessApplicationCanvas() {
  const [activeWorkspace, setActiveWorkspace] = useState('workDesign');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const demoCourses = [
    {
      id: 'coa1', title: 'MMM Implementation Sprint', initiative: 'Marketing Mix Modelling',
      status: 'active', owner: 'Analytics Lead', deadline: 'Week 8',
      currentStep: 'Data integration & model calibration',
      steps: [
        { label: 'Vendor onboard', done: true },
        { label: 'Data integration', done: true },
        { label: 'Model calibration', done: false },
        { label: 'First readout', done: false },
      ],
    },
    {
      id: 'coa2', title: 'Events Budget Wind-down', initiative: 'Events → Digital reallocation',
      status: 'complete', owner: 'Brand Marketing', deadline: 'Complete',
      currentStep: 'All contracts exited, budget redirected to digital',
      steps: [
        { label: 'Contract review', done: true },
        { label: 'Exit negotiation', done: true },
        { label: 'Budget transfer', done: true },
      ],
    },
    {
      id: 'coa3', title: 'CRM Sunset Sequence', initiative: 'CRM programme sunset',
      status: 'active', owner: 'CRM Team', deadline: 'Week 10',
      currentStep: 'Customer communication plan in review',
      steps: [
        { label: 'Impact analysis', done: true },
        { label: 'Comms plan', done: false },
        { label: 'Phase 1 sunset', done: false },
        { label: 'Full sunset', done: false },
      ],
    },
  ];

  const demoBlueprints = [
    {
      id: 'bp1', title: 'Performance Marketing Operating Model',
      description: 'Reshape from channel-siloed to full-funnel, evidence-led performance team',
      status: 'in-progress', completionPct: 45,
      dimensions: [
        { icon: '👥', label: 'Team structure' },
        { icon: '📊', label: 'Metrics' },
        { icon: '🔄', label: 'Processes' },
      ],
      teams: ['Performance Marketing', 'Analytics', 'Brand'],
    },
    {
      id: 'bp2', title: 'Marketing-Finance Partnership Model',
      description: 'Aligned KPIs, shared reporting cadence, joint investment reviews',
      status: 'agreed', completionPct: 20,
      dimensions: [
        { icon: '💰', label: 'Shared KPIs' },
        { icon: '📅', label: 'Cadence' },
        { icon: '⚖️', label: 'Governance' },
      ],
      teams: ['Marketing', 'Finance FP&A'],
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">RA</span>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Relentless Application</h1>
            <p className="text-xs text-gray-500">The kinetic energy that fights inertia</p>
          </div>
        </div>

        {/* Module tabs */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {Object.values(relentlessWorkspaces).map(ws => (
            <button
              key={ws.id}
              onClick={() => setActiveWorkspace(ws.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeWorkspace === ws.id ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{ws.icon}</span>
              <span className="hidden xl:inline">{ws.name}</span>
            </button>
          ))}
        </div>

        <span className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
          Reorientation Phase 3
        </span>
      </div>

      {/* Workspace Header */}
      <RAWorkspaceHeader workspace={activeWorkspace} />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">

        {/* WORK DESIGN MODULE */}
        {activeWorkspace === 'workDesign' && (
          <>
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Blueprints</h3>
                <p className="text-xs text-gray-500">Operational change plans</p>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-3">
                {demoBlueprints.map(bp => (
                  <BlueprintCard key={bp.id} blueprint={bp} />
                ))}
                <button className="w-full py-2 text-sm text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100">
                  + New Blueprint
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6 space-y-6">
              <TeamDesignPanel />
              <MetricsFramework />
            </div>
            <div className="w-80 bg-white border-l border-gray-200 overflow-auto p-4">
              <WaysOfWorkingCard />
            </div>
          </>
        )}

        {/* STRATEGIC PLANNING MODULE */}
        {activeWorkspace === 'strategicPlanning' && (
          <>
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                <BudgetReallocationView />
              </div>
            </div>
            <div className="w-80 bg-white border-l border-gray-200 overflow-auto p-4">
              <StrategicProductivityScore />
            </div>
          </>
        )}

        {/* STRATEGIC IMPLEMENTATION MODULE */}
        {activeWorkspace === 'implementation' && (
          <>
            <div className="w-96 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Courses of Action</h3>
                <p className="text-xs text-gray-500">Sequenced execution plans</p>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-3">
                {demoCourses.map(course => (
                  <CourseOfActionCard
                    key={course.id}
                    course={course}
                    isSelected={selectedCourse?.id === course.id}
                    onSelect={setSelectedCourse}
                  />
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6 space-y-6">
              <DrumbeatDashboard />
              <POCTracker />
            </div>
            <div className="w-80 bg-white border-l border-gray-200 overflow-auto p-4 space-y-4">
              <DecisionFrameworkCard />
              <PatternOfPlayCard />
            </div>
          </>
        )}

        {/* CAPABILITY INVESTMENT MODULE */}
        {activeWorkspace === 'capability' && (
          <>
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                <CapabilityGapMap />
              </div>
            </div>
            <div className="w-80 bg-white border-l border-gray-200 overflow-auto p-4">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200 mb-4">
                <h4 className="font-semibold text-green-800 mb-2">🎯 Capability Outcomes</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Teams upskilled and performing</li>
                  <li>• Not bottlenecked by gaps</li>
                  <li>• Aligned with other business units</li>
                  <li>• Built in the timeframe required</li>
                </ul>
              </div>

              {/* Key language reminder */}
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2">💬 Our Language</h4>
                <div className="space-y-1.5 text-sm text-orange-700">
                  <p>• Shoulder-to-shoulder support</p>
                  <p>• Navigate the mess</p>
                  <p>• Co-ownership of the outcome</p>
                  <p>• Momentum over perfection</p>
                  <p>• Doing differently, not just talking</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
