import React, { useState, useRef, useEffect } from 'react';

// ============================================
// PHASE 8: COLLABORATION COMPONENTS
// Commons OS Problem Pursuit Canvas
// Real-time Collaboration Features
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

// Demo users
const users = {
  'user-1': { id: 'user-1', name: 'Benj Taylor', initials: 'BT', color: '#3B82F6', role: 'Lead Strategist' },
  'user-2': { id: 'user-2', name: 'Sarah Chen', initials: 'SC', color: '#8B5CF6', role: 'Client Partner' },
  'user-3': { id: 'user-3', name: 'Marcus Johnson', initials: 'MJ', color: '#22C55E', role: 'Data Analyst' },
  'user-4': { id: 'user-4', name: 'Emma Williams', initials: 'EW', color: '#F59E0B', role: 'Strategy Director' },
};

// Activity types
const activityTypes = {
  comment: { icon: '💬', label: 'commented', color: '#3B82F6' },
  edit: { icon: '✏️', label: 'edited', color: '#8B5CF6' },
  create: { icon: '➕', label: 'created', color: '#22C55E' },
  resolve: { icon: '✓', label: 'resolved', color: '#14B8A6' },
  share: { icon: '🔗', label: 'shared', color: '#F59E0B' },
  upload: { icon: '📎', label: 'uploaded', color: '#EC4899' },
  move: { icon: '↗️', label: 'moved', color: '#6366F1' },
  delete: { icon: '🗑️', label: 'deleted', color: '#EF4444' },
  assign: { icon: '👤', label: 'assigned', color: '#0EA5E9' },
  status: { icon: '📊', label: 'changed status', color: '#84CC16' },
};

// ============================================
// USER AVATAR
// Reusable avatar component
// ============================================
const UserAvatar = ({ user, size = 'default', showStatus = false, status = 'online' }) => {
  const sizes = {
    xs: 'w-5 h-5 text-[10px]',
    sm: 'w-6 h-6 text-xs',
    default: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const statusColors = {
    online: '#22C55E',
    away: '#F59E0B',
    busy: '#EF4444',
    offline: '#9CA3AF',
  };

  return (
    <div className="relative">
      <div 
        className={`${sizes[size]} rounded-full flex items-center justify-center font-semibold text-white`}
        style={{ backgroundColor: user.color }}
        title={user.name}
      >
        {user.initials}
      </div>
      {showStatus && (
        <div 
          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
          style={{ backgroundColor: statusColors[status] }}
        />
      )}
    </div>
  );
};

// ============================================
// AVATAR STACK
// Stacked avatars for multiple users
// ============================================
const AvatarStack = ({ userIds, maxDisplay = 3, size = 'default' }) => {
  const displayUsers = userIds.slice(0, maxDisplay);
  const remainingCount = userIds.length - maxDisplay;

  return (
    <div className="flex items-center -space-x-2">
      {displayUsers.map((userId, idx) => (
        <div key={userId} className="relative" style={{ zIndex: maxDisplay - idx }}>
          <div className="ring-2 ring-white rounded-full">
            <UserAvatar user={users[userId]} size={size} />
          </div>
        </div>
      ))}
      {remainingCount > 0 && (
        <div 
          className={`relative flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-medium ring-2 ring-white ${
            size === 'sm' ? 'w-6 h-6 text-[10px]' : 'w-8 h-8 text-xs'
          }`}
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

// ============================================
// 9.3 PRESENCE INDICATOR
// Shows who's currently viewing/editing
// ============================================
const PresenceIndicator = ({ activeUsers, currentLocation }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <AvatarStack userIds={activeUsers.map(u => u.userId)} size="sm" />
        <span className="text-sm text-gray-600">{activeUsers.length} active</span>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      </button>

      {isExpanded && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl border border-gray-200 shadow-xl z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <h4 className="font-semibold text-gray-900 text-sm">Active Collaborators</h4>
            <p className="text-xs text-gray-500">{activeUsers.length} people viewing this canvas</p>
          </div>
          
          <div className="max-h-64 overflow-auto">
            {activeUsers.map((presence) => {
              const user = users[presence.userId];
              return (
                <div 
                  key={presence.userId}
                  className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                >
                  <UserAvatar user={user} showStatus status={presence.status} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{presence.location}</p>
                  </div>
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: presence.status === 'editing' ? '#22C55E' : '#F59E0B' }}
                  />
                </div>
              );
            })}
          </div>

          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 rounded-b-xl">
            <button className="w-full text-sm text-teal-600 hover:text-teal-700 font-medium">
              Invite collaborators...
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// COMMENT ITEM
// Single comment in a thread
// ============================================
const CommentItem = ({ comment, onReply, onResolve, onDelete, isNested = false }) => {
  const user = users[comment.userId];
  const [showActions, setShowActions] = useState(false);

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div 
      className={`group ${isNested ? 'ml-10 mt-3' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex gap-3">
        <UserAvatar user={user} size={isNested ? 'sm' : 'default'} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-900">{user.name}</span>
            <span className="text-xs text-gray-400">{formatTime(comment.createdAt)}</span>
            {comment.isEdited && (
              <span className="text-xs text-gray-400">(edited)</span>
            )}
          </div>
          
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{comment.content}</p>
          
          {/* Mentions */}
          {comment.mentions && comment.mentions.length > 0 && (
            <div className="flex items-center gap-1 mt-2">
              {comment.mentions.map(mentionId => (
                <span 
                  key={mentionId}
                  className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full"
                >
                  @{users[mentionId]?.name.split(' ')[0]}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className={`flex items-center gap-3 mt-2 transition-opacity ${showActions ? 'opacity-100' : 'opacity-0'}`}>
            <button 
              onClick={() => onReply(comment)}
              className="text-xs text-gray-500 hover:text-teal-600 font-medium"
            >
              Reply
            </button>
            {!comment.isResolved && (
              <button 
                onClick={() => onResolve(comment.id)}
                className="text-xs text-gray-500 hover:text-green-600 font-medium"
              >
                Resolve
              </button>
            )}
            <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">
              React
            </button>
          </div>
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3">
          {comment.replies.map(reply => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              onReply={onReply}
              onResolve={onResolve}
              onDelete={onDelete}
              isNested 
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================
// 9.1 COMMENT THREAD
// Full comment thread with replies
// ============================================
const CommentThread = ({ thread, onAddComment, onResolve, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const inputRef = useRef(null);

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(thread.id, newComment, replyingTo?.id);
      setNewComment('');
      setReplyingTo(null);
    }
  };

  const handleReply = (comment) => {
    setReplyingTo(comment);
    inputRef.current?.focus();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden w-80">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="text-lg">💬</span>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">
              {thread.isResolved ? 'Resolved' : 'Comments'}
            </h4>
            <p className="text-xs text-gray-500">
              {thread.comments.length} comment{thread.comments.length !== 1 ? 's' : ''}
              {thread.targetType && ` on ${thread.targetType}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {thread.isResolved ? (
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
              ✓ Resolved
            </span>
          ) : (
            <button
              onClick={() => onResolve(thread.id)}
              className="text-xs px-2 py-1 text-gray-500 hover:bg-gray-200 rounded-full"
            >
              Resolve all
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Comments */}
      <div className="max-h-80 overflow-auto p-4 space-y-4">
        {thread.comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onResolve={(id) => console.log('Resolve:', id)}
            onDelete={(id) => console.log('Delete:', id)}
          />
        ))}
      </div>

      {/* Input */}
      {!thread.isResolved && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          {replyingTo && (
            <div className="flex items-center justify-between mb-2 px-2 py-1 bg-blue-50 rounded text-xs">
              <span className="text-blue-600">
                Replying to {users[replyingTo.userId]?.name}
              </span>
              <button 
                onClick={() => setReplyingTo(null)}
                className="text-blue-400 hover:text-blue-600"
              >
                ✕
              </button>
            </div>
          )}
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder={replyingTo ? 'Write a reply...' : 'Add a comment...'}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={handleSubmit}
              disabled={!newComment.trim()}
              className="px-3 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// COMMENT PIN
// Positioned comment marker on canvas
// ============================================
const CommentPin = ({ thread, position, onClick, isActive }) => {
  const user = users[thread.comments[0]?.userId];
  const unreadCount = thread.comments.filter(c => !c.isRead).length;

  return (
    <button
      onClick={onClick}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
        isActive ? 'scale-110 z-50' : 'hover:scale-105 z-10'
      }`}
      style={{ left: position.x, top: position.y }}
    >
      <div className={`relative ${thread.isResolved ? 'opacity-50' : ''}`}>
        <div 
          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 ${
            isActive ? 'border-teal-500' : 'border-white'
          }`}
          style={{ backgroundColor: user?.color || colors.gray[400] }}
        >
          <span className="text-white text-xs font-bold">{user?.initials || '?'}</span>
        </div>
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">{unreadCount}</span>
          </div>
        )}
        {thread.isResolved && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-[10px]">✓</span>
          </div>
        )}
      </div>
    </button>
  );
};

// ============================================
// ACTIVITY ITEM
// Single item in activity feed
// ============================================
const ActivityItem = ({ activity }) => {
  const user = users[activity.userId];
  const type = activityTypes[activity.type];

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="flex gap-3 py-3">
      <div className="relative">
        <UserAvatar user={user} size="sm" />
        <div 
          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] bg-white border border-gray-200"
        >
          {type.icon}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700">
          <span className="font-medium text-gray-900">{user.name}</span>
          {' '}{type.label}{' '}
          <span className="font-medium text-gray-900">{activity.target}</span>
          {activity.details && (
            <span className="text-gray-500"> — {activity.details}</span>
          )}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{formatTime(activity.timestamp)}</p>
      </div>
    </div>
  );
};

// ============================================
// 9.2 ACTIVITY FEED
// Chronological feed of all activities
// ============================================
const ActivityFeed = ({ activities, onFilterChange }) => {
  const [filter, setFilter] = useState('all');
  const [isExpanded, setIsExpanded] = useState(true);

  const filters = [
    { id: 'all', label: 'All Activity' },
    { id: 'comments', label: 'Comments' },
    { id: 'edits', label: 'Edits' },
    { id: 'mentions', label: 'Mentions' },
  ];

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    if (filter === 'comments') return activity.type === 'comment';
    if (filter === 'edits') return ['edit', 'create', 'delete'].includes(activity.type);
    if (filter === 'mentions') return activity.mentions?.includes('user-1');
    return true;
  });

  // Group by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = new Date(activity.timestamp).toDateString();
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    let label = date;
    if (date === today) label = 'Today';
    else if (date === yesterday) label = 'Yesterday';
    
    if (!groups[label]) groups[label] = [];
    groups[label].push(activity);
    return groups;
  }, {});

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div 
        className="px-4 py-3 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">📋</span>
          <h3 className="font-semibold text-gray-900 text-sm">Activity</h3>
          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
            {activities.length}
          </span>
        </div>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isExpanded && (
        <>
          {/* Filters */}
          <div className="px-4 py-2 border-b border-gray-100 flex gap-2 overflow-x-auto">
            {filters.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                  filter === f.id
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Activity List */}
          <div className="max-h-96 overflow-auto">
            {Object.entries(groupedActivities).map(([date, items]) => (
              <div key={date}>
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                  <p className="text-xs font-medium text-gray-500 uppercase">{date}</p>
                </div>
                <div className="px-4 divide-y divide-gray-100">
                  {items.map(activity => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-gray-500">No activity to show</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// ============================================
// 9.4 SHARING CONTROLS
// Access and permission management
// ============================================
const SharingControls = ({ collaborators, onInvite, onUpdatePermission, onRemove, onClose }) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('viewer');
  const [linkAccess, setLinkAccess] = useState('restricted');

  const roles = [
    { id: 'owner', label: 'Owner', description: 'Full access, can manage sharing' },
    { id: 'editor', label: 'Editor', description: 'Can edit content and comment' },
    { id: 'commenter', label: 'Commenter', description: 'Can view and comment only' },
    { id: 'viewer', label: 'Viewer', description: 'Can view only' },
  ];

  const handleInvite = () => {
    if (inviteEmail.trim()) {
      onInvite(inviteEmail, inviteRole);
      setInviteEmail('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Share Canvas</h2>
            <p className="text-sm text-gray-500">Manage access and permissions</p>
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

        <div className="p-6 space-y-6">
          {/* Invite */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Invite people</label>
            <div className="flex gap-2">
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {roles.slice(1).map(role => (
                  <option key={role.id} value={role.id}>{role.label}</option>
                ))}
              </select>
              <button
                onClick={handleInvite}
                disabled={!inviteEmail.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                Invite
              </button>
            </div>
          </div>

          {/* Collaborators */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              People with access ({collaborators.length})
            </label>
            <div className="space-y-2 max-h-48 overflow-auto">
              {collaborators.map((collab) => {
                const user = users[collab.userId];
                return (
                  <div 
                    key={collab.userId}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                  >
                    <UserAvatar user={user} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                    {collab.role === 'owner' ? (
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                        Owner
                      </span>
                    ) : (
                      <select
                        value={collab.role}
                        onChange={(e) => onUpdatePermission(collab.userId, e.target.value)}
                        className="text-xs px-2 py-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        {roles.slice(1).map(role => (
                          <option key={role.id} value={role.id}>{role.label}</option>
                        ))}
                        <option value="remove">Remove</option>
                      </select>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Link Access */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Link sharing</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="linkAccess"
                  value="restricted"
                  checked={linkAccess === 'restricted'}
                  onChange={(e) => setLinkAccess(e.target.value)}
                  className="text-teal-600 focus:ring-teal-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Restricted</p>
                  <p className="text-xs text-gray-500">Only people invited can access</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="linkAccess"
                  value="organization"
                  checked={linkAccess === 'organization'}
                  onChange={(e) => setLinkAccess(e.target.value)}
                  className="text-teal-600 focus:ring-teal-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Organization</p>
                  <p className="text-xs text-gray-500">Anyone in your organization with the link can view</p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="linkAccess"
                  value="public"
                  checked={linkAccess === 'public'}
                  onChange={(e) => setLinkAccess(e.target.value)}
                  className="text-teal-600 focus:ring-teal-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Public</p>
                  <p className="text-xs text-gray-500">Anyone with the link can view</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            Copy link
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// NOTIFICATION BADGE
// Shows unread notifications count
// ============================================
const NotificationBadge = ({ count, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  );
};

// ============================================
// MAIN APP - Phase 8 Demo
// ============================================
export default function Phase8Collaboration() {
  const [activeThread, setActiveThread] = useState(null);
  const [showSharing, setShowSharing] = useState(false);

  const [threads, setThreads] = useState([
    {
      id: 'thread-1',
      targetType: 'Hypothesis H1',
      position: { x: 200, y: 150 },
      isResolved: false,
      comments: [
        {
          id: 'c1',
          userId: 'user-2',
          content: 'I think we need more evidence for this hypothesis. The current data only shows correlation, not causation.',
          createdAt: new Date(Date.now() - 3600000),
          isRead: true,
          replies: [
            {
              id: 'c1-r1',
              userId: 'user-1',
              content: 'Good point. Let me ask the Decode agent to pull more sources on this.',
              createdAt: new Date(Date.now() - 1800000),
              isRead: true,
            }
          ]
        }
      ]
    },
    {
      id: 'thread-2',
      targetType: 'Data Point',
      position: { x: 450, y: 280 },
      isResolved: true,
      comments: [
        {
          id: 'c2',
          userId: 'user-3',
          content: 'Updated the ROI calculation with the latest Q4 figures.',
          createdAt: new Date(Date.now() - 86400000),
          isRead: true,
        }
      ]
    },
    {
      id: 'thread-3',
      targetType: 'Problem Statement',
      position: { x: 650, y: 180 },
      isResolved: false,
      comments: [
        {
          id: 'c3',
          userId: 'user-4',
          content: 'This framing resonates well with what we heard in the CFO interview. Suggest we lead with this in the presentation.',
          createdAt: new Date(Date.now() - 7200000),
          isRead: false,
          mentions: ['user-1'],
        }
      ]
    },
  ]);

  const [activities] = useState([
    { id: 'a1', userId: 'user-4', type: 'comment', target: 'Problem Statement', timestamp: new Date(Date.now() - 7200000) },
    { id: 'a2', userId: 'user-3', type: 'edit', target: 'ROI calculation', details: 'Updated with Q4 figures', timestamp: new Date(Date.now() - 86400000) },
    { id: 'a3', userId: 'user-1', type: 'create', target: 'Hypothesis H3', timestamp: new Date(Date.now() - 90000000) },
    { id: 'a4', userId: 'user-2', type: 'resolve', target: 'Data discrepancy thread', timestamp: new Date(Date.now() - 100000000) },
    { id: 'a5', userId: 'user-1', type: 'upload', target: 'Q4 Brand Tracker.pdf', timestamp: new Date(Date.now() - 172800000) },
    { id: 'a6', userId: 'user-3', type: 'status', target: 'Hypothesis H1', details: 'Draft → Investigating', timestamp: new Date(Date.now() - 180000000) },
    { id: 'a7', userId: 'user-4', type: 'share', target: 'Canvas', details: 'with marcus@acme.com', timestamp: new Date(Date.now() - 259200000) },
  ]);

  const [activeUsers] = useState([
    { userId: 'user-1', status: 'editing', location: 'Problem Definition workspace' },
    { userId: 'user-2', status: 'viewing', location: 'Strategic Reality workspace' },
    { userId: 'user-4', status: 'viewing', location: 'Front Stage' },
  ]);

  const [collaborators] = useState([
    { userId: 'user-1', role: 'owner' },
    { userId: 'user-2', role: 'editor' },
    { userId: 'user-3', role: 'editor' },
    { userId: 'user-4', role: 'viewer' },
  ]);

  const handleAddComment = (threadId, content, replyToId) => {
    setThreads(prev => prev.map(thread => {
      if (thread.id !== threadId) return thread;
      
      const newComment = {
        id: `c-${Date.now()}`,
        userId: 'user-1',
        content,
        createdAt: new Date(),
        isRead: true,
      };

      if (replyToId) {
        return {
          ...thread,
          comments: thread.comments.map(c => {
            if (c.id === replyToId) {
              return { ...c, replies: [...(c.replies || []), newComment] };
            }
            return c;
          })
        };
      }

      return {
        ...thread,
        comments: [...thread.comments, newComment]
      };
    }));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Phase 8: Collaboration</h1>
            <p className="text-xs text-gray-500">Comments, Activity Feed, Presence, Sharing</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <PresenceIndicator activeUsers={activeUsers} />
          <NotificationBadge count={3} onClick={() => console.log('Notifications')} />
          <button
            onClick={() => setShowSharing(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas Area with Comment Pins */}
        <div className="flex-1 relative bg-gray-50 overflow-hidden">
          {/* Demo Canvas Background */}
          <div className="absolute inset-0 p-8">
            <div className="h-full bg-white rounded-xl border border-gray-200 shadow-sm relative">
              {/* Grid pattern */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(circle, #CBD5E1 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              />
              
              {/* Demo content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl mb-4 block">🎨</span>
                  <p className="text-gray-500">Canvas with collaboration features</p>
                  <p className="text-sm text-gray-400 mt-1">Click comment pins to view threads</p>
                </div>
              </div>

              {/* Comment Pins */}
              {threads.map(thread => (
                <CommentPin
                  key={thread.id}
                  thread={thread}
                  position={thread.position}
                  isActive={activeThread === thread.id}
                  onClick={() => setActiveThread(activeThread === thread.id ? null : thread.id)}
                />
              ))}

              {/* Active Thread Popup */}
              {activeThread && (
                <div 
                  className="absolute z-50"
                  style={{ 
                    left: threads.find(t => t.id === activeThread)?.position.x + 20,
                    top: threads.find(t => t.id === activeThread)?.position.y
                  }}
                >
                  <CommentThread
                    thread={threads.find(t => t.id === activeThread)}
                    onAddComment={handleAddComment}
                    onResolve={(id) => {
                      setThreads(prev => prev.map(t => 
                        t.id === id ? { ...t, isResolved: true } : t
                      ));
                    }}
                    onClose={() => setActiveThread(null)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Activity Feed */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {/* Comment Threads Summary */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💬</span>
                  <h3 className="font-semibold text-gray-900 text-sm">Comments</h3>
                </div>
                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                  {threads.filter(t => !t.isResolved).length} open
                </span>
              </div>
              <div className="divide-y divide-gray-100">
                {threads.map(thread => {
                  const lastComment = thread.comments[thread.comments.length - 1];
                  const user = users[lastComment?.userId];
                  return (
                    <button
                      key={thread.id}
                      onClick={() => setActiveThread(thread.id)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        thread.isResolved ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <UserAvatar user={user} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900 truncate">
                              {thread.targetType}
                            </span>
                            {thread.isResolved && (
                              <span className="text-xs text-green-600">✓</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate">{lastComment?.content}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Activity Feed */}
            <ActivityFeed activities={activities} />
          </div>
        </div>
      </div>

      {/* Sharing Modal */}
      {showSharing && (
        <SharingControls
          collaborators={collaborators}
          onInvite={(email, role) => console.log('Invite:', email, role)}
          onUpdatePermission={(userId, role) => console.log('Update:', userId, role)}
          onRemove={(userId) => console.log('Remove:', userId)}
          onClose={() => setShowSharing(false)}
        />
      )}
    </div>
  );
}
