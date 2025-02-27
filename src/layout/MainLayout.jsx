import { Outlet } from "react-router-dom";
import Header from "../assets/components/Header";



const MainLayout = () => {
    return (
        <div className="w-11/12 mx-auto">
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;