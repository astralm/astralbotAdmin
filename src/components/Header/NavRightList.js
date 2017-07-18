import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

const ImgIconButtonStyle = {
  width: '60px',
  height: '60px'
};

const listItemStyle = {
  paddingLeft: '50px' // 36 + 16, algin with sub list
};

class NavRightList extends React.Component {

  handleChange = (event, value) => {
    hashHistory.push(value);
  }

  render() {
    return (
        <div>
          <ul className="list-unstyled float-right">
            <li style={{marginRight: '10px'}}>
              <IconMenu
                iconButtonElement={<IconButton style={ImgIconButtonStyle}><img src="assets/images/g1.jpg" alt="" className="rounded-circle img30_30" /></IconButton>}
                onChange={this.handleChange}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                menuStyle={{minWidth: '150px'}}
                        >
                <MenuItem
                  primaryText="Log Out"
                  innerDivStyle={listItemStyle}
                  style={{fontSize: '14px', lineHeight: '48px'}}
                  leftIcon={<i className="material-icons">forward</i>}
                            />
              </IconMenu>
            </li>
          </ul>
        </div>
    );
  }
}

module.exports = connect(state => ({
  status : state.app.getIn(['user', 'status']) || false
}))(NavRightList);
