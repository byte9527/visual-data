import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  page: '++id, name, content, remark', // Primary key and indexed props
});
