import firebase from 'firebase';

class TaskService {
  static create(uid, task) {
    console.log('create', [uid, task]);
    return this.update(uid, null, task);
  }

  static read(uid) {
    return firebase.database().ref('task/' + uid);
  }

  static update(uid, key, task) {
    console.log('update', [uid, key, task]);

    const _key = key || this.read(uid).push().key;

    let updates = {};
    updates[['/task', uid, _key].join('/')] = task;

    return firebase.database().ref().update(updates);
  }

  static delete(uid, key) {
    return this.update(uid, key, null);
  }
}

export default TaskService;
