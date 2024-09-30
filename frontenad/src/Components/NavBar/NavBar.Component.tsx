import "./NavBar.scss";
import { Link ,useLocation} from "react-router-dom";
import { Menu, DarkMode, LightMode } from "@mui/icons-material";
import { ToggleButton } from "@mui/material";
import { ThemeContext } from "../../Context/theme.context";
import { useContext, useEffect, useState } from "react";

const links = [
    { href: "/", label: "الصفحة الرئيسية" },
    { href: "/Companies", label: "الشركات" },
    { href: "/jobs", label: "الوظائف" },
    { href: "/candidate", label: "الترشيحات" },
];
export const NavBar = () => {
    const [open, setOpen] = useState<boolean>(false);
   const { darkMode, toggleDarkMode } = useContext(ThemeContext);
   useEffect(() => {
    console.log("menuStyles:", open ? "menu open" : "menu");
 }, [open]);

   const ToggleOpenMenu = () => {
    setOpen((prevState) => {
       console.log("Previous state:", prevState);
       console.log("New state:", !prevState);
       return !prevState;
    });
 };

   const menuStyles = open ? "menu open" : "menu";
   const location = useLocation();

  return (
    <div className="navbar">
       <div className="brand">
          <h2>Resume Management</h2>
       </div>
       <div className={menuStyles}>
          <ul>
             {links.map((item) => (
                <li  key={item.href} onClick={ToggleOpenMenu}>
                   <Link 
                   to={item.href}
                   style={{ fontWeight: location.pathname === item.href ? "bold"  : "normal" }}
                   >{item.label}
                   
                   </Link>
                </li>
             ))}
          </ul>
       </div>
       <div className="hamburger">
          <Menu onClick={ToggleOpenMenu} />
       </div>
       <div className="toggle">
          <ToggleButton value={"check"} selected={darkMode} onChange={toggleDarkMode}>
             {darkMode ? <LightMode /> : <DarkMode />}
          </ToggleButton>
       </div>
    </div>
 );
};
