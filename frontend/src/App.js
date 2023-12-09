import './App.css';
import Home from './pages/Home/Home'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import NavBar from './components/Shared/Navigation/Navigation'
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import{useState} from'react'
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/Shared/Loader/Loader';
import Room from './pages/Room/Room';
function App() {

  //call refresh endpoint
const {loading}=useLoadingWithRefresh();
  return (
    loading ?(
      <Loader/>
    ):(
    
      <BrowserRouter>
      <NavBar/>
     
      <Switch>
      
        <GuestRoute path="/" exact>
        <Home/>
        
        </GuestRoute>
        

        <GuestRoute path="/authenticate" exact>
          <Authenticate/>
        </GuestRoute>

      <SemiProtected path='/activate'>
<Activate/>

      </SemiProtected>

           
   
<Protected path='/rooms'>

  <Rooms/>

</Protected>

<Protected path='/room/:id'>

  <Room/>

</Protected>



      </Switch>
      
      </BrowserRouter>
    )
    
  );
}

const GuestRoute = ({ children, ...rest }) => {
const {isAuth}=useSelector((state)=>state.auth)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/rooms',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};






const SemiProtected=({children,...rest})=>{
  const {user,isAuth}=useSelector((state)=>state.auth)
  return <Route {...rest}
  render={({location})=>{
    return(
      !isAuth ?
      (
        <Redirect to={{
          pathname:'/',
          state:{from:location}
        }}/>
      )
      : isAuth && !user.activated ?
      (children): 
      <Redirect to={{
        pathname:'/rooms',
        state:{from:location}
      }}/>


    )
  }}

  
  ></Route>


}




const Protected=({children,...rest})=>{
  const {user,isAuth}=useSelector((state)=>state.auth)
return <Route
{...rest}
render={({location})=>{
return !isAuth ?(
  <Redirect to={{
    pathname:'/',
    state:{from:location},
  }}
  />
)
: isAuth && !user.activated ?(
  <Redirect to={{
    pathname:'/activate',
    state:{from:location}
  }}/>
):(
 children
)


}}



></Route>
}


export default App;
