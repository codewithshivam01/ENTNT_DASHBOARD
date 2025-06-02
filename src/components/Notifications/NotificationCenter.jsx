import React, { useContext } from 'react';
import { NotificationsContext } from '../../contexts/NotificationsContext';

export default function NotificationCenter() {
  const { notifications, removeNotification } = useContext(NotificationsContext);

  if (!notifications.length) return <div>No notifications</div>;

  return (
    <div className="p-4 bg-white  dark:text-gray-400 rounded shadow max-w-sm">
      <h2 className="font-bold mb-2">Notifications</h2>
      <ul>
        {notifications.map(n => (
          <li key={n.id} className="mb-2 flex justify-between">
            <span>
              {new Date(n.date).toLocaleString()}: {n.message}
            </span>
            <button
              onClick={() => removeNotification(n.id)}
              className="text-red-500 hover:underline ml-2"
            >
              Dismiss
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
