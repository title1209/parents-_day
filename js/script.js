// Firebase 초기화
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 갤러리 이미지 업로드 함수
$(".gallery input[type='file']").each(function(index) {
  const $input = $(this);
  const $parent = $input.parent();
  const $img = $('<img>', { alt: '이미지' }).css({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '10px',
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'none'
  });

  $parent.prepend($img);

  // Firebase Firestore에서 이미지 URL 불러오기
  db.collection("gallery").doc(String(index)).get().then(doc => {
    if (doc.exists) {
      const imageUrl = doc.data().imageUrl;
      $img.attr('src', imageUrl).show();
      $input.hide();
    }
  });

  // 클릭해서 파일 업로드
  $img.on('click', function() {
    $input.click();
  });

  $input.on('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child('gallery/' + Date.now() + file.name);
      fileRef.put(file).then(() => {
        fileRef.getDownloadURL().then((downloadURL) => {
          // Firebase Firestore에 URL 저장
          db.collection("gallery").doc(String(index)).set({
            imageUrl: downloadURL
          }).then(() => {
            $img.attr('src', downloadURL).show();
            $input.hide();
          });
        });
      });
    } else {
      alert('이미지 파일을 선택해주세요!');
    }
  });
});
