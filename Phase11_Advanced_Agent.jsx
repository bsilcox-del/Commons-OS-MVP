import React, { useState, useRef, useEffect } from 'react';

// ============================================
// PHASE 11: ADVANCED AGENT FEATURES
// Commons OS Problem Pursuit Canvas
// Mention Interface, Result Cards, History
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

// Agent personas
const agentPersonas = [
  {
    id: 'decode',
    name: 'Decode',
    icon: '🔍',
    color: '#3B82F6',
    description: 'Analyse sources and extract insights',
    capabilities: ['Source analysis', 'Data extraction', 'Pattern identification', 'Quality scoring'],
  },
  {
    id: 'probe',
    name: 'Probe',
    icon: '🎯',
    color: '#8B5CF6',
    description: 'Test and validate hypotheses',
    capabilities: ['Hypothesis testing', 'Evidence gathering', 'Confidence assessment', 'Gap identification'],
  },
  {
    id: 'frame',
    name: 'Frame',
    icon: '🖼️',
    color: '#1A9B9B',
    description: 'Structure and articulate problems',
    capabilities: ['Problem framing', 'Root cause analysis', 'Synthesis', 'Articulation'],
  },
  {
    id: 'challenge',
    name: 'Challenge',
    icon: '⚡',
    color: '#E8846B',
    description: 'Stress-test and find weaknesses',
    capabilities: ['Red team analysis', 'Assumption testing', 'Devil\'s advocate', 'Risk identification'],
  },
];

// Quick actions
const quickActions = [
  { id: 'analyse', label: 'Analyse this source', icon: '📊', agent: 'decode' },
  { id: 'extract', label: 'Extract key insights', icon: '💡', agent: 'decode' },
  { id: 'test', label: 'Test this hypothesis', icon: '🧪', agent: 'probe' },
  { id: 'evidence', label: 'Find supporting evidence', icon: '🔎', agent: 'probe' },
  { id: 'reframe', label: 'Reframe the problem', icon: '🔄', agent: 'frame' },
  { id: 'synthesise', label: 'Synthesise findings', icon: '🧩', agent: 'frame' },
  { id: 'challenge', label: 'Challenge assumptions', icon: '⚠️', agent: 'challenge' },
  { id: 'risks', label: 'Identify risks', icon: '🚨', agent: 'challenge' },
];

// Demo agent history
const demoHistory = [
  {
    id: 'task-1',
    agent: 'decode',
    action: 'Analysed Q4 Brand Tracker',
    result: 'Extracted 12 key metrics, identified 3 emerging trends',
    timestamp: new Date(Date.now() - 1800000),
    status: 'complete',
    confidence: 85,
  },
  {
    id: 'task-2',
    agent: 'probe',
    action: 'Tested H3: Category growth masking brand weakness',
    result: 'Found strong supporting evidence (4 sources)',
    timestamp: new Date(Date.now() - 3600000),
    status: 'complete',
    confidence: 78,
  },
  {
    id: 'task-3',
    agent: 'frame',
    action: 'Synthesised Strategic Reality findings',
    result: 'Generated problem statement draft',
    timestamp: new Date(Date.now() - 7200000),
    status: 'complete',
    confidence: 82,
  },
  {
    id: 'task-4',
    agent: 'challenge',
    action: 'Stress-tested measurement methodology',
    result: 'Identified 2 critical assumptions to validate',
    timestamp: new Date(Date.now() - 10800000),
    status: 'complete',
    confidence: 71,
  },
];

// ============================================
// 6.5 AGENT MENTION INTERFACE
// @mention dropdown for invoking agents
// ============================================
const AgentMentionInterface = ({ onSelect, onClose, position = 'below' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('agents');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredAgents = agentPersonas.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredActions = quickActions.filter(action =>
    action.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentList = activeTab === 'agents' ? filteredAgents : filteredActions;

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, currentList.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && currentList[selectedIndex]) {
      e.preventDefault();
      onSelect(currentList[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      setActiveTab(activeTab === 'agents' ? 'actions' : 'agents');
      setSelectedIndex(0);
    }
  };

  return (
    <div className="w-80 bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden">
      {/* Search Input */}
      <div className="p-3 border-b border-gray-100">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600 font-bold">@</span>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Search agents or actions..."
            className="w-full pl-8 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => { setActiveTab('agents'); setSelectedIndex(0); }}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'agents'
              ? 'text-teal-600 border-b-2 border-teal-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Agents
        </button>
        <button
          onClick={() => { setActiveTab('actions'); setSelectedIndex(0); }}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'actions'
              ? 'text-teal-600 border-b-2 border-teal-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Quick Actions
        </button>
      </div>

      {/* Results */}
      <div className="max-h-64 overflow-auto">
        {activeTab === 'agents' ? (
          filteredAgents.length > 0 ? (
            filteredAgents.map((agent, idx) => (
              <button
                key={agent.id}
                onClick={() => onSelect(agent)}
                className={`w-full px-4 py-3 flex items-start gap-3 text-left transition-colors ${
                  idx === selectedIndex ? 'bg-teal-50' : 'hover:bg-gray-50'
                }`}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: `${agent.color}20` }}
                >
                  {agent.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{agent.name}</span>
                    <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">Agent</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{agent.description}</p>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-gray-500">No agents found</p>
            </div>
          )
        ) : (
          filteredActions.length > 0 ? (
            filteredActions.map((action, idx) => {
              const agent = agentPersonas.find(a => a.id === action.agent);
              return (
                <button
                  key={action.id}
                  onClick={() => onSelect(action)}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                    idx === selectedIndex ? 'bg-teal-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{action.icon}</span>
                  <div className="flex-1">
                    <span className="text-sm text-gray-900">{action.label}</span>
                  </div>
                  <span 
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${agent?.color}20`, color: agent?.color }}
                  >
                    {agent?.name}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-gray-500">No actions found</p>
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <span>
          <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded">↑↓</kbd> Navigate
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded">Tab</kbd> Switch
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded">Enter</kbd> Select
        </span>
      </div>
    </div>
  );
};

// ============================================
// 6.6 AGENT RESULT CARD
// Display agent task results
// ============================================
const AgentResultCard = ({ result, onAccept, onReject, onExpand, isExpanded }) => {
  const agent = agentPersonas.find(a => a.id === result.agent);

  const formatTime = (date) => {
    const minutes = Math.floor((Date.now() - date) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div 
        className="px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: `${agent?.color}10` }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
            style={{ backgroundColor: `${agent?.color}20` }}
          >
            {agent?.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{agent?.name}</p>
            <p className="text-xs text-gray-500">{formatTime(result.timestamp)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {result.confidence && (
            <span 
              className="text-xs px-2 py-1 rounded-full font-medium"
              style={{ 
                backgroundColor: result.confidence >= 75 ? '#DCFCE7' : result.confidence >= 50 ? '#FEF3C7' : '#FEE2E2',
                color: result.confidence >= 75 ? '#166534' : result.confidence >= 50 ? '#854D0E' : '#991B1B'
              }}
            >
              {result.confidence}% confident
            </span>
          )}
          <span className={`text-xs px-2 py-1 rounded-full ${
            result.status === 'complete' ? 'bg-green-100 text-green-700' :
            result.status === 'running' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-600'
          }`}>
            {result.status === 'complete' ? '✓ Complete' : result.status === 'running' ? '⟳ Running' : 'Pending'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-gray-900 mb-1">{result.action}</p>
        <p className="text-sm text-gray-600">{result.result}</p>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">Details</h5>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Analysed 4 data sources</p>
            <p>• Processing time: 2.3 seconds</p>
            <p>• Confidence factors: Data quality (high), Source relevance (high), Sample size (medium)</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
        <button
          onClick={onExpand}
          className="text-xs text-gray-500 hover:text-gray-700 font-medium"
        >
          {isExpanded ? 'Show less' : 'Show details'}
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onReject}
            className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Dismiss
          </button>
          <button
            onClick={onAccept}
            className="px-3 py-1.5 text-xs font-medium text-white rounded-lg transition-colors"
            style={{ backgroundColor: agent?.color }}
          >
            Apply Result
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// AGENT ACTION MENU
// Context menu for agent actions on elements
// ============================================
const AgentActionMenu = ({ element, position, onAction, onClose }) => {
  const relevantActions = quickActions.filter(action => {
    if (element.type === 'source') return ['analyse', 'extract'].includes(action.id);
    if (element.type === 'hypothesis') return ['test', 'evidence', 'challenge'].includes(action.id);
    if (element.type === 'evidence') return ['analyse', 'challenge'].includes(action.id);
    return true;
  });

  return (
    <div 
      className="absolute bg-white rounded-xl border border-gray-200 shadow-xl w-64 overflow-hidden z-50"
      style={{ left: position.x, top: position.y }}
    >
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase">Agent Actions</p>
      </div>
      <div className="py-1">
        {relevantActions.map(action => {
          const agent = agentPersonas.find(a => a.id === action.agent);
          return (
            <button
              key={action.id}
              onClick={() => { onAction(action); onClose(); }}
              className="w-full px-4 py-2 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg">{action.icon}</span>
              <span className="flex-1 text-sm text-gray-700">{action.label}</span>
              <span 
                className="w-6 h-6 rounded flex items-center justify-center text-xs"
                style={{ backgroundColor: `${agent?.color}20` }}
              >
                {agent?.icon}
              </span>
            </button>
          );
        })}
      </div>
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
        <button className="text-xs text-teal-600 hover:text-teal-700 font-medium">
          Custom prompt...
        </button>
      </div>
    </div>
  );
};

// ============================================
// AGENT HISTORY PANEL
// View past agent interactions
// ============================================
const AgentHistoryPanel = ({ history, onRerun, onViewDetails }) => {
  const [filter, setFilter] = useState('all');

  const filteredHistory = history.filter(item => {
    if (filter === 'all') return true;
    return item.agent === filter;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🕐</span>
          <h3 className="font-semibold text-gray-900 text-sm">Agent History</h3>
        </div>
        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
          {history.length} tasks
        </span>
      </div>

      {/* Filters */}
      <div className="px-4 py-2 border-b border-gray-100 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
            filter === 'all' ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          All
        </button>
        {agentPersonas.map(agent => (
          <button
            key={agent.id}
            onClick={() => setFilter(agent.id)}
            className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors flex items-center gap-1 ${
              filter === agent.id ? 'text-white' : 'text-gray-500 hover:bg-gray-100'
            }`}
            style={{ backgroundColor: filter === agent.id ? agent.color : undefined }}
          >
            <span>{agent.icon}</span>
            <span>{agent.name}</span>
          </button>
        ))}
      </div>

      {/* History List */}
      <div className="max-h-80 overflow-auto divide-y divide-gray-100">
        {filteredHistory.map(item => {
          const agent = agentPersonas.find(a => a.id === item.agent);
          const formatTime = (date) => {
            const minutes = Math.floor((Date.now() - date) / 60000);
            if (minutes < 60) return `${minutes}m ago`;
            const hours = Math.floor(minutes / 60);
            return `${hours}h ago`;
          };

          return (
            <div key={item.id} className="px-4 py-3 hover:bg-gray-50 group">
              <div className="flex items-start gap-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{ backgroundColor: `${agent?.color}20` }}
                >
                  {agent?.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-gray-900">{item.action}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{item.result}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400">{formatTime(item.timestamp)}</span>
                    <span 
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{ 
                        backgroundColor: item.confidence >= 75 ? '#DCFCE7' : '#FEF3C7',
                        color: item.confidence >= 75 ? '#166534' : '#854D0E'
                      }}
                    >
                      {item.confidence}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onRerun(item)}
                    className="p-1.5 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded"
                    title="Run again"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onViewDetails(item)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                    title="View details"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// AGENT INPUT BOX
// Text input with @mention support
// ============================================
const AgentInputBox = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [mentionPosition, setMentionPosition] = useState(0);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    const lastAtIndex = newValue.lastIndexOf('@');
    if (lastAtIndex !== -1 && lastAtIndex === newValue.length - 1) {
      setShowMentions(true);
      setMentionPosition(lastAtIndex);
    } else if (lastAtIndex !== -1 && !newValue.slice(lastAtIndex).includes(' ')) {
      setShowMentions(true);
      setMentionPosition(lastAtIndex);
    } else {
      setShowMentions(false);
    }
  };

  const handleMentionSelect = (item) => {
    const beforeMention = value.slice(0, mentionPosition);
    const newValue = `${beforeMention}@${item.name || item.label} `;
    setValue(newValue);
    setShowMentions(false);
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue('');
    }
  };

  return (
    <div className="relative">
      <div className="flex items-end gap-2 p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
        <textarea
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !showMentions) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Ask the agent... (type @ to mention)"
          className="flex-1 resize-none border-0 focus:ring-0 text-sm text-gray-900 placeholder-gray-400"
          rows={2}
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="p-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>

      {/* Mention Dropdown */}
      {showMentions && (
        <div className="absolute bottom-full left-0 mb-2 z-50">
          <AgentMentionInterface
            onSelect={handleMentionSelect}
            onClose={() => setShowMentions(false)}
          />
        </div>
      )}

      {/* Keyboard hint */}
      <div className="flex items-center justify-between mt-2 px-1 text-xs text-gray-400">
        <span>
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded">@</kbd> to mention agent
        </span>
        <span>
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded">Enter</kbd> to send
        </span>
      </div>
    </div>
  );
};

// ============================================
// AGENT CARD (Persona Card)
// Display agent details
// ============================================
const AgentCard = ({ agent, isActive, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(agent)}
      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
        isActive 
          ? 'border-teal-500 bg-teal-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow'
      }`}
    >
      <div className="flex items-start gap-3">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${agent.color}20` }}
        >
          {agent.icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{agent.name}</h4>
          <p className="text-sm text-gray-500 mt-0.5">{agent.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {agent.capabilities.slice(0, 2).map(cap => (
              <span 
                key={cap} 
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${agent.color}15`, color: agent.color }}
              >
                {cap}
              </span>
            ))}
            {agent.capabilities.length > 2 && (
              <span className="text-xs text-gray-400">+{agent.capabilities.length - 2}</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

// ============================================
// MAIN APP - Phase 11 Demo
// ============================================
export default function Phase11AdvancedAgent() {
  const [showMentions, setShowMentions] = useState(false);
  const [expandedResult, setExpandedResult] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Phase 11: Advanced Agent Features</h1>
            <p className="text-xs text-gray-500">Mention Interface, Result Cards, Agent History</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Agent Personas */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Agent Personas</h3>
            <p className="text-xs text-gray-500">Select an agent to interact with</p>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {agentPersonas.map(agent => (
              <AgentCard
                key={agent.id}
                agent={agent}
                isActive={selectedAgent?.id === agent.id}
                onSelect={setSelectedAgent}
              />
            ))}
          </div>
        </div>

        {/* Center - Demo Area */}
        <div className="flex-1 flex flex-col p-6 overflow-auto">
          <div className="max-w-2xl mx-auto w-full space-y-6">
            {/* Component 6.5: Agent Mention Interface */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">6.5</span>
                <h3 className="font-semibold text-gray-900">Agent Mention Interface</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Type @ to invoke agents or trigger quick actions
              </p>
              <AgentInputBox onSubmit={(v) => console.log('Submitted:', v)} />
            </div>

            {/* Component 6.6: Agent Result Cards */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">6.6</span>
                <h3 className="font-semibold text-gray-900">Agent Result Card</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Results from agent tasks with accept/reject actions
              </p>
              <AgentResultCard
                result={demoHistory[0]}
                onAccept={() => alert('Result accepted!')}
                onReject={() => alert('Result dismissed')}
                onExpand={() => setExpandedResult(expandedResult === 'demo' ? null : 'demo')}
                isExpanded={expandedResult === 'demo'}
              />
            </div>

            {/* Standalone Mention Popup Demo */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">📋</span>
                <h3 className="font-semibold text-gray-900">Mention Dropdown Preview</h3>
              </div>
              <button
                onClick={() => setShowMentions(!showMentions)}
                className="px-4 py-2 text-sm font-medium text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100"
              >
                {showMentions ? 'Hide' : 'Show'} @mention dropdown
              </button>
              {showMentions && (
                <div className="mt-4">
                  <AgentMentionInterface
                    onSelect={(item) => { console.log('Selected:', item); setShowMentions(false); }}
                    onClose={() => setShowMentions(false)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Agent History */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-4">
            <AgentHistoryPanel
              history={demoHistory}
              onRerun={(item) => console.log('Rerun:', item)}
              onViewDetails={(item) => console.log('View:', item)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
