import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import RemovePosition from './RemovePosition';
import EditStaff from './EditStaff';

class Staff extends React.Component{
    render(){
        return(
            <TableRow>
                <TableCell>{this.props.first_name} {this.props.last_name} ( {this.props.id} )</TableCell>
                <TableCell
                    ><EditStaff stateRefresh={this.props.stateRefresh} id={this.props.id} />
                    <RemovePosition stateRefresh={this.props.stateRefresh} id={this.props.id} />
                </TableCell>
            </TableRow>
        );
    }
}

export default Staff;