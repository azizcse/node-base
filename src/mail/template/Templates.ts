export class Templates {
  static getRegisterEmailTemplate(url: string, name: string): string {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <title>Email Verification</title>

    <style>
        .container {
            margin: auto;
            float: inside;
            width: 500px;
            vertical-align: center;
            horiz-align: right;
            border: 1px solid #ddd;
            font-family: "Open Sans", sans-serif;
            padding: 40px;
            background-color: #f5f6f7;
        }

        .img-top-logo {
            width: 150px;
        }

        .footer-img {
            width: 23px;
            height: 20px;
            margin: 2px;
            padding: 3px;
            vertical-align: middle;
        }

        .first-text {
            font-size: 18px;
            color: #262626;
            font-weight: 700;
            padding: 25px 0px 25px;
        }

        .second-text {
            font-size: 16px;
            color: #282828;
        }

        .body-title {
            font-size: 14px;
            color: #666666;
            padding-top: 25px;
            padding-bottom: 15px;
        }

        .body-text {
            font-size: 14px;
            color: #666666;
            padding-top: 25px;
            padding-bottom: 15px;
            line-height: 20px;
        }

        .body-link {
            color: #008DFF;
            target: "_blank"
        }

        .btn {
            border-radius: 10px;
            text-transform: capitalize;
            width: 180px;
            height: 30px;
            cursor: pointer;
            border: none;
        }

        .btn-ui {
            background-color: #008dff !important;
            border-color: #008dff;
            -webkit-box-shadow: none;
            box-shadow: none;
            color: #fff
        }

        .btn-ui:hover {
            background-color: #083480 !important;
            border-color: #083480
        }

        .text-center {
            font-size: 13px;
            text-align: center;
            font-weight: 400;
        }

        .btn-margin {
            margin-top: 15px;
            margin-bottom: 25px;
        }

        .warning-text {
            font-size: 14px;
            margin-bottom: 20px;
            color: #d78c43;
            font-weight: 500;
        }

        .link-style {
            color: #ffffff;
            text-align: center;
        }

        .divider {
            border-bottom: 1px solid rgba(204, 204, 204, 0.35);
            margin-bottom: 20px;
            margin-top: 30px;
            text-transform: uppercase;
            font-size: 14px;
            font-weight: 400;
            color: #2c3e50
        }

        .tread-mark-text {
            font-size: 10px;
        }
        .footer-text {
            font-size: 14px;
            color: #666666;
            text-align: center;
            line-height: 20px;
        }

        .up-margin {
            margin-top: 10px;
        }

        .link-decoration-style {
            text-decoration: none;
        }
    </style>

</head>

<body>
<div class="container">
    <div class="first-text">
        Hello ${name},

    </div>

    <div class="second-text">
        Please verify your email
    </div>
    <div class="body-text">
        To complete email verification, please press the button below
    </div>

    <div class="link-style">
        <a href="${url}" class="link-decoration-style">
            <button id="password_reset" type="submit"
                    class="btn btn-ui text-center btn-margin">
                Verify your Email
            </button>
        </a>
    </div>

    <div class="body-text">
        Or, copy and paste the URL to your browser <a href="${url}" class="link-decoration-style"><span class="body-link">${url}</span></a>
    </div>


    <div class="body-text">
        WorkAny Team
    </div>

    <h4 class="divider"></h4>

    <div class="footer-text">
        <div class="up-margin">WorkAny<sup class="tread-mark-text">TM</sup> - Productivity tracking tool, developed by
            <a target="_blank" href="https://w3engineers.com/" class="link-decoration-style">
                <span class="body-link">W3 Engineers</span>
            </a>
        </div>
    </div>
</div>
</body>
</html>`;
  }
}




