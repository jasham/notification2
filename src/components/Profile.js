import React,{ Component } from 'react';
import { db } from '../firebase/firebase'
import DeleteUser from './DeleteUser'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          profiles: []
        };
      }
      

    componentDidMount(){
        db.collection("profile")
        .get()
        .then(querySnapshot => {
          if(!querySnapshot.empty){
                const data = querySnapshot.docs.map(doc => {
                  const data = doc.data()
                  const id = doc.id
                  return { id, ...data }
                });
                console.log(data)
                this.setState({
                    profiles: data
                })
            }
        })
    }


    deleteUser = (docId) => {
      console.log("DocId:",docId)
      db.collection("profile").doc(docId)
      .delete()
      .then(() => {
            alert("Document successfully deleted!")
            this.componentDidMount()
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });      
    }
    // deleteUser = (docId) => {
    //     const testUser = db.collection("profile").where('mobile_number','==','1234567890');
    //     testUser
    //     .get()
    //     .then(querySnapshot => {
    //       console.log(querySnapshot)
    //       if(!querySnapshot.empty){
    //         querySnapshot.forEach(doc => {
    //           doc.ref.delete()
    //           .then(() => {
    //             alert("Document successfully deleted!")
    //             this.componentDidMount()
    //           }).catch((error) => {
    //             console.error("Error removing document: ", error);
    //           })
    //         })        
    //       } else {  
    //         alert("Document doesn't exist!")
    //       }
    //     }).catch(error => {
    //       console.error("Something went wrong", error);
    //     })
    //   }

    render(){
        return(
            <div className={useStyles.root}>
                <b>Profile Users</b>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.profiles.map(profile => {
                        return(
                          <TableRow key={profile.id}>
                            <TableCell>
                              <span style={profile.mobile_number === '1234567890' ? {color: 'red'} : {color: 'black'}}>{ 'mobile_number' in profile 
                                    ? profile.mobile_number === null 
                                    ? "No Phone Number" 
                                    : profile.mobile_number 
                                    : profile.phone_number }
                              </span>
                            </TableCell>
                            <TableCell>
                            { typeof profile.full_name === 'string' 
                                    ? profile.full_name
                                    : profile.full_name.first_name}
                            </TableCell>
                            <TableCell>
                              <DeleteUser onDeleteUser={this.deleteUser} docId={profile.id}/>
                            </TableCell>
                          </TableRow>
                        )
                    })}
                    {/* <DeleteUser onDeleteUser={this.deleteUser} /> */}
                    </TableBody>
                </Table>
            </div>

        )
    }
}

export default Profile;