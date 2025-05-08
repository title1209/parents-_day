// 이미지 업로드 함수
        function uploadImage(event) {
            const file = event.target.files[0];

            if (file) {
                // 파일을 base64로 변환
                const reader = new FileReader();
                reader.onloadend = function() {
                    const imageData = reader.result; // base64 이미지 데이터
                    localStorage.setItem("uploadedImage", imageData); // 로컬 스토리지에 저장
                    displayImage(imageData); // 이미지 표시
                };
                reader.readAsDataURL(file); // 파일을 base64로 읽음
            }
        }

        // 로컬 스토리지에서 이미지 가져오기 및 표시
        function loadImage() {
            const savedImage = localStorage.getItem("uploadedImage");
            if (savedImage) {
                displayImage(savedImage);
            }
        }

        // 이미지 표시 함수
        function displayImage(imageData) {
            const container = document.getElementById("uploaded-image-container");
            container.innerHTML = ''; // 기존 이미지 삭제
            const img = document.createElement("img");
            img.src = imageData;
            img.alt = "Uploaded Image";
            img.style.maxWidth = "500px"; // 이미지 크기 제한
            container.appendChild(img);
        }

        // 페이지 로드 시 이미지 표시
        window.onload = loadImage;// 이미지 업로드 함수
        function uploadImage(event) {
            const file = event.target.files[0];

            if (file) {
                // 파일을 base64로 변환
                const reader = new FileReader();
                reader.onloadend = function() {
                    const imageData = reader.result; // base64 이미지 데이터
                    localStorage.setItem("uploadedImage", imageData); // 로컬 스토리지에 저장
                    displayImage(imageData); // 이미지 표시
                };
                reader.readAsDataURL(file); // 파일을 base64로 읽음
            }
        }

        // 로컬 스토리지에서 이미지 가져오기 및 표시
        function loadImage() {
            const savedImage = localStorage.getItem("uploadedImage");
            if (savedImage) {
                displayImage(savedImage);
            }
        }

        // 이미지 표시 함수
        function displayImage(imageData) {
            const container = document.getElementById("uploaded-image-container");
            container.innerHTML = ''; // 기존 이미지 삭제
            const img = document.createElement("img");
            img.src = imageData;
            img.alt = "Uploaded Image";
            img.style.maxWidth = "500px"; // 이미지 크기 제한
            container.appendChild(img);
        }

        // 페이지 로드 시 이미지 표시
        window.onload = loadImage;

// 방명록 저장 함수
function saveGuestbook() {
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    
    if (name && message) {
        const guestbook = {
            name: name,
            message: message
        };

        // 로컬 스토리지에 방명록 데이터 저장
        let guestbookData = JSON.parse(localStorage.getItem("guestbookData")) || [];
        guestbookData.push(guestbook);
        localStorage.setItem("guestbookData", JSON.stringify(guestbookData));

        // 폼 초기화
        document.getElementById("guestbook-form").reset();
        loadGuestbook();
    }
}

// 방명록 데이터 로드 함수
function loadGuestbook() {
    const guestbookData = JSON.parse(localStorage.getItem("guestbookData")) || [];
    const guestbookList = document.getElementById("guestbook-list");
    guestbookList.innerHTML = "";

    guestbookData.forEach((entry, index) => {
        const listItem = document.createElement("li");

        // 방명록 내용 표시
        listItem.textContent = `${entry.name}: ${entry.message} `;

        // 삭제 버튼 생성
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제";
        deleteButton.onclick = function() {
            deleteGuestbookEntry(index);
        };

        listItem.appendChild(deleteButton);
        guestbookList.appendChild(listItem);
    });
}

// 방명록 항목 삭제 함수
function deleteGuestbookEntry(index) {
    let guestbookData = JSON.parse(localStorage.getItem("guestbookData")) || [];
    guestbookData.splice(index, 1);  // 해당 인덱스의 방명록 항목 삭제
    localStorage.setItem("guestbookData", JSON.stringify(guestbookData));  // 업데이트된 데이터 로컬 스토리지에 저장
    loadGuestbook();  // 방명록 다시 로드
}

// 페이지 로드 시 방명록 불러오기
window.onload = loadGuestbook;
