import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { withTranslation } from "react-i18next";
import Modal from "../Modal";
import "./Register.css";
import VerticalSteps from "./VerticalSteps";
import axios from "axios";
import configData from "../config/config.json";

const RegisterOrganization = (props) => {

    const navigate = useNavigate();

    const [input, setInput] = useState({aisbl:false});
    const [eMessage,setEMessage] = useState([]);
  
    const onFormChanged = (e) => {
        const key = e.target.name;
        const value = e.target.type==="checkbox"?e.target.checked:e.target.value;
        setInput(values => ({...values, [key]: value}));
    }

    const cancelButton = () => {
        navigate("/");
    }

    const onRegisterDID = () => {
        alert("Register DID is still not done. This is a placeholder alert message.");
    }

    // Validates when all the mandatory fields have been populated and 500 seconds without any new key input during that ti
    useEffect(()=>{
        if (mandatoryFieldsExists ()) {
            const timeoutId = setTimeout(()=> {  
                validate();
            },500);
            return ()=>{
                clearTimeout(timeoutId);
            };
        }
    },[input]);

    const onSubmit = async () => {
        const output = await axios.post(configData.ONBOARDING_API_URI+'/register/organization', input);
        
        switch (output.status) {
            case 200: navigate("/register/email?formType=organization");
            break;
            default:
                alert(`Error with status ${output.status} and message: ${output.statusText}`);
        }

        console.log(output) ;
    }

    const validate = () => {
        let errMessage = [];
        if (typeof input.aisbl !== 'boolean' ) {
            errMessage.push("aisbl");
        }
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input.email)) {
            errMessage.push("email");
        }
        if (!/[\S\s]+[\S]+/.test(input.name)) {
            errMessage.push("name");
        }
        setEMessage(errMessage);
    }
    const mandatoryFieldsExists = () => {
       return 'aisbl' in input && 'email' in input && 'name' in input;
    }


    const onFileChange = (event) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            let organization = JSON.parse(e.target.result);
            setInput(values=> ({...values, ...organization}));
        };
        reader.readAsText(event.target.files[0]);
    }

    const formOrganizationOne = () => {
        return (
        <div className="RegisterUser">
            <div className="registerHelpText">
                <h3>{props.t("form.formUserHeadline")}</h3>
                <p>{props.t("form.formOrganizationOne")}</p>
            </div>
            <VerticalSteps current="2" numSteps="3"/>
            <div className="registerInputs">
                <p> {props.t("form.formOrganizationOneInformation")}</p>
                <input type="file" onChange={onFileChange}/>
                <br/>
                <div className="validationError" hidden={!eMessage.includes("name")}>{props.t("form.formOrganizationNameValidationError")}</div>
                <label>{props.t("form.organization")}:
                    <input type="text" name="name" value={input.name || ""} onChange={onFormChanged} />
                </label>
                <br/>
                <div className="validationError" hidden={!eMessage.includes("email")}>{props.t("form.formEmailValidationError")}</div>
                <label>{props.t("form.lEmail")}:
                    <input type="text" name="email" value={input.email || ""} onChange={onFormChanged} />
                </label>
                <br/>
                <div className="validationError" hidden={!eMessage.includes("aisbl")}>{props.t("form.formOrganizationAISBLValidationError")}</div>
                <label>{props.t("form.lAisbl")}:
                    <input type="checkbox" name="aisbl" value={input.aisbl} defaultChecked={input.aisbl} onChange={onFormChanged} />
                </label>
                <br/>
                <div className="formButtons">
                     <button onClick={cancelButton}>{props.t("form.cancel")}</button>
                     <button  onClick={onSubmit} disabled={eMessage.length!== 0 || !('aisbl' in input && 'email' in input && 'name' in input)}>{props.t("form.continue")}</button>
                     <button  onClick={onRegisterDID}>{props.t("form.registerDid")}</button>
                </div>

            </div>
        </div>
        )
    };


return (
    <Modal>
            {formOrganizationOne()}
    </Modal>

);

}

export default withTranslation()(RegisterOrganization);