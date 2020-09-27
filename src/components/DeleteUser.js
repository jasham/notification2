import React,{Component} from 'react';
import Button from '@material-ui/core/Button';

class DeleteUser extends Component{

    deleteUser = () =>{
        this.props.onDeleteUser(this.props.docId)
    }
    
    render() {
      return (
        <div className="row">
            <Button
            variant="contained"
            color="secondary"
            onClick={this.deleteUser}>
              Delete Me!
            </Button>
        </div>
      );
    }
  }
  
  
  export default DeleteUser;
  