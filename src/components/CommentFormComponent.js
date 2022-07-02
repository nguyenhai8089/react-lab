import React,{Component}from 'react';
import {Button,Col, Modal,ModalBody,ModalHeader,Form,FormGroup,Input,Label} from 'reactstrap';
import{Control,LocalForm,Errors} from 'react-redux-form';

const required=(val)=>val&&val.length;
const maxLength=(len)=>(val)=>!(val)||(val.length<=len);
const minLength=(len)=>(val)=>!(val)||(val.length>=len);
const isNumber=(val)=>!isNaN(Number(val));
const validEmail=(val)=>/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class CommentForm extends Component {
    constructor(props){
        super(props);       
        this.handleSubmit=this.handleSubmit.bind(this);       
    }
        
    handleSubmit(value){
        console.log('Current State is:'+JSON.stringify(value));
        alert('Current State is:'+JSON.stringify(value));        
    }
     
    render(){       
        return(
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleLogin}>
                        <FormGroup>
                            <Label htmlFor='username'>Username</Label>
                            <Input type='text' id='username' name='username' innerRef={(input)=>this.username=input}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='password'>Password</Label>
                            <Input type='passwork' id='password' name='password' innerRef={(input)=>this.password=input}></Input>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                 <Input type='checkbox' name='remember' innerRef={(input)=>this.remember=input}></Input> Remember me
                            </Label>                            
                        </FormGroup>
                        <Button type='submit' value='submit' color='primary'>Login</Button>
                    </Form>

                </ModalBody>
             </Modal>
        );
    }
    
}

export default CommentForm;