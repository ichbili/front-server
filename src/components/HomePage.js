import React from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends React.Component{
  state = {
    qualification: '',
    qualif: ['A', 'B', 'C', 'D']
  };
  intervalId = null;
  inter = 0;
  iter = 0; 
  leng = this.state.qualif.length;  
  itterate = () => {
      const qualification = this.state.qualif[this.iter];
      this.setState({qualification});
      if(this.inter === 2) clearInterval(this.intervalId); 
      else if(this.iter === this.leng - 1) { this.iter= 0; this.inter++ } 
      else this.iter++;
    }
  componentDidMount(props) {
    this.setState({qualif: this.props.qualifications});
    this.intervalId = setInterval(this.itterate, 1000);
  };
  componentWillReceiveProps(nextProps) {
    this.setState({qualif: nextProps.qualifications});
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    return (
      <div className='_home-block'>
        <h2>{this.props.phrase1} {this.props.phraseName} {this.props.phrase2}</h2>
        <h3>{this.props.phrase3} {this.state.qualification}</h3>
        <Link to="/about">{this.props.buttonName}</Link>
      </div>  
    );
  }
}
  
 