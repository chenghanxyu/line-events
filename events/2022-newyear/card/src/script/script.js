//先取得網址字串，假設此頁網址為「index.aspx?id=U001&name=GQSM」
var url = location.href;

//再來用去尋找網址列中是否有資料傳遞(QueryString)
if (url.indexOf('?') != -1) {
  var id = "";
  //在此直接將各自的參數資料切割放進ary中
  var ary = url.split('?')[1].split('&');
  //此時ary的內容為：
  //ary[0] = 'id=U001'，ary[1] = 'name=GQSM'

  //下迴圈去搜尋每個資料參數
  for (i = 0; i <= ary.length - 1; i++) {
    //如果資料名稱為events的話那就把他取出來
    if (ary[i].split('=')[0] == 'invited_id')
      id = ary[i].split('=')[1];
  }
}

var liffID = '1655224755-grRwnek2';
var webSite = 'https://liff.yuslife.cc/events/2022-newyear/card/?s=abcd'
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

  if (!isLoggedIn) {
    liff.login({
      redirectUri: webSite
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
    var message = document.getElementById('friend_card').value;
    var name = document.getElementById('friend_name').value;
    if (photo == "none") {
      Swal.fire({
        title: '發送失敗',
        text: '請確認是否選取賀卡',
        icon: 'error',
        confirmButtonText: '關閉',
        footer: '若持續發生錯誤，請重開此視窗'
      }
      )
      return;
    } else if (name == "") {
      Swal.fire({
        title: '發送失敗',
        text: '請確認是否輸入好友名稱',
        icon: 'error',
        confirmButtonText: '關閉',
        footer: '若持續發生錯誤，請重開此視窗'
      }
      )
      return;
    } else if (message == "") {
      Swal.fire({
        title: '發送失敗',
        text: '請確認是否輸入你想說的話',
        icon: 'error',
        confirmButtonText: '關閉',
        footer: '若持續發生錯誤，請重開此視窗'
      }
      )
      return;
    } else {
      if (photo == "01") {
        aspectRatio = "1:1";
      } else if (photo == "02") {
        aspectRatio = "1:1";
      } else {
        aspectRatio = "16:9";
      }
      liff.shareTargetPicker([{
        type: 'flex',
        altText: "Hi!" + userName + "為你捎來了新年祝福，他想對你說…",
        contents: {
          "type": "bubble",
          "size": "giga",
          "hero": {
            "type": "image",
            "url": webSite + "src/image/card-" + photo + ".png",
            "size": "full",
            "aspectRatio": aspectRatio,
            "aspectMode": "cover"
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "contents": [
                      {
                        "type": "span",
                        "text": userName
                      },
                      {
                        "type": "span",
                        "text": " 想對 "
                      },
                      {
                        "type": "span",
                        "text": name
                      },
                      {
                        "type": "span",
                        "text": " 說："
                      }
                    ],
                    "size": "lg",
                    "color": "#BB2225",
                    "weight": "bold",
                    "offsetStart": "45px"
                  }
                ],
                "offsetTop": "1px"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": message,
                    "wrap": true,
                    "color": "#BB2225"
                  }
                ],
                "margin": "lg",
                "borderColor": "#BB2225",
                "borderWidth": "3px",
                "cornerRadius": "5px",
                "paddingAll": "md",
                "paddingBottom": "lg",
                "offsetTop": "10px"
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "image",
                    "url": userPhoto,
                    "aspectRatio": "1:1"
                  }
                ],
                "cornerRadius": "100px",
                "position": "absolute",
                "width": "45px",
                "height": "45px",
                "offsetStart": "13px",
                "offsetTop": "10px",
                "borderColor": "#BB2225",
                "borderWidth": "3px"
              }
            ],
            "paddingBottom": "30px"
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
      }, {
        type: 'flex',
        altText: "Hi!" + userName + "為你捎來了新年祝福，他想對你說" + message,
        contents: {
          "type": "bubble",
          "size": "giga",
          "hero": {
            "type": "image",
            "url": webSite + "src/image/2022newyear_logo.png",
            "size": "full",
            "aspectRatio": "192:60"
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "🧧 我也要發賀卡",
                    "color": "#FEE8B8",
                    "weight": "bold"
                  }
                ],
                "borderColor": "#BB2225",
                "borderWidth": "2px",
                "cornerRadius": "md",
                "justifyContent": "center",
                "alignItems": "center",
                "paddingAll": "md",
                "backgroundColor": "#BB2225",
                "action": {
                  "type": "uri",
                  "label": "action",
                  "uri": "https://liff.line.me/1655224755-grRwnek2?inveted_id=" + userID
                }
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "▶️ 前往 於是寫下生活筆記",
                    "color": "#BB2225",
                    "weight": "bold"
                  }
                ],
                "borderColor": "#BB2225",
                "borderWidth": "2px",
                "cornerRadius": "md",
                "justifyContent": "center",
                "alignItems": "center",
                "paddingAll": "md",
                "margin": "lg",
                "action": {
                  "type": "uri",
                  "label": "action",
                  "uri": "http://yuslife.cc"
                }
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "▶️ 前往 搭波呆 Doubledaigirl",
                    "color": "#BB2225",
                    "weight": "bold"
                  }
                ],
                "borderColor": "#BB2225",
                "borderWidth": "2px",
                "cornerRadius": "md",
                "justifyContent": "center",
                "alignItems": "center",
                "paddingAll": "md",
                "margin": "lg",
                "action": {
                  "type": "uri",
                  "label": "action",
                  "uri": "https://www.instagram.com/doubledaigirl/"
                }
              }
            ],
            "margin": "none"
          },
          "styles": {
            "header": {
              "backgroundColor": "#FEE8B8"
            },
            "hero": {
              "backgroundColor": "#FEE8B8"
            },
            "body": {
              "backgroundColor": "#FEE8B8",
              "separator": false
            },
            "footer": {
              "backgroundColor": "#FEE8B8"
            }
          }
        }
      }
      ]).then(res => {
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
            'entry.809694179':id,
          };
          $.ajax({
            type: 'POST',
            url: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSe3_ZIjmqjHrbOnAyO2fiVW_mgblH4Jlada2ZGl5QxitdP8BA/formResponse',
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
            url: "https://liff.line.me/1655224755-grRwnek2",
            external: false
          });
        })
      });
    }
  });

  //到這邊
}).catch(function (error) {
  console.log(error);
});