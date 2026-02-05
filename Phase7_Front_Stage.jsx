import React, { useState, useRef, useEffect } from 'react';

// ============================================
// PHASE 7: FRONT STAGE COMPONENTS
// Commons OS Problem Pursuit Canvas
// Client-Facing Presentation Layer
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

// Slide templates
const slideTemplates = {
  title: {
    id: 'title',
    name: 'Title Slide',
    icon: '📌',
    description: 'Opening slide with main headline',
    layout: 'centered',
  },
  keyFinding: {
    id: 'keyFinding',
    name: 'Key Finding',
    icon: '💡',
    description: 'Single insight with supporting evidence',
    layout: 'split',
  },
  dataPoint: {
    id: 'dataPoint',
    name: 'Data Point',
    icon: '📊',
    description: 'Metric or chart with context',
    layout: 'visual',
  },
  comparison: {
    id: 'comparison',
    name: 'Comparison',
    icon: '⚖️',
    description: 'Before/after or vs comparison',
    layout: 'columns',
  },
  problemStatement: {
    id: 'problemStatement',
    name: 'Problem Statement',
    icon: '🎯',
    description: 'Core problem articulation',
    layout: 'statement',
  },
  recommendation: {
    id: 'recommendation',
    name: 'Recommendation',
    icon: '✓',
    description: 'Action or next step',
    layout: 'action',
  },
  quote: {
    id: 'quote',
    name: 'Quote',
    icon: '💬',
    description: 'Stakeholder or customer voice',
    layout: 'quote',
  },
  timeline: {
    id: 'timeline',
    name: 'Timeline',
    icon: '📅',
    description: 'Sequence of events or plan',
    layout: 'timeline',
  },
};

// Export formats
const exportFormats = [
  { id: 'pptx', name: 'PowerPoint', icon: '📊', extension: '.pptx' },
  { id: 'pdf', name: 'PDF', icon: '📄', extension: '.pdf' },
  { id: 'keynote', name: 'Keynote', icon: '🎯', extension: '.key' },
  { id: 'gdocs', name: 'Google Slides', icon: '🔗', extension: '' },
];

// ============================================
// SLIDE THUMBNAIL
// Small preview of a slide in the sidebar
// ============================================
const SlideThumbnail = ({ slide, index, isActive, onClick, onDelete, onDuplicate }) => {
  const template = slideTemplates[slide.template];
  
  return (
    <div
      className={`group relative rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${
        isActive 
          ? 'border-teal-500 shadow-lg ring-2 ring-teal-200' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
      onClick={onClick}
    >
      {/* Slide Number */}
      <div className={`absolute top-1 left-1 w-5 h-5 rounded text-xs font-bold flex items-center justify-center z-10 ${
        isActive ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'
      }`}>
        {index + 1}
      </div>

      {/* Actions */}
      <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
          className="w-5 h-5 bg-white rounded shadow text-xs flex items-center justify-center text-gray-500 hover:text-teal-600"
          title="Duplicate"
        >
          ⧉
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="w-5 h-5 bg-white rounded shadow text-xs flex items-center justify-center text-gray-500 hover:text-red-500"
          title="Delete"
        >
          ×
        </button>
      </div>

      {/* Preview */}
      <div className="aspect-[16/9] bg-white p-2">
        <div className="h-full flex flex-col items-center justify-center text-center">
          <span className="text-lg mb-1">{template.icon}</span>
          <p className="text-xs font-medium text-gray-700 line-clamp-2 px-1">
            {slide.title || template.name}
          </p>
        </div>
      </div>

      {/* Template indicator */}
      <div className="px-2 py-1 bg-gray-50 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 truncate">{template.name}</p>
      </div>
    </div>
  );
};

// ============================================
// SLIDE EDITOR PANEL
// Right sidebar for editing slide content
// ============================================
const SlideEditorPanel = ({ slide, onUpdate }) => {
  const template = slideTemplates[slide.template];
  const [localSlide, setLocalSlide] = useState(slide);

  useEffect(() => {
    setLocalSlide(slide);
  }, [slide]);

  const handleChange = (field, value) => {
    const updated = { ...localSlide, [field]: value };
    setLocalSlide(updated);
    onUpdate(updated);
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">{template.icon}</span>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{template.name}</h3>
            <p className="text-xs text-gray-500">{template.description}</p>
          </div>
        </div>
      </div>

      {/* Editor Fields */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Title */}
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">Title</label>
          <input
            type="text"
            value={localSlide.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter slide title..."
          />
        </div>

        {/* Subtitle (for title slides) */}
        {slide.template === 'title' && (
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Subtitle</label>
            <input
              type="text"
              value={localSlide.subtitle || ''}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Optional subtitle..."
            />
          </div>
        )}

        {/* Main Content */}
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">
            {slide.template === 'quote' ? 'Quote' : 'Main Content'}
          </label>
          <textarea
            value={localSlide.content || ''}
            onChange={(e) => handleChange('content', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            rows={4}
            placeholder={slide.template === 'quote' ? 'Enter quote...' : 'Enter main content...'}
          />
        </div>

        {/* Quote Attribution */}
        {slide.template === 'quote' && (
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Attribution</label>
            <input
              type="text"
              value={localSlide.attribution || ''}
              onChange={(e) => handleChange('attribution', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="— Source name, role"
            />
          </div>
        )}

        {/* Data Point */}
        {slide.template === 'dataPoint' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Metric Value</label>
                <input
                  type="text"
                  value={localSlide.metricValue || ''}
                  onChange={(e) => handleChange('metricValue', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., 47%"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Metric Label</label>
                <input
                  type="text"
                  value={localSlide.metricLabel || ''}
                  onChange={(e) => handleChange('metricLabel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., ROI improvement"
                />
              </div>
            </div>
          </>
        )}

        {/* Comparison */}
        {slide.template === 'comparison' && (
          <>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Left Column (Before/Current)</label>
              <textarea
                value={localSlide.leftContent || ''}
                onChange={(e) => handleChange('leftContent', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">Right Column (After/Target)</label>
              <textarea
                value={localSlide.rightContent || ''}
                onChange={(e) => handleChange('rightContent', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                rows={3}
              />
            </div>
          </>
        )}

        {/* Supporting Evidence */}
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">Supporting Evidence</label>
          <textarea
            value={localSlide.evidence || ''}
            onChange={(e) => handleChange('evidence', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            rows={2}
            placeholder="Source or supporting data..."
          />
        </div>

        {/* Speaker Notes */}
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">Speaker Notes</label>
          <textarea
            value={localSlide.notes || ''}
            onChange={(e) => handleChange('notes', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none bg-amber-50"
            rows={3}
            placeholder="Notes for presenter (not shown on slide)..."
          />
        </div>
      </div>

      {/* Linked Sources */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <p className="text-xs font-medium text-gray-700 mb-2">Linked Sources</p>
        <div className="flex flex-wrap gap-1">
          {localSlide.sources?.length > 0 ? (
            localSlide.sources.map((source, idx) => (
              <span 
                key={idx}
                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full"
              >
                {source}
              </span>
            ))
          ) : (
            <p className="text-xs text-gray-400">No sources linked</p>
          )}
          <button className="text-xs px-2 py-1 text-teal-600 hover:bg-teal-50 rounded-full">
            + Add source
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SLIDE CANVAS
// Main slide preview/editing area
// ============================================
const SlideCanvas = ({ slide, isPresenting }) => {
  const template = slideTemplates[slide.template];

  const renderSlideContent = () => {
    switch (slide.template) {
      case 'title':
        return (
          <div className="h-full flex flex-col items-center justify-center text-center px-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{slide.title || 'Presentation Title'}</h1>
            {slide.subtitle && (
              <p className="text-xl text-gray-500">{slide.subtitle}</p>
            )}
            {slide.content && (
              <p className="text-lg text-gray-400 mt-8">{slide.content}</p>
            )}
          </div>
        );

      case 'keyFinding':
        return (
          <div className="h-full flex flex-col p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">💡</span>
              </div>
              <span className="text-sm font-medium text-teal-600 uppercase tracking-wide">Key Finding</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{slide.title || 'Finding Title'}</h2>
            <p className="text-lg text-gray-600 flex-1">{slide.content || 'Finding details...'}</p>
            {slide.evidence && (
              <div className="mt-auto pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Evidence:</span> {slide.evidence}
                </p>
              </div>
            )}
          </div>
        );

      case 'dataPoint':
        return (
          <div className="h-full flex flex-col items-center justify-center text-center p-12">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">{slide.title || 'Metric'}</p>
            <p className="text-7xl font-bold text-teal-600 mb-4">{slide.metricValue || '0%'}</p>
            <p className="text-xl text-gray-700 mb-6">{slide.metricLabel || 'Metric label'}</p>
            {slide.content && (
              <p className="text-lg text-gray-500 max-w-2xl">{slide.content}</p>
            )}
          </div>
        );

      case 'comparison':
        return (
          <div className="h-full flex flex-col p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{slide.title || 'Comparison'}</h2>
            <div className="flex-1 grid grid-cols-2 gap-8">
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <h3 className="text-lg font-semibold text-red-700 mb-4">Before / Current</h3>
                <p className="text-gray-700">{slide.leftContent || 'Current state...'}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="text-lg font-semibold text-green-700 mb-4">After / Target</h3>
                <p className="text-gray-700">{slide.rightContent || 'Target state...'}</p>
              </div>
            </div>
          </div>
        );

      case 'problemStatement':
        return (
          <div className="h-full flex flex-col items-center justify-center p-16">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-3xl">🎯</span>
            </div>
            <p className="text-sm font-medium text-purple-600 uppercase tracking-wide mb-4">The Problem</p>
            <h2 className="text-3xl font-bold text-gray-900 text-center max-w-4xl mb-6">
              {slide.title || 'Problem statement goes here'}
            </h2>
            {slide.content && (
              <p className="text-lg text-gray-500 text-center max-w-3xl">{slide.content}</p>
            )}
          </div>
        );

      case 'recommendation':
        return (
          <div className="h-full flex flex-col p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">✓</span>
              </div>
              <span className="text-sm font-medium text-green-600 uppercase tracking-wide">Recommendation</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{slide.title || 'Recommendation'}</h2>
            <p className="text-lg text-gray-600 flex-1">{slide.content || 'Recommendation details...'}</p>
            {slide.evidence && (
              <div className="mt-auto pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Rationale:</span> {slide.evidence}
                </p>
              </div>
            )}
          </div>
        );

      case 'quote':
        return (
          <div className="h-full flex flex-col items-center justify-center p-16 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-6xl text-gray-300 mb-6">"</div>
            <blockquote className="text-2xl text-gray-700 text-center max-w-3xl italic mb-8">
              {slide.content || 'Quote goes here...'}
            </blockquote>
            {slide.attribution && (
              <p className="text-lg text-gray-500">— {slide.attribution}</p>
            )}
          </div>
        );

      case 'timeline':
        return (
          <div className="h-full flex flex-col p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">{slide.title || 'Timeline'}</h2>
            <div className="flex-1 flex items-center">
              <div className="w-full">
                <div className="relative">
                  <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200" />
                  <div className="relative flex justify-between">
                    {['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'].map((phase, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          idx === 0 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {idx + 1}
                        </div>
                        <p className="mt-3 text-sm font-medium text-gray-700">{phase}</p>
                        <p className="text-xs text-gray-500">Description</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {slide.content && (
              <p className="text-gray-600 mt-6">{slide.content}</p>
            )}
          </div>
        );

      default:
        return (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a template to begin
          </div>
        );
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-xl overflow-hidden ${isPresenting ? 'w-full h-full' : 'aspect-[16/9]'}`}>
      {renderSlideContent()}
    </div>
  );
};

// ============================================
// 8.3 SLIDE BUILDER
// Template selector and slide creation
// ============================================
const SlideBuilder = ({ onAddSlide, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Add Slide</h2>
            <p className="text-sm text-gray-500">Choose a template for your new slide</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4">
            {Object.values(slideTemplates).map((template) => (
              <button
                key={template.id}
                onClick={() => onAddSlide(template.id)}
                className="p-4 border-2 border-gray-200 rounded-xl hover:border-teal-400 hover:bg-teal-50 transition-all text-center group"
              >
                <div className="w-12 h-12 mx-auto bg-gray-100 rounded-xl flex items-center justify-center text-2xl mb-3 group-hover:bg-teal-100 transition-colors">
                  {template.icon}
                </div>
                <h4 className="font-medium text-gray-900 text-sm mb-1">{template.name}</h4>
                <p className="text-xs text-gray-500">{template.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            💡 Tip: You can also drag content from the canvas directly to create slides
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 8.4 EXPORT CONTROLS
// Export format selection and options
// ============================================
const ExportControls = ({ slides, onExport, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState('pptx');
  const [options, setOptions] = useState({
    includeSpeakerNotes: true,
    includeSourceLinks: true,
    brandingStyle: 'sticktwist',
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Export Presentation</h2>
          <p className="text-sm text-gray-500">{slides.length} slides ready for export</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Export Format</label>
            <div className="grid grid-cols-2 gap-3">
              {exportFormats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`p-4 border-2 rounded-xl text-left transition-all ${
                    selectedFormat === format.id
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{format.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{format.name}</p>
                      <p className="text-xs text-gray-500">{format.extension || 'Web link'}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Options</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.includeSpeakerNotes}
                  onChange={(e) => setOptions({ ...options, includeSpeakerNotes: e.target.checked })}
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
                <span className="text-sm text-gray-700">Include speaker notes</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.includeSourceLinks}
                  onChange={(e) => setOptions({ ...options, includeSourceLinks: e.target.checked })}
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
                <span className="text-sm text-gray-700">Include source citations</span>
              </label>
            </div>
          </div>

          {/* Branding */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Branding Style</label>
            <select
              value={options.brandingStyle}
              onChange={(e) => setOptions({ ...options, brandingStyle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="sticktwist">Stick+Twist</option>
              <option value="client">Client Branding</option>
              <option value="neutral">Neutral / No Branding</option>
            </select>
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
            onClick={() => onExport(selectedFormat, options)}
            className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export {exportFormats.find(f => f.id === selectedFormat)?.name}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 8.2 PRESENTATION VIEW
// Full-screen presentation mode
// ============================================
const PresentationView = ({ slides, startIndex, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex || 0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentIndex(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, onExit]);

  const currentSlide = slides[currentIndex];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Slide */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-6xl">
          <SlideCanvas slide={currentSlide} isPresenting />
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onExit}
            className="px-4 py-2 text-white text-sm font-medium bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
          >
            Exit (Esc)
          </button>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
              disabled={currentIndex === 0}
              className="p-2 text-white bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors disabled:opacity-30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <span className="text-white text-sm font-medium">
              {currentIndex + 1} / {slides.length}
            </span>
            
            <button
              onClick={() => setCurrentIndex(prev => Math.min(prev + 1, slides.length - 1))}
              disabled={currentIndex === slides.length - 1}
              className="p-2 text-white bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors disabled:opacity-30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-32 h-1 bg-white bg-opacity-20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Slide indicator dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-white w-6' : 'bg-white bg-opacity-40 hover:bg-opacity-60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================
// 8.1 FRONT STAGE CONTAINER
// Main container for the presentation builder
// ============================================
const FrontStageContainer = ({ slides, activeSlideIndex, onSlideSelect, onSlideUpdate, onSlideAdd, onSlideDelete, onSlideDuplicate, onPresent, onExport }) => {
  const [showSlideBuilder, setShowSlideBuilder] = useState(false);
  const [showExportControls, setShowExportControls] = useState(false);

  const activeSlide = slides[activeSlideIndex];

  const handleAddSlide = (templateId) => {
    onSlideAdd({
      id: `slide-${Date.now()}`,
      template: templateId,
      title: '',
      content: '',
    });
    setShowSlideBuilder(false);
  };

  return (
    <div className="h-full flex bg-gray-100">
      {/* Left Sidebar - Slide List */}
      <div className="w-56 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 text-sm">Slides</h3>
          <p className="text-xs text-gray-500">{slides.length} slides</p>
        </div>
        
        <div className="flex-1 overflow-auto p-3 space-y-2">
          {slides.map((slide, idx) => (
            <SlideThumbnail
              key={slide.id}
              slide={slide}
              index={idx}
              isActive={idx === activeSlideIndex}
              onClick={() => onSlideSelect(idx)}
              onDelete={() => onSlideDelete(idx)}
              onDuplicate={() => onSlideDuplicate(idx)}
            />
          ))}
        </div>

        <div className="p-3 border-t border-gray-200">
          <button
            onClick={() => setShowSlideBuilder(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-teal-600 border-2 border-dashed border-teal-300 rounded-lg hover:bg-teal-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Slide
          </button>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h2 className="font-semibold text-gray-900">Front Stage</h2>
              <p className="text-xs text-gray-500">Client Presentation Builder</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPresent}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Present
            </button>
            <button
              onClick={() => setShowExportControls(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-8 flex items-center justify-center overflow-auto">
          <div className="w-full max-w-4xl">
            {activeSlide ? (
              <SlideCanvas slide={activeSlide} />
            ) : (
              <div className="aspect-[16/9] bg-white rounded-lg shadow-xl flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl mb-4 block">📊</span>
                  <p className="text-gray-500">No slide selected</p>
                  <button
                    onClick={() => setShowSlideBuilder(true)}
                    className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
                  >
                    + Add your first slide
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Slide Counter */}
        {activeSlide && (
          <div className="h-10 bg-white border-t border-gray-200 flex items-center justify-center">
            <span className="text-sm text-gray-500">
              Slide {activeSlideIndex + 1} of {slides.length}
            </span>
          </div>
        )}
      </div>

      {/* Right Sidebar - Slide Editor */}
      {activeSlide && (
        <div className="w-80">
          <SlideEditorPanel
            slide={activeSlide}
            onUpdate={(updated) => onSlideUpdate(activeSlideIndex, updated)}
          />
        </div>
      )}

      {/* Modals */}
      {showSlideBuilder && (
        <SlideBuilder
          onAddSlide={handleAddSlide}
          onClose={() => setShowSlideBuilder(false)}
        />
      )}

      {showExportControls && (
        <ExportControls
          slides={slides}
          onExport={(format, options) => {
            onExport(format, options);
            setShowExportControls(false);
          }}
          onClose={() => setShowExportControls(false)}
        />
      )}
    </div>
  );
};

// ============================================
// MAIN APP - Phase 7 Demo
// ============================================
export default function Phase7FrontStage() {
  const [slides, setSlides] = useState([
    {
      id: 'slide-1',
      template: 'title',
      title: 'Marketing Reorientation',
      subtitle: 'Problem Pursuit Findings',
      content: 'Prepared for ACME Corp Board | January 2026',
    },
    {
      id: 'slide-2',
      template: 'problemStatement',
      title: 'Marketing lacks the measurement infrastructure to demonstrate ROI, eroding CFO confidence and risking budget cuts despite category growth opportunities.',
      content: 'This is not a marketing effectiveness problem — it\'s a marketing proof problem.',
    },
    {
      id: 'slide-3',
      template: 'dataPoint',
      title: 'Current Marketing ROI',
      metricValue: '1.2:1',
      metricLabel: 'vs. industry benchmark of 2.5:1',
      content: 'Our ROI appears low, but we can\'t prove this is measurement failure vs. actual underperformance.',
    },
    {
      id: 'slide-4',
      template: 'comparison',
      title: 'The Attribution Gap',
      leftContent: '• No econometric model\n• Channel-level reporting only\n• Quarterly brand tracking\n• Manual budget allocation',
      rightContent: '• Full-funnel MMM\n• Revenue attribution\n• Continuous brand measurement\n• Evidence-based investment',
    },
    {
      id: 'slide-5',
      template: 'keyFinding',
      title: 'Category growth is masking brand weakness',
      content: 'While the category grows at 12% CAGR, our brand growth of 8% means we\'re actually losing market share. Without attribution, this appears as marketing underperformance.',
      evidence: 'Kantar Brand Tracker Q4 2025; Category Growth Report',
    },
    {
      id: 'slide-6',
      template: 'quote',
      content: 'Every marketing dollar is questioned. We can\'t invest in growth when we can\'t prove returns.',
      attribution: 'CFO, Board Strategy Session',
    },
    {
      id: 'slide-7',
      template: 'recommendation',
      title: 'Build measurement infrastructure before optimising spend',
      content: 'Invest 90 days in establishing econometric capability. This will provide the evidence base for confident budget decisions and restore CFO trust.',
      evidence: 'Estimated ROI visibility improvement: 60% of spend attributable within 6 months',
    },
  ]);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);

  const handleSlideSelect = (index) => {
    setActiveSlideIndex(index);
  };

  const handleSlideUpdate = (index, updatedSlide) => {
    setSlides(prev => prev.map((s, i) => i === index ? updatedSlide : s));
  };

  const handleSlideAdd = (newSlide) => {
    setSlides(prev => [...prev, newSlide]);
    setActiveSlideIndex(slides.length);
  };

  const handleSlideDelete = (index) => {
    if (slides.length > 1) {
      setSlides(prev => prev.filter((_, i) => i !== index));
      setActiveSlideIndex(Math.max(0, index - 1));
    }
  };

  const handleSlideDuplicate = (index) => {
    const duplicated = { ...slides[index], id: `slide-${Date.now()}` };
    setSlides(prev => [...prev.slice(0, index + 1), duplicated, ...prev.slice(index + 1)]);
    setActiveSlideIndex(index + 1);
  };

  const handleExport = (format, options) => {
    console.log('Exporting:', format, options);
    alert(`Exporting ${slides.length} slides as ${format.toUpperCase()}`);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Phase 7: Front Stage</h1>
            <p className="text-xs text-gray-500">Front Stage Container, Presentation View, Slide Builder, Export Controls</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-coral-100 text-coral-700 text-xs font-medium rounded-full" style={{ backgroundColor: '#FCF0ED', color: '#E8846B' }}>
          Client Presentation
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {isPresenting ? (
          <PresentationView
            slides={slides}
            startIndex={activeSlideIndex}
            onExit={() => setIsPresenting(false)}
          />
        ) : (
          <FrontStageContainer
            slides={slides}
            activeSlideIndex={activeSlideIndex}
            onSlideSelect={handleSlideSelect}
            onSlideUpdate={handleSlideUpdate}
            onSlideAdd={handleSlideAdd}
            onSlideDelete={handleSlideDelete}
            onSlideDuplicate={handleSlideDuplicate}
            onPresent={() => setIsPresenting(true)}
            onExport={handleExport}
          />
        )}
      </div>
    </div>
  );
}
