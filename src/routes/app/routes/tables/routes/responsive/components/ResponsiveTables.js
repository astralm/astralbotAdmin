import React from 'react';
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';

const ListFilter = () => (
    <section className="box box-default">
      <div className="box-body">
        <List>
          <div style={{display:'inline-block'}}><ListItem  primaryText="Активные" leftIcon={<ContentInbox />} /></div>
          <div style={{display:'inline-block'}}><ListItem  primaryText="Неактивные" leftIcon={<ActionGrade />} /></div>
          <div style={{display:'inline-block'}}><ListItem  primaryText="Ошибки" leftIcon={<ContentSend />} /></div>
          <div style={{display:'inline-block'}}><ListItem  primaryText="Без ошибок" leftIcon={<ContentDrafts />} /></div>
          <div style={{display:'inline-block'}}><ListItem  primaryText="Сводные" leftIcon={<ContentInbox />} /></div>
          <div style={{display:'inline-block'}}><ListItem  primaryText="Занятые" leftIcon={<ContentInbox />} /></div>
          <div style={{display:'inline-block'}}><ListItem  primaryText="Ваши" leftIcon={<ContentInbox />} /></div>
        </List>
      </div>
    </section>
);

const ResponsiveTable = () => (
  <article className="article">

    <div className="box box-default table-box table-responsive mdl-shadow--2dp">
      <table className="mdl-data-table">
        <thead>
          <tr>
            <th className="numeric">SESSION ID</th>
            <th className="numeric">USER QUESTION</th>
            <th className="numeric">BOT ANSWER</th>
            <th className="numeric">STATUS</th>
            <th className="numeric">ADMINISTRATOR</th>
            <th className="numeric">VIEW</th>
            <th className="numeric"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="numeric">1</td>
            <td className="numeric">Привет</td>
            <td className="numeric">Здравствуйте</td>
            <td className="numeric">Активный</td>
            <td className="numeric">Николай</td>
            <td className="numeric">
              <RaisedButton label="Просмотр" secondary />
            </td>
            <td>
              <RaisedButton  label="Взять" primary />
            </td>
            <td>
              <RaisedButton  label="Отказаться" primary />
            </td>
          </tr>
          <tr>
            <td className="numeric">1</td>
            <td className="numeric">Привет</td>
            <td className="numeric">Здравствуйте</td>
            <td className="numeric">Активный</td>
            <td className="numeric">Николай</td>
            <td className="numeric">
              <RaisedButton label="Просмотр" secondary />
            </td>
            <td>
              <RaisedButton  label="Взять" primary />
            </td>
            <td>
              <RaisedButton  label="Отказаться" primary />
            </td>
          </tr>
          <tr>
            <td className="numeric">1</td>
            <td className="numeric">Привет</td>
            <td className="numeric">Здравствуйте</td>
            <td className="numeric">Активный</td>
            <td className="numeric">Николай</td>
            <td className="numeric">
              <RaisedButton label="Просмотр" to="/dialog" secondary />
            </td>
            <td>
              <RaisedButton  label="Взять" primary />
            </td>
            <td>
              <RaisedButton  label="Отказаться" primary />
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  </article>
);




const Page = () => (
  <section className="container-fluid with-maxwidth chapter">
    <QueueAnim type="bottom" className="ui-animate">
      <div key="2"><ListFilter /></div>
      <div key="1"><ResponsiveTable /></div>
    </QueueAnim>
  </section>
);

module.exports = Page;
