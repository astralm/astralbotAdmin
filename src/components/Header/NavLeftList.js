import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { hashHistory } from 'react-router';
import Divider from 'material-ui/Divider';

const HeaderIconButtonStyle = {
  width: '60px',
  height: '60px'
};

const listItemStyle = {
  paddingLeft: '40px' // 36 + 16, algin with sub list
};

class NavLeftList extends React.Component {

  handleChange = (event, value) => {
    hashHistory.push(value);
  }

  render() {
      const style = {
          fontSize: '35px',
          lineHeight:'1.6'
      };
      return (
        <div>
          <ul className="">
            <span style={style}>Сессии</span>
          </ul>
          <ul className="list-unstyled list-inline">
            <li className="list-inline-item">

            </li>
          </ul>
        </div>

    );
  }
}

module.exports = NavLeftList;
