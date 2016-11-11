import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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
    };
  }

  render() {
    return (
      <div style={{padding: 10, marginTop: 10, marginBottom: 70}}>
        {this.state.tasks.map(TaskCard)}
        <div style={styles.footer}>
          <FloatingActionButton style={styles.add}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </div>
      // 複数のタグはdivで囲むか配列としてreturn
    );
  }
}

export default Top;
