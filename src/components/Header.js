import React,{Component} from "react";
import {Navbar,NavbarBrand,Nav,NavbarToggler,Collapse,NavItem} from 'reactstrap';
import {NavLink} from 'react-router-dom';


class Header extends Component {

    constructor(props){
        super(props);
        this.state={
            isNavOpen:false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    render() {
        return(
            <React.Fragment>
                <Navbar dark  expand={"md"} className={"navBar"}>
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className={"mr-auto"} href="/">
                            <img src="/assets/logo/logo.png" height={"30"} width={"30"} alt="Logo" className="logo"/>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>

                            <Nav navbar>
                           
                                <NavItem>
                                    <NavLink className={"nav-link"} to="/staffs">
                                        <span className="fa fa-users fa-lg"></span>
                                        <span> Nhân viên</span>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className={"nav-link"} to="/departments">
                                        <span className="fa fa-id-card fa-lg"></span>
                                        <span> Phòng Ban</span>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className={"nav-link"} to="/staffsSalary">
                                        <span className="fa fa-money fa-lg"></span>
                                        <span> Bảng Lương</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>

                        </Collapse>
                    </div>
                </Navbar>
                
            </React.Fragment>
        )
    }
}

export default Header;