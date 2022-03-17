// import 'antd/dist/antd.css';
// import GoogleLogin from 'react-google-login'
// import { useState } from 'react';
import { DataProvider } from './GlobalState';
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/headers/Header';
import Pages from './components/mainpages/Pages';


function App() {
  // const [loginData, setLoginData] = useState(
  //   localStorage.getItem('loginData')
  //     ? JSON.parse(localStorage.getItem('loginData'))
  //     : null
  // );

  //  const handleLogin = async (googleData) => {
  //   const res = await fetch('/api/google-login', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       token: googleData.tokenId,
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   const data = await res.json();
  //   setLoginData(data);
  //   localStorage.setItem('loginData', JSON.stringify(data));
  // };
  
  // const handleFailure = (googleData) => {
  //   console.log('googleData', googleData)
  // }
          
  // const handleLogout = () => {
  //   localStorage.removeItem('loginData');
  //   setLoginData(null);
  // };
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header/>
          <Pages/>
        </div>
      </Router>
    </DataProvider>
    // <div className="App">
    //   <header className='app-header'>
    //     <h1>Login google</h1>
    //     <div>
    //       {
    //         loginData ? (
    //           <div>
    //             <h3>You logged in as {loginData.email}</h3>
    //             <button onClick={handleLogout}>Logout</button>
    //           </div>
    //         ) : (
    //           <GoogleLogin
    //           clientId={"920770429908-h81ptdrcn8vvc582c92lp27fotbqgj63.apps.googleusercontent.com"}
    //           buttonText="Log in with Google"
    //           onSuccess={handleLogin}
    //           onFailure={handleFailure}
    //           cookiePolicy={'single_host_origin'}>
    //           </GoogleLogin>
    //         )
    //       }
    //     </div>
    //   </header>
    // </div>
  );
}

export default App;
