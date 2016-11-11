import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

const TaskCard = (task, key) => (
  // 複数要素の場合 `key` プロパティが必要
  <Card key={key} style={{marginTop: 20}}>
    <CardHeader
      title={task.summary}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardActions>
      <FlatButton label="編集" />
      <FlatButton label="削除" />
    </CardActions>
    <CardText expandable={true}>
      {task.detail}
    </CardText>
  </Card>
);

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
      tasks: [
        {summary: 'summary', detail: 'detail'},
        {summary: 'summary', detail: 'detail'},
        {summary: 'summary', detail: 'detail'},
        {summary: 'summary', detail: 'detail'},
        {summary: 'summary', detail: 'detail'},
        {summary: 'summary', detail: 'detail'},
        {summary: 'summary', detail: 'detail'},
        {summary: 'summary', detail: 'detail'},
        {summary: 'summary', detail: 'detail'},
        {summary: 'summary', detail: 'detail'},
        {summary: 'summary', detail: 'detail'},
        {summary: 'summary', detail: 'detail'},
      ],
      showAddForm: false,
      summary: '',
      detail: '',
    };
  }

  handleAddTap = () => {
    console.log('add');
    this.setState({showAddForm: true});
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
    // TODO: save
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

    return (
      <div style={{padding: 10, marginTop: 10, marginBottom: 70}}>
        {this.state.showAddForm ? addForm :
          <div>
            {this.state.tasks.map(TaskCard)}
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
