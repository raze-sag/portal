import React, {  useState } from "react";
import "./ProviderCredentials.css";
import axios from "axios";
import ActionCancelModal from "./ActionCancelModal";
import { withTranslation } from "react-i18next";

const ProviderCredentialsEditor = (props) => {

    // used for knowing if we are in a new user, or editting existing one.
    const isNewCredential = props.isNewCredential===undefined?false:props.isNewCredential;
    const isReadOnly = () => {
        if (isNewCredential) {
            return false;
        }
        return true;
    }

    // Hard code
    const roles = [{name:"PPR_USER"}, {name:"PPR_EDITOR"}]

    // used to store the intial status of the user
    const [loadUser, setLoadUser] = useState(props.loadUser);
    // changed user
    const [user, setUser] = useState (props.loadUser);
    // Read only display
    const [readOnly, setReadOnly] = useState(isReadOnly());
    // During saving, it is used to hide all the buttons.
    const [saving, setSaving] = useState(false);
    // to now if we are going to display or not onRemove
    const [onRemove, setOnRemove] = useState(false);


    // When something change on the form, will update user state
    const onFormChanged = (e) => {
        const key = e.target.name;
        const value = e.target.type==="checkbox"?e.target.checked:e.target.value;
        setUser(user => ({...user, [key]: value}));
    }

    // Cancel will remove changes performed
    const onCancel = () => {
        setReadOnly(true);
        setUser(loadUser);
        if (typeof props.cancelCallback === "function") props.cancelCallback();
    }

    // Updates existing user
    const updateUser= () => {
        setReadOnly(true);
        axios.put('http://localhost:8086/account/ppr/1/users/'+user.id, user).then(   (response) => {
            setLoadUser(response.data);
            setUser(response.data);
            setSaving(false);
            props.updateUser(response.data);           
        },(error)=> {
          console.log(error);
          setSaving(false);
          alert('ko');
        });     

    }

    // add new user
    const addNewUser= () => {
        setReadOnly(true);
        axios.post('http://localhost:8086/account/ppr/1/users', user).then(   (response) => {
            props.updateUser(response.data);           
        },(error)=> {
          console.log(error);
          alert('ko');
        });     

    }
    const deleteUser = () => {
        axios.delete()
        axios.delete('http://localhost:8086/account/ppr/1/users/' + loadUser.id, {data: loadUser}).then(   (response) => {
            props.deleteUser(loadUser);
        },(error)=> {
          console.log(error);
          alert('ko');
          setOnRemove(false);
        });     

    }

    // decides if it should add new user, or update existing one.
    const onSave = () => {
        setSaving(true);
        setReadOnly(true);
        if (isNewCredential) {
            addNewUser();
        } else {
            updateUser();
        }
    }

    // logic to decide if remove user should be displayed or not
    const showRemove = () => {
        if (isNewCredential || saving) return (<div className="credentials-edit-remove"> </div>);
        else return (
            <div className="credentials-edit-remove" onClick={() =>setOnRemove(true)}>
                {props.t('account.credentials.remove')}
                <ActionCancelModal
                    header="Remove user" 
                    message={`are you sure do you want to remove user ${loadUser.userName}?`} 
                    showAlertMessage={onRemove} 
                    actionMessage="Remove"
                    actionCallback={()=>deleteUser()} 
                    cancelCallback={()=>setOnRemove(false)}/>
            </div>

        );

    }

    // Check if fields are properly informed or not.
    const onDisabledSaveButton = (u) => {
        if (user === loadUser) return true;
        if (user?.firstName === undefined || user?.firstName ==='') return true;
        if (user?.lastName === undefined || user?.lastName ==='') return true;
        if (user?.email === undefined || user?.email ==='') return true;
        if (user?.role === undefined || user?.role ==='') return true;
        return false;
    }

    // check if edit/save buttons should be displays or not.
    const showEditSave = (u) => {
        if (saving === true) return null;
        if (readOnly && !isNewCredential) {
            return (
                <React.Fragment>
                <div className="credentials-edit-blue">
                    <button onClick={()=>setReadOnly(false)}>{props.t('account.credentials.edit')}</button>
                </div>
                </React.Fragment>
            );
        }
        if (!readOnly) {
            return (
                <React.Fragment>
                 <div className="credentials-edit-blue">
                    <button onClick={onCancel}>{props.t('account.credentials.cancel')}</button>
                 </div>
    
                <div className="credentials-edit-blue">
                    <button onClick={onSave} disabled={onDisabledSaveButton(u)}>{props.t('account.credentials.save')}</button>
                </div>
                </React.Fragment>
    
            );
        }
    }

    // used for setting new file
    const selectValue = (input) => {
        if(input === undefined || input === null) {
            return '';
        }
        return input;
    }

    // Display different possible options for roles.
    const showRolesOptions = () => {
        return roles.map((role) =>{
            return (<option value={role.name} key={role.name}>{role.name}</option>);
        } );
    }
    //selected={role.name===user.role}

    return(
        <div className="credentials-edit-wrap">
            <div className="credentials-edit-column">
                <div >{props.t('account.credentials.firstName')}</div>
                <div >
                    <input type="text" name="firstName" value={user?.firstName} onChange={onFormChanged} disabled={readOnly}/>
                </div>
            </div>
            <div className="credentials-edit-column">
                <div >{props.t('account.credentials.lastName')}</div>
                <div>
                    <input type="text" name="lastName" value={user?.lastName} onChange={onFormChanged} disabled={readOnly}/>
                </div>
            </div>
            <div className="credentials-edit-row">
                {props.t('account.credentials.email')}
            </div>
            <div className="credentials-edit-row">
                <input type="text" name="email" value={user?.email} onChange={onFormChanged} disabled={readOnly}/>
            </div>
            <div className="credentials-edit-row">
                {props.t('account.credentials.role')}
            </div>
            <div className="credentials-edit-row">
            <select name="role" onChange={onFormChanged} disabled={readOnly} value={selectValue(user?.role)}>
                <option value="" disabled></option>
                {showRolesOptions()}
            </select>
                
            </div>
            {showRemove()}
            {showEditSave(user)}
    </div>
    );
}

export default withTranslation() (ProviderCredentialsEditor);