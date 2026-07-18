import React, { useState, useEffect, useContext, useCallback } from 'react';
import { NotificationContext } from './NotificationContext';
import { AuthContext } from './AuthContext';
import api from '../utils/api';

const NotificationProvider = ({ children }) => {
  const { user, status, accessToken } = useContext(AuthContext);
  const [showNotification, setShowNotification] = useState(false);

  // Derive user-specific storage key
  const userId = user?._id || user?.id || (user?.email ? encodeURIComponent(user.email) : null);
  const storageKey = userId ? `notes_notif_${userId}` : null;

  // Initialize notifications from localStorage lazily
  const [notifications, setNotifications] = useState(() => {
    if (userId) {
      const stored = localStorage.getItem(`notes_notif_${userId}`);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error("Failed to parse notifications", e);
        }
      } else {
        const initial = [
          {
            id: 'welcome-msg',
            type: 'SUCCESS',
            title: 'Welcome to NoteNest!',
            message: 'You can now create, pin, archive, and manage your notes in real-time.',
            time: new Date().toISOString(),
            isRead: false
          }
        ];
        localStorage.setItem(`notes_notif_${userId}`, JSON.stringify(initial));
        return initial;
      }
    }
    return [];
  });

  // Track the previous user ID to adjust state on user switch during render
  const [prevUserId, setPrevUserId] = useState(userId);
  if (userId !== prevUserId) {
    setPrevUserId(userId);
    let nextNotifs = [];
    if (userId) {
      const stored = localStorage.getItem(`notes_notif_${userId}`);
      if (stored) {
        try {
          nextNotifs = JSON.parse(stored);
        } catch (e) {
          console.error("Failed to parse notifications", e);
        }
      } else {
        nextNotifs = [
          {
            id: 'welcome-msg',
            type: 'SUCCESS',
            title: 'Welcome to NoteNest Notes!',
            message: 'You can now create, pin, archive, and manage your notes in real-time.',
            time: new Date().toISOString(),
            isRead: false
          }
        ];
        localStorage.setItem(`notes_notif_${userId}`, JSON.stringify(nextNotifs));
      }
    }
    setNotifications(nextNotifs);
  }

  // Unified function to update local state and localStorage
  const saveNotifications = useCallback((updater) => {
    setNotifications(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(next));
      }
      return next;
    });
  }, [storageKey]);

  const addNotification = useCallback((notif) => {
    const newNotif = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: notif.type || 'INFO',
      title: notif.title,
      message: notif.message,
      time: new Date().toISOString(),
      isRead: false
    };
    saveNotifications(prev => [newNotif, ...prev]);
  }, [saveNotifications]);

  const deleteNotification = useCallback((id) => {
    saveNotifications(prev => prev.filter(n => n.id !== id));
  }, [saveNotifications]);

  const handleMarkAllRead = useCallback(() => {
    saveNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }, [saveNotifications]);

  // Poll due reminders from backend
  useEffect(() => {
    if (!userId || status !== 'AUTH_VERIFIED' || !accessToken) return;

    const pollDueReminders = async () => {
      try {
        const response = await api.get('/api/v1/notes/reminders/due', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        const dueReminders = response.data.data;
        if (dueReminders && dueReminders.length > 0) {
          dueReminders.forEach(reminder => {
            addNotification({
              type: 'REMINDER',
              title: `⏰ Reminder: ${reminder.title || 'Untitled Note'}`,
              message: reminder.content ? reminder.content.replace(/<[^>]*>/g, '').substring(0, 100) : 'Your set reminder is due!'
            });
          });
        }
      } catch (err) {
        console.error("Error polling due reminders:", err);
      }
    };

    // Run once immediately
    pollDueReminders();

    // Poll every 30 seconds
    const timer = setInterval(pollDueReminders, 30000);

    return () => clearInterval(timer);
  }, [userId, status, accessToken, addNotification]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      showNotification,
      setShowNotification,
      addNotification,
      deleteNotification,
      handleMarkAllRead
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
