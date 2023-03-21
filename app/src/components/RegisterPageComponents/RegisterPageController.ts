import React, { Component, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  checkEmail,
  checkPassword,
} from '../WelcomePageComponents/Controller/SignInController';

function checkName(name: string) {
  const nameRegex = /^[a-zA-Z0-9\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{1,}$/;
  return nameRegex.test(name);
}

function checkSecurityQuestion(question: string) {
  const securityQuestionRegex = /^.+\?$/;
  return securityQuestionRegex.test(question);
}

function checkSecurityAnswer(answer: string) {
  const securityAnswerRegex = /^[a-zA-Z0-9\s]{1,30}$/;
  return securityAnswerRegex.test(answer);
}

function handleDisable(
  names: string[],
  password: string,
  email: string,
  securityQuestions: string[],
  securityAnswers: string[]
  
) {
  let result =
    checkEmail(email) &&
    checkPassword(password) &&
    (checkName(names[0]) && checkName(names[1]) && checkName(names[2]) ) &&
    (checkSecurityQuestion(securityQuestions[0]) && checkSecurityQuestion(securityQuestions[1]) && checkSecurityQuestion(securityQuestions[2]))&&
    (checkSecurityAnswer(securityAnswers[0]) && checkSecurityAnswer(securityAnswers[1]) && checkSecurityAnswer(securityAnswers[2]))

  return !result;
}

export { checkName, checkSecurityQuestion, checkSecurityAnswer, handleDisable };
