import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.marginTop = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      fontStyle: 'italic',
      fontSize: '18px',
      fontWeight: '550',
      marginTop: this.marginTop,
    };
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
      </div>
    );
  }
}

  class InfoAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = '#6EB7D6';
      this.marginTop = '330px';
    }
  }

  class ErrorAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = '#ff6961';
      this.marginTop = '560px'
    }
  }


export { InfoAlert }
export { ErrorAlert }