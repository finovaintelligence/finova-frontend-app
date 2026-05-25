import './style.css'
import axios from 'axios'
import * as pbi from 'powerbi-client'

function renderLogin() {

    document.querySelector('#app').innerHTML = `

    <div
        style="
            width:100%;
            height:100vh;
            background:#020617;
            display:flex;
            justify-content:center;
            align-items:center;
            font-family:Arial;
        "
    >

        <div
            style="
                width:400px;
                background:#0f172a;
                padding:40px;
                border-radius:24px;
                box-shadow:0 0 40px rgba(0,0,0,0.4);
            "
        >

            <h1
                style="
                    color:white;
                    font-size:36px;
                    margin-bottom:10px;
                    text-align:center;
                "
            >
                FINOVA
            </h1>

            <p
                style="
                    color:#94a3b8;
                    text-align:center;
                    margin-bottom:40px;
                "
            >
                Inteligencia Financiera
            </p>

            <input
                id="email"
                type="email"
                placeholder="Correo"
                style="
                    width:100%;
                    padding:16px;
                    margin-bottom:16px;
                    border:none;
                    border-radius:12px;
                    background:#1e293b;
                    color:white;
                    font-size:16px;
                    box-sizing:border-box;
                "
            />

            <input
                id="password"
                type="password"
                placeholder="Contraseña"
                style="
                    width:100%;
                    padding:16px;
                    margin-bottom:24px;
                    border:none;
                    border-radius:12px;
                    background:#1e293b;
                    color:white;
                    font-size:16px;
                    box-sizing:border-box;
                "
            />

            <button
                id="loginBtn"
                style="
                    width:100%;
                    padding:16px;
                    background:#2563eb;
                    border:none;
                    border-radius:12px;
                    color:white;
                    font-size:18px;
                    cursor:pointer;
                    font-weight:bold;
                "
            >
                Ingresar
            </button>

            <p
                id="error"
                style="
                    color:#ef4444;
                    margin-top:20px;
                    text-align:center;
                "
            ></p>

        </div>

    </div>

    `

    document
        .getElementById('loginBtn')
        .addEventListener('click', login)

}

async function login() {

    try {

        const email =
            document.getElementById('email').value

        const password =
            document.getElementById('password').value

        // LOGIN BACKEND
        const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/login`,
    {
        email,
        password
    }
);

        localStorage.setItem(
            'finovaUser',
            JSON.stringify(response.data)
        );

        loadReport(email)

    }
    catch (error) {

        document.getElementById('error').innerText =
            'Credenciales inválidas'

    }

}

async function loadReport(email) {

    try {

        document.querySelector('#app').innerHTML = `

            <div
                <div
    style="
        width:100%;
        height:100vh;
        background:#020617;
        display:flex;
        flex-direction:column;
    "
>

    <div
        style="
            height:70px;
            background:#0f172a;
            display:flex;
            justify-content:space-between;
            align-items:center;
            padding:0 30px;
            border-bottom:1px solid #1e293b;
        "
    >

        <div
            style="
                color:white;
                font-size:24px;
                font-weight:bold;
            "
        >
            FINOVA
        </div>

        <button
            id="logoutBtn"
            style="
                background:#ef4444;
                color:white;
                border:none;
                padding:12px 20px;
                border-radius:10px;
                cursor:pointer;
                font-weight:bold;
            "
        >
            Logout
        </button>

    </div>

    <div
        id="reportContainer"
        style="
            flex:1;
        "
    ></div>

</div>
                style="
                    width:100%;
                    height:100vh;
                    background:#020617;
                "
            ></div>

        `

        // EMBED TOKEN
        const response = await axios.post(
            await axios.post(
    await axios.post(
    await axios.post(
    `${import.meta.env.VITE_API_URL}/get-embed-token`,
            {
                email
            }
        )

        const data = response.data

        const models = pbi.models

        const config = {

            type: 'report',

            tokenType: models.TokenType.Embed,

            accessToken: data.embedToken,

            embedUrl: data.embedUrl,

            id: data.reportId,

            permissions: models.Permissions.All,

            settings: {

                filterPaneEnabled: false,

                navContentPaneEnabled: true,

                layoutType: models.LayoutType.Custom,

                customLayout: {
                    displayOption:
                        models.DisplayOption.FitToWidth
                }

            }

        }

        const reportContainer =
            document.getElementById('reportContainer')

        const powerbi = new pbi.service.Service(
            pbi.factories.hpmFactory,
            pbi.factories.wpmpFactory,
            pbi.factories.routerFactory
        )

        powerbi.embed(
            reportContainer,
            config
        )
        document
    .getElementById('logoutBtn')
    .addEventListener('click', logout)  

    }
    catch (error) {

        console.error(error)

    }

}
function logout() {

    localStorage.removeItem('finovaUser')

    renderLogin()

}
// SESIÓN
const savedUser =
    localStorage.getItem('finovaUser')

if (savedUser) {

    const user = JSON.parse(savedUser)

    loadReport(user.email)

}
else {

    renderLogin()

}