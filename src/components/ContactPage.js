import React from 'react';
import { isEmail } from 'validator';
import Field from './Field'
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};


export default class ContactPage extends React.Component {
  state = {
    fields: {
      name: '',
      email: '',
      text: ''
    },
    fieldErrors: {},
    nameResult: '',
    _loading: false,
    _saveStatus: 'READY',
    modalIsOpen: false
  };
  openModal = () => {
    this.setState({ modalIsOpen: true });
  }
  afterOpenModal = () => {
    //references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }
  onFormSubmit = (evt) => {
    const contact = this.state.fields;
    evt.preventDefault();
    if (this.validate()) return;
    this.setState({
      _saveStatus: 'SAVING',
      _loading: true
    });
    axios.post('http://localhost:3000/api/contact', {
      name: contact.name,
      email: contact.email,
      text: contact.text
    })
      .then(response => {
        const name = 'Thank you ' + response.data.name + ' We kepp in touch';
        this.setState({
          nameResult: name,
          _saveStatus: 'SUCCESS',
          _loading: false,
          fields: {
            name: '',
            email: '',
            text: ''
          },
          modalIsOpen: true
        });
      })
      .catch(error => {
        this.setState({ _saveStatus: 'ERROR', nameResult: 'Server Error, Retry?', modalIsOpen: true });
      });
  };
  onInputChange = ({ name, value, error }) => {
    const fields = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    fields[name] = value;
    fieldErrors[name] = error;
    this.setState({ fields, fieldErrors });
  };
  validate() {
    const contact = this.state.fields;
    const fieldErrors = this.state.fieldErrors;
    const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k])
    if (!contact.name) return true;
    if (!contact.email) return true;
    if (errMessages.length) return true;
    return false
  };
  render() {
    return (


      <div>
        <form onSubmit={this.onFormSubmit}>
          <Field
            placeholder='Name'
            name='name'
            value={this.state.fields.name}
            onChange={this.onInputChange}
            validate={(val) => ((val && val.trim().length) ? false : 'Name Required')}
            /><br />
          <Field
            placeholder='Email'
            name='email'
            value={this.state.fields.email}
            onChange={this.onInputChange}
            validate={(val) => (isEmail(val) ? false : 'Invalid Email')}
          /><br />
          <Field
            placeholder='Type your text here'
            name='text'
            value={this.state.fields.text}
            onChange={this.onInputChange}
            validate={(val) => ((val.length < 20) ? false : 'Maximum size')}
          /><br />
          <input type='submit' disabled={this.validate()} />
          {(this.state._loading && <img alt='loading' src='/img/loading.gif' />)}

        </form>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <h2 ref={subtitle => this.subtitle = subtitle}>{this.state.nameResult}</h2>
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>);
  }
}
// export default class ContactPage extends React.Component {
//   state = {
//     fields: {
//       name: '',
//       email: '',
//       text: ''
//     },
//     fieldErrors: {},
//     contacts: []
//   };
//   onFormSubmit = (evt) => {
//     const contacts = this.state.contacts;
//     const contact = this.state.fields;
//     evt.preventDefault();
//     if (this.validate()) return;
//     this.setState({
//       contacts: contacts.concat(contact),
//       fields: { name: '', email: '', text: '' }
//     }); 
//   };
//   onInputChange = ({ name, value, error }) => { 
//     const fields = this.state.fields;
//     const fieldErrors = this.state.fieldErrors;
//     fields[name] = value;
//     fieldErrors[name] = error;
//     this.setState({ fields, fieldErrors }); 
//   };
//   validate () {
//     const contact = this.state.fields;
//     const fieldErrors = this.state.fieldErrors;
//     const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k])
//     if (!contact.name) return true;
//     if (!contact.email) return true;
//     if (errMessages.length) return true;
//     return false
//   };
//   render() {
//     return (


//       <div>
//           <form onSubmit={this.onFormSubmit}>
//             <Field
//               placeholder='Name'
//               name='name'
//               value={this.state.fields.name}
//               onChange={this.onInputChange}
//               validate={(val) => (val ? false : 'Name Required')}
//             /><br />
//             <Field
//               placeholder='Email'
//               name='email'
//               value={this.state.fields.email}
//               onChange={this.onInputChange}
//               validate={(val) => (isEmail(val) ? false : 'Invalid Email')}
//             /><br />
//             <Field
//               placeholder='Type your text here'
//               name='text'
//               value={this.state.fields.text}
//               onChange={this.onInputChange}
//               validate={(val) => ((val.length<20) ? false : 'Maximum size')}
//             /><br />
//             <input type='submit' disabled={this.validate()} />
//           </form>
//           <div>
//             <h3>Names</h3>
//             <ul> { this.state.contacts.map(({name, email, text}, i) => <li key={i}>name :{name} email: { email } text: { text }</li>) } </ul>
//           </div>
//         </div>);
// }
// }