import firebase from 'firebase';

class TaskService {
  static create(uid, task) {
    console.log('create', [uid, task]);

    const ref = firebase.database().ref();
    const key = ref.child('task/' + uid).push().key;

    // `let` は変更可能な変数
    let updates = {};
    updates[['/task', uid, key].join('/')] = task;

    return ref.update(updates);
  }

  static read(uid) {
    return firebase.database().ref('task/' + uid)
  }
}

export default TaskService;
