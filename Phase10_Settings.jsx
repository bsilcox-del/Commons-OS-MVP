import React, { useState } from 'react';

// ============================================
// PHASE 10: SETTINGS & PREFERENCES
// Commons OS Problem Pursuit Canvas
// Configuration, Preferences, Shortcuts
// ============================================

// Settings sections
const settingsSections = [
  { id: 'general', label: 'General', icon: '⚙️' },
  { id: 'canvas', label: 'Canvas', icon: '🎨' },
  { id: 'agent', label: 'Agent', icon: '🤖' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'shortcuts', label: 'Shortcuts', icon: '⌨️' },
  { id: 'export', label: 'Export', icon: '📤' },
  { id: 'advanced', label: 'Advanced', icon: '🔧' },
];

// Keyboard shortcuts
const keyboardShortcuts = [
  { category: 'Navigation', shortcuts: [
    { keys: ['⌘', 'K'], action: 'Open command palette' },
    { keys: ['⌘', '/'], action: 'Toggle agent panel' },
    { keys: ['⌘', '1'], action: 'Go to Outcome Gap' },
    { keys: ['⌘', '2'], action: 'Go to Strategic Reality' },
    { keys: ['⌘', '3'], action: 'Go to Problem Definition' },
    { keys: ['⌘', 'B'], action: 'Toggle sidebar' },
  ]},
  { category: 'Canvas', shortcuts: [
    { keys: ['Space'], action: 'Pan canvas (hold)' },
    { keys: ['⌘', '+'], action: 'Zoom in' },
    { keys: ['⌘', '-'], action: 'Zoom out' },
    { keys: ['⌘', '0'], action: 'Reset zoom' },
    { keys: ['F'], action: 'Fit to screen' },
    { keys: ['G'], action: 'Toggle grid' },
  ]},
  { category: 'Elements', shortcuts: [
    { keys: ['N'], action: 'New sticky note' },
    { keys: ['H'], action: 'New hypothesis' },
    { keys: ['E'], action: 'New evidence card' },
    { keys: ['F'], action: 'New frame' },
    { keys: ['⌘', 'D'], action: 'Duplicate selection' },
    { keys: ['Delete'], action: 'Delete selection' },
  ]},
  { category: 'Editing', shortcuts: [
    { keys: ['⌘', 'Z'], action: 'Undo' },
    { keys: ['⌘', '⇧', 'Z'], action: 'Redo' },
    { keys: ['⌘', 'C'], action: 'Copy' },
    { keys: ['⌘', 'V'], action: 'Paste' },
    { keys: ['⌘', 'A'], action: 'Select all' },
    { keys: ['Esc'], action: 'Deselect / Cancel' },
  ]},
  { category: 'Agent', shortcuts: [
    { keys: ['@'], action: 'Mention agent' },
    { keys: ['⌘', 'Enter'], action: 'Send to agent' },
    { keys: ['⌘', '.'], action: 'Accept suggestion' },
    { keys: ['⌘', ','], action: 'Dismiss suggestion' },
  ]},
];

// ============================================
// TOGGLE SWITCH
// ============================================
const ToggleSwitch = ({ enabled, onChange, size = 'default' }) => {
  const sizes = {
    small: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
    default: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
  };
  const s = sizes[size];

  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex ${s.track} items-center rounded-full transition-colors ${
        enabled ? 'bg-teal-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block ${s.thumb} transform rounded-full bg-white shadow transition-transform ${
          enabled ? s.translate : 'translate-x-0.5'
        }`}
      />
    </button>
  );
};

// ============================================
// SETTING ROW
// ============================================
const SettingRow = ({ label, description, children }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
    <div className="flex-1 pr-4">
      <p className="text-sm font-medium text-gray-900">{label}</p>
      {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
    </div>
    <div className="flex-shrink-0">{children}</div>
  </div>
);

// ============================================
// SETTING SECTION
// ============================================
const SettingSection = ({ title, description, children }) => (
  <div className="mb-8">
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
    <div className="bg-white rounded-xl border border-gray-200 px-4">{children}</div>
  </div>
);

// ============================================
// 11.1 GENERAL SETTINGS
// ============================================
const GeneralSettings = ({ settings, onChange }) => (
  <div>
    <SettingSection title="Appearance" description="Customize how Commons OS looks">
      <SettingRow label="Theme" description="Choose your preferred color scheme">
        <select value={settings.theme} onChange={(e) => onChange('theme', e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </SettingRow>
      <SettingRow label="Accent color" description="Primary color for highlights">
        <div className="flex gap-2">
          {['#1A9B9B', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'].map(color => (
            <button key={color} onClick={() => onChange('accentColor', color)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${settings.accentColor === color ? 'border-gray-900 scale-110' : 'border-transparent'}`}
              style={{ backgroundColor: color }} />
          ))}
        </div>
      </SettingRow>
      <SettingRow label="Compact mode" description="Reduce spacing for more content">
        <ToggleSwitch enabled={settings.compactMode} onChange={(v) => onChange('compactMode', v)} />
      </SettingRow>
    </SettingSection>

    <SettingSection title="Language & Region">
      <SettingRow label="Language">
        <select value={settings.language} onChange={(e) => onChange('language', e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option value="en-GB">English (UK)</option>
          <option value="en-US">English (US)</option>
          <option value="de">Deutsch</option>
          <option value="fr">Français</option>
        </select>
      </SettingRow>
      <SettingRow label="Date format">
        <select value={settings.dateFormat} onChange={(e) => onChange('dateFormat', e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
        </select>
      </SettingRow>
    </SettingSection>

    <SettingSection title="Startup">
      <SettingRow label="Default view" description="What to show on startup">
        <select value={settings.defaultView} onChange={(e) => onChange('defaultView', e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option value="recent">Recent canvases</option>
          <option value="templates">Template library</option>
          <option value="blank">Blank canvas</option>
        </select>
      </SettingRow>
      <SettingRow label="Restore last session" description="Reopen your last canvas automatically">
        <ToggleSwitch enabled={settings.restoreSession} onChange={(v) => onChange('restoreSession', v)} />
      </SettingRow>
    </SettingSection>
  </div>
);

// ============================================
// 11.2 CANVAS SETTINGS
// ============================================
const CanvasSettings = ({ settings, onChange }) => (
  <div>
    <SettingSection title="Grid & Guides" description="Visual aids for layout">
      <SettingRow label="Show grid" description="Display background grid pattern">
        <ToggleSwitch enabled={settings.showGrid} onChange={(v) => onChange('showGrid', v)} />
      </SettingRow>
      <SettingRow label="Grid size">
        <select value={settings.gridSize} onChange={(e) => onChange('gridSize', e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option value="small">Small (10px)</option>
          <option value="medium">Medium (20px)</option>
          <option value="large">Large (40px)</option>
        </select>
      </SettingRow>
      <SettingRow label="Snap to grid" description="Align elements to grid lines">
        <ToggleSwitch enabled={settings.snapToGrid} onChange={(v) => onChange('snapToGrid', v)} />
      </SettingRow>
      <SettingRow label="Smart guides" description="Show alignment guides when moving">
        <ToggleSwitch enabled={settings.smartGuides} onChange={(v) => onChange('smartGuides', v)} />
      </SettingRow>
    </SettingSection>

    <SettingSection title="Zoom & Pan">
      <SettingRow label="Default zoom">
        <select value={settings.defaultZoom} onChange={(e) => onChange('defaultZoom', e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option value="50">50%</option>
          <option value="75">75%</option>
          <option value="100">100%</option>
          <option value="fit">Fit to screen</option>
        </select>
      </SettingRow>
      <SettingRow label="Scroll to zoom" description="Use scroll wheel to zoom">
        <ToggleSwitch enabled={settings.scrollToZoom} onChange={(v) => onChange('scrollToZoom', v)} />
      </SettingRow>
      <SettingRow label="Invert zoom direction">
        <ToggleSwitch enabled={settings.invertZoom} onChange={(v) => onChange('invertZoom', v)} />
      </SettingRow>
    </SettingSection>

    <SettingSection title="Elements">
      <SettingRow label="Default sticky color">
        <div className="flex gap-2">
          {['#FEF3C7', '#DBEAFE', '#DCFCE7', '#FCE7F3', '#F3E8FF'].map(color => (
            <button key={color} onClick={() => onChange('defaultNoteColor', color)}
              className={`w-6 h-6 rounded border-2 transition-all ${settings.defaultNoteColor === color ? 'border-gray-900' : 'border-gray-300'}`}
              style={{ backgroundColor: color }} />
          ))}
        </div>
      </SettingRow>
      <SettingRow label="Auto-connect" description="Draw connections automatically">
        <ToggleSwitch enabled={settings.autoConnect} onChange={(v) => onChange('autoConnect', v)} />
      </SettingRow>
    </SettingSection>
  </div>
);

// ============================================
// 11.3 AGENT SETTINGS
// ============================================
const AgentSettings = ({ settings, onChange }) => (
  <div>
    <SettingSection title="Agent Behavior" description="How the AI assistant works">
      <SettingRow label="Proactive suggestions" description="Agent suggests without being asked">
        <ToggleSwitch enabled={settings.proactiveSuggestions} onChange={(v) => onChange('proactiveSuggestions', v)} />
      </SettingRow>
      <SettingRow label="Suggestion frequency">
        <select value={settings.suggestionFrequency} onChange={(e) => onChange('suggestionFrequency', e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          disabled={!settings.proactiveSuggestions}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </SettingRow>
      <SettingRow label="Auto-execute simple tasks" description="Run low-risk actions without confirmation">
        <ToggleSwitch enabled={settings.autoExecute} onChange={(v) => onChange('autoExecute', v)} />
      </SettingRow>
    </SettingSection>

    <SettingSection title="Glass Box" description="Transparency into reasoning">
      <SettingRow label="Show thinking process" description="Display agent's reasoning steps">
        <ToggleSwitch enabled={settings.showThinking} onChange={(v) => onChange('showThinking', v)} />
      </SettingRow>
      <SettingRow label="Thinking detail level">
        <select value={settings.thinkingDetail} onChange={(e) => onChange('thinkingDetail', e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          disabled={!settings.showThinking}>
          <option value="minimal">Minimal</option>
          <option value="standard">Standard</option>
          <option value="detailed">Detailed</option>
        </select>
      </SettingRow>
      <SettingRow label="Show confidence scores" description="Display agent confidence levels">
        <ToggleSwitch enabled={settings.showConfidence} onChange={(v) => onChange('showConfidence', v)} />
      </SettingRow>
    </SettingSection>

    <SettingSection title="Agent Personas">
      <div className="py-4 space-y-3">
        {[
          { id: 'decode', name: 'Decode', icon: '🔍', desc: 'Source analysis', enabled: true },
          { id: 'probe', name: 'Probe', icon: '🎯', desc: 'Hypothesis testing', enabled: true },
          { id: 'frame', name: 'Frame', icon: '🖼️', desc: 'Problem framing', enabled: true },
          { id: 'challenge', name: 'Challenge', icon: '⚡', desc: 'Red team analysis', enabled: false },
        ].map(agent => (
          <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl border border-gray-200">
                {agent.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                <p className="text-xs text-gray-500">{agent.desc}</p>
              </div>
            </div>
            <ToggleSwitch enabled={agent.enabled} onChange={() => {}} size="small" />
          </div>
        ))}
      </div>
    </SettingSection>
  </div>
);

// ============================================
// 11.4 NOTIFICATION SETTINGS
// ============================================
const NotificationSettings = ({ settings, onChange }) => (
  <div>
    <SettingSection title="In-App Notifications">
      <SettingRow label="Comments" description="When someone comments on your items">
        <ToggleSwitch enabled={settings.notifyComments} onChange={(v) => onChange('notifyComments', v)} />
      </SettingRow>
      <SettingRow label="Mentions" description="When someone @mentions you">
        <ToggleSwitch enabled={settings.notifyMentions} onChange={(v) => onChange('notifyMentions', v)} />
      </SettingRow>
      <SettingRow label="Agent completions" description="When agent tasks finish">
        <ToggleSwitch enabled={settings.notifyAgentComplete} onChange={(v) => onChange('notifyAgentComplete', v)} />
      </SettingRow>
      <SettingRow label="Collaboration" description="When others make changes">
        <ToggleSwitch enabled={settings.notifyCollaboration} onChange={(v) => onChange('notifyCollaboration', v)} />
      </SettingRow>
    </SettingSection>

    <SettingSection title="Email Notifications">
      <SettingRow label="Daily digest" description="Summary of activity">
        <ToggleSwitch enabled={settings.emailDigest} onChange={(v) => onChange('emailDigest', v)} />
      </SettingRow>
      <SettingRow label="Weekly summary" description="Weekly progress report">
        <ToggleSwitch enabled={settings.emailWeekly} onChange={(v) => onChange('emailWeekly', v)} />
      </SettingRow>
      <SettingRow label="Urgent mentions" description="Immediate email for urgent items">
        <ToggleSwitch enabled={settings.emailUrgent} onChange={(v) => onChange('emailUrgent', v)} />
      </SettingRow>
    </SettingSection>

    <SettingSection title="Sound">
      <SettingRow label="Sound effects" description="Play sounds for notifications">
        <ToggleSwitch enabled={settings.soundEffects} onChange={(v) => onChange('soundEffects', v)} />
      </SettingRow>
      <SettingRow label="Volume">
        <input type="range" min="0" max="100" value={settings.soundVolume}
          onChange={(e) => onChange('soundVolume', parseInt(e.target.value))}
          className="w-32" disabled={!settings.soundEffects} />
      </SettingRow>
    </SettingSection>
  </div>
);

// ============================================
// 11.5 KEYBOARD SHORTCUTS
// ============================================
const KeyboardShortcuts = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShortcuts = keyboardShortcuts.map(cat => ({
    ...cat,
    shortcuts: cat.shortcuts.filter(s => 
      s.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.keys.join('').toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.shortcuts.length > 0);

  return (
    <div>
      <div className="mb-6 relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search shortcuts..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
      </div>

      {filteredShortcuts.map(category => (
        <div key={category.category} className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">{category.category}</h3>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {category.shortcuts.map((shortcut, idx) => (
              <div key={idx} className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-gray-700">{shortcut.action}</span>
                <div className="flex items-center gap-1">
                  {shortcut.keys.map((key, kidx) => (
                    <kbd key={kidx} className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs font-mono text-gray-600">
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">Custom shortcuts</p>
          <p className="text-xs text-gray-500">Modify keyboard shortcuts</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-teal-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
          Customize
        </button>
      </div>
    </div>
  );
};

// ============================================
// 11.6 EXPORT SETTINGS
// ============================================
const ExportSettings = ({ settings, onChange }) => (
  <div>
    <SettingSection title="Default Format">
      <SettingRow label="Presentation format">
        <select value={settings.exportFormat} onChange={(e) => onChange('exportFormat', e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option value="pptx">PowerPoint (.pptx)</option>
          <option value="pdf">PDF (.pdf)</option>
          <option value="keynote">Keynote (.key)</option>
          <option value="gslides">Google Slides</option>
        </select>
      </SettingRow>
      <SettingRow label="Include speaker notes">
        <ToggleSwitch enabled={settings.exportNotes} onChange={(v) => onChange('exportNotes', v)} />
      </SettingRow>
      <SettingRow label="Include citations">
        <ToggleSwitch enabled={settings.exportCitations} onChange={(v) => onChange('exportCitations', v)} />
      </SettingRow>
    </SettingSection>

    <SettingSection title="Branding">
      <SettingRow label="Default style">
        <select value={settings.brandingStyle} onChange={(e) => onChange('brandingStyle', e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option value="sticktwist">Stick+Twist</option>
          <option value="neutral">Neutral</option>
          <option value="client">Client branding</option>
        </select>
      </SettingRow>
      <SettingRow label="Logo placement">
        <select value={settings.logoPlacement} onChange={(e) => onChange('logoPlacement', e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option value="footer">Footer</option>
          <option value="header">Header</option>
          <option value="none">None</option>
        </select>
      </SettingRow>
    </SettingSection>

    <SettingSection title="Data Export">
      <div className="py-4 space-y-3">
        {[
          { icon: '📊', name: 'Export as JSON', desc: 'Full canvas data' },
          { icon: '📝', name: 'Export as Markdown', desc: 'Text-based format' },
        ].map(item => (
          <button key={item.name} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        ))}
      </div>
    </SettingSection>
  </div>
);

// ============================================
// 11.7 ADVANCED SETTINGS
// ============================================
const AdvancedSettings = ({ settings, onChange }) => (
  <div>
    <SettingSection title="Performance">
      <SettingRow label="Hardware acceleration" description="Use GPU for better performance">
        <ToggleSwitch enabled={settings.hardwareAcceleration} onChange={(v) => onChange('hardwareAcceleration', v)} />
      </SettingRow>
      <SettingRow label="Reduce animations" description="Less motion for better performance">
        <ToggleSwitch enabled={settings.reduceAnimations} onChange={(v) => onChange('reduceAnimations', v)} />
      </SettingRow>
      <SettingRow label="Auto-save interval">
        <select value={settings.autoSaveInterval} onChange={(e) => onChange('autoSaveInterval', e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option value="30">Every 30 seconds</option>
          <option value="60">Every minute</option>
          <option value="300">Every 5 minutes</option>
          <option value="manual">Manual only</option>
        </select>
      </SettingRow>
    </SettingSection>

    <SettingSection title="Developer">
      <SettingRow label="Debug mode" description="Show debugging information">
        <ToggleSwitch enabled={settings.debugMode} onChange={(v) => onChange('debugMode', v)} />
      </SettingRow>
      <SettingRow label="Verbose logging" description="Log detailed events">
        <ToggleSwitch enabled={settings.verboseLogging} onChange={(v) => onChange('verboseLogging', v)} />
      </SettingRow>
      <SettingRow label="API endpoint">
        <input type="text" value={settings.apiEndpoint} onChange={(e) => onChange('apiEndpoint', e.target.value)}
          className="w-48 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-500" />
      </SettingRow>
    </SettingSection>

    <SettingSection title="Data & Privacy">
      <div className="py-4 space-y-3">
        <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-xl">📦</span>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">Clear cache</p>
              <p className="text-xs text-gray-500">Remove temporary files (142 MB)</p>
            </div>
          </div>
          <span className="text-sm text-teal-600 font-medium">Clear</span>
        </button>
        <button className="w-full flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <div className="text-left">
              <p className="text-sm font-medium text-red-700">Reset all settings</p>
              <p className="text-xs text-red-500">Cannot be undone</p>
            </div>
          </div>
          <span className="text-sm text-red-600 font-medium">Reset</span>
        </button>
      </div>
    </SettingSection>
  </div>
);

// ============================================
// SETTINGS MODAL
// ============================================
const SettingsModal = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('general');
  
  const [settings, setSettings] = useState({
    theme: 'light', accentColor: '#1A9B9B', compactMode: false, language: 'en-GB',
    dateFormat: 'DD/MM/YYYY', defaultView: 'recent', restoreSession: true,
    showGrid: true, gridSize: 'medium', snapToGrid: true, smartGuides: true,
    defaultZoom: '100', scrollToZoom: true, invertZoom: false, defaultNoteColor: '#FEF3C7', autoConnect: true,
    proactiveSuggestions: true, suggestionFrequency: 'medium', autoExecute: false,
    showThinking: true, thinkingDetail: 'standard', showConfidence: true,
    notifyComments: true, notifyMentions: true, notifyAgentComplete: true, notifyCollaboration: false,
    emailDigest: true, emailWeekly: false, emailUrgent: true, soundEffects: true, soundVolume: 50,
    exportFormat: 'pptx', exportNotes: true, exportCitations: true, brandingStyle: 'sticktwist', logoPlacement: 'footer',
    hardwareAcceleration: true, reduceAnimations: false, autoSaveInterval: '60',
    debugMode: false, verboseLogging: false, apiEndpoint: 'https://api.commons.ai',
  });

  const handleChange = (key, value) => setSettings(prev => ({ ...prev, [key]: value }));

  const renderSection = () => {
    switch (activeSection) {
      case 'general': return <GeneralSettings settings={settings} onChange={handleChange} />;
      case 'canvas': return <CanvasSettings settings={settings} onChange={handleChange} />;
      case 'agent': return <AgentSettings settings={settings} onChange={handleChange} />;
      case 'notifications': return <NotificationSettings settings={settings} onChange={handleChange} />;
      case 'shortcuts': return <KeyboardShortcuts />;
      case 'export': return <ExportSettings settings={settings} onChange={handleChange} />;
      case 'advanced': return <AdvancedSettings settings={settings} onChange={handleChange} />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex overflow-hidden">
        <div className="w-56 bg-gray-50 border-r border-gray-200 flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {settingsSections.map(section => (
              <button key={section.id} onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === section.id ? 'bg-teal-100 text-teal-700' : 'text-gray-600 hover:bg-gray-100'
                }`}>
                <span>{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-gray-200">
            <p className="text-xs text-gray-400 text-center">Commons OS v1.0.0</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {settingsSections.find(s => s.id === activeSection)?.label}
            </h3>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-auto p-6">{renderSection()}</div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================
export default function Phase10Settings() {
  const [showSettings, setShowSettings] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Phase 10: Settings & Preferences</h1>
            <p className="text-xs text-gray-500">Configuration, Shortcuts, Notifications</p>
          </div>
        </div>
        <button onClick={() => setShowSettings(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
          <span>⚙️</span> Settings
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <span className="text-6xl mb-4 block">⚙️</span>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Settings & Preferences</h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Configure canvas behavior, agent settings, keyboard shortcuts, and export preferences.
          </p>
          <button onClick={() => setShowSettings(true)}
            className="px-6 py-3 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700">
            Open Settings
          </button>
          <div className="mt-12 grid grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            {settingsSections.map(item => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-3">
                <span className="text-xl">{item.icon}</span>
                <p className="text-sm font-medium text-gray-900 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}
