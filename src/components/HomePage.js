import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = (props) => {
  return (
    <div className='_home-block'>
      <h2>{props.phrase1} {props.phraseName} {props.phrase2}</h2>
      <h3>{props.phrase3} </h3>
      {(props.qualifications != null && props.qualifications.map(item => <h4 key={item}>{item}</h4>))}
      <Link to="/about">{props.buttonName}</Link>
    </div>  
  );
};
  
export default HomePage;