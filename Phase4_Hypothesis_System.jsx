import React, { useState, useRef, useEffect } from 'react';

// ============================================
// PHASE 4: HYPOTHESIS SYSTEM COMPONENTS
// Commons OS Problem Pursuit Canvas
// Lines of Inquiry - Hypothesis-driven analysis
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

// Hypothesis status configurations
const hypothesisStatuses = {
  draft: { 
    label: 'Draft', 
    color: '#6B7280', 
    bgColor: '#F3F4F6',
    description: 'Initial capture, not yet investigated'
  },
  investigating: { 
    label: 'Investigating', 
    color: '#3B82F6', 
    bgColor: '#EFF6FF',
    description: 'Actively gathering evidence'
  },
  supported: { 
    label: 'Supported', 
    color: '#22C55E', 
    bgColor: '#DCFCE7',
    description: 'Evidence supports this hypothesis'
  },
  contradicted: { 
    label: 'Contradicted', 
    color: '#EF4444', 
    bgColor: '#FEE2E2',
    description: 'Evidence contradicts this hypothesis'
  },
  inconclusive: { 
    label: 'Inconclusive', 
    color: '#F59E0B', 
    bgColor: '#FEF3C7',
    description: 'Mixed or insufficient evidence'
  },
  parked: { 
    label: 'Parked', 
    color: '#8B5CF6', 
    bgColor: '#F5F3FF',
    description: 'Set aside for later investigation'
  },
};

// Evidence type configurations
const evidenceTypes = {
  supports: { 
    label: 'Supports', 
    color: '#22C55E', 
    bgColor: '#DCFCE7',
    icon: '✓'
  },
  contradicts: { 
    label: 'Contradicts', 
    color: '#EF4444', 
    bgColor: '#FEE2E2',
    icon: '✗'
  },
  neutral: { 
    label: 'Neutral', 
    color: '#6B7280', 
    bgColor: '#F3F4F6',
    icon: '○'
  },
};

// Source type colors (matching Phase 2)
const sourceTypeColors = {
  client: '#3B82F6',
  research: '#22C55E',
  interview: '#8B5CF6',
  analysis: '#F97316',
  synthesis: '#14B8A6',
};

// ============================================
// 4.5 CONFIDENCE METER
// Visual indicator of hypothesis confidence level
// ============================================
const ConfidenceMeter = ({ level, size = 'default', showLabel = true, onChange }) => {
  const getConfig = (level) => {
    if (level >= 90) return { label: 'Very High', color: '#22C55E', description: 'Strong evidence, ready for Front Stage' };
    if (level >= 75) return { label: 'High', color: '#84CC16', description: 'Good evidence, minor gaps remain' };
    if (level >= 50) return { label: 'Medium', color: '#EAB308', description: 'Some evidence, needs more investigation' };
    if (level >= 25) return { label: 'Low', color: '#F97316', description: 'Limited evidence, hypothesis uncertain' };
    return { label: 'Very Low', color: '#EF4444', description: 'Insufficient evidence to assess' };
  };

  const config = getConfig(level);

  if (size === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${level}%`, backgroundColor: config.color }}
          />
        </div>
        <span className="text-xs font-medium" style={{ color: config.color }}>{level}%</span>
      </div>
    );
  }

  if (size === 'large') {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Confidence Level</span>
          <span 
            className="text-lg font-bold"
            style={{ color: config.color }}
          >
            {level}%
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${level}%`, backgroundColor: config.color }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span 
            className="text-sm font-medium px-2 py-0.5 rounded"
            style={{ backgroundColor: `${config.color}20`, color: config.color }}
          >
            {config.label}
          </span>
          {showLabel && (
            <span className="text-xs text-gray-500">{config.description}</span>
          )}
        </div>
        
        {/* Interactive slider */}
        {onChange && (
          <input
            type="range"
            min="0"
            max="100"
            value={level}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${level}%`, backgroundColor: config.color }}
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold" style={{ color: config.color }}>{level}%</span>
        {showLabel && (
          <span 
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ backgroundColor: `${config.color}20`, color: config.color }}
          >
            {config.label}
          </span>
        )}
      </div>
    </div>
  );
};

// ============================================
// SOURCE CITATION BADGE (for evidence)
// ============================================
const SourceCitationBadge = ({ source, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all hover:opacity-80"
      style={{
        backgroundColor: `${sourceTypeColors[source.type]}15`,
        color: sourceTypeColors[source.type],
        border: `1px solid ${sourceTypeColors[source.type]}30`
      }}
    >
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span className="max-w-[120px] truncate">{source.title}</span>
      {source.page && <span className="opacity-60">p.{source.page}</span>}
    </button>
  );
};

// ============================================
// 4.3 EVIDENCE CARD
// Finding capture with source citation, confidence
// ============================================
const EvidenceCard = ({ 
  evidence, 
  onUpdate, 
  onDelete, 
  onTypeChange,
  isSelected,
  onSelect,
  variant = 'default' // 'default' | 'compact' | 'inline'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localContent, setLocalContent] = useState(evidence.content);
  const typeConfig = evidenceTypes[evidence.type];

  const handleSave = () => {
    onUpdate(evidence.id, { content: localContent });
    setIsEditing(false);
  };

  if (variant === 'inline') {
    return (
      <div 
        className={`flex items-start gap-2 p-2 rounded-lg border transition-all ${
          isSelected ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => onSelect && onSelect(evidence.id)}
      >
        <div 
          className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
          style={{ backgroundColor: typeConfig.bgColor, color: typeConfig.color }}
        >
          {typeConfig.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-700 line-clamp-2">{evidence.content}</p>
          <div className="flex items-center gap-2 mt-1">
            <SourceCitationBadge source={evidence.source} />
            <span className="text-xs text-gray-400">{evidence.date}</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div 
        className={`p-3 rounded-lg border-l-4 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer ${
          isSelected ? 'ring-2 ring-teal-500' : ''
        }`}
        style={{ borderLeftColor: typeConfig.color }}
        onClick={() => onSelect && onSelect(evidence.id)}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <span 
            className="text-xs font-medium px-2 py-0.5 rounded"
            style={{ backgroundColor: typeConfig.bgColor, color: typeConfig.color }}
          >
            {typeConfig.icon} {typeConfig.label}
          </span>
          <ConfidenceMeter level={evidence.confidence} size="compact" showLabel={false} />
        </div>
        <p className="text-sm text-gray-700 mb-2 line-clamp-3">{evidence.content}</p>
        <SourceCitationBadge source={evidence.source} />
      </div>
    );
  }

  return (
    <div 
      className={`bg-white rounded-xl border-2 shadow-sm transition-all ${
        isSelected ? 'border-teal-500 shadow-lg' : 'border-gray-200 hover:shadow-md'
      }`}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 border-b rounded-t-xl"
        style={{ backgroundColor: `${typeConfig.color}10`, borderColor: `${typeConfig.color}20` }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold"
            style={{ backgroundColor: typeConfig.bgColor, color: typeConfig.color }}
          >
            {typeConfig.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              {/* Type selector */}
              <select
                value={evidence.type}
                onChange={(e) => onTypeChange(evidence.id, e.target.value)}
                className="text-sm font-semibold bg-transparent border-none focus:outline-none cursor-pointer"
                style={{ color: typeConfig.color }}
              >
                {Object.entries(evidenceTypes).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>
            <p className="text-xs text-gray-500">Added {evidence.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ConfidenceMeter level={evidence.confidence} size="compact" />
          <button
            onClick={() => onDelete(evidence.id)}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              rows={4}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => { setIsEditing(false); setLocalContent(evidence.content); }}
                className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 text-sm text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p 
            className="text-sm text-gray-700 leading-relaxed cursor-text"
            onClick={() => setIsEditing(true)}
          >
            {evidence.content}
          </p>
        )}
      </div>

      {/* Source */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Source:</span>
            <SourceCitationBadge source={evidence.source} />
          </div>
          {evidence.source.page && (
            <span className="text-xs text-gray-400">Page {evidence.source.page}</span>
          )}
        </div>
      </div>

      {/* Linked Hypotheses */}
      {evidence.linkedHypotheses && evidence.linkedHypotheses.length > 0 && (
        <div className="px-4 pb-4">
          <p className="text-xs text-gray-500 mb-2">Linked to hypotheses:</p>
          <div className="flex flex-wrap gap-1">
            {evidence.linkedHypotheses.map((h, idx) => (
              <span 
                key={idx}
                className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-full"
              >
                H{h.number}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// 4.2 HYPOTHESIS CARD
// Structured hypothesis with evidence tracking
// ============================================
const HypothesisCard = ({ 
  hypothesis, 
  onUpdate, 
  onDelete,
  onAddEvidence,
  onInvestigate,
  isSelected,
  onSelect,
  isExpanded,
  onToggleExpand
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localStatement, setLocalStatement] = useState(hypothesis.statement);
  const statusConfig = hypothesisStatuses[hypothesis.status];
  
  const supportingEvidence = hypothesis.evidence?.filter(e => e.type === 'supports') || [];
  const contradictingEvidence = hypothesis.evidence?.filter(e => e.type === 'contradicts') || [];
  const neutralEvidence = hypothesis.evidence?.filter(e => e.type === 'neutral') || [];

  const handleSave = () => {
    onUpdate(hypothesis.id, { statement: localStatement });
    setIsEditing(false);
  };

  return (
    <div 
      className={`bg-white rounded-xl border-2 shadow-sm transition-all ${
        isSelected ? 'border-teal-500 shadow-xl' : 'border-gray-200 hover:shadow-md'
      }`}
    >
      {/* Header */}
      <div 
        className="flex items-start justify-between p-4 border-b cursor-pointer"
        style={{ backgroundColor: `${statusConfig.color}08`, borderColor: `${statusConfig.color}20` }}
        onClick={() => onSelect && onSelect(hypothesis.id)}
      >
        <div className="flex items-start gap-3">
          {/* Hypothesis Number */}
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
            style={{ backgroundColor: statusConfig.bgColor, color: statusConfig.color }}
          >
            H{hypothesis.number}
          </div>
          <div className="flex-1">
            {/* Status */}
            <div className="flex items-center gap-2 mb-2">
              <select
                value={hypothesis.status}
                onChange={(e) => { e.stopPropagation(); onUpdate(hypothesis.id, { status: e.target.value }); }}
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-medium px-2 py-1 rounded-full border-none focus:outline-none cursor-pointer"
                style={{ backgroundColor: statusConfig.bgColor, color: statusConfig.color }}
              >
                {Object.entries(hypothesisStatuses).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{hypothesis.createdDate}</span>
            </div>
            
            {/* Statement */}
            {isEditing ? (
              <div onClick={(e) => e.stopPropagation()}>
                <textarea
                  value={localStatement}
                  onChange={(e) => setLocalStatement(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                  rows={2}
                  autoFocus
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => { setIsEditing(false); setLocalStatement(hypothesis.statement); }}
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
                className="text-gray-900 font-medium leading-snug cursor-text"
                onDoubleClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
              >
                "{hypothesis.statement}"
              </p>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onToggleExpand}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg 
              className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(hypothesis.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Evidence Summary Bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-xs text-green-600 font-bold">{supportingEvidence.length}</span>
            </div>
            <span className="text-xs text-gray-500">supports</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-xs text-red-600 font-bold">{contradictingEvidence.length}</span>
            </div>
            <span className="text-xs text-gray-500">contradicts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-xs text-gray-600 font-bold">{neutralEvidence.length}</span>
            </div>
            <span className="text-xs text-gray-500">neutral</span>
          </div>
        </div>
        <ConfidenceMeter level={hypothesis.confidence} size="compact" />
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <>
          {/* Confidence Meter (Large) */}
          <div className="px-4 py-4 border-b border-gray-100">
            <ConfidenceMeter 
              level={hypothesis.confidence} 
              size="large"
              onChange={(value) => onUpdate(hypothesis.id, { confidence: value })}
            />
          </div>

          {/* Evidence Sections */}
          <div className="p-4 space-y-4">
            {/* Supporting Evidence */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-green-700 flex items-center gap-2">
                  <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-xs">✓</span>
                  Supporting Evidence ({supportingEvidence.length})
                </h4>
              </div>
              {supportingEvidence.length > 0 ? (
                <div className="space-y-2">
                  {supportingEvidence.map(e => (
                    <EvidenceCard key={e.id} evidence={e} variant="inline" />
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic py-2">No supporting evidence yet</p>
              )}
            </div>

            {/* Contradicting Evidence */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-red-700 flex items-center gap-2">
                  <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-xs">✗</span>
                  Contradicting Evidence ({contradictingEvidence.length})
                </h4>
              </div>
              {contradictingEvidence.length > 0 ? (
                <div className="space-y-2">
                  {contradictingEvidence.map(e => (
                    <EvidenceCard key={e.id} evidence={e} variant="inline" />
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic py-2">No contradicting evidence yet</p>
              )}
            </div>

            {/* Neutral Evidence */}
            {neutralEvidence.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-xs">○</span>
                    Neutral Evidence ({neutralEvidence.length})
                  </h4>
                </div>
                <div className="space-y-2">
                  {neutralEvidence.map(e => (
                    <EvidenceCard key={e.id} evidence={e} variant="inline" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="px-4 pb-4 flex items-center gap-2">
            <button
              onClick={() => onAddEvidence(hypothesis.id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Evidence
            </button>
            <button
              onClick={() => onInvestigate(hypothesis.id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <span>🎯</span>
              Ask Inquiry Agent
            </button>
          </div>
        </>
      )}

      {/* Collapsed Quick Actions */}
      {!isExpanded && (
        <div className="px-4 pb-3 flex items-center gap-2">
          <button
            onClick={() => onAddEvidence(hypothesis.id)}
            className="text-xs text-gray-500 hover:text-teal-600 transition-colors"
          >
            + Add evidence
          </button>
          <span className="text-gray-300">•</span>
          <button
            onClick={() => onInvestigate(hypothesis.id)}
            className="text-xs text-purple-500 hover:text-purple-700 transition-colors"
          >
            🎯 Investigate
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================
// ADD HYPOTHESIS MODAL
// ============================================
const AddHypothesisModal = ({ isOpen, onClose, onAdd }) => {
  const [statement, setStatement] = useState('');
  const [category, setCategory] = useState('performance');

  const categories = [
    { id: 'performance', label: 'Performance', description: 'Marketing effectiveness and ROI' },
    { id: 'market', label: 'Market', description: 'Category and competitive dynamics' },
    { id: 'customer', label: 'Customer', description: 'Behaviour and preferences' },
    { id: 'capability', label: 'Capability', description: 'Organisational and structural' },
  ];

  const templates = [
    "Performance is driven by [X], not [Y]",
    "[Metric] decline is caused by [factor]",
    "If we [action], then [outcome] will improve",
    "The gap between [A] and [B] is due to [cause]",
    "[Competitor/market force] is responsible for [effect]",
  ];

  const handleSubmit = () => {
    if (statement.trim()) {
      onAdd({ statement, category });
      setStatement('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-purple-50">
          <h3 className="text-lg font-semibold text-gray-900">New Hypothesis</h3>
          <p className="text-sm text-gray-500">What do you believe might be true?</p>
        </div>

        <div className="p-6 space-y-4">
          {/* Statement */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Hypothesis Statement</label>
            <textarea
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              placeholder="e.g., Performance is driven by category-level demand, not brand-level demand"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              rows={3}
              autoFocus
            />
          </div>

          {/* Templates */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Or start from a template</label>
            <div className="flex flex-wrap gap-2">
              {templates.map((template, idx) => (
                <button
                  key={idx}
                  onClick={() => setStatement(template)}
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    category === cat.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium text-gray-900">{cat.label}</span>
                  <p className="text-xs text-gray-500">{cat.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!statement.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Hypothesis
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// ADD EVIDENCE MODAL
// ============================================
const AddEvidenceModal = ({ isOpen, onClose, onAdd, hypothesisId }) => {
  const [content, setContent] = useState('');
  const [type, setType] = useState('supports');
  const [confidence, setConfidence] = useState(50);
  const [selectedSource, setSelectedSource] = useState(null);

  // Mock sources
  const availableSources = [
    { id: 'src-1', title: 'Q3 Marketing Performance Report', type: 'client', page: null },
    { id: 'src-2', title: 'Category Growth Analysis 2024', type: 'research', page: null },
    { id: 'src-3', title: 'CFO Interview Notes', type: 'interview', page: null },
    { id: 'src-4', title: 'Customer Segmentation Model', type: 'analysis', page: null },
  ];

  const handleSubmit = () => {
    if (content.trim() && selectedSource) {
      onAdd({
        hypothesisId,
        content,
        type,
        confidence,
        source: selectedSource,
      });
      setContent('');
      setSelectedSource(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-teal-50">
          <h3 className="text-lg font-semibold text-gray-900">Add Evidence</h3>
          <p className="text-sm text-gray-500">Link a finding to this hypothesis</p>
        </div>

        <div className="p-6 space-y-4">
          {/* Evidence Type */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">This evidence...</label>
            <div className="flex gap-2">
              {Object.entries(evidenceTypes).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setType(key)}
                  className={`flex-1 p-3 rounded-lg border-2 text-center transition-all ${
                    type === key
                      ? 'shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{
                    borderColor: type === key ? config.color : undefined,
                    backgroundColor: type === key ? config.bgColor : undefined,
                  }}
                >
                  <span className="text-lg block mb-1">{config.icon}</span>
                  <span 
                    className="text-sm font-medium"
                    style={{ color: type === key ? config.color : colors.gray[700] }}
                  >
                    {config.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Evidence</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe the finding or quote the relevant text..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              rows={3}
            />
          </div>

          {/* Source Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Source</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {availableSources.map((source) => (
                <button
                  key={source.id}
                  onClick={() => setSelectedSource(source)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all ${
                    selectedSource?.id === source.id
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${sourceTypeColors[source.type]}15` }}
                  >
                    <svg className="w-4 h-4" style={{ color: sourceTypeColors[source.type] }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{source.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Page Number */}
          {selectedSource && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Page Number (optional)</label>
              <input
                type="number"
                placeholder="e.g., 12"
                className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                onChange={(e) => setSelectedSource({ ...selectedSource, page: e.target.value })}
              />
            </div>
          )}

          {/* Confidence */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Confidence in this evidence</label>
            <ConfidenceMeter 
              level={confidence} 
              size="large" 
              onChange={setConfidence}
            />
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || !selectedSource}
            className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Evidence
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 4.1 HYPOTHESIS BOARD
// Container for all hypotheses with filtering
// ============================================
const HypothesisBoard = ({ 
  hypotheses, 
  onUpdateHypothesis,
  onDeleteHypothesis,
  onAddHypothesis,
  onAddEvidence
}) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('created'); // 'created' | 'confidence' | 'evidence'
  const [expandedId, setExpandedId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addEvidenceFor, setAddEvidenceFor] = useState(null);

  const filteredHypotheses = hypotheses
    .filter(h => filterStatus === 'all' || h.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'confidence') return b.confidence - a.confidence;
      if (sortBy === 'evidence') return (b.evidence?.length || 0) - (a.evidence?.length || 0);
      return new Date(b.createdDate) - new Date(a.createdDate);
    });

  const statusCounts = Object.keys(hypothesisStatuses).reduce((acc, status) => {
    acc[status] = hypotheses.filter(h => h.status === status).length;
    return acc;
  }, {});

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Lines of Inquiry</h2>
            <p className="text-sm text-gray-500">{hypotheses.length} hypotheses • Hypothesis-driven analysis</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Hypothesis
          </button>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filterStatus === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({hypotheses.length})
          </button>
          {Object.entries(hypothesisStatuses).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filterStatus === key
                  ? 'text-white'
                  : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: filterStatus === key ? config.color : config.bgColor,
                color: filterStatus === key ? 'white' : config.color,
              }}
            >
              {config.label} ({statusCounts[key] || 0})
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs px-2 py-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="created">Date Created</option>
            <option value="confidence">Confidence</option>
            <option value="evidence">Evidence Count</option>
          </select>
        </div>
      </div>

      {/* Hypotheses List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredHypotheses.length > 0 ? (
          filteredHypotheses.map(hypothesis => (
            <HypothesisCard
              key={hypothesis.id}
              hypothesis={hypothesis}
              isSelected={selectedId === hypothesis.id}
              isExpanded={expandedId === hypothesis.id}
              onSelect={setSelectedId}
              onToggleExpand={() => setExpandedId(expandedId === hypothesis.id ? null : hypothesis.id)}
              onUpdate={onUpdateHypothesis}
              onDelete={onDeleteHypothesis}
              onAddEvidence={(id) => setAddEvidenceFor(id)}
              onInvestigate={(id) => console.log('Investigate:', id)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hypotheses yet</h3>
            <p className="text-sm text-gray-500 mb-4">Start by adding a hypothesis to investigate</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add First Hypothesis
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddHypothesisModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={onAddHypothesis}
      />
      <AddEvidenceModal
        isOpen={!!addEvidenceFor}
        onClose={() => setAddEvidenceFor(null)}
        onAdd={onAddEvidence}
        hypothesisId={addEvidenceFor}
      />
    </div>
  );
};

// ============================================
// MAIN APP - Phase 4 Demo
// ============================================
export default function Phase4HypothesisSystem() {
  const [hypotheses, setHypotheses] = useState([
    {
      id: 'hyp-1',
      number: 1,
      statement: 'Performance is driven by category-level demand, not brand-level demand',
      status: 'investigating',
      confidence: 65,
      category: 'performance',
      createdDate: '2024-11-15',
      evidence: [
        {
          id: 'ev-1',
          type: 'supports',
          content: 'Category CAGR of 12% significantly exceeds brand growth of 8%, suggesting market tailwinds are masking brand weakness',
          confidence: 85,
          date: '2024-11-16',
          source: { id: 'src-2', title: 'Category Growth Analysis 2024', type: 'research', page: 8 },
        },
        {
          id: 'ev-2',
          type: 'supports',
          content: 'Marketing investment increased 150% YoY while revenue growth remained flat at 8%',
          confidence: 90,
          date: '2024-11-16',
          source: { id: 'src-1', title: 'Q3 Marketing Performance Report', type: 'client', page: 4 },
        },
        {
          id: 'ev-3',
          type: 'contradicts',
          content: 'Brand tracking shows awareness metrics increased 12% over the same period',
          confidence: 60,
          date: '2024-11-17',
          source: { id: 'src-1', title: 'Q3 Marketing Performance Report', type: 'client', page: 18 },
        },
      ],
    },
    {
      id: 'hyp-2',
      number: 2,
      statement: 'CFO skepticism is driven by inability to demonstrate marketing ROI causality',
      status: 'supported',
      confidence: 88,
      category: 'capability',
      createdDate: '2024-11-14',
      evidence: [
        {
          id: 'ev-4',
          type: 'supports',
          content: '"Every marketing dollar is being questioned by the board" - direct CFO quote indicating fundamental trust deficit',
          confidence: 95,
          date: '2024-11-14',
          source: { id: 'src-3', title: 'CFO Interview Notes', type: 'interview', page: 2 },
        },
        {
          id: 'ev-5',
          type: 'supports',
          content: 'No econometric model in place to attribute revenue to marketing activities',
          confidence: 80,
          date: '2024-11-15',
          source: { id: 'src-1', title: 'Q3 Marketing Performance Report', type: 'client', page: 22 },
        },
      ],
    },
    {
      id: 'hyp-3',
      number: 3,
      statement: 'Competitor activity is capturing category growth disproportionately',
      status: 'draft',
      confidence: 25,
      category: 'market',
      createdDate: '2024-11-18',
      evidence: [],
    },
    {
      id: 'hyp-4',
      number: 4,
      statement: 'Customer segmentation model is outdated and missing key growth segments',
      status: 'inconclusive',
      confidence: 45,
      category: 'customer',
      createdDate: '2024-11-13',
      evidence: [
        {
          id: 'ev-6',
          type: 'neutral',
          content: 'Segmentation model last updated August 2024 - recency unclear if significant',
          confidence: 50,
          date: '2024-11-15',
          source: { id: 'src-4', title: 'Customer Segmentation Model', type: 'analysis', page: 1 },
        },
      ],
    },
  ]);

  const handleAddHypothesis = ({ statement, category }) => {
    const newHypothesis = {
      id: `hyp-${Date.now()}`,
      number: hypotheses.length + 1,
      statement,
      status: 'draft',
      confidence: 0,
      category,
      createdDate: new Date().toISOString().split('T')[0],
      evidence: [],
    };
    setHypotheses(prev => [...prev, newHypothesis]);
  };

  const handleUpdateHypothesis = (id, updates) => {
    setHypotheses(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h));
  };

  const handleDeleteHypothesis = (id) => {
    setHypotheses(prev => prev.filter(h => h.id !== id));
  };

  const handleAddEvidence = ({ hypothesisId, content, type, confidence, source }) => {
    const newEvidence = {
      id: `ev-${Date.now()}`,
      type,
      content,
      confidence,
      date: new Date().toISOString().split('T')[0],
      source,
    };
    setHypotheses(prev => prev.map(h => {
      if (h.id === hypothesisId) {
        return { ...h, evidence: [...(h.evidence || []), newEvidence] };
      }
      return h;
    }));
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Phase 4: Hypothesis System</h1>
              <p className="text-xs text-gray-500">Hypothesis Board, Hypothesis Card, Evidence Card, Confidence Meter</p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Hypothesis Board */}
          <div className="flex-1 bg-gray-50">
            <HypothesisBoard
              hypotheses={hypotheses}
              onAddHypothesis={handleAddHypothesis}
              onUpdateHypothesis={handleUpdateHypothesis}
              onDeleteHypothesis={handleDeleteHypothesis}
              onAddEvidence={handleAddEvidence}
            />
          </div>

          {/* Component Showcase Sidebar */}
          <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Component Showcase</h3>
            
            {/* Confidence Meter Demo */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">4.5 Confidence Meter</h4>
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Compact</p>
                  <ConfidenceMeter level={75} size="compact" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Default</p>
                  <ConfidenceMeter level={45} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Large (Interactive)</p>
                  <ConfidenceMeter level={88} size="large" />
                </div>
              </div>
            </div>

            {/* Evidence Card Demo */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">4.3 Evidence Card</h4>
              <div className="space-y-3">
                <EvidenceCard
                  evidence={{
                    id: 'demo-1',
                    type: 'supports',
                    content: 'Category CAGR of 12% significantly exceeds brand growth of 8%',
                    confidence: 85,
                    date: '2024-11-16',
                    source: { title: 'Category Growth Analysis', type: 'research', page: 8 },
                  }}
                  variant="compact"
                  onUpdate={() => {}}
                  onDelete={() => {}}
                  onTypeChange={() => {}}
                />
                <EvidenceCard
                  evidence={{
                    id: 'demo-2',
                    type: 'contradicts',
                    content: 'Brand awareness increased 12% over the same period',
                    confidence: 60,
                    date: '2024-11-17',
                    source: { title: 'Q3 Performance Report', type: 'client', page: 18 },
                  }}
                  variant="compact"
                  onUpdate={() => {}}
                  onDelete={() => {}}
                  onTypeChange={() => {}}
                />
              </div>
            </div>

            {/* Hypothesis Status Legend */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Hypothesis Statuses</h4>
              <div className="space-y-2">
                {Object.entries(hypothesisStatuses).map(([key, config]) => (
                  <div key={key} className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: config.bgColor }}>
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                    <div>
                      <span className="text-sm font-medium" style={{ color: config.color }}>{config.label}</span>
                      <p className="text-xs text-gray-500">{config.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
              <h4 className="font-medium text-gray-900 mb-2">How Lines of Inquiry Works</h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="w-5 h-5 bg-purple-200 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <span>Capture hypotheses about what's driving performance</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 bg-purple-200 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <span>Gather evidence that supports or contradicts each</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 bg-purple-200 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <span>Update confidence as evidence accumulates</span>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 bg-purple-200 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                  <span>Move supported hypotheses to Front Stage deliverables</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
