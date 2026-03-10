// A data set of gym sessions looks like this:

// [
//   { user: 8, duration: 50, equipment: ['bench'] },
//   { user: 7, duration: 150, equipment: ['dumbbell'] },
//   { user: 1, duration: 10, equipment: ['barbell'] },
//   { user: 7, duration: 100, equipment: ['bike', 'kettlebell'] },
//   { user: 7, duration: 200, equipment: ['bike'] },
//   { user: 2, duration: 200, equipment: ['treadmill'] },
//   { user: 2, duration: 200, equipment: ['bike'] },
// ];

// Implement a method mergeData, which is used to return a unified view of each
// user's activities by merging data from each user

// When merging:
// Sum up the duration fields.
// Combine all the equipment used, de-duplicating the values and sorting alphabetically

// The order of the results should always remain unchanged from the original set

// in the case of merging sessions with duplicate users, the row should take the place of the earliest occurrence of that user. The input objects should not be modified

/**
 * @param {Array<{user: number, duration: number, equipment: Array<string>}>} sessions
 * @return {Array}
 */
export default function mergeData(sessions) {
  const results = [];
  const sessionsForUsers = new Map();

  sessions.forEach((session) => {
    if (sessionsForUsers.has(session.user)) {
      const userSession = sessionsForUsers.get(session.user);
      userSession.duration += session.duration;
      session.equipment.forEach((equipment) => {
        userSession.equipment.add(equipment);
      });
      // Since results[index] and userSession point to same object,
      // results automatically reflects changes.
    } else {
      const clonedSession = {
        ...session,
        equipment: new Set(session.equipment), // Set automatically ignores duplicates
      };
      sessionsForUsers.set(session.user, clonedSession); // push REFERENCE to results
      results.push(clonedSession); // same REFERENCE in Map
    }
  });

  // Sort equipment of each session and convert back into array.
  return results.map((sessions) => ({
    ...sessions,
    equipment: Array.from(sessions.equipment).sort(), // sort alphabetically
  }));
}
