$(function() {
    $(document).on('click', '.button-wf-table-controller', function() {
        var $this = $(this);
        var $table = $('.wf-table');

        $table.toggleClass('detail');

        if( $table.hasClass('detail') ) {
            $this.html('접기 <img src="/data/skin/mobile_ver3_itsimply_gls/images/detail/detail_review_fold.png" alt="접기">');
        } else {
            $this.html('펼치기 <img src="/data/skin/mobile_ver3_itsimply_gls/images/detail/detail_review_more.png" alt="펼치기">');
        }
    });

    $(document).on('click', '.stars-wrap-write-review li', function() {
        var $this = $(this);
        var idx = $this.index();
        var $stars = $this.closest('ul').find('li');

        $stars.removeClass('full');
        $stars.each(function(i, v) {
            if( i > idx ) return;
            $(v).addClass('full');
        });
    });



    (function() {
        // file reader 관련
        var $ul = $('.write-review-imgs ul');
        var $fileList = $('.file-list');
        function readImage(input, callback) {
            if (input.files && input.files[0]) {
                var ext = input.files[0].name.split('.').pop().toLowerCase();
                var reader = new FileReader();
                console.log(ext)
                if( !(ext === 'jpg' || ext === 'png' || ext === 'gif' || ext === 'jpeg') ) {
                    // 위 확장자가 아닌 파일이 들어왔음.
                    return;
                }

                reader.onload = function(e) {
                    console.log(e);
                    var li = '<li>' +
                             '    <div style="background-image: url(' + e.target.result + ')"></div>'
                             '</li>';


                    $ul.append(li);
                    callback();
                }

                reader.readAsDataURL(input.files[0]);
            }
        }
        function changeImageNum() {
            var num = $ul.find('li').length - 1;
            $('.write-review-imgs-header span').html(num + '/10');
            if( num === 10 ) {
                $ul.find('li').eq(0).remove();
            }
        }
        $(document).on('change', '#fileUpload', function(e) {
            $fileList.append( $(this).clone().removeAttr('id') )
            readImage(this, changeImageNum);
        });
    })();

    // modal 관련
    $(document).on('click', '.modal-close', function() {
        $modal = $(this).parents('.modal');
        $('.modal-overlay').remove();
        $modal.remove();
    });
    $(document).on('click', '.write-review-header button', function() {
        var $wrap = $('#wrap');

        var overlay = '<div class="modal-overlay" style="position: fixed; left: 0; right: 0; bottom: 0; top: 0; background: rgba(0, 0, 0, .5); z-index:9999;"></div>'
        var modal = '<div class="write-review-modal modal">' +
                    '    <div class="write-review-modal-header">' +
                    '        <h2>적립금 지급 안내</h2>' +
                    '        <i class="icon modal-close" role="button"></i>' +
                    '    </div>' +
                    '    <div class="write-review-modal-body">' +
                    '        <ul>' +
                    '            <li>' +
                    '                <div><img src="/data/skin/mobile_ver3_itsimply_gls/images/icon/icon_star.png" style="width: 30px;" alt="평가" /></div>' +
                    '                <div>' +
                    '                    만족도 + 착화감 평가 시<br/>적립금 1,000원' +
                    '                </div>' +
                    '            </li>' +
                    '            <li>' +
                    '                <div><img src="/data/skin/mobile_ver3_itsimply_gls/images/icon/icon_edit.png" style="width: 31px;" alt="후기작성" /></div>' +
                    '                <div>' +
                    '                    구매후기 작성 시<br/>적립금 1,000원' +
                    '                </div>' +
                    '            </li>' +
                    '            <li>' +
                    '                <div><img src="/data/skin/mobile_ver3_itsimply_gls/images/icon/icon_camera.png" style="width: 32px;" alt="사진" /></div>' +
                    '                <div>' +
                    '                    사진등록 시<br/>적립금 1,000원' +
                    '                </div>' +
                    '            </li>' +
                    '        </ul>' +
                    '        <p>※ 적립금을 받기 위한 성의 없는 후기는 제외될 수있습니다.</p>' +
                    '    </div>' +
                    '    <p>3가지 모두 작성 시 최대 3,000원 적립!</p>' +
                    '</div>';

        $wrap.append( overlay + modal );
    });

    // modal 끝
});
