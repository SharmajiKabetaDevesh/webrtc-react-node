import './App.css';
import Home from './pages/Home/Home'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import NavBar from './components/Shared/Navigation/Navigation'
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
const isAuth=false;
const user={
  activated:false
}
function App() {
  return (
    
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





      </Switch>
      
      </BrowserRouter>

    
  );
}

const GuestRoute = ({ children, ...rest }) => {


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
