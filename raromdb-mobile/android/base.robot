*** Settings ***
Library    AppiumLibrary
Library    FakerLibrary
Library    String
Library    RequestsLibrary

Resource    page/registroPage.robot
Resource    page/loginPage.robot
Resource    page/filmePage.robot
Resource    utils/commons.robot
Resource    utils/API.robot
Resource    utils/config.robot