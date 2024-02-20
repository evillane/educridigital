import StateOrder from './Enums/stateOrder';

export const updateObject = (oldObject, updateProperties) =>{
    return {
        ...oldObject,
        ...updateProperties
    }
}

export const  checkValidaty = (value, rules) =>{
    let isValid=true;

    if(!rules){
        return true;
    }

    if (rules.required){
        isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid;
    }

    if(rules.isEmail){
        //eslint-disable-next-line
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = regEmail.test(value) && isValid;
    }

    return isValid;

}

export const fnGetStateOrder = (state) => {
    let stateOr = "";
   switch (state) {
       case StateOrder.Pendiente:
        stateOr= 'Pendiente';
        break;
       case StateOrder.Procesado:
        stateOr= 'Procesado';
        break;
       case StateOrder.Cancelado:
        stateOr= 'Cancelado';
        break;
       case StateOrder.Entregado:
        stateOr= 'Entregado';
        break;
       default:
        stateOr='Sin Estado';
        break;
   }
   return stateOr;
}

export const fnGetValidateRol = (rolName, PerfilRoles) => {
   return PerfilRoles?.some(x=> x.RolName === rolName);
}