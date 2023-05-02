import React from 'react';

class EditStaff extends React.Component{

    editStaff(id){
        const url = '/api/staff/' + id;
        fetch(url, {
            method: 'PUT'
        });
        this.props.stateRefresh();
    }
    render(){
        return(
            <button onClick={(e) => { this.editStaff(this.props.id)}}>Edit</button>
        )
    }
}

export default EditStaff;