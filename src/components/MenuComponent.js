import React, {Component} from "react";
import {Card, CardImg, CardTitle, CardImgOverlay} from "reactstrap";
import DishDetail from "./DishDetailComponent";


class Menu extends Component {
    componentDidMount(){
        console.log("Menu Component componentDidMount invoked")
    }
    componentDidUpdate(){
        console.log("Menu Component componentUpdate invoked")
    }
    
    constructor(props){
        console.log("Menu Component constructor invoked")
        super(props);
        this.state={
            selectedDish:null        
        }

    }
    onDishSelect(dish){
        this.setState({selectedDish:dish});
    }

     
    

    render(){
        console.log("Menu Component render invoked")
        const menu=this.props.dishes.map((dish)=>{
            return(
                <div key={dish.id} className="col-12 col-md-5 mt-5">
                    <Card onClick={()=>this.onDishSelect(dish)}>                        
                        <CardImg width="100%" src={dish.image} value={dish.name}/>                       
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>                           
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return(
            <div className="container">
                <div className="row">                   
                        {menu}           
                </div>
                <div className="row">
                    <DishDetail dish={this.state.selectedDish}/>           
                </div>
            </div>
        );
    }

}
export default Menu;