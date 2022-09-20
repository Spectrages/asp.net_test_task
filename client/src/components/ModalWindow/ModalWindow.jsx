import React, { useEffect } from 'react';
import classes from './ModalWindow.module.css'
import './ModalWindow.module.css'
import { useState } from 'react';
import MyInput from '../MyInput/MyInput';

const PATTERN_NAME = new RegExp(/^[A-Z][a-z]+[\s|,][A-Z][a-z]{1,19}$/);
const PATTERN_PHONE = new RegExp(/^\+375 (25|29|33|44) [0-9]{3} [0-9]{2} [0-9]{2}$/);
const PATTERN_JOB = new RegExp(/^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/);
const PATTERN_BIRTH_DATE = new RegExp(/(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/);

const ModalWindow = ({ active, setActive, activeUser, createUser, deleteUser, updateUser}) => {

    const [user, setUser] = useState(activeUser || null);

    const [userName, setUserName] = useState(user?.name || "");
    const [userMobilePhone, setUserMobilePhone] = useState(user?.mobilePhone || "");
    const [userJobTitle, setUserJobTitle] = useState(user?.jobTitle || "");
    const [userBirthDate, setUserBirthDate] = useState(user?.birthDate || "");

    const isDisabled = () => {
        return !PATTERN_NAME.test(userName) ||
            !PATTERN_PHONE.test(userMobilePhone) ||
            !PATTERN_JOB.test(userJobTitle) ||
            !PATTERN_BIRTH_DATE.test(userBirthDate)
    }

    const createNewUser = (newUser) => {
        setActive(false);
        createUser(newUser);
    }

    useEffect(() => {
        if (activeUser) {
            setUser(activeUser);
        }
    }, [activeUser])

    const choiseOperation = () => {
        const userTemplate = {
            Name: userName,
            MobilePhone: userMobilePhone,
            JobTitle: userJobTitle,
            BirthDate: userBirthDate
        }

        if (isDisabled()) return
        if (user?.id) {
            Object.assign(userTemplate, {
                Id: user.id
            })
            setActive(false)
            updateUser(userTemplate)

        } else {
            setActive(false)
            createNewUser(userTemplate);
        }
    }

    const handleValueChange = (event, setState) => {
        if(typeof setState === "function"){
            setState(event.target.value);
        }
    }   


    return (
        <div className={active ? classes.modal_enable : classes.modal_disable} onClick={() => setActive(false)}>
            <div className={active ? classes.content_enable : classes.content_disable} onClick={event => event.stopPropagation()}>
                <form className={classes.inputBlock}>
                    <MyInput
                        value={userName}
                        onChange={(event) => handleValueChange(event, setUserName)}
                        pattern="^[A-Z][a-z]+[\s|,][A-Z][a-z]{1,19}$" //{PATTERN_NAME}
                        placeholder="John Cena"
                        htmlFor="name"
                        labelTitle="Enter your name (required) "
                    />

                    <MyInput
                        value={userMobilePhone}
                        list="codes"
                        onChange={(event) => handleValueChange(event, setUserMobilePhone)}
                        pattern="^\+375 (25|29|33|44) [0-9]{3} [0-9]{2} [0-9]{2}$"//{PATTERN_PHONE}
                        placeholder="+375 29 XXX XX XX"
                        htmlFor="mobilePhone"
                        maxLength="17"
                        minLength="17"
                        labelTitle="Enter your mobile phone (required) "
                    />

                    <MyInput
                        value={userJobTitle}
                        onChange={(event) => handleValueChange(event, setUserJobTitle)}
                        pattern="^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$"//{PATTERN_JOB}
                        placeholder="Wrestler"
                        htmlFor="jobTitle"
                        maxLength="25"
                        minLength="5"
                        labelTitle="Enter your job title (required) "
                    />

                    <MyInput
                        value={userBirthDate}
                        onChange={(event) => handleValueChange(event, setUserBirthDate)}
                        pattern="(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)" //{PATTERN_BIRTH_DATE}
                        placeholder='23/04/1977'
                        htmlFor="birthDate"
                        maxLength="10"
                        minLength="10"
                        labelTitle="Enter your birth date (required) "
                    />
                    <button onClick={() => choiseOperation()}>Create/Update user</button>
                </form>
            </div>
        </div>
    )
};

export default ModalWindow;