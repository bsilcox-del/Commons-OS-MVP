import React, { useState, useRef, useEffect } from 'react';

// ============================================
// PHASE 9: TEMPLATES & SNAPSHOTS
// Commons OS Problem Pursuit Canvas
// Templates, Version History, Snapshots
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

// Template categories
const templateCategories = {
  problemPursuit: {
    id: 'problemPursuit',
    name: 'Problem Pursuit',
    icon: '🎯',
    color: '#1A9B9B',
    description: 'Strategic analysis templates',
  },
  factPack: {
    id: 'factPack',
    name: 'Fact Pack',
    icon: '📊',
    color: '#3B82F6',
    description: 'Data collection frameworks',
  },
  workshop: {
    id: 'workshop',
    name: 'Workshop',
    icon: '🧩',
    color: '#8B5CF6',
    description: 'Collaborative session templates',
  },
  presentation: {
    id: 'presentation',
    name: 'Presentation',
    icon: '📽️',
    color: '#F59E0B',
    description: 'Client delivery formats',
  },
  custom: {
    id: 'custom',
    name: 'Custom',
    icon: '✨',
    color: '#EC4899',
    description: 'Your saved templates',
  },
};

// Demo templates
const demoTemplates = [
  {
    id: 'tpl-1',
    name: 'Problem Pursuit Canvas',
    description: 'Full strategic analysis with all three workspaces pre-configured',
    category: 'problemPursuit',
    thumbnail: '🎯',
    elements: 24,
    lastUsed: new Date(Date.now() - 86400000 * 3),
    isOfficial: true,
    tags: ['strategy', 'analysis', 'full'],
  },
  {
    id: 'tpl-2',
    name: 'Outcome Gap Analysis',
    description: 'Focused template for gap analysis with metrics tracking',
    category: 'problemPursuit',
    thumbnail: '📊',
    elements: 12,
    lastUsed: new Date(Date.now() - 86400000 * 7),
    isOfficial: true,
    tags: ['gap', 'metrics', 'focused'],
  },
  {
    id: 'tpl-3',
    name: 'Customer Fact Pack',
    description: 'Comprehensive customer data collection framework',
    category: 'factPack',
    thumbnail: '👥',
    elements: 18,
    lastUsed: null,
    isOfficial: true,
    tags: ['customer', 'research', 'data'],
  },
  {
    id: 'tpl-4',
    name: 'Market Dynamics Fact Pack',
    description: 'Market analysis and competitive landscape template',
    category: 'factPack',
    thumbnail: '📈',
    elements: 16,
    lastUsed: new Date(Date.now() - 86400000 * 14),
    isOfficial: true,
    tags: ['market', 'competitive', 'analysis'],
  },
  {
    id: 'tpl-5',
    name: 'Strategy Workshop',
    description: 'Interactive workshop canvas with breakout areas',
    category: 'workshop',
    thumbnail: '🧩',
    elements: 20,
    lastUsed: new Date(Date.now() - 86400000 * 2),
    isOfficial: true,
    tags: ['workshop', 'interactive', 'collaboration'],
  },
  {
    id: 'tpl-6',
    name: 'Hypothesis Generation Session',
    description: 'Structured brainstorming for hypothesis creation',
    category: 'workshop',
    thumbnail: '💡',
    elements: 14,
    lastUsed: null,
    isOfficial: true,
    tags: ['hypothesis', 'brainstorm', 'ideation'],
  },
  {
    id: 'tpl-7',
    name: 'Executive Summary Deck',
    description: 'Board-ready presentation template with key slides',
    category: 'presentation',
    thumbnail: '📽️',
    elements: 10,
    lastUsed: new Date(Date.now() - 86400000),
    isOfficial: true,
    tags: ['executive', 'board', 'summary'],
  },
  {
    id: 'tpl-8',
    name: 'ACME Corp Analysis',
    description: 'Custom template saved from previous engagement',
    category: 'custom',
    thumbnail: '🏢',
    elements: 22,
    lastUsed: new Date(Date.now() - 86400000 * 5),
    isOfficial: false,
    createdBy: 'user-1',
    tags: ['client', 'custom'],
  },
];

// Demo snapshots
const demoSnapshots = [
  {
    id: 'snap-1',
    name: 'Before CFO Presentation',
    description: 'Final state before presenting to CFO',
    createdAt: new Date(Date.now() - 86400000 * 2),
    createdBy: 'user-1',
    type: 'manual',
    canvasState: { elements: 45, hypotheses: 6, sources: 12 },
  },
  {
    id: 'snap-2',
    name: 'Auto-save',
    description: null,
    createdAt: new Date(Date.now() - 3600000),
    createdBy: 'system',
    type: 'auto',
    canvasState: { elements: 48, hypotheses: 7, sources: 14 },
  },
  {
    id: 'snap-3',
    name: 'After Workshop Session',
    description: 'Captured state after client workshop',
    createdAt: new Date(Date.now() - 86400000 * 5),
    createdBy: 'user-2',
    type: 'manual',
    canvasState: { elements: 38, hypotheses: 5, sources: 10 },
  },
  {
    id: 'snap-4',
    name: 'Auto-save',
    description: null,
    createdAt: new Date(Date.now() - 86400000),
    createdBy: 'system',
    type: 'auto',
    canvasState: { elements: 46, hypotheses: 6, sources: 13 },
  },
  {
    id: 'snap-5',
    name: 'Initial Setup',
    description: 'Starting point with template applied',
    createdAt: new Date(Date.now() - 86400000 * 10),
    createdBy: 'user-1',
    type: 'manual',
    canvasState: { elements: 24, hypotheses: 0, sources: 0 },
  },
];

// Demo version history
const demoVersionHistory = [
  {
    id: 'v-1',
    timestamp: new Date(Date.now() - 300000),
    userId: 'user-1',
    action: 'edit',
    target: 'Hypothesis H7',
    details: 'Updated confidence level to 75%',
  },
  {
    id: 'v-2',
    timestamp: new Date(Date.now() - 900000),
    userId: 'user-1',
    action: 'create',
    target: 'Evidence card',
    details: 'Added supporting evidence for H5',
  },
  {
    id: 'v-3',
    timestamp: new Date(Date.now() - 1800000),
    userId: 'user-2',
    action: 'edit',
    target: 'Problem Statement',
    details: 'Refined core problem articulation',
  },
  {
    id: 'v-4',
    timestamp: new Date(Date.now() - 3600000),
    userId: 'user-3',
    action: 'upload',
    target: 'Q4 Sales Data.xlsx',
    details: 'Added to Source Library',
  },
  {
    id: 'v-5',
    timestamp: new Date(Date.now() - 7200000),
    userId: 'user-1',
    action: 'move',
    target: 'Hypothesis H4',
    details: 'Moved to Strategic Reality workspace',
  },
];

// Users for display
const users = {
  'user-1': { id: 'user-1', name: 'Benj Taylor', initials: 'BT', color: '#3B82F6' },
  'user-2': { id: 'user-2', name: 'Sarah Chen', initials: 'SC', color: '#8B5CF6' },
  'user-3': { id: 'user-3', name: 'Marcus Johnson', initials: 'MJ', color: '#22C55E' },
  'system': { id: 'system', name: 'System', initials: '⚙️', color: '#6B7280' },
};

// ============================================
// USER AVATAR
// ============================================
const UserAvatar = ({ user, size = 'default' }) => {
  const sizes = {
    xs: 'w-5 h-5 text-[10px]',
    sm: 'w-6 h-6 text-xs',
    default: 'w-8 h-8 text-xs',
  };

  if (user.id === 'system') {
    return (
      <div className={`${sizes[size]} rounded-full flex items-center justify-center bg-gray-200`}>
        <span className="text-gray-500">{user.initials}</span>
      </div>
    );
  }

  return (
    <div 
      className={`${sizes[size]} rounded-full flex items-center justify-center font-semibold text-white`}
      style={{ backgroundColor: user.color }}
      title={user.name}
    >
      {user.initials}
    </div>
  );
};

// ============================================
// TEMPLATE CARD
// ============================================
const TemplateCard = ({ template, onSelect, onPreview }) => {
  const category = templateCategories[template.category];
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (date) => {
    if (!date) return 'Never used';
    const days = Math.floor((Date.now() - date) / 86400000);
    if (days === 0) return 'Used today';
    if (days === 1) return 'Used yesterday';
    if (days < 7) return `Used ${days} days ago`;
    return `Used ${Math.floor(days / 7)} weeks ago`;
  };

  return (
    <div
      className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden transition-all hover:shadow-lg hover:border-gray-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(template)}
    >
      <div 
        className="h-32 flex items-center justify-center relative"
        style={{ backgroundColor: `${category.color}10` }}
      >
        <span className="text-5xl">{template.thumbnail}</span>
        
        {template.isOfficial && (
          <div className="absolute top-2 right-2">
            <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full font-medium">
              ✓ Official
            </span>
          </div>
        )}

        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onSelect(template); }}
              className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100"
            >
              Use Template
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onPreview(template); }}
              className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg text-sm font-medium hover:bg-opacity-30"
            >
              Preview
            </button>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-gray-900 text-sm">{template.name}</h4>
          <span 
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${category.color}20`, color: category.color }}
          >
            {category.name}
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{template.description}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{template.elements} elements</span>
          <span>{formatDate(template.lastUsed)}</span>
        </div>

        {template.tags && (
          <div className="flex flex-wrap gap-1 mt-3">
            {template.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// 10.1 TEMPLATE LIBRARY
// ============================================
const TemplateLibrary = ({ templates, onSelectTemplate, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Template Library</h2>
            <p className="text-sm text-gray-500">Choose a template to get started</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  selectedCategory === 'all' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              {Object.values(templateCategories).map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                    selectedCategory === category.id ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{ backgroundColor: selectedCategory === category.id ? category.color : undefined }}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Template Grid */}
        <div className="flex-1 overflow-auto p-6">
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {filteredTemplates.map(template => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={onSelectTemplate}
                  onPreview={setPreviewTemplate}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <span className="text-4xl mb-4">🔍</span>
              <p className="text-gray-500">No templates found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between flex-shrink-0">
          <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
            + Create Custom Template
          </button>
          <div className="text-sm text-gray-500">
            {filteredTemplates.length} templates available
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <TemplatePreview
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onSelect={() => { onSelectTemplate(previewTemplate); setPreviewTemplate(null); }}
        />
      )}
    </div>
  );
};

// ============================================
// TEMPLATE PREVIEW MODAL
// ============================================
const TemplatePreview = ({ template, onClose, onSelect }) => {
  const category = templateCategories[template.category];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-8">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
        <div className="h-48 flex items-center justify-center relative" style={{ backgroundColor: `${category.color}15` }}>
          <span className="text-7xl">{template.thumbnail}</span>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{template.name}</h2>
              <p className="text-gray-600">{template.description}</p>
            </div>
            {template.isOfficial && (
              <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full font-medium">✓ Official</span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{template.elements}</p>
              <p className="text-sm text-gray-500">Elements</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold" style={{ color: category.color }}>{category.icon}</p>
              <p className="text-sm text-gray-500">{category.name}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{template.tags?.length || 0}</p>
              <p className="text-sm text-gray-500">Tags</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-2">Includes:</h4>
            <ul className="grid grid-cols-2 gap-2">
              {['Pre-configured workspaces', 'Guiding prompts', 'Section structure', 'Agent integrations'].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={onSelect} className="px-6 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700">
            Use This Template
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 10.2 SNAPSHOT PANEL
// ============================================
const SnapshotPanel = ({ snapshots, onCreateSnapshot, onRestoreSnapshot, onDeleteSnapshot }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredSnapshots = snapshots.filter(s => filter === 'all' || s.type === filter);

  const formatTime = (date) => {
    const hours = Math.floor((Date.now() - date) / 3600000);
    const days = Math.floor(hours / 24);
    if (hours < 1) return 'Less than an hour ago';
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleCreate = () => {
    if (newName.trim()) {
      onCreateSnapshot({ name: newName, description: newDesc });
      setNewName('');
      setNewDesc('');
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">📸</span>
          <h3 className="font-semibold text-gray-900 text-sm">Snapshots</h3>
          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{snapshots.length}</span>
        </div>
        <button onClick={() => setIsCreating(true)} className="text-xs px-3 py-1.5 text-teal-600 hover:bg-teal-50 rounded-lg font-medium">
          + Create
        </button>
      </div>

      <div className="px-4 py-2 border-b border-gray-100 flex gap-2">
        {[{ id: 'all', label: 'All' }, { id: 'manual', label: 'Manual' }, { id: 'auto', label: 'Auto' }].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-2 py-1 text-xs font-medium rounded ${filter === f.id ? 'bg-teal-100 text-teal-700' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isCreating && (
        <div className="p-4 bg-teal-50 border-b border-teal-100">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Snapshot name..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 mb-2"
            autoFocus
          />
          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Description (optional)..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none mb-2"
            rows={2}
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setIsCreating(false)} className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-200 rounded-lg">Cancel</button>
            <button onClick={handleCreate} disabled={!newName.trim()} className="px-3 py-1.5 text-xs text-white bg-teal-600 hover:bg-teal-700 rounded-lg disabled:opacity-50">
              Create
            </button>
          </div>
        </div>
      )}

      <div className="max-h-80 overflow-auto divide-y divide-gray-100">
        {filteredSnapshots.map(snapshot => {
          const user = users[snapshot.createdBy];
          return (
            <div key={snapshot.id} className="p-4 hover:bg-gray-50 group">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-lg ${snapshot.type === 'auto' ? 'opacity-50' : ''}`}>
                    {snapshot.type === 'auto' ? '⏱️' : '📸'}
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{snapshot.name}</h4>
                    <p className="text-xs text-gray-500">{formatTime(snapshot.createdAt)}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${snapshot.type === 'auto' ? 'bg-gray-100 text-gray-600' : 'bg-teal-100 text-teal-700'}`}>
                  {snapshot.type === 'auto' ? 'Auto' : 'Manual'}
                </span>
              </div>

              {snapshot.description && <p className="text-xs text-gray-500 mb-2">{snapshot.description}</p>}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <UserAvatar user={user} size="xs" />
                  <span>{snapshot.canvasState.elements} elements</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onRestoreSnapshot(snapshot)} className="p-1.5 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded" title="Restore">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                  {snapshot.type !== 'auto' && (
                    <button onClick={() => onDeleteSnapshot(snapshot)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded" title="Delete">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
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
// 10.3 VERSION HISTORY
// ============================================
const VersionHistory = ({ versions, onRevert }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const formatTime = (date) => {
    const minutes = Math.floor((Date.now() - date) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(date).toLocaleTimeString();
  };

  const icons = { edit: '✏️', create: '➕', delete: '🗑️', move: '↗️', upload: '📎' };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-50" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-2">
          <span className="text-lg">🕐</span>
          <h3 className="font-semibold text-gray-900 text-sm">Version History</h3>
        </div>
        <svg className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isExpanded && (
        <div className="max-h-64 overflow-auto">
          <div className="relative ml-6">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200" />
            {versions.map(version => {
              const user = users[version.userId];
              return (
                <div key={version.id} className="relative pl-6 py-3 hover:bg-gray-50 group">
                  <div className="absolute left-[-2px] top-4 w-5 h-5 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-[10px] z-10">
                    {icons[version.action] || '•'}
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <UserAvatar user={user} size="xs" />
                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                    <span className="text-xs text-gray-400">{formatTime(version.timestamp)}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="capitalize">{version.action}</span> <span className="font-medium">{version.target}</span>
                  </p>
                  {version.details && <p className="text-xs text-gray-400 mt-0.5">{version.details}</p>}
                  <button onClick={() => onRevert(version)} className="mt-1 text-xs text-teal-600 hover:text-teal-700 font-medium opacity-0 group-hover:opacity-100">
                    Revert to this
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================
export default function Phase9TemplatesSnapshots() {
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [snapshots, setSnapshots] = useState(demoSnapshots);
  const [versions] = useState(demoVersionHistory);

  const handleSelectTemplate = (template) => {
    console.log('Selected:', template);
    setShowTemplateLibrary(false);
    alert(`Canvas created from "${template.name}" template!`);
  };

  const handleCreateSnapshot = (data) => {
    setSnapshots(prev => [{
      id: `snap-${Date.now()}`,
      name: data.name,
      description: data.description,
      createdAt: new Date(),
      createdBy: 'user-1',
      type: 'manual',
      canvasState: { elements: 48, hypotheses: 7, sources: 14 },
    }, ...prev]);
  };

  const handleRestoreSnapshot = (snapshot) => {
    if (confirm(`Restore to "${snapshot.name}"?`)) {
      alert(`Canvas restored to "${snapshot.name}"`);
    }
  };

  const handleDeleteSnapshot = (snapshot) => {
    if (confirm(`Delete "${snapshot.name}"?`)) {
      setSnapshots(prev => prev.filter(s => s.id !== snapshot.id));
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Phase 9: Templates & Snapshots</h1>
            <p className="text-xs text-gray-500">Template Library, Snapshots, Version History</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-green-600 mr-4">
            <span>✓</span>
            <span>All changes saved</span>
          </div>
          <button onClick={() => setShowTemplateLibrary(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700">
            <span>📋</span> Templates
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-8">
          <div className="h-full bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-center">
            <div className="text-center">
              <span className="text-5xl mb-4 block">🎨</span>
              <p className="text-gray-500 mb-4">Canvas with template & snapshot features</p>
              <button onClick={() => setShowTemplateLibrary(true)} className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700">
                Start from Template
              </button>
            </div>
          </div>
        </div>

        <div className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-4 space-y-4">
            <SnapshotPanel
              snapshots={snapshots}
              onCreateSnapshot={handleCreateSnapshot}
              onRestoreSnapshot={handleRestoreSnapshot}
              onDeleteSnapshot={handleDeleteSnapshot}
            />
            <VersionHistory versions={versions} onRevert={(v) => console.log('Revert:', v)} />
          </div>
        </div>
      </div>

      {showTemplateLibrary && (
        <TemplateLibrary templates={demoTemplates} onSelectTemplate={handleSelectTemplate} onClose={() => setShowTemplateLibrary(false)} />
      )}
    </div>
  );
}
