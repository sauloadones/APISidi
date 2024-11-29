"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateTimeToBrazilTimeZone = exports.formatDateToPTBR = void 0;
const formatDateToPTBR = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
exports.formatDateToPTBR = formatDateToPTBR;
const formatDateTimeToBrazilTimeZone = (date) => {
    const options = {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    const formatter = new Intl.DateTimeFormat('pt-BR', options);
    return formatter.format(date).replace(',', '');
};
exports.formatDateTimeToBrazilTimeZone = formatDateTimeToBrazilTimeZone;
// Example usage
