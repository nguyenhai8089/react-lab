import React ,{Component} from 'react';
import {Card,CardBody,CardImg,CardTitle,CardText,Breadcrumb, BreadcrumbItem,Button,
    Modal,ModalBody,ModalHeader,Form,FormGroup,Label}from 'reactstrap';
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import{Control,LocalForm,Errors} from 'react-redux-form';

const required=(val)=>val&&val.length;
const maxLength=(len)=>(val)=>!(val)||(val.length<=len);
const minLength=(len)=>(val)=>!(val)||(val.length>=len);
    
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
   
class RenderComments extends Component {
    constructor(props) {
        super(props);
        this.state={isModalOpen:false};        
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }    
    toggleModal(){
        this.setState({isModalOpen:!this.state.isModalOpen});
    }
    
    handleSubmit(value){
        console.log('Current State is:'+JSON.stringify(value));
        alert('Current State is:'+JSON.stringify(value));        
    }
    render(){
        const comments=this.props.comments
        if (comments != null)
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((comment) => {
                            return (
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>--{comment.author} </p>
                                    <p>{dateFormat(comment.date, 'dd/mm/yyyy')}</p>
                                </li>
                            );
                        })}
                        <Button outline onClick={this.toggleModal}>
                            <spam className='fa fa-pencil fa-lg'></spam> Submit Comment
                        </Button>
                    </ul>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader>Submit Comment</ModalHeader>
                        <ModalBody>
                        <LocalForm onSubmit={(value)=>this.handleSubmit(value)}>
                                <FormGroup>
                                    <Label htmlFor='rating'>Rating</Label>                                    
                                    <Control.select model='.rating' name='rating' className='form-control'>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>  
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </Control.select>                                                                                          
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor='author'>Your Name</Label>
                                    <Control.text model='.author' 
                                    id='author' 
                                    placeholder='your name' 
                                    name='author'
                                    className='form-control'
                                    validators={{required,
                                    minLength:minLength(3),
                                    maxLength:maxLength(15)
                                    }}/>  
                                        
                                    <Errors 
                                        className='text-danger'
                                        model=".author"
                                        show='touched'
                                        messages={{
                                        required:"Required",
                                        minLength:"Must be greater than 2 characters",
                                        maxLength:"Must be 15 characters or less"
                                    }}/>                            
                                   
                                </FormGroup>
                                <FormGroup>
                                <Label htmlFor='comment'>Comment</Label>
                                    <Control.textarea model='.comment' rows='12' id='comment' placeholder='message' name='comment' className='form-control'/>
                                </FormGroup>
                                <Button type='submit' value='submit' color='primary'>Submit</Button>                                
                            </LocalForm>                        

                        </ModalBody>
                    </Modal>
                </div>
            );

        else
            return (
                <div></div>
            );

    }
        
    }

    const DishDetail =(props)=>{    
                 
        if(props.dish !=null){
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
                        <RenderComments comments={props.comments}/>                        
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
