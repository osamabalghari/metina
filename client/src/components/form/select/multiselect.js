import React from 'react'
import Select from 'react-select'
import { Label, Error, ClassHelper } from 'components/lib';
import Style from './select.tailwind.js';
export const MultiSelect = (props) => {

    const error = props.errorMessage || 'Please select an option';

    function change(e) {
        let value = e?.length ? e?.map(val => val?.value?.id) : e
        let valid = undefined;

        // validate
        valid = props.required ? false : true;
        props.onChange(props?.name, value, valid);
        props.callback && props.callback(value)
    }

    const wrapperStyle = ClassHelper(Style, {

        className: props.className,
        success: props.valid === true,
        errorWrapper: props.valid === false,
        warningWrapper: props.warning,

    });

    const selectStyle = ClassHelper(Style, {

        select: true,
        error: props.valid === false,
        warning: props.warning,

    });

    const colourStyles = {
        control: styles => ({
            ...styles,
            backgroundColor: 'white',
            border: 'none',
            boxShadow: 'none',
            padding: '0',
            '&:hover': {
                border: 'none',
                boxShadow: 'none',
            },
            '&:focus': {
                border: 'none',
                boxShadow: 'none',
            },
        }),
        indicatorSeparator: base => ({
            ...base,
            display: 'none'
        }),
        dropdownIndicator: base => ({
            ...base,
            display: 'none'
        }),
        menu: base => ({
            ...base,
            with: '80% !important',

        }),
        container: base => ({
            ...base,
            flex: 1,
            padding: '0.3rem 0'
        })


        // option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        //     return {
        //         ...styles,
        //         color: '#FFF',
        //         cursor: isDisabled ? 'not-allowed' : 'default',
        //     };
        // },
    };

    return (
        <div className={Style.input}>

            <Label
                text={props.label}
                required={props.required}
                for={props.name}
            />

            <div className={wrapperStyle.replace('overflow-hidden', '')}>
                <Select className={selectStyle.replace('overflow-hidden', '')}
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={colourStyles}
                    placeholder='Please select an option'
                    options={props.options}
                    isMulti={props.isMulti}
                    defaultValue={props.defaultValue}
                    // value={props.value}
                    onChange={change}
                />

                {props.valid === false && <Error message={error} className={Style.message} />}

            </div>
        </div>
    )
}