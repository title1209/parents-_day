$(function() {
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

        const storageKey = 'gallery_image_' + index;

        // 저장된 이미지 불러오기
        const savedImage = localStorage.getItem(storageKey);
        if (savedImage) {
            $img.attr('src', savedImage).show();
            $input.hide();
        }

        $img.on('click', function() {
            $input.click();
        });

        $input.on('change', function(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageData = e.target.result;
                    $img.attr('src', imageData).show();
                    $input.hide();
                    localStorage.setItem(storageKey, imageData); // 저장
                };
                reader.readAsDataURL(file);
            } else {
                alert('이미지 파일을 선택해주세요!');
            }
        });
    });
});

// 방명록 지우기 기능 추가
$(function() {
    const $form = $('#guestbook-form');
    const $name = $('#guestbook-name');
    const $message = $('#guestbook-message');
    const $list = $('#guestbook-list');

    // 방명록 불러오기
    function loadGuestbook() {
        $list.empty();
        const entries = JSON.parse(localStorage.getItem('guestbook')) || [];
        entries.forEach((entry, index) => {
            const $li = $('<li>').html(`
                <strong>${entry.name}</strong>: ${entry.message}
                <button class="delete-btn" data-index="${index}">삭제</button>
            `);
            $list.append($li);
        });
    }

    // 방명록 삭제
    $list.on('click', '.delete-btn', function() {
        const index = $(this).data('index');
        const entries = JSON.parse(localStorage.getItem('guestbook')) || [];
        entries.splice(index, 1); // 삭제할 항목을 배열에서 제거
        localStorage.setItem('guestbook', JSON.stringify(entries)); // 업데이트된 배열 저장
        loadGuestbook(); // 목록 다시 로드
    });

    // 방명록 제출
    $form.on('submit', function(e) {
        e.preventDefault();
        const name = $name.val().trim();
        const message = $message.val().trim();
        if (!name || !message) return;

        const entries = JSON.parse(localStorage.getItem('guestbook')) || [];
        entries.push({ name, message });
        localStorage.setItem('guestbook', JSON.stringify(entries));

        $name.val('');
        $message.val('');
        loadGuestbook();
    });

    loadGuestbook();
});

// 방명록을 서버에 전송하는 예시
$(function() {
    const $form = $('#guestbook-form');
    $form.on('submit', function(e) {
        e.preventDefault();
        const name = $('#guestbook-name').val().trim();
        const message = $('#guestbook-message').val().trim();
        
        if (!name || !message) return;

        $.ajax({
            url: 'guestbook.asp',
            type: 'POST',
            data: {
                name: name,
                message: message
            },
            success: function(response) {
                alert("방명록이 저장되었습니다.");
                loadGuestbook();
            }
        });
    });
});

