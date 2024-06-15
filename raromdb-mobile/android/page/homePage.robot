*** Settings ***
Resource    ../base.robot

*** Variables ***
${HOME_TXT}        xpath=//android.view.View[@content-desc="Home"]
${MENU_HOME}       xpath=//android.widget.Button[@content-desc="Open navigation menu"]
${CABECALHO_HOME}  xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]


*** Keywords ***
# Dado que o usuário está na tela inicial do aplicativo

# Então visualiza o conteúdo da tela

# Então visualiza as opções do aplicativo
