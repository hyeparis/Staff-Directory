import React, {Component} from 'react';
import './App.css';
import Paper from '@mui/material/Paper';
import Staff from './components/Staff';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      staff: '',
      positions: ''
    }
  }

  stateRefresh = () => {
    this.setState({
      staff: '',
      positions: ''
    });
    this.callApi()
    .then(res => this.setState({ staff: res }))
    .catch(err => console.log(err));

    this.callApi2()
    .then(res => this.setState({ positions: res }))
    .catch(err => console.log(err));
  }
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ staff: res }))
      .catch(err => console.log(err));
    this.callApi2()
      .then(res => this.setState({ positions: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/staff');
    const body = await response.json();
    return body;
  }

  callApi2 = async () => {
    const response = await fetch('/api/positions');
    const body = await response.json();
    return body;
  }

  render(){
    return (
      <div>
        <Paper>
          <Table>
            {
              this.state.positions ? this.state.positions.map(p => {
                return(
                  <TableBody>
                    <TableCell>{p.title} ( {p.position_number} ) </TableCell>
                    <TableCell></TableCell>
                      {
                        this.state.staff ? this.state.staff.map(s => {
                          return(
                            s.position_id == p.id ?
                            <Staff
                              stateRefresh={this.stateRefresh}
                              key={s.id}
                              id={s.id}
                              position_id={s.position_id}
                              first_name={s.first_name}
                              last_name={s.last_name}
                            /> : ""
                          );
                        }) : ""
                      }
                    </TableBody>
                );
              }) : ""
            }
            <TableCell>Vacant Position</TableCell>
            <TableCell></TableCell>
            {
              this.state.staff ? this.state.staff.map(s => {
                return(
                  s.position_id == 0 ?
                  <Staff
                    stateRefresh={this.stateRefresh}
                    key={s.id}
                    id={s.id}
                    position_id={s.position_id}
                    first_name={s.first_name}
                    last_name={s.last_name}
                  /> : ""
                );
              }) : ""
            }
          </Table>
        </Paper>
      </div>
    );
  }
}

export default App;