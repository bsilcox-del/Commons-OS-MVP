import React, { useState } from 'react';

// ============================================
// CLIENT SUCCESS CANVAS
// Commons OS - Third Key Space
// Partnership, Navigation & Sustainable Change
// ============================================
//
// COMPONENT INVENTORY
//
// CS.1 STAKEHOLDER SYSTEM
//   CS.1.1 Stakeholder Map - Visual relationship mapping
//   CS.1.2 Stakeholder Card - Individual stakeholder profile
//   CS.1.3 Influence/Alignment Matrix - Power dynamics view
//   CS.1.4 Stakeholder Pulse - Sentiment tracking over time
//
// CS.2 COMMUNICATIONS FRAMEWORK
//   CS.2.1 Communications Matrix - Who/what/when/how
//   CS.2.2 Message Card - Key narrative components
//   CS.2.3 Touchpoint Timeline - Planned engagements
//   CS.2.4 Narrative Builder - Story construction
//
// CS.3 IMPACT ASSESSMENT
//   CS.3.1 Impact Map - Who's affected and how
//   CS.3.2 Team Impact Card - Department/team view
//   CS.3.3 Change Readiness Gauge - Organizational capacity
//   CS.3.4 Risk & Resistance Tracker - Political landscape
//
// CS.4 CLIENT PARTNERSHIP
//   CS.4.1 Client Health Dashboard - Relationship status
//   CS.4.2 Personal Success Tracker - Client's career goals
//   CS.4.3 Emotional Toll Monitor - Wellbeing check-in
//   CS.4.4 Momentum Tracker - Project progress
//
// CS.5 COMMONS BUILDER
//   CS.5.1 Knowledge Transfer Plan - What stays behind
//   CS.5.2 Capability Card - Skills being built
//   CS.5.3 Learning Log - Documented insights
//   CS.5.4 Autonomy Scorecard - Client independence
//
// CS.6 WORKSPACE VIEWS
//   CS.6.1 Navigate Workspace - Stakeholder & political
//   CS.6.2 Partner Workspace - Client relationship
//   CS.6.3 Sustain Workspace - Commons & legacy
//
// ============================================

// Color system (consistent with other spaces)
const colors = {
  teal: '#1A9B9B',
  purple: '#8B5CF6',
  coral: '#E8846B',
  navy: '#2C3E50',
  amber: '#F59E0B',
  blue: '#3B82F6',
  green: '#22C55E',
  red: '#EF4444',
  pink: '#EC4899',
  indigo: '#6366F1',
  gray: {
    50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB', 300: '#D1D5DB',
    400: '#9CA3AF', 500: '#6B7280', 600: '#4B5563', 700: '#374151',
    800: '#1F2937', 900: '#111827',
  }
};

// Client Success Workspaces
const clientSuccessWorkspaces = {
  navigate: {
    id: 'navigate',
    name: 'Navigate',
    icon: '🧭',
    color: '#6366F1',
    subtitle: 'Stakeholder & political landscape',
    question: 'Who do we need to bring with us?',
    tools: ['Stakeholder Map', 'Communications Matrix', 'Impact Assessment'],
  },
  partner: {
    id: 'partner',
    name: 'Partner',
    icon: '🤝',
    color: '#EC4899',
    subtitle: 'Client relationship & wellbeing',
    question: 'How is our client doing?',
    tools: ['Client Health', 'Personal Success', 'Emotional Toll', 'Momentum'],
  },
  sustain: {
    id: 'sustain',
    name: 'Sustain',
    icon: '🌱',
    color: '#22C55E',
    subtitle: 'Knowledge transfer & autonomy',
    question: 'What stays behind when we leave?',
    tools: ['Commons Builder', 'Capability Transfer', 'Learning Log'],
  },
};

// Stakeholder positions
const stakeholderPositions = {
  champion: { label: 'Champion', color: '#22C55E', icon: '🏆', description: 'Actively advocates' },
  supporter: { label: 'Supporter', color: '#3B82F6', icon: '👍', description: 'Positive, helpful' },
  neutral: { label: 'Neutral', color: '#6B7280', icon: '😐', description: 'Undecided, watchful' },
  skeptic: { label: 'Skeptic', color: '#F59E0B', icon: '🤔', description: 'Questioning, cautious' },
  blocker: { label: 'Blocker', color: '#EF4444', icon: '🚫', description: 'Actively resisting' },
};

// Influence levels
const influenceLevels = {
  high: { label: 'High', color: '#8B5CF6' },
  medium: { label: 'Medium', color: '#3B82F6' },
  low: { label: 'Low', color: '#6B7280' },
};

// Demo stakeholders
const demoStakeholders = [
  {
    id: 's1',
    name: 'Sarah Chen',
    role: 'CMO',
    department: 'Marketing',
    position: 'champion',
    influence: 'high',
    alignment: 85,
    concerns: ['Budget visibility', 'Team capacity'],
    motivations: ['Career growth', 'Prove marketing value'],
    lastContact: '2 days ago',
    nextAction: 'Weekly check-in Friday',
    notes: 'Primary sponsor. Needs wins to show the board.',
  },
  {
    id: 's2',
    name: 'Michael Torres',
    role: 'CFO',
    department: 'Finance',
    position: 'skeptic',
    influence: 'high',
    alignment: 45,
    concerns: ['ROI proof', 'Investment timeline'],
    motivations: ['Cost efficiency', 'Risk management'],
    lastContact: '1 week ago',
    nextAction: 'Business case presentation',
    notes: 'Needs hard numbers. Burned by previous marketing projects.',
  },
  {
    id: 's3',
    name: 'David Park',
    role: 'Head of Sales',
    department: 'Sales',
    position: 'blocker',
    influence: 'medium',
    alignment: 25,
    concerns: ['Lead quality', 'Territory disruption'],
    motivations: ['Quota achievement', 'Team stability'],
    lastContact: '3 days ago',
    nextAction: 'One-on-one to address concerns',
    notes: 'Feels threatened by marketing taking credit. Need to make him a hero.',
  },
  {
    id: 's4',
    name: 'Emma Wilson',
    role: 'Head of Analytics',
    department: 'Marketing',
    position: 'supporter',
    influence: 'medium',
    alignment: 75,
    concerns: ['Data infrastructure', 'Team skills'],
    motivations: ['Technical excellence', 'Team growth'],
    lastContact: 'Yesterday',
    nextAction: 'MMM technical review',
    notes: 'Key ally for implementation. Excited about MMM.',
  },
  {
    id: 's5',
    name: 'James Morrison',
    role: 'CEO',
    department: 'Executive',
    position: 'neutral',
    influence: 'high',
    alignment: 55,
    concerns: ['Growth targets', 'Board pressure'],
    motivations: ['Company performance', 'Strategic vision'],
    lastContact: '2 weeks ago',
    nextAction: 'Quarterly update scheduled',
    notes: 'Supportive in principle but distracted by other priorities.',
  },
];

// Demo teams for impact assessment
const demoTeams = [
  { id: 't1', name: 'Brand Team', size: 12, impactLevel: 'high', readiness: 60, concerns: ['Role changes', 'New tools'] },
  { id: 't2', name: 'Performance Marketing', size: 8, impactLevel: 'high', readiness: 85, concerns: ['Attribution changes'] },
  { id: 't3', name: 'Sales Operations', size: 15, impactLevel: 'medium', readiness: 40, concerns: ['Lead scoring changes', 'CRM updates'] },
  { id: 't4', name: 'Finance - FP&A', size: 6, impactLevel: 'medium', readiness: 70, concerns: ['New reporting cadence'] },
  { id: 't5', name: 'IT/Data', size: 10, impactLevel: 'high', readiness: 55, concerns: ['Integration work', 'Support load'] },
];

// ============================================
// CS.1.1 STAKEHOLDER MAP
// Visual relationship mapping
// ============================================
const StakeholderMap = ({ stakeholders, onSelectStakeholder, selectedId }) => {
  // Group by influence and position for visual layout
  const getQuadrant = (stakeholder) => {
    const isHighInfluence = stakeholder.influence === 'high';
    const isPositive = ['champion', 'supporter'].includes(stakeholder.position);
    if (isHighInfluence && isPositive) return 'manage-closely';
    if (isHighInfluence && !isPositive) return 'manage-closely'; // Still need attention
    if (!isHighInfluence && isPositive) return 'keep-informed';
    return 'monitor';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🗺️</span>
          <h3 className="font-semibold text-gray-900">Stakeholder Map</h3>
        </div>
        <span className="text-xs text-gray-500">{stakeholders.length} stakeholders mapped</span>
      </div>

      <div className="p-4">
        {/* Influence/Position Grid */}
        <div className="relative mb-4">
          {/* Axis labels */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-medium text-gray-400 whitespace-nowrap">
            High Influence ↑
          </div>
          
          <div className="ml-4 grid grid-cols-2 gap-3">
            {/* High Influence / Positive */}
            <div className="bg-green-50 rounded-xl p-3 min-h-[140px] border border-green-200">
              <p className="text-xs font-semibold text-green-700 mb-2">Champions & Allies</p>
              <div className="flex flex-wrap gap-2">
                {stakeholders.filter(s => s.influence === 'high' && ['champion', 'supporter'].includes(s.position)).map(s => (
                  <button
                    key={s.id}
                    onClick={() => onSelectStakeholder?.(s)}
                    className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedId === s.id 
                        ? 'bg-green-500 text-white shadow' 
                        : 'bg-white text-green-700 hover:bg-green-100'
                    }`}
                  >
                    {stakeholderPositions[s.position].icon} {s.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* High Influence / Negative */}
            <div className="bg-red-50 rounded-xl p-3 min-h-[140px] border border-red-200">
              <p className="text-xs font-semibold text-red-700 mb-2">Manage Carefully</p>
              <div className="flex flex-wrap gap-2">
                {stakeholders.filter(s => s.influence === 'high' && ['skeptic', 'blocker', 'neutral'].includes(s.position)).map(s => (
                  <button
                    key={s.id}
                    onClick={() => onSelectStakeholder?.(s)}
                    className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedId === s.id 
                        ? 'bg-red-500 text-white shadow' 
                        : 'bg-white text-red-700 hover:bg-red-100'
                    }`}
                  >
                    {stakeholderPositions[s.position].icon} {s.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Low Influence / Positive */}
            <div className="bg-blue-50 rounded-xl p-3 min-h-[100px] border border-blue-200">
              <p className="text-xs font-semibold text-blue-700 mb-2">Keep Informed</p>
              <div className="flex flex-wrap gap-2">
                {stakeholders.filter(s => s.influence !== 'high' && ['champion', 'supporter'].includes(s.position)).map(s => (
                  <button
                    key={s.id}
                    onClick={() => onSelectStakeholder?.(s)}
                    className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedId === s.id 
                        ? 'bg-blue-500 text-white shadow' 
                        : 'bg-white text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    {stakeholderPositions[s.position].icon} {s.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Low Influence / Negative */}
            <div className="bg-gray-50 rounded-xl p-3 min-h-[100px] border border-gray-200">
              <p className="text-xs font-semibold text-gray-600 mb-2">Monitor</p>
              <div className="flex flex-wrap gap-2">
                {stakeholders.filter(s => s.influence !== 'high' && ['skeptic', 'blocker', 'neutral'].includes(s.position)).map(s => (
                  <button
                    key={s.id}
                    onClick={() => onSelectStakeholder?.(s)}
                    className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedId === s.id 
                        ? 'bg-gray-500 text-white shadow' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {stakeholderPositions[s.position].icon} {s.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="ml-4 mt-2 text-center text-xs font-medium text-gray-400">
            ← Resistant — Supportive →
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
          {Object.values(stakeholderPositions).map(pos => (
            <span 
              key={pos.label}
              className="text-xs px-2 py-1 rounded-full"
              style={{ backgroundColor: pos.color + '20', color: pos.color }}
            >
              {pos.icon} {pos.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// CS.1.2 STAKEHOLDER CARD
// Individual stakeholder profile
// ============================================
const StakeholderCard = ({ stakeholder, onUpdate, expanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const position = stakeholderPositions[stakeholder.position];
  const influence = influenceLevels[stakeholder.influence];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div 
        className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
          style={{ backgroundColor: position.color }}
        >
          {stakeholder.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-gray-900">{stakeholder.name}</h4>
            <span className="text-lg">{position.icon}</span>
          </div>
          <p className="text-xs text-gray-500">{stakeholder.role} • {stakeholder.department}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 mb-1">
            <span 
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: position.color + '20', color: position.color }}
            >
              {position.label}
            </span>
            <span 
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: influence.color + '20', color: influence.color }}
            >
              {influence.label} influence
            </span>
          </div>
          {/* Alignment bar */}
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-gray-200 rounded-full">
              <div 
                className="h-full rounded-full"
                style={{ 
                  width: `${stakeholder.alignment}%`,
                  backgroundColor: stakeholder.alignment >= 70 ? '#22C55E' : stakeholder.alignment >= 40 ? '#F59E0B' : '#EF4444'
                }}
              />
            </div>
            <span className="text-xs text-gray-500">{stakeholder.alignment}%</span>
          </div>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-100 pt-4">
          {/* Concerns & Motivations */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-red-600 mb-2">⚠️ Concerns</p>
              <div className="space-y-1">
                {stakeholder.concerns.map((c, idx) => (
                  <div key={idx} className="text-xs p-2 bg-red-50 rounded text-red-700">{c}</div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-green-600 mb-2">💡 Motivations</p>
              <div className="space-y-1">
                {stakeholder.motivations.map((m, idx) => (
                  <div key={idx} className="text-xs p-2 bg-green-50 rounded text-green-700">{m}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <p className="text-xs font-medium text-gray-600 mb-1">📝 Notes</p>
            <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{stakeholder.notes}</p>
          </div>

          {/* Contact & Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              Last contact: <span className="font-medium">{stakeholder.lastContact}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-600">→ {stakeholder.nextAction}</span>
              <button className="px-3 py-1 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                Log Interaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// CS.2.1 COMMUNICATIONS MATRIX
// Who/what/when/how planning
// ============================================
const CommunicationsMatrix = ({ stakeholders }) => {
  const communicationTypes = [
    { id: 'update', label: 'Status Update', icon: '📊', frequency: 'Weekly' },
    { id: 'decision', label: 'Decision Point', icon: '🎯', frequency: 'As needed' },
    { id: 'celebration', label: 'Win Sharing', icon: '🎉', frequency: 'Milestone' },
    { id: 'concern', label: 'Issue Escalation', icon: '⚠️', frequency: 'As needed' },
  ];

  const channels = [
    { id: 'meeting', label: '1:1 Meeting', icon: '👥' },
    { id: 'email', label: 'Email', icon: '📧' },
    { id: 'slack', label: 'Slack/Teams', icon: '💬' },
    { id: 'presentation', label: 'Presentation', icon: '📽️' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-lg">📋</span>
          <h3 className="font-semibold text-gray-900">Communications Matrix</h3>
        </div>
        <p className="text-xs text-gray-500">Who needs what, when, and how</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Stakeholder</th>
              {communicationTypes.map(type => (
                <th key={type.id} className="px-3 py-2 text-center text-xs font-medium text-gray-500">
                  <span className="block">{type.icon}</span>
                  <span>{type.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stakeholders.slice(0, 5).map((stakeholder, idx) => (
              <tr key={stakeholder.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span>{stakeholderPositions[stakeholder.position].icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{stakeholder.name}</p>
                      <p className="text-xs text-gray-500">{stakeholder.role}</p>
                    </div>
                  </div>
                </td>
                {communicationTypes.map(type => (
                  <td key={type.id} className="px-3 py-3 text-center">
                    <select className="text-xs px-2 py-1 border border-gray-200 rounded bg-white">
                      <option value="">-</option>
                      {channels.map(ch => (
                        <option key={ch.id} value={ch.id}>{ch.icon} {ch.label}</option>
                      ))}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
          + Add communication rule
        </button>
      </div>
    </div>
  );
};

// ============================================
// CS.3.1 IMPACT MAP
// Who's affected and how
// ============================================
const ImpactMap = ({ teams, onSelectTeam }) => {
  const impactColors = {
    high: { bg: '#FEE2E2', border: '#EF4444', text: '#991B1B' },
    medium: { bg: '#FEF3C7', border: '#F59E0B', text: '#854D0E' },
    low: { bg: '#DCFCE7', border: '#22C55E', text: '#166534' },
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <h3 className="font-semibold text-gray-900">Impact Assessment</h3>
        </div>
        <div className="flex items-center gap-2">
          {Object.entries(impactColors).map(([level, colors]) => (
            <span 
              key={level}
              className="text-xs px-2 py-0.5 rounded capitalize"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              {level}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-3">
          {teams.map(team => {
            const impact = impactColors[team.impactLevel];
            return (
              <div 
                key={team.id}
                onClick={() => onSelectTeam?.(team)}
                className="p-3 rounded-xl border-2 cursor-pointer hover:shadow-md transition-all"
                style={{ borderColor: impact.border, backgroundColor: impact.bg + '40' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{team.name}</h4>
                    <p className="text-xs text-gray-500">{team.size} people</p>
                  </div>
                  <div className="text-right">
                    <span 
                      className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
                      style={{ backgroundColor: impact.bg, color: impact.text }}
                    >
                      {team.impactLevel} impact
                    </span>
                  </div>
                </div>

                {/* Readiness gauge */}
                <div className="mb-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500">Change Readiness</span>
                    <span className={`font-medium ${team.readiness >= 70 ? 'text-green-600' : team.readiness >= 40 ? 'text-amber-600' : 'text-red-600'}`}>
                      {team.readiness}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${team.readiness >= 70 ? 'bg-green-500' : team.readiness >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                      style={{ width: `${team.readiness}%` }}
                    />
                  </div>
                </div>

                {/* Concerns */}
                <div className="flex flex-wrap gap-1">
                  {team.concerns.map((concern, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 bg-white rounded text-gray-600">
                      {concern}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============================================
// CS.4.1 CLIENT HEALTH DASHBOARD
// Relationship status overview
// ============================================
const ClientHealthDashboard = ({ client }) => {
  const healthMetrics = [
    { id: 'relationship', label: 'Relationship', value: 85, icon: '💝' },
    { id: 'confidence', label: 'Confidence', value: 70, icon: '💪' },
    { id: 'energy', label: 'Energy', value: 55, icon: '⚡' },
    { id: 'progress', label: 'Progress', value: 75, icon: '📈' },
  ];

  const getHealthColor = (value) => {
    if (value >= 70) return '#22C55E';
    if (value >= 40) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-pink-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">💖</span>
            <h3 className="font-semibold text-pink-900">Client Health</h3>
          </div>
          <span className="text-xs text-pink-600">Updated today</span>
        </div>
      </div>

      <div className="p-4">
        {/* Client info */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
          <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{client?.name || 'Sarah Chen'}</h4>
            <p className="text-sm text-gray-500">{client?.role || 'CMO'} at {client?.company || 'ClientCorp'}</p>
            <p className="text-xs text-gray-400">Working together for 6 weeks</p>
          </div>
        </div>

        {/* Health metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {healthMetrics.map(metric => (
            <div key={metric.id} className="p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{metric.icon} {metric.label}</span>
                <span 
                  className="text-lg font-bold"
                  style={{ color: getHealthColor(metric.value) }}
                >
                  {metric.value}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ width: `${metric.value}%`, backgroundColor: getHealthColor(metric.value) }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Recent sentiment */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
          <p className="text-xs font-medium text-amber-800 mb-1">⚠️ Watch point</p>
          <p className="text-sm text-amber-700">
            Energy levels dropping. Sarah mentioned feeling overwhelmed in last check-in.
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// CS.4.2 PERSONAL SUCCESS TRACKER
// Client's career goals alignment
// ============================================
const PersonalSuccessTracker = ({ client }) => {
  const goals = [
    { id: 'g1', goal: 'Prove marketing ROI to board', progress: 60, deadline: 'Q2 Board Meeting', status: 'on-track' },
    { id: 'g2', goal: 'Build analytics capability', progress: 40, deadline: 'End of year', status: 'at-risk' },
    { id: 'g3', goal: 'Secure additional headcount', progress: 25, deadline: 'Budget cycle', status: 'blocked' },
  ];

  const statusConfig = {
    'on-track': { label: 'On Track', color: '#22C55E', icon: '✓' },
    'at-risk': { label: 'At Risk', color: '#F59E0B', icon: '⚠' },
    'blocked': { label: 'Blocked', color: '#EF4444', icon: '✕' },
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <h3 className="font-semibold text-gray-900">Personal Success</h3>
        </div>
        <p className="text-xs text-gray-500">Helping Sarah win in her role</p>
      </div>

      <div className="p-4 space-y-3">
        {goals.map(goal => {
          const status = statusConfig[goal.status];
          return (
            <div key={goal.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">{goal.goal}</p>
                <span 
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: status.color + '20', color: status.color }}
                >
                  {status.icon} {status.label}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ width: `${goal.progress}%`, backgroundColor: status.color }}
                  />
                </div>
                <span className="text-xs text-gray-500">{goal.progress}%</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Target: {goal.deadline}</p>
            </div>
          );
        })}
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <button className="text-xs text-pink-600 hover:text-pink-700 font-medium">
          + Add personal goal
        </button>
      </div>
    </div>
  );
};

// ============================================
// CS.4.3 EMOTIONAL TOLL MONITOR
// Wellbeing check-in
// ============================================
const EmotionalTollMonitor = () => {
  const factors = [
    { id: 'political', label: 'Political Pressure', level: 'high', trend: 'up' },
    { id: 'workload', label: 'Workload', level: 'high', trend: 'stable' },
    { id: 'support', label: 'Support Network', level: 'medium', trend: 'down' },
    { id: 'wins', label: 'Recent Wins', level: 'low', trend: 'up' },
  ];

  const levelConfig = {
    high: { color: '#EF4444', label: 'High' },
    medium: { color: '#F59E0B', label: 'Medium' },
    low: { color: '#22C55E', label: 'Low' },
  };

  const trendIcons = {
    up: '↑',
    down: '↓',
    stable: '→',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-purple-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">💜</span>
          <h3 className="font-semibold text-purple-900">Emotional Toll</h3>
        </div>
        <p className="text-xs text-purple-600">The human cost of driving change</p>
      </div>

      <div className="p-4">
        <div className="space-y-3 mb-4">
          {factors.map(factor => {
            const level = levelConfig[factor.level];
            return (
              <div key={factor.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{factor.label}</span>
                <div className="flex items-center gap-2">
                  <span 
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: level.color + '20', color: level.color }}
                  >
                    {level.label}
                  </span>
                  <span className={`text-sm ${factor.trend === 'up' ? 'text-red-500' : factor.trend === 'down' ? 'text-green-500' : 'text-gray-400'}`}>
                    {trendIcons[factor.trend]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Intervention suggestion */}
        <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
          <p className="text-xs font-medium text-purple-800 mb-1">💡 Suggested intervention</p>
          <p className="text-sm text-purple-700">
            Schedule informal coffee chat. Focus on wins and support, not project updates.
          </p>
        </div>

        <button className="w-full mt-3 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100">
          Log Check-in
        </button>
      </div>
    </div>
  );
};

// ============================================
// CS.5.1 COMMONS BUILDER
// Knowledge transfer planning
// ============================================
const CommonsBuilder = () => {
  const commonsCategories = [
    {
      id: 'frameworks',
      name: 'Frameworks & Models',
      icon: '🧩',
      items: [
        { name: 'MMM interpretation guide', status: 'documented', owner: 'Analytics' },
        { name: 'Budget allocation model', status: 'in-progress', owner: 'CMO' },
        { name: 'ROI calculation methodology', status: 'documented', owner: 'Finance' },
      ],
    },
    {
      id: 'processes',
      name: 'Processes & Rituals',
      icon: '🔄',
      items: [
        { name: 'Weekly marketing review', status: 'embedded', owner: 'Marketing Ops' },
        { name: 'Quarterly planning cycle', status: 'in-progress', owner: 'CMO' },
        { name: 'Cross-functional alignment', status: 'not-started', owner: 'TBD' },
      ],
    },
    {
      id: 'capabilities',
      name: 'Capabilities & Skills',
      icon: '🎓',
      items: [
        { name: 'Data storytelling', status: 'training', owner: 'Brand Team' },
        { name: 'Attribution analysis', status: 'documented', owner: 'Analytics' },
        { name: 'Business case building', status: 'in-progress', owner: 'All' },
      ],
    },
  ];

  const statusConfig = {
    'not-started': { label: 'Not Started', color: '#6B7280' },
    'in-progress': { label: 'In Progress', color: '#F59E0B' },
    'documented': { label: 'Documented', color: '#3B82F6' },
    'training': { label: 'Training', color: '#8B5CF6' },
    'embedded': { label: 'Embedded', color: '#22C55E' },
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-green-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">🌱</span>
          <h3 className="font-semibold text-green-900">Commons Builder</h3>
        </div>
        <p className="text-xs text-green-600">What stays behind when we leave</p>
      </div>

      <div className="p-4 space-y-4">
        {commonsCategories.map(category => (
          <div key={category.id}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{category.icon}</span>
              <h4 className="font-medium text-gray-900">{category.name}</h4>
            </div>
            <div className="space-y-1.5 ml-7">
              {category.items.map((item, idx) => {
                const status = statusConfig[item.status];
                return (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm text-gray-700">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{item.owner}</span>
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
          </div>
        ))}
      </div>

      {/* Autonomy score */}
      <div className="px-4 py-3 bg-green-50 border-t border-green-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-green-800">Client Autonomy Score</span>
          <span className="text-xl font-bold text-green-700">62%</span>
        </div>
        <div className="h-2 bg-green-200 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full" style={{ width: '62%' }} />
        </div>
        <p className="text-xs text-green-600 mt-1">Target: 85% by project end</p>
      </div>
    </div>
  );
};

// ============================================
// CS.4.4 MOMENTUM TRACKER
// Project progress and blockers
// ============================================
const MomentumTracker = () => {
  const milestones = [
    { id: 'm1', name: 'Problem alignment', status: 'complete', date: 'Week 1' },
    { id: 'm2', name: 'Initiative validation', status: 'complete', date: 'Week 3' },
    { id: 'm3', name: 'Board presentation', status: 'current', date: 'Week 6' },
    { id: 'm4', name: 'Implementation kickoff', status: 'upcoming', date: 'Week 8' },
    { id: 'm5', name: 'First results review', status: 'upcoming', date: 'Week 12' },
  ];

  const statusConfig = {
    complete: { color: '#22C55E', icon: '✓' },
    current: { color: '#3B82F6', icon: '●' },
    upcoming: { color: '#D1D5DB', icon: '○' },
    blocked: { color: '#EF4444', icon: '!' },
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🚀</span>
            <h3 className="font-semibold text-gray-900">Momentum</h3>
          </div>
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
            Week 6 of 12
          </span>
        </div>
      </div>

      <div className="p-4">
        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: '50%' }} />
          </div>
        </div>

        {/* Milestones */}
        <div className="space-y-2">
          {milestones.map((milestone, idx) => {
            const status = statusConfig[milestone.status];
            return (
              <div 
                key={milestone.id}
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  milestone.status === 'current' ? 'bg-blue-50' : ''
                }`}
              >
                <span 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: status.color }}
                >
                  {status.icon}
                </span>
                <div className="flex-1">
                  <p className={`text-sm ${milestone.status === 'current' ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                    {milestone.name}
                  </p>
                </div>
                <span className="text-xs text-gray-400">{milestone.date}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============================================
// WORKSPACE HEADER
// Client Success workspace navigation
// ============================================
const ClientSuccessWorkspaceHeader = ({ workspace }) => {
  const ws = clientSuccessWorkspaces[workspace];

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
// MAIN APP - Client Success Demo
// ============================================
export default function ClientSuccessCanvas() {
  const [activeWorkspace, setActiveWorkspace] = useState('navigate');
  const [stakeholders, setStakeholders] = useState(demoStakeholders);
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  const [teams, setTeams] = useState(demoTeams);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">CS</span>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Client Success</h1>
            <p className="text-xs text-gray-500">Partnership, Navigation & Sustainable Change</p>
          </div>
        </div>

        {/* Workspace tabs */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {Object.values(clientSuccessWorkspaces).map(ws => (
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

        <span className="text-xs px-3 py-1 bg-pink-100 text-pink-700 rounded-full font-medium">
          Standing Side by Side
        </span>
      </div>

      {/* Workspace Header */}
      <ClientSuccessWorkspaceHeader workspace={activeWorkspace} />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* NAVIGATE WORKSPACE */}
        {activeWorkspace === 'navigate' && (
          <>
            {/* Left: Stakeholder List */}
            <div className="w-96 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">Stakeholders</h3>
                  <p className="text-xs text-gray-500">{stakeholders.length} mapped</p>
                </div>
                <button className="text-xs px-3 py-1.5 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
                  + Add
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-3">
                {stakeholders.map(s => (
                  <StakeholderCard
                    key={s.id}
                    stakeholder={s}
                    expanded={selectedStakeholder?.id === s.id}
                  />
                ))}
              </div>
            </div>

            {/* Center: Map & Matrix */}
            <div className="flex-1 overflow-auto p-6 space-y-6">
              <StakeholderMap
                stakeholders={stakeholders}
                selectedId={selectedStakeholder?.id}
                onSelectStakeholder={setSelectedStakeholder}
              />
              <CommunicationsMatrix stakeholders={stakeholders} />
            </div>

            {/* Right: Impact */}
            <div className="w-80 bg-white border-l border-gray-200 overflow-auto p-4">
              <ImpactMap teams={teams} />
            </div>
          </>
        )}

        {/* PARTNER WORKSPACE */}
        {activeWorkspace === 'partner' && (
          <>
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
                <ClientHealthDashboard />
                <PersonalSuccessTracker />
                <EmotionalTollMonitor />
                <MomentumTracker />
              </div>
            </div>
            <div className="w-80 bg-white border-l border-gray-200 overflow-auto p-4">
              <div className="bg-pink-50 rounded-xl p-4 border border-pink-200 mb-4">
                <h4 className="font-semibold text-pink-800 mb-2">🤝 Partnership Principles</h4>
                <ul className="space-y-2 text-sm text-pink-700">
                  <li>• Stand side by side, not opposite</li>
                  <li>• Their success is our success</li>
                  <li>• Navigate politics together</li>
                  <li>• Protect their energy</li>
                  <li>• Help them "move on" well</li>
                </ul>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-2">⚠️ Watch Points</h4>
                <div className="space-y-2 text-sm text-amber-700">
                  <p>• Energy levels dropping</p>
                  <p>• CFO relationship needs attention</p>
                  <p>• Board meeting in 2 weeks</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SUSTAIN WORKSPACE */}
        {activeWorkspace === 'sustain' && (
          <>
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-4xl mx-auto">
                <CommonsBuilder />
              </div>
            </div>
            <div className="w-80 bg-white border-l border-gray-200 overflow-auto p-4 space-y-4">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">🎯 Sustainability Goal</h4>
                <p className="text-sm text-green-700 mb-3">
                  Client can run independently within 90 days of handover
                </p>
                <div className="space-y-2">
                  {[
                    { label: 'Frameworks documented', done: true },
                    { label: 'Processes embedded', done: false },
                    { label: 'Skills transferred', done: false },
                    { label: 'Support network in place', done: false },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${item.done ? 'bg-green-500' : 'bg-gray-200'}`}>
                        {item.done && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`text-sm ${item.done ? 'text-green-700' : 'text-gray-500'}`}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">📚 Learning Log</h4>
                <div className="space-y-2">
                  {[
                    { date: 'Jan 24', insight: 'CFO responds better to peer validation than data' },
                    { date: 'Jan 20', insight: 'Sales team needs early involvement, not late inform' },
                  ].map((entry, idx) => (
                    <div key={idx} className="p-2 bg-white rounded text-sm">
                      <span className="text-xs text-blue-500">{entry.date}</span>
                      <p className="text-gray-700">{entry.insight}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium">
                  + Add learning
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
