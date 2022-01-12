var liffID = '1655224755-grRwnek2';
liff.init({
  liffId: liffID
}).then(function () {
  console.log('LIFF init');
  // 取得基本環境資訊
  let language,
    version,
    isInClient,
    isLoggedIn,
    os,
    lineVersion;

  language = liff.getLanguage();
  version = liff.getVersion();
  isInClient = liff.isInClient();
  isLoggedIn = liff.isLoggedIn();
  os = liff.getOS();
  lineVersion = liff.getLineVersion();

  if(!isLoggedIn) {
          liff.login({
            redirectUri: 'https://liff.eshare.pw/events/2022-newyear/card/'
          });
        }

  var user = liff.getDecodedIDToken();
  var userID = user.sub;
  var userName = user.name;
  var userPhoto = user.picture;
  var userEmail = user.email;

  var data = {
    'entry.1618752407': userID,
    'entry.1063771356': userName,
    'entry.594837778': userPhoto,
    'entry.296380297': userEmail,
  };
  $.ajax({
    type: 'POST',
    url: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdSW8t4PZboSTfcT2TmgEj1pyW2WpPAxEX91pQ8JO2-4PP5jA/formResponse',
    data: data,
    contentType: 'application/json',
    dataType: 'jsonp',
  });

  //從這邊
  const btnMessage = document.getElementById('submit');
  btnMessage.addEventListener('click', () => {
    var photo = document.querySelector('[name=card_design]:checked').value;
    console.log(photo)
    var message = document.getElementById('friend_card').value;
    var name = document.getElementById('friend_name').value;
    liff.shareTargetPicker([{
      type: 'flex',
      altText: "Hi! 新年快樂！" + userName + "為你捎來了新年祝福，快來一起將祝福分享出去吧！",
      contents: {
        "type": "bubble",
        "hero": {
          "type": "image",
          "url": "https://liff.eshare.pw/events/2022-newyear/card/src/image/2022newyear_header-" + photo + ".png",
          "size": "full",
          "aspectRatio": "16:9",
          "aspectMode": "cover",
          "action": {
            "type": "uri",
            "uri": "http://linecorp.com/"
          }
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "image",
              "url": "https://liff.eshare.pw/events/2022-newyear/card/src/image/2022newyear_header.png",
              "position": "absolute",
              "size": "full",
              "margin": "none",
              "offsetTop": "none",
              "offsetStart": "none",
              "aspectRatio": "16:9"
            },
            {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "hello, world",
                  "contents": [
                    {
                      "type": "span",
                      "text": "祝 "
                    },
                    {
                      "type": "span",
                      "text": name
                    }
                  ],
                  "size": "lg",
                  "color": "#BB2225",
                  "weight": "bold"
                },
                {
                  "type": "text",
                  "text": message,
                  "wrap": true,
                  "color": "#BB2225"
                }
              ],
              "margin": "xs",
              "borderColor": "#BB2225",
              "borderWidth": "3px",
              "cornerRadius": "5px",
              "paddingAll": "md",
              "backgroundColor": "#FEE8B8"
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "button",
              "style": "primary",
              "height": "sm",
              "action": {
                "type": "uri",
                "label": "我也要發賀卡",
                "uri": "https://liff.line.me/1655224755-grRwnek2"
              },
              "color": "#BB2225"
            },
            {
              "type": "button",
              "style": "secondary",
              "height": "sm",
              "action": {
                "type": "uri",
                "label": "前往於是寫下生活筆記",
                "uri": "https://yuslife.cc"
              },
              "color": "#EABCBD",
              "margin": "md"
            },
            {
              "type": "button",
              "style": "secondary",
              "height": "sm",
              "action": {
                "type": "uri",
                "label": "前往 CACU 卡庫",
                "uri": "https://www.cacucacu.com/"
              },
              "color": "#EABCBD",
              "margin": "md"
            },
            {
              "type": "spacer",
              "size": "sm"
            }
          ],
          "flex": 0
        },
        "styles": {
          "header": {
            "backgroundColor": "#FEE8B8"
          },
          "hero": {
            "backgroundColor": "#FEE8B8"
          },
          "body": {
            "backgroundColor": "#FEE8B8"
          },
          "footer": {
            "backgroundColor": "#FEE8B8"
          }
        }
      }
    }]).then(res => {
      Swal.fire({
        title: '送出賀卡',
        icon: 'success',
        confirmButtonText: '確認',
        closeOnConfirm: false
      }).then(function (isConfirmed) {
        var data_new = {
          'entry.1803576788': userID,
          'entry.672554210': userName,
          'entry.1963645540': userPhoto,
          'entry.60362750': userEmail,
          'entry.1393178718': photo,
          'entry.474465649': name,
          'entry.28988405': message,
        };
        $.ajax({
          type: 'POST',
          url: 'https://docs.google.com/forms/u/0/d/e/1_HvSjJAGlOVS1zpb1bbt-HeWrMWq0rpHj7jNDg7J1wE/formResponse',
          data: data_new,
          contentType: 'application/json',
          dataType: 'jsonp',
        });
        liff.closeWindow();
      }
      )
    }).catch(error => {
      Swal.fire({
        title: '發送失敗',
        text: '請確認是否輸入好友名稱及你想說的話',
        icon: 'error',
        confirmButtonText: '確認',
        footer: '若持續發生錯誤，請重開此視窗'
      }
      ).then(function (isConfirmed) {
        window.location.assign(window.location.href);
        liff.openWindow({
          url: "https://liff.eshare.pe/events/2022-newyear/",
          external: false
        });
      })
    });
  });

  //到這邊
}).
  catch(function (error) {
    console.log(error);
  });