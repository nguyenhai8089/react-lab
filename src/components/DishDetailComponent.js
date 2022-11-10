import React,{Component} from 'react';
import {Card,CardBody,CardImg,CardTitle,CardText,Breadcrumb, BreadcrumbItem, ModalHeader, ModalBody, Button}from 'reactstrap';
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import {Modal,Row,Label,Col} from 'reactstrap';
import { LocalForm,Control } from 'react-redux-form';
import {Loading} from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl';


    
   function RenderDish({dish}){     
     
            return(
                <div className='col-12 col-md-5 mt-1'>
                    <Card>
                        <CardImg key={dish.id} width="100%" src={baseUrl+dish.image} atl={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>

                </div>
            );    
    }
   
    function RenderComments({comments,dishId,addComment}) {
        if (comments != null)
        return (
            <div className ="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} </p>
                                <p>{dateFormat(comment.date , 'dd/mm/yyyy')}</p>
                            </li>
                        )
                    })}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment}/>
            </div>
        );
        else
            return(
                <div></div>
            )             
    }
    const DishDetail =(props)=>{ 
        if(props.isLoading){
            return(
                <div className ="container">
                    <div className="row">
                        <Loading />
                    </div>

                </div>
            )
        } else if(props.errMess){
            return(
                <div className='container'>
                    <div className='row'>
                        <h4>{props.errMess}</h4>
                    </div>

                </div>
            )
        }else if(props.dish !=null){
            return(
                <div className='container'>
                    <div className='row'>
                        <Breadcrumb>
                             <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                             <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>


                    </div>
                    <div className='row'>
                        <RenderDish dish={props.dish}/>
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        
                        /> 

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
    class CommentForm extends Component {
        constructor(props){
            super(props);
            this.state={
                isNavOpen: false,
                isModalOpen:false
            }
            this.toggleModal=this.toggleModal.bind(this)
            this.handleSubmit=this.handleSubmit.bind(this)
        }
        toggleModal(){
            this.setState({isModalOpen:!this.state.isModalOpen})
        }
        handleSubmit(value){ 
            console.log(this.props.addComment)           
            this.props.addComment(
                this.props.dishId,
                value.rating,
                value.author,
                value.comment
            )
        }
        render(){
            return(
                <div>
                    <button outline onClick={this.toggleModal}>
                        <span className='fa fa-pencil fa-lg'></span> Submit Comment
                    </button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>
                            Submit comment
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={this.handleSubmit}>
                                <Row className='form-group'>
                                    <Label htmlFor='rating' md={4}>Rating</Label>
                                    <Col md={8}>                                    
                                        <Control.select 
                                            model='.rating'
                                            id='rating'
                                            className='form-control'
                                            defaultValue='2'
                                        >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>                                       

                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor='author' md={4}>Your name</Label>
                                    <Col md={8}> 
                                        <Control.text
                                            model='.author'
                                            className='form-control'
                                            id='author'
                                        >
                                            
                                        </Control.text>
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor='comment' md={4}>Comments</Label>
                                    <Col md={8}>
                                        <Control.textarea
                                            model='.comment'
                                            id='comment'
                                            className='form-control'
                                            rows='10'
                                        >                                        
                                    </Control.textarea>

                                    </Col>                                    
                                </Row>
                                <Button  color='primary'>
                                    Submit

                                </Button>

                            </LocalForm>

                        </ModalBody>

                    </Modal>
                </div>
            );
        }
    }

export default DishDetail;
