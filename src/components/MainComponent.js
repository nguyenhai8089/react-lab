import React, {Component} from 'react';
/* import logo from './logo.svg'; */
/* import {Navbar, NavbarBrand} from 'reactstrap'; */
import Menu from "./MenuComponent";
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import{Switch,Route,Redirect, withRouter} from 'react-router-dom';
import Contact from './ContactComponent';
import {connect} from 'react-redux';
import About from './AboutComponent';
import { addComment,fetchDishes } from '../redux/ActionCreators';


const mapStateToProps = (state)=>{
  return{
    dishes:state.dishes,
    comments:state.comments,
    leaders:state.leaders,
    promotions:state.promotions
  };
};
const mapDispatchToProps = (dispatch)=>({
  addComment:(dishId, rating, author, comment)=>dispatch(addComment(dishId, rating,author,comment)),
  fetchDishes:()=>{                    /* truyền phương thức "fetchDishes" gọi đến file quản lý ActionCreators */
    dispatch(fetchDishes())
  }
})

class Main extends Component {
  
  componentDidMount(){                /* khởi chạy theo "life circle", hàm này được gọi sau khi chạy hàm render() trong life circle */
    this.props.fetchDishes();
  }
  render() {
    const HomePage = () => {
      return (
        <Home 
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}    /* truy cập vào props truyền qua redux tìm tới --> tại file (configureStore.js)-> dishes:Dishes --> đi tới file reducer của dish (file dishes.js)-> tại file (dishes.js) nhận state được cập nhận giá trị khi action được gọi "ActionTypes.ADD_DISHES",lý do "ActionTypes.ADD_DISHES" do life circle gọi hàm componentDidMount()-> tới file actionCreator.js ->fetchDishes()->dispatch(addDishes(DISHES))->gọi action "addDishes(DISHES)" giá trị dish={this.props.dishes.dishes} = action.payload==={DISHES}*/
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}          
        />
      );
    }
    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}  /* đọc chú thích dish của <Home/> bên trên */
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            addComment={this.props.addComment}
          />
      );
    };

    return (
      <div>
        <Header />
        <Switch>  
          <Route path='/home' component={HomePage} />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path='/aboutus' component={()=> <About leaders={this.props.leaders}/>} />
          <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes.dishes} />} />           {/* đọc chú thích dish của <Home/> bên trên */}
          <Route exact path='/contactus' component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
    
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));


