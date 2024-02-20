import React from 'react';
import classes from './Input.module.css';

const input = (props)=>{

    let inputElement =null;
    let inputClasses = [classes.inputElement]

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.invalid);
    }

    switch(props.elementType){
        case ('input'):
            inputElement=<input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange = {props.changed}></input>;
            break;
        case ('textarea'):
            inputElement =<textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange = {props.changed}></textarea>
            break;
        case ('select'):
            inputElement =<select className={inputClasses.join(' ')} value={props.value}
            onChange = {props.changed}
            >
                        {props.elementConfig.options.map(opt => (
                            <option key={opt.value} value={opt.value}>
                                {opt.displayValue}
                            </option>
                        )
                        )}
            </select>
            break;
        default:
            inputElement=<input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}></input>;
            break;
    }

    return (
            <div className={classes.Input}>
                <label className={classes.Label}>{props.label}</label>
                {inputElement}
            </div>
    )

}
export default input;