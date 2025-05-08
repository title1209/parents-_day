// 이미지 파일을 로컬 스토리지에 저장하는 함수
function handleImageChange(event, imageIndex) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // 이미지를 로컬 스토리지에 저장
            localStorage.setItem(`image${imageIndex}`, e.target.result);
            updateImage(imageIndex, e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// 이미지 미리보기 업데이트 함수
function updateImage(imageIndex, imageSrc) {
    const imageElement = document.getElementById(`image${imageIndex}`);
    imageElement.src = imageSrc;
}

// 페이지 로드 시 이미지 불러오기
function loadImages() {
    for (let i = 1; i <= 4; i++) {
        const imageSrc = localStorage.getItem(`image${i}`);
        if (imageSrc) {
            updateImage(i, imageSrc);
        }
    }
}

// 페이지 로드 시 이미지 불러오기
window.onload = loadImages;

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

    guestbookData.forEach((entry) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${entry.name}: ${entry.message}`;
        guestbookList.appendChild(listItem);
    });
}

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

