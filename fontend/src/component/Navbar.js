import React from 'react';

export default class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false
    }
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render(){
    return (
      <div>
        <nav color="light">
          <a href="/">reactstrap</a>
          <div onClick={this.toggle} />
          <div isOpen={this.state.isOpen}>
            <div className="mr-auto">
              <div>
                <a href="/components/">Components</a>
              </div>
              <div>
                <a href="https://github.com/reactstrap/reactstrap">GitHub</a>
              </div>
              <div>
                <div>
                  Options
                </div>
                <div>
                  <div>
                    Option 1
                  </div>
                  <div>
                    Option 2
                  </div>
                  <div />
                  <div>
                    Reset
                  </div>
                </div>
              </div>
            </div>
            <span>Simple Text</span>
          </div>
        </nav>
      </div>
    );
  }
}