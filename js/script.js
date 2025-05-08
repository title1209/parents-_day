// Firebase 설정
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  // Firebase 초기화
  const app = firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  const db = firebase.firestore(app);

  // 방명록과 이미지 저장 함수
  function saveGuestbook() {
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    const imageFile = document.getElementById("image-file").files[0];

    if (name && message && imageFile) {
      // 이미지 파일을 Firebase Storage에 업로드
      const storageRef = storage.ref('guestbook_images/' + imageFile.name);
      const uploadTask = storageRef.put(imageFile);

      uploadTask.on('state_changed', 
        (snapshot) => {
          // 업로드 진행 상태 처리 (필요시)
        }, 
        (error) => {
          console.error("Error uploading image: ", error);
        },
        () => {
          // 업로드가 완료되면 이미지 URL을 가져와 Firestore에 저장
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const guestbook = {
              name: name,
              message: message,
              imageUrl: downloadURL,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
            };

            // Firestore에 데이터 저장
            db.collection("guestbook").add(guestbook)
              .then(() => {
                document.getElementById("guestbook-form").reset();
                loadGuestbook();  // 새로 작성된 방명록을 불러옴
              })
              .catch((error) => console.error("Error adding document: ", error));
          });
        }
      );
    }
  }

  // 방명록 데이터 로드 함수
  function loadGuestbook() {
    const guestbookList = document.getElementById("guestbook-list");
    guestbookList.innerHTML = "";

    // Firestore에서 방명록 데이터 가져오기
    db.collection("guestbook").orderBy("timestamp", "desc").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const entry = doc.data();
          const listItem = document.createElement("li");

          // 방명록 내용 표시
          listItem.textContent = `${entry.name}: ${entry.message} `;

          // 이미지가 있으면 이미지 표시
          if (entry.imageUrl) {
            const img = document.createElement("img");
            img.src = entry.imageUrl;
            img.alt = "Guestbook Image";
            img.style.maxWidth = "200px";  // 이미지 크기 제한
            listItem.appendChild(img);
          }

          // 삭제 버튼 생성
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "삭제";
          deleteButton.onclick = function() {
            deleteGuestbookEntry(doc.id);  // 문서 ID로 삭제
          };

          listItem.appendChild(deleteButton);
          guestbookList.appendChild(listItem);
        });
      })
      .catch((error) => console.log("Error getting documents: ", error));
  }

  // 방명록 항목 삭제 함수
  function deleteGuestbookEntry(docId) {
    // Firestore에서 해당 문서 삭제
    db.collection("guestbook").doc(docId).delete()
      .then(() => {
        loadGuestbook();  // 삭제 후 방명록 새로 불러오기
      })
      .catch((error) => console.error("Error removing document: ", error));
  }

  // 페이지 로드 시 방명록 불러오기
  window.onload = loadGuestbook;
