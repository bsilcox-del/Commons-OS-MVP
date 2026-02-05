import React, { useState, useEffect, useRef } from 'react';

// ============================================
// PHASE 6: WORKSPACES COMPONENTS
// Commons OS Problem Pursuit Canvas
// Three Strategic Outcome Workspaces
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

// Workspace configurations from Design Spec
const workspaces = {
  outcomeGap: {
    id: 'outcomeGap',
    number: 1,
    title: 'Outcome Gap',
    subtitle: 'Where do we need to get to?',
    description: 'Define the gap between current state and desired business outcomes',
    icon: '🎯',
    color: '#22C55E',
    bgColor: '#DCFCE7',
    gradient: 'from-green-50 to-emerald-50',
    borderColor: '#86EFAC',
    sections: [
      { id: 'current', title: 'Current State', description: 'Where are we now?' },
      { id: 'desired', title: 'Desired Outcome', description: 'Where do we need to be?' },
      { id: 'gap', title: 'The Gap', description: 'What needs to change?' },
      { id: 'constraints', title: 'Constraints', description: 'What limits our options?' },
    ],
    prompts: [
      'What does success look like in measurable terms?',
      'What is the current baseline performance?',
      'What is the magnitude of the gap?',
      'What timeframe are we working with?',
    ],
  },
  strategicReality: {
    id: 'strategicReality',
    number: 2,
    title: 'Strategic Reality',
    subtitle: 'What\'s actually happening?',
    description: 'Understand the real dynamics driving current performance',
    icon: '🔍',
    color: '#3B82F6',
    bgColor: '#DBEAFE',
    gradient: 'from-blue-50 to-indigo-50',
    borderColor: '#93C5FD',
    sections: [
      { id: 'market', title: 'Market Dynamics', description: 'External forces at play' },
      { id: 'customer', title: 'Customer Reality', description: 'What customers actually do' },
      { id: 'competitive', title: 'Competitive Position', description: 'Where we stand vs others' },
      { id: 'internal', title: 'Internal Factors', description: 'Organisational reality' },
    ],
    prompts: [
      'What does the data actually show?',
      'What are we not seeing clearly?',
      'Where are our assumptions vs evidence?',
      'What patterns are emerging?',
    ],
  },
  problemDefinition: {
    id: 'problemDefinition',
    number: 3,
    title: 'Problem Definition',
    subtitle: 'What\'s the real problem?',
    description: 'Synthesise findings into a clear, actionable problem statement',
    icon: '💡',
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
    gradient: 'from-purple-50 to-violet-50',
    borderColor: '#C4B5FD',
    sections: [
      { id: 'root', title: 'Root Causes', description: 'Why the gap exists' },
      { id: 'tensions', title: 'Key Tensions', description: 'Trade-offs to navigate' },
      { id: 'statement', title: 'Problem Statement', description: 'The core challenge' },
      { id: 'criteria', title: 'Success Criteria', description: 'How we\'ll know it\'s solved' },
    ],
    prompts: [
      'What is the single biggest blocker?',
      'Why hasn\'t this been solved before?',
      'What would need to be true for success?',
      'What are we really trying to achieve?',
    ],
  },
};

// ============================================
// 5.3 WORKSPACE PROGRESS INDICATOR
// Shows completion state for workspace sections
// ============================================
const WorkspaceProgressIndicator = ({ workspace, sectionProgress, size = 'default' }) => {
  const config = workspaces[workspace];
  const sections = config.sections;
  
  const completedSections = sections.filter(s => sectionProgress[s.id]?.complete).length;
  const totalSections = sections.length;
  const percentage = Math.round((completedSections / totalSections) * 100);

  if (size === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {sections.map((section, idx) => (
            <div
              key={section.id}
              className="w-6 h-1.5 rounded-full transition-all"
              style={{
                backgroundColor: sectionProgress[section.id]?.complete 
                  ? config.color 
                  : `${config.color}30`
              }}
            />
          ))}
        </div>
        <span className="text-xs font-medium" style={{ color: config.color }}>
          {percentage}%
        </span>
      </div>
    );
  }

  if (size === 'mini') {
    return (
      <div className="flex items-center gap-1">
        {sections.map((section) => (
          <div
            key={section.id}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              backgroundColor: sectionProgress[section.id]?.complete 
                ? config.color 
                : `${config.color}30`
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        <span 
          className="text-sm font-bold"
          style={{ color: config.color }}
        >
          {completedSections}/{totalSections} sections
        </span>
      </div>
      <div className="flex gap-1">
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex-1 h-2 rounded-full transition-all relative group"
            style={{
              backgroundColor: sectionProgress[section.id]?.complete 
                ? config.color 
                : `${config.color}20`
            }}
          >
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {section.title}
                {sectionProgress[section.id]?.complete && ' ✓'}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        {sections.map((section) => (
          <span 
            key={section.id} 
            className="truncate px-1"
            style={{ 
              maxWidth: `${100 / sections.length}%`,
              color: sectionProgress[section.id]?.complete ? config.color : undefined
            }}
          >
            {section.title}
          </span>
        ))}
      </div>
    </div>
  );
};

// ============================================
// SECTION CARD
// Individual section within a workspace
// ============================================
const SectionCard = ({ section, workspace, content, onUpdate, isActive, onClick }) => {
  const config = workspaces[workspace];
  const [isEditing, setIsEditing] = useState(false);
  const [localContent, setLocalContent] = useState(content?.text || '');

  const handleSave = () => {
    onUpdate(section.id, { text: localContent, complete: localContent.trim().length > 0 });
    setIsEditing(false);
  };

  return (
    <div
      className={`bg-white rounded-xl border-2 transition-all cursor-pointer ${
        isActive 
          ? 'shadow-lg' 
          : 'hover:shadow-md'
      }`}
      style={{ 
        borderColor: isActive ? config.color : colors.gray[200],
      }}
      onClick={() => !isEditing && onClick()}
    >
      {/* Header */}
      <div 
        className="px-4 py-3 border-b flex items-center justify-between"
        style={{ 
          backgroundColor: isActive ? `${config.color}10` : colors.gray[50],
          borderColor: isActive ? `${config.color}30` : colors.gray[200]
        }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ 
              backgroundColor: content?.complete ? config.color : `${config.color}20`,
              color: content?.complete ? 'white' : config.color
            }}
          >
            {content?.complete ? '✓' : section.id.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-medium text-gray-900 text-sm">{section.title}</h4>
            <p className="text-xs text-gray-500">{section.description}</p>
          </div>
        </div>
        {content?.complete && (
          <span 
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${config.color}20`, color: config.color }}
          >
            Complete
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {isEditing ? (
          <div onClick={(e) => e.stopPropagation()}>
            <textarea
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 resize-none"
              style={{ focusRingColor: config.color }}
              rows={4}
              placeholder={`Describe ${section.title.toLowerCase()}...`}
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => { setIsEditing(false); setLocalContent(content?.text || ''); }}
                className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 text-xs text-white rounded-lg"
                style={{ backgroundColor: config.color }}
              >
                Save
              </button>
            </div>
          </div>
        ) : content?.text ? (
          <div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{content.text}</p>
            <button
              onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
              className="mt-2 text-xs text-gray-400 hover:text-gray-600"
            >
              Edit
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
            className="w-full py-6 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors"
          >
            + Add content for {section.title}
          </button>
        )}
      </div>

      {/* Linked Items */}
      {content?.linkedItems && content.linkedItems.length > 0 && (
        <div className="px-4 pb-4">
          <p className="text-xs text-gray-500 mb-2">Linked evidence:</p>
          <div className="flex flex-wrap gap-1">
            {content.linkedItems.map((item, idx) => (
              <span 
                key={idx}
                className="text-xs px-2 py-1 rounded-full"
                style={{ backgroundColor: `${config.color}15`, color: config.color }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// WORKSPACE PROMPTS
// Guiding questions for each workspace
// ============================================
const WorkspacePrompts = ({ workspace, onPromptClick }) => {
  const config = workspaces[workspace];

  return (
    <div 
      className="rounded-xl p-4 border"
      style={{ 
        backgroundColor: `${config.color}08`,
        borderColor: `${config.color}30`
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">💭</span>
        <h4 className="font-medium text-gray-900 text-sm">Guiding Questions</h4>
      </div>
      <div className="space-y-2">
        {config.prompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onPromptClick(prompt)}
            className="w-full text-left p-2 rounded-lg text-sm text-gray-600 hover:bg-white hover:shadow-sm transition-all flex items-start gap-2"
          >
            <span style={{ color: config.color }}>→</span>
            <span>{prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================
// 5.2 WORKSPACE HEADER
// Title, description, progress, actions
// ============================================
const WorkspaceHeader = ({ workspace, sectionProgress, onBack, onAction }) => {
  const config = workspaces[workspace];

  return (
    <div 
      className={`bg-gradient-to-r ${config.gradient} border-b`}
      style={{ borderColor: config.borderColor }}
    >
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="mt-1 p-2 text-gray-400 hover:text-gray-600 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
              style={{ backgroundColor: `${config.color}20` }}
            >
              {config.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span 
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: config.color, color: 'white' }}
                >
                  PHASE {config.number}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
              <p className="text-gray-600">{config.subtitle}</p>
              <p className="text-sm text-gray-500 mt-1">{config.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <WorkspaceProgressIndicator 
                workspace={workspace} 
                sectionProgress={sectionProgress}
                size="compact"
              />
            </div>
            <button
              onClick={() => onAction('agent')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
              style={{ backgroundColor: config.color }}
            >
              <span>🤖</span>
              Ask Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 5.1 WORKSPACE CONTAINER
// The outer shell for each workspace
// ============================================
const WorkspaceContainer = ({ 
  workspace, 
  sectionProgress, 
  onUpdateSection, 
  onBack,
  onNavigateNext,
  onAction 
}) => {
  const config = workspaces[workspace];
  const [activeSection, setActiveSection] = useState(config.sections[0].id);

  const completedCount = config.sections.filter(s => sectionProgress[s.id]?.complete).length;
  const isComplete = completedCount === config.sections.length;

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <WorkspaceHeader
        workspace={workspace}
        sectionProgress={sectionProgress}
        onBack={onBack}
        onAction={onAction}
      />

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Main Content - Sections */}
            <div className="col-span-2 space-y-4">
              {config.sections.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  workspace={workspace}
                  content={sectionProgress[section.id]}
                  onUpdate={onUpdateSection}
                  isActive={activeSection === section.id}
                  onClick={() => setActiveSection(section.id)}
                />
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Progress */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="font-medium text-gray-900 text-sm mb-3">Workspace Progress</h4>
                <WorkspaceProgressIndicator 
                  workspace={workspace} 
                  sectionProgress={sectionProgress}
                />
              </div>

              {/* Prompts */}
              <WorkspacePrompts 
                workspace={workspace}
                onPromptClick={(prompt) => console.log('Prompt:', prompt)}
              />

              {/* Navigation */}
              {isComplete && onNavigateNext && (
                <button
                  onClick={onNavigateNext}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white font-medium rounded-xl transition-colors"
                  style={{ backgroundColor: config.color }}
                >
                  Continue to Next Phase
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 5.4 WORKSPACE TRANSITION
// Visual transition between workspaces
// ============================================
const WorkspaceTransition = ({ from, to, isActive, onComplete }) => {
  const fromConfig = workspaces[from];
  const toConfig = workspaces[to];
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 30);

      const timer = setTimeout(() => {
        onComplete();
      }, 1600);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        {/* Animated transition */}
        <div className="flex items-center justify-center gap-8 mb-8">
          {/* From workspace */}
          <div 
            className="flex flex-col items-center transition-all duration-500"
            style={{ 
              opacity: 1 - (progress / 100) * 0.5,
              transform: `translateX(${-progress / 4}px) scale(${1 - progress / 400})`
            }}
          >
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-2"
              style={{ backgroundColor: `${fromConfig.color}20` }}
            >
              {fromConfig.icon}
            </div>
            <span className="text-sm font-medium text-gray-500">{fromConfig.title}</span>
          </div>

          {/* Arrow animation */}
          <div className="flex items-center">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    backgroundColor: progress > (i + 1) * 30 ? toConfig.color : colors.gray[300],
                    transition: 'background-color 0.3s'
                  }}
                />
              ))}
            </div>
          </div>

          {/* To workspace */}
          <div 
            className="flex flex-col items-center transition-all duration-500"
            style={{ 
              opacity: 0.5 + (progress / 100) * 0.5,
              transform: `translateX(${(100 - progress) / 4}px) scale(${0.9 + progress / 1000})`
            }}
          >
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-2"
              style={{ backgroundColor: `${toConfig.color}20` }}
            >
              {toConfig.icon}
            </div>
            <span className="text-sm font-medium" style={{ color: toConfig.color }}>
              {toConfig.title}
            </span>
          </div>
        </div>

        {/* Progress text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">
            Moving to {toConfig.title}
          </h2>
          <p className="text-gray-500">{toConfig.subtitle}</p>
        </div>

        {/* Loading bar */}
        <div className="w-64 mx-auto mt-6">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-100"
              style={{ 
                backgroundColor: toConfig.color,
                width: `${progress}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// WORKSPACE NAVIGATOR
// Overview of all workspaces with status
// ============================================
const WorkspaceNavigator = ({ currentWorkspace, progress, onSelect }) => {
  const workspaceOrder = ['outcomeGap', 'strategicReality', 'problemDefinition'];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 text-sm mb-4">Problem Pursuit Journey</h3>
      
      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200" />
        
        {/* Workspaces */}
        <div className="relative flex justify-between">
          {workspaceOrder.map((wsId, idx) => {
            const ws = workspaces[wsId];
            const wsProgress = progress[wsId] || {};
            const completedSections = ws.sections.filter(s => wsProgress[s.id]?.complete).length;
            const isComplete = completedSections === ws.sections.length;
            const isCurrent = currentWorkspace === wsId;
            const isAccessible = idx === 0 || 
              workspaceOrder.slice(0, idx).every(prevId => {
                const prev = workspaces[prevId];
                const prevProgress = progress[prevId] || {};
                return prev.sections.filter(s => prevProgress[s.id]?.complete).length >= 2;
              });

            return (
              <button
                key={wsId}
                onClick={() => isAccessible && onSelect(wsId)}
                disabled={!isAccessible}
                className={`flex flex-col items-center group ${
                  isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                }`}
              >
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-2 transition-all ${
                    isCurrent 
                      ? 'ring-2 ring-offset-2 shadow-lg' 
                      : isAccessible 
                        ? 'group-hover:scale-110' 
                        : ''
                  }`}
                  style={{ 
                    backgroundColor: isComplete ? ws.color : `${ws.color}20`,
                    ringColor: ws.color,
                    color: isComplete ? 'white' : undefined
                  }}
                >
                  {isComplete ? '✓' : ws.icon}
                </div>
                <span 
                  className={`text-xs font-medium ${isCurrent ? 'text-gray-900' : 'text-gray-500'}`}
                  style={{ color: isCurrent ? ws.color : undefined }}
                >
                  {ws.title}
                </span>
                <WorkspaceProgressIndicator 
                  workspace={wsId}
                  sectionProgress={wsProgress}
                  size="mini"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============================================
// WORKSPACE SUMMARY CARD
// Card showing workspace status for selection
// ============================================
const WorkspaceSummaryCard = ({ workspace, progress, isActive, isAccessible, onSelect }) => {
  const config = workspaces[workspace];
  const completedSections = config.sections.filter(s => progress[s.id]?.complete).length;
  const isComplete = completedSections === config.sections.length;

  return (
    <button
      onClick={() => isAccessible && onSelect(workspace)}
      disabled={!isAccessible}
      className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
        isActive 
          ? 'shadow-xl scale-[1.02]' 
          : isAccessible 
            ? 'hover:shadow-lg hover:scale-[1.01]' 
            : 'opacity-50 cursor-not-allowed'
      }`}
      style={{ 
        borderColor: isActive ? config.color : colors.gray[200],
        backgroundColor: isActive ? `${config.color}05` : 'white'
      }}
    >
      <div className="flex items-start gap-4">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
          style={{ 
            backgroundColor: isComplete ? config.color : `${config.color}20`,
            color: isComplete ? 'white' : undefined
          }}
        >
          {isComplete ? '✓' : config.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span 
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ 
                backgroundColor: isComplete ? config.color : `${config.color}20`,
                color: isComplete ? 'white' : config.color
              }}
            >
              PHASE {config.number}
            </span>
            {isComplete && (
              <span className="text-xs text-green-600 font-medium">Complete</span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{config.title}</h3>
          <p className="text-sm text-gray-500 mb-3">{config.subtitle}</p>
          
          <WorkspaceProgressIndicator 
            workspace={workspace}
            sectionProgress={progress}
            size="compact"
          />

          {/* Section previews */}
          <div className="mt-3 flex flex-wrap gap-1">
            {config.sections.map(section => (
              <span 
                key={section.id}
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: progress[section.id]?.complete 
                    ? `${config.color}20` 
                    : colors.gray[100],
                  color: progress[section.id]?.complete 
                    ? config.color 
                    : colors.gray[500]
                }}
              >
                {section.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
};

// ============================================
// MAIN APP - Phase 6 Demo
// ============================================
export default function Phase6Workspaces() {
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState(null);
  
  const [progress, setProgress] = useState({
    outcomeGap: {
      current: { text: 'Current marketing ROI is 1.2:1, below industry benchmark of 2.5:1. Revenue growth at 8% vs category average of 12%.', complete: true },
      desired: { text: 'Achieve marketing ROI of 3:1 and revenue growth of 15% within 18 months.', complete: true },
      gap: { text: 'Need to improve ROI by 2.5x and accelerate growth by 7 percentage points.', complete: true },
      constraints: { text: 'Fixed marketing budget for FY25, limited analytical capability in-house.', complete: false },
    },
    strategicReality: {
      market: { text: 'Category growing at 12% CAGR, driven by new entrants capturing digital-first segments.', complete: true },
      customer: { text: '', complete: false },
      competitive: { text: '', complete: false },
      internal: { text: 'Marketing team lacks econometric capability. CFO confidence is at all-time low.', complete: true },
    },
    problemDefinition: {
      root: { text: '', complete: false },
      tensions: { text: '', complete: false },
      statement: { text: '', complete: false },
      criteria: { text: '', complete: false },
    },
  });

  const handleUpdateSection = (workspaceId, sectionId, content) => {
    setProgress(prev => ({
      ...prev,
      [workspaceId]: {
        ...prev[workspaceId],
        [sectionId]: content
      }
    }));
  };

  const handleNavigateWorkspace = (targetWorkspace) => {
    if (currentWorkspace && currentWorkspace !== targetWorkspace) {
      setTransitionTarget(targetWorkspace);
      setShowTransition(true);
    } else {
      setCurrentWorkspace(targetWorkspace);
    }
  };

  const handleTransitionComplete = () => {
    setCurrentWorkspace(transitionTarget);
    setShowTransition(false);
    setTransitionTarget(null);
  };

  const getNextWorkspace = () => {
    const order = ['outcomeGap', 'strategicReality', 'problemDefinition'];
    const currentIndex = order.indexOf(currentWorkspace);
    return currentIndex < order.length - 1 ? order[currentIndex + 1] : null;
  };

  // If viewing a workspace
  if (currentWorkspace) {
    return (
      <>
        <WorkspaceContainer
          workspace={currentWorkspace}
          sectionProgress={progress[currentWorkspace]}
          onUpdateSection={(sectionId, content) => handleUpdateSection(currentWorkspace, sectionId, content)}
          onBack={() => setCurrentWorkspace(null)}
          onNavigateNext={getNextWorkspace() ? () => handleNavigateWorkspace(getNextWorkspace()) : null}
          onAction={(action) => console.log('Action:', action)}
        />
        
        {showTransition && transitionTarget && (
          <WorkspaceTransition
            from={currentWorkspace}
            to={transitionTarget}
            isActive={showTransition}
            onComplete={handleTransitionComplete}
          />
        )}
      </>
    );
  }

  // Workspace selection view
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
              <h1 className="font-semibold text-gray-900">Phase 6: Workspaces</h1>
              <p className="text-xs text-gray-500">Workspace Container, Header, Progress, Transitions</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-5xl mx-auto">
            {/* Introduction */}
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🗺️</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">Strategic Workspaces</h2>
                  <p className="text-sm text-gray-600 mb-3">
                    Problem Pursuit uses three sequential workspaces to move from understanding the gap, 
                    through analysing reality, to defining the core problem.
                  </p>
                  <WorkspaceNavigator
                    currentWorkspace={currentWorkspace}
                    progress={progress}
                    onSelect={handleNavigateWorkspace}
                  />
                </div>
              </div>
            </div>

            {/* Workspace Cards */}
            <div className="space-y-4">
              {['outcomeGap', 'strategicReality', 'problemDefinition'].map((wsId, idx) => {
                const isAccessible = idx === 0 || 
                  ['outcomeGap', 'strategicReality', 'problemDefinition'].slice(0, idx).every(prevId => {
                    const prev = workspaces[prevId];
                    const prevProgress = progress[prevId] || {};
                    return prev.sections.filter(s => prevProgress[s.id]?.complete).length >= 2;
                  });

                return (
                  <WorkspaceSummaryCard
                    key={wsId}
                    workspace={wsId}
                    progress={progress[wsId]}
                    isActive={currentWorkspace === wsId}
                    isAccessible={isAccessible}
                    onSelect={handleNavigateWorkspace}
                  />
                );
              })}
            </div>

            {/* Component Info */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="font-medium text-gray-900 mb-2">5.1 Workspace Container</h4>
                <p className="text-sm text-gray-500">Full workspace shell with header, sections grid, sidebar with prompts and progress</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="font-medium text-gray-900 mb-2">5.2 Workspace Header</h4>
                <p className="text-sm text-gray-500">Phase badge, title, subtitle, description, progress indicator, agent action</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="font-medium text-gray-900 mb-2">5.3 Progress Indicator</h4>
                <p className="text-sm text-gray-500">Three sizes (default, compact, mini), section-by-section tracking with tooltips</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="font-medium text-gray-900 mb-2">5.4 Workspace Transition</h4>
                <p className="text-sm text-gray-500">Animated transition between workspaces with progress bar and messaging</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
