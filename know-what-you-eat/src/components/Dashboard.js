import {React,Component} from "react";
import ImageLoader from './ImageLoader';
import NavbarComponent from './NavbarComponent';
import 
class Dashboard extends Component{
    render(){
        return(
            <div>
               <NavbarComponent userLogginStatus={"Logout"} />
               <ImageLoader /> 
            </div>
        );
    }
}
export default Dashboard;