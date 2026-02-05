import React, { useState, useEffect, useRef } from 'react';

// ============================================
// PHASE 3: AGENT CORE COMPONENTS
// Commons OS Problem Pursuit Canvas
// ============================================

// Color system
const colors = {
  teal: '#1A9B9B',
  tealLight: '#E6F5F5',
  purple: '#6B5B95',
  purpleLight: '#F0EDF5',
  coral: '#E8846B',
  coralLight: '#FCF0ED',
  navy: '#2C3E50',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  }
};

// Agent configurations from Design Spec
const agents = {
  decode: {
    id: 'decode',
    name: 'Decode',
    icon: '🔍',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    description: 'Analyses and scores sources',
    reactive: [
      'Score sources for quality',
      'Summarise documents',
      'Extract key metrics',
      'Answer content questions'
    ],
    proactive: [
      'Flag data gaps',
      'Suggest missing sources',
      'Highlight inconsistencies'
    ]
  },
  inquiry: {
    id: 'inquiry',
    name: 'Inquiry',
    icon: '🎯',
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
    description: 'Generates and tests hypotheses',
    reactive: [
      'Generate lines of inquiry',
      'Find supporting evidence',
      'Conduct targeted searches',
      'Test hypotheses'
    ],
    proactive: [
      'Suggest alternative hypotheses',
      'Identify evidence patterns',
      'Flag weak evidence chains'
    ]
  },
  synthesis: {
    id: 'synthesis',
    name: 'Synthesis',
    icon: '🧩',
    color: '#14B8A6',
    bgColor: '#F0FDFA',
    description: 'Connects findings into narratives',
    reactive: [
      'Connect disparate findings',
      'Draft narrative sections',
      'Create visualisations',
      'Build frameworks'
    ],
    proactive: [
      'Surface contradictions',
      'Propose frameworks',
      'Identify story gaps'
    ]
  },
  translation: {
    id: 'translation',
    name: 'Translation',
    icon: '💼',
    color: '#F97316',
    bgColor: '#FFF7ED',
    description: 'Converts to executive language',
    reactive: [
      'Convert to exec language',
      'Generate C-suite summaries',
      'Create board presentations',
      'Simplify technical content'
    ],
    proactive: [
      'Flag jargon',
      'Suggest impact framing',
      'Identify stakeholder angles'
    ]
  }
};

// Task status configurations
const taskStatuses = {
  pending: { label: 'Pending', color: '#6B7280', bgColor: '#F3F4F6' },
  running: { label: 'Running', color: '#3B82F6', bgColor: '#EFF6FF' },
  thinking: { label: 'Thinking', color: '#8B5CF6', bgColor: '#F5F3FF' },
  complete: { label: 'Complete', color: '#22C55E', bgColor: '#DCFCE7' },
  error: { label: 'Error', color: '#EF4444', bgColor: '#FEE2E2' },
  paused: { label: 'Paused', color: '#F59E0B', bgColor: '#FEF3C7' },
};

// ============================================
// CONFIDENCE INDICATOR
// Visual indicator of agent confidence
// ============================================
const ConfidenceIndicator = ({ level, size = 'default' }) => {
  const getConfig = (level) => {
    if (level >= 90) return { label: 'Very High', color: '#22C55E', bars: 5 };
    if (level >= 75) return { label: 'High', color: '#84CC16', bars: 4 };
    if (level >= 50) return { label: 'Medium', color: '#EAB308', bars: 3 };
    if (level >= 25) return { label: 'Low', color: '#F97316', bars: 2 };
    return { label: 'Very Low', color: '#EF4444', bars: 1 };
  };

  const config = getConfig(level);

  if (size === 'compact') {
    return (
      <div className="flex items-center gap-1.5">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map(i => (
            <div
              key={i}
              className="w-1 h-3 rounded-sm transition-colors"
              style={{
                backgroundColor: i <= config.bars ? config.color : colors.gray[200]
              }}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">{level}%</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className="w-1.5 h-4 rounded-sm transition-colors"
            style={{
              backgroundColor: i <= config.bars ? config.color : colors.gray[200]
            }}
          />
        ))}
      </div>
      <div className="text-sm">
        <span className="font-medium" style={{ color: config.color }}>{level}%</span>
        <span className="text-gray-400 ml-1">• {config.label}</span>
      </div>
    </div>
  );
};

// ============================================
// SOURCE REFERENCE (used in Glass Box)
// ============================================
const SourceReference = ({ source, onClick }) => {
  const typeColors = {
    client: '#3B82F6',
    research: '#22C55E',
    interview: '#8B5CF6',
    analysis: '#F97316',
    synthesis: '#14B8A6',
  };

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all hover:opacity-80"
      style={{
        backgroundColor: `${typeColors[source.type]}15`,
        color: typeColors[source.type],
        border: `1px solid ${typeColors[source.type]}30`
      }}
    >
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {source.title}
      {source.page && <span className="opacity-60">p.{source.page}</span>}
    </button>
  );
};

// ============================================
// 6.2 GLASS BOX WINDOW
// Transparent view of agent thinking/actions/sources
// ============================================
const GlassBoxWindow = ({ task, isExpanded, onToggleExpand, onClose }) => {
  const agent = agents[task.agentId];
  const [activeTab, setActiveTab] = useState('thinking');

  const tabs = [
    { id: 'thinking', label: 'Thinking', icon: '🧠' },
    { id: 'actions', label: 'Actions', icon: '⚡' },
    { id: 'sources', label: 'Sources', icon: '📚' },
    { id: 'output', label: 'Output', icon: '📄' },
  ];

  return (
    <div className={`bg-white rounded-xl border-2 shadow-xl overflow-hidden transition-all ${
      isExpanded ? 'fixed inset-8 z-50' : ''
    }`} style={{ borderColor: agent.color }}>
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ backgroundColor: agent.bgColor, borderColor: `${agent.color}30` }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
            style={{ backgroundColor: `${agent.color}20` }}
          >
            {agent.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{agent.name} Agent</h3>
              <span 
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: taskStatuses[task.status].bgColor,
                  color: taskStatuses[task.status].color
                }}
              >
                {taskStatuses[task.status].label}
              </span>
            </div>
            <p className="text-sm text-gray-500">{task.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ConfidenceIndicator level={task.confidence} size="compact" />
          <button
            onClick={onToggleExpand}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isExpanded ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              )}
            </svg>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-gray-900 border-b-2'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            style={{ borderColor: activeTab === tab.id ? agent.color : 'transparent' }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.id === 'sources' && task.sources && (
              <span className="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">
                {task.sources.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={`overflow-auto ${isExpanded ? 'h-[calc(100%-120px)]' : 'h-80'}`}>
        {/* Thinking Tab */}
        {activeTab === 'thinking' && (
          <div className="p-4 space-y-4">
            <div className="text-sm text-gray-500 mb-2">Reasoning chain</div>
            {task.thinking?.map((thought, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                    style={{ backgroundColor: agent.color }}
                  >
                    {idx + 1}
                  </div>
                  {idx < task.thinking.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gray-200 my-1" />
                  )}
                </div>
                <div className={`flex-1 pb-4 ${idx === task.thinking.length - 1 && task.status === 'thinking' ? 'animate-pulse' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-400">{thought.timestamp}</span>
                    {thought.decision && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">Decision Point</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700">{thought.content}</p>
                  {thought.options && (
                    <div className="mt-2 space-y-1">
                      {thought.options.map((opt, i) => (
                        <div 
                          key={i}
                          className={`text-xs px-2 py-1 rounded ${
                            opt.selected 
                              ? 'bg-teal-50 text-teal-700 border border-teal-200' 
                              : 'bg-gray-50 text-gray-500'
                          }`}
                        >
                          {opt.selected && <span className="mr-1">✓</span>}
                          {opt.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {task.status === 'thinking' && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span>Processing...</span>
              </div>
            )}
          </div>
        )}

        {/* Actions Tab */}
        {activeTab === 'actions' && (
          <div className="p-4">
            <div className="text-sm text-gray-500 mb-3">Current actions</div>
            <div className="space-y-2">
              {task.actions?.map((action, idx) => (
                <div 
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    action.status === 'running' 
                      ? 'border-blue-200 bg-blue-50' 
                      : action.status === 'complete'
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    action.status === 'running' 
                      ? 'bg-blue-100' 
                      : action.status === 'complete'
                        ? 'bg-green-100'
                        : 'bg-gray-100'
                  }`}>
                    {action.status === 'running' ? (
                      <svg className="w-4 h-4 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : action.status === 'complete' ? (
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{action.title}</p>
                    <p className="text-xs text-gray-500">{action.description}</p>
                  </div>
                  {action.duration && (
                    <span className="text-xs text-gray-400">{action.duration}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sources Tab */}
        {activeTab === 'sources' && (
          <div className="p-4">
            <div className="text-sm text-gray-500 mb-3">Sources being used</div>
            <div className="space-y-3">
              {task.sources?.map((source, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-gray-200 bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <SourceReference source={source} onClick={() => {}} />
                    <span className="text-xs text-gray-400">Relevance: {source.relevance}%</span>
                  </div>
                  {source.excerpt && (
                    <p className="text-sm text-gray-600 italic pl-3 border-l-2 border-gray-300">
                      "{source.excerpt}"
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span>Page {source.page}</span>
                    <span>•</span>
                    <span>Used {source.usageCount}x in this task</span>
                  </div>
                </div>
              ))}
              {(!task.sources || task.sources.length === 0) && (
                <div className="text-center py-8 text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm">No sources used yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Output Tab */}
        {activeTab === 'output' && (
          <div className="p-4">
            <div className="text-sm text-gray-500 mb-3">Generated output</div>
            {task.output ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap">{task.output.content}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <ConfidenceIndicator level={task.confidence} />
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                      Edit
                    </button>
                    <button 
                      className="px-3 py-1.5 text-sm font-medium text-white rounded-lg transition-colors"
                      style={{ backgroundColor: agent.color }}
                    >
                      Add to Canvas
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm">Output will appear here when complete</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {task.status === 'running' && task.progress && (
        <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${task.progress}%`, backgroundColor: agent.color }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// 6.3 AGENT TASK CARD
// Individual task display with progress, controls
// ============================================
const AgentTaskCard = ({ task, onClick, isActive }) => {
  const agent = agents[task.agentId];
  const status = taskStatuses[task.status];

  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
        isActive 
          ? 'shadow-md' 
          : 'hover:shadow-sm'
      }`}
      style={{ 
        borderColor: isActive ? agent.color : colors.gray[200],
        backgroundColor: isActive ? agent.bgColor : 'white'
      }}
    >
      <div className="flex items-start gap-3">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
          style={{ backgroundColor: `${agent.color}20` }}
        >
          {agent.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium" style={{ color: agent.color }}>{agent.name}</span>
            <span 
              className="px-1.5 py-0.5 rounded text-xs font-medium"
              style={{ backgroundColor: status.bgColor, color: status.color }}
            >
              {status.label}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
          
          {/* Progress */}
          {task.status === 'running' && task.progress && (
            <div className="mt-2">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ width: `${task.progress}%`, backgroundColor: agent.color }}
                />
              </div>
            </div>
          )}

          {/* Confidence */}
          {task.status === 'complete' && (
            <div className="mt-2">
              <ConfidenceIndicator level={task.confidence} size="compact" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// 6.4 PROACTIVE SUGGESTIONS PANEL
// Non-intrusive panel for agent-initiated suggestions
// ============================================
const ProactiveSuggestionsPanel = ({ suggestions, onAccept, onDismiss, onDismissAll }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
            <span className="text-lg">💡</span>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 text-sm">Agent Suggestions</h4>
            <p className="text-xs text-gray-500">{suggestions.length} proactive insight{suggestions.length > 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {suggestions.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onDismissAll(); }}
              className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded hover:bg-white transition-colors"
            >
              Dismiss all
            </button>
          )}
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Suggestions List */}
      {isExpanded && (
        <div className="divide-y divide-gray-100">
          {suggestions.map((suggestion) => {
            const agent = agents[suggestion.agentId];
            return (
              <div key={suggestion.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                    style={{ backgroundColor: agent.bgColor }}
                  >
                    {agent.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium" style={{ color: agent.color }}>{agent.name}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">{suggestion.type}</span>
                    </div>
                    <p className="text-sm text-gray-900 mb-2">{suggestion.content}</p>
                    
                    {/* Evidence/Context */}
                    {suggestion.evidence && (
                      <div className="text-xs text-gray-500 bg-gray-50 rounded p-2 mb-2">
                        <span className="font-medium">Based on: </span>
                        {suggestion.evidence}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onAccept(suggestion.id)}
                        className="px-3 py-1.5 text-xs font-medium text-white rounded-lg transition-colors"
                        style={{ backgroundColor: agent.color }}
                      >
                        {suggestion.actionLabel || 'Accept'}
                      </button>
                      <button
                        onClick={() => onDismiss(suggestion.id)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Dismiss
                      </button>
                      {suggestion.learnMore && (
                        <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors">
                          Learn more →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ============================================
// 6.1 AGENT PANEL
// Sidebar showing available agents and active tasks
// ============================================
const AgentPanel = ({ 
  isOpen, 
  onToggle, 
  tasks, 
  activeTaskId,
  onSelectTask,
  onInvokeAgent,
  suggestions,
  onAcceptSuggestion,
  onDismissSuggestion,
  onDismissAllSuggestions
}) => {
  const [view, setView] = useState('tasks'); // 'tasks' | 'agents'

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 border-r-0 rounded-l-lg px-2 py-4 shadow-lg hover:bg-gray-50 transition-all z-40"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl">🤖</span>
          <span className="text-xs font-medium text-gray-600 writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>
            Agents ({tasks.filter(t => t.status === 'running').length} active)
          </span>
        </div>
      </button>
    );
  }

  const activeTasks = tasks.filter(t => ['running', 'thinking', 'pending'].includes(t.status));
  const completedTasks = tasks.filter(t => t.status === 'complete');

  return (
    <div className="w-96 h-full bg-white border-l border-gray-200 flex flex-col shadow-xl z-40">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Agent Ensemble</h3>
              <p className="text-xs text-gray-500">
                {activeTasks.length} active • {completedTasks.length} complete
              </p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setView('tasks')}
            className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              view === 'tasks' 
                ? 'bg-white shadow-sm text-gray-900' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Active Tasks
          </button>
          <button
            onClick={() => setView('agents')}
            className={`flex-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              view === 'agents' 
                ? 'bg-white shadow-sm text-gray-900' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All Agents
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {view === 'agents' ? (
          /* Agents Grid */
          <div className="grid grid-cols-2 gap-3">
            {Object.values(agents).map(agent => (
              <button
                key={agent.id}
                onClick={() => onInvokeAgent(agent.id)}
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all text-left"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
                  style={{ backgroundColor: agent.bgColor }}
                >
                  {agent.icon}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{agent.name}</h4>
                <p className="text-xs text-gray-500">{agent.description}</p>
              </button>
            ))}
          </div>
        ) : (
          /* Tasks List */
          <div className="space-y-4">
            {/* Active Tasks */}
            {activeTasks.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Active ({activeTasks.length})
                </h4>
                <div className="space-y-2">
                  {activeTasks.map(task => (
                    <AgentTaskCard
                      key={task.id}
                      task={task}
                      isActive={activeTaskId === task.id}
                      onClick={() => onSelectTask(task.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Completed ({completedTasks.length})
                </h4>
                <div className="space-y-2">
                  {completedTasks.map(task => (
                    <AgentTaskCard
                      key={task.id}
                      task={task}
                      isActive={activeTaskId === task.id}
                      onClick={() => onSelectTask(task.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {tasks.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">🤖</span>
                </div>
                <p className="text-sm text-gray-500 mb-1">No active tasks</p>
                <p className="text-xs text-gray-400">Select an agent to get started</p>
                <button
                  onClick={() => setView('agents')}
                  className="mt-3 px-4 py-2 text-sm font-medium text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
                >
                  View Agents
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Proactive Suggestions */}
      {suggestions && suggestions.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <ProactiveSuggestionsPanel
            suggestions={suggestions}
            onAccept={onAcceptSuggestion}
            onDismiss={onDismissSuggestion}
            onDismissAll={onDismissAllSuggestions}
          />
        </div>
      )}

      {/* Quick Invoke */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-500 mb-2">Quick invoke</p>
        <div className="flex gap-2">
          {Object.values(agents).map(agent => (
            <button
              key={agent.id}
              onClick={() => onInvokeAgent(agent.id)}
              className="flex-1 p-2 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-all"
              title={agent.name}
            >
              <span className="text-xl">{agent.icon}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// AGENT INVOKE MODAL
// Modal for starting a new agent task
// ============================================
const AgentInvokeModal = ({ agent, onClose, onStart }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedCapability, setSelectedCapability] = useState(null);

  if (!agent) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div 
          className="px-6 py-4 border-b"
          style={{ backgroundColor: agent.bgColor }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${agent.color}20` }}
            >
              {agent.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{agent.name} Agent</h3>
              <p className="text-sm text-gray-600">{agent.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Capabilities */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">What should {agent.name} do?</label>
            <div className="grid grid-cols-2 gap-2">
              {agent.reactive.map((cap, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCapability(cap)}
                  className={`p-3 text-left text-sm rounded-lg border-2 transition-all ${
                    selectedCapability === cap
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Prompt */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Additional context (optional)</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Provide any specific instructions or context..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Proactive Options */}
          <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">💡</span>
              <span className="text-sm font-medium text-amber-800">Enable proactive suggestions</span>
            </div>
            <p className="text-xs text-amber-700">{agent.name} can also: {agent.proactive.join(', ')}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onStart({ capability: selectedCapability, prompt })}
            disabled={!selectedCapability}
            className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: agent.color }}
          >
            Start Task
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP - Phase 3 Demo
// ============================================
export default function Phase3AgentCore() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [activeTaskId, setActiveTaskId] = useState('task-1');
  const [invokeAgent, setInvokeAgent] = useState(null);
  const [expandedGlassBox, setExpandedGlassBox] = useState(false);

  const [tasks, setTasks] = useState([
    {
      id: 'task-1',
      agentId: 'decode',
      title: 'Analyse Q3 Performance Report',
      status: 'running',
      progress: 65,
      confidence: 78,
      thinking: [
        { 
          timestamp: '10:23:15',
          content: 'Reading Q3 Marketing Performance Report (24 pages)...'
        },
        { 
          timestamp: '10:23:18',
          content: 'Identified key discrepancy: 150% investment increase vs 8% growth. This is a significant gap that needs explanation.',
          decision: true,
          options: [
            { text: 'Focus on spend efficiency analysis', selected: true },
            { text: 'Compare to industry benchmarks', selected: false },
            { text: 'Look at channel breakdown', selected: false },
          ]
        },
        { 
          timestamp: '10:23:22',
          content: 'Cross-referencing with Category Growth Analysis to determine if growth is market-driven or brand-driven...'
        },
      ],
      actions: [
        { title: 'Document scan', description: 'Extracting text and structure', status: 'complete', duration: '2.3s' },
        { title: 'Key metrics extraction', description: 'Identifying numerical data points', status: 'complete', duration: '1.8s' },
        { title: 'Cross-reference analysis', description: 'Comparing against other sources', status: 'running' },
        { title: 'Generate summary', description: 'Creating structured findings', status: 'pending' },
      ],
      sources: [
        { 
          title: 'Q3 Marketing Performance Report', 
          type: 'client', 
          page: 4, 
          relevance: 95,
          usageCount: 3,
          excerpt: 'Marketing investment increased 150% YoY while revenue growth remained at 8%'
        },
        { 
          title: 'Category Growth Analysis 2024', 
          type: 'research', 
          page: 8, 
          relevance: 82,
          usageCount: 1,
          excerpt: 'Category CAGR of 12% driven primarily by new market entrants'
        },
      ],
      output: null
    },
    {
      id: 'task-2',
      agentId: 'inquiry',
      title: 'Test hypothesis: Category vs Brand demand',
      status: 'thinking',
      progress: 30,
      confidence: 45,
      thinking: [
        { 
          timestamp: '10:25:01',
          content: 'Hypothesis received: Performance driven by category-level demand, not brand-level demand'
        },
        { 
          timestamp: '10:25:04',
          content: 'Searching for evidence to support or contradict...'
        },
      ],
      actions: [
        { title: 'Hypothesis parsing', description: 'Understanding the claim structure', status: 'complete', duration: '0.5s' },
        { title: 'Evidence search', description: 'Finding supporting data', status: 'running' },
      ],
      sources: [],
      output: null
    },
    {
      id: 'task-3',
      agentId: 'translation',
      title: 'Generate CFO-ready summary',
      status: 'complete',
      confidence: 92,
      thinking: [
        { 
          timestamp: '10:20:00',
          content: 'Received technical findings from Synthesis agent'
        },
        { 
          timestamp: '10:20:05',
          content: 'Identified target audience: CFO, board-level stakeholders. Adjusting language accordingly.'
        },
        { 
          timestamp: '10:20:12',
          content: 'Removing technical jargon: "econometric attribution" → "return on investment analysis"'
        },
        { 
          timestamp: '10:20:18',
          content: 'Adding business impact framing: quantifying opportunity cost'
        },
      ],
      actions: [
        { title: 'Audience analysis', description: 'Determining appropriate tone', status: 'complete', duration: '0.8s' },
        { title: 'Jargon detection', description: 'Finding technical terms to simplify', status: 'complete', duration: '1.2s' },
        { title: 'Impact reframing', description: 'Adding business context', status: 'complete', duration: '2.1s' },
        { title: 'Summary generation', description: 'Creating executive summary', status: 'complete', duration: '3.4s' },
      ],
      sources: [
        { 
          title: 'CFO Interview Notes', 
          type: 'interview', 
          page: 2, 
          relevance: 100,
          usageCount: 2,
          excerpt: 'Every marketing dollar is being questioned by the board'
        },
      ],
      output: {
        content: `Executive Summary: Marketing Investment Gap Analysis

The data reveals a critical disconnect between marketing spend and business outcomes that requires immediate attention.

KEY FINDING: Despite increasing marketing investment by 150% year-over-year, revenue growth has remained flat at 8%—well below the category average of 12%.

BUSINESS IMPACT: At current trajectory, the company is losing approximately £2.3M annually in potential revenue by not addressing this efficiency gap.

ROOT CAUSE INDICATORS:
• Category tailwinds may be masking brand weakness
• Investment allocation appears misaligned with growth drivers
• Attribution methodology may be overstating marketing contribution

RECOMMENDED NEXT STEPS:
1. Commission independent marketing effectiveness audit
2. Reallocate 20% of budget to test-and-learn initiatives
3. Establish monthly ROI review with finance team`
      }
    },
  ]);

  const [suggestions, setSuggestions] = useState([
    {
      id: 'sug-1',
      agentId: 'decode',
      type: 'Data Gap',
      content: 'Customer segmentation data is missing from the Fact Pack. This could strengthen the growth analysis.',
      evidence: 'Referenced in Q3 Report (p.12) but no supporting data found',
      actionLabel: 'Search for segments',
      learnMore: true
    },
    {
      id: 'sug-2',
      agentId: 'inquiry',
      type: 'Alternative Hypothesis',
      content: 'Consider testing: "Competitor activity is capturing category growth disproportionately"',
      evidence: 'Category CAGR (12%) significantly exceeds brand growth (8%)',
      actionLabel: 'Add hypothesis',
    },
  ]);

  const activeTask = tasks.find(t => t.id === activeTaskId);

  const handleInvokeAgent = (agentId) => {
    setInvokeAgent(agents[agentId]);
  };

  const handleStartTask = ({ capability, prompt }) => {
    const newTask = {
      id: `task-${Date.now()}`,
      agentId: invokeAgent.id,
      title: capability,
      status: 'pending',
      progress: 0,
      confidence: 0,
      thinking: [],
      actions: [],
      sources: [],
      output: null
    };
    setTasks(prev => [...prev, newTask]);
    setActiveTaskId(newTask.id);
    setInvokeAgent(null);

    // Simulate task starting
    setTimeout(() => {
      setTasks(prev => prev.map(t => 
        t.id === newTask.id 
          ? { ...t, status: 'running', thinking: [{ timestamp: new Date().toLocaleTimeString(), content: 'Starting task...' }] }
          : t
      ));
    }, 500);
  };

  const handleAcceptSuggestion = (id) => {
    setSuggestions(prev => prev.filter(s => s.id !== id));
    // In reality, would trigger the suggested action
  };

  const handleDismissSuggestion = (id) => {
    setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Phase 3: Agent Core</h1>
              <p className="text-xs text-gray-500">Agent Panel, Glass Box, Task Cards, Proactive Suggestions</p>
            </div>
          </div>
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              panelOpen 
                ? 'bg-purple-100 text-purple-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-lg">🤖</span>
            Agent Ensemble
            <span className="bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              {tasks.filter(t => t.status === 'running').length}
            </span>
          </button>
        </div>

        {/* Main Area with Glass Box */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Active Task Glass Box */}
            {activeTask && (
              <GlassBoxWindow
                task={activeTask}
                isExpanded={expandedGlassBox}
                onToggleExpand={() => setExpandedGlassBox(!expandedGlassBox)}
              />
            )}

            {/* Agent Showcase */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Agent Ensemble</h2>
              <div className="grid grid-cols-4 gap-4">
                {Object.values(agents).map(agent => (
                  <button
                    key={agent.id}
                    onClick={() => handleInvokeAgent(agent.id)}
                    className="p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left group"
                  >
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-3 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: agent.bgColor }}
                    >
                      {agent.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{agent.name}</h4>
                    <p className="text-xs text-gray-500 mb-3">{agent.description}</p>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-400">Reactive:</p>
                      <ul className="text-xs text-gray-500 space-y-0.5">
                        {agent.reactive.slice(0, 2).map((r, i) => (
                          <li key={i}>• {r}</li>
                        ))}
                      </ul>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Proactive Suggestions (standalone demo) */}
            <ProactiveSuggestionsPanel
              suggestions={suggestions}
              onAccept={handleAcceptSuggestion}
              onDismiss={handleDismissSuggestion}
              onDismissAll={() => setSuggestions([])}
            />

            {/* Glass Box Explanation */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Glass Box Transparency</h2>
              <p className="text-sm text-gray-600 mb-4">
                Every agent interaction shows what the agent is thinking, doing, and using—building trust through transparency.
              </p>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="bg-white bg-opacity-70 rounded-lg p-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-xl">🧠</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Thinking</h4>
                  <p className="text-gray-600 text-xs">See the reasoning chain and decision points as the agent works</p>
                </div>
                <div className="bg-white bg-opacity-70 rounded-lg p-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-xl">⚡</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Actions</h4>
                  <p className="text-gray-600 text-xs">Track each step the agent takes with timing and status</p>
                </div>
                <div className="bg-white bg-opacity-70 rounded-lg p-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-xl">📚</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Sources</h4>
                  <p className="text-gray-600 text-xs">Full data provenance with excerpts and relevance scores</p>
                </div>
                <div className="bg-white bg-opacity-70 rounded-lg p-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-xl">📊</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">Confidence</h4>
                  <p className="text-gray-600 text-xs">Honest uncertainty levels for every output</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Agent Panel */}
      <AgentPanel
        isOpen={panelOpen}
        onToggle={() => setPanelOpen(!panelOpen)}
        tasks={tasks}
        activeTaskId={activeTaskId}
        onSelectTask={setActiveTaskId}
        onInvokeAgent={handleInvokeAgent}
        suggestions={suggestions}
        onAcceptSuggestion={handleAcceptSuggestion}
        onDismissSuggestion={handleDismissSuggestion}
        onDismissAllSuggestions={() => setSuggestions([])}
      />

      {/* Invoke Modal */}
      <AgentInvokeModal
        agent={invokeAgent}
        onClose={() => setInvokeAgent(null)}
        onStart={handleStartTask}
      />
    </div>
  );
}
