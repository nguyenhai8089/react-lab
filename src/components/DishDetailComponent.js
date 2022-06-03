import React, {Component}from 'react';
import {Card,CardBody,CardImg,CardTitle,CardText}from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
        console.log("Detail Component constructor invoked")
    }
    componentDidMount(){
        console.log("Detail Component componentDidMount invoked")
    }
    componentDidUpdate(){
        console.log("Detail Component componentUpdate invoked")
    }
    renderDish(dish){
        if(this.props.dish != null){
            return(
                <div className='col-12 col-md-5 mt-1'>
                    <Card>
                        <CardImg key={dish.id} width="100%" src={dish.image} atl={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>

                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }

    }
    renderComments(comments){
        if(comments !=null){
            return(
                <div className='col-12 col-md-5 mt-1'>
                     <h4>comments</h4>
                    {comments.map((comment)=>{
                        return(
                            
                            <div key={comment.id}>                               
                            <p>{comment.comment}</p>
                            <p>--{comment.author},{comment.date}</p>                    

                        </div>
                        );
                        
                        
                    })}
                    


                </div>
            );
        }
        else{
            return(
                <div> </div>
            );
        }

    }
    render(){
        console.log("Detail Component render invoked")
        if(this.props.dish !=null){
            return(
                <div className='container'>
                    <div className='row'>
                        {this.renderDish(this.props.dish)}
                        {this.renderComments(this.props.dish.comments)}
    
                    </div>
    
                </div>
            );          

        }
        else{
            return(
                <div></div>
            );
        }
       

    }
}
export default DishDetail;