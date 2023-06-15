class EventCenter {
    handlers = {};
    addEventListener(type, handler) {
        if (handlers[type]) {
            handlers[type].push(handler);
        } else {
            handlers[type] = [handler];
        }
    }
    removeEventListener(type, handler) {
        if (handlers[type]) {
            const arr = this.handlers[type];
            if (handler) {
                const index = arr.findIndex(item => item === handler);
                if (index === -1) {
                    return new Error('无绑定该事件')
                }
                arr.splice(index, 1);
                if (arr.length === 0) {
                    delete this.handlers[type];
                }
            } else {
                delete this.handlers[type];
            }
        } else {
            return new Error('事件无效');
        }
    }
    dispatchEvent(type, params) {
        const events = this.handlers[type];
        if (!events) {
            return new Error('事件无效')
        }
        events.forEach(item => item(params));
    }
}