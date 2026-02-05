import React, { useState, useRef, useCallback, useEffect } from 'react';

// ============================================
// PHASE 1: FOUNDATION COMPONENTS (REFINED)
// Commons OS Problem Pursuit Canvas
// ============================================

// Color system based on Stick+Twist brand
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

// Sticky note color presets
const stickyColors = {
  yellow: { bg: '#FEF9C3', border: '#FDE047', text: '#854D0E' },
  blue: { bg: '#DBEAFE', border: '#93C5FD', text: '#1E40AF' },
  green: { bg: '#DCFCE7', border: '#86EFAC', text: '#166534' },
  pink: { bg: '#FCE7F3', border: '#F9A8D4', text: '#9D174D' },
  purple: { bg: '#F3E8FF', border: '#C4B5FD', text: '#6B21A8' },
  orange: { bg: '#FFEDD5', border: '#FDBA74', text: '#9A3412' },
};

// Connection type configurations
const connectionTypes = {
  supports: { color: '#22C55E', dash: 'none', label: 'Supports' },
  contradicts: { color: '#EF4444', dash: '5,5', label: 'Contradicts' },
  relates: { color: '#6B7280', dash: 'none', label: 'Relates to' },
  leads_to: { color: '#3B82F6', dash: 'none', label: 'Leads to' },
  questions: { color: '#F59E0B', dash: '3,3', label: 'Questions' },
};

// ============================================
// 1.1 MAIN CANVAS CONTAINER (REFINED)
// Added: Selection box for multi-select
// ============================================
const CanvasContainer = ({ 
  children, 
  zoom, 
  position, 
  onPan, 
  onZoom,
  onSelectionBox,
  selectionBox,
  onCanvasClick 
}) => {
  const containerRef = useRef(null);
  const [isPanning, setIsPanning] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [selectStart, setSelectStart] = useState({ x: 0, y: 0 });

  const getCanvasPoint = (clientX, clientY) => {
    return {
      x: (clientX - position.x) / zoom,
      y: (clientY - position.y) / zoom
    };
  };

  const handleMouseDown = (e) => {
    if (e.target === containerRef.current || e.target.classList.contains('canvas-background')) {
      if (e.shiftKey) {
        // Start selection box
        setIsSelecting(true);
        const point = getCanvasPoint(e.clientX, e.clientY);
        setSelectStart(point);
        onSelectionBox({ start: point, end: point });
      } else {
        // Start panning
        setIsPanning(true);
        setPanStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        onCanvasClick(); // Deselect all
      }
    }
  };

  const handleMouseMove = (e) => {
    if (isPanning) {
      onPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    } else if (isSelecting) {
      const point = getCanvasPoint(e.clientX, e.clientY);
      onSelectionBox({ start: selectStart, end: point });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    if (isSelecting) {
      setIsSelecting(false);
      // Selection box will be processed by parent
    }
  };

  const handleWheel = (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      onZoom(Math.max(0.25, Math.min(2, zoom + delta)));
    }
  };

  return (
    <div
      ref={containerRef}
      className="canvas-background absolute inset-0 overflow-hidden"
      style={{
        backgroundColor: colors.gray[100],
        backgroundImage: `radial-gradient(circle, ${colors.gray[300]} 1px, transparent 1px)`,
        backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
        backgroundPosition: `${position.x}px ${position.y}px`,
        cursor: isPanning ? 'grabbing' : isSelecting ? 'crosshair' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
        }}
      >
        {children}
        
        {/* Selection Box */}
        {selectionBox && (
          <div
            className="absolute border-2 border-teal-500 bg-teal-500 bg-opacity-10 pointer-events-none"
            style={{
              left: Math.min(selectionBox.start.x, selectionBox.end.x),
              top: Math.min(selectionBox.start.y, selectionBox.end.y),
              width: Math.abs(selectionBox.end.x - selectionBox.start.x),
              height: Math.abs(selectionBox.end.y - selectionBox.start.y),
            }}
          />
        )}
      </div>
    </div>
  );
};

// ============================================
// 1.2 NAVIGATION RAIL (unchanged)
// ============================================
const NavigationRail = ({ activePhase, onPhaseChange, isCollapsed, onToggleCollapse }) => {
  const phases = [
    { id: 'phase-zero', label: 'Phase Zero', icon: '🎯', description: 'Strategic Context' },
    { id: 'outcome-gap', label: 'Outcome Gap', icon: '📊', description: 'Gap Analysis' },
    { id: 'strategic-reality', label: 'Strategic Reality', icon: '🔍', description: 'Current State' },
    { id: 'problem-definition', label: 'Problem Definition', icon: '💡', description: 'Frame the Problem' },
  ];

  const tools = [
    { id: 'sources', label: 'Source Library', icon: '📁' },
    { id: 'agents', label: 'Agent Ensemble', icon: '🤖' },
  ];

  return (
    <div 
      className={`h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          {!isCollapsed && (
            <div>
              <div className="font-semibold text-gray-900 text-sm">Commons OS</div>
              <div className="text-xs text-gray-500">Problem Pursuit</div>
            </div>
          )}
        </div>
      </div>

      {/* Phase Navigation */}
      <div className="flex-1 py-4 overflow-y-auto">
        <div className={`px-3 mb-2 ${isCollapsed ? 'hidden' : ''}`}>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phases</span>
        </div>
        <nav className="space-y-1 px-2">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => onPhaseChange(phase.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activePhase === phase.id
                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{phase.icon}</span>
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">{phase.label}</div>
                  <div className="text-xs text-gray-400">{phase.description}</div>
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="my-4 mx-4 border-t border-gray-200"></div>

        <div className={`px-3 mb-2 ${isCollapsed ? 'hidden' : ''}`}>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tools</span>
        </div>
        <nav className="space-y-1 px-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
            >
              <span className="text-lg">{tool.icon}</span>
              {!isCollapsed && (
                <span className="text-sm font-medium">{tool.label}</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-50 transition-all"
        >
          <svg 
            className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          {!isCollapsed && <span className="text-sm">Collapse</span>}
        </button>
      </div>
    </div>
  );
};

// ============================================
// 1.4 TOOLBAR (REFINED)
// Added: Connection tool, keyboard shortcut hints
// ============================================
const Toolbar = ({ 
  zoom, 
  onZoomChange, 
  onAddSticky, 
  onAddFrame, 
  viewMode, 
  onViewModeChange,
  activeTool,
  onToolChange,
  selectedCount,
  onDeleteSelected,
  canUndo,
  canRedo,
  onUndo,
  onRedo
}) => {
  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Left: Add Tools */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => { onToolChange('select'); }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTool === 'select' ? 'bg-white shadow-sm text-teal-600' : 'text-gray-700 hover:bg-white hover:shadow-sm'
            }`}
            title="Select (V)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            <span>Select</span>
          </button>
          <button
            onClick={() => { onToolChange('sticky'); onAddSticky(); }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTool === 'sticky' ? 'bg-white shadow-sm text-teal-600' : 'text-gray-700 hover:bg-white hover:shadow-sm'
            }`}
            title="Add Sticky (S)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Sticky</span>
          </button>
          <button
            onClick={() => { onToolChange('frame'); onAddFrame(); }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTool === 'frame' ? 'bg-white shadow-sm text-teal-600' : 'text-gray-700 hover:bg-white hover:shadow-sm'
            }`}
            title="Add Frame (F)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
            </svg>
            <span>Frame</span>
          </button>
          <button
            onClick={() => onToolChange('connect')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTool === 'connect' ? 'bg-white shadow-sm text-teal-600' : 'text-gray-700 hover:bg-white hover:shadow-sm'
            }`}
            title="Connect (C)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span>Connect</span>
          </button>
        </div>

        <div className="w-px h-6 bg-gray-200 mx-2"></div>

        {/* Undo/Redo */}
        <button 
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-2 rounded-lg transition-all ${canUndo ? 'text-gray-500 hover:bg-gray-100' : 'text-gray-300'}`} 
          title="Undo (Ctrl+Z)"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        </button>
        <button 
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-2 rounded-lg transition-all ${canRedo ? 'text-gray-500 hover:bg-gray-100' : 'text-gray-300'}`} 
          title="Redo (Ctrl+Shift+Z)"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
          </svg>
        </button>

        {/* Selection Info */}
        {selectedCount > 0 && (
          <>
            <div className="w-px h-6 bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">{selectedCount} selected</span>
              <button
                onClick={onDeleteSelected}
                className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-all"
                title="Delete (Backspace)"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Center: View Mode */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('wip')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'wip' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            WIP
          </button>
          <button
            onClick={() => onViewModeChange('front-stage')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'front-stage' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Front Stage
          </button>
          <button
            onClick={() => onViewModeChange('all')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'all' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* Right: Zoom & Actions */}
      <div className="flex items-center gap-3">
        {/* Zoom Controls */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
          <button
            onClick={() => onZoomChange(Math.max(0.25, zoom - 0.1))}
            className="p-1 rounded hover:bg-gray-200 transition-all"
            title="Zoom Out (-)"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button 
            onClick={() => onZoomChange(1)}
            className="text-sm font-medium text-gray-700 w-12 text-center hover:bg-gray-200 rounded px-1"
            title="Reset Zoom (0)"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={() => onZoomChange(Math.min(2, zoom + 0.1))}
            className="p-1 rounded hover:bg-gray-200 transition-all"
            title="Zoom In (+)"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <div className="w-px h-6 bg-gray-200"></div>

        {/* Collaboration */}
        <div className="flex items-center -space-x-2">
          <div className="w-8 h-8 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">
            BJ
          </div>
          <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium">
            +2
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>
    </div>
  );
};

// ============================================
// 7.1 STICKY NOTE (REFINED)
// Added: Connection anchor points
// ============================================
const StickyNote = ({ 
  id, 
  content, 
  color = 'yellow', 
  position, 
  onUpdate, 
  onDelete, 
  isSelected,
  onSelect,
  onDragStart,
  activeTool,
  onConnectionStart,
  onConnectionEnd
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const colorScheme = stickyColors[color];
  const noteRef = useRef(null);

  const handleMouseDown = (e) => {
    if (isEditing) return;
    e.stopPropagation();
    
    if (activeTool === 'connect') {
      onConnectionStart(id, getCenterPoint());
    } else {
      onSelect(id, e.shiftKey);
      onDragStart(id, { x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = (e) => {
    if (activeTool === 'connect') {
      e.stopPropagation();
      onConnectionEnd(id, getCenterPoint());
    }
  };

  const getCenterPoint = () => ({
    x: position.x + 100,
    y: position.y + 75
  });

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onUpdate(id, { content: localContent });
  };

  return (
    <div
      ref={noteRef}
      className={`absolute cursor-move select-none transition-all duration-150 ${
        isSelected ? 'ring-2 ring-teal-500 ring-offset-2 shadow-xl scale-[1.02]' : 'shadow-md hover:shadow-lg'
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: 200,
        minHeight: 150,
        backgroundColor: colorScheme.bg,
        borderLeft: `4px solid ${colorScheme.border}`,
        borderRadius: '4px',
        zIndex: isSelected ? 100 : 1,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onDoubleClick={handleDoubleClick}
    >
      {/* Connection Anchors (visible when connect tool active) */}
      {activeTool === 'connect' && (
        <>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-teal-500 rounded-full border-2 border-white shadow cursor-crosshair" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-teal-500 rounded-full border-2 border-white shadow cursor-crosshair" />
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-teal-500 rounded-full border-2 border-white shadow cursor-crosshair" />
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-teal-500 rounded-full border-2 border-white shadow cursor-crosshair" />
        </>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: colorScheme.border }}>
        <div className="flex gap-1">
          {Object.keys(stickyColors).map((c) => (
            <button
              key={c}
              className={`w-4 h-4 rounded-full border-2 transition-transform hover:scale-110 ${
                c === color ? 'border-gray-600 scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: stickyColors[c].border }}
              onClick={(e) => {
                e.stopPropagation();
                onUpdate(id, { color: c });
              }}
            />
          ))}
        </div>
        <button
          className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-white hover:bg-opacity-50"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        {isEditing ? (
          <textarea
            autoFocus
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsEditing(false);
                setLocalContent(content);
              }
            }}
            className="w-full h-24 bg-transparent resize-none outline-none text-sm"
            style={{ color: colorScheme.text }}
            placeholder="Type your note..."
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <p className="text-sm whitespace-pre-wrap min-h-[60px]" style={{ color: colorScheme.text }}>
            {content || 'Double-click to edit...'}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-2 flex items-center justify-between text-xs" style={{ color: colorScheme.text, opacity: 0.6 }}>
        <span className="bg-white bg-opacity-50 px-1.5 py-0.5 rounded">WIP</span>
        <span>Just now</span>
      </div>
    </div>
  );
};

// ============================================
// 7.2 FRAME (REFINED)
// Added: Dragging support, connection anchors
// ============================================
const Frame = ({ 
  id, 
  title, 
  position, 
  size, 
  isCollapsed, 
  onUpdate, 
  onDelete,
  onSelect,
  isSelected,
  onDragStart,
  activeTool,
  onConnectionStart,
  onConnectionEnd
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState(null);

  const getCenterPoint = () => ({
    x: position.x + size.width / 2,
    y: position.y + (isCollapsed ? 30 : size.height / 2)
  });

  const handleMouseDown = (e) => {
    if (e.target.closest('.frame-header')) {
      e.stopPropagation();
      if (activeTool === 'connect') {
        onConnectionStart(id, getCenterPoint());
      } else {
        onSelect(id, e.shiftKey);
        onDragStart(id, { x: e.clientX, y: e.clientY });
      }
    }
  };

  const handleMouseUp = (e) => {
    if (activeTool === 'connect') {
      e.stopPropagation();
      onConnectionEnd(id, getCenterPoint());
    }
  };

  const handleResizeStart = (e) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY, width: size.width, height: size.height });
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e) => {
      const dx = e.clientX - resizeStart.x;
      const dy = e.clientY - resizeStart.y;
      onUpdate(id, { 
        size: { 
          width: Math.max(280, resizeStart.width + dx), 
          height: Math.max(200, resizeStart.height + dy) 
        } 
      });
    };

    const handleMouseUp = () => setIsResizing(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeStart, id, onUpdate]);

  return (
    <div
      className={`absolute bg-white rounded-xl border-2 transition-all ${
        isSelected ? 'border-teal-500 shadow-xl' : 'border-gray-200 shadow-sm hover:shadow-md'
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: isCollapsed ? 280 : size.width,
        height: isCollapsed ? 'auto' : size.height,
        minWidth: 280,
        minHeight: isCollapsed ? 'auto' : 200,
        zIndex: isSelected ? 50 : 0,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Connection Anchors */}
      {activeTool === 'connect' && (
        <>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow cursor-crosshair" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow cursor-crosshair" />
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow cursor-crosshair" />
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow cursor-crosshair" />
        </>
      )}

      {/* Header */}
      <div className="frame-header flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-xl cursor-move">
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdate(id, { isCollapsed: !isCollapsed });
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg 
              className={`w-5 h-5 transition-transform ${isCollapsed ? '' : 'rotate-90'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {isEditing ? (
            <input
              autoFocus
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              onBlur={() => {
                setIsEditing(false);
                onUpdate(id, { title: localTitle });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setIsEditing(false);
                  onUpdate(id, { title: localTitle });
                }
                if (e.key === 'Escape') {
                  setIsEditing(false);
                  setLocalTitle(title);
                }
              }}
              onClick={(e) => e.stopPropagation()}
              className="font-semibold text-gray-900 bg-white outline-none border border-teal-500 rounded px-2 py-0.5"
            />
          ) : (
            <h3 
              className="font-semibold text-gray-900 cursor-text hover:text-teal-600 transition-colors"
              onDoubleClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              {title}
            </h3>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
            {isCollapsed ? 'Collapsed' : `${size.width}×${size.height}`}
          </span>
          <button
            className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Area */}
      {!isCollapsed && (
        <div 
          className="relative" 
          style={{ 
            height: size.height - 60,
            background: `
              linear-gradient(90deg, transparent 19px, ${colors.gray[100]} 19px, ${colors.gray[100]} 20px, transparent 20px),
              linear-gradient(transparent 19px, ${colors.gray[100]} 19px, ${colors.gray[100]} 20px, transparent 20px)
            `,
            backgroundSize: '20px 20px',
          }}
        >
          <div className="absolute inset-4 flex items-center justify-center text-gray-300 text-sm pointer-events-none">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Drag items here to group
            </div>
          </div>
        </div>
      )}

      {/* Resize Handle */}
      {!isCollapsed && (
        <div
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize group"
          onMouseDown={handleResizeStart}
        >
          <svg className="w-4 h-4 absolute bottom-1 right-1 text-gray-300 group-hover:text-gray-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 22H20V20H22V22ZM22 18H20V16H22V18ZM18 22H16V20H18V22ZM22 14H20V12H22V14ZM18 18H16V16H18V18ZM14 22H12V20H14V22Z" />
          </svg>
        </div>
      )}
    </div>
  );
};

// ============================================
// 7.3 CONNECTION LINE (REFINED)
// Added: Type selector dropdown
// ============================================
const ConnectionLine = ({ 
  id,
  startPoint, 
  endPoint, 
  label,
  type = 'relates',
  onSelect,
  isSelected,
  onDelete,
  onUpdateType
}) => {
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const config = connectionTypes[type];
  
  // Calculate curved path
  const midX = (startPoint.x + endPoint.x) / 2;
  const midY = (startPoint.y + endPoint.y) / 2;
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const curvature = 0.2;
  const controlX = midX - dy * curvature;
  const controlY = midY + dx * curvature;

  const path = `M ${startPoint.x} ${startPoint.y} Q ${controlX} ${controlY} ${endPoint.x} ${endPoint.y}`;

  // Arrow calculation
  const angle = Math.atan2(endPoint.y - controlY, endPoint.x - controlX);
  const arrowLength = 12;
  const arrowAngle = Math.PI / 6;

  const arrow1 = {
    x: endPoint.x - arrowLength * Math.cos(angle - arrowAngle),
    y: endPoint.y - arrowLength * Math.sin(angle - arrowAngle),
  };
  const arrow2 = {
    x: endPoint.x - arrowLength * Math.cos(angle + arrowAngle),
    y: endPoint.y - arrowLength * Math.sin(angle + arrowAngle),
  };

  return (
    <g className="cursor-pointer">
      {/* Hit area */}
      <path d={path} fill="none" stroke="transparent" strokeWidth={20} 
        onClick={(e) => { e.stopPropagation(); onSelect(id); }} 
      />
      
      {/* Visible line */}
      <path
        d={path}
        fill="none"
        stroke={config.color}
        strokeWidth={isSelected ? 3 : 2}
        strokeDasharray={config.dash}
        className="transition-all"
      />
      
      {/* Arrow */}
      <polygon
        points={`${endPoint.x},${endPoint.y} ${arrow1.x},${arrow1.y} ${arrow2.x},${arrow2.y}`}
        fill={config.color}
      />

      {/* Label with type selector */}
      <g transform={`translate(${midX}, ${midY})`}>
        <rect
          x={-50}
          y={-14}
          width={100}
          height={28}
          fill="white"
          stroke={isSelected ? config.color : colors.gray[200]}
          strokeWidth={isSelected ? 2 : 1}
          rx={6}
          className="cursor-pointer"
          onClick={(e) => { e.stopPropagation(); setShowTypeMenu(!showTypeMenu); }}
        />
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          fill={config.color}
          fontSize={12}
          fontWeight={600}
          className="pointer-events-none"
        >
          {config.label}
        </text>
        
        {/* Dropdown indicator */}
        <path
          d="M 40 -2 L 44 2 L 48 -2"
          fill="none"
          stroke={colors.gray[400]}
          strokeWidth={1.5}
          className="pointer-events-none"
        />
      </g>

      {/* Type selector dropdown */}
      {showTypeMenu && (
        <foreignObject x={midX - 70} y={midY + 20} width={140} height={160}>
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-1 text-sm">
            {Object.entries(connectionTypes).map(([key, val]) => (
              <button
                key={key}
                className={`w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 ${
                  type === key ? 'bg-gray-50' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdateType(id, key);
                  setShowTypeMenu(false);
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: val.color }}
                />
                <span style={{ color: val.color }}>{val.label}</span>
                {type === key && (
                  <svg className="w-4 h-4 ml-auto text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
            <div className="border-t border-gray-100 mt-1 pt-1">
              <button
                className="w-full px-3 py-2 text-left text-red-500 hover:bg-red-50 flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id);
                  setShowTypeMenu(false);
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </foreignObject>
      )}

      {/* Selection handles */}
      {isSelected && (
        <>
          <circle cx={startPoint.x} cy={startPoint.y} r={6} fill="white" stroke={config.color} strokeWidth={2} />
          <circle cx={endPoint.x} cy={endPoint.y} r={6} fill="white" stroke={config.color} strokeWidth={2} />
        </>
      )}
    </g>
  );
};

// ============================================
// Connection Preview (while creating)
// ============================================
const ConnectionPreview = ({ startPoint, endPoint }) => {
  if (!startPoint || !endPoint) return null;
  
  return (
    <line
      x1={startPoint.x}
      y1={startPoint.y}
      x2={endPoint.x}
      y2={endPoint.y}
      stroke={colors.teal}
      strokeWidth={2}
      strokeDasharray="5,5"
      className="pointer-events-none"
    />
  );
};

// ============================================
// KEYBOARD SHORTCUTS HELP
// ============================================
const KeyboardShortcutsHelp = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'V', action: 'Select tool' },
    { key: 'S', action: 'Add sticky note' },
    { key: 'F', action: 'Add frame' },
    { key: 'C', action: 'Connect tool' },
    { key: 'Delete / Backspace', action: 'Delete selected' },
    { key: 'Escape', action: 'Deselect / Cancel' },
    { key: 'Ctrl + Z', action: 'Undo' },
    { key: 'Ctrl + Shift + Z', action: 'Redo' },
    { key: 'Ctrl + A', action: 'Select all' },
    { key: '+ / -', action: 'Zoom in/out' },
    { key: '0', action: 'Reset zoom' },
    { key: 'Shift + Drag', action: 'Multi-select box' },
    { key: 'Shift + Click', action: 'Add to selection' },
    { key: '?', action: 'Show shortcuts' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-96 max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Keyboard Shortcuts</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            {shortcuts.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50">
                <span className="text-sm text-gray-600">{s.action}</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono text-gray-700 border border-gray-200">
                  {s.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP (REFINED)
// ============================================
export default function Phase1FoundationRefined() {
  // Canvas state
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 400, y: 200 });
  const [viewMode, setViewMode] = useState('all');
  const [activeTool, setActiveTool] = useState('select');
  
  // Navigation state
  const [activePhase, setActivePhase] = useState('phase-zero');
  const [navCollapsed, setNavCollapsed] = useState(false);
  
  // Selection state (now supports multiple)
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [selectionBox, setSelectionBox] = useState(null);
  
  // Objects state
  const [stickyNotes, setStickyNotes] = useState([
    { id: 'sticky-1', content: 'Investment up 150%, growth only 8% — why?', color: 'yellow', position: { x: 50, y: 50 } },
    { id: 'sticky-2', content: 'CFO questioning every marketing dollar', color: 'pink', position: { x: 280, y: 80 } },
    { id: 'sticky-3', content: 'Hypothesis: Category demand driving results, not brand', color: 'blue', position: { x: 120, y: 220 } },
  ]);
  
  const [frames, setFrames] = useState([
    { id: 'frame-1', title: 'Key Findings', position: { x: 500, y: 30 }, size: { width: 400, height: 300 }, isCollapsed: false },
  ]);

  const [connections, setConnections] = useState([
    { id: 'conn-1', startId: 'sticky-1', endId: 'sticky-3', startPoint: { x: 150, y: 125 }, endPoint: { x: 220, y: 220 }, type: 'supports' },
  ]);

  // Connection creation state
  const [connectionStart, setConnectionStart] = useState(null);
  const [connectionPreview, setConnectionPreview] = useState(null);

  // Dragging state
  const [dragState, setDragState] = useState(null);
  
  // Undo/Redo state (simplified)
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // UI state
  const [showShortcuts, setShowShortcuts] = useState(false);

  // ============================================
  // Selection helpers
  // ============================================
  const handleSelect = (id, addToSelection = false) => {
    if (addToSelection) {
      setSelectedIds(prev => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    } else {
      setSelectedIds(new Set([id]));
    }
  };

  const handleCanvasClick = () => {
    setSelectedIds(new Set());
    setConnectionStart(null);
    setConnectionPreview(null);
  };

  const handleSelectionBox = (box) => {
    setSelectionBox(box);
    
    if (box) {
      // Find objects within box
      const minX = Math.min(box.start.x, box.end.x);
      const maxX = Math.max(box.start.x, box.end.x);
      const minY = Math.min(box.start.y, box.end.y);
      const maxY = Math.max(box.start.y, box.end.y);

      const selected = new Set();
      
      stickyNotes.forEach(note => {
        if (note.position.x >= minX && note.position.x + 200 <= maxX &&
            note.position.y >= minY && note.position.y + 150 <= maxY) {
          selected.add(note.id);
        }
      });

      frames.forEach(frame => {
        if (frame.position.x >= minX && frame.position.x + frame.size.width <= maxX &&
            frame.position.y >= minY && frame.position.y + frame.size.height <= maxY) {
          selected.add(frame.id);
        }
      });

      setSelectedIds(selected);
    }
  };

  // ============================================
  // Object CRUD
  // ============================================
  const handleAddSticky = () => {
    const newSticky = {
      id: `sticky-${Date.now()}`,
      content: '',
      color: 'yellow',
      position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 },
    };
    setStickyNotes(prev => [...prev, newSticky]);
    setSelectedIds(new Set([newSticky.id]));
    setActiveTool('select');
  };

  const handleAddFrame = () => {
    const newFrame = {
      id: `frame-${Date.now()}`,
      title: 'New Frame',
      position: { x: 150 + Math.random() * 100, y: 150 + Math.random() * 100 },
      size: { width: 400, height: 300 },
      isCollapsed: false,
    };
    setFrames(prev => [...prev, newFrame]);
    setSelectedIds(new Set([newFrame.id]));
    setActiveTool('select');
  };

  const handleUpdateSticky = (id, updates) => {
    setStickyNotes(notes => notes.map(n => n.id === id ? { ...n, ...updates } : n));
  };

  const handleDeleteSticky = (id) => {
    setStickyNotes(notes => notes.filter(n => n.id !== id));
    setConnections(conns => conns.filter(c => c.startId !== id && c.endId !== id));
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleUpdateFrame = (id, updates) => {
    setFrames(f => f.map(frame => frame.id === id ? { ...frame, ...updates } : frame));
  };

  const handleDeleteFrame = (id) => {
    setFrames(f => f.filter(frame => frame.id !== id));
    setConnections(conns => conns.filter(c => c.startId !== id && c.endId !== id));
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleDeleteSelected = () => {
    selectedIds.forEach(id => {
      if (id.startsWith('sticky-')) handleDeleteSticky(id);
      else if (id.startsWith('frame-')) handleDeleteFrame(id);
      else if (id.startsWith('conn-')) {
        setConnections(conns => conns.filter(c => c.id !== id));
      }
    });
    setSelectedIds(new Set());
  };

  // ============================================
  // Connection creation
  // ============================================
  const handleConnectionStart = (id, point) => {
    setConnectionStart({ id, point });
  };

  const handleConnectionEnd = (id, point) => {
    if (connectionStart && connectionStart.id !== id) {
      const newConnection = {
        id: `conn-${Date.now()}`,
        startId: connectionStart.id,
        endId: id,
        startPoint: connectionStart.point,
        endPoint: point,
        type: 'relates',
      };
      setConnections(prev => [...prev, newConnection]);
    }
    setConnectionStart(null);
    setConnectionPreview(null);
    setActiveTool('select');
  };

  const handleUpdateConnectionType = (id, type) => {
    setConnections(conns => conns.map(c => c.id === id ? { ...c, type } : c));
  };

  // ============================================
  // Dragging
  // ============================================
  const handleDragStart = (id, startPos) => {
    setDragState({ ids: selectedIds.has(id) ? Array.from(selectedIds) : [id], startPos });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Connection preview
      if (connectionStart && activeTool === 'connect') {
        setConnectionPreview({
          x: (e.clientX - position.x) / zoom,
          y: (e.clientY - position.y) / zoom,
        });
      }
      
      // Dragging objects
      if (dragState) {
        const dx = (e.clientX - dragState.startPos.x) / zoom;
        const dy = (e.clientY - dragState.startPos.y) / zoom;
        
        setStickyNotes(notes => notes.map(n => {
          if (dragState.ids.includes(n.id)) {
            return { ...n, position: { x: n.position.x + dx, y: n.position.y + dy } };
          }
          return n;
        }));
        
        setFrames(frames => frames.map(f => {
          if (dragState.ids.includes(f.id)) {
            return { ...f, position: { x: f.position.x + dx, y: f.position.y + dy } };
          }
          return f;
        }));

        // Update connection points for dragged objects
        setConnections(conns => conns.map(c => {
          let updated = { ...c };
          dragState.ids.forEach(id => {
            if (c.startId === id) {
              updated.startPoint = { x: c.startPoint.x + dx, y: c.startPoint.y + dy };
            }
            if (c.endId === id) {
              updated.endPoint = { x: c.endPoint.x + dx, y: c.endPoint.y + dy };
            }
          });
          return updated;
        }));
        
        setDragState({ ...dragState, startPos: { x: e.clientX, y: e.clientY } });
      }
    };

    const handleMouseUp = () => {
      setDragState(null);
      setSelectionBox(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState, zoom, connectionStart, activeTool, position]);

  // ============================================
  // Keyboard shortcuts
  // ============================================
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if typing in input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key.toLowerCase()) {
        case 'v':
          setActiveTool('select');
          break;
        case 's':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            handleAddSticky();
          }
          break;
        case 'f':
          e.preventDefault();
          handleAddFrame();
          break;
        case 'c':
          if (!e.ctrlKey && !e.metaKey) {
            setActiveTool('connect');
          }
          break;
        case 'delete':
        case 'backspace':
          if (selectedIds.size > 0) {
            e.preventDefault();
            handleDeleteSelected();
          }
          break;
        case 'escape':
          setSelectedIds(new Set());
          setConnectionStart(null);
          setConnectionPreview(null);
          setActiveTool('select');
          break;
        case 'a':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const allIds = new Set([
              ...stickyNotes.map(n => n.id),
              ...frames.map(f => f.id),
            ]);
            setSelectedIds(allIds);
          }
          break;
        case '=':
        case '+':
          e.preventDefault();
          setZoom(z => Math.min(2, z + 0.1));
          break;
        case '-':
          e.preventDefault();
          setZoom(z => Math.max(0.25, z - 0.1));
          break;
        case '0':
          e.preventDefault();
          setZoom(1);
          break;
        case '?':
          setShowShortcuts(true);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIds, stickyNotes, frames]);

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Navigation Rail */}
      <NavigationRail
        activePhase={activePhase}
        onPhaseChange={setActivePhase}
        isCollapsed={navCollapsed}
        onToggleCollapse={() => setNavCollapsed(!navCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <Toolbar
          zoom={zoom}
          onZoomChange={setZoom}
          onAddSticky={handleAddSticky}
          onAddFrame={handleAddFrame}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          activeTool={activeTool}
          onToolChange={setActiveTool}
          selectedCount={selectedIds.size}
          onDeleteSelected={handleDeleteSelected}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          onUndo={() => {}}
          onRedo={() => {}}
        />

        {/* Canvas */}
        <div className="flex-1 relative">
          <CanvasContainer
            zoom={zoom}
            position={position}
            onPan={setPosition}
            onZoom={setZoom}
            onSelectionBox={handleSelectionBox}
            selectionBox={selectionBox}
            onCanvasClick={handleCanvasClick}
          >
            {/* SVG layer for connections */}
            <svg 
              className="absolute inset-0 pointer-events-none" 
              style={{ width: '5000px', height: '5000px', overflow: 'visible' }}
            >
              <g className="pointer-events-auto">
                {connections.map(conn => (
                  <ConnectionLine
                    key={conn.id}
                    {...conn}
                    isSelected={selectedIds.has(conn.id)}
                    onSelect={handleSelect}
                    onDelete={(id) => setConnections(c => c.filter(conn => conn.id !== id))}
                    onUpdateType={handleUpdateConnectionType}
                  />
                ))}
                
                {/* Connection preview */}
                {connectionStart && connectionPreview && (
                  <ConnectionPreview
                    startPoint={connectionStart.point}
                    endPoint={connectionPreview}
                  />
                )}
              </g>
            </svg>

            {/* Frames */}
            {frames.map(frame => (
              <Frame
                key={frame.id}
                {...frame}
                isSelected={selectedIds.has(frame.id)}
                onSelect={handleSelect}
                onUpdate={handleUpdateFrame}
                onDelete={handleDeleteFrame}
                onDragStart={handleDragStart}
                activeTool={activeTool}
                onConnectionStart={handleConnectionStart}
                onConnectionEnd={handleConnectionEnd}
              />
            ))}

            {/* Sticky Notes */}
            {stickyNotes.map(note => (
              <StickyNote
                key={note.id}
                {...note}
                isSelected={selectedIds.has(note.id)}
                onSelect={handleSelect}
                onUpdate={handleUpdateSticky}
                onDelete={handleDeleteSticky}
                onDragStart={handleDragStart}
                activeTool={activeTool}
                onConnectionStart={handleConnectionStart}
                onConnectionEnd={handleConnectionEnd}
              />
            ))}
          </CanvasContainer>

          {/* Minimap */}
          <div className="absolute bottom-4 right-4 w-48 h-32 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-2 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Overview</span>
              <span className="text-xs text-gray-400">{Math.round(zoom * 100)}%</span>
            </div>
            <div className="relative h-24 bg-gray-50">
              {/* Simplified minimap representation */}
              {stickyNotes.map(note => (
                <div
                  key={note.id}
                  className="absolute w-2 h-2 rounded-sm"
                  style={{
                    left: `${(note.position.x / 1000) * 100}%`,
                    top: `${(note.position.y / 600) * 100}%`,
                    backgroundColor: stickyColors[note.color].border,
                  }}
                />
              ))}
              {frames.map(frame => (
                <div
                  key={frame.id}
                  className="absolute border border-gray-300 rounded-sm"
                  style={{
                    left: `${(frame.position.x / 1000) * 100}%`,
                    top: `${(frame.position.y / 600) * 100}%`,
                    width: `${(frame.size.width / 1000) * 100}%`,
                    height: `${(frame.size.height / 600) * 100}%`,
                  }}
                />
              ))}
              {/* Viewport indicator */}
              <div
                className="absolute border-2 border-teal-500 rounded bg-teal-500 bg-opacity-10"
                style={{
                  left: `${Math.max(0, (-position.x / zoom / 1000) * 100)}%`,
                  top: `${Math.max(0, (-position.y / zoom / 600) * 100)}%`,
                  width: `${(100 / zoom) * 0.8}%`,
                  height: `${(100 / zoom) * 0.8}%`,
                }}
              />
            </div>
          </div>

          {/* Status bar */}
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200 text-sm text-gray-600 flex items-center gap-2">
              <span>{Math.round(zoom * 100)}%</span>
              <span className="text-gray-300">|</span>
              <span className="capitalize">{activePhase.replace('-', ' ')}</span>
              <span className="text-gray-300">|</span>
              <span className="capitalize">{activeTool}</span>
            </div>
            <button
              onClick={() => setShowShortcuts(true)}
              className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              ? Shortcuts
            </button>
          </div>

          {/* Connection mode indicator */}
          {activeTool === 'connect' && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="font-medium">Click objects to connect them</span>
              <span className="text-teal-200">• Press Esc to cancel</span>
            </div>
          )}
        </div>
      </div>

      {/* Keyboard shortcuts modal */}
      <KeyboardShortcutsHelp isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
    </div>
  );
}
