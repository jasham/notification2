import React,{ Component} from 'react';
import { db } from '../firebase/firebase'

class Course extends Component{
    constructor(props) {
        super(props);
        this.state = {
          courses: []
        };
      }

    componentDidMount(){
        db.collection("course")
        .get()
        .then(querySnapshot => {
          if(!querySnapshot.empty){
                const data = querySnapshot.docs.map(doc => doc.data());
                this.setState({
                    courses: data
                })
            }
        })
    }

    render(){
        return(
            <div>
                <ul>
                    {this.state.courses.map(course => {
                        return(
                            <p>{course.title}</p>
                        )
                    })}
                </ul>
            </div>

        )
    }
}

export default Course;