export const generateUUID = () => {
    return Math.random().toString(36).slice(-6);
};

export const isValidUUID = (uuid?: string): boolean => {
    if (!uuid) return false;
    const uuidRegex = /^[a-z0-9]{6}$/;
    return uuidRegex.test(uuid);
};