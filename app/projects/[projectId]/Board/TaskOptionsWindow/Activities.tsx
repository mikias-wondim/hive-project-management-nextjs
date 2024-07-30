import Link from 'next/link';
import React from 'react';
import { v4 as uid } from 'uuid';

interface Activity {
  id: string;
  userName: string;
  userId: string;
  action: string;
  date: Date;
}

const activities: Activity[] = [
  {
    id: uid(),
    userName: 'John',
    userId: '123',
    action: 'added this to FMT Design and Print',
    date: new Date(),
  },
  {
    id: uid(),
    userName: 'John',
    userId: '123',
    action: 'added enhancement label',
    date: new Date(),
  },
  {
    id: uid(),
    userName: 'John',
    userId: '123',
    action: 'moved this from Ready to In progress in  FMT Design and Print',
    date: new Date(),
  },
  {
    id: uid(),
    userName: 'John',
    userId: '123',
    action: 'moved this from In progress to Ready in  FMT Design and Print',
    date: new Date(),
  },

  {
    id: uid(),
    userName: 'John',
    userId: '123',
    action: 'removed admin label',
    date: new Date(),
  },
];

// Fields
// status, label, priority, size, startDate, endDate,
// Examples

/*
  - status
  task move -> [USER] moved this from [PREVIOUS_STATUS] to [NEW_STATUS] on [DATE]
  task add -> [USER] added this to [STATUS] on [DATE]
  
  Assignees
  [User] assigned [USER or USERS] on [DATE]
  self assigned - [USER] self-assigned on [DATE]

  Labels
  [USER] added [LABEL or LABELS] label(s) on [DATE]
  [USER] removed [LABEL or LABELS] label(s) on [DATE]

  activities
[
  { type: "user", id: "123"}, 
   'move this from', 
   { type: "status", id: "323"},
   "to",
   { type: "status", id: "323"},
    "on",
    {type: "date", value: "some date"}
]

[
  { type: "user", id: "123"}, 
   'added', 
   { type: "label", ids: ["323", "123"]},
    "on",
    {type: "date", value: "some date"}
]

[
  { type: "user", id: "123"}, 
   'assigned', 
   { type: "users", ids: ["123", "554"]},
    "on",
    {type: "date", value: "some date"}
]

Possible types
 - status
 - label
 - labels
 - date
 - user
 - users
 */

export const Activities = () => {
  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center my-2">
          <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700 mr-2 ml-[-8px]"></div>
          <div className="text-xs">
            <Link href={`/profile/${activity.userId}`}>
              <span className="text-bold">{activity.userName}</span>
            </Link>{' '}
            <span className="text-gray-400">{activity.action} on </span>{' '}
            {activity.date.toDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};
