
// const serverUrl = 'http://localhost:12012';
const serverUrl = 'https://test.ranjun.work';
function initChart() {
    window.kLineChart = new ChartGraph({
        el: window.document.getElementById('chart'),
        url: serverUrl+'/api/k',
        request: {
            channel: 'USDT',
            period: 1440,//分钟
            limit: 1500,
            //其他参数
        },
    });
}

initChart();
const menuEl = $('.menu').find('.menu-tabs');
const moreEl = $('.menu').find('.menu-more')
const setEl = $('.menu').find('.menu-set');
const moreMenu = menuEl.find('.more');
const setMenu = menuEl.find('.set');
let curMenu = menuEl.find('.active');
let curMoreMenu = null;
function initMenu() {
    console.log(curMenu)
    menuEl.find('.menu-item').each((idx, e) => {
        let el = $(e);
        el.on('click', ()=> {
            if (idx !== 5 && el.hasClass('active')) {
                return;
            }
            if (idx < 5) {
                curMenu.removeClass('active');
                curMenu = el;
                curMenu.addClass('active');
                if(curMoreMenu) {
                    curMoreMenu.removeClass('active');
                    curMoreMenu = null;
                }
            }
            if (idx !== 5) {
                moreEl.removeClass('active');
            }
            if (idx !== 6) {
                setEl.removeClass('active');
            }

            if (idx === 0) {
                window.kLineChart.showTime();
            } else if (idx < 5 && idx > 0) {
                const periods = [15, 60, 240, 1440];
                window.kLineChart.update({
                    request: {
                        period: periods[idx-1]
                    }
                })
            } else if (idx === 5) {
                if (moreEl.hasClass('active')) {
                    moreEl.removeClass('active');
                } else {
                    moreEl.addClass('active');
                }
            } else if (idx === 6) {
                if (setEl.hasClass('active')) {
                    setEl.removeClass('active');
                } else {
                    setEl.addClass('active');
                }
            }
        })
    })
}
initMenu();

function initMoreMenu() {
    moreEl.on('click', e => {
        e.stopPropagation();
    })
    moreEl.find('.more-item').each((idx, e) => {
        let el = $(e);
        el.on('click', (e)=> {
            e.stopPropagation();
            if (el.hasClass('active')) {
                return;
            }
            if (curMoreMenu) {
                curMoreMenu.removeClass('active');
            }
            curMenu.removeClass('active');
            moreMenu.addClass('active');
            curMenu = moreMenu;
            curMoreMenu = el;
            curMoreMenu.addClass('active');
            moreEl.removeClass('active');
            const periods = [1, 5, 30, 1440*7];
            window.kLineChart.update({
                request: {
                    period: periods[idx]
                }
            })
        });
    })
}
initMoreMenu();

function initSetMenu() {
    setEl.on('click', e => {
        e.stopPropagation();
    })
    setEl.find('.more-item').each((idx, e) => {
        let el = $(e);
        el.on('click', (e)=> {
            e.stopPropagation();
            if (idx === 1) {
                if (el.hasClass('active')) {
                    el.removeClass('active');
                    window.kLineChart.updateChangeMa(false);
                } else {
                    el.addClass('active');
                    window.kLineChart.updateChangeMa(true);
                }
            }
            setEl.removeClass('active');
        });
    })
}

initSetMenu();


function initDepthChart() {
    window.depthChart = new DepthChart({
        request: {
            channel: 'USDT',
            limit: 60
        },
        el: document.getElementById('depth'),
        url: serverUrl+'/api/depth',
    })
}

initDepthChart();