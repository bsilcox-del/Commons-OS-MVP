import React, { useState } from 'react';

// Component Inventory for Commons OS Problem Pursuit Canvas
// This serves as both a tracking system and component preview

const componentInventory = {
  "1. Canvas Shell": {
    description: "The foundational container and layout system",
    components: [
      { id: "1.1", name: "Main Canvas Container", status: "pending", priority: "critical", description: "Infinite canvas with pan/zoom, contains all zones" },
      { id: "1.2", name: "Navigation Rail", status: "pending", priority: "critical", description: "Left sidebar with phase navigation (Phase Zero → Outcome Gap → Strategic Reality → Problem Definition)" },
      { id: "1.3", name: "Minimap", status: "pending", priority: "medium", description: "Corner overview showing full canvas, click to navigate" },
      { id: "1.4", name: "Toolbar", status: "pending", priority: "critical", description: "Top bar with actions, view controls, collaboration status" },
      { id: "1.5", name: "Zone Boundaries", status: "pending", priority: "high", description: "Visual delineation of WIP vs Front Stage areas" },
    ]
  },
  "2. Phase Zero": {
    description: "Establishing strategic context before deep analysis",
    components: [
      { id: "2.1", name: "Business Ambitions Panel", status: "pending", priority: "high", description: "Structured input for 12mo/12-24mo/24+mo objectives" },
      { id: "2.2", name: "Marketing Alignment Assessment", status: "pending", priority: "high", description: "Diagnostic interface for marketing measurement, objectives, investment" },
      { id: "2.3", name: "Engagement Fit Indicator", status: "pending", priority: "medium", description: "Visual gauge showing board-level influence potential" },
    ]
  },
  "3. Fact Pack / Source Library": {
    description: "Data foundation and source management",
    components: [
      { id: "3.1", name: "Source Library Panel", status: "pending", priority: "critical", description: "Collapsible panel for managing all data sources" },
      { id: "3.2", name: "Source Upload Zone", status: "pending", priority: "high", description: "Drag-drop area with category assignment" },
      { id: "3.3", name: "Source Card", status: "pending", priority: "high", description: "Individual source display with metadata, quality score, excerpts" },
      { id: "3.4", name: "Quality Score Badge", status: "pending", priority: "medium", description: "Visual indicator for Relevance/Recency/Substance" },
      { id: "3.5", name: "Data Category Boards", status: "pending", priority: "medium", description: "5 category views: Market, Customer, Performance, Product, Org" },
      { id: "3.6", name: "Data Gap Indicator", status: "pending", priority: "medium", description: "Visual heatmap showing missing data areas" },
    ]
  },
  "4. Lines of Inquiry": {
    description: "Hypothesis-driven analysis system",
    components: [
      { id: "4.1", name: "Hypothesis Board", status: "pending", priority: "critical", description: "Container for all hypothesis cards with filtering/sorting" },
      { id: "4.2", name: "Hypothesis Card", status: "pending", priority: "critical", description: "Structured hypothesis with evidence for/against, status, confidence" },
      { id: "4.3", name: "Evidence Card", status: "pending", priority: "high", description: "Finding capture with source citation, confidence, links" },
      { id: "4.4", name: "Evidence Connection Map", status: "pending", priority: "medium", description: "Visual graph showing evidence-hypothesis relationships" },
      { id: "4.5", name: "Confidence Meter", status: "pending", priority: "medium", description: "Visual indicator of hypothesis confidence level" },
    ]
  },
  "5. Strategic Outcomes Workspaces": {
    description: "Dedicated areas for each Problem Pursuit outcome",
    components: [
      { id: "5.1", name: "Workspace Container", status: "pending", priority: "high", description: "Flexible container with WIP and Front Stage zones" },
      { id: "5.2", name: "Outcome Gap Workspace", status: "pending", priority: "high", description: "Gap sizing, cost of inaction, C-suite translation" },
      { id: "5.3", name: "Strategic Reality Workspace", status: "pending", priority: "high", description: "Cause-effect mapping, structural analysis, constraints" },
      { id: "5.4", name: "Problem Definition Workspace", status: "pending", priority: "high", description: "Problem framing, impact sizing, narrative building" },
      { id: "5.5", name: "Workspace Header", status: "pending", priority: "medium", description: "Title, status, progress, actions for each workspace" },
    ]
  },
  "6. Agent Ensemble": {
    description: "AI collaboration interface with transparency",
    components: [
      { id: "6.1", name: "Agent Panel", status: "pending", priority: "critical", description: "Sidebar showing available agents and active tasks" },
      { id: "6.2", name: "Glass Box Window", status: "pending", priority: "critical", description: "Transparent view of agent thinking, actions, sources, confidence" },
      { id: "6.3", name: "Agent Task Card", status: "pending", priority: "high", description: "Individual task display with progress, controls" },
      { id: "6.4", name: "Proactive Suggestions Panel", status: "pending", priority: "high", description: "Non-intrusive panel for agent-initiated suggestions" },
      { id: "6.5", name: "Agent Mention Interface", status: "pending", priority: "medium", description: "@ mention dropdown for invoking agents inline" },
      { id: "6.6", name: "Agent Result Card", status: "pending", priority: "high", description: "Display of agent outputs ready for canvas placement" },
    ]
  },
  "7. WIP Components": {
    description: "Building blocks for exploratory work",
    components: [
      { id: "7.1", name: "Sticky Note", status: "pending", priority: "critical", description: "Quick capture with color coding, clustering" },
      { id: "7.2", name: "Frame", status: "pending", priority: "critical", description: "Grouping container, collapsible, nestable" },
      { id: "7.3", name: "Connection Line", status: "pending", priority: "high", description: "Labeled relationship links between objects" },
      { id: "7.4", name: "Data Table", status: "pending", priority: "medium", description: "Editable table with source linking" },
      { id: "7.5", name: "Sketch Chart", status: "pending", priority: "medium", description: "Hand-drawn style quick visualization" },
      { id: "7.6", name: "Text Block", status: "pending", priority: "high", description: "Rich text for notes and drafts" },
    ]
  },
  "8. Front Stage Components": {
    description: "Polished presentation-ready outputs",
    components: [
      { id: "8.1", name: "Executive Summary", status: "pending", priority: "high", description: "One-page template with findings, implications, actions" },
      { id: "8.2", name: "Insight Card", status: "pending", priority: "high", description: "Polished finding with data, visual, citation" },
      { id: "8.3", name: "Strategic Chart", status: "pending", priority: "medium", description: "Publication-quality visualizations" },
      { id: "8.4", name: "Scenario Panel", status: "pending", priority: "medium", description: "Side-by-side scenario comparison" },
      { id: "8.5", name: "Decision Matrix", status: "pending", priority: "medium", description: "Options with criteria and recommendation" },
      { id: "8.6", name: "Narrative Block", status: "pending", priority: "high", description: "Formatted text with embedded citations" },
    ]
  },
  "9. Workflow & Promotion": {
    description: "Moving work from WIP to Front Stage",
    components: [
      { id: "9.1", name: "Stage Indicator Badge", status: "pending", priority: "high", description: "Shows WIP/Review/Front Stage status on objects" },
      { id: "9.2", name: "Promotion Action Menu", status: "pending", priority: "high", description: "Promote/Demote/Archive actions" },
      { id: "9.3", name: "QA Checklist", status: "pending", priority: "medium", description: "Validation checklist before Front Stage promotion" },
      { id: "9.4", name: "Review Stage View", status: "pending", priority: "medium", description: "Intermediate view for pre-client validation" },
    ]
  },
  "10. Pattern Templates": {
    description: "Structured workflow support",
    components: [
      { id: "10.1", name: "Pattern Template Container", status: "pending", priority: "medium", description: "Input → Transform → Output structure" },
      { id: "10.2", name: "Input Drop Zone", status: "pending", priority: "medium", description: "Designated area for pattern inputs" },
      { id: "10.3", name: "Pattern Progress Bar", status: "pending", priority: "low", description: "Time and completion tracking" },
    ]
  },
  "11. Citation & Traceability": {
    description: "Source attribution throughout",
    components: [
      { id: "11.1", name: "Citation Badge", status: "pending", priority: "high", description: "Inline source reference with type coloring" },
      { id: "11.2", name: "Citation Tooltip", status: "pending", priority: "medium", description: "Hover detail showing source metadata" },
      { id: "11.3", name: "Citation Trail View", status: "pending", priority: "medium", description: "Full provenance chain for any claim" },
    ]
  },
  "12. Client Collaboration": {
    description: "Client-facing features",
    components: [
      { id: "12.1", name: "Client View Toggle", status: "pending", priority: "medium", description: "Switch to client-safe view" },
      { id: "12.2", name: "Comment Thread", status: "pending", priority: "medium", description: "Collaborative discussion on content" },
      { id: "12.3", name: "Presentation Mode", status: "pending", priority: "low", description: "Guided walkthrough interface" },
      { id: "12.4", name: "Export Menu", status: "pending", priority: "medium", description: "PowerPoint/PDF/Data export options" },
    ]
  }
};

// Status colors
const statusColors = {
  pending: { bg: '#F3F4F6', text: '#6B7280', border: '#E5E7EB' },
  in_progress: { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' },
  review: { bg: '#DBEAFE', text: '#1E40AF', border: '#93C5FD' },
  complete: { bg: '#D1FAE5', text: '#065F46', border: '#6EE7B7' },
};

const priorityColors = {
  critical: '#EF4444',
  high: '#F59E0B',
  medium: '#3B82F6',
  low: '#6B7280',
};

export default function ComponentInventory() {
  const [inventory, setInventory] = useState(componentInventory);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [view, setView] = useState('inventory'); // 'inventory' or 'sequence'

  const updateStatus = (categoryName, componentId, newStatus) => {
    setInventory(prev => ({
      ...prev,
      [categoryName]: {
        ...prev[categoryName],
        components: prev[categoryName].components.map(c =>
          c.id === componentId ? { ...c, status: newStatus } : c
        )
      }
    }));
  };

  const getStats = () => {
    let total = 0, pending = 0, inProgress = 0, review = 0, complete = 0;
    let critical = 0, criticalDone = 0;
    
    Object.values(inventory).forEach(category => {
      category.components.forEach(c => {
        total++;
        if (c.status === 'pending') pending++;
        if (c.status === 'in_progress') inProgress++;
        if (c.status === 'review') review++;
        if (c.status === 'complete') complete++;
        if (c.priority === 'critical') {
          critical++;
          if (c.status === 'complete') criticalDone++;
        }
      });
    });
    
    return { total, pending, inProgress, review, complete, critical, criticalDone };
  };

  const stats = getStats();

  // Suggested build sequence based on dependencies
  const buildSequence = [
    { phase: "Foundation", weeks: "1-2", components: ["1.1", "1.2", "1.4", "7.1", "7.2", "7.3"] },
    { phase: "Source Management", weeks: "2-3", components: ["3.1", "3.2", "3.3", "3.4", "11.1", "11.2"] },
    { phase: "Agent Core", weeks: "3-4", components: ["6.1", "6.2", "6.3", "6.4"] },
    { phase: "Hypothesis System", weeks: "4-5", components: ["4.1", "4.2", "4.3", "4.5"] },
    { phase: "Phase Zero", weeks: "5-6", components: ["2.1", "2.2", "2.3"] },
    { phase: "Workspaces", weeks: "6-8", components: ["5.1", "5.2", "5.3", "5.4", "5.5"] },
    { phase: "WIP Completion", weeks: "8-9", components: ["7.4", "7.5", "7.6", "4.4"] },
    { phase: "Front Stage", weeks: "9-11", components: ["8.1", "8.2", "8.3", "8.4", "8.5", "8.6"] },
    { phase: "Workflow", weeks: "11-12", components: ["9.1", "9.2", "9.3", "9.4"] },
    { phase: "Patterns & Polish", weeks: "12-14", components: ["10.1", "10.2", "10.3", "1.3", "1.5"] },
    { phase: "Client Features", weeks: "14-16", components: ["12.1", "12.2", "12.3", "12.4", "6.5", "6.6", "11.3"] },
  ];

  const findComponent = (id) => {
    for (const [catName, cat] of Object.entries(inventory)) {
      const comp = cat.components.find(c => c.id === id);
      if (comp) return { ...comp, category: catName };
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Commons OS Component Inventory</h1>
              <p className="text-sm text-gray-500">Problem Pursuit Canvas - Prototyping Tracker</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView('inventory')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  view === 'inventory' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Inventory View
              </button>
              <button
                onClick={() => setView('sequence')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  view === 'sequence' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Build Sequence
              </button>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="flex gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Total:</span>
              <span className="font-semibold">{stats.total}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-gray-500">Pending:</span>
              <span className="font-semibold">{stats.pending}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span className="text-gray-500">In Progress:</span>
              <span className="font-semibold">{stats.inProgress}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-gray-500">Review:</span>
              <span className="font-semibold">{stats.review}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-gray-500">Complete:</span>
              <span className="font-semibold">{stats.complete}</span>
            </div>
            <div className="flex items-center gap-2 ml-4 pl-4 border-l">
              <span className="text-red-600 font-medium">Critical:</span>
              <span className="font-semibold">{stats.criticalDone}/{stats.critical}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {view === 'inventory' ? (
          <>
            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="complete">Complete</option>
              </select>
              <select 
                value={filterPriority} 
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              {Object.entries(inventory).map(([categoryName, category]) => {
                const filteredComponents = category.components.filter(c => {
                  if (filterStatus !== 'all' && c.status !== filterStatus) return false;
                  if (filterPriority !== 'all' && c.priority !== filterPriority) return false;
                  return true;
                });
                
                if (filteredComponents.length === 0) return null;
                
                return (
                  <div key={categoryName} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <h2 className="font-semibold text-gray-900">{categoryName}</h2>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {filteredComponents.map(component => (
                        <div 
                          key={component.id} 
                          className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => setSelectedComponent(component)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <span className="text-sm font-mono text-gray-400 w-8">{component.id}</span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">{component.name}</span>
                                  <span 
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: priorityColors[component.priority] }}
                                    title={component.priority}
                                  ></span>
                                </div>
                                <p className="text-sm text-gray-500 mt-0.5">{component.description}</p>
                              </div>
                            </div>
                            <select
                              value={component.status}
                              onChange={(e) => {
                                e.stopPropagation();
                                updateStatus(categoryName, component.id, e.target.value);
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="px-3 py-1.5 text-sm rounded-lg border"
                              style={{
                                backgroundColor: statusColors[component.status].bg,
                                color: statusColors[component.status].text,
                                borderColor: statusColors[component.status].border,
                              }}
                            >
                              <option value="pending">Pending</option>
                              <option value="in_progress">In Progress</option>
                              <option value="review">Review</option>
                              <option value="complete">Complete</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Build Sequence View */
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Recommended Build Sequence</h2>
              <p className="text-sm text-gray-500 mb-6">
                Components ordered by dependencies. Earlier phases provide foundation for later ones.
              </p>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-8">
                  {buildSequence.map((phase, idx) => (
                    <div key={phase.phase} className="relative pl-12">
                      {/* Timeline dot */}
                      <div className={`absolute left-2 w-5 h-5 rounded-full border-2 border-white shadow ${
                        phase.components.every(id => findComponent(id)?.status === 'complete')
                          ? 'bg-green-500'
                          : phase.components.some(id => ['in_progress', 'review'].includes(findComponent(id)?.status))
                            ? 'bg-yellow-500'
                            : 'bg-gray-300'
                      }`}></div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-gray-900">{phase.phase}</h3>
                          <span className="text-sm text-gray-500">Weeks {phase.weeks}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {phase.components.map(id => {
                            const comp = findComponent(id);
                            if (!comp) return null;
                            return (
                              <div
                                key={id}
                                className="px-3 py-1.5 rounded-lg text-sm border cursor-pointer hover:shadow-sm transition-shadow"
                                style={{
                                  backgroundColor: statusColors[comp.status].bg,
                                  color: statusColors[comp.status].text,
                                  borderColor: statusColors[comp.status].border,
                                }}
                                onClick={() => setSelectedComponent(comp)}
                                title={comp.description}
                              >
                                <span className="font-mono text-xs opacity-60 mr-1">{id}</span>
                                {comp.name}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Component Detail Modal */}
      {selectedComponent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-mono text-gray-400">{selectedComponent.id}</span>
                  <h2 className="text-xl font-bold text-gray-900">{selectedComponent.name}</h2>
                </div>
                <button 
                  onClick={() => setSelectedComponent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                <p className="text-gray-900">{selectedComponent.description}</p>
              </div>
              <div className="flex gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Priority</h3>
                  <span 
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: `${priorityColors[selectedComponent.priority]}20`,
                      color: priorityColors[selectedComponent.priority]
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: priorityColors[selectedComponent.priority] }}></span>
                    {selectedComponent.priority.charAt(0).toUpperCase() + selectedComponent.priority.slice(1)}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                  <span 
                    className="inline-block px-2.5 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: statusColors[selectedComponent.status].bg,
                      color: statusColors[selectedComponent.status].text,
                    }}
                  >
                    {selectedComponent.status.replace('_', ' ').charAt(0).toUpperCase() + 
                     selectedComponent.status.replace('_', ' ').slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Prototype Actions</h3>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors">
                    Start Prototyping
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                    View Spec Details
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                    Add Notes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
