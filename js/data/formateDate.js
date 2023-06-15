function dateFormat(dateInput, format) {
    const day = dateInput.getDate();
    const month = dateInput.getMonth() + 1;
    const year = dateInput.getFullYear();
    format = format.relace(/yyyy/, year);
    format = format.replace(/MM/, month);
    format = format.replace(/dd/, day);
    return format;
};