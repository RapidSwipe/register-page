import React, { Component } from 'react';
import './Form.css';

const passwCheckNumber=/^(?=.*[0-9])/;
const passwCheckCapital=/[A-Z]/;
const passwCheckSmall=/[a-z]+/;
const emailCheck=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneCheck=/^[0-9\+]{9,11}$/;

const changeMargin={
    marginTop:'0px',
}

const resultSucceed={
    backgroundColor:'#4effea',
    display:'inline',  
};

const reslutFailed={
    backgroundColor:'rgb(209, 44, 44)',
    display:'inline',
}


class Form extends Component {
    state = {
        containNumber:false,
        capAndSmallLetter:false,
        eightChars:false,   
        pesel:'',
        email:'',
        telephoneNumber:'',
        agreement:false,
        peselError:false,
        emailError:false,
        phoneNumberError:false,
        agreementError:false,
        resultSucceed:null,
 
    } 



    handleSubmit=(e)=>{
        e.preventDefault();
    }

    handlePassword=(e)=> {     
        if(e.target.value.length>=8){
            this.setState({eightChars:true});
        }else{
            this.setState({eightChars:false});
        }

        if(e.target.value.match(passwCheckNumber)){
            this.setState({containNumber:true});
        }else{
            this.setState({containNumber:false});
        }

        if((e.target.value.match(passwCheckCapital)&&e.target.value.match(passwCheckSmall))){
            this.setState({capAndSmallLetter:true});
        }else{
            this.setState({capAndSmallLetter:false});
        }



    }

    handlePesel=(e)=>{
        const pesel=e.target.value;
        this.setState({pesel});
        if(pesel.length===11){
            this.setState({peselError:false,})

        }else{
            this.setState({peselError:true})
        }
    }

    handleEmail=(e)=>{
        const email=e.target.value;
        this.setState({email});
        if(email.length>0){
            if(email.match(emailCheck)){
                this.setState({emailError:false})
            }else{
                this.setState({emailError:true})
            }
        }else{
            this.setState({emailError:false})
        }

    }

    handleAgreement=(e)=>{
        const agreement=e.target.checked;
        this.setState({agreement});
        if(agreement){
            this.setState({agreementError:false})
        }else{
            this.setState({agreementError:true})
        }
    }

    handlePhoneNumber=(e)=>{
        const telephoneNumber=e.target.value;
        this.setState({telephoneNumber});
        if(telephoneNumber.length>0){
            if(telephoneNumber.match(phoneCheck)){
                this.setState({phoneNumberError:false});
            }else{
                this.setState({phoneNumberError:true});
            }
        }else{
            this.setState({phoneNumberError:false})
        }

    }

    handleProceed=()=>{
        const {containNumber,
            capAndSmallLetter,
            eightChars,   
            pesel,
            email,
            telephoneNumber,
            agreement,
            peselError,
            emailError,
            phoneNumberError,
            agreementError}=this.state;
        if((agreement&&!peselError&&!emailError&&!phoneNumberError&&containNumber&&capAndSmallLetter&&eightChars&&!agreementError)&&(pesel.length>0&&email.length>0)){
             setTimeout(()=>{
                this.setState({resultSucceed:null});
             },5000)
             this.setState({resultSucceed:'success'});
             
        }else{
            setTimeout(()=>{
                this.setState({resultSucceed:null});
             },5000)
             this.setState({resultSucceed:'failed'});

        }


    }

    render() { 

        return (
            <div className='myForm '>
                <div id='proceed' style={this.state.resultSucceed==='success'?resultSucceed:this.state.resultSucceed==='failed'?reslutFailed:null}>
                {this.state.resultSucceed==='success'?'Zarejestrowano pomyślnie':this.state.resultSucceed==='failed'?'Popraw dane':null}
                </div>
                <h1>Rejestracja</h1>
                <form onSubmit={this.handleSubmit} noValidate>
                    <label>e-mail </label><br/>
                    <input type='email' value={this.state.email} onChange={this.handleEmail} placeholder='Wpisz adres e-mail'/> {this.state.emailError?<p>Proszę podać prawidłowy email</p>:null} <br/>
                    <label style={this.state.emailError?changeMargin:null} >hasło</label><br/>
                    <input type='password' onChange={this.handlePassword} placeholder='Wpisz hasło'/><br/>
                    <label className='checkBox' style={{textTransform:'none'}}> <input type='checkbox' checked={this.state.containNumber} disabled={true}/>1 cyfra</label>
                    <label className='checkBox' style={{textTransform:'none'}}> <input type='checkbox' checked={this.state.capAndSmallLetter} disabled={true}/>Wielka i mała litera</label>
                    <label className='checkBox' style={{textTransform:'none'}}> <input type='checkbox' checked={this.state.eightChars} disabled={true}/>8 znaków</label><br/>
                    <label>Numer płatnika</label><br/>
                    <input type='number' placeholder='Wpisz numer płatnika'/><br/>
                    <label>Numer pesel</label><br/>
                    <input type='number' value={this.state.pesel} onChange={this.handlePesel} placeholder='Wpisz PESEL'/> {this.state.peselError?<p>Proszę podać prawidłowy PESEL</p>:null} <br/>
                    <label style={this.state.peselError?changeMargin:null}>telefon<span>(opcjonalnie)</span></label><br/>
                    <input type='tel' value={this.state.telephoneNumber} onChange={this.handlePhoneNumber} placeholder='Wpisz numer telefonu'/>  <br/>
                    {this.state.phoneNumberError?<p>Proszę podać prawidłowy numer telefonu</p>:null}

                    <label id='agreement' style={{marginLeft:'0px'}}> <input type='checkbox' id='agree' onChange={this.handleAgreement} checked={this.state.agreement}/></label><label htmlFor='agree' style={{textTransform:'none'}}>Oświadczam że zapoznałem się z treścią ninejszego <a style={{textDecoration:'none', color:'#12beab'}} href='/regulamin'>Regulaminu</a>
                    <span style={{textTransform:'uppercase',color:'#bcc9d5'}}>(zgoda<br/> obowiązkowa)</span> akceptuję jego treść i zobowiązuję się do przestrzegania go.</label><br/>
                    {this.state.agreementError?<p>Proszę zaakceptować zgodę</p>:null}

                    <button id='register' onClick={this.handleProceed}>Dalej</button><br/>              

                </form>
                <button id='login'>Logowanie</button>
            </div>
        );
    }           
}
 
export default Form;