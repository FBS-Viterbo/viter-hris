<?php

function getHtmlVerifyEmail(
  $link,
  $name,
  $email_old,
  $email,
  $key,
  $ROOT_DOMAIN,
  $IMAGES_URL
) {
  $html = '
  <style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  p {
    margin-bottom: 10px;
    font-size: 14px;
  }

  .info td {
    padding: 2px;
    font-size: 14px;
  }
  table {
    border-spacing: 0;
  }
</style>
<body
  style="
    background-color: #f0f0f0;
    font-family: Poppins, sans-serif;
    line-height: 1.6;
    padding: 10px 0;
    background-color: #fff;
  "
>
  <div style="width: 100%; max-width: 450px; margin: 10px auto">
    <div style="padding: 10px 10px 0px">
    <div style="text-align: left">
     <img
          src="' . $IMAGES_URL . '/logo.png"
          alt="Kaleidoscope"
        />
  </div>
    </div>
    <div style="padding: 0 10px 0px">
      <h1
        style="
          padding-bottom: 20px;
          line-height: 1.2;
          margin: 20px 0 0px;
          font-size: 18px;
          width: 70%;
          color: black;
        "
      >
        Email Verification
      </h1>
      <div
        style="
          padding: 20px;
          border-top: 1px solid #f3f3f3;
          color: #505050;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
        "
      >
        <p>Hi ' . $name . ',</p>
        <p style="margin-bottom: 20px">
        Please check your email to verify your changed email address from 
        <strong>' . $email_old . '</strong> to
        <strong>' . $email . '</strong>.
        Click the button below to continue.
        </p>

        <a
          href="' . $ROOT_DOMAIN . '' . $link . '?key=' . $key . '"
          style="
            padding: 0 25px;
            background-color: #019FAB;
            color: #fff;
            display: inline-block;
            text-decoration: none;
            font-size: 12px;
            border-radius: 5px;
            margin-bottom: 10px;
            line-height: 28px;
          "
          >Confirm email</a
        >
      </div>
    </div>
          <p style="font-size: 12px; padding: 0 10px">
            Having issues with the link? Try to paste this text on your browser
            URL:
            <a
              target="_blank"
              rel="nofollow"
              style="
                font-size: 12px;
                font-family: Helvetica Neue, sans-serif;
                text-decoration: none;
                color: #505050;
              "
              >' . $ROOT_DOMAIN . '' . $link . '?key=' . $key . '</a
            >
          </p>
        </div>
      </div>

      <div
        style="
          text-align: center;
          padding: 20px 0px;
          border-top: 1px solid #ddd;
          margin: 0 40px;
        "
      >
        <p style="font-size: 10px; line-height: 1.4; opacity: 0.5">
          &copy; ' . date("Y") . ' All Rights Reserved <br />
          Kaleidoscope
        </p>
      </div>
    </div>
  </body>
';
  return $html;
}
