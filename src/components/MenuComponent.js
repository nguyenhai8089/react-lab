import React, {Component} from "react";
import {Card, CardImg, CardTitle, CardImgOverlay} from "reactstrap";



class Menu extends Component {   

    render(){
        console.log("Menu Component render invoked")
        const menu=this.props.dishes.map((dish)=>{
            return(
                <div key={dish.id} className="col-12 col-md-5 mt-5">
                    <Card onClick={()=>this.props.onClick(dish.id)}>                        
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
                             
                </div>
            </div>
        );
    }

}
export default Menu;