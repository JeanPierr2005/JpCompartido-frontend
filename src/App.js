import "./App.css";
import ListUserComponent from "./components/ListUserComponent.js";
import HeaderComponent from "./components/HeaderComponent.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddUserComponent from "./components/AddUserComponent";

function App() {
    return (
        <div>
            <BrowserRouter>
                <HeaderComponent />
                <div className="container">
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={<ListUserComponent />}
                        ></Route>
                        <Route
                            path="/List"
                            element={<ListUserComponent />}
                        ></Route>
                        <Route
                            path="/Register"
                            element={<AddUserComponent />}
                        ></Route>
                        <Route
                            path="/Modificar/:id"
                            element={<AddUserComponent />}
                        ></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
