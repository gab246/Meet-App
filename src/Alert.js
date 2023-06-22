import { getPositioningCSS } from 'nprogress';
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
      this.marginTop = '459px';
    }
  }

  class ErrorAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = '#ff6961';
      this.marginTop = '689px'
    }
  }

  class WarningAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = '#FFB347';
      this.marginTop = '20px'
    }
  }


export { InfoAlert, WarningAlert, ErrorAlert }