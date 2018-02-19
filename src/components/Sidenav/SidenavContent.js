import React from 'react';
import { Link, hashHistory } from 'react-router';
import {connect} from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Folder from 'material-ui/svg-icons/file/folder';
import People from 'material-ui/svg-icons/social/people';
import Work from 'material-ui/svg-icons/action/work';
import Android from 'material-ui/svg-icons/action/android';
import Face from 'material-ui/svg-icons/action/face';
import Settings from 'material-ui/svg-icons/action/settings';
import Copy from 'material-ui/svg-icons/content/content-copy';
import Volume from 'material-ui/svg-icons/av/volume-up';
class SidebarContent extends React.Component {
  goTo(props){
    this.props.dispatch({
      type: "Query",
      middleware: true,
      data: {
        query: "changePage",
        values: [
          this.props.state.user.hash,
          this.props.state.socket.hash,
          props.page_id,
          props.item_id || 0
        ]
      }
    })
  }
  render() {
    return <List>
      <ListItem 
        primaryText="Сессии"
        primaryTogglesNestedList={true}
        style={{color: "#fff"}}
        leftIcon={<Folder color="#fff" />}
        key={1}
        nestedItems={[
          <ListItem
            style={{color: "#fff"}}
            key={1}
            onClick={this.goTo.bind(this, {page_id: 8})}
            primaryText="Все сессии"
          />,
          <ListItem
            style={{color: this.props.state.dialog && this.props.state.dialog.dialog_id ? "#fff" : "#908f8f"}}
            key={2}
            disabled={this.props.state.dialog && this.props.state.dialog.dialog_id ? false : true}
            onClick={this.goTo.bind(this, {page_id: 9, item_id: this.props.state.dialog && this.props.state.dialog.dialog_id || 0})}
            primaryText="Последняя"
          />
        ]}
      />
      <ListItem 
        primaryText="Клиенты"
        primaryTogglesNestedList={true}
        style={{color: "#fff"}}
        leftIcon={<People color="#fff" />}
        nestedItems={[
          <ListItem
            style={{color: "#fff"}}
            key={1}
            onClick = {this.goTo.bind(this, {page_id: 10})}
            primaryText="Все клиенты"
          />,
          <ListItem
            style={{color: this.props.state.client && this.props.state.client.client_id ? "#fff" : "#908f8f"}}
            key={2}
            disabled={this.props.state.client && this.props.state.client.client_id ? false : true}
            onClick = {this.goTo.bind(this, {page_id: 11, item_id: this.props.state.client && this.props.state.client.client_id || 0})}
            primaryText="Последний"
          />
        ]}
      />
      {
        this.props.state.organization.type_id == 3 &&
        <ListItem 
          primaryText="Организации"
          primaryTogglesNestedList={true}
          style={{color: "#fff"}}
          leftIcon={<Work color="#fff" />}
          nestedItems={[
            <ListItem
              style={{color: "#fff"}}
              key={1}
              onClick={this.goTo.bind(this, {page_id: 17})}
              primaryText="Все организации"
            />,
            <ListItem
              style={{color: this.props.state.viewOrganization && this.props.state.viewOrganization.organization_id ? "#fff" : "#908f8f"}}
              key={2}
              disabled={this.props.state.viewOrganization && this.props.state.viewOrganization.organization_id ? false : true}
              onClick={this.goTo.bind(this, {page_id: 20, item_id:this.props.state.viewOrganization && this.props.state.viewOrganization.organization_id || 0})}
              primaryText="Последняя"
            />
          ]}
        />
      }
      <ListItem 
        primaryText="Боты"
        primaryTogglesNestedList={true}
        style={{color: "#fff"}}
        leftIcon={<Android color="#fff" />}
        nestedItems={[
          <ListItem
            style={{color: "#fff"}}
            key={1}
            onClick={this.goTo.bind(this, {page_id: 23})}
            primaryText="Все боты"
          />,
          <ListItem
            style={{color: this.props.state.bot && this.props.state.bot.bot_id ? "#fff" : "#908f8f"}}
            key={2}
            disabled={this.props.state.bot && this.props.state.bot.bot_id ? false : true}
            onClick={this.goTo.bind(this, {page_id: 24, item_id:this.props.state.bot && this.props.state.bot.bot_id || 0})}
            primaryText="Последний"
          />
        ]}
      />
      <ListItem
        style={{color: "#fff"}}
        leftIcon={<Face color="#fff" />}
        primaryText="Администраторы"
        onClick={this.goTo.bind(this, {page_id: 12})}
      />
      <ListItem
        style={{color: "#fff"}}
        leftIcon={<Settings color="#fff" />}
        primaryText="Профиль"
        onClick={this.goTo.bind(this, {page_id: 13})}
      />
      <ListItem
        style={{color: "#fff"}}
        leftIcon={<Volume color="#fff" />}
        primaryText="Рассылка"
        onClick={this.goTo.bind(this, {page_id: 16})}
      />
      <ListItem
        style={{color: "#fff"}}
        leftIcon={<Copy color="#fff" />}
        onClick={this.goTo.bind(this,{page_id: 22})}
        primaryText="Виджеты"
      />
    </List>
  }
}

module.exports = connect(state => ({
  state: state.app.toJS()
}))(SidebarContent);
