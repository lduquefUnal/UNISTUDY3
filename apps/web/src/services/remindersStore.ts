export type ReminderOverrides = Record<string, string>;

const STORAGE_KEY_OVERRIDES = 'unistudy_reminder_overrides';
const STORAGE_KEY_TEMPLATE = 'unistudy_reminder_template';

const DEFAULT_TEMPLATE = 'Hola {name}, tu servicio *{plan}* esta por vencer. Deseas renovarlo?';

export const getReminderOverrides = (): ReminderOverrides => {
    const stored = localStorage.getItem(STORAGE_KEY_OVERRIDES);
    return stored ? JSON.parse(stored) : {};
};

export const setReminderOverride = (clientId: string, date: string) => {
    const overrides = getReminderOverrides();
    overrides[clientId] = date;
    localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
};

export const clearReminderOverride = (clientId: string) => {
    const overrides = getReminderOverrides();
    delete overrides[clientId];
    localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
};

export const getReminderTemplate = () => {
    const stored = localStorage.getItem(STORAGE_KEY_TEMPLATE);
    return stored || DEFAULT_TEMPLATE;
};

export const saveReminderTemplate = (template: string) => {
    localStorage.setItem(STORAGE_KEY_TEMPLATE, template);
};
