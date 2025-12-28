export type ReminderOverrides = Record<string, string>;

const STORAGE_KEY_OVERRIDES = 'unistudy_reminder_overrides';
const STORAGE_KEY_TEMPLATE = 'unistudy_reminder_template';

const DEFAULT_TEMPLATE = 'Hola {name}, tu servicio *{plan}* esta por vencer. Deseas renovarlo?';
const API_MODE = import.meta.env.VITE_API_MODE ?? 'mock';
const USE_LIVE_API = API_MODE === 'live';

type ReminderTemplateResponse = { getReminderTemplate: { template: string } | null };
type ReminderOverridesResponse = { listReminderOverrides: { clientId: string; reminderDate: string }[] };
type UpdateReminderTemplateResponse = { updateReminderTemplate: { template: string } };
type SetReminderOverrideResponse = { setReminderOverride: { clientId: string; reminderDate: string } };

const GET_TEMPLATE_QUERY = /* GraphQL */ `
  query GetReminderTemplate {
    getReminderTemplate {
      template
    }
  }
`;

const LIST_OVERRIDES_QUERY = /* GraphQL */ `
  query ListReminderOverrides {
    listReminderOverrides {
      clientId
      reminderDate
    }
  }
`;

const UPDATE_TEMPLATE_MUTATION = /* GraphQL */ `
  mutation UpdateReminderTemplate($input: UpdateReminderTemplateInput!) {
    updateReminderTemplate(input: $input) {
      template
    }
  }
`;

const SET_OVERRIDE_MUTATION = /* GraphQL */ `
  mutation SetReminderOverride($input: ReminderOverrideInput!) {
    setReminderOverride(input: $input) {
      clientId
      reminderDate
    }
  }
`;

const DELETE_OVERRIDE_MUTATION = /* GraphQL */ `
  mutation DeleteReminderOverride($clientId: ID!) {
    deleteReminderOverride(clientId: $clientId)
  }
`;

let cachedOverrides: ReminderOverrides = {};
let cachedTemplate = DEFAULT_TEMPLATE;

const loadOverridesFromStorage = (): ReminderOverrides => {
    const stored = localStorage.getItem(STORAGE_KEY_OVERRIDES);
    return stored ? JSON.parse(stored) : {};
};

const loadTemplateFromStorage = (): string => {
    const stored = localStorage.getItem(STORAGE_KEY_TEMPLATE);
    return stored || DEFAULT_TEMPLATE;
};

export const getReminderOverrides = (): ReminderOverrides => {
    return cachedOverrides;
};

export const loadReminderOverrides = async (): Promise<ReminderOverrides> => {
    if (!USE_LIVE_API) {
        cachedOverrides = loadOverridesFromStorage();
        return cachedOverrides;
    }

    const { graphqlRequest } = await import('./appsyncClient');
    try {
        const data = await graphqlRequest<ReminderOverridesResponse>(LIST_OVERRIDES_QUERY);
        cachedOverrides = data.listReminderOverrides.reduce((acc, item) => {
            acc[item.clientId] = item.reminderDate;
            return acc;
        }, {} as ReminderOverrides);
        localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(cachedOverrides));
        return cachedOverrides;
    } catch (error) {
        console.error('Error loading reminder overrides from AppSync:', error);
        cachedOverrides = loadOverridesFromStorage();
        return cachedOverrides;
    }
};

export const setReminderOverride = async (clientId: string, date: string) => {
    if (!USE_LIVE_API) {
        const overrides = { ...cachedOverrides, [clientId]: date };
        cachedOverrides = overrides;
        localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
        return;
    }

    const { graphqlRequest } = await import('./appsyncClient');
    const data = await graphqlRequest<SetReminderOverrideResponse>(SET_OVERRIDE_MUTATION, {
        input: { clientId, reminderDate: date }
    });
    cachedOverrides = { ...cachedOverrides, [data.setReminderOverride.clientId]: data.setReminderOverride.reminderDate };
    localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(cachedOverrides));
};

export const clearReminderOverride = async (clientId: string) => {
    if (!USE_LIVE_API) {
        const overrides = { ...cachedOverrides };
        delete overrides[clientId];
        cachedOverrides = overrides;
        localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
        return;
    }

    const { graphqlRequest } = await import('./appsyncClient');
    await graphqlRequest(DELETE_OVERRIDE_MUTATION, { clientId });
    const overrides = { ...cachedOverrides };
    delete overrides[clientId];
    cachedOverrides = overrides;
    localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
};

export const getReminderTemplate = () => cachedTemplate;

export const loadReminderTemplate = async (): Promise<string> => {
    if (!USE_LIVE_API) {
        cachedTemplate = loadTemplateFromStorage();
        return cachedTemplate;
    }

    const { graphqlRequest } = await import('./appsyncClient');
    try {
        const data = await graphqlRequest<ReminderTemplateResponse>(GET_TEMPLATE_QUERY);
        cachedTemplate = data.getReminderTemplate?.template || DEFAULT_TEMPLATE;
        localStorage.setItem(STORAGE_KEY_TEMPLATE, cachedTemplate);
        return cachedTemplate;
    } catch (error) {
        console.error('Error loading reminder template from AppSync:', error);
        cachedTemplate = loadTemplateFromStorage();
        return cachedTemplate;
    }
};

export const saveReminderTemplate = async (template: string) => {
    if (!USE_LIVE_API) {
        cachedTemplate = template;
        localStorage.setItem(STORAGE_KEY_TEMPLATE, template);
        return;
    }

    const { graphqlRequest } = await import('./appsyncClient');
    const data = await graphqlRequest<UpdateReminderTemplateResponse>(UPDATE_TEMPLATE_MUTATION, {
        input: { template }
    });
    cachedTemplate = data.updateReminderTemplate.template;
    localStorage.setItem(STORAGE_KEY_TEMPLATE, cachedTemplate);
};
