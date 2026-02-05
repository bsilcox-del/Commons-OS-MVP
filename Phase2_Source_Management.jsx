import React, { useState, useRef, useCallback, useEffect } from 'react';

// ============================================
// PHASE 2: SOURCE MANAGEMENT COMPONENTS
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

// Source type configurations
const sourceTypes = {
  client: { 
    color: '#3B82F6', 
    bg: '#EFF6FF', 
    label: 'Client Document',
    icon: '📄'
  },
  research: { 
    color: '#22C55E', 
    bg: '#F0FDF4', 
    label: 'External Research',
    icon: '📊'
  },
  interview: { 
    color: '#8B5CF6', 
    bg: '#F5F3FF', 
    label: 'Interview Notes',
    icon: '🎙️'
  },
  analysis: { 
    color: '#F97316', 
    bg: '#FFF7ED', 
    label: 'Team Analysis',
    icon: '🔍'
  },
  synthesis: { 
    color: '#14B8A6', 
    bg: '#F0FDFA', 
    label: 'Agent Synthesis',
    icon: '🤖'
  },
};

// Fact Pack categories (from Design Spec)
const factPackCategories = {
  market: {
    label: 'Market Information',
    description: 'Dynamics, predictions, 10-year CAGR',
    icon: '📈',
    color: '#3B82F6',
  },
  customer: {
    label: 'Customer Research',
    description: 'Needs, behaviours, segmentation',
    icon: '👥',
    color: '#8B5CF6',
  },
  performance: {
    label: 'Marketing Performance',
    description: 'Econometrics, SOV, spend data',
    icon: '📊',
    color: '#22C55E',
  },
  product: {
    label: 'Product & Value Prop',
    description: 'Roadmaps, features, launches',
    icon: '🎯',
    color: '#F97316',
  },
  organisation: {
    label: 'Organisation',
    description: 'Structure, teams, capabilities',
    icon: '🏢',
    color: '#EC4899',
  },
};

// ============================================
// 3.4 QUALITY SCORE BADGE
// Visual indicator for Relevance/Recency/Substance
// ============================================
const QualityScoreBadge = ({ relevance, recency, substance, size = 'default' }) => {
  const average = Math.round((relevance + recency + substance) / 3);
  
  const getScoreColor = (score) => {
    if (score >= 80) return '#22C55E';
    if (score >= 60) return '#84CC16';
    if (score >= 40) return '#EAB308';
    if (score >= 20) return '#F97316';
    return '#EF4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    if (score >= 20) return 'Weak';
    return 'Poor';
  };

  if (size === 'compact') {
    return (
      <div 
        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
        style={{ 
          backgroundColor: `${getScoreColor(average)}20`,
          color: getScoreColor(average)
        }}
      >
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: getScoreColor(average) }}
        />
        {average}%
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">Quality Score</span>
        <div 
          className="flex items-center gap-1.5 px-2 py-1 rounded-full text-sm font-semibold"
          style={{ 
            backgroundColor: `${getScoreColor(average)}20`,
            color: getScoreColor(average)
          }}
        >
          {average}% • {getScoreLabel(average)}
        </div>
      </div>
      
      <div className="space-y-2">
        {[
          { label: 'Relevance', value: relevance, hint: 'How applicable to current inquiry' },
          { label: 'Recency', value: recency, hint: 'How current the data is' },
          { label: 'Substance', value: substance, hint: 'Depth and quality of insights' },
        ].map(({ label, value, hint }) => (
          <div key={label} className="group">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-600">{label}</span>
              <span className="font-medium" style={{ color: getScoreColor(value) }}>{value}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${value}%`,
                  backgroundColor: getScoreColor(value)
                }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {hint}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// 3.3 SOURCE CARD
// Individual source with metadata, quality, excerpts
// ============================================
const SourceCard = ({ 
  source, 
  isSelected, 
  onSelect, 
  onDelete,
  onDragStart,
  variant = 'default' // 'default' | 'compact' | 'expanded'
}) => {
  const [isExpanded, setIsExpanded] = useState(variant === 'expanded');
  const typeConfig = sourceTypes[source.type];
  const categoryConfig = factPackCategories[source.category];

  const handleDragStart = (e) => {
    e.dataTransfer.setData('source', JSON.stringify(source));
    e.dataTransfer.effectAllowed = 'copy';
    if (onDragStart) onDragStart(source);
  };

  if (variant === 'compact') {
    return (
      <div
        draggable
        onDragStart={handleDragStart}
        onClick={() => onSelect && onSelect(source.id)}
        className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
          isSelected 
            ? 'border-teal-500 bg-teal-50' 
            : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
      >
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          style={{ backgroundColor: typeConfig.bg }}
        >
          {typeConfig.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{source.title}</p>
          <p className="text-xs text-gray-500">{typeConfig.label}</p>
        </div>
        <QualityScoreBadge {...source.quality} size="compact" />
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`bg-white rounded-xl border-2 transition-all ${
        isSelected 
          ? 'border-teal-500 shadow-lg' 
          : 'border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300'
      }`}
    >
      {/* Header */}
      <div 
        className="flex items-start gap-3 p-4 cursor-pointer"
        onClick={() => onSelect && onSelect(source.id)}
      >
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
          style={{ backgroundColor: typeConfig.bg }}
        >
          {typeConfig.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-semibold text-gray-900 leading-tight">{source.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span 
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: typeConfig.bg, color: typeConfig.color }}
                >
                  {typeConfig.label}
                </span>
                {categoryConfig && (
                  <span 
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: `${categoryConfig.color}15`, color: categoryConfig.color }}
                  >
                    {categoryConfig.icon} {categoryConfig.label}
                  </span>
                )}
              </div>
            </div>
            <QualityScoreBadge {...source.quality} size="compact" />
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="px-4 pb-3 flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {source.date}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {source.pages} pages
        </span>
        {source.citations > 0 && (
          <span className="flex items-center gap-1 text-teal-600">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            {source.citations} citations
          </span>
        )}
      </div>

      {/* Expand/Collapse */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2 border-t border-gray-100 flex items-center justify-center gap-1 text-xs text-gray-500 hover:bg-gray-50 transition-colors"
      >
        <span>{isExpanded ? 'Less' : 'More'}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          {/* Key Excerpts */}
          {source.excerpts && source.excerpts.length > 0 && (
            <div className="mt-3">
              <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Excerpts</h5>
              <div className="space-y-2">
                {source.excerpts.map((excerpt, idx) => (
                  <div 
                    key={idx} 
                    className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 border-l-2"
                    style={{ borderColor: typeConfig.color }}
                  >
                    <p className="italic">"{excerpt.text}"</p>
                    <p className="text-xs text-gray-400 mt-1">Page {excerpt.page}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quality Details */}
          <div className="mt-4">
            <QualityScoreBadge {...source.quality} />
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center gap-2">
            <button className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              View Full
            </button>
            <button className="flex-1 px-3 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors">
              Create Citation
            </button>
            <button 
              onClick={() => onDelete && onDelete(source.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// 3.2 SOURCE UPLOAD ZONE
// Drag-drop area with category assignment
// ============================================
const SourceUploadZone = ({ onUpload, isActive }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStep, setUploadStep] = useState('drop'); // 'drop' | 'categorize'
  const [pendingFile, setPendingFile] = useState(null);
  const [selectedType, setSelectedType] = useState('client');
  const [selectedCategory, setSelectedCategory] = useState('market');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setPendingFile(files[0]);
      setUploadStep('categorize');
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setPendingFile(files[0]);
      setUploadStep('categorize');
    }
  };

  const handleConfirmUpload = () => {
    if (pendingFile) {
      onUpload({
        file: pendingFile,
        type: selectedType,
        category: selectedCategory,
      });
      setPendingFile(null);
      setUploadStep('drop');
    }
  };

  const handleCancel = () => {
    setPendingFile(null);
    setUploadStep('drop');
  };

  if (uploadStep === 'categorize' && pendingFile) {
    return (
      <div className="bg-white rounded-xl border-2 border-teal-500 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{pendingFile.name}</h4>
            <p className="text-sm text-gray-500">{(pendingFile.size / 1024).toFixed(1)} KB</p>
          </div>
        </div>

        {/* Source Type Selection */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">Source Type</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(sourceTypes).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setSelectedType(key)}
                className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all text-left ${
                  selectedType === key 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-lg">{config.icon}</span>
                <span className="text-sm font-medium text-gray-700">{config.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">Fact Pack Category</label>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(factPackCategories).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                  selectedCategory === key 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-lg">{config.icon}</span>
                <div>
                  <span className="text-sm font-medium text-gray-700 block">{config.label}</span>
                  <span className="text-xs text-gray-500">{config.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmUpload}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Add to Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
        isDragOver 
          ? 'border-teal-500 bg-teal-50' 
          : 'border-gray-300 hover:border-teal-400 hover:bg-gray-50'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
      />
      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors ${
        isDragOver ? 'bg-teal-100' : 'bg-gray-100'
      }`}>
        <svg 
          className={`w-8 h-8 transition-colors ${isDragOver ? 'text-teal-600' : 'text-gray-400'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-700 mb-1">
        {isDragOver ? 'Drop to upload' : 'Drag files here or click to browse'}
      </p>
      <p className="text-xs text-gray-500">
        PDF, Word, Excel, PowerPoint, CSV, Text
      </p>
    </div>
  );
};

// ============================================
// DATA GAP INDICATOR
// Visual heatmap showing missing data areas
// ============================================
const DataGapIndicator = ({ sources }) => {
  // Calculate coverage for each category
  const coverage = Object.entries(factPackCategories).map(([key, config]) => {
    const categorySources = sources.filter(s => s.category === key);
    const count = categorySources.length;
    const avgQuality = categorySources.length > 0
      ? categorySources.reduce((sum, s) => sum + (s.quality.relevance + s.quality.recency + s.quality.substance) / 3, 0) / categorySources.length
      : 0;
    
    return {
      key,
      ...config,
      count,
      avgQuality,
      status: count === 0 ? 'missing' : avgQuality < 50 ? 'weak' : avgQuality < 75 ? 'fair' : 'strong'
    };
  });

  const getStatusConfig = (status) => {
    switch (status) {
      case 'missing': return { color: '#EF4444', bg: '#FEE2E2', label: 'No data' };
      case 'weak': return { color: '#F97316', bg: '#FFEDD5', label: 'Weak coverage' };
      case 'fair': return { color: '#EAB308', bg: '#FEF9C3', label: 'Fair coverage' };
      case 'strong': return { color: '#22C55E', bg: '#DCFCE7', label: 'Strong coverage' };
      default: return { color: '#6B7280', bg: '#F3F4F6', label: 'Unknown' };
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900 text-sm">Fact Pack Coverage</h4>
        <span className="text-xs text-gray-500">{sources.length} sources</span>
      </div>
      <div className="space-y-2">
        {coverage.map(cat => {
          const statusConfig = getStatusConfig(cat.status);
          return (
            <div key={cat.key} className="flex items-center gap-3">
              <span className="text-lg w-6">{cat.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">{cat.label}</span>
                  <span 
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: statusConfig.bg, color: statusConfig.color }}
                  >
                    {cat.count === 0 ? 'Gap' : `${cat.count} source${cat.count > 1 ? 's' : ''}`}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${Math.min(100, cat.count * 25)}%`,
                      backgroundColor: statusConfig.color
                    }}
                  />
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
// 3.1 SOURCE LIBRARY PANEL
// Collapsible panel for managing all sources
// ============================================
const SourceLibraryPanel = ({ 
  isOpen, 
  onToggle, 
  sources, 
  onAddSource,
  onSelectSource,
  onDeleteSource,
  selectedSourceId 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid' | 'category'

  const filteredSources = sources.filter(source => {
    const matchesSearch = source.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || source.type === filterType;
    const matchesCategory = filterCategory === 'all' || source.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const groupedSources = filteredSources.reduce((acc, source) => {
    const cat = source.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(source);
    return acc;
  }, {});

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 border-r-0 rounded-l-lg px-2 py-4 shadow-lg hover:bg-gray-50 transition-all z-40"
      >
        <div className="flex flex-col items-center gap-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-xs font-medium text-gray-600 writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>
            Sources ({sources.length})
          </span>
        </div>
      </button>
    );
  }

  return (
    <div className="w-96 h-full bg-white border-l border-gray-200 flex flex-col shadow-xl z-40">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Source Library</h3>
              <p className="text-xs text-gray-500">{sources.length} sources • Fact Pack</p>
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

        {/* Search */}
        <div className="relative mb-3">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search sources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Types</option>
            {Object.entries(sourceTypes).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Categories</option>
            {Object.entries(factPackCategories).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>
        </div>

        {/* View Mode */}
        <div className="flex items-center gap-1 mt-3 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'list', icon: '☰', label: 'List' },
            { id: 'grid', icon: '⊞', label: 'Grid' },
            { id: 'category', icon: '◫', label: 'Category' },
          ].map(mode => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === mode.id 
                  ? 'bg-white shadow-sm text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Data Gap Indicator */}
      <div className="p-4 border-b border-gray-200">
        <DataGapIndicator sources={sources} />
      </div>

      {/* Upload Zone */}
      <div className="p-4 border-b border-gray-200">
        <SourceUploadZone onUpload={onAddSource} />
      </div>

      {/* Source List */}
      <div className="flex-1 overflow-y-auto p-4">
        {viewMode === 'category' ? (
          <div className="space-y-4">
            {Object.entries(factPackCategories).map(([catKey, catConfig]) => (
              <div key={catKey}>
                <div className="flex items-center gap-2 mb-2">
                  <span>{catConfig.icon}</span>
                  <span className="text-sm font-semibold text-gray-700">{catConfig.label}</span>
                  <span className="text-xs text-gray-400">
                    ({groupedSources[catKey]?.length || 0})
                  </span>
                </div>
                {groupedSources[catKey]?.length > 0 ? (
                  <div className="space-y-2 ml-6">
                    {groupedSources[catKey].map(source => (
                      <SourceCard
                        key={source.id}
                        source={source}
                        variant="compact"
                        isSelected={selectedSourceId === source.id}
                        onSelect={onSelectSource}
                        onDelete={onDeleteSource}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="ml-6 py-3 px-4 bg-gray-50 rounded-lg text-sm text-gray-400 border border-dashed border-gray-200">
                    No sources in this category
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredSources.map(source => (
              <div
                key={source.id}
                onClick={() => onSelectSource(source.id)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedSourceId === source.id 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
                  style={{ backgroundColor: sourceTypes[source.type].bg }}
                >
                  {sourceTypes[source.type].icon}
                </div>
                <p className="text-sm font-medium text-gray-900 truncate">{source.title}</p>
                <p className="text-xs text-gray-500 mt-1">{source.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSources.map(source => (
              <SourceCard
                key={source.id}
                source={source}
                isSelected={selectedSourceId === source.id}
                onSelect={onSelectSource}
                onDelete={onDeleteSource}
              />
            ))}
          </div>
        )}

        {filteredSources.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">No sources found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// 11.1 CITATION BADGE
// Inline source reference with type coloring
// ============================================
const CitationBadge = ({ citation, onClick, onRemove }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const typeConfig = sourceTypes[citation.sourceType];

  return (
    <span className="relative inline-flex items-center">
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-all hover:opacity-80"
        style={{ 
          backgroundColor: typeConfig.bg, 
          color: typeConfig.color,
          border: `1px solid ${typeConfig.color}40`
        }}
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <span>{citation.shortRef}</span>
        {citation.page && <span className="opacity-70">p.{citation.page}</span>}
      </button>
      
      {onRemove && (
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="ml-0.5 p-0.5 rounded hover:bg-gray-200 text-gray-400 hover:text-red-500 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {/* 11.2 Citation Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-2 z-50">
          <CitationTooltip citation={citation} />
        </div>
      )}
    </span>
  );
};

// ============================================
// 11.2 CITATION TOOLTIP
// Hover detail showing source metadata
// ============================================
const CitationTooltip = ({ citation }) => {
  const typeConfig = sourceTypes[citation.sourceType];
  const categoryConfig = factPackCategories[citation.category];

  return (
    <div className="w-72 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-gray-100" style={{ backgroundColor: typeConfig.bg }}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{typeConfig.icon}</span>
          <div>
            <p className="font-medium text-gray-900 text-sm">{citation.sourceTitle}</p>
            <p className="text-xs" style={{ color: typeConfig.color }}>{typeConfig.label}</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="p-3 space-y-2">
        {citation.excerpt && (
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Excerpt</p>
            <p className="text-sm text-gray-700 italic">"{citation.excerpt}"</p>
          </div>
        )}
        
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {citation.page && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Page {citation.page}
            </span>
          )}
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {citation.sourceDate}
          </span>
        </div>

        {categoryConfig && (
          <div 
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs"
            style={{ backgroundColor: `${categoryConfig.color}15`, color: categoryConfig.color }}
          >
            {categoryConfig.icon} {categoryConfig.label}
          </div>
        )}

        {/* Quality indicator */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Source Quality</span>
            <QualityScoreBadge {...citation.quality} size="compact" />
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="p-2 bg-gray-50 border-t border-gray-100">
        <button className="w-full text-xs text-teal-600 font-medium hover:text-teal-700 py-1">
          View Full Source →
        </button>
      </div>
    </div>
  );
};

// ============================================
// DEMO: Text with Citations
// Shows how citations appear in content
// ============================================
const TextWithCitations = ({ text, citations }) => {
  // Simple demo - in reality would parse text and insert citations
  return (
    <div className="prose prose-sm max-w-none">
      <p className="text-gray-700 leading-relaxed">
        {text}
        {citations.map((citation, idx) => (
          <span key={idx}>
            {' '}
            <CitationBadge 
              citation={citation} 
              onClick={() => console.log('View source:', citation.sourceId)}
            />
          </span>
        ))}
      </p>
    </div>
  );
};

// ============================================
// MAIN APP - Phase 2 Demo
// ============================================
export default function Phase2SourceManagement() {
  const [libraryOpen, setLibraryOpen] = useState(true);
  const [selectedSourceId, setSelectedSourceId] = useState(null);
  
  const [sources, setSources] = useState([
    {
      id: 'src-1',
      title: 'Q3 Marketing Performance Report',
      type: 'client',
      category: 'performance',
      date: 'Oct 2024',
      pages: 24,
      citations: 3,
      quality: { relevance: 95, recency: 90, substance: 85 },
      excerpts: [
        { text: 'Marketing investment increased 150% YoY while revenue growth remained at 8%', page: 4 },
        { text: 'Brand awareness metrics showed minimal movement despite increased spend', page: 12 },
      ]
    },
    {
      id: 'src-2',
      title: 'Category Growth Analysis 2024',
      type: 'research',
      category: 'market',
      date: 'Sep 2024',
      pages: 48,
      citations: 5,
      quality: { relevance: 88, recency: 85, substance: 92 },
      excerpts: [
        { text: 'Category CAGR of 12% driven primarily by new market entrants', page: 8 },
      ]
    },
    {
      id: 'src-3',
      title: 'CFO Interview Notes',
      type: 'interview',
      category: 'organisation',
      date: 'Nov 2024',
      pages: 6,
      citations: 2,
      quality: { relevance: 100, recency: 100, substance: 75 },
      excerpts: [
        { text: 'Every marketing dollar is being questioned by the board', page: 2 },
      ]
    },
    {
      id: 'src-4',
      title: 'Customer Segmentation Model v2',
      type: 'analysis',
      category: 'customer',
      date: 'Aug 2024',
      pages: 18,
      citations: 0,
      quality: { relevance: 70, recency: 60, substance: 80 },
      excerpts: []
    },
  ]);

  const demoCitations = [
    {
      id: 'cite-1',
      sourceId: 'src-1',
      sourceTitle: 'Q3 Marketing Performance Report',
      sourceType: 'client',
      sourceDate: 'Oct 2024',
      category: 'performance',
      shortRef: 'Q3 Report',
      page: 4,
      excerpt: 'Marketing investment increased 150% YoY while revenue growth remained at 8%',
      quality: { relevance: 95, recency: 90, substance: 85 },
    },
    {
      id: 'cite-2',
      sourceId: 'src-3',
      sourceTitle: 'CFO Interview Notes',
      sourceType: 'interview',
      sourceDate: 'Nov 2024',
      category: 'organisation',
      shortRef: 'CFO Interview',
      page: 2,
      excerpt: 'Every marketing dollar is being questioned by the board',
      quality: { relevance: 100, recency: 100, substance: 75 },
    },
  ];

  const handleAddSource = ({ file, type, category }) => {
    const newSource = {
      id: `src-${Date.now()}`,
      title: file.name.replace(/\.[^/.]+$/, ''),
      type,
      category,
      date: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
      pages: Math.floor(Math.random() * 30) + 5,
      citations: 0,
      quality: { relevance: 70, recency: 95, substance: 50 },
      excerpts: []
    };
    setSources(prev => [...prev, newSource]);
  };

  const handleDeleteSource = (id) => {
    setSources(prev => prev.filter(s => s.id !== id));
    if (selectedSourceId === id) setSelectedSourceId(null);
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
              <h1 className="font-semibold text-gray-900">Phase 2: Source Management</h1>
              <p className="text-xs text-gray-500">Source Library, Citations, Quality Scoring</p>
            </div>
          </div>
          <button
            onClick={() => setLibraryOpen(!libraryOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              libraryOpen 
                ? 'bg-teal-100 text-teal-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Source Library
            <span className="bg-teal-600 text-white text-xs px-1.5 py-0.5 rounded-full">{sources.length}</span>
          </button>
        </div>

        {/* Demo Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Component Showcase */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Component Showcase</h2>
              
              {/* Citation Badges Demo */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">11.1 Citation Badges (hover for tooltip)</h3>
                <div className="flex flex-wrap gap-2">
                  {demoCitations.map(citation => (
                    <CitationBadge 
                      key={citation.id}
                      citation={citation}
                      onClick={() => setSelectedSourceId(citation.sourceId)}
                      onRemove={() => console.log('Remove citation')}
                    />
                  ))}
                </div>
              </div>

              {/* Text with Citations */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Citations in Context</h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <TextWithCitations
                    text="The data reveals a significant disconnect between marketing investment and business outcomes. Despite a 150% increase in marketing spend year-over-year, revenue growth has remained stagnant at just 8%."
                    citations={demoCitations}
                  />
                </div>
              </div>

              {/* Quality Score Badge Demo */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">3.4 Quality Score Badge</h3>
                <div className="grid grid-cols-2 gap-4">
                  <QualityScoreBadge relevance={95} recency={90} substance={85} />
                  <QualityScoreBadge relevance={45} recency={30} substance={55} />
                </div>
              </div>

              {/* Source Card Demo */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">3.3 Source Card (click to expand)</h3>
                <div className="grid grid-cols-2 gap-4">
                  {sources.slice(0, 2).map(source => (
                    <SourceCard
                      key={source.id}
                      source={source}
                      isSelected={selectedSourceId === source.id}
                      onSelect={setSelectedSourceId}
                      onDelete={handleDeleteSource}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* How to Use */}
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">How Source Management Works</h2>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-white bg-opacity-70 rounded-lg p-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-xl">📤</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">1. Upload Sources</h4>
                  <p className="text-gray-600 text-xs">Drag files to the Source Library. Assign type and Fact Pack category.</p>
                </div>
                <div className="bg-white bg-opacity-70 rounded-lg p-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-xl">🔍</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">2. Quality Scoring</h4>
                  <p className="text-gray-600 text-xs">Each source is scored on Relevance, Recency, and Substance.</p>
                </div>
                <div className="bg-white bg-opacity-70 rounded-lg p-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-xl">🔗</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">3. Create Citations</h4>
                  <p className="text-gray-600 text-xs">Link sources to findings. Full traceability from claim to source.</p>
                </div>
              </div>
            </div>

            {/* Source Type Legend */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Source Types</h2>
              <div className="grid grid-cols-5 gap-4">
                {Object.entries(sourceTypes).map(([key, config]) => (
                  <div key={key} className="text-center">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 text-2xl"
                      style={{ backgroundColor: config.bg }}
                    >
                      {config.icon}
                    </div>
                    <p className="text-sm font-medium text-gray-900">{config.label}</p>
                    <div 
                      className="w-full h-1 rounded-full mt-2"
                      style={{ backgroundColor: config.color }}
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Source Library Panel */}
      <SourceLibraryPanel
        isOpen={libraryOpen}
        onToggle={() => setLibraryOpen(!libraryOpen)}
        sources={sources}
        onAddSource={handleAddSource}
        onSelectSource={setSelectedSourceId}
        onDeleteSource={handleDeleteSource}
        selectedSourceId={selectedSourceId}
      />
    </div>
  );
}
