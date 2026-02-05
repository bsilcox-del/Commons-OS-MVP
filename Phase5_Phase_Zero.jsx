import React, { useState, useEffect } from 'react';

// ============================================
// PHASE 5: PHASE ZERO COMPONENTS
// Commons OS Problem Pursuit Canvas
// Strategic Context Establishment
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

// Horizon configurations
const horizons = {
  short: {
    id: 'short',
    label: '0-12 Months',
    description: 'Immediate priorities',
    icon: '🎯',
    color: '#22C55E',
    bgColor: '#DCFCE7',
  },
  medium: {
    id: 'medium',
    label: '12-24 Months',
    description: 'Medium-term goals',
    icon: '📈',
    color: '#3B82F6',
    bgColor: '#DBEAFE',
  },
  long: {
    id: 'long',
    label: '24+ Months',
    description: 'Long-term vision',
    icon: '🔭',
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
  },
};

// Alignment dimension configurations
const alignmentDimensions = {
  measurement: {
    id: 'measurement',
    label: 'Measurement Capability',
    description: 'Ability to attribute outcomes to marketing activities',
    icon: '📊',
    questions: [
      { id: 'econometrics', text: 'Do you have econometric/MMM capability?', weight: 3 },
      { id: 'attribution', text: 'Can you attribute revenue to marketing channels?', weight: 3 },
      { id: 'tracking', text: 'Is brand tracking in place and regular?', weight: 2 },
      { id: 'dashboards', text: 'Do you have real-time performance dashboards?', weight: 1 },
    ],
  },
  objectives: {
    id: 'objectives',
    label: 'Objective Clarity',
    description: 'How clearly marketing objectives connect to business goals',
    icon: '🎯',
    questions: [
      { id: 'business_link', text: 'Are marketing objectives linked to business outcomes?', weight: 3 },
      { id: 'kpis_defined', text: 'Are KPIs clearly defined and agreed with leadership?', weight: 2 },
      { id: 'targets_realistic', text: 'Are targets realistic and evidence-based?', weight: 2 },
      { id: 'alignment_checked', text: 'Is objective alignment reviewed regularly?', weight: 1 },
    ],
  },
  investment: {
    id: 'investment',
    label: 'Investment Rationale',
    description: 'How marketing investment decisions are made and justified',
    icon: '💰',
    questions: [
      { id: 'budget_process', text: 'Is there a structured budget allocation process?', weight: 2 },
      { id: 'roi_focus', text: 'Are investment decisions ROI-driven?', weight: 3 },
      { id: 'scenario_planning', text: 'Do you model different investment scenarios?', weight: 2 },
      { id: 'cfo_confidence', text: 'Does the CFO have confidence in marketing spend?', weight: 3 },
    ],
  },
  capability: {
    id: 'capability',
    label: 'Team Capability',
    description: 'Marketing team skills and capacity for transformation',
    icon: '👥',
    questions: [
      { id: 'analytical_skills', text: 'Does the team have strong analytical skills?', weight: 2 },
      { id: 'strategic_thinking', text: 'Is there strategic planning capability?', weight: 2 },
      { id: 'change_appetite', text: 'Is there appetite for change in the team?', weight: 3 },
      { id: 'leadership_support', text: 'Does marketing have senior leadership support?', weight: 3 },
    ],
  },
};

// Answer options
const answerOptions = [
  { value: 0, label: 'Not at all', color: '#EF4444' },
  { value: 1, label: 'Minimally', color: '#F97316' },
  { value: 2, label: 'Partially', color: '#EAB308' },
  { value: 3, label: 'Mostly', color: '#84CC16' },
  { value: 4, label: 'Fully', color: '#22C55E' },
];

// ============================================
// AMBITION CARD
// Single objective within a horizon
// ============================================
const AmbitionCard = ({ ambition, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localText, setLocalText] = useState(ambition.text);

  const handleSave = () => {
    onUpdate(ambition.id, { text: localText });
    setIsEditing(false);
  };

  const priorityColors = {
    critical: { bg: '#FEE2E2', text: '#DC2626', label: 'Critical' },
    high: { bg: '#FEF3C7', text: '#D97706', label: 'High' },
    medium: { bg: '#DBEAFE', text: '#2563EB', label: 'Medium' },
    low: { bg: '#F3F4F6', text: '#6B7280', label: 'Low' },
  };

  const priority = priorityColors[ambition.priority] || priorityColors.medium;

  return (
    <div className={`bg-white rounded-lg border-2 p-4 transition-all ${
      isEditing ? 'border-teal-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
    }`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <select
            value={ambition.priority}
            onChange={(e) => onUpdate(ambition.id, { priority: e.target.value })}
            className="text-xs font-medium px-2 py-1 rounded-full border-none focus:outline-none cursor-pointer"
            style={{ backgroundColor: priority.bg, color: priority.text }}
          >
            {Object.entries(priorityColors).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
          {ambition.metric && (
            <span className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full">
              📊 {ambition.metric}
            </span>
          )}
        </div>
        <button
          onClick={() => onDelete(ambition.id)}
          className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {isEditing ? (
        <div>
          <textarea
            value={localText}
            onChange={(e) => setLocalText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            rows={2}
            autoFocus
          />
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              placeholder="Key metric (e.g., +15% revenue)"
              value={ambition.metric || ''}
              onChange={(e) => onUpdate(ambition.id, { metric: e.target.value })}
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => { setIsEditing(false); setLocalText(ambition.text); }}
              className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 text-xs text-white bg-teal-600 hover:bg-teal-700 rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <p 
          className="text-sm text-gray-700 cursor-text"
          onDoubleClick={() => setIsEditing(true)}
        >
          {ambition.text || 'Double-click to edit...'}
        </p>
      )}

      {/* Marketing Connection */}
      {ambition.marketingConnection && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            <span className="font-medium">Marketing connection:</span> {ambition.marketingConnection}
          </p>
        </div>
      )}
    </div>
  );
};

// ============================================
// 2.1 BUSINESS AMBITIONS PANEL
// Structured input for objectives across horizons
// ============================================
const BusinessAmbitionsPanel = ({ ambitions, onUpdate, onAdd, onDelete }) => {
  const [activeHorizon, setActiveHorizon] = useState('short');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAmbition, setNewAmbition] = useState({ text: '', priority: 'medium', metric: '' });

  const horizonAmbitions = ambitions.filter(a => a.horizon === activeHorizon);
  const horizon = horizons[activeHorizon];

  const handleAdd = () => {
    if (newAmbition.text.trim()) {
      onAdd({
        ...newAmbition,
        horizon: activeHorizon,
        id: `amb-${Date.now()}`,
      });
      setNewAmbition({ text: '', priority: 'medium', metric: '' });
      setShowAddForm(false);
    }
  };

  // Calculate completion for each horizon
  const getHorizonStats = (horizonId) => {
    const items = ambitions.filter(a => a.horizon === horizonId);
    const withMetrics = items.filter(a => a.metric);
    return {
      total: items.length,
      withMetrics: withMetrics.length,
    };
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
            <span className="text-xl">🎯</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Business Ambitions</h3>
            <p className="text-sm text-gray-500">What does success look like across time horizons?</p>
          </div>
        </div>
      </div>

      {/* Horizon Tabs */}
      <div className="flex border-b border-gray-200">
        {Object.values(horizons).map((h) => {
          const stats = getHorizonStats(h.id);
          return (
            <button
              key={h.id}
              onClick={() => setActiveHorizon(h.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-all relative ${
                activeHorizon === h.id
                  ? 'text-gray-900 bg-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span>{h.icon}</span>
                <span>{h.label}</span>
                {stats.total > 0 && (
                  <span 
                    className="text-xs px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: h.bgColor, color: h.color }}
                  >
                    {stats.total}
                  </span>
                )}
              </div>
              {activeHorizon === h.id && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: h.color }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Horizon Content */}
      <div className="p-6">
        <div 
          className="flex items-center gap-2 mb-4 p-3 rounded-lg"
          style={{ backgroundColor: horizon.bgColor }}
        >
          <span className="text-2xl">{horizon.icon}</span>
          <div>
            <h4 className="font-medium" style={{ color: horizon.color }}>{horizon.label}</h4>
            <p className="text-xs text-gray-600">{horizon.description}</p>
          </div>
        </div>

        {/* Ambitions List */}
        <div className="space-y-3 mb-4">
          {horizonAmbitions.length > 0 ? (
            horizonAmbitions.map((ambition) => (
              <AmbitionCard
                key={ambition.id}
                ambition={ambition}
                onUpdate={(id, updates) => onUpdate(id, updates)}
                onDelete={onDelete}
              />
            ))
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
              <span className="text-3xl mb-2 block">{horizon.icon}</span>
              <p className="text-sm text-gray-500">No ambitions defined for this horizon</p>
              <p className="text-xs text-gray-400 mt-1">Add objectives to establish context</p>
            </div>
          )}
        </div>

        {/* Add Form */}
        {showAddForm ? (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <textarea
              value={newAmbition.text}
              onChange={(e) => setNewAmbition({ ...newAmbition, text: e.target.value })}
              placeholder="Describe the business objective..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none mb-3"
              rows={2}
              autoFocus
            />
            <div className="flex items-center gap-3 mb-3">
              <select
                value={newAmbition.priority}
                onChange={(e) => setNewAmbition({ ...newAmbition, priority: e.target.value })}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="critical">Critical Priority</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <input
                type="text"
                placeholder="Key metric (optional)"
                value={newAmbition.metric}
                onChange={(e) => setNewAmbition({ ...newAmbition, metric: e.target.value })}
                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!newAmbition.text.trim()}
                className="px-4 py-2 text-sm text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors disabled:opacity-50"
              >
                Add Ambition
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-400 hover:text-teal-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Ambition
          </button>
        )}
      </div>

      {/* Summary Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {ambitions.length} ambitions across {Object.keys(horizons).length} horizons
          </span>
          <div className="flex items-center gap-4">
            {Object.values(horizons).map((h) => {
              const stats = getHorizonStats(h.id);
              return (
                <div key={h.id} className="flex items-center gap-1">
                  <span>{h.icon}</span>
                  <span className="font-medium" style={{ color: h.color }}>{stats.total}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// ASSESSMENT QUESTION
// Single question in alignment assessment
// ============================================
const AssessmentQuestion = ({ question, answer, onAnswer, weight }) => {
  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-start justify-between gap-4 mb-2">
        <p className="text-sm text-gray-700 flex-1">{question.text}</p>
        <div className="flex items-center gap-1">
          {[...Array(weight)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          ))}
        </div>
      </div>
      <div className="flex gap-1">
        {answerOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(question.id, option.value)}
            className={`flex-1 px-2 py-1.5 text-xs font-medium rounded transition-all ${
              answer === option.value
                ? 'text-white shadow-sm'
                : 'text-gray-500 bg-gray-100 hover:bg-gray-200'
            }`}
            style={{
              backgroundColor: answer === option.value ? option.color : undefined,
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================
// DIMENSION SCORE CARD
// Score display for a single dimension
// ============================================
const DimensionScoreCard = ({ dimension, score, maxScore, isExpanded, onToggle }) => {
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  const config = alignmentDimensions[dimension];

  const getScoreColor = (pct) => {
    if (pct >= 75) return '#22C55E';
    if (pct >= 50) return '#EAB308';
    if (pct >= 25) return '#F97316';
    return '#EF4444';
  };

  const getScoreLabel = (pct) => {
    if (pct >= 75) return 'Strong';
    if (pct >= 50) return 'Moderate';
    if (pct >= 25) return 'Weak';
    return 'Critical Gap';
  };

  return (
    <div 
      className={`bg-white rounded-lg border-2 transition-all cursor-pointer ${
        isExpanded ? 'border-purple-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onToggle}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
              {config.icon}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{config.label}</h4>
              <p className="text-xs text-gray-500">{config.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div 
              className="text-2xl font-bold"
              style={{ color: getScoreColor(percentage) }}
            >
              {percentage}%
            </div>
            <div 
              className="text-xs font-medium"
              style={{ color: getScoreColor(percentage) }}
            >
              {getScoreLabel(percentage)}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${percentage}%`,
              backgroundColor: getScoreColor(percentage)
            }}
          />
        </div>
      </div>

      {/* Expand indicator */}
      <div className="px-4 pb-3 flex items-center justify-center">
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
  );
};

// ============================================
// 2.2 MARKETING ALIGNMENT ASSESSMENT
// Diagnostic interface for measurement, objectives, investment
// ============================================
const MarketingAlignmentAssessment = ({ answers, onAnswer }) => {
  const [expandedDimension, setExpandedDimension] = useState(null);

  // Calculate scores for each dimension
  const calculateDimensionScore = (dimensionId) => {
    const dimension = alignmentDimensions[dimensionId];
    let score = 0;
    let maxScore = 0;

    dimension.questions.forEach((q) => {
      maxScore += q.weight * 4; // Max answer is 4
      if (answers[q.id] !== undefined) {
        score += answers[q.id] * q.weight;
      }
    });

    return { score, maxScore };
  };

  // Calculate overall score
  const calculateOverallScore = () => {
    let totalScore = 0;
    let totalMaxScore = 0;

    Object.keys(alignmentDimensions).forEach((dimId) => {
      const { score, maxScore } = calculateDimensionScore(dimId);
      totalScore += score;
      totalMaxScore += maxScore;
    });

    return totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;
  };

  const overallScore = calculateOverallScore();

  // Count answered questions
  const totalQuestions = Object.values(alignmentDimensions).reduce(
    (sum, dim) => sum + dim.questions.length, 0
  );
  const answeredQuestions = Object.keys(answers).length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">📋</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Marketing Alignment Assessment</h3>
              <p className="text-sm text-gray-500">Evaluate current marketing capability and readiness</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-purple-600">{overallScore}%</div>
            <div className="text-xs text-gray-500">{answeredQuestions}/{totalQuestions} answered</div>
          </div>
        </div>
      </div>

      {/* Dimension Cards */}
      <div className="p-6 grid grid-cols-2 gap-4">
        {Object.entries(alignmentDimensions).map(([dimId, dim]) => {
          const { score, maxScore } = calculateDimensionScore(dimId);
          return (
            <div key={dimId}>
              <DimensionScoreCard
                dimension={dimId}
                score={score}
                maxScore={maxScore}
                isExpanded={expandedDimension === dimId}
                onToggle={() => setExpandedDimension(expandedDimension === dimId ? null : dimId)}
              />
              
              {/* Expanded Questions */}
              {expandedDimension === dimId && (
                <div className="mt-2 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  {dim.questions.map((question) => (
                    <AssessmentQuestion
                      key={question.id}
                      question={question}
                      answer={answers[question.id]}
                      onAnswer={onAnswer}
                      weight={question.weight}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Assessment Progress</span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round((answeredQuestions / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-500 rounded-full transition-all"
            style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================
// 2.3 ENGAGEMENT FIT INDICATOR
// Visual gauge showing board-level influence potential
// ============================================
const EngagementFitIndicator = ({ ambitions, assessmentScore, answers }) => {
  // Calculate fit factors
  const factors = {
    ambitionClarity: {
      label: 'Ambition Clarity',
      description: 'Are business objectives well-defined with metrics?',
      score: calculateAmbitionClarity(ambitions),
      weight: 25,
      icon: '🎯',
    },
    marketingAlignment: {
      label: 'Marketing Alignment',
      description: 'How aligned is marketing to business goals?',
      score: assessmentScore,
      weight: 25,
      icon: '📊',
    },
    leadershipAccess: {
      label: 'Leadership Access',
      description: 'Potential for board-level engagement',
      score: calculateLeadershipAccess(answers),
      weight: 30,
      icon: '👔',
    },
    changeReadiness: {
      label: 'Change Readiness',
      description: 'Appetite and capability for transformation',
      score: calculateChangeReadiness(answers),
      weight: 20,
      icon: '🔄',
    },
  };

  function calculateAmbitionClarity(ambitions) {
    if (ambitions.length === 0) return 0;
    const withMetrics = ambitions.filter(a => a.metric).length;
    const hasAllHorizons = new Set(ambitions.map(a => a.horizon)).size === 3;
    const baseScore = (withMetrics / ambitions.length) * 60;
    const horizonBonus = hasAllHorizons ? 40 : (new Set(ambitions.map(a => a.horizon)).size / 3) * 40;
    return Math.round(baseScore + horizonBonus);
  }

  function calculateLeadershipAccess(answers) {
    const relevantQuestions = ['cfo_confidence', 'leadership_support', 'business_link'];
    let score = 0;
    let count = 0;
    relevantQuestions.forEach(q => {
      if (answers[q] !== undefined) {
        score += answers[q];
        count++;
      }
    });
    return count > 0 ? Math.round((score / (count * 4)) * 100) : 0;
  }

  function calculateChangeReadiness(answers) {
    const relevantQuestions = ['change_appetite', 'analytical_skills', 'strategic_thinking'];
    let score = 0;
    let count = 0;
    relevantQuestions.forEach(q => {
      if (answers[q] !== undefined) {
        score += answers[q];
        count++;
      }
    });
    return count > 0 ? Math.round((score / (count * 4)) * 100) : 0;
  }

  // Calculate overall fit score
  const overallFit = Object.values(factors).reduce((sum, f) => {
    return sum + (f.score * f.weight / 100);
  }, 0);

  const getFitLevel = (score) => {
    if (score >= 75) return { label: 'Strong Fit', color: '#22C55E', description: 'High potential for impactful Reorientation' };
    if (score >= 50) return { label: 'Moderate Fit', color: '#EAB308', description: 'Opportunity exists with some groundwork needed' };
    if (score >= 25) return { label: 'Developing Fit', color: '#F97316', description: 'Foundational work required before Reorientation' };
    return { label: 'Early Stage', color: '#EF4444', description: 'Not yet ready for Reorientation engagement' };
  };

  const fitLevel = getFitLevel(overallFit);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div 
        className="px-6 py-4 border-b"
        style={{ 
          background: `linear-gradient(135deg, ${fitLevel.color}15 0%, ${fitLevel.color}05 100%)`,
          borderColor: `${fitLevel.color}30`
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${fitLevel.color}20` }}
            >
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Engagement Fit Indicator</h3>
              <p className="text-sm text-gray-500">Reorientation readiness assessment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Gauge */}
      <div className="p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            {/* Circular Gauge */}
            <svg width="200" height="120" viewBox="0 0 200 120">
              {/* Background arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Colored segments */}
              <path
                d="M 20 100 A 80 80 0 0 1 55 35"
                fill="none"
                stroke="#EF4444"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.3"
              />
              <path
                d="M 55 35 A 80 80 0 0 1 100 20"
                fill="none"
                stroke="#F97316"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.3"
              />
              <path
                d="M 100 20 A 80 80 0 0 1 145 35"
                fill="none"
                stroke="#EAB308"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.3"
              />
              <path
                d="M 145 35 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#22C55E"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.3"
              />
              {/* Active arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke={fitLevel.color}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(overallFit / 100) * 251.2} 251.2`}
              />
              {/* Needle */}
              <line
                x1="100"
                y1="100"
                x2={100 + 60 * Math.cos((Math.PI * (180 - overallFit * 1.8)) / 180)}
                y2={100 - 60 * Math.sin((Math.PI * (180 - overallFit * 1.8)) / 180)}
                stroke={fitLevel.color}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="100" cy="100" r="8" fill={fitLevel.color} />
            </svg>
            
            {/* Score Display */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
              <div 
                className="text-4xl font-bold"
                style={{ color: fitLevel.color }}
              >
                {Math.round(overallFit)}%
              </div>
            </div>
          </div>
        </div>

        {/* Fit Level Badge */}
        <div className="text-center mb-6">
          <span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{ backgroundColor: `${fitLevel.color}20`, color: fitLevel.color }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: fitLevel.color }} />
            {fitLevel.label}
          </span>
          <p className="text-sm text-gray-500 mt-2">{fitLevel.description}</p>
        </div>

        {/* Factor Breakdown */}
        <div className="space-y-3">
          {Object.entries(factors).map(([key, factor]) => (
            <div key={key} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm">
                {factor.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{factor.label}</span>
                  <span className="text-sm font-semibold text-gray-900">{factor.score}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${factor.score}%`,
                      backgroundColor: factor.score >= 50 ? '#22C55E' : factor.score >= 25 ? '#EAB308' : '#EF4444'
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{factor.description}</p>
              </div>
              <div className="text-xs text-gray-400 w-8 text-right">{factor.weight}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Recommendations</h4>
        <div className="space-y-2">
          {overallFit < 50 && (
            <div className="flex items-start gap-2 text-sm">
              <span className="text-amber-500">⚠️</span>
              <p className="text-gray-600">Consider foundational work before full Reorientation engagement</p>
            </div>
          )}
          {factors.ambitionClarity.score < 50 && (
            <div className="flex items-start gap-2 text-sm">
              <span className="text-blue-500">💡</span>
              <p className="text-gray-600">Define clearer business objectives with measurable outcomes</p>
            </div>
          )}
          {factors.leadershipAccess.score < 50 && (
            <div className="flex items-start gap-2 text-sm">
              <span className="text-purple-500">👔</span>
              <p className="text-gray-600">Work to establish stronger board-level engagement</p>
            </div>
          )}
          {overallFit >= 75 && (
            <div className="flex items-start gap-2 text-sm">
              <span className="text-green-500">✓</span>
              <p className="text-gray-600">Strong fit for Reorientation — proceed to Problem Pursuit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP - Phase 5 Demo
// ============================================
export default function Phase5PhaseZero() {
  const [ambitions, setAmbitions] = useState([
    {
      id: 'amb-1',
      horizon: 'short',
      text: 'Restore CFO confidence in marketing investment',
      priority: 'critical',
      metric: 'Marketing ROI visibility',
      marketingConnection: 'Establish clear attribution model',
    },
    {
      id: 'amb-2',
      horizon: 'short',
      text: 'Achieve 12% revenue growth from existing channels',
      priority: 'high',
      metric: '+12% revenue',
    },
    {
      id: 'amb-3',
      horizon: 'medium',
      text: 'Build market share in premium segment',
      priority: 'high',
      metric: '+5% market share',
    },
    {
      id: 'amb-4',
      horizon: 'long',
      text: 'Become category leader in brand consideration',
      priority: 'medium',
      metric: '#1 consideration',
    },
  ]);

  const [assessmentAnswers, setAssessmentAnswers] = useState({
    econometrics: 1,
    attribution: 2,
    tracking: 3,
    dashboards: 2,
    business_link: 2,
    kpis_defined: 3,
    targets_realistic: 2,
    cfo_confidence: 1,
    budget_process: 2,
    roi_focus: 1,
    change_appetite: 3,
    leadership_support: 2,
  });

  const handleAddAmbition = (newAmbition) => {
    setAmbitions(prev => [...prev, newAmbition]);
  };

  const handleUpdateAmbition = (id, updates) => {
    setAmbitions(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const handleDeleteAmbition = (id) => {
    setAmbitions(prev => prev.filter(a => a.id !== id));
  };

  const handleAssessmentAnswer = (questionId, value) => {
    setAssessmentAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  // Calculate overall assessment score
  const calculateAssessmentScore = () => {
    let totalScore = 0;
    let totalMaxScore = 0;

    Object.values(alignmentDimensions).forEach(dim => {
      dim.questions.forEach(q => {
        totalMaxScore += q.weight * 4;
        if (assessmentAnswers[q.id] !== undefined) {
          totalScore += assessmentAnswers[q.id] * q.weight;
        }
      });
    });

    return totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Phase 5: Phase Zero</h1>
              <p className="text-xs text-gray-500">Business Ambitions, Marketing Alignment, Engagement Fit</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Strategic Context Establishment</span>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
              Phase Zero
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Introduction */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">Phase Zero: Strategic Context</h2>
                  <p className="text-sm text-gray-600 mb-3">
                    Before diving into Problem Pursuit, we establish the strategic context. This ensures the engagement 
                    is properly scoped and aligned with business reality.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs">1</span>
                      <span className="text-gray-600">Define Business Ambitions</span>
                    </div>
                    <span className="text-gray-300">→</span>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs">2</span>
                      <span className="text-gray-600">Assess Marketing Alignment</span>
                    </div>
                    <span className="text-gray-300">→</span>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs">3</span>
                      <span className="text-gray-600">Evaluate Engagement Fit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-3 gap-6">
              {/* Business Ambitions - Full width on top */}
              <div className="col-span-2">
                <BusinessAmbitionsPanel
                  ambitions={ambitions}
                  onAdd={handleAddAmbition}
                  onUpdate={handleUpdateAmbition}
                  onDelete={handleDeleteAmbition}
                />
              </div>

              {/* Engagement Fit Indicator */}
              <div className="col-span-1">
                <EngagementFitIndicator
                  ambitions={ambitions}
                  assessmentScore={calculateAssessmentScore()}
                  answers={assessmentAnswers}
                />
              </div>

              {/* Marketing Alignment Assessment - Full width */}
              <div className="col-span-3">
                <MarketingAlignmentAssessment
                  answers={assessmentAnswers}
                  onAnswer={handleAssessmentAnswer}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
