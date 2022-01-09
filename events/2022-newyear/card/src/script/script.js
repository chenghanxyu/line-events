var liffID = '1655224755-grRwnek2';
liff.init({
  liffId: liffID
}).then(function() {
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
    let message = document.getElementById('friend_card').value;
    let name = document.getElementById('friend_name').value;
    liff.shareTargetPicker([{
      type: 'flex',
      altText: "Hi! 新年快樂！" + userName + "為你捎來了新年祝福，快來一起將祝福分享出去吧！",
      contents: {
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "image",
        "gravity": "top",
        "size": "full",
        "aspectRatio": "10:11",
        "aspectMode": "cover",
        "url": "https://bot.yuslife.cc/events/2021newyear/img/card.png?v=1"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "size": "lg",
            "weight": "bold",
            "color": "#dc3629",
            "contents": [
              {
                "type": "span",
                "text": "給"
              },
              {
                "type": "span",
                "text": name
              },
              {
                "type": "span",
                "text": "："
              }
            ]
          }
        ],
        "position": "absolute",
        "offsetStart": "20px",
        "offsetBottom": "145px"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": message,
            "wrap": true,
            "align": "center"
          }
        ],
        "position": "absolute",
        "margin": "none",
        "spacing": "none",
        "width": "258px",
        "height": "80px",
        "offsetBottom": "65px",
        "justifyContent": "center",
        "offsetStart": "22px"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": "快來製作賀卡回送給好友吧",
              "uri": "https://bot.yuslife.cc/?events=2021newyear"
            },
            "style": "primary",
            "height": "sm",
            "color": "#dc3629"
          }
        ],
        "position": "absolute",
        "width": "260px",
        "offsetStart": "20px",
        "offsetBottom": "20px"
      }
    ],
    "paddingAll": "0px"
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "contents": [],
    "spacing": "none",
    "margin": "none",
    "paddingBottom": "none"
  },
  "styles": {
    "footer": {
      "backgroundColor": "#fee8b8",
      "separator": false
    }
  }
}
    }]).then(res => {
        Swal.fire({
              title: '送出賀卡',
              icon: 'success',
              confirmButtonText: '確認',
              closeOnConfirm: false
            }).then(function(isConfirmed){
                liff.closeWindow();
            }
                )
        // window.alert('已送出賀卡');
        // liff.closeWindow();
    }).catch(error => {
        Swal.fire({
              title: '發送失敗',
              text: '請確認是否輸入好友名稱及你想說的話',
              icon: 'error',
              confirmButtonText: '確認',
              footer: '若持續發生錯誤，請重開此視窗'
            }
            ).then(function(isConfirmed){
            window.location.assign(window.location.href);
            liff.openWindow({
                  url: "https://bot.yuslife.cc/?events=2021newyear",
                  external: false
                });
          })
        
        
        
        // window.alert("請輸入好友名稱及你想說的話");
        // history.go(0);
        // window.location.assign(window.location.href);
    });
  });

  //到這邊
}).
catch(function(error) {
  console.log(error);
});