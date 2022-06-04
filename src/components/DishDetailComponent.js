import React from 'react';
import {Card,CardBody,CardImg,CardTitle,CardText}from 'reactstrap';


    
   function RenderDish({dish}){        
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
   function RenderComments({comments}){
        if(comments !=null){
            return(
                <div className='col-12 col-md-5 mt-1'>
                     <h4>comments</h4>
                    {comments.map((comment)=>{
                        return(
                            
                            <div key={comment.id}>                               
                            <p>{comment.comment}</p>
                            <p>--{comment.author},{new Intl.DateTimeFormat('en-US',{year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>                    

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
    const DishDetail =(props)=>{        
        if(props.dish !=null){
            return(
                <div className='container'>
                    <div className='row'>
                        <RenderDish dish={props.dish}/>
                        <RenderComments comments={props.dish.comments}/>    
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

export default DishDetail;