import React from 'react'

export default class Navbar extends React.Component {
    state = {}
    toggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    openMenu = (e) => {
        e.preventDefault();
        const parent = e.target.parentNode;
        const status = parent.className.search(' show') + 1;
        const moreMenu = parent.querySelector('div') || parent.querySelector('ul');
        if (moreMenu) {
            if (status) {
                parent.className = parent.className.replace(" show", "");
                moreMenu.className = moreMenu.className.replace(" show", "");
            }
            else {
                parent.className += " show";
                moreMenu.className += " show";
            }
        }
    }
    closeMenu = (e) => {
        const parent = (e.target.parentNode && e.target.parentNode.parentNode) || e.target.parentNode;
        const status = parent.className.search(' show') + 1;
        const moreMenu = parent.querySelector('div') || parent.querySelector('ul');
        if (moreMenu) {
            if (status) {
                parent.className = parent.className.replace(" show", "");
                moreMenu.className = moreMenu.className.replace(" show", "");
            }
            else {
                parent.className += " show";
                moreMenu.className += " show";
            }
        }
    }
    render() {
        return (
            <React.Fragment>
                <nav
                    className="navbar fixed-top navbar-expand-md navbar-light"
                    style={{
                        backgroundColor: "#f1f1f1",
                        borderBottom: "1px solid #ddd",
                        padding: "5px 1rem 4px",
                    }}
                >
                    <a className="navbar-brand" href="/">GAMEMASTER</a>
                    <button className={"navbar-toggler" + (this.state.toggle ? " collapsed" : "")} type="button" onClick={this.toggle} >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={"collapse navbar-collapse text-left h-transition" + (this.state.toggle ? " show" : "")} >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/game" onClick={this.openMenu}>
                                    Chọn game
                                    </a>
                                <div className="dropdown-menu py-0" style={{ backgroundColor: "#f9f9f9" }} onClick={this.closeMenu}>
                                    <a href="/game/pacman" className="dropdown-item px-2 py-1">Pacman</a>
                                    <a href="/game/snake" className="dropdown-item px-2 py-1">Snake</a>
                                    <a href="/game/create" className="dropdown-item px-2 py-1">Tạo game</a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a href="/user" className="nav-link">Tài khoản</a>
                            </li>
                            <li className="nav-item">
                                <a href="/help" className="nav-link">Hỗ trợ</a>
                            </li>
                            <li className="nav-item">
                                <a href="/" className="nav-link">Đăng xuất</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}