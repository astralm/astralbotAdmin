import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
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

  logout(){
    this.props.dispatch({
      type: "Query",
      middleware: true,
      data: {
        query: "logout",
        values: [
          this.props.state.user.hash,
          this.props.state.socket.hash
        ]
      }
    });
  }

  render() {
    return (
        <div>
          <ul className="list-unstyled float-right">
            <li style={{marginRight: '10px'}}>
              <IconMenu
                iconButtonElement={<IconButton><Exit/></IconButton>}
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
                  onClick={this.logout.bind(this)}
                            />
              </IconMenu>
            </li>
          </ul>
        </div>
    );
  }
}

module.exports = connect(state => ({
  state : state.app.toJS()
}))(NavRightList);
