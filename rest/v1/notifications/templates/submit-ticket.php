<?php

function getHtmlSubmitTicket(
  $admin_first_name,
  $admin_last_name,
  $user_first_name,
  $user_last_name,
  $user_email,
  $date_submitted,
  $question,
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
    font-family:
      Helvetica Neue,
      sans-serif;
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
            background-color: #019fab;
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
            Hello ' . $admin_first_name . ' ' . $admin_last_name . ',
          </p>
        </div>
        <div style="padding: 20px 20px 20px 20px">
          <p style="margin-top: 5px">
            A new issue/ticket has been submitted through the chatbot system.
          </p>

          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
            "
          >
            <tr>
              <td style="vertical-align: top">
                <p><strong>Name:</strong> ' . $user_first_name . ' ' . $user_last_name . '</p>
                <p><strong>Email:</strong> ' . $user_email . '</p>
                <p><strong>Date:</strong> ' . $date_submitted . '</p>
                <p>
                  <strong>Question:</strong> ' . $question . '
                </p>
              </td>
            </tr>
          </table>

          <p style="margin: 20px 0 10px 0">
            Please review and take the necessary action as soon as possible.
            <br />
            <br />
            Thank you.
            <br />
            <br />
            Best regards,
            <br />
            Chatbot System Notification
          </p>
        </div>
      </div>
    </div>
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
