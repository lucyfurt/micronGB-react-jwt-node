import React, { Component } from 'react';
import './home.css';

class App extends Component {
    render() {
        return (
            <div className="app-container">
                <div className="menu">
                    <ul>
                        <li></li>
                    </ul>
                </div>
                <div className="body">
                    <h1 className="main-heading">MICRON GD</h1>
                    <div className="button-container">
                
                        
                    </div>
                   
                </div>
                <div className= "custom-button">
                <a href='#'>Institucional</a>     
                <a href='#'>Nossos serviços</a>
                <a href='#'>Equipe técnica</a>
                <a href='#'>Fale conosco</a>
                </div>
              
                <div className= "custom-button">
                <a href="/login">ACESSE A ÁREA DO CLIENTE CLICANDO EM C.F. SERVICES </a>
                </div>
                
            </div>
        );
    }
}

export default App;
