import React from 'react';

const Loader = React.createClass({
  render() {
    return (
      <div className={"loader " + (this.props.paging ? "active" : "")}>
        <img src="svg/loader.svg" />
      </div>
    )
  }
});

module.exports = Loader;