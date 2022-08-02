import axios from "axios";
import jwt_decode from "jwt-decode"

export const VR_ROLE = 'gaiax-vr'; // default role
export const PPR_ROLE = 'gaiax-ppr';
export const PCR_ROLE = 'gaiax-pcr';
export const FR_ROLE = 'gaiax-fr';


export function userData() {
  const token = retrieveToken();
  if (token) {
    var dToken = jwt_decode(token);

    return {
      user: {
        "first_name": dToken.given_name,
        "family_name": dToken.family_name,
        "email": dToken.email,
        "user_role": retrieveRole(dToken),
        "organization_url": "not defined"
      }
    }
  } else {
    return {
      user: {
        "first_name": null,
        "family_name": null,
        "email": null,
        "user_role": VR_ROLE,
        "organization_url": null
      }
    }
  }
}

function retrieveRole(dToken) {
  var roles = dToken.realm_access.roles;
  console.log("roles: ", roles);

  if (roles.includes("gaiax-pcr")) {
    console.log("it is pcr");

    return PCR_ROLE;
  } else if (roles.includes("gaiax-ppr")) {
    console.log("it is ppr");

    return PPR_ROLE;
  } else if (roles.includes("gaiax-fr")) {
    console.log("it is fr");

    return FR_ROLE;
  } else {
    return VR_ROLE;
  }
}

function retrieveToken() {
  console.log("In retrieveToken");

  return JSON.parse(localStorage.getItem('userJWT'));
}

export function authHeader() {
  console.log("in authHeader");
  const token = retrieveToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
}

export function removeJWT() {
  console.log("Removing JWT");
  localStorage.removeItem("userJWT");
}

export function storeJWT(data) {
  console.log("Storing JWT");
  if (data && data.access_token) {
    localStorage.setItem("userJWT", JSON.stringify(data.access_token));
  }
}