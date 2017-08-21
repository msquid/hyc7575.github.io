$.fn.rangeSlider = function(opts) {
    return this.each(function() {
        var options = $.extend({}, $.fn.rangeSlider.defaults, opts || {}); // 옵션 인자, default 옵션과 머지

        var $wrap = $(this);
        var $minHandle; // 좌측 handle
        var $maxHandle; // 우측 handle
        var $activeArea; // 선택중인 범위 표시 DOM element ( 진한 색으로 )
        var $handle; // 좌, 우측 handle DOM element
        var $min, $max; // min과 max의 value가 표현될 DOM element

        var wrapWidth;

        var max = options.max; // default max (고정 값)
        var min = options.min; // default min (고정 값)
        var maxValue = max; // value of max (유동 값)
        var minValue = min; // value of min (유동 값)

        var handles = null; // null은 drag 불가능 상태

        var isMin; // minimum handle인지 maximum handle 인지 판단

        var selectHandle; // 선택한 handle 좌표 object

        var $selectHandle; // 선택한 handle DOM element
        var otherHandle; // 반대쪽 handle DOM element

        var step; // range 단위, max & min 과 나누어 떨어져야할 거임 현재 상태로는(아마)

        init();
        if( options.showValue ) {
            setShowValueType();
        }

        function init() {
            $wrap.width(options.width).attr({
                'data-min': options.min,
                'data-max': options.max
            });

            wrapWidth = parseInt($wrap.width(), 10) - parseInt(options.handleWidth);
            step = options.step * (wrapWidth / max);

            $wrap.append('<div class="range-slider-select-area"></div><span class="range-slider-handle minimum"></span><span class="range-slider-handle maximum"></span>');
            $minHandle = $wrap.find('.range-slider-handle.minimum');
            $maxHandle = $wrap.find('.range-slider-handle.maximum');
            $activeArea = $wrap.find('.range-slider-select-area');
            $handle = $wrap.find('.range-slider-handle');

            $handle.width(options.handleWidth);

            $wrap.wrap('<div class="range-slider-wrap" style="padding: 30px 0 50px;"></div>')
            $wrap.css({
                position: 'relative',
                width: options.width,
                height: options.height,
                'filter' :'progid:DXImageTransform.Microsoft.gradient(startColorStr=#66ff2402,endColorStr=#66ff2402)',
                '-ms-filter' :'progid:DXImageTransform.Microsoft.gradient(startColorStr=#66ff2402,endColorStr=#66ff2402)',
                'background-color': 'rgba(255, 115, 89, 0.4)'
            });
            $wrap.find('.range-slider-select-area').css({
                position: 'absolute',
                width: '100%',
                height: 'inherit',
                backgroundColor: 'rgb(255, 115, 89)',
                'z-ndex': 1
            });
            $handle.css({
                position: 'absolute',
                top: -(parseInt(options.handleWidth, 10) / 2),
                width: options.handleWidth,
                height: options.handleWidth,
                borderRadius: '50%',
                backgroundColor: options.handleColor,
                border: '2px solid rgb(255, 115, 89)',
                cursor: 'pointer',
                boxSizing: 'border-box',
                'z-index': 2
            });
            $handle.each(function() {
                var $this = $(this);
                $this.hasClass('minimum') ? $this.css('left', 0) : $this.css({left: wrapWidth });
            });
            initEvent();
        }
        function initEvent() {
            $handle.on('mousedown', function(e) {
                // start drag
                var e = window.event || e;

                handles = {
                    minHandle: {
                        mouseX: e.clientX,
                        currentX: parseInt( $wrap.find('.minimum').css('left'), 10 )
                    },
                    maxHandle: {
                        mouseX: e.clientX,
                        currentX: parseInt( $wrap.find('.maximum').css('left'), 10 )
                    }
                }
                isMin = ( $.fn.rangeSlider.chkHandle(this) === 'minimum');
                selectHandle = isMin ? handles.minHandle : handles.maxHandle;
                otherHandle = !isMin ? handles.minHandle : handles.maxHandle;
                $selectHandle = isMin ? $wrap.find('.minimum') : $wrap. find('.maximum');
            });

            $(document).on('mouseup', function() {
                // end drag
                if( !handles ) return;

                // 최소 간격의 일정 값으로 설정 해주고 ex) 473 -> 450
                // 표시되는 숫자들 설정해주고
                // input value들 설정해주자
                var modValue = selectHandle.currentX % step;

                selectHandle.currentX = modValue < (step/2) ? selectHandle.currentX - modValue : selectHandle.currentX + (step - modValue);
                if( (isMin && selectHandle.currentX > otherHandle.currentX) || (!isMin && selectHandle.currentX < otherHandle.currentX) ) {
                    // 각 handle은 반대 handle의 값 보다 커지거나 작아질 수 없다.
                    selectHandle.currentX = otherHandle.currentX
                }
                $selectHandle.css('left', isMin ? Math.min( otherHandle.currentX, selectHandle.currentX) : Math.max( otherHandle.currentX, selectHandle.currentX) );
                isMin ? minValue = selectHandle.currentX / wrapWidth * max : maxValue = selectHandle.currentX / wrapWidth * max;

                // 보여지는 value 값 설정
                setShowValue( minValue, maxValue );
                // 마지막으로 컨트롤 한 handle의 z-index 올려주기
                changeHandleZIndex();

                setActiveAreaWidth(otherHandle.currentX);

                if( typeof options.onBlur === 'function' ) {
                	options.onBlur();
                }
                handles = null;
            });

            $(document).on('mousemove', function(e) {
                // dragging
                $('.touch-area').text(  )
                if( !handles ) return;

                var e = window.event || e;
                var v;
                var modValue;
                var tempValue;
                if( e.clientX - $wrap.offset().left < 0 || e.clientX - $wrap.offset().left > wrapWidth  ) {
                    return;
                } else {
                    selectHandle.currentX = e.clientX - $wrap.offset().left;
                }

                v = isMin ? Math.min( otherHandle.currentX , selectHandle.currentX ) : Math.max( otherHandle.currentX, selectHandle.currentX );
                if( selectHandle.currentX >= 0 && selectHandle.currentX <= wrapWidth ) {
                    $selectHandle.css('left', v );

                    modValue = selectHandle.currentX % step;
                    tempValue = (modValue < (step/2) ? selectHandle.currentX - modValue : selectHandle.currentX + (step - modValue))  / wrapWidth * max;
                    if( isMin ) {
                        if( minValue !== tempValue) {
                            minValue = tempValue;
                        }
                    } else {
                        if( maxValue !== tempValue) {
                            maxValue = tempValue;
                        }
                    }
                    setShowValue( minValue, maxValue );
                    setActiveAreaWidth( otherHandle.currentX );
                }

            });

            // mobile touch event
            $handle.on('touchstart', function(e) {
                // start drag
                e.preventDefault();
                var e = e.originalEvent;

                handles = {
                    minHandle: {
                        mouseX: e.targetTouches[0].pageX,
                        currentX: parseInt( $wrap.find('.minimum').css('left'), 10 )
                    },
                    maxHandle: {
                        mouseX: e.targetTouches[0].pageX,
                        currentX: parseInt( $wrap.find('.maximum').css('left'), 10 )
                    }
                }
                isMin = ( $.fn.rangeSlider.chkHandle(this) === 'minimum');
                selectHandle = isMin ? handles.minHandle : handles.maxHandle;
                otherHandle = !isMin ? handles.minHandle : handles.maxHandle;
                $selectHandle = isMin ? $wrap.find('.minimum') : $wrap. find('.maximum');
            });
            $handle.on('touchmove', function(e) {
                e.preventDefault();
                if( !handles ) return;

                var e = e.originalEvent;
                var v;
                var modValue;
                var tempValue;

                if( e.targetTouches[0].pageX - $wrap.offset().left < 0 || e.targetTouches[0].pageX - $wrap.offset().left > wrapWidth ) {
                    return;
                } else {
                    selectHandle.currentX = e.targetTouches[0].pageX - $wrap.offset().left;
                }

                v = isMin ? Math.min( otherHandle.currentX , selectHandle.currentX ) : Math.max( otherHandle.currentX, selectHandle.currentX );
                if( selectHandle.currentX >= 0 && selectHandle.currentX <= wrapWidth ) {
                    $selectHandle.css('left', v );

                    modValue = selectHandle.currentX % step;
                    tempValue = (modValue < (step/2) ? selectHandle.currentX - modValue : selectHandle.currentX + (step - modValue))  / wrapWidth * max;
                    if( isMin ) {
                        if( minValue !== tempValue) {
                            minValue = tempValue;
                        }
                    } else {
                        if( maxValue !== tempValue) {
                            maxValue = tempValue;
                        }
                    }
                    setShowValue( minValue, maxValue );
                    setActiveAreaWidth( otherHandle.currentX );
                }
            });
            $handle.on('touchend', function(e) {
                // end drag
                if( !handles ) return;

                // 최소 간격의 일정 값으로 설정 해주고 ex) 473 -> 450
                // 표시되는 숫자들 설정해주고
                // input value들 설정해주자
                var modValue = selectHandle.currentX % step;
                selectHandle.currentX = modValue < (step/2) ? selectHandle.currentX - modValue : selectHandle.currentX + (step - modValue);
                if( (isMin && selectHandle.currentX > otherHandle.currentX) || (!isMin && selectHandle.currentX < otherHandle.currentX) ) {
                    selectHandle.currentX = otherHandle.currentX
                }
                $selectHandle.css('left', isMin ? Math.min( otherHandle.currentX, selectHandle.currentX) : Math.max( otherHandle.currentX, selectHandle.currentX) );
                isMin ? minValue = selectHandle.currentX / wrapWidth * max : maxValue = selectHandle.currentX / wrapWidth * max;

                // 보여지는 value 값 설정
                setShowValue( minValue, maxValue );
                // 마지막으로 컨트롤 한 handle의 z-index 올려주기
                changeHandleZIndex();

                setActiveAreaWidth(otherHandle.currentX);

                if( typeof options.onBlur === 'function' ) {
                	options.onBlur();
                }
                handles = null;
            });

            $.fn.rangeSlider.initStatus = true;
        }

        function addComma(n) {
            return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }


        function setActiveAreaWidth(otherX) {
            var handleLeft = [];
            $handle.each( function() {
                // 좌우측 handle의 css left값 구하기
                handleLeft.push( parseInt($(this).css('left'), 10 ) );
            });
            $activeArea.css({
                'left': (isMin ? $minHandle.css('left') : otherX),
                'width': handleLeft[1] - handleLeft[0]
            });
        }
        /**
         * changeHandleZIndex - 각 handle의 z-index 값을 가장 최근 클릭한 handle이 더 높도록 조정해준다.
         */
        function changeHandleZIndex() {
            $minHandle.css('z-index', isMin ? 3 : 2);
            $maxHandle.css('z-index', isMin ? 2 : 3);
        }

        /**
         * setShowValue - 보여지는 value 표시되는 영역 셋팅
         * @param  {number} min
         * @param  {number} max
         */
        function setShowValue(min, max) {
            isMin ?
                $wrap.attr('data-min', Math.min(Math.round(min), Math.round(max))) :
                $wrap.attr('data-max', Math.max(Math.round(min), Math.round(max)));
            isMin ?
                $min.text( addComma(Math.min(Math.round(min), Math.round(max))) + options.measure ) :
                $max.text( addComma(Math.max(Math.round(min), Math.round(max))) + options.measure + ( max === options.max && options.maxOverflow ? ' 이상' : '' ) );
        }

        /**
         * setShowValueType - 보여지는 value 표시되는 영역의 위치 및 스타일 지정
         * follow, top, bottom 등 여러가지 형태를 미리 만들어 두어야 함.
         */
        function setShowValueType() {
            var type = options.showValueType;
            $wrap.append('<span class="showValue minValue" style="position: absolute; left: 0;">' + addComma(minValue) + options.measure + '</span>');
            $wrap.append('<span class="showValue maxValue" style="position: absolute; right: 0;">' + addComma(maxValue) + options.measure + (options.maxOverflow ? ' 이상' : '') + '</span>');

            $min = $wrap.find('.minValue');
            $max = $wrap.find('.maxValue');
            if( options.showValue ) {
                switch (type) {
                    case 'follow':

                        break;
                    case 'top':
                        $min.css({
                            top: '-30px'
                        });
                        $max.css({
                            top: '-30px'
                        });
                        break;
                    case 'bottom':
                        $min.css({
                            top: '30px'
                        });
                        $max.css({
                            top: '30px'
                        });
                        break;
                    default:
                        return;
                }
            } else {
                // false
            }
        }
    });
}

$.fn.rangeSlider.initStatus = false;

$.fn.rangeSlider.defaults = {
    width: '100%',
    height: '2px',
    colorStyle: 'red',
    handleWidth: '28px',
    handleColor: '#ffffff',
    measure: '',
    maxOverflow: true,
    max: 100,
    min: 0,
    step: 1,
    showValue: true,
    showValueType: 'bottom'
}
/**
 * chkHandle - 최소 값 핸들인지 최대 값 핸들인지 구함
 *
 * @param  {Object} t hanlde element
 * @return {string} minimum or maximum
 */
$.fn.rangeSlider.chkHandle = function(t) {
   return ( ' ' + t.className + ' ' ).indexOf(' minimum ') > -1 ? 'minimum' : 'maximum';
}
