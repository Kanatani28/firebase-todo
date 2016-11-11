import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

import TaskService from './TaskService.js';

const styles = {
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    clear: 'both',
  },
  add: {
    float: 'right',
    marginRight: 30,
    marginBottom: 16,
  },
}

class Top extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      tasks: {},
      showAddForm: false,
      summary: '',
      detail: '',
    };

    this.taskEmmeter = TaskService.read(this.props.user.uid);
  }

  componentWillMount() {
    this.taskEmmeter.on('value', (snapshot) => {
      this.setState({tasks: snapshot.val() || {}});
    });
  }

  componentWillUnmount() {
    this.taskEmmeter.off();
  }

  handleAddTap = () => {
    console.log('add');

    this.setState({
      showAddForm: true,
      summary: '',
      detail: '',
      key: null,
    });
  }

  handleEditTap = (key) => {
    console.log('edit');

    const task = this.state.tasks[key];

    this.setState({
      showAddForm: true,
      summary: task.summary,
      detail: task.detail,
      key: key,
    });
  }

  handleRemoveTap = (key) => {
    console.log('remove');

    TaskService
      .delete(this.props.user.uid, key)
      .then(() => console.log('delete success', arguments));
  }

  handleCancelTap = () => {
    console.log('cancel');
    this.setState({showAddForm: false});
  }

  handleSaveTap = () => {
    const task = {
      summary: this.state.summary,
      detail: this.state.detail,
    };

    console.log('save', task);

    if (this.state.key) {
      TaskService.update(this.props.user.uid, this.state.key, task)
        .then(() => console.log('update success', arguments));
    } else {
      TaskService.create(this.props.user.uid, task)
        .then(() => console.log('create success', arguments));
    }

    this.setState({showAddForm: false});
  }

  changeSummary = (e) => {
    const summary = e.target.value;
    // FIXME: 入力値チェック

    this.setState({summary: summary});
  }

  changeDetail = (e) => {
    const detail = e.target.value;
    // FIXME: 入力値チェック

    this.setState({detail: detail});
  }

  render() {
    const addForm = (
      <div style={{marginLeft: 30, marginTop: 30}}>
        <h2>タスク追加フォーム</h2>
        <TextField
          hintText="Hint Text"
          floatingLabelText="概要"
          onChange={this.changeSummary}
          value={this.state.summary}
        /><br />
        <TextField
          hintText="Hint Text"
          floatingLabelText="詳細"
          multiLine={true}
          rows={2}
          rowsMax={4}
          onChange={this.changeDetail}
          value={this.state.detail}
        /><br />
        <div>
          <FlatButton
            label="保存"
            primary={true}
            onTouchTap={this.handleSaveTap}
          />
          <FlatButton
            label="キャンセル"
            onTouchTap={this.handleCancelTap}
          />
        </div>
      </div>
    );

    const TaskCard = (task, key) => (
      // 複数要素の場合 `key` プロパティが必要
      <Card key={key} style={{marginTop: 20}}>
        <CardHeader
          title={task.summary}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
          <FlatButton
            label="編集"
            onTouchTap={() => this.handleEditTap(key)}
          />
          <FlatButton
            label="削除"
            onTouchTap={() => this.handleRemoveTap(key)}
          />
        </CardActions>
        <CardText expandable={true}>
          {task.detail.split(/\r*\n/).map((line, index) => <div key={index}>{line}</div>)}
        </CardText>
      </Card>
    );

    return (
      <div style={{padding: 10, marginTop: 10, marginBottom: 70}}>
        {this.state.showAddForm ? addForm :
          <div>
            {Object.keys(this.state.tasks).map((key) => TaskCard(this.state.tasks[key], key))}
            <div style={styles.footer}>
              <FloatingActionButton
                style={styles.add}
                onTouchTap={this.handleAddTap}
              >
                <ContentAdd />
              </FloatingActionButton>
            </div>
          </div>
        }
      </div>
      // 複数のタグはdivで囲むか配列としてreturn
    );
  }
}

export default Top;
