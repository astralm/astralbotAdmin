import React from 'react';
import KPIsChart from './KPIsChart';

const Main = () => (
  <div className="row">
    <div className="col-xl-6">
      <div className="box box-default">
        <div className="box-body">
          <KPIsChart />
        </div>
      </div>
    </div>
  </div>
    );

const Dashboard = () => (
  <div className="container-fluid no-breadcrumbs page-dashboard">

    <QueueAnim type="bottom" className="ui-animate">
      <Main />
    </QueueAnim>

  </div>
);

module.exports = Dashboard;
