import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'email'
})
export class EmailPipe implements PipeTransform {

  transform(host: string, username: string, password: string, to: string | string[], from: string, subject: string, body: string) {

    var windowReference: any = window
    /* SmtpJS.com - v3.0.0 */
    var Email = {
      send: function (a) {
        return new Promise(function (n, e) {
          a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send";
          var t = JSON.stringify(a);
          Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
            n(e)
          })
        })
      },
      ajaxPost: function (e, n, t) {
        var a = Email.createCORSRequest("POST", e);
        a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () {
          var e = a.responseText;
          null != t && t(e)
        }, a.send(n)
      },
      ajax: function (e, n) {
        var t = Email.createCORSRequest("GET", e);
        t.onload = function () {
          var e = t.responseText;
          null != n && n(e)
        }, t.send()
      },
      createCORSRequest: function (e, n) {
        var t = new XMLHttpRequest;
        return t
      }
    };
    if(typeof to === "string"){
      return Email.send({
        Host: host,
        Username: username,
        Password: password,
        To: to,
        From: from,
        Subject: subject,
        Body: body

      })
    } else {
      to.map(toEmail =>
        Email.send({
          Host: host,
          Username: username,
          Password: password,
          To: toEmail,
          From: from,
          Subject: subject,
          Body: body
        })
      )
    }

  }

}
