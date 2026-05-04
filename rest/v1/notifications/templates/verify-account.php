<?php

function getHtmlVerifyAccount(
  $password_link,
  $name,
  $email,
  $key,
  $ROOT_DOMAIN,
  $IMAGES_URL
) {
  $html = '<style>
  @import url("https://fonts.cdnfonts.com/css/Helvetica Neue-neue-9");
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
    font-family: Helvetica Neue, sans-serif;
    line-height: 1.6;
    padding: 10px 0;
    background-color: #fff;
  "
>
  <div style="width: 100%; max-width: 450px; margin: 10px auto">
    <div style="padding: 10px 10px 0px">
      <div style="text-align: center">
        <img src="' . $IMAGES_URL . '/logo.png" alt="Kaleidoscope" />
      </div>
    </div>
    <div style="padding: 0 10px 0px">
      <div
        style="
          border-top: 1px solid #f3f3f3;
          color: #505050;
          border: 1px solid #ddd;
          margin: 20px 0 0px;
          border-radius: 10px;
          border: 2px #238ec0 solid;
        "
      >
        <div
          style="
            background-color: #019FAB;
            padding: 20px;
            border-radius: 5px 5px 12px 12px;
            text-align: center;
          "
        >
          <p
            style="
              line-height: 1.2;
              font-size: 16px;
              color: #fff;
              font-weight: bold;
              margin: 0;
            "
          >
            Account Verification
          </p>
        </div>
        <div style="padding: 20px 20px 20px 20px">
          <p style="margin-top: 5px">Hi ' . $name . ',</p>
          <p style="margin-top: 5px">
            Please confirm that you want to use
            <strong>' . $email . '</strong> as account email address. Click the
            button below to set your password and start using the World Focus
            App Portal.
          </p>

          <div style="text-align: center; margin: 30px 0 10px 0">
            <a
              href="' . $ROOT_DOMAIN . '' . $password_link . '?key=' . $key . '"
              style="
                padding: 7px 40px;
                background-color: #019FAB;
                color: #fff;
                display: inline-block;
                text-decoration: none;
                font-size: 14px;
                border-radius: 30px;
                line-height: 28px;
              "
              >Create Password</a
            >
          </div>
        </div>
      </div>
    </div>
    <p style="font-size: 12px; padding: 20px 15px 0 15px">
      Having issues with the link? try to paste this text on the browser URL:
      <a
        target="_blank"
        rel="nofollow"
        style="
          font-size: 12px;
          font-family: Helvetica Neue, sans-serif;
          text-decoration: none;
          color: #505050;
        "
        >' . $ROOT_DOMAIN . '' . $password_link . '?key=' . $key . '</a
      >
    </p>
  </div>

  <div style="text-align: center; padding: 10px 0; margin: 0 40px">
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
