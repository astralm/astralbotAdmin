import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

class Clients extends React.Component {
	render(){
		return <Paper className="col-md-12" style={{paddingTop: "10px", paddingBottom: "10px"}}>
			<div className="box box-default table-box table-responsive mdl-shadow--2dp">
				<table className="mdl-data-table table-bordered table-striped cf no-margin">
					<thead className="cf">
	                    <tr>
	                        <th>
	                            <div>
	                                ID
	                            </div>
	                        </th>
	                        <th>
	                            <div>
	                                ДАТА
	                            </div>
	                        </th>
	                        <th>
	                            <div>    
	                                ИМЯ
	                            </div>
	                        </th>
	                        <th>
	                            <div>    
	                                EMAIL
	                            </div>
	                        </th>
	                        <th>
	                            <div>
	                                ТЕЛЕФОН
	                            </div>
	                        </th>
	                        <th>
	                            <div>    
	                                ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ
	                            </div>
	                        </th>
	                        <th>ПОСМОТРЕТЬ</th> 
	                    </tr> 
                    </thead>
                    <tbody>
                    	{
                    		this.props.clients.map((client, key) => (
                    			<tr key = {key}>
                    				<td>{ client.client_id }</td>
                    				<td>{ client.client_date }</td>
                    				<td>{ client.client_name }</td>
                    				<td>{ client.client_email }</td>
                    				<td>{ client.client_phone }</td>
                    				<td>{ client.client_info }</td>
                    				<td>
                                        <i className="material-icons" style={{cursor: "pointer"}}>remove_red_eye</i>
                                    </td>
                    			</tr>
                    		))
                    	}
                    </tbody>
				</table>
			</div>
		</Paper>
	}
}

module.exports = connect(state => ({
	clients: state.app.get('clients') || [
		{
			client_id: 1,
			client_date: "12.32.12 32:32:12",
			client_name: "Петор",
			client_email: "petor@ivanovich.ru",
			client_phone: "+78924212443",
			client_info: "очень клиент дофига"
		},
		{
			client_id: 2,
			client_date: "12.32.12 32:32:12",
			client_name: "Петрарка",
			client_email: "pertrarka@libovski.ru",
			client_phone: "+1242124421",
			client_info: "очень клиент дофига 2"
		}
	]
}))(Clients);