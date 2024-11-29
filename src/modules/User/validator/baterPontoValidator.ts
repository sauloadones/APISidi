const formatDateToPTBR = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const formatDateTimeToBrazilTimeZone = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo', 
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };
    const formatter = new Intl.DateTimeFormat('pt-BR', options);
    return formatter.format(date).replace(',', '');
};

// Example usage



export { formatDateToPTBR, formatDateTimeToBrazilTimeZone};

// Example usage

