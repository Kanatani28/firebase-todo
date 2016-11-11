import React, {Component} from 'react';

class Top extends Component {
  constructor(props, context) {
    super(props, context);

    // this.state = {
    //   user: null,
    // };
  }

  render() {
    return (
      <div>ログイン成功したよ {this.props.user.displayName}</div>
    );
  }
}

export default Top;
