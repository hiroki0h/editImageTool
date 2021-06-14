const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
// ctx.globalCompositeOperation = 'source-over';
const fileInput = document.getElementById('fileInput');
const toolSize = document.getElementById('toolSize');
const toolText = document.getElementById('toolText');
const fontFamily = document.getElementById('fontFamily');
const imageSticker = document.querySelector('.edit_tool_sticker ul').children;
const toolColor = document.querySelector('.edit_tool_color ul').children;
const brushTool = document.querySelector('.edit_tool_brush .img_wrap');
const btnSave = document.getElementById('btn_save');
const btnReset = document.getElementById('btn_reset');

let mode = '';
let imageUp = false;
let painting = false;
let imgSrc = '';
let rangeSize = toolSize.value;
let textValue = '';
let fontStyle = 'Gugi';
let color = '#000';
ctx.lineWidth = toolSize.value;
ctx.strokeStyle = '#000';
let clickX = '';
let clickY = '';

let windowWidth = document.body.offsetWidth;

const img = new Image();
stickerClassRemove = () => {
    for(let i = 0; i < imageSticker.length; i++){
        imageSticker[i].classList.remove('active');
    }
};
// 이미지 올리기
const asd = document.querySelector('.canvas');
fileInput.addEventListener('change', e => {
    // 파일 읽기
    const reader = new FileReader();
    reader.readAsDataURL(e. target.files[0]);
    reader.onload = () => {
//drawImage 메서드에 넣기 위해 이미지 객체화
//         const img = new Image();
        img.src = reader.result;
        img.onload = () => {
            if(windowWidth > 769){
                asd.width = img.width;
                canvas.width = img.width;
            }else{
                canvas.width = windowWidth;
                console.log('ok',canvas.width,windowWidth);
            }

            // console.log(window.getComputedStyle(document.querySelector(".canvas")).width);
            // canvas.width = window.getComputedStyle(document.querySelector(".canvas")).width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            imageUp = true;
            asd.classList.add('on');
            // console.log(reader.result);
        }
    }
});
window.onresize = () => {
    // console.log('screen.width',screen.width);
    // console.log('screen.availWidth',screen.availWidth);
    // console.log('document.body.offsetWidth',document.body.offsetWidth);
    // console.log('document.body.scrollWidth',document.body.scrollWidth);
    // console.log('document.body.clientWidth',document.body.clientWidth);
    if(windowWidth > 769){
        console.log('pc',windowWidth);
    }else{
        console.log('mo',windowWidth);
    }
    // console.log('img.width',img.width);
    // console.log('canvas.height',canvas.height);
    // console.log('img.height',img.height);
    // console.log('asd.width',asd.style.width);
    console.log('----------');
};

// 스티커 클릭
    imageStickerClick = (e) => {
        if(imageUp){
            imgSrc = e.target;
            toolText.classList.remove('active');
            brushTool.classList.remove('active');
            mode = 'stickerMode';
            stickerClassRemove();
            imgSrc.parentElement.classList.add('active');
        }
    };
    Array.from(imageSticker).forEach(imageSticker => imageSticker.addEventListener('click',imageStickerClick));
    toolSize.addEventListener('input', (e) => {
        rangeSize = e.target.value;
    });
    toolText.addEventListener('keyup', (e) => {
        textValue = e.target.value;
    });
    fontFamily.addEventListener('change', e => {
        fontStyle = fontFamily.options[fontFamily.selectedIndex].value;
        fontFamily.style.fontFamily = fontStyle;
    });
    toolColorSelect = (e) => {
        color = e.target.style.backgroundColor;
    };
    Array.from(toolColor).forEach(toolColor => toolColor.addEventListener('click',toolColorSelect));

    brushTool.addEventListener('click', () => {
        if(imageUp) {
            toolText.classList.remove('active');
            brushTool.classList.add('active');
            stickerClassRemove();
            mode = 'brushMode';
        }
    });
    toolText.addEventListener('click', () => {
        if(imageUp){
            toolText.classList.add('active');
            brushTool.classList.remove('active');
            stickerClassRemove();
            mode = 'textMode';
        }
    });

    canvas.addEventListener('click',(e) => {
        clickX = e.offsetX;
        clickY = e.offsetY;
        switch(mode){
            case 'stickerMode' :
                ctx.drawImage(imgSrc, clickX-rangeSize*5, clickY-rangeSize*5, rangeSize*10, rangeSize*10);
                painting = false;
                break;
            case 'textMode' :
                let textWidth = ctx.measureText(textValue).width;
                ctx.font = `${rangeSize}px ${fontStyle}`;
                ctx.fillStyle = color;
                ctx.fillText(textValue,clickX,clickY);
                painting = false;
                break;
        }
    });
    canvas.addEventListener('mousemove', (e) => {
        if(mode === 'brushMode'){
            clickX = e.offsetX;
            clickY = e.offsetY;
            ctx.lineWidth = rangeSize;
            ctx.strokeStyle = color;
            if(!painting) {
                ctx.beginPath();
                ctx.moveTo(clickX, clickY);
            }else{
                ctx.lineTo(clickX, clickY);
                ctx.stroke();
            }
        }
    });
    canvas.addEventListener('mousedown', (e) => {
        painting = true;
    });
    canvas.addEventListener('mouseup', (e) => {
        painting = false;
    });
    canvas.addEventListener('mouseleave', (e) => {
        painting = false;
    });

    btnSave.addEventListener('click', () => {
        const image = canvas.toDataURL();
        const data = Date.now();
        const link = document.createElement('a');
        link.href = image;
        link.download = `🎨${data}`;
        link.click();
    });
    btnReset.addEventListener('click', () => {
        ctx.drawImage(img, 0, 0);
    });