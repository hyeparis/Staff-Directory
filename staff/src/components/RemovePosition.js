import React from 'react';

class RemovePosition extends React.Component{

    removePosition(id){
        const url = '/api/staff/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }
    render(){
        return(
            <button onClick={(e) => { this.removePosition(this.props.id)}}>Remove</button>
        )
    }
}

export default RemovePosition;