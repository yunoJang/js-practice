const OVERLAY_CLASSNAME = 'overlay';
class Modal {
    constructor(width='90%',height='85%') {
        this.createOverlay();
        this.createModal(width,height);
        
        this.overlay.append(this.dom);
    }

    createOverlay = () => {
        this.overlay = document.createElement('div');
        this.overlay.classList.add(OVERLAY_CLASSNAME);
        this.overlay.addEventListener('click',this.onOverlayClick);
    }

    onOverlayClick = e => {
        if (e.target.classList.contains(OVERLAY_CLASSNAME)) {
            this.close();
        }
    }

    createModal = (width,height)=> {
        this.dom = document.createElement('div');
        this.dom.classList.add('modal');
        this.dom.style.width = width;
        this.dom.style.height = height;
    }

    append(...elements) {
        this.dom.append(...elements);
    }
    
    close = ()=> {
        this.overlay.remove();
    }

    float() {
        document.body.append(this.overlay);
    }
}

export default Modal;