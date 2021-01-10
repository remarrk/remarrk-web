// import React from "react";
// import { useSelector } from "react-redux";

// import { HashRouter, Redirect, Switch, Route } from "react-router-dom";

// // import { Navbar, Modal } from "./components";

// import Login from "./pages/login/Login";

// // const SecureRoute = ({ isAuthorized, path, redirectTo, children }) => (
// //     <Route path={path}>
// //         { isAuthorized ? children : (<Redirect to={redirectTo}/>) }
// //     </Route>
// // );

// function Router() {
//   const loggedIn = useSelector((state) => state.loggedIn);
//   console.log(loggedIn);
//   // const isHQ = useSelector((state) => state.common.isHQ);

//   return (
//     <div className="app-root">
//       {/* <Modal /> */}
//       <HashRouter>
//         {/* {loggedIn && <Navbar />}
//          */}
//         <Switch>
//           <Route
//             path="/logon"
//             // children={!loggedIn ? <Login /> : <Redirect to={"/login2"} />}
//             children={<Login></Login>}
//           />
//           {/* <Route 
//                         path="/signup" 
//                         children={!loggedIn ? <Login newUser/> : <Redirect to={isHQ ? "hq/dashboard" : "/menu"}/>}
//                     />
//                     <SecureRoute 
//                         isAuthorized={loggedIn && !isHQ}
//                         path={'/menu'}
//                         redirectTo={'/logon'}
//                         children={<Menu/>}
//                     />
//                     <SecureRoute 
//                         isAuthorized={loggedIn && !isHQ}
//                         path={'/orders'}
//                         redirectTo={'/logon'}
//                         children={<Orders/>}
//                     />
//                     <Route 
//                         path="/hq/logon" 
//                         children={!loggedIn ? <Login hq/> : <Redirect to={isHQ ? "hq/dashboard" : "/menu"}/>}
//                     />
//                     <SecureRoute 
//                         isAuthorized={loggedIn && isHQ}
//                         path={'/hq/dashboard'}
//                         redirectTo={'/hq/logon'}
//                         children={<Dashboard/>}
//                     />
//                     <Route 
//                         path="*" 
//                         children={<Redirect to="/logon"/>}
//                     /> */}
//         </Switch>
//       </HashRouter>
//     </div>
//   );
// }

// export default Router;
